import { NextResponse } from "next/server";
import { db, schema } from "@/db";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const level = searchParams.get("level");
  const group = searchParams.get("group");
  let rows = await db.select().from(schema.conjugation);
  if (level && ["N5", "N4", "N3"].includes(level)) {
    rows = rows.filter((c) => c.level === level);
  }
  if (group) {
    rows = rows.filter((c) => c.group === group);
  }
  rows.sort((a, b) => a.level.localeCompare(b.level) || (a.order ?? 0) - (b.order ?? 0));
  return NextResponse.json({ items: rows });
}
