import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type"); // "hiragana" | "katakana"
  const row = searchParams.get("row"); // "vowels" | "k" | "s" | "t" | "n" | "h" | "m" | "y" | "r" | "w" | "n-solo" | "dakuten" | "handakuten" | "yoon"
  const where: { type?: string; row?: string } = {};
  if (type && (type === "hiragana" || type === "katakana")) where.type = type;
  if (row) where.row = row;

  const rows = await db.kana.findMany({
    where,
    orderBy: [{ order: "asc" }, { type: "asc" }],
  });

  // Group by row for display
  const byRow: Record<string, typeof rows> = {};
  for (const k of rows) {
    if (!byRow[k.row]) byRow[k.row] = [];
    byRow[k.row].push(k);
  }

  // List of all distinct rows in display order
  const rowOrder = ["vowels", "k", "s", "t", "n", "h", "m", "y", "r", "w", "n-solo", "dakuten", "handakuten", "yoon"];
  const rowsOrdered = rowOrder.filter((r) => byRow[r]).map((r) => ({ row: r, items: byRow[r] }));

  return NextResponse.json({ rows: rowsOrdered, flat: rows });
}
