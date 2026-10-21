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
  Keyboard,
} from "@/components/app/imports";
import { SectionHeader, LevelTabs } from "./_primitives";
import { speakJapanese } from "@/lib/sections/shared";
import { matchesReading } from "@/lib/romaji";
import { useApp } from "@/lib/store";

type Question = {
  id: string;
  prompt: string;
  subPrompt?: string;
  questionType: string;
  answer: string;
  options: string[];
  speak?: string;
  level?: string;
  vi?: string | null;
  word?: string;
  reading?: string;
};

type CardType = "vocabulary" | "kana" | "kanji" | "grammar";
type QuizMode = "mcq" | "typing";

const TYPE_META: Record<CardType, { label: string; jp: string }> = {
  vocabulary: { label: "Vocabulary", jp: "単語" },
  kana: { label: "Kana", jp: "仮名" },
  kanji: { label: "Kanji", jp: "漢字" },
  grammar: { label: "Grammar", jp: "文法" },
};

export function QuizSection() {
  const showVietnamese = useApp((s) => s.showVietnamese);
  const [type, setType] = React.useState<CardType>("vocabulary");
  const [level, setLevel] = React.useState("N5");
  const [mode, setMode] = React.useState<QuizMode>("mcq");
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [idx, setIdx] = React.useState(0);
  const [picked, setPicked] = React.useState<string | null>(null);
  const [typed, setTyped] = React.useState("");
  const [typedResult, setTypedResult] = React.useState<null | boolean>(null);
  const [score, setScore] = React.useState({ correct: 0, wrong: 0 });
  const [done, setDone] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [wrongAnswers, setWrongAnswers] = React.useState<Question[]>([]);

  const typingSupported = type === "vocabulary" || type === "kana";

  async function start() {
    setLoading(true);
    setIdx(0);
    setPicked(null);
    setTyped("");
    setTypedResult(null);
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

  function awardXp(correct: boolean) {
    if (!correct) return;
    fetch("/api/stats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: "xp", delta: 3 }),
    }).catch(() => {});
  }

  function advance() {
    setTimeout(() => {
      if (idx + 1 >= questions.length) setDone(true);
      else {
        setIdx((i) => i + 1);
        setPicked(null);
        setTyped("");
        setTypedResult(null);
      }
    }, 1250);
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
    awardXp(correct);
    if (current.speak) speakJapanese(current.speak);
    advance();
  }

  function submitTyped() {
    if (typedResult !== null || !typed.trim()) return;
    const current = questions[idx];
    let correct: boolean;
    if (type === "vocabulary") {
      // target: the reading of the word (romaji or kana input accepted)
      correct = matchesReading(typed, current.reading ?? current.subPrompt ?? "");
    } else {
      // kana: target is the romaji
      correct = typed.trim().toLowerCase() === current.answer.trim().toLowerCase();
    }
    setTypedResult(correct);
    if (correct) setScore((s) => ({ ...s, correct: s.correct + 1 }));
    else {
      setScore((s) => ({ ...s, wrong: s.wrong + 1 }));
      setWrongAnswers((w) => [...w, current]);
    }
    awardXp(correct);
    if (current.speak) speakJapanese(current.speak);
    advance();
  }

  const current = questions[idx];
  const started = questions.length > 0;
  // In typing mode for vocabulary we show the meaning and ask for the reading
  const typingPrompt =
    mode === "typing" && type === "vocabulary"
      ? { main: current?.answer ?? "", sub: showVietnamese && current?.vi ? current.vi : undefined, target: current?.reading ?? current?.subPrompt ?? "" }
      : mode === "typing" && type === "kana"
        ? { main: current?.prompt ?? "", sub: "Type its romaji", target: current?.answer ?? "" }
        : null;

  return (
    <div>
      <SectionHeader
        eyebrow="Test yourself"
        title="Quiz"
        jp="クイズ"
        description="JLPT-style quizzes with two modes: multiple choice for speed, or typing mode for active production — recalling and typing the reading is proven to strengthen memory far more than recognition alone."
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
                    onClick={() => {
                      setType(t);
                      if (!(t === "vocabulary" || t === "kana")) setMode("mcq");
                    }}
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
            {typingSupported && (
              <div>
                <div className="text-sm font-medium mb-2">Mode</div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setMode("mcq")}
                    className={cn(
                      "rounded-lg border p-3 text-sm font-medium transition text-left",
                      mode === "mcq" ? "border-primary bg-primary/5 ring-1 ring-primary/30" : "border-border hover:bg-accent"
                    )}
                  >
                    <div className="flex items-center gap-1.5">
                      <ListChecks className="h-4 w-4" /> Multiple choice
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Fast recognition practice</div>
                  </button>
                  <button
                    onClick={() => setMode("typing")}
                    className={cn(
                      "rounded-lg border p-3 text-sm font-medium transition text-left",
                      mode === "typing" ? "border-primary bg-primary/5 ring-1 ring-primary/30" : "border-border hover:bg-accent"
                    )}
                  >
                    <div className="flex items-center gap-1.5">
                      <Keyboard className="h-4 w-4" /> Type the answer
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Active recall — type the reading in romaji</div>
                  </button>
                </div>
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

      {/* Active quiz — multiple choice */}
      {started && !done && current && mode === "mcq" && (
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

      {/* Active quiz — typing mode */}
      {started && !done && current && mode === "typing" && typingPrompt && (
        <div className="max-w-2xl mx-auto">
          <div className="mb-4 flex items-center justify-between text-sm">
            <span className="font-medium flex items-center gap-1.5">
              <Keyboard className="h-4 w-4" />
              {TYPE_META[type].label} · typing · {type === "kana" ? "All" : level}
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
            {typingPrompt.sub && (
              <div className="text-sm text-muted-foreground mb-2 italic">{typingPrompt.sub}</div>
            )}
            {type === "vocabulary" ? (
              <div className="text-2xl font-semibold">{typingPrompt.main}</div>
            ) : (
              <div className="font-jp text-7xl font-medium leading-none">{typingPrompt.main}</div>
            )}
            {type === "vocabulary" && (
              <div className="mt-2 text-xs uppercase tracking-wide text-muted-foreground">
                Type the Japanese reading (romaji or kana)
              </div>
            )}
          </div>

          <div className="mt-4 flex gap-2">
            <input
              autoFocus
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") submitTyped();
              }}
              disabled={typedResult !== null}
              placeholder={type === "vocabulary" ? "e.g. ringo or りんご" : "e.g. ka"}
              className={cn(
                "flex-1 rounded-xl border bg-background px-4 py-3.5 font-jp text-lg outline-none transition",
                typedResult === null && "border-border focus:border-primary focus:ring-2 focus:ring-primary/20",
                typedResult === true && "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40",
                typedResult === false && "border-rose-500 bg-rose-50 dark:bg-rose-950/40",
              )}
            />
            <button
              onClick={submitTyped}
              disabled={typedResult !== null || !typed.trim()}
              className="rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition disabled:opacity-40"
            >
              Check
            </button>
          </div>

          {typedResult !== null && (
            <div
              className={cn(
                "mt-4 rounded-xl border p-4 flex items-center gap-3",
                typedResult
                  ? "border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/40"
                  : "border-rose-300 bg-rose-50 dark:border-rose-800 dark:bg-rose-950/40"
              )}
            >
              {typedResult ? (
                <Check className="h-5 w-5 text-emerald-600 dark:text-emerald-300 shrink-0" />
              ) : (
                <X className="h-5 w-5 text-rose-600 dark:text-rose-300 shrink-0" />
              )}
              <div className="text-sm">
                <span className="font-jp text-base font-medium">{type === "vocabulary" ? current.word : current.prompt}</span>
                <span className="mx-2 text-border">·</span>
                <span className="text-muted-foreground">{typingPrompt.target}</span>
                {current.speak && (
                  <button
                    onClick={() => speakJapanese(current.speak!)}
                    className="ml-2 text-muted-foreground hover:text-primary transition"
                    title="Pronounce"
                  >
                    <Volume2 className="h-4 w-4 inline" />
                  </button>
                )}
              </div>
            </div>
          )}
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
          <p className="mt-1 text-xs text-muted-foreground">+{score.correct * 3} XP earned</p>

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
