"use client";

import * as React from "react";
import {
  cn,
  Headphones,
  BookOpen,
  Volume2,
  Play,
  RotateCcw,
  CheckCircle2,
  X,
  ArrowLeft,
  Clock,
  Trophy,
  Sparkles,
  Lightbulb,
  Gauge,
} from "@/components/app/imports";
import { SectionHeader, LevelTabs, LevelBadge, EmptyState } from "./_primitives";
import { speakJapanese } from "@/lib/sections/shared";
import { Furigana } from "@/components/app/furigana";
import { useApp } from "@/lib/store";

type PassageListItem = {
  id: string;
  type: "listening" | "reading";
  level: string;
  lesson: number | null;
  title: string;
  difficulty: string;
  durationSec: number | null;
  questionCount: number;
  best: { score: number; total: number; attempts: number } | null;
};

type PassageQuestion = {
  question: string;
  questionVi?: string;
  options: string[];
  answer: string;
  explanation?: string;
};

type PassageDetail = {
  id: string;
  type: "listening" | "reading";
  level: string;
  title: string;
  jp: string;
  reading: string;
  en: string;
  vi: string | null;
  audioText: string | null;
  durationSec: number | null;
  difficulty: string;
  questionsParsed: PassageQuestion[];
};

const DIFFICULTY_BADGE: Record<string, string> = {
  easy: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
  medium: "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
  hard: "bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300",
};

export function PracticeSection() {
  const [passages, setPassages] = React.useState<PassageListItem[] | null>(null);
  const [typeFilter, setTypeFilter] = React.useState<"all" | "listening" | "reading">("all");
  const [levelFilter, setLevelFilter] = React.useState("all");
  const [active, setActive] = React.useState<PassageDetail | null>(null);

  const load = React.useCallback(() => {
    fetch("/api/practice")
      .then((r) => r.json())
      .then((d) => setPassages(d.passages ?? []))
      .catch(() => setPassages([]));
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  const openPassage = (id: string) => {
    fetch(`/api/practice?id=${id}`)
      .then((r) => r.json())
      .then((d) => setActive(d.passage ?? null))
      .catch(() => {});
  };

  if (active) {
    return (
      <PassagePlayer
        passage={active}
        onExit={() => {
          setActive(null);
          load();
        }}
      />
    );
  }

  const filtered = (passages ?? []).filter(
    (p) => (typeFilter === "all" || p.type === typeFilter) && (levelFilter === "all" || p.level === levelFilter),
  );

  return (
    <div>
      <SectionHeader
        eyebrow="Comprehensible input"
        title="Listening & Reading Dojo"
        jp="聴読道場"
        description="Graded audio passages and texts with comprehension questions — the fastest researched path to natural Japanese. Listen first, read after, check understanding instantly."
      >
        <LevelTabs value={levelFilter} onChange={setLevelFilter} includeAll />
      </SectionHeader>

      {/* Type filter */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {(["all", "listening", "reading"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTypeFilter(t)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition",
              typeFilter === t
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-accent",
            )}
          >
            {t === "listening" && <Headphones className="h-4 w-4" />}
            {t === "reading" && <BookOpen className="h-4 w-4" />}
            {t === "all" ? "All practice" : t === "listening" ? "Listening 聴解" : "Reading 読解"}
          </button>
        ))}
        <span className="ml-auto text-sm text-muted-foreground">{filtered.length} passages</span>
      </div>

      {passages === null ? (
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-5 h-36 animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={Headphones}
          title="No passages for this filter"
          description="Try a different level or type — the library spans N5 through N1."
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((p) => (
            <button
              key={p.id}
              onClick={() => openPassage(p.id)}
              className="group text-left rounded-xl border border-border bg-card p-5 hover:border-primary/40 hover:shadow-sm transition"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "grid h-9 w-9 place-items-center rounded-lg",
                      p.type === "listening"
                        ? "bg-sky-100 text-sky-600 dark:bg-sky-950/50 dark:text-sky-300"
                        : "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-300",
                    )}
                  >
                    {p.type === "listening" ? <Headphones className="h-4 w-4" /> : <BookOpen className="h-4 w-4" />}
                  </span>
                  <div>
                    <h3 className="font-semibold leading-tight">{p.title}</h3>
                    <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                      <LevelBadge level={p.level} />
                      <span
                        className={cn(
                          "rounded-full px-1.5 py-0.5 font-semibold uppercase",
                          DIFFICULTY_BADGE[p.difficulty] ?? DIFFICULTY_BADGE.medium,
                        )}
                      >
                        {p.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
                {p.durationSec != null && (
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    {p.durationSec}s
                  </span>
                )}
              </div>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{p.questionCount} questions</span>
                {p.best ? (
                  <span
                    className={cn(
                      "font-medium",
                      p.best.score === p.best.total ? "text-emerald-600 dark:text-emerald-300" : "text-amber-600 dark:text-amber-300",
                    )}
                  >
                    Best: {p.best.score}/{p.best.total}
                    {p.best.score === p.best.total && " ★"}
                  </span>
                ) : (
                  <span className="text-primary font-medium group-hover:underline">Start ▸</span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function PassagePlayer({ passage, onExit }: { passage: PassageDetail; onExit: () => void }) {
  const ttsRate = useApp((s) => s.ttsRate);
  const showVietnamese = useApp((s) => s.showVietnamese);
  const [speed, setSpeed] = React.useState(ttsRate);
  const [playCount, setPlayCount] = React.useState(0);
  const [showTranscript, setShowTranscript] = React.useState(passage.type === "reading");
  const [showTranslation, setShowTranslation] = React.useState(false);
  const [answers, setAnswers] = React.useState<Record<number, string>>({});
  const [checked, setChecked] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [xpGain, setXpGain] = React.useState<number | null>(null);

  const questions = passage.questionsParsed ?? [];
  const correctCount = questions.filter((q, i) => answers[i] === q.answer).length;

  const play = () => {
    speakJapanese(passage.audioText ?? passage.jp, speed);
    setPlayCount((c) => c + 1);
  };

  const check = async () => {
    setChecked(true);
    setSubmitting(true);
    try {
      const r = await fetch("/api/practice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passageId: passage.id, score: correctCount, total: questions.length }),
      });
      const d = await r.json();
      setXpGain(d.xpGain ?? 0);
    } catch {
      setXpGain(0);
    } finally {
      setSubmitting(false);
    }
  };

  const retry = () => {
    setAnswers({});
    setChecked(false);
    setXpGain(null);
    setShowTranscript(passage.type === "reading");
    setShowTranslation(false);
    setPlayCount(0);
  };

  return (
    <div>
      <button
        onClick={onExit}
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to passages
      </button>

      <div className="rounded-2xl border border-border bg-card p-5 sm:p-8 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <LevelBadge level={passage.level} />
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase",
                  DIFFICULTY_BADGE[passage.difficulty] ?? DIFFICULTY_BADGE.medium,
                )}
              >
                {passage.difficulty}
              </span>
            </div>
            <h1 className="text-2xl font-bold">{passage.title}</h1>
          </div>
          {passage.type === "listening" ? (
            <span className="flex items-center gap-1.5 text-sm text-sky-600 dark:text-sky-300">
              <Headphones className="h-4 w-4" /> Listening mode
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-sm text-emerald-600 dark:text-emerald-300">
              <BookOpen className="h-4 w-4" /> Reading mode
            </span>
          )}
        </div>

        {passage.type === "listening" ? (
          <div className="rounded-xl bg-gradient-to-br from-sky-50 to-indigo-50 dark:from-sky-950/30 dark:to-indigo-950/30 border border-sky-200/50 dark:border-sky-800/40 p-6 text-center">
            <button
              onClick={play}
              className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-sky-600 text-white shadow-lg hover:scale-105 active:scale-95 transition"
              aria-label="Play audio"
            >
              <Play className="h-7 w-7" />
            </button>
            <div className="mt-3 text-sm text-muted-foreground">
              Played {playCount} {playCount === 1 ? "time" : "times"} — listen as many times as you need
            </div>
            <div className="mt-3 flex items-center justify-center gap-1.5">
              <Gauge className="h-3.5 w-3.5 text-muted-foreground" />
              {[
                { v: 0.7, label: "Slow" },
                { v: 0.9, label: "Normal" },
                { v: 1.0, label: "Native" },
              ].map((s) => (
                <button
                  key={s.v}
                  onClick={() => setSpeed(s.v)}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-medium transition",
                    speed === s.v ? "bg-sky-600 text-white" : "bg-white/70 dark:bg-slate-800 text-muted-foreground hover:text-foreground",
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowTranscript(!showTranscript)}
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-sky-200 dark:border-sky-800 bg-white/60 dark:bg-slate-800/60 px-3.5 py-2 text-sm font-medium hover:bg-white dark:hover:bg-slate-800 transition"
            >
              {showTranscript ? "Hide transcript" : "Reveal transcript"}
            </button>
          </div>
        ) : null}

        {(showTranscript || passage.type === "reading") && (
          <div className="mt-6">
            <Furigana
              text={passage.jp}
              reading={passage.reading}
              className="font-jp text-xl sm:text-2xl leading-relaxed tracking-wide"
            />
            <button
              onClick={() => setShowTranslation(!showTranslation)}
              className="mt-4 text-sm text-primary hover:underline"
            >
              {showTranslation ? "Hide translation" : "Show translation"}
            </button>
            {showTranslation && (
              <div className="mt-3 space-y-2 text-sm text-muted-foreground border-l-2 border-primary/30 pl-4">
                {passage.en && <p>{passage.en}</p>}
                {showVietnamese && passage.vi && <p className="italic">{passage.vi}</p>}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Questions */}
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-8">
        <h2 className="text-lg font-semibold flex items-center gap-2 mb-5">
          <Sparkles className="h-4 w-4 text-primary" />
          Comprehension questions
        </h2>
        <div className="space-y-6">
          {questions.map((q, qi) => {
            const picked = answers[qi];
            return (
              <div key={qi} className="rounded-xl border border-border p-4 sm:p-5">
                <p className="font-medium mb-1">
                  {qi + 1}. {q.question}
                </p>
                {showVietnamese && q.questionVi && (
                  <p className="text-xs text-muted-foreground italic mb-2">{q.questionVi}</p>
                )}
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {q.options.map((opt) => {
                    const isPicked = picked === opt;
                    const isCorrect = opt === q.answer;
                    let cls = "border-border bg-background hover:bg-accent hover:border-primary/40";
                    if (checked && isCorrect) cls = "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300";
                    else if (checked && isPicked && !isCorrect) cls = "border-rose-400 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300";
                    else if (!checked && isPicked) cls = "border-primary bg-primary/5";
                    return (
                      <button
                        key={opt}
                        disabled={checked}
                        onClick={() => setAnswers((a) => ({ ...a, [qi]: opt }))}
                        className={cn(
                          "flex items-center justify-between gap-2 rounded-lg border px-3.5 py-2.5 text-sm text-left transition",
                          cls,
                        )}
                      >
                        <span>{opt}</span>
                        {checked && isCorrect && <CheckCircle2 className="h-4 w-4 shrink-0" />}
                        {checked && isPicked && !isCorrect && <X className="h-4 w-4 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
                {checked && q.explanation && (
                  <div className="mt-3 flex items-start gap-2 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/40 p-3 text-sm">
                    <Lightbulb className="h-4 w-4 text-amber-600 dark:text-amber-300 shrink-0 mt-0.5" />
                    <span>{q.explanation}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {!checked ? (
            <button
              onClick={check}
              disabled={Object.keys(answers).length < questions.length || submitting}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Check answers ({Object.keys(answers).length}/{questions.length})
            </button>
          ) : (
            <>
              <div
                className={cn(
                  "inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold",
                  correctCount === questions.length
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
                    : "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
                )}
              >
                <Trophy className="h-4 w-4" />
                Score: {correctCount}/{questions.length}
                {xpGain != null && xpGain > 0 && <span className="ml-1">· +{xpGain} XP</span>}
              </div>
              <button
                onClick={retry}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium hover:bg-accent transition"
              >
                <RotateCcw className="h-4 w-4" />
                Try again
              </button>
            </>
          )}
          {passage.type === "listening" && (
            <button
              onClick={play}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium hover:bg-accent transition"
            >
              <Volume2 className="h-4 w-4" />
              Replay audio
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
