import { NextResponse } from "next/server";
import { db, schema } from "@/db";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const level = searchParams.get("level");
  const where: { level?: string } = {};
  let rows = await db.select().from(schema.counter);
  if (level && ["N5", "N4", "N3"].includes(level)) {
    rows = rows.filter((c) => c.level === level);
  }
  rows.sort((a, b) => a.level.localeCompare(b.level) || (a.order ?? 0) - (b.order ?? 0));
  return NextResponse.json({ items: rows });
}
