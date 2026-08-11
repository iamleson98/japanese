"use client";

import * as React from "react";
import {
  cn,
  Volume2,
  Layers3,
  RefreshCw,
  Check,
  X,
  Sparkles,
  Lightbulb,
} from "@/components/app/imports";
import { Modal } from "@/components/app/modal";
import { SectionHeader, EmptyState } from "./_primitives";
import { ROW_LABEL, speakJapanese } from "@/lib/sections/shared";
import { useApp } from "@/lib/store";

type Kana = {
  id: string;
  char: string;
  romaji: string;
  type: "hiragana" | "katakana";
  row: string;
  order: number;
  pair: string | null;
};

type RowGroup = { row: string; items: Kana[] };

const BASE_ROWS = ["vowels", "k", "s", "t", "n", "h", "m", "y", "r", "w", "n-solo"];
const ALL_ROWS = [...BASE_ROWS, "dakuten", "handakuten", "yoon"];

export function KanaSection() {
  const [type, setType] = React.useState<"hiragana" | "katakana">("hiragana");
  const [showAdvanced, setShowAdvanced] = React.useState(false);
  const [quizOpen, setQuizOpen] = React.useState(false);
  const [data, setData] = React.useState<RowGroup[]>([]);
  const [loading, setLoading] = React.useState(true);
  const startReview = useApp((s) => s.startReview);

  const load = React.useCallback((t: "hiragana" | "katakana") => {
    setLoading(true);
    fetch(`/api/kana?type=${t}`)
      .then((r) => r.json())
      .then((d) => setData(d.rows ?? []))
      .finally(() => setLoading(false));
  }, []);

  React.useEffect(() => {
    load(type);
  }, [type, load]);

  const visibleRows = showAdvanced ? ALL_ROWS : BASE_ROWS;
  const rows = data.filter((r) => visibleRows.includes(r.row));
  const flat = rows.flatMap((r) => r.items);
  const totalChars = flat.length;

  return (
    <div>
      <SectionHeader
        eyebrow="Step 1 · The syllabary"
        title="Kana"
        jp="仮名"
        description="Master the two Japanese syllabaries. Click any character to hear it. Switch scripts, toggle advanced rows (dakuten, handakuten, yōon), then quiz yourself."
      >
        <div className="inline-flex items-center gap-1 rounded-lg bg-muted p-1">
          {(["hiragana", "katakana"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium transition capitalize",
                type === t
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t === "hiragana" ? "ひらがな" : "カタカナ"}
              <span className="ml-2 text-xs text-muted-foreground hidden sm:inline">
                {t}
              </span>
            </button>
          ))}
        </div>
        <button
          onClick={() => setQuizOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
        >
          <Sparkles className="h-4 w-4" />
          Start Quiz
        </button>
      </SectionHeader>

      {/* toggle advanced */}
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <label className="inline-flex items-center gap-2 text-sm text-muted-foreground cursor-pointer select-none">
          <input
            type="checkbox"
            checked={showAdvanced}
            onChange={(e) => setShowAdvanced(e.target.checked)}
            className="h-4 w-4 rounded border-border accent-[oklch(0.52_0.18_25)]"
          />
          Show advanced rows (dakuten 濁点, handakuten 半濁点, yōon 拗音)
        </label>
        <div className="ml-auto text-xs text-muted-foreground tabular-nums">
          {totalChars} characters
        </div>
      </div>

      {loading ? (
        <KanaSkeleton />
      ) : rows.length === 0 ? (
        <EmptyState icon={Volume2} title="No kana found" />
      ) : (
        <div className="space-y-6">
          {rows.map((group) => (
            <KanaRow key={group.row} group={group} />
          ))}
        </div>
      )}

      <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-start gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground shrink-0">
            <Lightbulb className="h-4 w-4" />
          </span>
          <div>
            <h3 className="font-semibold">Ready to lock it in?</h3>
            <p className="text-sm text-muted-foreground">
              Add these characters to your flashcard deck for spaced-repetition review.
            </p>
          </div>
        </div>
        <button
          onClick={() => startReview("kana", null)}
          className="ml-auto inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition"
        >
          <Layers3 className="h-4 w-4" />
          Review kana flashcards
        </button>
      </div>

      {quizOpen && (
        <KanaQuiz data={flat} type={type} onClose={() => setQuizOpen(false)} />
      )}
    </div>
  );
}

function KanaRow({ group }: { group: RowGroup }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-sm font-semibold text-muted-foreground">
          {ROW_LABEL[group.row] ?? group.row}
        </h3>
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground tabular-nums">{group.items.length}</span>
      </div>
      <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-11 gap-2">
        {group.items.map((k) => (
          <KanaCard key={k.id} kana={k} />
        ))}
      </div>
    </div>
  );
}

function KanaCard({ kana }: { kana: Kana }) {
  const [flipped, setFlipped] = React.useState(false);
  return (
    <button
      onClick={() => {
        setFlipped((f) => !f);
        speakJapanese(kana.char);
      }}
      className={cn(
        "group relative aspect-square rounded-xl border border-border bg-card p-2 flex flex-col items-center justify-center transition hover:border-primary/40 hover:shadow-sm",
        flipped && "border-primary/50 bg-primary/5"
      )}
      title={`Click to hear: ${kana.romaji}`}
    >
      <span className="font-jp text-2xl sm:text-3xl font-medium leading-none">{kana.char}</span>
      <span
        className={cn(
          "mt-1 text-[11px] text-muted-foreground transition",
          flipped ? "opacity-100 text-primary" : "opacity-0 group-hover:opacity-100"
        )}
      >
        {kana.romaji}
      </span>
      <Volume2 className="absolute top-1.5 right-1.5 h-3 w-3 text-muted-foreground/0 group-hover:text-muted-foreground/70 transition" />
    </button>
  );
}

function KanaSkeleton() {
  return (
    <div className="space-y-6">
      {[0, 1, 2, 3].map((i) => (
        <div key={i}>
          <div className="h-4 w-32 rounded bg-muted mb-2" />
          <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-11 gap-2">
            {Array.from({ length: 10 }).map((_, j) => (
              <div key={j} className="aspect-square rounded-xl bg-muted animate-pulse" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// -------------------- Kana Quiz --------------------
function KanaQuiz({
  data,
  type,
  onClose,
}: {
  data: Kana[];
  type: "hiragana" | "katakana";
  onClose: () => void;
}) {
  const [pool, setPool] = React.useState<Kana[]>([]);
  const [idx, setIdx] = React.useState(0);
  const [score, setScore] = React.useState({ correct: 0, wrong: 0 });
  const [picked, setPicked] = React.useState<string | null>(null);
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    // Build a randomized session of 15 questions
    const shuffled = [...data].sort(() => Math.random() - 0.5).slice(0, Math.min(15, data.length));
    setPool(shuffled);
    setIdx(0);
    setScore({ correct: 0, wrong: 0 });
    setPicked(null);
    setDone(false);
  }, [data]);

  const current = pool[idx];

  // Generate 4 options (the right romaji + 3 distractors from the same data)
  const options = React.useMemo(() => {
    if (!current) return [];
    const others = data.filter((k) => k.romaji !== current.romaji).sort(() => Math.random() - 0.5);
    const opts = [current, ...others.slice(0, 3)].sort(() => Math.random() - 0.5);
    return opts.map((k) => k.romaji);
  }, [current, data, idx]);

  function answer(romaji: string) {
    if (picked) return;
    setPicked(romaji);
    if (romaji === current.romaji) {
      setScore((s) => ({ ...s, correct: s.correct + 1 }));
    } else {
      setScore((s) => ({ ...s, wrong: s.wrong + 1 }));
    }
    speakJapanese(current.char);
    setTimeout(() => {
      if (idx + 1 >= pool.length) {
        setDone(true);
      } else {
        setIdx((i) => i + 1);
        setPicked(null);
      }
    }, 900);
  }

  return (
    <Modal open onClose={onClose} className="max-w-lg">
      <div className="flex items-center justify-between border-b border-border px-5 py-3 pr-12">
        <div>
          <h3 className="font-semibold">
            {type === "hiragana" ? "Hiragana" : "Katakana"} Quiz
          </h3>
          <p className="text-xs text-muted-foreground">
            Question {Math.min(idx + 1, pool.length)} / {pool.length}
          </p>
        </div>
      </div>
        <div className="p-6">
          {done ? (
            <div className="text-center py-6">
              <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-primary/10 text-primary">
                <Check className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">
                {score.correct} / {pool.length}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {score.correct === pool.length
                  ? "Perfect! すごい！"
                  : score.correct >= pool.length * 0.7
                  ? "Great job! よくできました！"
                  : "Keep practicing — 練習しましょう！"}
              </p>
              <div className="mt-6 flex justify-center gap-2">
                <button
                  onClick={() => {
                    setPool([...data].sort(() => Math.random() - 0.5).slice(0, Math.min(15, data.length)));
                    setIdx(0);
                    setScore({ correct: 0, wrong: 0 });
                    setPicked(null);
                    setDone(false);
                  }}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition"
                >
                  <RefreshCw className="h-4 w-4" />
                  Try again
                </button>
                <button
                  onClick={onClose}
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold hover:bg-accent transition"
                >
                  Done
                </button>
              </div>
            </div>
          ) : current ? (
            <div>
              <div className="mx-auto mb-6 grid h-40 w-40 place-items-center rounded-2xl border border-border bg-muted/40">
                <span className="font-jp text-7xl font-medium">{current.char}</span>
              </div>
              <p className="text-center text-sm text-muted-foreground mb-4">
                What is the reading (romaji)?
              </p>
              <div className="grid grid-cols-2 gap-2">
                {options.map((opt) => {
                  const state =
                    picked === null
                      ? "idle"
                      : opt === current.romaji
                      ? "correct"
                      : opt === picked
                      ? "wrong"
                      : "dim";
                  return (
                    <button
                      key={opt}
                      onClick={() => answer(opt)}
                      disabled={picked !== null}
                      className={cn(
                        "rounded-lg border px-4 py-3 text-sm font-medium transition",
                        state === "idle" && "border-border bg-background hover:bg-accent",
                        state === "correct" && "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
                        state === "wrong" && "border-rose-500 bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300",
                        state === "dim" && "border-border bg-muted opacity-50"
                      )}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              <div className="mt-4 flex justify-between text-sm text-muted-foreground">
                <span>
                  ✓ {score.correct} &nbsp; ✗ {score.wrong}
                </span>
                <button
                  onClick={() => speakJapanese(current.char)}
                  className="inline-flex items-center gap-1 hover:text-foreground"
                >
                  <Volume2 className="h-3.5 w-3.5" /> Hear again
                </button>
              </div>
            </div>
          ) : (
            <div className="py-10 text-center text-muted-foreground">Loading…</div>
          )}
        </div>
    </Modal>
  );
}
