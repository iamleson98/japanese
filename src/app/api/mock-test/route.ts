import { NextResponse } from "next/server";
import { db, schema } from "@/db";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

/**
 * JLPT Mock Test API.
 * GET  ?level=N5&mode=full|quick -> generated 3-section test
 *      (文字・語彙 / 文法・読解 / 聴解), 60 pts each, 180 total.
 * POST {level, mode, vocab, grammarReading, listening, detail} -> score + save.
 *
 * JLPT pass rules for N5–N3: total ≥ 80/180 and every section ≥ 19/60.
 */

type McqQuestion = {
  key: string;
  section: "vocab" | "grammarReading" | "listening";
  prompt: string;
  subPrompt?: string;
  options: string[];
  answer: string;
  explanation?: string;
  speak?: string; // text for TTS
  passageId?: string;
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickDistractors<T>(pool: T[], chosen: T, keyFn: (x: T) => string, n = 3): T[] {
  const chosenKey = keyFn(chosen);
  return shuffle(pool.filter((x) => keyFn(x) !== chosenKey)).slice(0, n);
}

function parseExercises(raw: string | null): { question: string; options?: string[]; answer: string; hint?: string }[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed as any;
  } catch {}
  return [];
}

function parsePassageQuestions(raw: string): { question: string; options: string[]; answer: string; explanation?: string; questionVi?: string }[] {
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed as any[];
  } catch {}
  return [];
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const level = searchParams.get("level") || "N5";
  const mode = searchParams.get("mode") === "quick" ? "quick" : "full";
  const full = mode === "full";

  const [vocabAll, grammarAll, passages] = await Promise.all([
    db.select().from(schema.vocabulary),
    db.select().from(schema.grammar),
    db.select().from(schema.comprehensionPassage),
  ]);

  const vocabPool = vocabAll.filter((v) => v.level === level);
  const grammarPool = grammarAll.filter((g) => g.level === level);
  // reading/listening passages: exact level first, else fall back to any lower level
  const levelRank: Record<string, number> = { N5: 1, N4: 2, N3: 3, N2: 4, N1: 5 };
  const targetRank = levelRank[level] ?? 1;
  const readingPool = passages
    .filter((p) => p.type === "reading" && (levelRank[p.level] ?? 0) <= targetRank)
    .sort((a, b) => (levelRank[b.level] ?? 0) - (levelRank[a.level] ?? 0)); // prefer closest level
  const listeningPool = passages
    .filter((p) => p.type === "listening" && (levelRank[p.level] ?? 0) <= targetRank)
    .sort((a, b) => (levelRank[b.level] ?? 0) - (levelRank[a.level] ?? 0));

  // ================= Section 1: 文字・語彙 =================
  const vocabQuestions: McqQuestion[] = [];
  const vocabCount = full ? 12 : 6;
  if (vocabPool.length >= 4) {
    const chosen = shuffle(vocabPool).slice(0, vocabCount);
    let idx = 0;
    for (const v of chosen) {
      idx++;
      const variant = idx % 3; // rotate: meaning / reverse / reading
      if (variant === 0 && /[\u4e00-\u9faf]/.test(v.word)) {
        // kanji word → reading
        const distractors = pickDistractors(
          vocabPool.filter((x) => /[\u4e00-\u9faf]/.test(x.word)),
          v,
          (x) => x.reading,
        );
        vocabQuestions.push({
          key: `v-${v.id}-r`,
          section: "vocab",
          prompt: v.word,
          subPrompt: "What is the correct reading?",
          options: shuffle([v.reading, ...distractors.map((d) => d.reading)]),
          answer: v.reading,
          speak: v.word,
        });
      } else if (variant === 1) {
        // meaning → word
        const distractors = pickDistractors(vocabPool, v, (x) => x.word);
        vocabQuestions.push({
          key: `v-${v.id}-w`,
          section: "vocab",
          prompt: v.meaning,
          subPrompt: "Which word matches this meaning?",
          options: shuffle([v.word, ...distractors.map((d) => d.word)]),
          answer: v.word,
          speak: v.word,
        });
      } else {
        // word → meaning
        const distractors = pickDistractors(vocabPool, v, (x) => x.meaning);
        vocabQuestions.push({
          key: `v-${v.id}-m`,
          section: "vocab",
          prompt: v.word,
          subPrompt: v.romaji ?? v.reading,
          options: shuffle([v.meaning, ...distractors.map((d) => d.meaning)]),
          answer: v.meaning,
          speak: v.word,
        });
      }
    }
  }

  // ================= Section 2: 文法・読解 =================
  const grammarQuestions: McqQuestion[] = [];
  const grammarCount = full ? 8 : 5;
  if (grammarPool.length >= 2) {
    // Prefer real MCQ exercises from grammar content
    const exerciseBank: McqQuestion[] = [];
    for (const g of grammarPool) {
      for (const ex of parseExercises(g.exercises)) {
        if (ex.options && ex.options.length >= 3 && ex.options.includes(ex.answer)) {
          exerciseBank.push({
            key: `g-${g.id}-${exerciseBank.length}`,
            section: "grammarReading",
            prompt: ex.question,
            options: shuffle(ex.options.filter(Boolean)),
            answer: ex.answer,
            explanation: ex.hint,
          });
        }
      }
    }
    const shuffledEx = shuffle(exerciseBank).slice(0, grammarCount);
    grammarQuestions.push(...shuffledEx);

    // top up with structure→meaning questions if needed
    if (grammarQuestions.length < grammarCount) {
      const need = grammarCount - grammarQuestions.length;
      const chosen = shuffle(grammarPool).slice(0, need);
      for (const g of chosen) {
        const distractors = pickDistractors(grammarPool, g, (x) => x.meaning);
        grammarQuestions.push({
          key: `g-${g.id}-m`,
          section: "grammarReading",
          prompt: g.structure,
          subPrompt: `Which best matches this pattern? (${g.title})`,
          options: shuffle([g.meaning, ...distractors.map((d) => d.meaning)]),
          answer: g.meaning,
        });
      }
    }
  }

  // Reading passages (1–2)
  const readTarget = full ? 2 : 1;
  const chosenReadings = shuffle(readingPool.slice(0, Math.max(readTarget * 2, 4))).slice(0, readTarget);
  for (const p of chosenReadings) {
    for (const q of parsePassageQuestions(p.questions)) {
      grammarQuestions.push({
        key: `r-${p.id}-${grammarQuestions.length}`,
        section: "grammarReading",
        prompt: q.question,
        subPrompt: p.title,
        options: q.options,
        answer: q.answer,
        explanation: q.explanation,
        passageId: p.id,
      });
    }
  }

  // ================= Section 3: 聴解 =================
  const listeningQuestions: McqQuestion[] = [];
  const listenTarget = full ? 3 : 2;
  const chosenListening = shuffle(listeningPool.slice(0, Math.max(listenTarget * 2, 4))).slice(0, listenTarget);
  for (const p of chosenListening) {
    for (const q of parsePassageQuestions(p.questions)) {
      listeningQuestions.push({
        key: `l-${p.id}-${listeningQuestions.length}`,
        section: "listening",
        prompt: q.question,
        subPrompt: p.title,
        options: q.options,
        answer: q.answer,
        explanation: q.explanation,
        speak: p.audioText ?? p.jp,
        passageId: p.id,
      });
    }
  }

  // Reading passages sent along for the reading section display
  const readings = chosenReadings.map((p) => ({
    id: p.id,
    title: p.title,
    jp: p.jp,
    reading: p.reading,
    en: p.en,
    level: p.level,
  }));
  const listenings = chosenListening.map((p) => ({
    id: p.id,
    title: p.title,
    audioText: p.audioText ?? p.jp,
    level: p.level,
    durationSec: p.durationSec,
  }));

  return NextResponse.json({
    level,
    mode,
    sections: {
      vocab: vocabQuestions,
      grammarReading: grammarQuestions,
      listening: listeningQuestions,
    },
    readings,
    listenings,
    timeLimits: {
      // per-section minutes (roughly scaled from real JLPT timings)
      vocab: full ? 12 : 6,
      grammarReading: full ? 30 : 15,
      listening: full ? 20 : 10,
    },
    passRules: { total: 80, section: 19, maxTotal: 180, maxSection: 60 },
  });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const level = body.level as string | undefined;
  const mode = body.mode === "quick" ? "quick" : "full";
  const sec = (name: string) => {
    const s = body[name] as { correct?: number; total?: number } | undefined;
    const correct = Math.max(0, Math.round(Number(s?.correct ?? 0)));
    const total = Math.max(0, Math.round(Number(s?.total ?? 0)));
    return { correct, total, score: total > 0 ? Math.round((correct / total) * 60) : 0 };
  };
  const vocab = sec("vocab");
  const grammarReading = sec("grammarReading");
  const listening = sec("listening");

  if (!level || !["N5", "N4", "N3", "N2", "N1"].includes(level)) {
    return NextResponse.json({ error: "invalid level" }, { status: 400 });
  }

  const totalScore = vocab.score + grammarReading.score + listening.score;
  const passed =
    totalScore >= 80 &&
    vocab.score >= 19 &&
    grammarReading.score >= 19 &&
    listening.score >= 19;

  await db.insert(schema.mockTestResult).values({
    id: crypto.randomUUID(),
    level,
    mode,
    vocabScore: vocab.score,
    grammarReadingScore: grammarReading.score,
    listeningScore: listening.score,
    totalScore,
    passed: passed ? "true" : "false",
    detail: typeof body.detail === "string" ? body.detail.slice(0, 20000) : null,
    createdAt: new Date().toISOString(),
  });

  // XP: 2 per correct answer + 50 bonus for a pass
  const xpGain = (vocab.correct + grammarReading.correct + listening.correct) * 2 + (passed ? 50 : 0);
  const existing = await db.select().from(schema.stats).where(eq(schema.stats.key, "xp"));
  if (existing.length) {
    await db
      .update(schema.stats)
      .set({ value: existing[0].value + xpGain, updatedAt: new Date().toISOString() })
      .where(eq(schema.stats.key, "xp"));
  } else {
    await db.insert(schema.stats).values({ id: crypto.randomUUID(), key: "xp", value: xpGain });
  }

  // recent history
  const history = await db.select().from(schema.mockTestResult);
  const recent = history
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 10)
    .map((r) => ({
      id: r.id,
      level: r.level,
      mode: r.mode,
      totalScore: r.totalScore,
      vocabScore: r.vocabScore,
      grammarReadingScore: r.grammarReadingScore,
      listeningScore: r.listeningScore,
      passed: r.passed === "true",
      createdAt: r.createdAt,
    }));

  return NextResponse.json({ ok: true, scores: { vocab, grammarReading, listening, totalScore }, passed, xpGain, recent });
}
