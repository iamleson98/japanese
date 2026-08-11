import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const level = searchParams.get("level");
  const topic = searchParams.get("topic");

  const where: { level?: string; topic?: string } = {};
  if (level && ["N5", "N4", "N3", "all"].includes(level)) where.level = level;
  if (topic) where.topic = topic;

  const items = await db.resource.findMany({
    where,
    orderBy: [{ order: "asc" }],
  });

  // Distinct topics
  const all = await db.resource.findMany({ select: { topic: true } });
  const topicCounts: Record<string, number> = {};
  for (const r of all) topicCounts[r.topic] = (topicCounts[r.topic] ?? 0) + 1;

  return NextResponse.json({
    items,
    topics: Object.entries(topicCounts).map(([name, count]) => ({ name, count })),
  });
}
