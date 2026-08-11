import { NextResponse } from "next/server";
import { db, schema } from "@/db";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  const streakRows = await db.select().from(schema.stats).where(eq(schema.stats.key, "streak"));
  const totalRows = await db.select().from(schema.stats).where(eq(schema.stats.key, "totalReviewed"));
  const activity = await db.select().from(schema.dailyActivity);
  return NextResponse.json({
    streak: streakRows[0]?.value ?? 0,
    totalReviewed: totalRows[0]?.value ?? 0,
    activity,
  });
}
