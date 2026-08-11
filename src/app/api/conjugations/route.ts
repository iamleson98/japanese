import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const level = searchParams.get("level");
  const group = searchParams.get("group"); // godan | ichidan | irregular | i-adj | na-adj
  const where: { level?: string; group?: string } = {};
  if (level && ["N5", "N4", "N3"].includes(level)) where.level = level;
  if (group) where.group = group;
  const items = await db.conjugation.findMany({
    where,
    orderBy: [{ level: "asc" }, { order: "asc" }],
  });
  return NextResponse.json({ items });
}
