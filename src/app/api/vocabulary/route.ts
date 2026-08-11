import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const level = searchParams.get("level");
  const category = searchParams.get("category");

  const where: { level?: string; category?: string } = {};
  if (level && ["N5", "N4", "N3"].includes(level)) where.level = level;
  if (category) where.category = category;

  const vocab = await db.vocabulary.findMany({
    where,
    orderBy: [{ level: "asc" }, { order: "asc" }],
  });

  // Distinct categories (with counts) for filter UI
  const all = await db.vocabulary.findMany({ select: { category: true, level: true } });
  const catCounts: Record<string, number> = {};
  for (const v of all) {
    catCounts[v.category] = (catCounts[v.category] ?? 0) + 1;
  }

  return NextResponse.json({
    items: vocab,
    categories: Object.entries(catCounts).map(([name, count]) => ({ name, count })),
  });
}
