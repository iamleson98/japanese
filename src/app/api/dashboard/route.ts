import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const [kanaCount, vocabCount, grammarCount, kanjiCount, resourceCount, progress, totalStat, streakStat, daily] =
    await Promise.all([
      db.kana.count(),
      db.vocabulary.count(),
      db.grammar.count(),
      db.kanji.count(),
      db.resource.count(),
      db.flashcardProgress.findMany(),
      db.stats.findUnique({ where: { key: "totalReviewed" } }),
      db.stats.findUnique({ where: { key: "streak" } }),
      db.dailyActivity.findMany({ orderBy: { date: "desc" }, take: 14 }),
    ]);

  const learned = progress.length;
  const due = progress.filter((p) => new Date(p.dueAt) <= new Date()).length;
  const totalReviewed = totalStat?.value ?? 0;
  const streak = streakStat?.value ?? 0;

  const byType: Record<string, number> = {};
  for (const p of progress) {
    byType[p.itemType] = (byType[p.itemType] ?? 0) + 1;
  }

  const today = new Date();
  const last7: { date: string; count: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    const found = daily.find((x) => x.date === key);
    last7.push({ date: key, count: found?.count ?? 0 });
  }

  return NextResponse.json({
    counts: {
      kana: kanaCount,
      vocabulary: vocabCount,
      grammar: grammarCount,
      kanji: kanjiCount,
      resources: resourceCount,
    },
    progress: { learned, due, totalReviewed, streak, byType },
    activity: last7,
  });
}
