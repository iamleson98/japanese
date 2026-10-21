import { NextResponse } from "next/server";
import { db, schema } from "@/db";
import { eq } from "drizzle-orm";
import { v4 as uuid } from "uuid";

export const dynamic = "force-dynamic";

/**
 * Smart Study Session API — the guided daily learning loop.
 *
 * Design informed by real-world practice research:
 *  - One-button daily session removes decision fatigue (Duolingo-style habit loop)
 *  - Interleaved blocks (reviews -> new -> grammar -> input -> quiz) beat blocked practice
 *  - Frequency-first new-card ordering (level asc = frequency band, then order)
 *  - 10 new cards/day default = sustainable pace from SRS research (~3,650 words/year)
 *  - Grammar-of-the-day + passage-of-the-day rotate deterministically by date
 *
 * GET  ?newPerDay=10 -> today's plan
 * POST {blocks...}   -> record session completion (+10 XP bonus once per day)
 */

const LEVEL_ORDER = ["N5", "N4", "N3", "N2", "N1"] as const;
const LEVEL_RANK: Record<string, number> = { N5: 0, N4: 1, N3: 2, N2: 3, N1: 4 };

function localDayKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// Deterministic per-day RNG so the plan is stable across refreshes
function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type QuizQuestion = {
  kind: "vocab-meaning" | "vocab-reading" | "kanji-meaning" | "grammar";
  prompt: string;
  promptVi?: string | null;
  options: string[];
  answer: string;
  explanation?: string;
};

function shuffleSeeded<T>(arr: T[], rand: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

async function bumpXpStat(delta: number) {
  const existing = await db.select().from(schema.stats).where(eq(schema.stats.key, "xp"));
  if (existing.length) {
    await db
      .update(schema.stats)
      .set({ value: Math.max(0, existing[0].value + delta), updatedAt: new Date().toISOString() })
      .where(eq(schema.stats.key, "xp"));
  } else {
    await db
      .insert(schema.stats)
      .values({ id: uuid(), key: "xp", value: Math.max(0, delta), updatedAt: new Date().toISOString() });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const newPerDay = Math.min(30, Math.max(0, Number(searchParams.get("newPerDay") ?? 10)));
  const now = new Date();
  const dateKey = localDayKey(now);
  const rand = mulberry32(hashString(dateKey));

  // ---------- Gather data ----------
  const [vocab, kanjiRows, grammarRows, passages, allProgress, sentenceRows, statsRows, activityRows] = await Promise.all([
    db.select().from(schema.vocabulary),
    db.select().from(schema.kanji),
    db.select().from(schema.grammar),
    db.select().from(schema.comprehensionPassage),
    db.select().from(schema.flashcardProgress),
    db.select().from(schema.minedSentence),
    db.select().from(schema.stats),
    db.select().from(schema.dailyActivity),
  ]);

  const vocabById = new Map(vocab.map((v) => [v.id, v]));
  const progressByItem = new Map(allProgress.map((p) => [`${p.itemType}:${p.itemId}`, p]));
  const nowMs = Date.now();

  // ---------- Level detection: first level below 80% vocab mastery ----------
  const totalByLevel: Record<string, number> = {};
  const learnedByLevel: Record<string, number> = {};
  for (const v of vocab) {
    totalByLevel[v.level] = (totalByLevel[v.level] ?? 0) + 1;
    const p = progressByItem.get(`vocabulary:${v.id}`);
    if (p && p.reps > 0) learnedByLevel[v.level] = (learnedByLevel[v.level] ?? 0) + 1;
  }
  let level = "N5";
  for (const lvl of LEVEL_ORDER) {
    const total = totalByLevel[lvl] ?? 0;
    const learned = learnedByLevel[lvl] ?? 0;
    if (total > 0 && learned / total < 0.8) {
      level = lvl;
      break;
    }
    if (total > 0) level = lvl; // keep promoting while >= 80%
  }

  // ---------- Due reviews across all card types ----------
  const dueByType: Record<string, number> = {};
  const dueLists: Record<string, any[]> = {};
  for (const p of allProgress) {
    if (new Date(p.dueAt).getTime() <= nowMs) {
      dueByType[p.itemType] = (dueByType[p.itemType] ?? 0) + 1;
      (dueLists[p.itemType] ??= []).push(p);
    }
  }
  const totalDue = Object.values(dueByType).reduce((a, b) => a + b, 0);

  // ---------- New cards: frequency-first ordering ----------
  const startedVocabIds = new Set(allProgress.filter((p) => p.itemType === "vocabulary").map((p) => p.itemId));
  const freshQueue = vocab
    .filter((v) => !startedVocabIds.has(v.id))
    .sort((a, b) => {
      const lr = (LEVEL_RANK[a.level] ?? 9) - (LEVEL_RANK[b.level] ?? 9);
      if (lr !== 0) return lr;
      return a.order - b.order;
    });
  const newCards = freshQueue.slice(0, newPerDay);

  // ---------- Grammar of the day ----------
  const grammarPool = grammarRows
    .filter((g) => g.level === level)
    .sort((a, b) => a.order - b.order);
  const grammarPoolFinal = grammarPool.length ? grammarPool : grammarRows.sort((a, b) => a.order - b.order);
  let grammarOfDay: any = null;
  if (grammarPoolFinal.length) {
    const g = grammarPoolFinal[Math.floor(rand() * grammarPoolFinal.length)];
    grammarOfDay = {
      id: g.id,
      title: g.title,
      level: g.level,
      structure: g.structure,
      meaning: g.meaning,
      rule: g.rule,
      usage: g.usage,
      commonMistake: g.commonMistake,
      examples: safeJson(g.examples, []),
      // Only include answerable multiple-choice exercises (must have options + answer)
      exercises: (safeJson(g.exercises, []) as any[])
        .filter((e) => e && Array.isArray(e.options) && e.options.length >= 2 && e.answer && e.options.includes(e.answer))
        .slice(0, 2),
    };
  }

  // ---------- Passage of the day (alternate listening / reading by date) ----------
  const wantListening = hashString(dateKey) % 2 === 0;
  const levelPassages = passages.filter((p) => p.level === level);
  const pool = levelPassages.length ? levelPassages : passages;
  const typed = pool.filter((p) => p.type === (wantListening ? "listening" : "reading"));
  const passagePool = typed.length ? typed : pool;
  let passageOfDay: any = null;
  if (passagePool.length) {
    const p = passagePool[Math.floor(rand() * passagePool.length)];
    passageOfDay = {
      id: p.id,
      type: p.type,
      level: p.level,
      title: p.title,
      jp: p.jp,
      reading: p.reading,
      en: p.en,
      vi: p.vi,
      audioText: p.audioText,
      difficulty: p.difficulty,
      questions: safeJson(p.questions, []),
    };
  }

  // ---------- Quiz of the day (5 mixed interleaved questions) ----------
  const learnedVocab = vocab.filter((v) => {
    const p = progressByItem.get(`vocabulary:${v.id}`);
    return p && p.reps > 0;
  });
  const quizPool = learnedVocab.length >= 5 ? learnedVocab : vocab.filter((v) => v.level === level);
  const questions: QuizQuestion[] = [];

  // 2x vocab meaning
  const meaningPicks = shuffleSeeded(quizPool, rand).slice(0, 2);
  for (const v of meaningPicks) {
    const distractors = vocab
      .filter((d) => d.id !== v.id && d.level === v.level && d.meaning !== v.meaning)
      .sort(() => rand() - 0.5)
      .slice(0, 3)
      .map((d) => d.meaning);
    const options = shuffleSeeded([v.meaning, ...distractors], rand);
    questions.push({
      kind: "vocab-meaning",
      prompt: v.word,
      promptVi: v.viMeaning,
      options,
      answer: v.meaning,
      explanation: `${v.reading}${v.romaji ? ` · ${v.romaji}` : ""}`,
    });
  }

  // 1x vocab reading
  const readPick = shuffleSeeded(quizPool, rand)[0];
  if (readPick) {
    const distractors = vocab
      .filter((d) => d.id !== readPick.id && d.reading !== readPick.reading)
      .sort(() => rand() - 0.5)
      .slice(0, 3)
      .map((d) => d.reading);
    questions.push({
      kind: "vocab-reading",
      prompt: readPick.word,
      options: shuffleSeeded([readPick.reading, ...distractors], rand),
      answer: readPick.reading,
      explanation: readPick.meaning,
    });
  }

  // 1x kanji meaning
  const learnedKanji = kanjiRows.filter((k) => {
    const p = progressByItem.get(`kanji:${k.id}`);
    return p && p.reps > 0;
  });
  const kanjiPool = learnedKanji.length ? learnedKanji : kanjiRows.filter((k) => k.level === level);
  const kanjiPick = kanjiPool.length ? shuffleSeeded(kanjiPool, rand)[0] : null;
  if (kanjiPick) {
    const distractors = kanjiRows
      .filter((d) => d.id !== kanjiPick.id && d.meaning !== kanjiPick.meaning)
      .sort(() => rand() - 0.5)
      .slice(0, 3)
      .map((d) => d.meaning);
    questions.push({
      kind: "kanji-meaning",
      prompt: kanjiPick.character,
      options: shuffleSeeded([kanjiPick.meaning, ...distractors], rand),
      answer: kanjiPick.meaning,
      explanation: `音 ${kanjiPick.onyomi} · 訓 ${kanjiPick.kunyomi}`,
    });
  }

  // 1x grammar MCQ (prefer grammar of the day's exercises)
  if (grammarOfDay && grammarOfDay.exercises.length) {
    const ex = grammarOfDay.exercises[0];
    questions.push({
      kind: "grammar",
      prompt: ex.question,
      options: ex.options ?? [],
      answer: ex.answer,
      explanation: grammarOfDay.title,
    });
  }

  // ---------- Today's session state ----------
  const sessionRows = await db.select().from(schema.studySession).where(eq(schema.studySession.date, dateKey));
  const todaySession = sessionRows[0] ?? null;

  const statByKey = new Map(statsRows.map((s) => [s.key, s.value]));
  const todayActivity = activityRows.find((a) => a.date === dateKey)?.count ?? 0;

  // ---------- Time estimate ----------
  const minutes = Math.max(
    3,
    Math.round(
      Math.min(totalDue, 30) * 0.25 +
        newCards.length * 0.4 +
        (grammarOfDay ? 3 : 0) +
        (passageOfDay ? 4 : 0) +
        questions.length * 0.5,
    ),
  );

  return NextResponse.json({
    dateKey,
    level,
    newPerDay,
    today: {
      completed: Boolean(todaySession),
      session: todaySession,
    },
    readiness: LEVEL_ORDER.map((lvl) => ({
      level: lvl,
      learned: learnedByLevel[lvl] ?? 0,
      total: totalByLevel[lvl] ?? 0,
      pct: totalByLevel[lvl] ? Math.round(((learnedByLevel[lvl] ?? 0) / totalByLevel[lvl]) * 100) : 0,
    })),
    plan: {
      reviews: {
        counts: dueByType,
        total: totalDue,
        capped: Math.min(totalDue, 40),
      },
      newCards: {
        count: newCards.length,
        level: newCards.length ? newCards[0].level : level,
        items: newCards.map((v) => ({
          id: v.id,
          word: v.word,
          reading: v.reading,
          meaning: v.meaning,
          viMeaning: v.viMeaning,
          romaji: v.romaji,
          level: v.level,
          exampleJp: v.exampleJp,
          exampleEn: v.exampleEn,
        })),
      },
      grammar: grammarOfDay,
      passage: passageOfDay,
      quiz: { questions },
      minutes,
    },
    minedSentences: sentenceRows.length,
    stats: {
      xp: statByKey.get("xp") ?? 0,
      streak: statByKey.get("streak") ?? 0,
      dailyGoal: statByKey.get("dailyGoal") ?? 20,
      todayActivity,
    },
  });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const dateKey = localDayKey(new Date());

  const payload = {
    reviewsDone: clampInt(body.reviewsDone, 0, 500),
    newCardsDone: clampInt(body.newCardsDone, 0, 100),
    grammarDone: clampInt(body.grammarDone, 0, 1),
    inputDone: clampInt(body.inputDone, 0, 1),
    shadowingDone: clampInt(body.shadowingDone, 0, 1),
    quizScore: clampInt(body.quizScore, 0, 100),
    quizTotal: clampInt(body.quizTotal, 0, 100),
    xpEarned: clampInt(body.xpEarned, 0, 2000),
    durationSec: clampInt(body.durationSec, 0, 6 * 3600),
  };

  const existing = await db.select().from(schema.studySession).where(eq(schema.studySession.date, dateKey));
  const nowIso = new Date().toISOString();

  if (existing.length) {
    // Merge: keep max per block so partial re-completions don't erase progress
    await db
      .update(schema.studySession)
      .set({
        reviewsDone: Math.max(existing[0].reviewsDone, payload.reviewsDone),
        newCardsDone: Math.max(existing[0].newCardsDone, payload.newCardsDone),
        grammarDone: Math.max(existing[0].grammarDone, payload.grammarDone),
        inputDone: Math.max(existing[0].inputDone, payload.inputDone),
        shadowingDone: Math.max(existing[0].shadowingDone, payload.shadowingDone),
        quizScore: Math.max(existing[0].quizScore, payload.quizScore),
        quizTotal: Math.max(existing[0].quizTotal, payload.quizTotal),
        xpEarned: Math.max(existing[0].xpEarned, payload.xpEarned),
        durationSec: Math.max(existing[0].durationSec, payload.durationSec),
        createdAt: nowIso,
      })
      .where(eq(schema.studySession.id, existing[0].id));
    return NextResponse.json({ ok: true, bonusXp: 0, alreadyCompleted: true });
  }

  await db.insert(schema.studySession).values({
    id: uuid(),
    date: dateKey,
    ...payload,
    createdAt: nowIso,
  });

  // Habit-loop reward: +10 XP for completing today's guided session
  await bumpXpStat(10);

  return NextResponse.json({ ok: true, bonusXp: 10 });
}

function clampInt(v: any, min: number, max: number): number {
  const n = Number(v);
  if (!Number.isFinite(n)) return min;
  return Math.min(max, Math.max(min, Math.round(n)));
}

function safeJson<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    const parsed = JSON.parse(raw);
    return (Array.isArray(parsed) ? parsed : fallback) as T;
  } catch {
    return fallback;
  }
}
