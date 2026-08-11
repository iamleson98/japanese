import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

/**
 * GET /api/word-of-day
 * Returns a deterministic "word of the day" — same word for the same date.
 */
export async function GET() {
  const today = new Date();
  const dateKey = today.toLocaleDateString("en-CA"); // YYYY-MM-DD local

  // Deterministic pick based on date
  const allVocab = await db.vocabulary.findMany({
    where: { exampleJp: { not: null } },
    select: { id: true, word: true, reading: true, meaning: true, romaji: true, level: true, category: true, exampleJp: true, exampleEn: true, pos: true },
  });
  if (allVocab.length === 0) return NextResponse.json({ word: null });

  // simple deterministic hash from date string
  let hash = 0;
  for (let i = 0; i < dateKey.length; i++) {
    hash = (hash * 31 + dateKey.charCodeAt(i)) >>> 0;
  }
  const idx = hash % allVocab.length;
  const word = allVocab[idx];

  return NextResponse.json({
    word,
    date: dateKey,
  });
}
