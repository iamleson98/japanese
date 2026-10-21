import { NextResponse } from "next/server";
import { db, schema } from "@/db";
import { desc, eq, and } from "drizzle-orm";
import { v4 as uuid } from "uuid";

export const dynamic = "force-dynamic";

/**
 * Sentence mining API (real-world immersion-learner practice).
 * GET                        -> list mined sentences (newest first) + count
 * POST {textJp, textEn, ...} -> mine a sentence; auto-enrolls it into the SRS deck (due now)
 * POST {action:"delete", id} -> remove a mined sentence and its SRS progress
 */

export async function GET() {
  const rows = await db.select().from(schema.minedSentence).orderBy(desc(schema.minedSentence.createdAt));
  const progress = await db.select().from(schema.flashcardProgress).where(eq(schema.flashcardProgress.itemType, "sentence"));
  const byId = new Map(progress.map((p) => [p.itemId, p]));
  return NextResponse.json({
    sentences: rows.map((s) => {
      const p = byId.get(s.id);
      return {
        ...s,
        srs: p
          ? {
              reps: p.reps,
              stability: p.stability,
              interval: p.interval,
              dueAt: p.dueAt,
              lastSeenAt: p.lastSeenAt,
            }
          : null,
      };
    }),
    count: rows.length,
  });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const action = body.action as string | undefined;

  if (action === "delete") {
    const id = body.id as string | undefined;
    if (!id) return NextResponse.json({ error: "missing id" }, { status: 400 });
    await db.delete(schema.flashcardProgress).where(and(eq(schema.flashcardProgress.itemType, "sentence"), eq(schema.flashcardProgress.itemId, id)));
    await db.delete(schema.minedSentence).where(eq(schema.minedSentence.id, id));
    return NextResponse.json({ ok: true, deleted: true });
  }

  const textJp = (body.textJp as string | undefined)?.trim();
  const textEn = (body.textEn as string | undefined)?.trim();
  const textVi = (body.textVi as string | undefined)?.trim() || null;
  const reading = (body.reading as string | undefined)?.trim() || null;
  const sourceType = (body.sourceType as string | undefined) ?? "manual";
  const sourceId = (body.sourceId as string | undefined) ?? null;

  if (!textJp || !textEn) return NextResponse.json({ error: "textJp and textEn are required" }, { status: 400 });
  if (!/[\u3040-\u30ff\u4e00-\u9fff]/.test(textJp)) {
    return NextResponse.json({ error: "textJp must contain Japanese text" }, { status: 400 });
  }

  // Dedupe on source identity when available
  if (sourceId) {
    const existing = await db
      .select()
      .from(schema.minedSentence)
      .where(and(eq(schema.minedSentence.sourceType, sourceType), eq(schema.minedSentence.sourceId, sourceId)));
    if (existing.length) return NextResponse.json({ ok: true, alreadyMined: true, id: existing[0].id });
  }
  // Dedupe on identical Japanese text (same sentence met twice should stay one card)
  const sameText = await db.select().from(schema.minedSentence).where(eq(schema.minedSentence.textJp, textJp));
  if (sameText.length) return NextResponse.json({ ok: true, alreadyMined: true, id: sameText[0].id });

  const id = uuid();
  const nowIso = new Date().toISOString();
  await db.insert(schema.minedSentence).values({
    id,
    userId: null,
    textJp,
    reading,
    textEn,
    textVi,
    sourceType,
    sourceId,
    createdAt: nowIso,
  });

  // Auto-enroll into the SRS deck — zero friction (due immediately)
  await db.insert(schema.flashcardProgress).values({
    id: uuid(),
    itemType: "sentence",
    itemId: id,
    box: 0,
    ease: 250,
    interval: 0,
    stability: 0,
    difficulty: 5,
    dueAt: nowIso,
    lastSeenAt: null,
    reps: 0,
    lapses: 0,
    correct: 0,
    wrong: 0,
  });

  return NextResponse.json({ ok: true, id, mined: true });
}
