import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

/**
 * GET /api/flashcards/deck?type=vocabulary
 * Returns the set of itemIds the learner has added to their SRS deck for a given type.
 * Used by Vocabulary/Grammar/Kanji sections to show "In deck" state correctly.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type"); // vocabulary | kana | kanji | grammar

  const where: { itemType?: string } = {};
  if (type) where.itemType = type;

  const rows = await db.flashcardProgress.findMany({
    where,
    select: {
      itemType: true,
      itemId: true,
      box: true,
      lapses: true,
      ease: true,
      interval: true,
      dueAt: true,
      reps: true,
      correct: true,
      wrong: true,
    },
  });

  // Group by type for the client
  const byType: Record<string, string[]> = {};
  const details: Record<string, { box: number; lapses: number; dueAt: string; reps: number; correct: number; wrong: number; ease: number; interval: number }[]> = {};
  for (const r of rows) {
    if (!byType[r.itemType]) byType[r.itemType] = [];
    byType[r.itemType].push(r.itemId);
    if (!details[r.itemType]) details[r.itemType] = [];
    details[r.itemType].push({
      box: r.box, lapses: r.lapses, ease: r.ease, interval: r.interval,
      dueAt: r.dueAt.toISOString(), reps: r.reps, correct: r.correct, wrong: r.wrong,
    });
  }

  return NextResponse.json({
    byType,
    details,
    total: rows.length,
  });
}
