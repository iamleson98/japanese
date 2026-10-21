import { NextResponse } from "next/server";
import { db, schema } from "@/db";
import { eq } from "drizzle-orm";
import { retrievability } from "@/lib/fsrs";

export const dynamic = "force-dynamic";

// Local YYYY-MM-DD (avoids UTC off-by-one)
function localDayKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export async function GET() {
  const [kanaRows, vocabRows, grammarRows, kanjiRows, counterRows, conjugationRows, resourceRows, passageRows, progress, statRows, daily, lessonProg, mockResults] =
    await Promise.all([
      db.select().from(schema.kana),
      db.select().from(schema.vocabulary),
      db.select().from(schema.grammar),
      db.select().from(schema.kanji),
      db.select().from(schema.counter),
      db.select().from(schema.conjugation),
      db.select().from(schema.resource),
      db.select().from(schema.comprehensionPassage),
      db.select().from(schema.flashcardProgress),
      db.select().from(schema.stats),
      db.select().from(schema.dailyActivity),
      db.select().from(schema.lessonProgress),
      db.select().from(schema.mockTestResult),
    ]);

  const statMap: Record<string, number> = {};
  for (const s of statRows) statMap[s.key] = s.value;

  const learned = progress.length;
  const now = Date.now();
  const due = progress.filter((p) => new Date(p.dueAt).getTime() <= now).length;
  const totalReviewed = statMap.totalReviewed ?? 0;
  const streak = statMap.streak ?? 0;
  const xp = statMap.xp ?? 0;
  const dailyGoal = statMap.dailyGoal ?? 20;

  const byType: Record<string, number> = {};
  for (const p of progress) byType[p.itemType] = (byType[p.itemType] ?? 0) + 1;

  // Per-level learned (all levels, not just N5-N3)
  const learnedByLevel: Record<string, number> = {};
  const totalByLevel: Record<string, number> = {};
  const learnedVocabIds = new Set(progress.filter((p) => p.itemType === "vocabulary").map((p) => p.itemId));
  const learnedKanjiIds = new Set(progress.filter((p) => p.itemType === "kanji").map((p) => p.itemId));
  const learnedGrammarIds = new Set(progress.filter((p) => p.itemType === "grammar").map((p) => p.itemId));
  for (const v of vocabRows) {
    totalByLevel[v.level] = (totalByLevel[v.level] ?? 0) + 1;
    if (learnedVocabIds.has(v.id)) learnedByLevel[v.level] = (learnedByLevel[v.level] ?? 0) + 1;
  }
  for (const k of kanjiRows) {
    totalByLevel[k.level] = (totalByLevel[k.level] ?? 0) + 1;
    if (learnedKanjiIds.has(k.id)) learnedByLevel[k.level] = (learnedByLevel[k.level] ?? 0) + 1;
  }
  for (const g of grammarRows) {
    totalByLevel[g.level] = (totalByLevel[g.level] ?? 0) + 1;
    if (learnedGrammarIds.has(g.id)) learnedByLevel[g.level] = (learnedByLevel[g.level] ?? 0) + 1;
  }

  // True retention: correct / (correct + wrong) across graded cards
  const correctTotal = progress.reduce((a, p) => a + p.correct, 0);
  const wrongTotal = progress.reduce((a, p) => a + p.wrong, 0);
  const trueRetention = correctTotal + wrongTotal > 0 ? correctTotal / (correctTotal + wrongTotal) : null;

  // Review forecast: due cards over the next 7 days (0 = today)
  const forecast: { day: number; label: string; count: number }[] = [];
  const todayKey = localDayKey(new Date());
  for (let i = 0; i < 7; i++) {
    const d = new Date(now + i * 86400000);
    const key = localDayKey(d);
    const count =
      i === 0
        ? due
        : progress.filter((p) => {
            const dueDate = new Date(p.dueAt);
            return localDayKey(dueDate) === key && dueDate.getTime() > now;
          }).length;
    forecast.push({
      day: i,
      label: d.toLocaleDateString("en-US", { weekday: "short" }),
      count,
    });
  }

  // Today's activity toward the goal
  const todayActivity = daily.find((x) => x.date === todayKey)?.count ?? 0;

  // Average predicted recall of current deck (retrievability now)
  let rSum = 0;
  let rCount = 0;
  for (const p of progress) {
    if (p.stability > 0 && p.lastSeenAt) {
      const elapsed = Math.max(0, (now - new Date(p.lastSeenAt).getTime()) / 86400000);
      rSum += retrievability(elapsed, p.stability);
      rCount++;
    }
  }
  const avgRecall = rCount > 0 ? rSum / rCount : null;

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
    d.setDate(d.getDate() - i);
    const key = localDayKey(d);
    const found = daily.find((x) => x.date === key);
    last7.push({ date: key, count: found?.count ?? 0 });
  }

  const recentMock = mockResults
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3)
    .map((r) => ({
      level: r.level,
      totalScore: r.totalScore,
      passed: r.passed === "true",
      createdAt: r.createdAt,
    }));

  return NextResponse.json({
    counts: {
      kana: kanaRows.length,
      vocabulary: vocabRows.length,
      grammar: grammarRows.length,
      kanji: kanjiRows.length,
      counters: counterRows.length,
      conjugations: conjugationRows.length,
      resources: resourceRows.length,
      passages: passageRows.length,
    },
    progress: {
      learned,
      due,
      totalReviewed,
      streak,
      xp,
      dailyGoal,
      todayActivity,
      byType,
      learnedByLevel,
      totalByLevel,
      trueRetention: trueRetention === null ? null : Math.round(trueRetention * 100) / 100,
      avgRecall: avgRecall === null ? null : Math.round(avgRecall * 100) / 100,
    },
    forecast,
    lessonProgress: lessonStatus,
    activity: last7,
    recentMock,
  });
}
