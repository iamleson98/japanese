import { NextResponse } from "next/server";
import { db, schema } from "@/db";

export const dynamic = "force-dynamic";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") || "vocabulary";
  const level = searchParams.get("level");
  const count = Math.min(30, Math.max(5, Number(searchParams.get("count") || 10)));

  if (type === "vocabulary") {
    let items = await db.select().from(schema.vocabulary);
    if (level && ["N5", "N4", "N3"].includes(level)) items = items.filter((v) => v.level === level);
    if (items.length < 4) return NextResponse.json({ questions: [] });
    const chosen = shuffle(items).slice(0, Math.min(count, items.length));
    const questions = chosen.map((v) => {
      const distractors = shuffle(items.filter((x) => x.id !== v.id && x.meaning !== v.meaning)).slice(0, 3);
      const options = shuffle([v.meaning, ...distractors.map((d) => d.meaning)]);
      return { id: v.id, prompt: v.word, subPrompt: v.reading, questionType: "meaning", answer: v.meaning, options, speak: v.word, level: v.level };
    });
    return NextResponse.json({ questions, type: "vocabulary" });
  }

  if (type === "kanji") {
    let items = await db.select().from(schema.kanji);
    if (level && ["N5", "N4", "N3"].includes(level)) items = items.filter((k) => k.level === level);
    if (items.length < 4) return NextResponse.json({ questions: [] });
    const chosen = shuffle(items).slice(0, Math.min(count, items.length));
    const questions = chosen.map((k) => {
      const askReading = Math.random() < 0.5;
      if (askReading) {
        const distractors = shuffle(items.filter((x) => x.id !== k.id && x.kunyomi !== k.kunyomi)).slice(0, 3);
        const correctReading = k.kunyomi.split(",")[0].split("/")[0].trim();
        const options = shuffle([correctReading, ...distractors.map((d) => d.kunyomi.split(",")[0].split("/")[0].trim())]);
        return { id: k.id, prompt: k.character, subPrompt: "Reading (kun'yomi)?", questionType: "reading", answer: correctReading, options, speak: k.character, level: k.level };
      } else {
        const distractors = shuffle(items.filter((x) => x.id !== k.id && x.meaning !== k.meaning)).slice(0, 3);
        const options = shuffle([k.meaning, ...distractors.map((d) => d.meaning)]);
        return { id: k.id, prompt: k.character, subPrompt: "Meaning?", questionType: "meaning", answer: k.meaning, options, speak: k.character, level: k.level };
      }
    });
    return NextResponse.json({ questions, type: "kanji" });
  }

  if (type === "kana") {
    const items = await db.select().from(schema.kana);
    const base = items.filter((k) => !["yoon"].includes(k.row));
    if (base.length < 4) return NextResponse.json({ questions: [] });
    const chosen = shuffle(base).slice(0, Math.min(count, base.length));
    const questions = chosen.map((k) => {
      const distractors = shuffle(base.filter((x) => x.id !== k.id && x.romaji !== k.romaji)).slice(0, 3);
      const options = shuffle([k.romaji, ...distractors.map((d) => d.romaji)]);
      return { id: k.id, prompt: k.char, subPrompt: "Romaji?", questionType: "reading", answer: k.romaji, options, speak: k.char, level: "N5" };
    });
    return NextResponse.json({ questions, type: "kana" });
  }

  if (type === "grammar") {
    let items = await db.select().from(schema.grammar);
    if (level && ["N5", "N4", "N3"].includes(level)) items = items.filter((g) => g.level === level);
    if (items.length < 4) return NextResponse.json({ questions: [] });
    const chosen = shuffle(items).slice(0, Math.min(count, items.length));
    const questions = chosen.map((g) => {
      const distractors = shuffle(items.filter((x) => x.id !== g.id && x.meaning !== g.meaning)).slice(0, 3);
      const options = shuffle([g.meaning, ...distractors.map((d) => d.meaning)]);
      return { id: g.id, prompt: g.title, subPrompt: g.structure, questionType: "meaning", answer: g.meaning, options, speak: g.exampleJp ?? g.title, level: g.level };
    });
    return NextResponse.json({ questions, type: "grammar" });
  }

  return NextResponse.json({ questions: [] });
}
