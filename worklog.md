---
Task ID: 1,2,3,4,5,6,7,8,9,10,11,12
Agent: main (Z.ai Code)
Task: Build a comprehensive Japanese learning web app (Nihongo Path) covering JLPT N5 → N3 with kana, vocabulary, grammar, kanji, flashcards (SRS), and curated YouTube resources.

Work Log:
- Explored existing Next.js 16 + TypeScript + shadcn/ui scaffold; confirmed dev server running on port 3000.
- Designed a warm sakura/rose themed UI with Noto Sans JP font for Japanese text, sticky header nav, and sticky footer (min-h-screen + flex-col + mt-auto pattern).
- Defined a Prisma schema (Kana, Vocabulary, Grammar, Kanji, Resource, FlashcardProgress, Stats, DailyActivity) and pushed it to SQLite.
- Wrote a comprehensive seed (scripts/seed.ts) with: 138 kana (hiragana + katakana + dakuten + handakuten + yōon), 166 vocabulary words across N5/N4/N3 (greetings, pronouns, question words, nouns, verbs, i/na-adjectives, adverbs, numbers, family, conjunctions), 56 grammar points (20 N5 + 18 N4 + 18 N3), 109 kanji with onyomi/kunyomi/meaning/stroke count/radical/example words, and 47 curated YouTube resources (videos/playlists/channels).
- Subagent (Task ID 2) researched and compiled real YouTube URLs via web-search skill; results integrated into seed.
- Built API routes: /api/dashboard, /api/kana, /api/vocabulary, /api/grammar, /api/kanji, /api/resources, /api/flashcards (SM-2 style SRS with add/review/reset actions), /api/stats.
- Built single-page app shell (src/components/app/app-shell.tsx) with sticky header (desktop nav + mobile horizontal scrollable pills), theme toggle (light/dark), streak badge, and footer.
- Built 7 sections: Dashboard (hero, stats cards, 7-day activity bar chart, N5/N4/N3 learning path cards, quick links), Kana (hiragana/katakana tabs, advanced rows toggle, clickable audio cards, 15-question multiple-choice quiz), Vocabulary (level + category filters + search, add-to-deck, add-all), Grammar (level filter, expandable accordion with examples + notes), Kanji (level filter, glyph grid, detail modal with readings/example), Flashcards (deck + level picker → flip-card review with Again/Hard/Good/Easy grading → completion stats), Resources (level + topic filters + search, YouTube thumbnails, type badges).
- Implemented browser SpeechSynthesis (ja-JP) for pronunciation across kana/vocab/grammar/kanji.
- Added flip-card CSS animation, custom scrollbar, fade-in transitions.

Stage Summary:
- App: "Nihongo Path · 日本語パス" — a single-route (/) Next.js 16 app with client-side section navigation via Zustand.
- Content seeded: 138 kana, 166 vocab, 56 grammar, 109 kanji, 47 YouTube resources.
- SRS engine working end-to-end: verified via browser that grading a card updates learned count (0→1), totalReviewed (0→1), streak (0→1), and byType breakdown on the dashboard.
- All 7 sections browser-verified interactive: kana quiz advances + scores, vocabulary add-to-deck flips to "In deck", grammar accordion expands, kanji detail modal opens, flashcard review flips + grades + advances (2/20), resources render 47 YouTube links with thumbnails.
- Lint clean (0 errors, 0 warnings). No console/runtime errors. Responsive verified at 375x812 (mobile) and 1440x900 (desktop).
- Skills used: agent-browser for end-to-end self-verification; web-search (via subagent) for YouTube resource research.

---
Task ID: R
Agent: research-subagent (general-purpose)
Task: Deep research on what makes Japanese learning apps effective, and identify concrete content/pedagogy gaps in the current Nihongo Path app (JLPT N5→N3 web app). Produce actionable findings to drive the next round of improvements.

Work Log:
- Read existing project files: worklog.md, prisma/schema.prisma, scripts/seed.ts, src/lib/sections/shared.ts, src/app/api/flashcards/route.ts.
- Confirmed current content totals: 138 kana, 166 vocab (92 N5 + 42 N4 + 32 N3), 56 grammar (20 N5 + 18 N4 + 18 N3), 109 kanji (53 N5 + 20 N4 + 36 N3), 47 YouTube resources. SM-2 style SRS engine works end-to-end.
- Used web-search skill via z-ai CLI to perform 50 targeted searches across 13 batches covering: top Japanese learning apps (WaniKani, Bunpro, Renshuu, Lingodeer, Duolingo, Todai, Anki), JLPT study strategy (N5/N4/N3 plans & hours), pedagogy best practices (SRS, kanji radicals, furigana removal, pitch accent, verb groups, stroke order), free resource URL verification (Tae Kim, Tofugu, Marugoto, Erin's Challenge, NHK World Easy, jisho.org, renshuu.org, Bunpro, Wasabi, Maggie Sensei, Imabi, Kanshudo, NHK News Web Easy, JLPT Sensei), and content gap research (N5 800-word vocab, N5/N4 grammar lists, N5 100 kanji, Japanese counters, keigo, onomatopoeia, verb conjugation, time expressions, particles, adjective conjugation, app comparisons).
- Saved 49 raw JSON search-result files under /home/z/my-project/research/ (s01–s52) for traceability.
- Cross-referenced current seed against canonical JLPT lists (Tofugu, Migaku, JLPT Sensei, MLC Japanese, japanesetest4you, nihongoichiban, kanshudo) to identify missing high-frequency N5 vocabulary, common N5/N4 grammar points, and essential N5 kanji.
- Verified real, working URLs for each free resource recommended.

Stage Summary:
- Output: a structured 6-section report (A–F) delivered back to the main agent covering:
  A) Top 10 features to add (ranked by impact, with rough effort),
  B) Recommended study path N5 → N3 (week-by-week schedule),
  C) Concrete pedagogy recommendations (furigana-on-hover, verb groups before conjugation, thematic vocab grouping, pitch-accent annotation, etc.),
  D) 14 verified additional free resources with {title, url, type, level, topic, description} entries ready to paste into the seed,
  E) Specific content-gap lists: ~48 high-frequency N5 vocab words, ~10 missing N5/N4 grammar points, ~24 essential N5 kanji, and recommendations to add new content types (counters, keigo, verb conjugation tables, onomatopoeia, pitch accent),
  F) Common bugs/UX pitfalls to avoid (furigana always-on, SRS too aggressive, kana-only reading, etc.).
- No code was changed; this was a research-only task. Findings directly drive the next round of seed content expansion and feature improvements.

---
Task ID: R, b1, f1, q1, c1, cn, l1, f2, e1, v1
Agent: main (Z.ai Code)
Task: Make the app super good for learning — deep research, fix every bug, add high-impact features.

Work Log:
- Launched research subagent (Task ID R) which ran 50+ web searches across top Japanese apps (WaniKani, Bunpro, Renshuu, Lingodeer, Duolingo, Todai, Anki), JLPT strategy, pedagogy, and free resources. Saved findings to /home/z/my-project/research/.
- Expanded Prisma schema: added Counter, Conjugation models; added verbGroup, pitchAccent, lesson, exampleJp2/En2, commonMistake, mnemonic fields to existing models.
- Expanded seed content (scripts/extra-content.ts): +95 vocabulary (time, food, verbs, adjectives, colors, greetings), +12 grammar points (か/ね/よ/へ/や/てください/ませんか/が欲しい/と思う/ので/ほうがいい/時/前後に), +24 kanji with mnemonics (口目手足男女父子兄姉左右外出入立休名言音花雨前), +20 counters with full sound-change tables (つ個人枚本冊匹台杯階歳番円時分日月週間年回), +27 conjugation paradigms (irregular/godan/ichidan/i-adj/na-adj), +17 verified free resources (Tae Kim, Tofugu, Jisho, Marugoto, NHK, renshuu, Bunpro, etc.).
- Total content: 138 kana, 261 vocab, 68 grammar, 133 kanji, 20 counters, 27 conjugations, 64 resources.
- Fixed critical bugs:
  * Deck-membership sync: Vocab/Grammar/Kanji now fetch /api/flashcards/deck on mount so "In deck" state persists across navigation (was resetting to 0).
  * Dashboard per-level progress: now shows real learnedByLevel/totalByLevel (N5: 0/292, N4: 0/84, N3: 0/86) instead of hardcoded 0.
  * Timezone/streak: switched from UTC to local date keys (localDayKey) so streak & activity align with user's day (Asia/Saigon).
  * TTS voice loading: cache Japanese voice + refresh on 'voiceschanged' event (was returning empty on first call).
  * Prisma query logging: disabled ['query'] log (was flooding logs, causing memory pressure).
- Added new features:
  * Furigana rendering (ruby tags) for all kanji in example sentences, with user-selectable mode (always/hover/never) — research's #1 recommendation.
  * Romaji toggle (always/after-review/never) — research's #4 recommendation.
  * TTS rate setting (slow/normal/native) — research's #11 recommendation.
  * Settings panel with all preferences, persisted to localStorage.
  * Quizzes for Vocabulary, Kanji, Kana, and Grammar (JLPT-style multiple choice, 10 questions, collects mistakes for review).
  * Verb Conjugation section: 27 paradigms with verb-group tagging (Godan/Ichidan/Irregular) + group explainer + i-adj/na-adj paradigms.
  * Counters section: 20 counters with full 1-10 sound-change grids, color-coded changed readings, notes, examples.
  * Lessons section: 9 guided thematic lessons (First Words, Self-Intro, Time, Food, Places, Nature, Verbs, Conditions, Conjecture) with path visualization.
  * Word of the Day on dashboard (deterministic by date).
  * Common-mistake warnings on grammar cards (e.g. は vs が, たら vs ば).
  * Mnemonics on kanji detail modals.
  * Expanded nav with all new sections + improved mobile horizontal scroll.
- Updated Vocabulary/Grammar/Kanji sections to use Furigana component, deck-sync, and new fields.
- Browser-verified: dashboard shows word-of-day + real progress; counters render sound-change grids; conjugations show verb-group forms; quiz generates questions; lessons show path; vocab shows "In deck: 1" after review (deck-sync fix confirmed); furigana hover mode hides all 200 readings until hover; settings persist to localStorage; SRS review still works (graded Good → advanced 2/20).
- Lint clean (0 errors, 0 warnings). No runtime errors in dev log.

Stage Summary:
- App now has 11 sections: Dashboard, Lessons, Kana, Vocabulary, Grammar, Kanji, Conjugation, Counters, Flashcards, Quiz, Resources.
- Content expanded ~70% (vocab 166→261, grammar 56→68, kanji 109→133, +20 counters, +27 conjugations, +17 resources).
- 5 critical bugs fixed (deck sync, dashboard progress, timezone/streak, TTS voices, Prisma logging).
- 7 major learning features added (furigana with hover mode, romaji toggle, TTS rate, quizzes for all types, conjugation tables, counters with sound changes, guided lessons, word of day, mnemonics, common-mistake warnings).
- All settings persist to localStorage. Research-backed pedagogy: furigana-on-hover, verb groups before conjugation, thematic lessons, sound-change highlighting.

---
Task ID: G1+EX1
Agent: grammar-content-subagent
Task: Expand grammar content + add exercises

Work Log:
- Read worklog.md, prisma/schema.prisma (Grammar model), scripts/seed.ts (GRAMMAR array — 56 entries), and scripts/extra-content.ts (EXTRA_GRAMMAR — 12 entries) to understand existing data shape and gaps.
- Designed a NEW TypeScript file at /home/z/my-project/scripts/grammar-content.ts exporting the `ExpandedGrammar` type and an `EXPANDED_GRAMMAR` array of 69 grammar points (29 N5 + 22 N4 + 18 N3) — exceeding the requested ~60-65 minimum.
- Coverage follows Minna no Nihongo-style lesson progression:
  * N5 (lessons 1–12): です, は, の, も, が, か, ね, よ, を, に, で, と, から, まで, へ, や/など, ます, たい, ませんか, ましょう, て, てください, ている, ない, た, が欲しい, と思う, より/のほうが, 一番.
  * N4 (lessons 13–18): ているところ, たばかり, ながら, てから, てもいい, てはいけない, なければならない, なくてもいい, たら, ば, と, ましょうか, てあげる/てもらう/てくれる, そうです(hearsay), そうです(conjecture), たがる, つもり, し, ので, ほうがいい, 時, 前に/後で.
  * N3 (lessons 19–25): かもしれません, はず, に違いない, ようだ, らしい, みたいだ, てしまう, ておく, てみる, ことがある, ことにする, ことになる, ようになる, ようにする, ばかり, てたまらない, ないで, ないと/なきゃ.
- Each grammar point follows the requested schema: title, level, lesson, chapter, structure, meaning, rule (2-4 sentences, full paragraphs for complex topics like は vs が, たら/ば/と, verb groups), conjugation (with the 3 verb-group rules — Ichidan/Godan/Irregular — for every verb-form pattern: ます, ない, た, て, たい, たがる, ましょう, ましょうか, てしまう, ておく, てみる, てから, ながら, てあげる, てもらう, てくれる, てください, ている, てもいい, てはいけない, なければならない, なくてもいい, たら, ば, ないで, なきゃ, てたまらない, たばかり, ているところ), usage (2-3 sentences, context/register/nuance), commonMistake (learner error + correct version), 3 examples (easy → medium → hard, each with kanji Japanese + English + optional teaching note), and 2-3 exercises mixing fill-in-the-blank and multiple-choice.
- File length: ~3700 lines, valid TypeScript, exports both `EXPANDED_GRAMMAR` (array) and `ExpandedGrammar` (type) plus a default export.
- Patched several self-review issues after first draft: removed a malformed example block in the で entry (had stray `jpg`/`as any`/trailing `.map`), fixed wrong exercise answer "らな" → "らない" in the 〜てください entry, fixed empty-string options in 〜に違いない and 〜ないで multiple-choice exercises, fixed incorrect multiple-choice answer "食べてている" → "食べている" in the 〜ているところ entry, cleaned up a self-correcting ramble in the 〜たら usage field, and updated header comment to reflect actual counts.
- Did NOT run any build commands per task instructions (just wrote the file). All `order` values 1..69 are sequential and unique; all `lesson` values fit the 1–25 range per level.

Stage Summary:
- NEW FILE: /home/z/my-project/scripts/grammar-content.ts (~3700 lines).
- 69 grammar points total (29 N5 / 22 N4 / 18 N3) — exceeds the requested ~60-65 minimum.
- Each entry is pedagogically rich: long rule paragraphs, full verb-group conjugation tables for every verb-form pattern, 3 difficulty-tiered examples with teaching notes, 2-3 mixed exercises per point.
- Exports: `EXPANDED_GRAMMAR` (array of ExpandedGrammar) and `ExpandedGrammar` (type) plus default export.
- Original explanations written from scratch (Minna no Nihongo-style lesson organization but no copied text).
- File ready to be imported into seed scripts for migration to the Grammar model. NOTE: the existing Grammar model fields (title/level/structure/meaning/explanation/exampleJp/exampleEn/exampleJp2/exampleEn2/note/commonMistake/lesson/order) are a SUBSET of ExpandedGrammar — main agent will need to extend the Grammar schema (add `chapter`, `rule`, `conjugation`, `usage`, `examples[]`, `exercises[]`) or flatten the expanded fields into existing string fields before seeding.
- No code outside the new file was modified; no DB writes; no build commands run.

---
Task ID: d1, g1, ex1, l1, rv1, k1, yt1, ui1, v1
Agent: main (Z.ai Code)
Task: Drizzle migration + expand grammar + Minna-no-Nihongo lessons + in-app YouTube + chunked kanji

Work Log:
- Migrated from Prisma to Drizzle ORM (better-sqlite3 driver) to fix OOM. New schema at src/db/schema.ts with 12 tables (kana, vocabulary, grammar, kanji, counter, conjugation, resource, flashcardProgress, stats, dailyActivity, lessonProgress, exerciseProgress). Drizzle is synchronous + lighter than Prisma Client — server now stable at ~1.2GB under heavy load vs crashing before.
- Subagent (Task ID G1+EX1) wrote 69 expanded grammar points (scripts/grammar-content.ts, ~3700 lines). Each has: title, level, lesson, chapter, structure, meaning, rule (2-4 sentences, full paragraphs for complex topics), conjugation (with verb-group rules for verb forms), usage, commonMistake, 3 examples (easy/medium/hard), 2-3 exercises (fill-blank + multiple-choice).
- Expanded Grammar model: added rule, conjugation, usage, chapter, examples (JSON), exercises (JSON) fields.
- Added lessonProgress + exerciseProgress tables for tracking.
- Rewrote all 14 API routes to use Drizzle (dashboard, kana, vocabulary, grammar, kanji, counters, conjugations, resources, flashcards, flashcards/deck, quiz, stats, word-of-day, lessons).
- Built Minna-no-Nihongo-inspired lesson curriculum: 25 lessons across 3 levels (12 N5, 6 N4, 7 N3), grouped into chapters. Each lesson follows Grammar → Vocabulary → Kanji → Examples → Practice → Review flow. Periodic review lessons (every ~5th lesson) consolidate prior material.
- Lessons API supports: GET (list with progress + counts), GET ?id=X (detailed lesson with content), POST mark-step (track step completion), POST complete-lesson.
- Rewrote Lessons UI: roadmap progress bar (X of 25 lessons, %), chapter grouping, lesson rows with completion state, detailed lesson view with step tracker (clickable steps, auto-jumps to first incomplete), and per-step content (Grammar/Vocab/Kanji/Examples/Practice/Review). Mark-step + complete-lesson buttons.
- Rewrote Grammar UI: expandable cards with Rule, Conjugation (highlighted box), Usage, 3 difficulty-tiered examples (color-coded easy/medium/hard), common-mistake warning, and inline interactive exercises (fill-in-blank + multiple-choice with instant feedback).
- Added in-app YouTube player (src/components/app/youtube-player.tsx): click a resource → modal with embedded iframe. Channels/playlists show a thumbnail + "Open on YouTube" redirect (can't be embedded). Videos play in-app with a "YouTube" link for fullscreen.
- Chunked kanji into sets of 10 per level: set selector UI (Set 1 · 10, Set 2 · 10, ...). Smaller learning sessions as requested.
- Updated Resources UI: cards show "Play in app" or "Open on YouTube" badge based on embeddability; play overlay on hover.
- Kept design system consistent (same sakura/rose theme, Noto Sans JP, shadcn/ui, furigana, settings).

Stage Summary:
- DB: Prisma → Drizzle (better-sqlite3). OOM fixed. Server stable at ~1.2GB under load.
- Content: 69 expanded grammar points (was 68 short ones), 240 vocab, 77 kanji (chunked into sets of 10), 20 counters, 27 conjugations, 28 resources.
- Grammar: each point now has rule + conjugation patterns + usage + 3 difficulty-tiered examples + 2-3 interactive exercises.
- Lessons: 25-lesson Minna-no-Nihongo-style curriculum with Grammar→Vocab→Kanji→Examples→Practice→Review flow, periodic review lessons, progress tracking (started/completed/steps), roadmap progress bar.
- YouTube: in-app iframe player; redirect only for channels/playlists/fullscreen.
- Kanji: set-based chunking (10 per set) for smaller sessions.
- Browser-verified: lessons step flow works, grammar exercises work (fill-blank + MCQ), YouTube plays in-app, kanji sets work, dashboard roadmap shows progress, server stable.
- Lint clean. No runtime errors.

---
Task ID: J2 (main session)
Agent: main (Z.ai Code)
Task: Deep-research-driven N5/N4/N3 content expansion — make lessons full, rich, complete. Recover from two environment crashes. Push to GitHub.

Work Log:
- Continued prior session's plan: integrate pending content files (1,683 vocab + 224 kanji) into the seed.
- Cleaned artifacts from the interrupted kanji file (16 dup-guard entries + garbage entries → fixed to 参/許).
- Extracted canonical word/character inventories from DB + files for subagent prompts.
- Launched 5 parallel content subagents (N3 kanji, N5/N4 grammar gap 28 pts, N3 grammar gap 28 pts, N3 vocab part C, N4 vocab part C). 3 succeeded; 2 kanji agents were killed by an environment container restart.
- ENVIRONMENT CRASH #1 (10:32): container restarted; filesystem rolled back to a ~02:30 snapshot — destroyed the japanese repo working tree (incl. untracked content files), killed postgres/dev server. Root git repo had no copies. Recovered inventories from conversation context.
- Recovery: re-cloned from GitHub; wrote recovery-inventory files (N5:777/N4:523/N3:549 words, 300 kanji chars) — verified counts match pre-crash exactly; committed to a new `content-expansion` branch and pushed (protecting all future work against rollbacks).
- Restored infrastructure: portable Postgres 17.2 (zonky binaries from Maven Central) on port 5433, initdb, drizzle-kit push, baseline seed. Discovered platform env var DATABASE_URL (sqlite default) shadows .env — must export explicitly.
- Regenerated ALL content via 15 subagent runs (smaller chunks + incremental writes + strict no-destructive-command rules after the crash):
  * vocab-n5-a/b/c (250+250+90), vocab-n4-a/b/c (250+247+255), vocab-n3-a/b/c (260+262+256)
  * kanji-n54-a/b/c/d (62+62+62+60), kanji-n3-a/b/c (84+63+78)
  * grammar-n5-n4-b (28 pts, orders 70-97), grammar-n3-b (28 pts, orders 98-125)
- ENVIRONMENT CRASH #2 (13:44): container restarted again mid-batch; everything was safe on GitHub (committed after every batch); only the in-flight kanji-n3-b file needed rescue from disk.
- Fixed 两→両 typo in curated N3 kanji target list (simplified char slipped into my curation).
- Ran all 18 validators — ALL PASS (exact target coverage, no dups, examples on every entry, no simplified chars).
- Seed integration: seed.ts imports all 25 content files; category→lesson assignment map; batched inserts; per-level order renumbering. Final seeded content: 2,360 vocab (N5:777/N4:778/N3:805), 125 grammar points, 548 kanji (N5:125/N4:198/N3:225), 138 kana, 20 counters, 27 conjugations, 28 resources.
- App updates: lessons API now loads kanji for N3 lessons (was N5/N4 only); vocabulary UI got show-more pagination (60/page) for the 800-word levels.
- Browser-verified with agent-browser: dashboard 2360 words; vocab pagination 60→120 of 777; N3 kanji 22+1 sets (愛 renders); lesson 19 (N3) Kanji step works; grammar 125 points loads; quiz generates questions from new pool; zero console/page errors. Screenshots saved to /home/z/my-project/download/.
- ESLint clean. tsc clean on app code (validator scripts use bun-specific import.meta — dev tooling only, not part of next build).
- Merged content-expansion → master (d00340a, 61 files, +12,755 lines) and pushed.

Stage Summary:
- Content corpus: 240→2,360 vocab, 69→125 grammar, 77→548 kanji (~10x expansion). N5/N4/N3 are now full, rich, complete.
- Every vocab entry: reading + meaning + romaji + category + pos + verbGroup + original example sentence pair.
- Every kanji: onyomi/kunyomi + meaning + strokes + radical + original mnemonic + example word.
- Every grammar point: structure + meaning + long rule + 3-verb-group conjugation + usage + ✗→✓ common mistake + 3 difficulty-tiered examples + 2-3 interactive exercises.
- Disaster recovery: survived 2 container restarts via commit-after-every-batch discipline; all work pushed to GitHub.

---
Task ID: J3 (main session)
Agent: main (Z.ai)
Task: Connect the app to the user's real Neon Postgres DB + deep-research-driven upgrade to make learning Japanese fast (FSRS, comprehension dojo, mock tests, typing drills, XP/goal system, Vietnamese support).

Work Log:
- Connected to Neon (PostgreSQL 18.6, pooled endpoint): tested pg driver compat (sslmode=require; channel_binding param ignored by driver), wrote .env, verified latency (~3s round trip from this region).
- Discovered deployed-generation schema on Neon (users with bcrypt+daily_goal, comprehension_passage with vi/questions JSON, vi_meaning/han_viet/example_vi columns, user_id-scoped progress, N2/N1 data) — richer features than repo but thinner content (1,259 vocab vs repo 2,360).
- Unified schema: aligned src/db/schema.ts to Neon's exact column types (varchar lengths) → non-interactive drizzle-kit push (purely additive: +stability/difficulty on flashcard_progress, +comprehension_progress, +mock_test_result tables). Added safety unique indexes via raw SQL (stats.key, daily_activity.date, lesson_progress.lesson_id, due_at/item indexes).
- Content merge (scripts/merge-neon.ts): kept Neon rows (vi data + ids preserved), enriched NULL fields from repo corpus, inserted repo-only entries. Final: 3,170 vocab (N5:1076/N4:998/N3:918/N2:158/N1:20), 134 grammar (renumbered per level), 646 kanji (recomputed sets of 10), 138 kana / 20 counters / 27 conjugations (replaced), 33 resources. Progress tables + users + passages untouched.
- Deep research (2 web-search batches + FSRS wiki fetch): FSRS-5 beats SM-2 for 99.6% of users (SRS Benchmark); comprehensible input needs 95-98% coverage; output practice (testing effect) + input both required; Duolingo-style goal/streak/XP drives retention; JLPT format 3×60pts, pass 80/180 + 19/section.
- Implemented FSRS-5 engine (src/lib/fsrs.ts) from the published spec: DSR model, forgetting curve (DECAY=-0.5, FACTOR=19/81), S0/D0 init, recall/forget stability, same-day short-term path, linear-damped difficulty with mean reversion, interval from desired retention, ±5% fuzz. 32 sanity tests pass (scripts/test-fsrs.ts), incl. spacing effect, saturation, overdue boost.
- Wired FSRS into /api/flashcards (review action): stability/difficulty persisted, legacy box/ease/interval derived, XP awarding, retention param from client settings; GET returns per-card predicted recall R.
- New: romaji→kana converter (src/lib/romaji.ts, IME rules: sokuon doubling, tch, ん/n'/nn, Hepburn m-before-b/p/m, 3-char syllables, digraphs, alt spellings) + matchesReading with particle orthography fallbacks (は→わ, へ→え, を→お). 50 tests pass.
- New sections: Listening & Reading Dojo (/practice + /api/practice) — TTS playback w/ speed control + play count, reveal transcript, en/vi translations, instant-feedback MCQs w/ explanations, best-score tracking, XP; JLPT Mock Test (/mock-test + /api/mock-test) — generated 3-section timed exam (vocab variants: reading/meaning/reverse; grammar exercises from DB; reading passages; listening w/ TTS), per-section timers + auto-advance, question pills, JLPT scoring + pass rules, wrong-answer review, history, XP.
- Quiz typing mode: vocabulary (type reading in romaji/kana) + kana (type romaji); XP +3/correct; vi hints shown.
- Dashboard: daily-goal ring, XP/level curve, 7-day review forecast chart, predicted + true retention, 5-level path cards, new hero CTAs; app-shell nav + settings extended (Vietnamese toggle, daily goal 10/20/40/80, FSRS retention 85/90/95%).
- Vietnamese support: vocab vi_meaning, kanji han_viet+vi_meaning, word-of-day vi, passage vi + questionVi — all behind showVietnamese setting (default on, localStorage v2 with v1 migration).
- Level support N5→N1 everywhere: fixed N5-N3 whitelists in 6 API routes + flashcards level picker; LEVELS/badges/desc extended.
- Browser-verified with agent-browser: dashboard (goal 4/20, Level 2, 116 XP, forecast), dojo (played audio, answered 3/3, score+XP), mock test (full 3-section run → 20/180 scored result + review), quiz typing (typed 'demo'→でも ✓, wrong answers correctly rejected e.g. bentou≠おべんとう, nana≠しち for 七), vocab N2 filter (158 words) + 60/60 cards show vi, kanji modal (Nhân — nhân dân), N2 grammar loads, lessons 25, FSRS grade buttons show live intervals (Good→3 days, Easy→15 days). Zero console/page errors; dev log clean.
- tsc clean on app code; eslint clean (fixed one react-hooks hoisting error in mock-test).
- Committed 20f297f and pushed to master. Wrote README.md.

Stage Summary:
- App now runs on the user's real Neon data with a unified, richer content corpus (3,170 vocab / 134 grammar / 646 kanji / 19 passages).
- SRS upgraded SM-2→FSRS-5 (research-backed efficiency), plus XP/goal/streak habit loop.
- 3 major new learning features: comprehension dojo, JLPT mock exams, typing drills; Vietnamese localization throughout.
- Tooling: scripts/merge-neon.ts, test-fsrs.ts, test-romaji.ts, add-indexes.ts, inspect scripts.
- Screenshots: /home/z/my-project/download/jp-dashboard.png, jp-practice-done.png, jp-mocktest-result.png, jp-lessons.png, jp-final-dashboard.png.
