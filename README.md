# Nihongo Path · 日本語パス

A research-driven Japanese learning web app covering **JLPT N5 → N1**, built with Next.js 16, TypeScript, Drizzle ORM, and PostgreSQL (Neon).

## What's inside

| Section | What it does |
|---|---|
| **Home** | Daily goal ring, XP & level, FSRS memory predictions, 7-day review forecast, activity chart, N5→N1 learning path |
| **Lessons** コース | 25-lesson Minna-no-Nihongo-style curriculum (Grammar → Vocab → Kanji → Examples → Practice → Review) |
| **Kana** 仮名 | Full hiragana + katakana charts with audio and quiz |
| **Vocabulary** 単語 | 3,170 words (N5:1,076 · N4:998 · N3:918 · N2:158 · N1:20) with furigana, romaji, pitch accent, examples, Vietnamese meanings |
| **Grammar** 文法 | 134 points with rules, verb-group conjugation tables, usage notes, common mistakes, 3 tiered examples, interactive exercises |
| **Kanji** 漢字 | 646 characters with on/kun readings, Hán-Việt, mnemonics, radicals, example words — chunked into sets of 10 |
| **Conjugation** 活用 | 27 verb/adjective paradigms across all verb groups |
| **Counters** 助数詞 | 20 counters with full 1–10 sound-change grids |
| **Flashcards** 復習 | **FSRS-5** spaced repetition (the algorithm powering modern Anki) with live interval previews and adjustable target retention |
| **Listening & Reading** 聴読 | Graded comprehension dojo: 19 audio passages + readings (N5–N1) with TTS playback, transcripts, translations, and questions |
| **Mock Test** 模試 | Timed 3-section JLPT exam simulation (文字・語彙 / 文法・読解 / 聴解), 180 points, real JLPT pass rules, wrong-answer review |
| **Quiz** クイズ | MCQ + **typing mode** (romaji→kana active production drills) |
| **Resources** 動画 | Curated YouTube videos, playlists, and channels with in-app player |

## The learning science

- **FSRS-5 scheduler** — models each card's Difficulty, Stability, and Retrievability; benchmarks show ~99.6% of users review less for the same retention vs SM-2. Target retention is tunable (85/90/95%).
- **Active production** — typing mode forces recall (testing effect), not just recognition.
- **Comprehensible input** — graded passages at 95–98% known-vocabulary coverage, per SLA research.
- **Output + input balance** — flashcards for acquisition, dojo + mock tests for exam skill.
- **Habit loop** — daily goal ring, streaks, XP levels: consistency compounds.

## Stack

- Next.js 16 (App Router, Turbopack) · React 19 · TypeScript
- Drizzle ORM + node-postgres → **Neon Postgres** (pooled endpoint)
- Tailwind CSS 4 + shadcn/ui, Noto Sans JP
- Browser SpeechSynthesis (ja-JP) for all audio
- Zustand for persisted learning preferences

## Setup

```bash
bun install
echo 'DATABASE_URL=postgresql://...your-neon-url...?sslmode=require' > .env
bunx drizzle-kit push          # create/sync tables
bun scripts/merge-neon.ts      # (optional) merge the full content corpus
bun run dev
```

Utility scripts:

- `scripts/merge-neon.ts` — merges the repo content corpus into the live DB (keeps existing rows, fills NULLs, adds missing)
- `scripts/test-fsrs.ts` / `scripts/test-romaji.ts` — offline unit tests for the FSRS engine and romaji converter
- `scripts/add-indexes.ts` — safety unique indexes
- `scripts/inspect-neon.ts` — DB inspection helper

## Vietnamese learner support

Vietnamese meanings (Nghĩa tiếng Việt), Hán-Việt kanji readings, and Vietnamese translations on passages and quiz questions — toggle in Settings.
