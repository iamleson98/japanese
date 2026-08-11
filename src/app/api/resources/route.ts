import { NextResponse } from "next/server";
import { db, schema } from "@/db";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const level = searchParams.get("level");
  const topic = searchParams.get("topic");

  let rows = await db.select().from(schema.resource);
  if (level && ["N5", "N4", "N3", "all"].includes(level)) {
    rows = rows.filter((r) => r.level === level);
  }
  if (topic) {
    rows = rows.filter((r) => r.topic === topic);
  }
  rows.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const all = await db.select({ topic: schema.resource.topic }).from(schema.resource);
  const topicCounts: Record<string, number> = {};
  for (const r of all) topicCounts[r.topic] = (topicCounts[r.topic] ?? 0) + 1;

  return NextResponse.json({
    items: rows,
    topics: Object.entries(topicCounts).map(([name, count]) => ({ name, count })),
  });
}
