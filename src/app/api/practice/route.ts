import { NextResponse } from "next/server";
import { db, schema } from "@/db";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

/**
 * Comprehension practice API (listening + reading dojo).
 * GET                    -> passage list (with best scores)
 * GET ?id=<uuid>         -> single passage with parsed questions
 * POST {passageId, score, total} -> record attempt + award XP
 */

export type PassageQuestion = {
  question: string;
  questionVi?: string;
  options: string[];
  answer: string;
  explanation?: string;
};

function parseQuestions(raw: string): PassageQuestion[] {
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed as PassageQuestion[];
    return [];
  } catch {
    return [];
  }
}

async function bumpXp(delta: number) {
  const existing = await db.select().from(schema.stats).where(eq(schema.stats.key, "xp"));
  if (existing.length) {
    await db
      .update(schema.stats)
      .set({ value: Math.max(0, existing[0].value + delta), updatedAt: new Date().toISOString() })
      .where(eq(schema.stats.key, "xp"));
  } else {
    await db
      .insert(schema.stats)
      .values({ id: crypto.randomUUID(), key: "xp", value: Math.max(0, delta), updatedAt: new Date().toISOString() });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    const rows = await db.select().from(schema.comprehensionPassage).where(eq(schema.comprehensionPassage.id, id));
    if (!rows.length) return NextResponse.json({ error: "not found" }, { status: 404 });
    const p = rows[0];
    const attempts = await db
      .select()
      .from(schema.comprehensionProgress)
      .where(eq(schema.comprehensionProgress.passageId, id));
    return NextResponse.json({
      passage: { ...p, questionsParsed: parseQuestions(p.questions) },
      attempts: attempts.length,
      bestScore: attempts.length ? Math.max(...attempts.map((a) => a.score)) : null,
    });
  }

  const passages = await db.select().from(schema.comprehensionPassage);
  const attempts = await db.select().from(schema.comprehensionProgress);
  const bestByPassage = new Map<string, { score: number; total: number; attempts: number }>();
  for (const a of attempts) {
    const cur = bestByPassage.get(a.passageId);
    bestByPassage.set(a.passageId, {
      score: Math.max(cur?.score ?? 0, a.score),
      total: a.total,
      attempts: (cur?.attempts ?? 0) + 1,
    });
  }
  return NextResponse.json({
    passages: passages
      .sort((a, b) => a.order - b.order)
      .map((p) => ({
        id: p.id,
        type: p.type,
        level: p.level,
        lesson: p.lesson,
        title: p.title,
        difficulty: p.difficulty,
        durationSec: p.durationSec,
        questionCount: parseQuestions(p.questions).length,
        best: bestByPassage.get(p.id) ?? null,
      })),
  });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const passageId = body.passageId as string | undefined;
  const score = Number(body.score);
  const total = Number(body.total);

  if (!passageId || !Number.isFinite(score) || !Number.isFinite(total) || total <= 0) {
    return NextResponse.json({ error: "missing/invalid params" }, { status: 400 });
  }

  const rows = await db.select().from(schema.comprehensionPassage).where(eq(schema.comprehensionPassage.id, passageId));
  if (!rows.length) return NextResponse.json({ error: "passage not found" }, { status: 404 });

  await db.insert(schema.comprehensionProgress).values({
    id: crypto.randomUUID(),
    passageId,
    score: Math.max(0, Math.min(total, Math.round(score))),
    total: Math.round(total),
    createdAt: new Date().toISOString(),
  });

  // XP: 3 per correct answer, +5 perfect bonus
  const xpGain = Math.round(score) * 3 + (score === total ? 5 : 0);
  await bumpXp(xpGain);

  return NextResponse.json({ ok: true, xpGain });
}
