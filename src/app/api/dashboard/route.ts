import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

// Local YYYY-MM-DD (avoids UTC off-by-one in non-UTC timezones like Asia/Saigon)
function localDayKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export async function GET() {
  // Run counts in parallel (lightweight)
  const [
    kanaCount, vocabCount, grammarCount, kanjiCount,
    counterCount, conjugationCount, resourceCount,
    totalStat, streakStat, daily, progress,
  ] = await Promise.all([
    db.kana.count(),
    db.vocabulary.count(),
    db.grammar.count(),
    db.kanji.count(),
    db.counter.count(),
    db.conjugation.count(),
    db.resource.count(),
    db.stats.findUnique({ where: { key: "totalReviewed" } }),
    db.stats.findUnique({ where: { key: "streak" } }),
    db.dailyActivity.findMany({ orderBy: { date: "desc" }, take: 14 }),
    db.flashcardProgress.findMany(),
  ]);

  const learned = progress.length;
  const due = progress.filter((p) => new Date(p.dueAt) <= new Date()).length;
  const totalReviewed = totalStat?.value ?? 0;
  const streak = streakStat?.value ?? 0;

  const byType: Record<string, number> = {};
  for (const p of progress) byType[p.itemType] = (byType[p.itemType] ?? 0) + 1;

  // Per-level learned: fetch the actual items to know their level.
  const learnedIdsByType: Record<string, string[]> = {};
  for (const p of progress) {
    if (!learnedIdsByType[p.itemType]) learnedIdsByType[p.itemType] = [];
    learnedIdsByType[p.itemType].push(p.itemId);
  }
  const learnedByLevel: Record<string, number> = { N5: 0, N4: 0, N3: 0 };
  if (learnedIdsByType.vocabulary?.length) {
    const vs = await db.vocabulary.findMany({ where: { id: { in: learnedIdsByType.vocabulary } }, select: { level: true } });
    for (const v of vs) if (learnedByLevel[v.level] !== undefined) learnedByLevel[v.level]++;
  }
  if (learnedIdsByType.kanji?.length) {
    const ks = await db.kanji.findMany({ where: { id: { in: learnedIdsByType.kanji } }, select: { level: true } });
    for (const k of ks) if (learnedByLevel[k.level] !== undefined) learnedByLevel[k.level]++;
  }
  if (learnedIdsByType.grammar?.length) {
    const gs = await db.grammar.findMany({ where: { id: { in: learnedIdsByType.grammar } }, select: { level: true } });
    for (const g of gs) if (learnedByLevel[g.level] !== undefined) learnedByLevel[g.level]++;
  }

  // Total available per level — derive from vocab count alone (cheaper than groupBy).
  // We precompute the static totals to avoid extra queries.
  // N5: vocab 95 + kanji 77 + grammar 32; etc. But safer: do a single groupBy on vocabulary.
  const vocabByLevel = await db.vocabulary.groupBy({ by: ["level"], _count: { id: true } });
  const kanjiByLevel = await db.kanji.groupBy({ by: ["level"], _count: { id: true } });
  const grammarByLevel = await db.grammar.groupBy({ by: ["level"], _count: { id: true } });
  const totalByLevel: Record<string, number> = { N5: 0, N4: 0, N3: 0 };
  for (const g of vocabByLevel) if (totalByLevel[g.level] !== undefined) totalByLevel[g.level] += g._count.id;
  for (const g of kanjiByLevel) if (totalByLevel[g.level] !== undefined) totalByLevel[g.level] += g._count.id;
  for (const g of grammarByLevel) if (totalByLevel[g.level] !== undefined) totalByLevel[g.level] += g._count.id;

  const today = new Date();
  const last7: { date: string; count: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = localDayKey(d);
    const found = daily.find((x) => x.date === key);
    last7.push({ date: key, count: found?.count ?? 0 });
  }

  return NextResponse.json({
    counts: {
      kana: kanaCount,
      vocabulary: vocabCount,
      grammar: grammarCount,
      kanji: kanjiCount,
      counters: counterCount,
      conjugations: conjugationCount,
      resources: resourceCount,
    },
    progress: { learned, due, totalReviewed, streak, byType, learnedByLevel, totalByLevel },
    activity: last7,
  });
}
