import { NextResponse } from "next/server";
import { db, schema } from "@/db";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const level = searchParams.get("level");
  const set = searchParams.get("set"); // kanji set (1-based, 10 per set per level)

  let rows = await db.select().from(schema.kanji);
  if (level && ["N5", "N4", "N3"].includes(level)) {
    rows = rows.filter((k) => k.level === level);
  }
  if (set) {
    const setNum = Number(set);
    rows = rows.filter((k) => k.set === setNum);
  }
  rows.sort((a, b) => a.level.localeCompare(b.level) || (a.order ?? 0) - (b.order ?? 0));

  return NextResponse.json({ items: rows });
}
