import { integer, pgTable, real, text, timestamp, varchar } from "drizzle-orm/pg-core";

const ts = (name: string) => timestamp(name, { withTimezone: true, mode: "string" });
const v = (name: string, length?: number) =>
  length === undefined ? varchar(name) : varchar(name, { length });

// Hiragana / Katakana characters (the kana syllabary)
export const kana = pgTable("kana", {
  id: v("id").primaryKey(),
  char: v("char", 10).notNull().unique(),
  romaji: v("romaji", 20).notNull(),
  type: v("type", 20).notNull(), // "hiragana" | "katakana"
  row: v("row", 20).notNull(),
  order: integer("order").notNull(),
  pair: v("pair", 10),
  audio: v("audio"),
});

// Vocabulary words organised by JLPT level
export const vocabulary = pgTable("vocabulary", {
  id: v("id").primaryKey(),
  word: v("word", 100).notNull(),
  reading: v("reading", 100).notNull(),
  meaning: v("meaning", 500).notNull(),
  viMeaning: v("vi_meaning", 500), // Vietnamese meaning
  romaji: v("romaji", 100),
  level: v("level", 5).notNull(), // "N5" | "N4" | "N3" | "N2" | "N1"
  category: v("category", 50).notNull(),
  pos: v("pos", 30),
  verbGroup: v("verb_group", 20), // godan | ichidan | irregular
  pitchAccent: v("pitch_accent", 10),
  lesson: integer("lesson"), // lesson number for guided study
  exampleJp: text("example_jp"),
  exampleEn: text("example_en"),
  exampleVi: text("example_vi"),
  exampleJp2: text("example_jp2"),
  exampleEn2: text("example_en2"),
  order: integer("order").default(0).notNull(),
});

// Grammar points — EXPANDED schema with rule, conjugation, usage, examples[], exercises[]
export const grammar = pgTable("grammar", {
  id: v("id").primaryKey(),
  title: v("title", 200).notNull(),
  level: v("level", 5).notNull(),
  lesson: integer("lesson"),
  chapter: v("chapter", 100),
  structure: v("structure", 500).notNull(),
  meaning: v("meaning", 500).notNull(),
  // Long-form fields (JSON-encoded arrays/objects stored as text)
  rule: text("rule"), // LONG clear explanation of the rule
  conjugation: text("conjugation"), // conjugation patterns + per-group examples
  usage: text("usage"), // when/how to use it
  commonMistake: text("common_mistake"),
  // Examples stored as JSON array: [{jp, en, difficulty, note}]
  examples: text("examples"),
  // Exercises stored as JSON array: [{question, answer, hint, type, options}]
  exercises: text("exercises"),
  // Legacy single-example fields (kept for backward compat with old UI)
  explanation: text("explanation"),
  exampleJp: text("example_jp"),
  exampleEn: text("example_en"),
  exampleJp2: text("example_jp2"),
  exampleEn2: text("example_en2"),
  note: text("note"),
  order: integer("order").default(0).notNull(),
});

// Kanji characters
export const kanji = pgTable("kanji", {
  id: v("id").primaryKey(),
  character: v("character", 10).notNull().unique(),
  onyomi: v("onyomi", 200).notNull(),
  kunyomi: v("kunyomi", 200).notNull(),
  hanViet: v("han_viet", 100), // Hán-Việt (Sino-Vietnamese) reading
  viMeaning: v("vi_meaning", 200), // Vietnamese meaning
  meaning: v("meaning", 200).notNull(),
  level: v("level", 5).notNull(),
  strokeCount: integer("stroke_count").default(0).notNull(),
  jlpt: v("jlpt", 5).default("N5").notNull(),
  radical: v("radical", 20),
  mnemonic: text("mnemonic"),
  lesson: integer("lesson"),
  // Chunked learning: which set (1-based) this kanji belongs to (10 per set)
  set: integer("set"),
  exampleWord: v("example_word", 100),
  exampleRead: v("example_read", 100),
  exampleMean: v("example_mean", 200),
  order: integer("order").default(0).notNull(),
});

// Japanese counters (助数詞) with sound-change rules
export const counter = pgTable("counter", {
  id: v("id").primaryKey(),
  kanji: v("kanji", 10).notNull(),
  reading: v("reading", 20).notNull(),
  meaning: v("meaning", 200).notNull(),
  level: v("level", 5).notNull(),
  one: v("one", 20).notNull(),
  two: v("two", 20).notNull(),
  three: v("three", 20).notNull(),
  four: v("four", 20).notNull(),
  five: v("five", 20).notNull(),
  six: v("six", 20).notNull(),
  seven: v("seven", 20).notNull(),
  eight: v("eight", 20).notNull(),
  nine: v("nine", 20).notNull(),
  ten: v("ten", 20).notNull(),
  exampleJp: text("example_jp"),
  exampleEn: text("example_en"),
  note: text("note"),
  order: integer("order").default(0).notNull(),
});

// Verb / adjective conjugation paradigms
export const conjugation = pgTable("conjugation", {
  id: v("id").primaryKey(),
  verb: v("verb", 50).notNull(),
  reading: v("reading", 50).notNull(),
  group: v("group", 20).notNull(), // godan | ichidan | irregular | i-adj | na-adj
  level: v("level", 5).notNull(),
  meaning: v("meaning", 200).notNull(),
  dict: v("dict", 50).notNull(),
  masu: v("masu", 50).notNull(),
  nai: v("nai", 50).notNull(),
  ta: v("ta", 50).notNull(),
  te: v("te", 50).notNull(),
  potential: v("potential", 50),
  passive: v("passive", 50),
  causative: v("causative", 50),
  volitional: v("volitional", 50),
  conditional: v("conditional", 50),
  imperative: v("imperative", 50),
  order: integer("order").default(0).notNull(),
});

// Curated YouTube videos / channels / playlists
export const resource = pgTable("resource", {
  id: v("id").primaryKey(),
  title: v("title", 300).notNull(),
  url: text("url").notNull(),
  type: v("type", 20).notNull(), // video | playlist | channel
  level: v("level", 5).notNull(), // N5 | N4 | N3 | N2 | N1 | all
  topic: v("topic", 20).notNull(), // kana | grammar | vocabulary | kanji | listening | particles | reading
  description: text("description").notNull(),
  order: integer("order").default(0).notNull(),
});

// Listening & reading comprehension passages (graded input practice)
export const comprehensionPassage = pgTable("comprehension_passage", {
  id: v("id").primaryKey(),
  type: v("type", 10).notNull(), // "listening" | "reading"
  level: v("level", 5).notNull(), // N5 | N4 | N3 | N2 | N1
  lesson: integer("lesson"),
  title: v("title", 200).notNull(),
  jp: text("jp").notNull(), // Japanese text
  reading: text("reading").notNull(), // full kana reading
  en: text("en").notNull(), // English translation
  vi: text("vi"), // Vietnamese translation
  audioText: text("audio_text"), // text spoken via TTS for listening mode
  durationSec: integer("duration_sec"),
  difficulty: v("difficulty", 10).notNull(), // easy | medium | hard
  questions: text("questions").notNull(), // JSON: [{question, questionVi?, options[], answer, explanation?}]
  order: integer("order").default(0).notNull(),
});

// Comprehension passage attempt tracking (NEW table)
export const comprehensionProgress = pgTable("comprehension_progress", {
  id: v("id").primaryKey(),
  userId: v("user_id", 50),
  passageId: v("passage_id", 50).notNull(),
  score: integer("score").notNull(), // correct answers
  total: integer("total").notNull(), // total questions
  createdAt: ts("created_at").defaultNow().notNull(),
});

// JLPT mock test results (NEW table)
export const mockTestResult = pgTable("mock_test_result", {
  id: v("id").primaryKey(),
  userId: v("user_id", 50),
  level: v("level", 5).notNull(), // N5 | N4 | N3
  mode: v("mode", 10).notNull(), // full | quick
  vocabScore: integer("vocab_score").notNull(), // /60
  grammarReadingScore: integer("grammar_reading_score").notNull(), // /60
  listeningScore: integer("listening_score").notNull(), // /60
  totalScore: integer("total_score").notNull(), // /180
  passed: v("passed", 5).notNull(), // "true" | "false"
  detail: text("detail"), // JSON breakdown of wrong answers
  createdAt: ts("created_at").defaultNow().notNull(),
});

// Registered users (auth-ready; app currently operates in guest mode)
export const users = pgTable("users", {
  id: v("id").primaryKey(),
  email: v("email", 255).notNull().unique(),
  name: v("name", 100),
  passwordHash: v("password_hash", 255).notNull(),
  dailyGoal: integer("daily_goal").default(20).notNull(),
  createdAt: ts("created_at").defaultNow().notNull(),
  updatedAt: ts("updated_at").defaultNow().notNull(),
});

// Flashcard SRS progress — FSRS-5 memory state (stability, difficulty)
export const flashcardProgress = pgTable("flashcard_progress", {
  id: v("id").primaryKey(),
  userId: v("user_id", 50),
  itemType: v("item_type", 20).notNull(),
  itemId: v("item_id", 50).notNull(),
  box: integer("box").default(0).notNull(), // legacy Leitner box (derived)
  ease: integer("ease").default(250).notNull(), // legacy ease×100 (derived)
  interval: integer("interval").default(0).notNull(), // current interval in days
  stability: real("stability").default(0).notNull(), // FSRS stability S
  difficulty: real("difficulty").default(5).notNull(), // FSRS difficulty D ∈ [1,10]
  dueAt: ts("due_at").notNull(),
  lastSeenAt: ts("last_seen_at"),
  reps: integer("reps").default(0).notNull(),
  lapses: integer("lapses").default(0).notNull(),
  correct: integer("correct").default(0).notNull(),
  wrong: integer("wrong").default(0).notNull(),
});

// Daily streak / goals (key-value stats)
export const stats = pgTable("stats", {
  id: v("id").primaryKey(),
  userId: v("user_id", 50),
  key: v("key", 50).notNull(), // uniqueness enforced via unique index (see scripts)
  value: integer("value").default(0).notNull(),
  updatedAt: ts("updated_at").defaultNow().notNull(),
});

// Simple daily activity log (date -> cards reviewed)
export const dailyActivity = pgTable("daily_activity", {
  id: v("id").primaryKey(),
  userId: v("user_id", 50),
  date: v("date", 10).notNull(), // YYYY-MM-DD (local date); uniqueness via unique index
  count: integer("count").default(0).notNull(),
  updatedAt: ts("updated_at").defaultNow().notNull(),
});

// Lesson progress tracking (which lessons the user has completed)
export const lessonProgress = pgTable("lesson_progress", {
  id: v("id").primaryKey(),
  userId: v("user_id", 50),
  lessonId: integer("lesson_id").notNull(), // uniqueness via unique index
  // comma-separated checklist of completed steps: "grammar,vocab,kanji,examples,practice,review"
  completedSteps: text("completed_steps").default(""),
  startedAt: ts("started_at").defaultNow().notNull(),
  completedAt: ts("completed_at"),
  updatedAt: ts("updated_at").defaultNow().notNull(),
});

// Mined sentences — real sentences the learner saved from anywhere in the app
// (vocabulary examples, grammar examples, dojo passages) into their personal SRS deck.
// Real-world practice: sentence mining is the #1 technique of immersion learners —
// cards made from content you actually met are stickier than abstract word cards.
export const minedSentence = pgTable("mined_sentence", {
  id: v("id").primaryKey(),
  userId: v("user_id", 50),
  textJp: text("text_jp").notNull(),
  reading: text("reading"), // full kana reading when available (dojo passages)
  textEn: text("text_en").notNull(),
  textVi: text("text_vi"),
  sourceType: v("source_type", 30).notNull(), // vocab | grammar | passage
  sourceId: v("source_id", 50),
  createdAt: ts("created_at").defaultNow().notNull(),
});

// Guided daily study session log (Smart Study completion history)
export const studySession = pgTable("study_session", {
  id: v("id").primaryKey(),
  userId: v("user_id", 50),
  date: v("date", 10).notNull(), // YYYY-MM-DD local; uniqueness via unique index
  reviewsDone: integer("reviews_done").default(0).notNull(),
  newCardsDone: integer("new_cards_done").default(0).notNull(),
  grammarDone: integer("grammar_done").default(0).notNull(), // 1 if grammar block completed
  inputDone: integer("input_done").default(0).notNull(), // 1 if listening/reading block completed
  shadowingDone: integer("shadowing_done").default(0).notNull(), // 1 if shadowed
  quizScore: integer("quiz_score").default(0).notNull(),
  quizTotal: integer("quiz_total").default(0).notNull(),
  xpEarned: integer("xp_earned").default(0).notNull(),
  durationSec: integer("duration_sec").default(0).notNull(),
  createdAt: ts("created_at").defaultNow().notNull(),
});

// Grammar exercise attempt tracking
export const exerciseProgress = pgTable("exercise_progress", {
  id: v("id").primaryKey(),
  grammarId: v("grammar_id", 50).notNull(),
  exerciseIndex: integer("exercise_index").notNull(),
  correct: integer("correct").default(0).notNull(),
  attempts: integer("attempts").default(0).notNull(),
  lastAttemptAt: ts("last_attempt_at"),
  updatedAt: ts("updated_at").defaultNow().notNull(),
});
