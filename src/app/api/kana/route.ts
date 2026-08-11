import { NextResponse } from "next/server";
import { db, schema } from "@/db";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type"); // "hiragana" | "katakana"
  const row = searchParams.get("row");

  let rows = await db.select().from(schema.kana);
  if (type && (type === "hiragana" || type === "katakana")) {
    rows = rows.filter((k) => k.type === type);
  }
  if (row) {
    rows = rows.filter((k) => k.row === row);
  }
  rows.sort((a, b) => a.order - b.order || a.type.localeCompare(b.type));

  // Group by row for display
  const byRow: Record<string, typeof rows> = {};
  for (const k of rows) {
    if (!byRow[k.row]) byRow[k.row] = [];
    byRow[k.row].push(k);
  }
  const rowOrder = ["vowels", "k", "s", "t", "n", "h", "m", "y", "r", "w", "n-solo", "dakuten", "handakuten", "yoon"];
  const rowsOrdered = rowOrder.filter((r) => byRow[r]).map((r) => ({ row: r, items: byRow[r] }));

  return NextResponse.json({ rows: rowsOrdered, flat: rows });
}
