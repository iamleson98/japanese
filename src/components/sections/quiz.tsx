"use client";

import * as React from "react";
import {
  cn,
  Sparkles,
  Check,
  X,
  RefreshCw,
  Brain,
  Volume2,
  ListChecks,
} from "@/components/app/imports";
import { SectionHeader, LevelTabs } from "./_primitives";
import { speakJapanese } from "@/lib/sections/shared";

type Question = {
  id: string;
  prompt: string;
  subPrompt?: string;
  questionType: string;
  answer: string;
  options: string[];
  speak?: string;
  level?: string;
};

type CardType = "vocabulary" | "kana" | "kanji" | "grammar";

const TYPE_META: Record<CardType, { label: string; jp: string }> = {
  vocabulary: { label: "Vocabulary", jp: "単語" },
  kana: { label: "Kana", jp: "仮名" },
  kanji: { label: "Kanji", jp: "漢字" },
  grammar: { label: "Grammar", jp: "文法" },
};

export function QuizSection() {
  const [type, setType] = React.useState<CardType>("vocabulary");
  const [level, setLevel] = React.useState("N5");
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [idx, setIdx] = React.useState(0);
  const [picked, setPicked] = React.useState<string | null>(null);
  const [score, setScore] = React.useState({ correct: 0, wrong: 0 });
  const [done, setDone] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [wrongAnswers, setWrongAnswers] = React.useState<Question[]>([]);

  async function start() {
    setLoading(true);
    setIdx(0);
    setPicked(null);
    setScore({ correct: 0, wrong: 0 });
    setDone(false);
    setWrongAnswers([]);
    const levelParam = type === "kana" ? "" : `&level=${level}`;
    try {
      const r = await fetch(`/api/quiz?type=${type}${levelParam}&count=10`);
      const d = await r.json();
      setQuestions(d.questions ?? []);
    } catch {
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  }

  function answer(opt: string) {
    if (picked) return;
    setPicked(opt);
    const current = questions[idx];
    const correct = opt === current.answer;
    if (correct) setScore((s) => ({ ...s, correct: s.correct + 1 }));
    else {
      setScore((s) => ({ ...s, wrong: s.wrong + 1 }));
      setWrongAnswers((w) => [...w, current]);
    }
    if (current.speak) speakJapanese(current.speak);
    setTimeout(() => {
      if (idx + 1 >= questions.length) setDone(true);
      else {
        setIdx((i) => i + 1);
        setPicked(null);
      }
    }, 850);
  }

  const current = questions[idx];
  const started = questions.length > 0;

  return (
    <div>
      <SectionHeader
        eyebrow="Test yourself"
        title="Quiz"
        jp="クイズ"
        description="JLPT-style multiple-choice quizzes. Pick a content type and level, then answer 10 questions. Wrong answers are collected at the end so you can review them."
      />

      {!started && !loading && !done && (
        <div className="max-w-xl rounded-xl border border-border bg-card p-6">
          <div className="space-y-4">
            <div>
              <div className="text-sm font-medium mb-2">Content type</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(Object.keys(TYPE_META) as CardType[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setType(t)}
                    className={cn(
                      "rounded-lg border p-3 text-sm font-medium transition",
                      type === t
                        ? "border-primary bg-primary/5 ring-1 ring-primary/30"
                        : "border-border hover:bg-accent"
                    )}
                  >
                    <div>{TYPE_META[t].label}</div>
                    <div className="font-jp text-xs text-muted-foreground">{TYPE_META[t].jp}</div>
                  </button>
                ))}
              </div>
            </div>
            {type !== "kana" && (
              <div>
                <div className="text-sm font-medium mb-2">Level</div>
                <LevelTabs value={level} onChange={setLevel} />
              </div>
            )}
            <button
              onClick={start}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition"
            >
              <Sparkles className="h-4 w-4" />
              Start quiz
            </button>
          </div>
        </div>
      )}

      {loading && (
        <div className="text-center py-12 text-muted-foreground">
          <div className="animate-pulse">Loading questions…</div>
        </div>
      )}

      {/* Active quiz */}
      {started && !done && current && (
        <div className="max-w-2xl mx-auto">
          <div className="mb-4 flex items-center justify-between text-sm">
            <span className="font-medium">
              {TYPE_META[type].label} · {type === "kana" ? "All" : level}
            </span>
            <span className="text-muted-foreground tabular-nums">
              {idx + 1} / {questions.length} · ✓ {score.correct} ✗ {score.wrong}
            </span>
          </div>
          <div className="mb-2 h-1.5 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${(idx / questions.length) * 100}%` }}
            />
          </div>

          <div className="mt-6 rounded-2xl border border-border bg-card p-8 text-center">
            {current.subPrompt && (
              <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
                {current.subPrompt}
              </div>
            )}
            <div className="flex items-center justify-center gap-2">
              <div className="font-jp text-6xl font-medium leading-none">{current.prompt}</div>
              {current.speak && (
                <button
                  onClick={() => speakJapanese(current.speak!)}
                  className="text-muted-foreground hover:text-primary transition"
                  title="Pronounce"
                >
                  <Volume2 className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            {current.options.map((opt) => {
              const state =
                picked === null
                  ? "idle"
                  : opt === current.answer
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
                    "rounded-lg border px-4 py-3 text-sm font-medium transition text-left",
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
        </div>
      )}

      {/* Done screen */}
      {done && (
        <div className="max-w-xl mx-auto rounded-2xl border border-border bg-card p-8 text-center">
          <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-primary/10 text-primary">
            <Brain className="h-8 w-8" />
          </div>
          <div className="text-4xl font-bold tabular-nums">
            {score.correct}
            <span className="text-muted-foreground text-2xl"> / {questions.length}</span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {score.correct === questions.length
              ? "Perfect! 完璧！"
              : score.correct >= questions.length * 0.7
              ? "Great job! よくできました！"
              : "Keep practicing — 練習しましょう！"}
          </p>

          {wrongAnswers.length > 0 && (
            <div className="mt-6 text-left">
              <div className="text-sm font-medium mb-2 flex items-center gap-1.5">
                <ListChecks className="h-4 w-4" />
                Review your mistakes ({wrongAnswers.length})
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto np-scroll">
                {wrongAnswers.map((q, i) => (
                  <div key={i} className="rounded-lg bg-muted/50 p-3 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-jp text-base font-medium">{q.prompt}</span>
                      {q.speak && (
                        <button
                          onClick={() => speakJapanese(q.speak!)}
                          className="text-muted-foreground hover:text-primary"
                        >
                          <Volume2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                    <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                      ✓ {q.answer}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-center gap-2">
            <button
              onClick={start}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition"
            >
              <RefreshCw className="h-4 w-4" />
              Try again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
