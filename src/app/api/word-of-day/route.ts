import { NextResponse } from "next/server";
import { db, schema } from "@/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const today = new Date();
  const dateKey = today.toLocaleDateString("en-CA");
  const allVocab = await db.select().from(schema.vocabulary);
  const withExamples = allVocab.filter((v) => v.exampleJp);
  if (withExamples.length === 0) return NextResponse.json({ word: null });
  let hash = 0;
  for (let i = 0; i < dateKey.length; i++) hash = (hash * 31 + dateKey.charCodeAt(i)) >>> 0;
  const word = withExamples[hash % withExamples.length];
  return NextResponse.json({ word, date: dateKey });
}
