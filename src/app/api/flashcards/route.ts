import { NextResponse } from "next/server";
import { db, schema } from "@/db";
import { eq, and, lte } from "drizzle-orm";
import { v4 as uuid } from "uuid";

export const dynamic = "force-dynamic";

/**
 * Flashcards SRS API (Drizzle).
 * GET  ?type=vocabulary&level=N5&limit=20  -> due + fresh cards
 * POST {action:"add", itemType, itemIds:[]} -> enqueue into SRS
 * POST {action:"review", itemType, itemId, quality} -> update SRS + bump activity
 * POST {action:"reset"} -> clear all progress
 */

type Quality = "again" | "hard" | "good" | "easy";
const QUALITY_MAP: Record<Quality, number> = { again: 0, hard: 3, good: 4, easy: 5 };

function computeNext(p: { box: number; ease: number; interval: number; reps: number; lapses: number }, quality: number) {
  const q = quality;
  let ease = p.ease;
  let interval = p.interval;
  let box = p.box;
  let lapses = p.lapses;
  if (q < 3) {
    lapses += 1;
    box = 0;
    interval = 0;
    ease = Math.max(130, ease - 20);
  } else {
    ease = Math.max(130, ease + (10 - (5 - q) * 8));
    box = Math.min(5, box + 1);
    const base = [1, 2, 4, 8, 16, 30][box] ?? 30;
    interval = Math.max(1, Math.round(base * (ease / 250) + 0.5));
  }
  return { ease, interval, box, lapses };
}

function localDayKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

async function bumpDailyActivity(count: number) {
  const today = localDayKey(new Date());
  const existing = await db.select().from(schema.dailyActivity).where(eq(schema.dailyActivity.date, today));
  if (existing.length) {
    await db.update(schema.dailyActivity).set({ count: existing[0].count + count, updatedAt: new Date().toISOString() }).where(eq(schema.dailyActivity.date, today));
  } else {
    await db.insert(schema.dailyActivity).values({ id: uuid(), date: today, count, updatedAt: new Date().toISOString() });
  }
  // Recompute streak
  const recent = await db.select().from(schema.dailyActivity).orderBy(schema.dailyActivity.date);
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
  const s = await db.select().from(schema.stats).where(eq(schema.stats.key, "streak"));
  if (s.length) await db.update(schema.stats).set({ value: streak, updatedAt: new Date().toISOString() }).where(eq(schema.stats.key, "streak"));
  else await db.insert(schema.stats).values({ id: uuid(), key: "streak", value: streak, updatedAt: new Date().toISOString() });
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
  return [];
}

async function fetchAllItems(type: string, level: string | null) {
  if (type === "vocabulary") {
    const rows = await db.select().from(schema.vocabulary);
    return level ? rows.filter((v) => v.level === level) : rows;
  }
  if (type === "kana") {
    return db.select().from(schema.kana);
  }
  if (type === "kanji") {
    const rows = await db.select().from(schema.kanji);
    return level ? rows.filter((k) => k.level === level) : rows;
  }
  if (type === "grammar") {
    const rows = await db.select().from(schema.grammar);
    return level ? rows.filter((g) => g.level === level) : rows;
  }
  return [];
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") || "vocabulary";
  const level = searchParams.get("level");
  const limit = Math.min(60, Math.max(5, Number(searchParams.get("limit") || 20)));
  const nowIso = new Date().toISOString();

  // Due cards
  const allProgress = await db.select().from(schema.flashcardProgress).where(eq(schema.flashcardProgress.itemType, type));
  const dueProgress = allProgress.filter((p) => new Date(p.dueAt) <= new Date(nowIso)).slice(0, limit);
  const dueIds = dueProgress.map((p) => p.itemId);
  const dueItems = await fetchItems(type, dueIds);

  // Fresh cards
  const taken = dueItems.length;
  const need = Math.max(0, limit - taken);
  let freshItems: any[] = [];
  if (need > 0) {
    const startedIds = new Set(allProgress.map((p) => p.itemId));
    const candidates = await fetchAllItems(type, level);
    freshItems = candidates.filter((c: any) => !startedIds.has(c.id)).slice(0, need);
  }

  return NextResponse.json({
    type,
    due: dueItems.map((it) => ({ ...it, progress: dueProgress.find((p) => p.itemId === it.id) })),
    fresh: freshItems,
  });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const action = body.action as string | undefined;

  if (action === "reset") {
    await db.delete(schema.flashcardProgress);
    await db.delete(schema.dailyActivity);
    const streakStat = await db.select().from(schema.stats).where(eq(schema.stats.key, "streak"));
    if (streakStat.length) await db.update(schema.stats).set({ value: 0 }).where(eq(schema.stats.key, "streak"));
    const totalStat = await db.select().from(schema.stats).where(eq(schema.stats.key, "totalReviewed"));
    if (totalStat.length) await db.update(schema.stats).set({ value: 0 }).where(eq(schema.stats.key, "totalReviewed"));
    return NextResponse.json({ ok: true, reset: true });
  }

  if (action === "add") {
    const itemType = body.itemType as string;
    const itemIds: string[] = body.itemIds ?? [];
    if (!itemType || !itemIds.length) return NextResponse.json({ error: "missing itemType/itemIds" }, { status: 400 });
    const nowIso = new Date().toISOString();
    let added = 0;
    for (const id of itemIds) {
      const existing = await db.select().from(schema.flashcardProgress).where(and(eq(schema.flashcardProgress.itemType, itemType), eq(schema.flashcardProgress.itemId, id)));
      if (existing.length) continue;
      await db.insert(schema.flashcardProgress).values({
        id: uuid(), itemType, itemId: id,
        box: 0, ease: 250, interval: 0, dueAt: nowIso,
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
    const q = QUALITY_MAP[quality] ?? 4;

    const existing = await db.select().from(schema.flashcardProgress).where(and(eq(schema.flashcardProgress.itemType, itemType), eq(schema.flashcardProgress.itemId, itemId)));
    const base = existing[0] ?? { box: 0, ease: 250, interval: 0, reps: 0, lapses: 0, correct: 0, wrong: 0, id: "", lastSeenAt: null };

    const next = computeNext(base, q);
    const passed = q >= 3;
    const dueAt = passed
      ? new Date(Date.now() + (next.interval || 0) * 86400000 + 60000).toISOString()
      : new Date(Date.now() + 60000).toISOString();
    const correct = (base.correct ?? 0) + (passed ? 1 : 0);
    const wrong = (base.wrong ?? 0) + (passed ? 0 : 1);
    const reps = (base.reps ?? 0) + 1;
    const nowIso = new Date().toISOString();

    if (existing.length) {
      await db.update(schema.flashcardProgress).set({
        box: next.box, ease: next.ease, interval: next.interval, dueAt,
        lastSeenAt: nowIso, reps, lapses: next.lapses, correct, wrong,
      }).where(eq(schema.flashcardProgress.id, base.id));
    } else {
      await db.insert(schema.flashcardProgress).values({
        id: uuid(), itemType, itemId,
        box: next.box, ease: next.ease, interval: next.interval, dueAt,
        lastSeenAt: nowIso, reps, lapses: next.lapses, correct, wrong,
      });
    }

    await bumpDailyActivity(1);
    const totalStat = await db.select().from(schema.stats).where(eq(schema.stats.key, "totalReviewed"));
    if (totalStat.length) await db.update(schema.stats).set({ value: totalStat[0].value + 1, updatedAt: nowIso }).where(eq(schema.stats.key, "totalReviewed"));
    else await db.insert(schema.stats).values({ id: uuid(), key: "totalReviewed", value: 1, updatedAt: nowIso });

    return NextResponse.json({ ok: true, next: { ...next, dueAt } });
  }

  return NextResponse.json({ error: "unknown action" }, { status: 400 });
}
