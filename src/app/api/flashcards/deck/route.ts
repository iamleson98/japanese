import { NextResponse } from "next/server";
import { db, schema } from "@/db";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  let rows = await db.select().from(schema.flashcardProgress);
  if (type) rows = rows.filter((p) => p.itemType === type);

  const byType: Record<string, string[]> = {};
  for (const r of rows) {
    if (!byType[r.itemType]) byType[r.itemType] = [];
    byType[r.itemType].push(r.itemId);
  }

  return NextResponse.json({ byType, total: rows.length });
}
