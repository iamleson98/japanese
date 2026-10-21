import { NextResponse } from "next/server";
import { db, schema } from "@/db";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

const ALLOWED_KEYS = new Set(["dailyGoal"]);

export async function GET() {
  const rows = await db.select().from(schema.stats);
  const map: Record<string, number> = {};
  for (const r of rows) map[r.key] = r.value;
  return NextResponse.json({
    streak: map.streak ?? 0,
    totalReviewed: map.totalReviewed ?? 0,
    xp: map.xp ?? 0,
    dailyGoal: map.dailyGoal ?? 20,
  });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const key = body.key as string | undefined;
  const value = Number(body.value);
  const delta = Number(body.delta);

  // XP increments (quiz correct answers, etc.)
  if (key === "xp" && Number.isFinite(delta) && delta !== 0) {
    const existing = await db.select().from(schema.stats).where(eq(schema.stats.key, "xp"));
    const next = Math.max(0, (existing[0]?.value ?? 0) + Math.round(delta));
    if (existing.length) {
      await db.update(schema.stats).set({ value: next, updatedAt: new Date().toISOString() }).where(eq(schema.stats.key, key));
    } else {
      await db.insert(schema.stats).values({ id: crypto.randomUUID(), key, value: next, updatedAt: new Date().toISOString() });
    }
    return NextResponse.json({ ok: true, key, value: next });
  }

  if (!key || !ALLOWED_KEYS.has(key) || !Number.isFinite(value)) {
    return NextResponse.json({ error: "invalid key/value" }, { status: 400 });
  }

  const clamped = Math.min(500, Math.max(5, Math.round(value)));
  const existing = await db.select().from(schema.stats).where(eq(schema.stats.key, key));
  if (existing.length) {
    await db
      .update(schema.stats)
      .set({ value: clamped, updatedAt: new Date().toISOString() })
      .where(eq(schema.stats.key, key));
  } else {
    await db
      .insert(schema.stats)
      .values({ id: crypto.randomUUID(), key, value: clamped, updatedAt: new Date().toISOString() });
  }
  return NextResponse.json({ ok: true, key, value: clamped });
}
