"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  cn,
  Plus,
  Check,
  Languages,
  Lightbulb,
  Volume2,
  Layers3,
  AlertCircle,
  ChevronDown,
  PencilLine,
  CheckCircle2,
  X,
  RefreshCw,
  Brain,
} from "@/components/app/imports";
import { SectionHeader, LevelTabs, LevelBadge, EmptyState } from "./_primitives";
import { speakJapanese } from "@/lib/sections/shared";
import { Furigana } from "@/components/app/furigana";
import { getFlashcardsHref } from "@/lib/routes";
import { toast } from "sonner";

type Example = { jp: string; en: string; difficulty: "easy" | "medium" | "hard"; note?: string };
type Exercise = { question: string; answer: string; hint?: string; type: "fill-blank" | "multiple-choice"; options?: string[] };

type Grammar = {
  id: string;
  title: string;
  level: string;
  lesson: number | null;
  chapter: string | null;
  structure: string;
  meaning: string;
  rule: string | null;
  conjugation: string | null;
  usage: string | null;
  commonMistake: string | null;
  examples: Example[];
  exercises: Exercise[];
  // legacy
  explanation: string | null;
  exampleJp: string | null;
  exampleEn: string | null;
  note: string | null;
  order: number;
};

export function GrammarSection() {
  const router = useRouter();
  const [level, setLevel] = React.useState("N5");
  const [items, setItems] = React.useState<Grammar[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [added, setAdded] = React.useState<Set<string>>(new Set());
  const [open, setOpen] = React.useState<string | null>(null);

  React.useEffect(() => {
    setLoading(true);
    setOpen(null);
    fetch(`/api/grammar?level=${level}`)
      .then((r) => r.json())
      .then((d) => {
        setItems(d.items ?? []);
        // Auto-open the first one
        if (d.items?.length && !open) setOpen(d.items[0].id);
      })
      .finally(() => setLoading(false));
  }, [level]);

  React.useEffect(() => {
    fetch("/api/flashcards/deck?type=grammar")
      .then((r) => r.json())
      .then((d) => setAdded(new Set(d.byType?.grammar ?? [])))
      .catch(() => {});
  }, []);

  async function addToDeck(g: Grammar) {
    if (added.has(g.id)) return;
    try {
      const res = await fetch("/api/flashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "add", itemType: "grammar", itemIds: [g.id] }),
      });
      const d = await res.json();
      if (d.ok) {
        setAdded((s) => new Set(s).add(g.id));
        toast.success(`Added “${g.title}” to your deck`);
      }
    } catch {
      toast.error("Could not add to deck");
    }
  }

  return (
    <div>
      <SectionHeader
        eyebrow="The skeleton of the language"
        title="Grammar"
        jp="文法"
        description="Each grammar point includes a clear rule, conjugation patterns (with verb-group explanations for verb forms), usage notes, a common-mistake warning, 3 example sentences (easy → hard), and practice exercises you can do right here."
      >
        <button
          onClick={() => router.push(getFlashcardsHref("grammar", level))}
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
        >
          <Layers3 className="h-4 w-4" />
          Review {level} grammar
        </button>
      </SectionHeader>

      <div className="mb-5">
        <LevelTabs value={level} onChange={setLevel} />
      </div>

      {loading ? (
        <GrammarSkeleton />
      ) : items.length === 0 ? (
        <EmptyState icon={Languages} title="No grammar points" />
      ) : (
        <div className="space-y-4">
          {items.map((g) => (
            <GrammarCard
              key={g.id}
              g={g}
              added={added.has(g.id)}
              open={open === g.id}
              onToggle={() => setOpen(open === g.id ? null : g.id)}
              onAdd={() => addToDeck(g)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function GrammarCard({
  g,
  added,
  open,
  onToggle,
  onAdd,
}: {
  g: Grammar;
  added: boolean;
  open: boolean;
  onToggle: () => void;
  onAdd: () => void;
}) {
  const examples = g.examples ?? [];
  const exercises = g.exercises ?? [];
  const hasConjugation = g.conjugation && g.conjugation.trim().length > 0;

  return (
    <div className={cn("rounded-xl border border-border bg-card overflow-hidden transition", open && "ring-1 ring-primary/30")}>
      {/* Header */}
      <button onClick={onToggle} className="w-full text-left p-4 sm:p-5 flex items-start gap-3">
        <LevelBadge level={g.level} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <h3 className="font-jp font-semibold text-base sm:text-lg leading-tight">{g.title}</h3>
            {g.chapter && (
              <span className="text-[11px] text-muted-foreground">{g.chapter}</span>
            )}
            {g.commonMistake && (
              <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-rose-600 dark:text-rose-400">
                <AlertCircle className="h-3 w-3" />
                common mistake
              </span>
            )}
            {exercises.length > 0 && (
              <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-primary">
                <PencilLine className="h-3 w-3" />
                {exercises.length} exercises
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{g.meaning}</p>
          <code className="mt-2 inline-block rounded bg-muted px-2 py-1 text-xs font-mono text-foreground/80">
            {g.structure}
          </code>
        </div>
        <ChevronDown className={cn("h-5 w-5 text-muted-foreground transition-transform shrink-0 mt-1", open && "rotate-180")} />
      </button>

      {/* Expanded body */}
      {open && (
        <div className="px-4 sm:px-5 pb-5 -mt-1 np-fade-in space-y-5">
          {/* Rule */}
          {g.rule && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-primary mb-1.5">Rule</h4>
              <p className="text-sm leading-relaxed text-foreground/90 whitespace-pre-line">{g.rule}</p>
            </div>
          )}

          {/* Conjugation */}
          {hasConjugation && (
            <div className="rounded-lg bg-sky-50 dark:bg-sky-950/30 p-3">
              <h4 className="text-xs font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-300 mb-1.5 flex items-center gap-1">
                <Layers3 className="h-3 w-3" />
                Conjugation
              </h4>
              <p className="text-sm leading-relaxed text-foreground/90 whitespace-pre-line">{g.conjugation}</p>
            </div>
          )}

          {/* Usage */}
          {g.usage && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-primary mb-1.5">When & how to use it</h4>
              <p className="text-sm leading-relaxed text-foreground/90 whitespace-pre-line">{g.usage}</p>
            </div>
          )}

          {/* Examples */}
          {examples.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-primary mb-2">Examples ({examples.length}, easy → hard)</h4>
              <div className="space-y-2.5">
                {examples.map((ex, i) => (
                  <ExampleRow key={i} ex={ex} />
                ))}
              </div>
            </div>
          )}

          {/* Common mistake */}
          {g.commonMistake && (
            <div className="flex items-start gap-2 rounded-lg bg-rose-50 dark:bg-rose-950/30 p-3">
              <AlertCircle className="h-4 w-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-rose-700 dark:text-rose-300 mb-0.5 text-sm">Common mistake</p>
                <p className="text-sm text-rose-900 dark:text-rose-200 whitespace-pre-line">{g.commonMistake}</p>
              </div>
            </div>
          )}

          {/* Exercises */}
          {exercises.length > 0 && (
            <ExerciseList grammarId={g.id} exercises={exercises} />
          )}

          {/* Add to deck */}
          <div className="flex justify-end pt-1">
            <button
              onClick={onAdd}
              disabled={added}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition",
                added
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                  : "bg-muted text-foreground hover:bg-accent"
              )}
            >
              {added ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
              {added ? "In deck" : "Add to deck"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ExampleRow({ ex }: { ex: Example }) {
  const diffColor =
    ex.difficulty === "easy"
      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
      : ex.difficulty === "medium"
      ? "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
      : "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300";
  return (
    <div className="rounded-lg bg-muted/50 p-3">
      <div className="flex items-start gap-2">
        <span className={cn("rounded px-1.5 py-0.5 text-[9px] font-semibold uppercase shrink-0 mt-0.5", diffColor)}>
          {ex.difficulty}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2">
            <Furigana text={ex.jp} className="text-sm leading-snug flex-1" />
            <button
              onClick={() => speakJapanese(ex.jp)}
              className="text-muted-foreground hover:text-primary transition shrink-0"
              title="Pronounce"
            >
              <Volume2 className="h-4 w-4" />
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-1">{ex.en}</p>
          {ex.note && <p className="text-[11px] text-primary mt-1 italic">💡 {ex.note}</p>}
        </div>
      </div>
    </div>
  );
}

function ExerciseList({ grammarId, exercises }: { grammarId: string; exercises: Exercise[] }) {
  const [answers, setAnswers] = React.useState<Record<number, string>>({});
  const [results, setResults] = React.useState<Record<number, "correct" | "wrong" | null>>({});

  function check(idx: number) {
    const ans = answers[idx]?.trim();
    if (!ans) return;
    const correct = ans === exercises[idx].answer || (exercises[idx].type === "multiple-choice" && ans === exercises[idx].answer);
    setResults((r) => ({ ...r, [idx]: correct ? "correct" : "wrong" }));
  }

  function reset() {
    setAnswers({});
    setResults({});
  }

  const correctCount = Object.values(results).filter((r) => r === "correct").length;

  return (
    <div className="rounded-lg border border-primary/20 bg-primary/5 p-3.5">
      <div className="flex items-center justify-between mb-2.5">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-primary flex items-center gap-1">
          <PencilLine className="h-3 w-3" />
          Practice ({exercises.length})
        </h4>
        {Object.keys(results).length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {correctCount}/{Object.keys(results).length} correct
            </span>
            <button onClick={reset} className="text-xs text-primary hover:underline flex items-center gap-0.5">
              <RefreshCw className="h-3 w-3" />
              Reset
            </button>
          </div>
        )}
      </div>
      <div className="space-y-3">
        {exercises.map((ex, i) => (
          <ExerciseRow
            key={i}
            ex={ex}
            index={i}
            value={answers[i] ?? ""}
            result={results[i] ?? null}
            onChange={(v) => setAnswers((a) => ({ ...a, [i]: v }))}
            onCheck={() => check(i)}
          />
        ))}
      </div>
    </div>
  );
}

function ExerciseRow({
  ex,
  index,
  value,
  result,
  onChange,
  onCheck,
}: {
  ex: Exercise;
  index: number;
  value: string;
  result: "correct" | "wrong" | null;
  onChange: (v: string) => void;
  onCheck: () => void;
}) {
  return (
    <div>
      <div className="text-sm leading-snug mb-1.5">
        <span className="text-muted-foreground mr-1">{index + 1}.</span>
        {ex.question}
      </div>
      {ex.hint && <p className="text-[11px] text-muted-foreground mb-1.5">💡 {ex.hint}</p>}
      <div className="flex gap-1.5">
        {ex.type === "multiple-choice" && ex.options ? (
          <div className="flex flex-wrap gap-1.5 w-full">
            {ex.options.map((opt) => {
              const selected = value === opt;
              const state = result === null ? (selected ? "selected" : "idle") : opt === ex.answer ? "correct" : selected ? "wrong" : "dim";
              return (
                <button
                  key={opt}
                  onClick={() => {
                    onChange(opt);
                    setTimeout(onCheck, 50);
                  }}
                  disabled={result !== null}
                  className={cn(
                    "rounded-lg border px-3 py-1.5 text-xs font-medium transition",
                    state === "idle" && "border-border bg-background hover:bg-accent",
                    state === "selected" && "border-primary bg-primary/10 text-primary",
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
        ) : (
          <>
            <input
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") onCheck(); }}
              disabled={result === "correct"}
              className={cn(
                "flex-1 rounded-lg border bg-background px-3 py-1.5 text-sm font-jp outline-none focus:ring-2 focus:ring-primary/30",
                result === "correct" && "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30",
                result === "wrong" && "border-rose-500 bg-rose-50 dark:bg-rose-950/30",
                result === null && "border-border"
              )}
              placeholder="答えを入力…"
            />
            <button
              onClick={onCheck}
              disabled={result === "correct" || !value.trim()}
              className="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50 transition"
            >
              Check
            </button>
          </>
        )}
      </div>
      {result === "correct" && (
        <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3" /> 正解! (correct)
        </p>
      )}
      {result === "wrong" && (
        <p className="mt-1 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1">
          <X className="h-3 w-3" /> 答え: <span className="font-jp">{ex.answer}</span>
        </p>
      )}
    </div>
  );
}

function GrammarSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-24 rounded-xl bg-muted animate-pulse" />
      ))}
    </div>
  );
}
