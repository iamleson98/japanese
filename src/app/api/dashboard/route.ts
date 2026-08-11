import { NextResponse } from "next/server";
import { db, schema } from "@/db";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

// Local YYYY-MM-DD (avoids UTC off-by-one)
function localDayKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export async function GET() {
  const [kanaRows, vocabRows, grammarRows, kanjiRows, counterRows, conjugationRows, resourceRows, progress, totalStat, streakStat, daily, lessonProg] =
    await Promise.all([
      db.select().from(schema.kana),
      db.select().from(schema.vocabulary),
      db.select().from(schema.grammar),
      db.select().from(schema.kanji),
      db.select().from(schema.counter),
      db.select().from(schema.conjugation),
      db.select().from(schema.resource),
      db.select().from(schema.flashcardProgress),
      db.select().from(schema.stats).where(eq(schema.stats.key, "totalReviewed")),
      db.select().from(schema.stats).where(eq(schema.stats.key, "streak")),
      db.select().from(schema.dailyActivity),
      db.select().from(schema.lessonProgress),
    ]);

  const learned = progress.length;
  const now = new Date();
  const due = progress.filter((p) => new Date(p.dueAt) <= now).length;
  const totalReviewed = totalStat[0]?.value ?? 0;
  const streak = streakStat[0]?.value ?? 0;

  const byType: Record<string, number> = {};
  for (const p of progress) byType[p.itemType] = (byType[p.itemType] ?? 0) + 1;

  // Per-level learned
  const learnedByLevel: Record<string, number> = { N5: 0, N4: 0, N3: 0 };
  const learnedVocabIds = new Set(progress.filter((p) => p.itemType === "vocabulary").map((p) => p.itemId));
  const learnedKanjiIds = new Set(progress.filter((p) => p.itemType === "kanji").map((p) => p.itemId));
  const learnedGrammarIds = new Set(progress.filter((p) => p.itemType === "grammar").map((p) => p.itemId));
  for (const v of vocabRows) if (learnedVocabIds.has(v.id) && learnedByLevel[v.level] !== undefined) learnedByLevel[v.level]++;
  for (const k of kanjiRows) if (learnedKanjiIds.has(k.id) && learnedByLevel[k.level] !== undefined) learnedByLevel[k.level]++;
  for (const g of grammarRows) if (learnedGrammarIds.has(g.id) && learnedByLevel[g.level] !== undefined) learnedByLevel[g.level]++;

  // Total available per level
  const totalByLevel: Record<string, number> = { N5: 0, N4: 0, N3: 0 };
  for (const v of vocabRows) if (totalByLevel[v.level] !== undefined) totalByLevel[v.level]++;
  for (const k of kanjiRows) if (totalByLevel[k.level] !== undefined) totalByLevel[k.level]++;
  for (const g of grammarRows) if (totalByLevel[g.level] !== undefined) totalByLevel[g.level]++;

  // Lesson progress
  const lessonStatus: Record<number, { started: boolean; completed: boolean; steps: string }> = {};
  for (const lp of lessonProg) {
    lessonStatus[lp.lessonId] = {
      started: true,
      completed: lp.completedAt !== null,
      steps: lp.completedSteps ?? "",
    };
  }

  const last7: { date: string; count: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    const key = localDayKey(d);
    const found = daily.find((x) => x.date === key);
    last7.push({ date: key, count: found?.count ?? 0 });
  }

  return NextResponse.json({
    counts: {
      kana: kanaRows.length,
      vocabulary: vocabRows.length,
      grammar: grammarRows.length,
      kanji: kanjiRows.length,
      counters: counterRows.length,
      conjugations: conjugationRows.length,
      resources: resourceRows.length,
    },
    progress: { learned, due, totalReviewed, streak, byType, learnedByLevel, totalByLevel },
    lessonProgress: lessonStatus,
    activity: last7,
  });
}
