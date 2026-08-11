import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

/**
 * GET /api/lessons
 * Returns the guided-lesson structure: ordered lessons with vocab/grammar counts.
 */
const LESSONS = [
  { id: 1, level: "N5", title: "First Words", jp: "はじめの言葉", desc: "Greetings, yes/no, please, thanks." },
  { id: 2, level: "N5", title: "Introducing Yourself", jp: "自己紹介", desc: "Pronouns, family words, basic nouns." },
  { id: 3, level: "N5", title: "Time & Days", jp: "時間と日", desc: "Days of week, time expressions, now/then." },
  { id: 4, level: "N5", title: "Food & Drink", jp: "食べ物と飲み物", desc: "Food vocab, meals, ordering phrases." },
  { id: 5, level: "N5", title: "Places & Things", jp: "場所と物", desc: "Shops, stations, rooms, work, names." },
  { id: 6, level: "N5", title: "Nature & Adjectives", jp: "自然と形容詞", desc: "Weather, colors, sizes, feelings." },
  { id: 7, level: "N5", title: "Actions & Verbs", jp: "動詞", desc: "Common verbs, adverbs, basic conjugation." },
  { id: 8, level: "N4", title: "Conditions & Obligations", jp: "条件と義務", desc: "たら/ば/と, must/don't have to, permission." },
  { id: 9, level: "N3", title: "Conjecture & Nuance", jp: "推量とニュアンス", desc: "かもしれない, はず, ようだ, らしい, みたいだ." },
];

export async function GET() {
  // Count how many vocab/grammar are tagged per lesson
  const vocabCounts = await db.vocabulary.groupBy({
    by: ["lesson"],
    where: { lesson: { not: null } },
    _count: { id: true },
  });
  const grammarCounts = await db.grammar.groupBy({
    by: ["lesson"],
    where: { lesson: { not: null } },
    _count: { id: true },
  });

  const vocabMap: Record<number, number> = {};
  for (const v of vocabCounts) if (v.lesson) vocabMap[v.lesson] = v._count.id;
  const grammarMap: Record<number, number> = {};
  for (const g of grammarCounts) if (g.lesson) grammarMap[g.lesson] = g._count.id;

  const lessons = LESSONS.map((l) => ({
    ...l,
    vocabCount: vocabMap[l.id] ?? 0,
    grammarCount: grammarMap[l.id] ?? 0,
  }));

  return NextResponse.json({ lessons });
}
