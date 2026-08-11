import { NextResponse } from "next/server";
import { db, schema } from "@/db";
import { eq } from "drizzle-orm";
import { v4 as uuid } from "uuid";

export const dynamic = "force-dynamic";

/**
 * Minna-no-Nihongo-inspired lesson curriculum.
 * Each lesson flows: Grammar → Vocabulary → Kanji → Examples → Practice → Review.
 * Periodic review lessons (every 5th) consolidate prior material.
 *
 * Lessons 1-12: N5  (Beginner)
 * Lessons 13-18: N4  (Elementary)
 * Lessons 19-25: N3  (Intermediate)
 */

type LessonStep = "grammar" | "vocab" | "kanji" | "examples" | "practice" | "review";

type LessonDef = {
  id: number;
  level: "N5" | "N4" | "N3";
  title: string;
  jp: string;
  chapter: string;
  desc: string;
  steps: LessonStep[];
  isReview?: boolean;
};

const LESSONS: LessonDef[] = [
  // N5 (Lessons 1-12)
  { id: 1, level: "N5", title: "First Greetings & Self-Introduction", jp: "あいさつ・自己紹介", chapter: "N5 · Foundations", desc: "Greetings, yes/no, please, thanks. The copula です and the topic marker は.", steps: ["grammar", "vocab", "examples", "practice", "review"] },
  { id: 2, level: "N5", title: "Pronouns, Family & Question Words", jp: "代名詞・家族・疑問詞", chapter: "N5 · Foundations", desc: "I/you/he/she, this/that, family terms, who/what/where.", steps: ["grammar", "vocab", "kanji", "examples", "practice", "review"] },
  { id: 3, level: "N5", title: "Numbers, Time & Days", jp: "数字・時間・曜日", chapter: "N5 · Daily Life", desc: "Count to 10,000, days of the week, time expressions, に for time.", steps: ["grammar", "vocab", "kanji", "examples", "practice", "review"] },
  { id: 4, level: "N5", title: "Food & Drink", jp: "食べ物と飲み物", chapter: "N5 · Daily Life", desc: "Food vocab, meals, ordering. The object marker を and the particle で.", steps: ["grammar", "vocab", "examples", "practice", "review"] },
  { id: 5, level: "N5", title: "Places & Movement", jp: "場所と移動", chapter: "N5 · Daily Life", desc: "Shops, stations, rooms. Movement verbs with に・へ・で, the particle と.", steps: ["grammar", "vocab", "kanji", "examples", "practice", "review"] },
  { id: 6, level: "N5", title: "Adjectives & Nature", jp: "形容詞・自然", chapter: "N5 · Around You", desc: "i-adjectives and na-adjectives, weather, colors, sizes.", steps: ["grammar", "vocab", "kanji", "examples", "practice", "review"] },
  { id: 7, level: "N5", title: "Verbs & Adverbs", jp: "動詞・副詞", chapter: "N5 · Around You", desc: "Common verbs, adverbs, the ます form, たい (want to), ましょう.", steps: ["grammar", "vocab", "examples", "practice", "review"] },
  { id: 8, level: "N5", title: "The て-form & Requests", jp: "て形・依頼", chapter: "N5 · Verb Forms", desc: "The all-important て-form, 〜てください, 〜ている, 〜ない, 〜た.", steps: ["grammar", "vocab", "examples", "practice", "review"] },
  { id: 9, level: "N5", title: "Comparison & Opinions", jp: "比較・意見", chapter: "N5 · Verb Forms", desc: "〜より〜のほうが, 一番, 〜が欲しい, 〜と思う.", steps: ["grammar", "vocab", "examples", "practice", "review"] },
  { id: 10, level: "N5", title: "N5 Review & Consolidation", jp: "N5 復習", chapter: "N5 · Review", desc: "Review all N5 grammar, vocab, and kanji. Take a full N5 mock quiz.", steps: ["review", "practice"], isReview: true },
  // Extra N5 review
  { id: 11, level: "N5", title: "More Particles & Sentence Endings", jp: "助詞・文末表現", chapter: "N5 · Wrap-up", desc: "が (subject), ね/よ, や/など, か. Subtle but essential.", steps: ["grammar", "examples", "practice", "review"] },
  { id: 12, level: "N5", title: "N5 Final Check", jp: "N5 最終確認", chapter: "N5 · Wrap-up", desc: "Final N5 review — make sure you're solid before moving to N4.", steps: ["review", "practice"], isReview: true },

  // N4 (Lessons 13-18)
  { id: 13, level: "N4", title: "Conditionals: たら, ば, と", jp: "条件形", chapter: "N4 · Conditionals & Obligation", desc: "Three conditional forms and when to use each. Permission, prohibition, obligation.", steps: ["grammar", "vocab", "kanji", "examples", "practice", "review"] },
  { id: 14, level: "N4", title: "Giving & Receiving Favors", jp: "授受表現", chapter: "N4 · Social Verbs", desc: "〜てあげる/〜てもらう/〜てくれる — the heart of Japanese social politeness.", steps: ["grammar", "vocab", "examples", "practice", "review"] },
  { id: 15, level: "N4", title: "Hearsay & Conjecture", jp: "伝聞・推量", chapter: "N4 · Social Verbs", desc: "〜そうです (I heard / looks like), 〜たがる (3rd person desire), 〜つもり (intention).", steps: ["grammar", "vocab", "examples", "practice", "review"] },
  { id: 16, level: "N4", title: "Sequencing: ながら, てから, し", jp: "順序・並列", chapter: "N4 · Connections", desc: "While, after, and 'besides' — connecting actions and reasons.", steps: ["grammar", "vocab", "examples", "practice", "review"] },
  { id: 17, level: "N4", title: "Advice & Reasoning", jp: "助言・理由", chapter: "N4 · Connections", desc: "〜ほうがいい (advice), ので (formal because), 時 (when), 前に/後で.", steps: ["grammar", "vocab", "examples", "practice", "review"] },
  { id: 18, level: "N4", title: "N4 Review", jp: "N4 復習", chapter: "N4 · Review", desc: "Consolidate all N4 grammar with mixed practice.", steps: ["review", "practice"], isReview: true },

  // N3 (Lessons 19-25)
  { id: 19, level: "N3", title: "Possibility & Expectation", jp: "可能性・予想", chapter: "N3 · Conjecture", desc: "〜かもしれない, 〜はず, 〜に違いない — degrees of certainty.", steps: ["grammar", "vocab", "kanji", "examples", "practice", "review"] },
  { id: 20, level: "N3", title: "Seeming Patterns: よう, らしい, みたい", jp: "様態・伝聞", chapter: "N3 · Conjecture", desc: "Three ways to say 'seems like' with subtle differences.", steps: ["grammar", "vocab", "examples", "practice", "review"] },
  { id: 21, level: "N3", title: "Completion & Trying: てしまう, ておく, てみる", jp: "完了・試み", chapter: "N3 · Auxiliary Verbs", desc: "Three te-form + auxiliary patterns for finishing, preparing, trying.", steps: ["grammar", "examples", "practice", "review"] },
  { id: 22, level: "N3", title: "Nominalizers: ことにする, ことになる, ようになる", jp: "名詞化", chapter: "N3 · Auxiliary Verbs", desc: "Decisions, decisions-made-for-you, and gradual change.", steps: ["grammar", "examples", "practice", "review"] },
  { id: 23, level: "N3", title: "Emphasis & Excess: ばかり, てたまらない", jp: "強調・過剰", chapter: "N3 · Nuance", desc: "Nothing but, unbearably so, and other emphasis patterns.", steps: ["grammar", "vocab", "examples", "practice", "review"] },
  { id: 24, level: "N3", title: "Casual Speech: ないで, ないと, なきゃ", jp: "話し言葉", chapter: "N3 · Nuance", desc: "How Japanese speakers actually talk — casual truncations.", steps: ["grammar", "examples", "practice", "review"] },
  { id: 25, level: "N3", title: "N3 Final Review", jp: "N3 最終復習", chapter: "N3 · Review", desc: "Comprehensive N3 review. You're now intermediate!", steps: ["review", "practice"], isReview: true },
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lessonId = searchParams.get("id");

  if (lessonId) {
    // Detailed lesson view: return lesson def + content counts + progress
    const id = Number(lessonId);
    const lesson = LESSONS.find((l) => l.id === id);
    if (!lesson) return NextResponse.json({ error: "lesson not found" }, { status: 404 });

    const [vocab, grammar, kanji] = await Promise.all([
      db.select().from(schema.vocabulary).where(eq(schema.vocabulary.lesson, id)),
      db.select().from(schema.grammar).where(eq(schema.grammar.lesson, id)),
      lesson.level === "N5" || lesson.level === "N4"
        ? db.select().from(schema.kanji).where(eq(schema.kanji.level, lesson.level))
        : Promise.resolve([]),
    ]);

    // Parse grammar JSON fields
    const grammarParsed = grammar.map((g) => ({
      ...g,
      examples: g.examples ? JSON.parse(g.examples) : [],
      exercises: g.exercises ? JSON.parse(g.exercises) : [],
    }));

    // Progress
    const lp = await db.select().from(schema.lessonProgress).where(eq(schema.lessonProgress.lessonId, id));
    const progress = lp[0];
    const completedSteps = progress?.completedSteps ? progress.completedSteps.split(",").filter(Boolean) : [];

    return NextResponse.json({
      lesson,
      vocab,
      grammar: grammarParsed,
      kanji: kanji.slice(0, 30), // cap for display
      progress: {
        started: !!progress,
        completed: progress?.completedAt !== null && !!progress,
        completedSteps,
        steps: lesson.steps,
      },
    });
  }

  // List all lessons + progress
  const allProgress = await db.select().from(schema.lessonProgress);
  const progressMap: Record<number, { started: boolean; completed: boolean; steps: string[] }> = {};
  for (const lp of allProgress) {
    progressMap[lp.lessonId] = {
      started: true,
      completed: lp.completedAt !== null,
      steps: lp.completedSteps ? lp.completedSteps.split(",").filter(Boolean) : [],
    };
  }

  // Count content per lesson
  const vocabByLesson = await db.select({ lesson: schema.vocabulary.lesson }).from(schema.vocabulary);
  const grammarByLesson = await db.select({ lesson: schema.grammar.lesson }).from(schema.grammar);
  const vocabCount: Record<number, number> = {};
  const grammarCount: Record<number, number> = {};
  for (const v of vocabByLesson) if (v.lesson) vocabCount[v.lesson] = (vocabCount[v.lesson] ?? 0) + 1;
  for (const g of grammarByLesson) if (g.lesson) grammarCount[g.lesson] = (grammarCount[g.lesson] ?? 0) + 1;

  const lessons = LESSONS.map((l) => ({
    ...l,
    vocabCount: vocabCount[l.id] ?? 0,
    grammarCount: grammarCount[l.id] ?? 0,
    progress: progressMap[l.id] ?? { started: false, completed: false, steps: [] },
  }));

  return NextResponse.json({ lessons });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const action = body.action;

  if (action === "mark-step") {
    const lessonId = Number(body.lessonId);
    const step = body.step as LessonStep;
    if (!lessonId || !step) return NextResponse.json({ error: "missing params" }, { status: 400 });
    const existing = await db.select().from(schema.lessonProgress).where(eq(schema.lessonProgress.lessonId, lessonId));
    const steps = existing[0]?.completedSteps ? existing[0].completedSteps.split(",").filter(Boolean) : [];
    if (!steps.includes(step)) steps.push(step);
    const stepsStr = steps.join(",");
    const nowIso = new Date().toISOString();
    if (existing.length) {
      await db.update(schema.lessonProgress).set({ completedSteps: stepsStr, updatedAt: nowIso }).where(eq(schema.lessonProgress.lessonId, lessonId));
    } else {
      await db.insert(schema.lessonProgress).values({ id: uuid(), lessonId, completedSteps: stepsStr, startedAt: nowIso, updatedAt: nowIso });
    }
    return NextResponse.json({ ok: true, completedSteps: steps });
  }

  if (action === "complete-lesson") {
    const lessonId = Number(body.lessonId);
    if (!lessonId) return NextResponse.json({ error: "missing lessonId" }, { status: 400 });
    const existing = await db.select().from(schema.lessonProgress).where(eq(schema.lessonProgress.lessonId, lessonId));
    const nowIso = new Date().toISOString();
    if (existing.length) {
      await db.update(schema.lessonProgress).set({ completedAt: nowIso, updatedAt: nowIso }).where(eq(schema.lessonProgress.lessonId, lessonId));
    } else {
      await db.insert(schema.lessonProgress).values({ id: uuid(), lessonId, completedSteps: "grammar,vocab,kanji,examples,practice,review", startedAt: nowIso, completedAt: nowIso, updatedAt: nowIso });
    }
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "unknown action" }, { status: 400 });
}
