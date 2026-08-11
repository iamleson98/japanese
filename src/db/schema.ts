import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

const timestampString = (name: string) =>
  timestamp(name, { withTimezone: true, mode: "string" });

// Hiragana / Katakana characters (the kana syllabary)
export const kana = pgTable("kana", {
  id: text("id").primaryKey(),
  char: text("char").notNull().unique(),
  romaji: text("romaji").notNull(),
  type: text("type").notNull(), // "hiragana" | "katakana"
  row: text("row").notNull(),
  order: integer("order").notNull(),
  pair: text("pair"),
  audio: text("audio"),
});

// Vocabulary words organised by JLPT level
export const vocabulary = pgTable("vocabulary", {
  id: text("id").primaryKey(),
  word: text("word").notNull(),
  reading: text("reading").notNull(),
  meaning: text("meaning").notNull(),
  romaji: text("romaji"),
  level: text("level").notNull(), // "N5" | "N4" | "N3"
  category: text("category").notNull(),
  pos: text("pos"),
  verbGroup: text("verbGroup"), // godan | ichidan | irregular
  pitchAccent: text("pitchAccent"),
  lesson: integer("lesson"), // lesson number for guided study
  exampleJp: text("exampleJp"),
  exampleEn: text("exampleEn"),
  exampleJp2: text("exampleJp2"),
  exampleEn2: text("exampleEn2"),
  order: integer("order").default(0).notNull(),
});

// Grammar points — EXPANDED schema with rule, conjugation, usage, examples[], exercises[]
export const grammar = pgTable("grammar", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  level: text("level").notNull(),
  lesson: integer("lesson"),
  chapter: text("chapter"), // chapter grouping
  structure: text("structure").notNull(),
  meaning: text("meaning").notNull(),
  // Long-form fields (JSON-encoded arrays/objects stored as text)
  rule: text("rule"), // LONG clear explanation of the rule
  conjugation: text("conjugation"), // conjugation patterns + per-group examples
  usage: text("usage"), // when/how to use it
  commonMistake: text("commonMistake"),
  // Examples stored as JSON array: [{jp, en, difficulty, note}]
  examples: text("examples"), // JSON string
  // Exercises stored as JSON array: [{question, answer, hint, type, options}]
  exercises: text("exercises"), // JSON string
  // Legacy single-example fields (kept for backward compat with old UI)
  explanation: text("explanation"), // fallback = rule
  exampleJp: text("exampleJp"),
  exampleEn: text("exampleEn"),
  exampleJp2: text("exampleJp2"),
  exampleEn2: text("exampleEn2"),
  note: text("note"),
  order: integer("order").default(0).notNull(),
});

// Kanji characters
export const kanji = pgTable("kanji", {
  id: text("id").primaryKey(),
  character: text("character").notNull().unique(),
  onyomi: text("onyomi").notNull(),
  kunyomi: text("kunyomi").notNull(),
  meaning: text("meaning").notNull(),
  level: text("level").notNull(),
  strokeCount: integer("strokeCount").default(0).notNull(),
  jlpt: text("jlpt").default("N5").notNull(),
  radical: text("radical"),
  mnemonic: text("mnemonic"),
  // Chunked learning: which set (1-based) this kanji belongs to (10 per set)
  set: integer("set"),
  exampleWord: text("exampleWord"),
  exampleRead: text("exampleRead"),
  exampleMean: text("exampleMean"),
  order: integer("order").default(0).notNull(),
});

// Japanese counters (助数詞) with sound-change rules
export const counter = pgTable("counter", {
  id: text("id").primaryKey(),
  kanji: text("kanji").notNull(),
  reading: text("reading").notNull(),
  meaning: text("meaning").notNull(),
  level: text("level").notNull(),
  one: text("one").notNull(),
  two: text("two").notNull(),
  three: text("three").notNull(),
  four: text("four").notNull(),
  five: text("five").notNull(),
  six: text("six").notNull(),
  seven: text("seven").notNull(),
  eight: text("eight").notNull(),
  nine: text("nine").notNull(),
  ten: text("ten").notNull(),
  exampleJp: text("exampleJp"),
  exampleEn: text("exampleEn"),
  note: text("note"),
  order: integer("order").default(0).notNull(),
});

// Verb / adjective conjugation paradigms
export const conjugation = pgTable("conjugation", {
  id: text("id").primaryKey(),
  verb: text("verb").notNull(),
  reading: text("reading").notNull(),
  group: text("group").notNull(), // godan | ichidan | irregular | i-adj | na-adj
  level: text("level").notNull(),
  meaning: text("meaning").notNull(),
  dict: text("dict").notNull(),
  masu: text("masu").notNull(),
  nai: text("nai").notNull(),
  ta: text("ta").notNull(),
  te: text("te").notNull(),
  potential: text("potential"),
  passive: text("passive"),
  causative: text("causative"),
  volitional: text("volitional"),
  conditional: text("conditional"),
  imperative: text("imperative"),
  order: integer("order").default(0).notNull(),
});

// Curated YouTube videos / channels / playlists
export const resource = pgTable("resource", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  url: text("url").notNull(),
  type: text("type").notNull(), // video | playlist | channel
  level: text("level").notNull(), // N5 | N4 | N3 | all
  topic: text("topic").notNull(), // kana | grammar | vocabulary | kanji | listening | particles | reading
  description: text("description").notNull(),
  order: integer("order").default(0).notNull(),
});

// Flashcard SRS progress
export const flashcardProgress = pgTable("flashcard_progress", {
  id: text("id").primaryKey(),
  itemType: text("itemType").notNull(),
  itemId: text("itemId").notNull(),
  box: integer("box").default(0).notNull(),
  ease: integer("ease").default(250).notNull(), // stored as ease*100 to keep integer
  interval: integer("interval").default(0).notNull(),
  dueAt: timestampString("dueAt").notNull(),
  lastSeenAt: timestampString("lastSeenAt"),
  reps: integer("reps").default(0).notNull(),
  lapses: integer("lapses").default(0).notNull(),
  correct: integer("correct").default(0).notNull(),
  wrong: integer("wrong").default(0).notNull(),
});

// Daily streak / goals (key-value stats)
export const stats = pgTable("stats", {
  id: text("id").primaryKey(),
  key: text("key").notNull().unique(),
  value: integer("value").default(0).notNull(),
  updatedAt: timestampString("updatedAt").defaultNow().notNull(),
});

// Simple daily activity log (date -> cards reviewed)
export const dailyActivity = pgTable("daily_activity", {
  id: text("id").primaryKey(),
  date: text("date").notNull().unique(), // YYYY-MM-DD (local date)
  count: integer("count").default(0).notNull(),
  updatedAt: timestampString("updatedAt").defaultNow().notNull(),
});

// Lesson progress tracking (which lessons the user has completed)
export const lessonProgress = pgTable("lesson_progress", {
  id: text("id").primaryKey(),
  lessonId: integer("lessonId").notNull().unique(),
  // comma-separated checklist of completed steps: "grammar,vocab,kanji,examples,practice,review"
  completedSteps: text("completedSteps").default(""),
  startedAt: timestampString("startedAt").defaultNow().notNull(),
  completedAt: timestampString("completedAt"),
  updatedAt: timestampString("updatedAt").defaultNow().notNull(),
});

// Grammar exercise attempt tracking
export const exerciseProgress = pgTable("exercise_progress", {
  id: text("id").primaryKey(),
  grammarId: text("grammarId").notNull(),
  exerciseIndex: integer("exerciseIndex").notNull(),
  correct: integer("correct").default(0).notNull(),
  attempts: integer("attempts").default(0).notNull(),
  lastAttemptAt: timestampString("lastAttemptAt"),
  updatedAt: timestampString("updatedAt").defaultNow().notNull(),
});
