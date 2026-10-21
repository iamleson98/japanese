import { NextResponse } from "next/server";
import { db, schema } from "@/db";
import { eq, and } from "drizzle-orm";
import { v4 as uuid } from "uuid";
import {
  schedule,
  qualityToGrade,
  stabilityToBox,
  difficultyToEase,
  retrievability,
  describeInterval,
} from "@/lib/fsrs";

export const dynamic = "force-dynamic";

/**
 * Flashcards SRS API (Drizzle + FSRS-5).
 * GET  ?type=vocabulary&level=N5&limit=20  -> due + fresh cards (with predicted recall R)
 * POST {action:"add", itemType, itemIds:[]}                    -> enqueue into SRS
 * POST {action:"review", itemType, itemId, quality, retention} -> FSRS-5 update + XP
 * POST {action:"reset"}                                        -> clear all progress
 */

type Quality = "again" | "hard" | "good" | "easy";

function localDayKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

async function bumpStat(key: string, delta: number) {
  const existing = await db.select().from(schema.stats).where(eq(schema.stats.key, key));
  if (existing.length) {
    await db
      .update(schema.stats)
      .set({ value: Math.max(0, existing[0].value + delta), updatedAt: new Date().toISOString() })
      .where(eq(schema.stats.key, key));
  } else {
    await db
      .insert(schema.stats)
      .values({ id: uuid(), key, value: Math.max(0, delta), updatedAt: new Date().toISOString() });
  }
}

async function bumpDailyActivity(count: number) {
  const today = localDayKey(new Date());
  const existing = await db.select().from(schema.dailyActivity).where(eq(schema.dailyActivity.date, today));
  if (existing.length) {
    await db
      .update(schema.dailyActivity)
      .set({ count: existing[0].count + count, updatedAt: new Date().toISOString() })
      .where(eq(schema.dailyActivity.date, today));
  } else {
    await db
      .insert(schema.dailyActivity)
      .values({ id: uuid(), date: today, count, updatedAt: new Date().toISOString() });
  }
  // Recompute streak
  const recent = await db.select().from(schema.dailyActivity);
  const seen = new Set(recent.map((r) => r.date));
  const todayKey = today;
  const yesterdayKey = localDayKey(new Date(Date.now() - 86400000));
  let streak = 0;
  let cursor: string | null = seen.has(todayKey) ? todayKey : seen.has(yesterdayKey) ? yesterdayKey : null;
  if (cursor) {
    const [y, m, d] = cursor.split("-").map(Number);
    let dt = new Date(y, (m ?? 1) - 1, d ?? 1);
    while (true) {
      const key = localDayKey(dt);
      if (seen.has(key)) {
        streak += 1;
        dt = new Date(dt.getTime() - 86400000);
      } else break;
    }
  }
  await bumpStat("streak", 0); // ensure row exists
  const s = await db.select().from(schema.stats).where(eq(schema.stats.key, "streak"));
  if (s.length && s[0].value !== streak) {
    await db.update(schema.stats).set({ value: streak, updatedAt: new Date().toISOString() }).where(eq(schema.stats.key, "streak"));
  }
}

const LEVEL_RANK: Record<string, number> = { N5: 0, N4: 1, N3: 2, N2: 3, N1: 4 };

function levelThenOrder(a: { level: string; order: number }, b: { level: string; order: number }): number {
  const lr = (LEVEL_RANK[a.level] ?? 9) - (LEVEL_RANK[b.level] ?? 9);
  return lr !== 0 ? lr : a.order - b.order;
}

async function fetchItems(type: string, ids: string[]) {
  if (ids.length === 0) return [];
  if (type === "vocabulary") {
    const rows = await db.select().from(schema.vocabulary);
    return rows.filter((v) => ids.includes(v.id));
  }
  if (type === "kana") {
    const rows = await db.select().from(schema.kana);
    return rows.filter((k) => ids.includes(k.id));
  }
  if (type === "kanji") {
    const rows = await db.select().from(schema.kanji);
    return rows.filter((k) => ids.includes(k.id));
  }
  if (type === "grammar") {
    const rows = await db.select().from(schema.grammar);
    return rows.filter((g) => ids.includes(g.id));
  }
  if (type === "sentence") {
    const rows = await db.select().from(schema.minedSentence);
    return rows.filter((s) => ids.includes(s.id));
  }
  return [];
}

async function fetchAllItems(type: string, level: string | null) {
  if (type === "vocabulary") {
    const rows = await db.select().from(schema.vocabulary);
    const filtered = level ? rows.filter((v) => v.level === level) : rows;
    // Frequency-first: level asc (N5 = highest frequency band), then order asc
    return filtered.sort(levelThenOrder);
  }
  if (type === "kana") {
    const rows = await db.select().from(schema.kana);
    return rows.sort((a, b) => a.order - b.order);
  }
  if (type === "kanji") {
    const rows = await db.select().from(schema.kanji);
    const filtered = level ? rows.filter((k) => k.level === level) : rows;
    return filtered.sort(levelThenOrder);
  }
  if (type === "grammar") {
    const rows = await db.select().from(schema.grammar);
    const filtered = level ? rows.filter((g) => g.level === level) : rows;
    return filtered.sort(levelThenOrder);
  }
  if (type === "sentence") {
    return db.select().from(schema.minedSentence);
  }
  return [];
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") || "vocabulary";
  const level = searchParams.get("level");
  const limit = Math.min(60, Math.max(5, Number(searchParams.get("limit") || 20)));
  // Fine-grained caps for the guided Smart Study session:
  //  dueLimit caps due cards (default: fill to limit), newLimit caps fresh cards (default: fill to limit)
  const dueLimitRaw = searchParams.get("dueLimit");
  const newLimitRaw = searchParams.get("newLimit");
  const dueCap = dueLimitRaw !== null ? Math.min(60, Math.max(0, Number(dueLimitRaw))) : limit;
  const newCap = newLimitRaw !== null ? Math.min(60, Math.max(0, Number(newLimitRaw))) : limit;
  const nowIso = new Date().toISOString();

  // Due cards
  const allProgress = await db.select().from(schema.flashcardProgress).where(eq(schema.flashcardProgress.itemType, type));
  const now = Date.now();
  const dueProgress = allProgress
    .filter((p) => new Date(p.dueAt).getTime() <= now)
    .sort((a, b) => new Date(a.dueAt).getTime() - new Date(b.dueAt).getTime())
    .slice(0, dueCap);
  const dueIds = dueProgress.map((p) => p.itemId);
  const dueItems = await fetchItems(type, dueIds);

  // Fresh cards
  const taken = Math.min(dueItems.length, dueCap);
  const need = Math.max(0, Math.min(newCap, limit - taken));
  let freshItems: any[] = [];
  if (need > 0) {
    const startedIds = new Set(allProgress.map((p) => p.itemId));
    const candidates = await fetchAllItems(type, level);
    freshItems = candidates.filter((c: any) => !startedIds.has(c.id)).slice(0, need);
  }

  return NextResponse.json({
    type,
    due: dueItems.map((it) => {
      const p = dueProgress.find((p) => p.itemId === it.id);
      const elapsedDays = p?.lastSeenAt ? Math.max(0, (now - new Date(p.lastSeenAt).getTime()) / 86400000) : 0;
      const r = p && p.stability > 0 ? retrievability(elapsedDays, p.stability) : null;
      return { ...it, progress: p ? { ...p, r: Math.round(r! * 100) / 100 } : p };
    }),
    fresh: freshItems,
  });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const action = body.action as string | undefined;

  if (action === "reset") {
    await db.delete(schema.flashcardProgress);
    await db.delete(schema.dailyActivity);
    for (const key of ["streak", "totalReviewed", "xp"]) {
      const row = await db.select().from(schema.stats).where(eq(schema.stats.key, key));
      if (row.length) await db.update(schema.stats).set({ value: 0 }).where(eq(schema.stats.key, key));
      else await db.insert(schema.stats).values({ id: uuid(), key, value: 0 });
    }
    return NextResponse.json({ ok: true, reset: true });
  }

  if (action === "add") {
    const itemType = body.itemType as string;
    const itemIds: string[] = body.itemIds ?? [];
    if (!itemType || !itemIds.length) return NextResponse.json({ error: "missing itemType/itemIds" }, { status: 400 });
    const nowIso = new Date().toISOString();
    let added = 0;
    for (const id of itemIds) {
      const existing = await db
        .select()
        .from(schema.flashcardProgress)
        .where(and(eq(schema.flashcardProgress.itemType, itemType), eq(schema.flashcardProgress.itemId, id)));
      if (existing.length) continue;
      await db.insert(schema.flashcardProgress).values({
        id: uuid(), itemType, itemId: id,
        box: 0, ease: 250, interval: 0, stability: 0, difficulty: 5,
        dueAt: nowIso,
        lastSeenAt: null, reps: 0, lapses: 0, correct: 0, wrong: 0,
      });
      added++;
    }
    return NextResponse.json({ ok: true, added });
  }

  if (action === "review") {
    const itemType = body.itemType as string;
    const itemId = body.itemId as string;
    const quality = body.quality as Quality;
    if (!itemType || !itemId || !quality) return NextResponse.json({ error: "missing params" }, { status: 400 });

    const retention = Math.min(0.97, Math.max(0.8, Number(body.retention) || 0.9));
    const grade = qualityToGrade(quality);
    const now = Date.now();

    const existing = await db
      .select()
      .from(schema.flashcardProgress)
      .where(and(eq(schema.flashcardProgress.itemType, itemType), eq(schema.flashcardProgress.itemId, itemId)));
    const base =
      existing[0] ?? {
        id: "", stability: 0, difficulty: 5, reps: 0, lapses: 0,
        correct: 0, wrong: 0, lastSeenAt: null as string | null,
      };

    const next = schedule(
      {
        stability: base.stability,
        difficulty: base.difficulty,
        reps: base.reps,
        lapses: base.lapses,
        lastSeenAt: base.lastSeenAt ? new Date(base.lastSeenAt).getTime() : null,
      },
      grade,
      now,
      retention,
    );

    const passed = grade >= 2; // hard/good/easy all count as successful recall in FSRS
    const correct = (base.correct ?? 0) + (passed ? 1 : 0);
    const wrong = (base.wrong ?? 0) + (passed ? 0 : 1);
    const reps = (base.reps ?? 0) + 1;
    const lapses = (base.lapses ?? 0) + (grade === 1 ? 1 : 0);
    const nowIso = new Date(now).toISOString();
    const intervalDays = Math.round(next.interval);
    const xpGain = grade === 1 ? 1 : 2;

    const values = {
      box: stabilityToBox(next.stability),
      ease: difficultyToEase(next.difficulty),
      interval: intervalDays,
      stability: Math.round(next.stability * 1000) / 1000,
      difficulty: Math.round(next.difficulty * 1000) / 1000,
      dueAt: new Date(next.dueAt).toISOString(),
      lastSeenAt: nowIso,
      reps,
      lapses,
      correct,
      wrong,
    };

    if (existing.length) {
      await db.update(schema.flashcardProgress).set(values).where(eq(schema.flashcardProgress.id, base.id));
    } else {
      await db.insert(schema.flashcardProgress).values({
        id: uuid(), itemType, itemId,
        ...values,
      });
    }

    await bumpDailyActivity(1);
    await bumpStat("totalReviewed", 1);
    await bumpStat("xp", xpGain);

    return NextResponse.json({
      ok: true,
      next: {
        stability: Math.round(next.stability * 100) / 100,
        difficulty: Math.round(next.difficulty * 100) / 100,
        interval: intervalDays,
        intervalLabel: describeInterval(next.interval),
        dueAt: new Date(next.dueAt).toISOString(),
        learning: next.learning,
        r: Math.round(next.retrievability * 100) / 100,
      },
      xpGain,
    });
  }

  return NextResponse.json({ error: "unknown action" }, { status: 400 });
}
