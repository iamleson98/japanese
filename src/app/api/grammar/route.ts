import { NextResponse } from "next/server";
import { db, schema } from "@/db";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const level = searchParams.get("level");
  const lesson = searchParams.get("lesson");

  let rows = await db.select().from(schema.grammar);
  if (level && ["N5", "N4", "N3"].includes(level)) {
    rows = rows.filter((g) => g.level === level);
  }
  if (lesson) {
    const lessonNum = Number(lesson);
    rows = rows.filter((g) => g.lesson === lessonNum);
  }
  rows.sort((a, b) => {
    if (a.level !== b.level) return a.level.localeCompare(b.level);
    return (a.order ?? 0) - (b.order ?? 0);
  });

  // Parse JSON fields for the client
  const items = rows.map((g) => ({
    ...g,
    examples: g.examples ? JSON.parse(g.examples) : [],
    exercises: g.exercises ? JSON.parse(g.exercises) : [],
  }));

  return NextResponse.json({ items });
}
