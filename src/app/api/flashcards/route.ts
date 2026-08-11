import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

/**
 * Flashcards SRS API.
 *
 * GET  ?type=vocabulary&level=N5&limit=20
 *      Returns due cards + a batch of new (unstarted) cards up to `limit`.
 *
 * POST { action: "add", itemType, itemIds: string[] }
 *      Enqueue items into the SRS system (box 0, due now).
 *
 * POST { action: "review", itemType, itemId, quality: "again"|"hard"|"good"|"easy" }
 *      Updates the card's SRS state and bumps daily activity + totalReviewed.
 *
 * POST { action: "reset" }
 *      Clears all progress (useful for testing / starting over).
 */

type Quality = "again" | "hard" | "good" | "easy";

const QUALITY_MAP: Record<Quality, number> = {
  again: 0,
  hard: 3,
  good: 4,
  easy: 5,
};

// Simple SM-2 style update
function computeNext(p: {
  box: number;
  ease: number;
  interval: number;
  reps: number;
  lapses: number;
}, quality: number) {
  const q = quality;
  let ease = p.ease;
  let interval = p.interval;
  let box = p.box;
  let lapses = p.lapses;

  if (q < 3) {
    // failed
    lapses += 1;
    box = 0;
    interval = 0; // due again today (after session reshuffles)
    ease = Math.max(1.3, ease - 0.2);
  } else {
    // passed
    ease = Math.max(1.3, ease + (0.1 - (5 - q) * 0.08));
    box = Math.min(5, box + 1);
    // Interval grows with box: 1 day, 2 days, 4 days, 8 days, 16 days, ...
    const base = [1, 2, 4, 8, 16, 30][box] ?? 30;
    interval = Math.max(1, Math.round(base * (ease / 2.5) + 0.5));
  }
  return { ease, interval, box, lapses };
}

async function bumpDailyActivity(count: number) {
  // Use LOCAL date (not UTC) so streak/activity aligns with the user's day.
  const today = localDayKey(new Date());
  const existing = await db.dailyActivity.findUnique({ where: { date: today } });
  if (existing) {
    await db.dailyActivity.update({
      where: { date: today },
      data: { count: existing.count + count },
    });
  } else {
    await db.dailyActivity.create({ data: { date: today, count } });
  }
  // Recompute streak = consecutive days (ending today or yesterday) with activity > 0.
  const recent = await db.dailyActivity.findMany({
    orderBy: { date: "desc" },
    take: 60,
  });
  const seen = new Set(recent.map((r) => r.date));
  // Streak can start today OR yesterday (so breaking yesterday doesn't break today).
  const todayKey = today;
  const yesterdayKey = localDayKey(new Date(Date.now() - 86400000));
  let streak = 0;
  let cursorDate: string | null = seen.has(todayKey) ? todayKey : seen.has(yesterdayKey) ? yesterdayKey : null;
  if (cursorDate) {
    let d = parseLocalDate(cursorDate);
    while (true) {
      const key = localDayKey(d);
      if (seen.has(key)) {
        streak += 1;
        d = new Date(d.getTime() - 86400000);
      } else break;
    }
  }
  const s = await db.stats.findUnique({ where: { key: "streak" } });
  if (s) await db.stats.update({ where: { key: "streak" }, data: { value: streak } });
  else await db.stats.create({ data: { key: "streak", value: streak } });
}

// Local YYYY-MM-DD (avoids UTC off-by-one in non-UTC timezones)
function localDayKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function parseLocalDate(key: string): Date {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

function dayKey(d: Date) {
  return localDayKey(d);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") || "vocabulary";
  const level = searchParams.get("level"); // optional
  const limit = Math.min(60, Math.max(5, Number(searchParams.get("limit") || 20)));

  // 1. Due cards (existing progress)
  const dueProgress = await db.flashcardProgress.findMany({
    where: {
      itemType: type,
      dueAt: { lte: new Date() },
    },
    take: limit,
  });

  const dueIds = dueProgress.map((p) => p.itemId);
  const dueItems = await fetchItems(type, dueIds);

  // 2. New (unstarted) cards to fill up to `limit`
  const taken = dueItems.length;
  const need = Math.max(0, limit - taken);
  let newItems: any[] = [];
  if (need > 0) {
    const startedIds = await db.flashcardProgress.findMany({
      where: { itemType: type },
      select: { itemId: true },
    });
    const startedSet = new Set(startedIds.map((s) => s.itemId));
    const candidates = await fetchAllItems(type, level);
    const fresh = candidates.filter((c: any) => !startedSet.has(c.id)).slice(0, need);
    newItems = fresh;
  }

  return NextResponse.json({
    type,
    due: dueItems.map((it) => ({ ...it, progress: dueProgress.find((p) => p.itemId === it.id) })),
    fresh: newItems,
  });
}

async function fetchItems(type: string, ids: string[]) {
  if (ids.length === 0) return [];
  if (type === "vocabulary") {
    return db.vocabulary.findMany({ where: { id: { in: ids } } });
  }
  if (type === "kana") {
    return db.kana.findMany({ where: { id: { in: ids } } });
  }
  if (type === "kanji") {
    return db.kanji.findMany({ where: { id: { in: ids } } });
  }
  if (type === "grammar") {
    return db.grammar.findMany({ where: { id: { in: ids } } });
  }
  return [];
}

async function fetchAllItems(type: string, level: string | null) {
  const where = level ? { level } : {};
  if (type === "vocabulary") {
    return db.vocabulary.findMany({ where, orderBy: [{ level: "asc" }, { order: "asc" }] });
  }
  if (type === "kana") {
    // Kana has no level field; ignore level filter
    return db.kana.findMany({ orderBy: [{ order: "asc" }] });
  }
  if (type === "kanji") {
    return db.kanji.findMany({ where, orderBy: [{ level: "asc" }, { order: "asc" }] });
  }
  if (type === "grammar") {
    return db.grammar.findMany({ where, orderBy: [{ level: "asc" }, { order: "asc" }] });
  }
  return [];
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const action = body.action as string | undefined;

  if (action === "reset") {
    await db.flashcardProgress.deleteMany();
    await db.dailyActivity.deleteMany();
    await db.stats.updateMany({ where: { key: "streak" }, data: { value: 0 } });
    await db.stats.updateMany({ where: { key: "totalReviewed" }, data: { value: 0 } });
    return NextResponse.json({ ok: true, reset: true });
  }

  if (action === "add") {
    const itemType = body.itemType as string;
    const itemIds: string[] = body.itemIds ?? [];
    if (!itemType || !itemIds.length) {
      return NextResponse.json({ error: "missing itemType/itemIds" }, { status: 400 });
    }
    const now = new Date();
    let added = 0;
    for (const id of itemIds) {
      try {
        await db.flashcardProgress.upsert({
          where: { itemType_itemId: { itemType, itemId: id } },
          update: {}, // no-op if exists
          create: {
            itemType,
            itemId: id,
            box: 0,
            ease: 2.5,
            interval: 0,
            dueAt: now,
            reps: 0,
            lapses: 0,
            correct: 0,
            wrong: 0,
          },
        });
        added++;
      } catch {}
    }
    return NextResponse.json({ ok: true, added });
  }

  if (action === "review") {
    const itemType = body.itemType as string;
    const itemId = body.itemId as string;
    const quality = body.quality as Quality;
    if (!itemType || !itemId || !quality) {
      return NextResponse.json({ error: "missing params" }, { status: 400 });
    }
    const q = QUALITY_MAP[quality] ?? 4;

    const existing = await db.flashcardProgress.findUnique({
      where: { itemType_itemId: { itemType, itemId } },
    });

    const base = existing ?? {
      box: 0,
      ease: 2.5,
      interval: 0,
      reps: 0,
      lapses: 0,
      correct: 0,
      wrong: 0,
    };

    const next = computeNext(base, q);
    const passed = q >= 3;
    const dueAt = passed
      ? new Date(Date.now() + (next.interval || 0) * 86400000 + 60000)
      : new Date(Date.now() + 60000); // 1 minute for "again"

    const correct = (base.correct ?? 0) + (passed ? 1 : 0);
    const wrong = (base.wrong ?? 0) + (passed ? 0 : 1);
    const reps = (base.reps ?? 0) + 1;

    if (existing) {
      await db.flashcardProgress.update({
        where: { itemType_itemId: { itemType, itemId } },
        data: {
          box: next.box,
          ease: next.ease,
          interval: next.interval,
          dueAt,
          lastSeenAt: new Date(),
          reps,
          lapses: next.lapses,
          correct,
          wrong,
        },
      });
    } else {
      await db.flashcardProgress.create({
        data: {
          itemType,
          itemId,
          box: next.box,
          ease: next.ease,
          interval: next.interval,
          dueAt,
          lastSeenAt: new Date(),
          reps,
          lapses: next.lapses,
          correct,
          wrong,
        },
      });
    }

    // Bump daily activity + total + streak
    await bumpDailyActivity(1);
    const totalStat = await db.stats.findUnique({ where: { key: "totalReviewed" } });
    if (totalStat) {
      await db.stats.update({
        where: { key: "totalReviewed" },
        data: { value: totalStat.value + 1 },
      });
    } else {
      await db.stats.create({ data: { key: "totalReviewed", value: 1 } });
    }

    return NextResponse.json({ ok: true, next: { ...next, dueAt } });
  }

  return NextResponse.json({ error: "unknown action" }, { status: 400 });
}
