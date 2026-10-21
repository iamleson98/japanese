"use client";

import * as React from "react";
import {
  cn,
  Trophy,
  Timer,
  Volume2,
  CheckCircle2,
  X,
  ArrowLeft,
  ArrowRight,
  Flag,
  RotateCcw,
  Newspaper,
  Headphones,
  BookOpen,
  Sparkles,
} from "@/components/app/imports";
import { SectionHeader, LevelTabs } from "./_primitives";
import { speakJapanese } from "@/lib/sections/shared";
import { Furigana } from "@/components/app/furigana";
import { useApp } from "@/lib/store";

type McqQuestion = {
  key: string;
  section: "vocab" | "grammarReading" | "listening";
  prompt: string;
  subPrompt?: string;
  options: string[];
  answer: string;
  explanation?: string;
  speak?: string;
  passageId?: string;
};

type TestData = {
  level: string;
  mode: "full" | "quick";
  sections: {
    vocab: McqQuestion[];
    grammarReading: McqQuestion[];
    listening: McqQuestion[];
  };
  readings: { id: string; title: string; jp: string; reading: string; en: string; level: string }[];
  listenings: { id: string; title: string; audioText: string; level: string; durationSec: number | null }[];
  timeLimits: { vocab: number; grammarReading: number; listening: number };
  passRules: { total: number; section: number; maxTotal: number; maxSection: number };
};

type RecentResult = {
  id: string;
  level: string;
  mode: string;
  totalScore: number;
  vocabScore: number;
  grammarReadingScore: number;
  listeningScore: number;
  passed: boolean;
  createdAt: string;
};

type ResultData = {
  scores: {
    vocab: { correct: number; total: number; score: number };
    grammarReading: { correct: number; total: number; score: number };
    listening: { correct: number; total: number; score: number };
    totalScore: number;
  };
  passed: boolean;
  xpGain: number;
  recent: RecentResult[];
};

const SECTION_META = {
  vocab: { label: "Vocabulary", jp: "文字・語彙", icon: BookOpen },
  grammarReading: { label: "Grammar & Reading", jp: "文法・読解", icon: Newspaper },
  listening: { label: "Listening", jp: "聴解", icon: Headphones },
} as const;

type Phase = "config" | "test" | "result";

export function MockTestSection() {
  const [phase, setPhase] = React.useState<Phase>("config");
  const [level, setLevel] = React.useState("N5");
  const [mode, setMode] = React.useState<"full" | "quick">("quick");
  const [data, setData] = React.useState<TestData | null>(null);
  const [result, setResult] = React.useState<ResultData | null>(null);
  const [lastWrong, setLastWrong] = React.useState<
    { prompt: string; subPrompt?: string; yourAnswer?: string; answer: string }[]
  >([]);
  const [loading, setLoading] = React.useState(false);
  const [recent, setRecent] = React.useState<RecentResult[]>([]);

  const start = async () => {
    setLoading(true);
    try {
      const r = await fetch(`/api/mock-test?level=${level}&mode=${mode}`);
      const d = await r.json();
      setData(d);
      setResult(null);
      setPhase("test");
    } finally {
      setLoading(false);
    }
  };

  if (phase === "config") {
    return (
      <div>
        <SectionHeader
          eyebrow="Exam simulation"
          title="JLPT Mock Test"
          jp="模擬試験"
          description="A full 3-section timed exam built from your level's vocabulary, grammar, reading passages, and listening audio — scored with real JLPT rules: 60 points per section, 180 total, pass at 80 with at least 19 per section."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6">
            <h2 className="font-semibold mb-3">Choose your level</h2>
            <LevelTabs value={level} onChange={setLevel} />

            <h2 className="font-semibold mt-6 mb-3">Test length</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                onClick={() => setMode("quick")}
                className={cn(
                  "rounded-xl border p-4 text-left transition",
                  mode === "quick" ? "border-primary bg-primary/5" : "border-border hover:border-primary/40",
                )}
              >
                <div className="font-semibold">Quick drill</div>
                <div className="text-sm text-muted-foreground mt-1">
                  ~6 vocab · ~5 grammar + 1 reading · ~2 listening — about 30 min
                </div>
              </button>
              <button
                onClick={() => setMode("full")}
                className={cn(
                  "rounded-xl border p-4 text-left transition",
                  mode === "full" ? "border-primary bg-primary/5" : "border-border hover:border-primary/40",
                )}
              >
                <div className="font-semibold">Full exam</div>
                <div className="text-sm text-muted-foreground mt-1">
                  12 vocab · 8 grammar + 2 readings · 3 listening — about 60 min
                </div>
              </button>
            </div>

            <button
              onClick={start}
              disabled={loading}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-90 transition disabled:opacity-50"
            >
              <Trophy className="h-4 w-4" />
              {loading ? "Generating test…" : `Start ${level} mock test`}
            </button>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="font-semibold mb-3">Scoring rules (N5–N3)</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• 3 sections × 60 points = 180 total</li>
              <li>• Pass: ≥ 80/180 overall</li>
              <li>• AND ≥ 19/60 in every section</li>
              <li>• Listening plays via device audio</li>
              <li>• Timers per section, like the real exam</li>
            </ul>
            <p className="mt-4 text-xs text-muted-foreground">
              Tip: take a quick drill daily; a full exam weekly reveals your true exam readiness.
            </p>
          </div>
        </div>

        {recent.length > 0 && (
          <div className="mt-6 rounded-2xl border border-border bg-card p-6">
            <h2 className="font-semibold mb-3">Recent results</h2>
            <div className="space-y-2">
              {recent.map((r) => (
                <div key={r.id} className="flex items-center justify-between rounded-lg border border-border p-3 text-sm">
                  <span className="font-medium">{r.level} · {r.mode}</span>
                  <span className="tabular-nums">{r.totalScore}/180</span>
                  <span className={r.passed ? "text-emerald-600 dark:text-emerald-300 font-medium" : "text-rose-600 dark:text-rose-300 font-medium"}>
                    {r.passed ? "PASS" : "FAIL"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (phase === "test" && data) {
    return (
      <TestRunner
        data={data}
        onFinish={async (sections) => {
          setLastWrong(sections.wrong);
          const r = await fetch("/api/mock-test", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              level: data.level,
              mode: data.mode,
              vocab: sections.vocab,
              grammarReading: sections.grammarReading,
              listening: sections.listening,
              detail: JSON.stringify(sections.wrong),
            }),
          });
          const d = await r.json();
          setResult(d);
          setRecent(d.recent ?? []);
          setPhase("result");
        }}
        onAbort={() => setPhase("config")}
      />
    );
  }

  if (phase === "result" && result && data) {
    return (
      <ResultScreen
        result={result}
        recent={recent}
        level={data.level}
        wrongAnswers={lastWrong}
        onRetry={() => setPhase("config")}
      />
    );
  }

  return null;
}

// ---------------- Test runner ----------------

type WrongAnswer = { prompt: string; subPrompt?: string; yourAnswer?: string; answer: string };

type SectionAnswers = Record<string, string | undefined>;

function TestRunner({
  data,
  onFinish,
  onAbort,
}: {
  data: TestData;
  onFinish: (sections: {
    vocab: { correct: number; total: number };
    grammarReading: { correct: number; total: number };
    listening: { correct: number; total: number };
    wrong: WrongAnswer[];
  }) => void;
  onAbort: () => void;
}) {
  const ttsRate = useApp((s) => s.ttsRate);
  const [sectionIdx, setSectionIdx] = React.useState(0);
  const [qIdx, setQIdx] = React.useState(0);
  const [answers, setAnswers] = React.useState<SectionAnswers>({});
  const [timeLeft, setTimeLeft] = React.useState(data.timeLimits.vocab * 60);
  const [submitting, setSubmitting] = React.useState(false);

  const sectionKeys = ["vocab", "grammarReading", "listening"] as const;
  const sectionKey = sectionKeys[sectionIdx];
  const questions = data.sections[sectionKey];
  const meta = SECTION_META[sectionKey];
  const Icon = meta.icon;

  // per-section timer
  React.useEffect(() => {
    setTimeLeft(data.timeLimits[sectionKey] * 60);
    setQIdx(0);
  }, [sectionKey]);

  React.useEffect(() => {
    const t = setInterval(() => setTimeLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [sectionKey]);

  // listening: auto-play audio on question entry
  const q = questions[qIdx];
  React.useEffect(() => {
    if (sectionKey === "listening" && q?.speak) {
      speakJapanese(q.speak, ttsRate);
    }
  }, [qIdx, sectionKey]);

  const answeredInSection = questions.filter((qq) => answers[qq.key] != null).length;

  const finish = React.useCallback(() => {
    if (submitting) return;
    setSubmitting(true);
    const count = (key: "vocab" | "grammarReading" | "listening") => {
      const qs = data.sections[key];
      const correct = qs.filter((qq) => answers[qq.key] === qq.answer).length;
      return { correct, total: qs.length };
    };
    const wrong: WrongAnswer[] = [...data.sections.vocab, ...data.sections.grammarReading, ...data.sections.listening]
      .filter((qq) => answers[qq.key] !== undefined && answers[qq.key] !== qq.answer)
      .map((qq) => ({ prompt: qq.prompt, subPrompt: qq.subPrompt, yourAnswer: answers[qq.key], answer: qq.answer }));
    onFinish({
      vocab: count("vocab"),
      grammarReading: count("grammarReading"),
      listening: count("listening"),
      wrong,
    });
  }, [data, answers, submitting, onFinish]);

  // auto-advance section when time runs out
  React.useEffect(() => {
    if (timeLeft === 0 && !submitting) {
      if (sectionIdx < 2) setSectionIdx(sectionIdx + 1);
      else finish();
    }
  }, [timeLeft, sectionIdx, submitting, finish]);

  const mm = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const ss = String(timeLeft % 60).padStart(2, "0");
  const readingForQ = q?.passageId ? data.readings.find((r) => r.id === q.passageId) : undefined;
  const listeningTitleForQ = q?.passageId ? data.listenings.find((l) => l.id === q.passageId)?.title : undefined;

  return (
    <div>
      {/* Header row */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
            <Icon className="h-4 w-4" />
          </span>
          <div>
            <div className="font-semibold leading-tight">
              Section {sectionIdx + 1} of 3 · {meta.label}
            </div>
            <div className="font-jp text-xs text-muted-foreground">{meta.jp} · {data.level} {data.mode}</div>
          </div>
        </div>
        <div
          className={cn(
            "inline-flex items-center gap-1.5 rounded-lg px-3 py-2 font-semibold tabular-nums",
            timeLeft < 60 ? "bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300" : "bg-muted",
          )}
        >
          <Timer className="h-4 w-4" />
          {mm}:{ss}
        </div>
      </div>

      {/* progress pills */}
      <div className="np-scroll flex items-center gap-1.5 overflow-x-auto pb-2 mb-5">
        {questions.map((qq, i) => (
          <button
            key={qq.key}
            onClick={() => setQIdx(i)}
            className={cn(
              "h-7 w-7 shrink-0 rounded-full text-xs font-medium transition",
              i === qIdx
                ? "bg-primary text-primary-foreground shadow-sm scale-110"
                : answers[qq.key] != null
                  ? "bg-primary/25 text-primary"
                  : "bg-muted text-muted-foreground hover:bg-accent",
            )}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Reading passage (if the current question belongs to one) */}
      {readingForQ && (
        <div className="rounded-2xl border border-border bg-card p-5 mb-4">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
            Reading passage · {readingForQ.title}
          </div>
          <Furigana text={readingForQ.jp} reading={readingForQ.reading} className="font-jp text-lg leading-relaxed" />
          <p className="mt-3 text-sm text-muted-foreground">{readingForQ.en}</p>
        </div>
      )}

      {/* Question card */}
      {q && (
        <div className="rounded-2xl border border-border bg-card p-5 sm:p-8">
          {listeningTitleForQ && !readingForQ && (
            <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-sky-600 dark:text-sky-300">
              Audio · {listeningTitleForQ}
            </div>
          )}
          <p className="text-lg font-medium">{q.prompt}</p>
          {q.subPrompt && <p className="mt-1 text-sm text-muted-foreground">{q.subPrompt}</p>}

          {sectionKey === "listening" && (
            <button
              onClick={() => q.speak && speakJapanese(q.speak, ttsRate)}
              className="mt-4 inline-flex items-center gap-2 rounded-xl border border-sky-300 dark:border-sky-700 bg-sky-50 dark:bg-sky-950/40 px-4 py-2.5 text-sm font-medium text-sky-700 dark:text-sky-300 hover:bg-sky-100 dark:hover:bg-sky-900 transition"
            >
              <Volume2 className="h-4 w-4" />
              Replay audio
            </button>
          )}

          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            {q.options.map((opt) => {
              const picked = answers[q.key] === opt;
              return (
                <button
                  key={opt}
                  onClick={() => setAnswers((a) => ({ ...a, [q.key]: opt }))}
                  className={cn(
                    "rounded-lg border px-4 py-3 text-left text-sm transition",
                    picked
                      ? "border-primary bg-primary/5 font-medium"
                      : "border-border bg-background hover:bg-accent hover:border-primary/40",
                  )}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onAbort}
          className="text-sm text-muted-foreground hover:text-foreground transition"
        >
          Abandon test
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setQIdx(Math.max(0, qIdx - 1))}
            disabled={qIdx === 0}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium hover:bg-accent transition disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" /> Prev
          </button>
          {qIdx < questions.length - 1 ? (
            <button
              onClick={() => setQIdx(qIdx + 1)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
            >
              Next <ArrowRight className="h-4 w-4" />
            </button>
          ) : sectionIdx < 2 ? (
            <button
              onClick={() => setSectionIdx(sectionIdx + 1)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
            >
              Next section <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={finish}
              disabled={submitting}
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:opacity-90 transition disabled:opacity-50"
            >
              <Flag className="h-4 w-4" />
              {submitting ? "Scoring…" : "Finish exam"}
            </button>
          )}
        </div>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        {answeredInSection}/{questions.length} answered in this section — unanswered questions score 0.
      </p>
    </div>
  );
}

// ---------------- Result screen ----------------

function ResultScreen({
  result,
  recent,
  level,
  wrongAnswers,
  onRetry,
}: {
  result: ResultData;
  recent: RecentResult[];
  level: string;
  wrongAnswers: WrongAnswer[];
  onRetry: () => void;
}) {
  const { scores, passed } = result;
  const sections = [
    { key: "vocab", label: "文字・語彙 Vocabulary", ...scores.vocab },
    { key: "grammarReading", label: "文法・読解 Grammar & Reading", ...scores.grammarReading },
    { key: "listening", label: "聴解 Listening", ...scores.listening },
  ];

  return (
    <div>
      <div
        className={cn(
          "rounded-2xl border p-6 sm:p-8 mb-6 text-center",
          passed
            ? "border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/40"
            : "border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/40",
        )}
      >
        <div className="text-5xl font-bold tabular-nums">
          {scores.totalScore}
          <span className="text-xl text-muted-foreground font-medium">/180</span>
        </div>
        <div
          className={cn(
            "mt-2 inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-semibold",
            passed
              ? "bg-emerald-600 text-white"
              : "bg-amber-500 text-white",
          )}
        >
          <Trophy className="h-4 w-4" />
          {passed ? `Passed ${level}!` : "Not yet — keep training"}
        </div>
        {result.xpGain > 0 && (
          <div className="mt-2 text-sm text-muted-foreground">+{result.xpGain} XP earned</div>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        {sections.map((s) => (
          <div key={s.key} className="rounded-xl border border-border bg-card p-5">
            <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{s.label}</div>
            <div className="mt-2 text-3xl font-bold tabular-nums">
              {s.score}
              <span className="text-sm text-muted-foreground font-medium">/60</span>
            </div>
            <div className="mt-1 text-sm text-muted-foreground">
              {s.correct}/{s.total} correct
            </div>
            <div className="mt-3 h-2 rounded-full bg-muted overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full",
                  s.score >= 19 ? "bg-emerald-500" : "bg-amber-500",
                )}
                style={{ width: `${(s.score / 60) * 100}%` }}
              />
            </div>
            {s.score < 19 && (
              <div className="mt-2 text-xs text-amber-600 dark:text-amber-300">
                Below the 19-point section minimum
              </div>
            )}
          </div>
        ))}
      </div>

      {wrongAnswers.length > 0 && (
        <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 mb-6">
          <h2 className="font-semibold flex items-center gap-2 mb-4">
            <Sparkles className="h-4 w-4 text-primary" />
            Review your misses ({wrongAnswers.length})
          </h2>
          <div className="space-y-3">
            {wrongAnswers.map((w, i) => (
              <div key={i} className="rounded-lg border border-border p-4 text-sm">
                <div className="font-medium">{w.prompt}</div>
                {w.subPrompt && <div className="text-xs text-muted-foreground mt-0.5">{w.subPrompt}</div>}
                <div className="mt-2 flex items-center gap-2 text-rose-600 dark:text-rose-300">
                  <X className="h-3.5 w-3.5" /> {w.yourAnswer ?? "—"}
                </div>
                <div className="mt-1 flex items-center gap-2 text-emerald-600 dark:text-emerald-300">
                  <CheckCircle2 className="h-3.5 w-3.5" /> {w.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-90 transition"
        >
          <RotateCcw className="h-4 w-4" />
          New mock test
        </button>
      </div>

      {recent.length > 1 && (
        <div className="mt-6 rounded-2xl border border-border bg-card p-5 sm:p-6">
          <h2 className="font-semibold mb-3">History</h2>
          <div className="space-y-2">
            {recent.slice(0, 8).map((r) => (
              <div key={r.id} className="flex items-center justify-between rounded-lg border border-border p-3 text-sm">
                <span className="font-medium">
                  {r.level} · {r.mode} · {new Date(r.createdAt).toLocaleDateString()}
                </span>
                <span className="tabular-nums">{r.totalScore}/180</span>
                <span
                  className={cn(
                    "font-medium",
                    r.passed ? "text-emerald-600 dark:text-emerald-300" : "text-rose-600 dark:text-rose-300",
                  )}
                >
                  {r.passed ? "PASS" : "FAIL"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
