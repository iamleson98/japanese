import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const level = searchParams.get("level");

  const where: { level?: string } = {};
  if (level && ["N5", "N4", "N3"].includes(level)) where.level = level;

  const items = await db.grammar.findMany({
    where,
    orderBy: [{ level: "asc" }, { order: "asc" }],
  });

  return NextResponse.json({ items });
}
