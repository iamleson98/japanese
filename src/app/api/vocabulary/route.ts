import { NextResponse } from "next/server";
import { db, schema } from "@/db";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const level = searchParams.get("level");
  const category = searchParams.get("category");

  let rows = await db.select().from(schema.vocabulary);
  if (level && ["N5", "N4", "N3"].includes(level)) {
    rows = rows.filter((v) => v.level === level);
  }
  if (category) {
    rows = rows.filter((v) => v.category === category);
  }
  rows.sort((a, b) => a.level.localeCompare(b.level) || (a.order ?? 0) - (b.order ?? 0));

  // Distinct categories with counts for filter UI
  const all = await db.select({ category: schema.vocabulary.category, level: schema.vocabulary.level }).from(schema.vocabulary);
  const catCounts: Record<string, number> = {};
  for (const v of all) catCounts[v.category] = (catCounts[v.category] ?? 0) + 1;

  return NextResponse.json({
    items: rows,
    categories: Object.entries(catCounts).map(([name, count]) => ({ name, count })),
  });
}
