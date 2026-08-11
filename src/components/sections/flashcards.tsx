"use client";

import * as React from "react";
import {
  cn,
  Layers3,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Volume2,
  Check,
  X,
  Brain,
  Target,
  Flame,
  BookOpen,
  Type,
  Languages,
  GraduationCap,
  Sparkles,
  Eye,
} from "@/components/app/imports";
import { SectionHeader, EmptyState } from "./_primitives";
import { speakJapanese } from "@/lib/sections/shared";
import { useApp } from "@/lib/store";

type CardType = "vocabulary" | "kana" | "kanji" | "grammar";

const TYPE_META: Record<
  CardType,
  { label: string; jp: string; icon: React.ElementType; desc: string }
> = {
  vocabulary: { label: "Vocabulary", jp: "単語", icon: BookOpen, desc: "Words & phrases" },
  kana: { label: "Kana", jp: "仮名", icon: Type, desc: "Hiragana & katakana" },
  kanji: { label: "Kanji", jp: "漢字", icon: GraduationCap, desc: "Characters & readings" },
  grammar: { label: "Grammar", jp: "文法", icon: Languages, desc: "Patterns & structures" },
};

type DueCard = {
  id: string;
  word?: string;
  reading?: string;
  meaning?: string;
  romaji?: string | null;
  level?: string;
  char?: string;
  character?: string;
  onyomi?: string;
  kunyomi?: string;
  exampleWord?: string | null;
  title?: string;
  structure?: string;
  explanation?: string;
  exampleJp?: string | null;
  exampleEn?: string | null;
  progress?: { box: number; reps: number; lapses: number } | null;
};

type Phase = "setup" | "review" | "done";

export function FlashcardsSection() {
  const storeType = useApp((s) => s.flashcardType);
  const storeLevel = useApp((s) => s.flashcardLevel);
  const setSection = useApp((s) => s.setSection);

  const [phase, setPhase] = React.useState<Phase>("setup");
  const [type, setType] = React.useState<CardType>(storeType);
  const [level, setLevel] = React.useState<string>(storeLevel ?? "N5");
  const [session, setSession] = React.useState<DueCard[]>([]);
  const [results, setResults] = React.useState<{ correct: number; wrong: number; total: number }>({
    correct: 0,
    wrong: 0,
    total: 0,
  });

  // Auto-start when arriving via startReview()
  const autoStarted = React.useRef(false);
  const startSession = React.useCallback(async (t: CardType, lvl: string) => {
    const levelParam = t === "kana" ? "" : `&level=${encodeURIComponent(lvl)}`;
    const url = `/api/flashcards?type=${t}${levelParam}&limit=20`;
    try {
      const r = await fetch(url);
      const d = await r.json();
      const due: DueCard[] = d.due ?? [];
      const fresh: DueCard[] = d.fresh ?? [];
      const all = [...due, ...fresh];
      if (all.length === 0) {
        setSession([]);
        setPhase("setup");
        return;
      }
      // Shuffle a bit
      const shuffled = [...all].sort(() => Math.random() - 0.5);
      setSession(shuffled);
      setResults({ correct: 0, wrong: 0, total: shuffled.length });
      setPhase("review");
      setType(t);
      setLevel(lvl);
    } catch {
      setPhase("setup");
    }
  }, []);

  React.useEffect(() => {
    if (!autoStarted.current && storeType && storeLevel) {
      autoStarted.current = true;
      setType(storeType as CardType);
      setLevel(storeLevel);
      // kick off a session
      startSession(storeType as CardType, storeLevel);
    }
  }, [storeType, storeLevel, startSession]);

  // If user navigates here directly (no auto-start), default to setup
  React.useEffect(() => {
    if (!autoStarted.current) {
      setPhase("setup");
    }
  }, []);

  function finish(correct: number, wrong: number) {
    setResults((r) => ({ ...r, correct, wrong }));
    setPhase("done");
  }

  const reset = React.useCallback(() => {
    setPhase("setup");
    setSession([]);
    autoStarted.current = false;
  }, []);

  if (phase === "review" && session.length > 0) {
    return (
      <ReviewSession
        type={type}
        level={level}
        cards={session}
        onFinish={finish}
        onExit={reset}
      />
    );
  }

  if (phase === "done") {
    return (
      <DoneScreen
        type={type}
        level={level}
        correct={results.correct}
        wrong={results.wrong}
        total={results.total}
        onRestart={() => startSession(type, level)}
        onBack={reset}
        onDashboard={() => setSection("dashboard")}
      />
    );
  }

  return (
    <SetupScreen
      type={type}
      level={level}
      setType={setType}
      setLevel={setLevel}
      onStart={() => startSession(type, level)}
      onResetProgress={async () => {
        try {
          await fetch("/api/flashcards", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "reset" }),
          });
        } catch {}
      }}
    />
  );
}

// ---------------- Setup ----------------
function SetupScreen({
  type,
  level,
  setType,
  setLevel,
  onStart,
  onResetProgress,
}: {
  type: CardType;
  level: string;
  setType: (t: CardType) => void;
  setLevel: (l: string) => void;
  onStart: () => void;
  onResetProgress: () => Promise<void>;
}) {
  return (
    <div>
      <SectionHeader
        eyebrow="Spaced repetition"
        title="Flashcards"
        jp="復習"
        description="Pick a deck and level, then review due cards and a few new ones. Mark how well you knew each card — the system schedules the next review automatically."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {(Object.keys(TYPE_META) as CardType[]).map((t) => {
          const meta = TYPE_META[t];
          const Icon = meta.icon;
          const active = type === t;
          return (
            <button
              key={t}
              onClick={() => setType(t)}
              className={cn(
                "text-left rounded-xl border bg-card p-4 transition",
                active
                  ? "border-primary ring-1 ring-primary/30"
                  : "border-border hover:border-primary/40"
              )}
            >
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    "grid h-9 w-9 place-items-center rounded-lg",
                    active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                </span>
                {active && <Check className="h-4 w-4 text-primary" />}
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <h3 className="font-semibold">{meta.label}</h3>
                <span className="font-jp text-sm text-muted-foreground">{meta.jp}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{meta.desc}</p>
            </button>
          );
        })}
      </div>

      {type !== "kana" && (
        <div className="mb-6">
          <div className="text-sm font-medium mb-2">Level</div>
          <div className="inline-flex items-center gap-1 rounded-lg bg-muted p-1">
            {["N5", "N4", "N3"].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setLevel(lvl)}
                className={cn(
                  "rounded-md px-4 py-1.5 text-sm font-medium transition",
                  level === lvl
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={onStart}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-90 transition"
        >
          <Sparkles className="h-4 w-4" />
          Start review session
        </button>
        <button
          onClick={onResetProgress}
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-accent transition"
        >
          <RotateCcw className="h-4 w-4" />
          Reset all progress
        </button>
      </div>

      <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-5">
        <h3 className="font-semibold flex items-center gap-2">
          <Brain className="h-4 w-4 text-primary" />
          How the review works
        </h3>
        <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
          <li>• <strong>Again</strong> — got it wrong, show it again this session (1-min reschedule).</li>
          <li>• <strong>Hard</strong> — barely got it, short interval increase.</li>
          <li>• <strong>Good</strong> — solid, normal interval growth.</li>
          <li>• <strong>Easy</strong> — trivial, longer interval.</li>
        </ul>
      </div>
    </div>
  );
}

// ---------------- Review ----------------
function ReviewSession({
  type,
  level,
  cards,
  onFinish,
  onExit,
}: {
  type: CardType;
  level: string;
  cards: DueCard[];
  onFinish: (correct: number, wrong: number) => void;
  onExit: () => void;
}) {
  const [queue, setQueue] = React.useState<DueCard[]>(cards);
  const [idx, setIdx] = React.useState(0);
  const [flipped, setFlipped] = React.useState(false);
  const [correct, setCorrect] = React.useState(0);
  const [wrong, setWrong] = React.useState(0);
  const [reviewing, setReviewing] = React.useState(false);

  const current = queue[idx];

  React.useEffect(() => {
    // speak front on new card (only for jp text)
    setFlipped(false);
    if (current) {
      const frontText = getFrontText(type, current);
      if (frontText && /[\u3040-\u30ff\u4e00-\u9fff]/.test(frontText)) {
        // slight delay so flip resets
        const t = setTimeout(() => speakJapanese(frontText), 120);
        return () => clearTimeout(t);
      }
    }
  }, [idx, type, current]);

  async function grade(quality: "again" | "hard" | "good" | "easy") {
    if (!current || reviewing) return;
    setReviewing(true);
    const isCorrect = quality !== "again";
    if (isCorrect) setCorrect((c) => c + 1);
    else setWrong((w) => w + 1);

    try {
      await fetch("/api/flashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "review",
          itemType: type,
          itemId: current.id,
          quality,
        }),
      });
    } catch {}

    // advance
    setTimeout(() => {
      if (quality === "again") {
        // push to end of queue
        setQueue((q) => {
          const rest = q.slice(0, idx).concat(q.slice(idx + 1));
          return [...rest, current];
        });
        // stay at same idx (which now holds the next card)
      } else {
        setIdx((i) => i + 1);
      }
      setReviewing(false);
    }, 220);
  }

  // Check if we've gone through everything
  const total = cards.length;
  const processed = correct + wrong;
  // If we've reviewed `total` cards AND there are no more "again" cards left to see
  React.useEffect(() => {
    if (queue.length > 0 && idx >= queue.length) {
      onFinish(correct, wrong);
    }
  }, [idx, queue.length, correct, wrong, onFinish]);

  if (idx >= queue.length) {
    return (
      <div className="text-center py-20">
        <div className="animate-pulse text-muted-foreground">Finishing up…</div>
      </div>
    );
  }

  const progress = Math.min(100, Math.round((idx / total) * 100));

  return (
    <div>
      {/* Top bar */}
      <div className="mb-5 flex items-center gap-3">
        <button
          onClick={onExit}
          className="grid h-9 w-9 place-items-center rounded-lg border border-border hover:bg-accent transition"
          title="Exit review"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="flex-1">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="font-medium">
              {TYPE_META[type].label} · {type === "kana" ? "All" : level}
            </span>
            <span className="text-muted-foreground tabular-nums">
              {idx + 1} / {total}
            </span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-sm">
          <span className="text-emerald-600 dark:text-emerald-400 font-medium">✓ {correct}</span>
          <span className="text-rose-600 dark:text-rose-400 font-medium">✗ {wrong}</span>
        </div>
      </div>

      {/* Card */}
      <div className="max-w-2xl mx-auto">
        <Flashcard type={type} card={current} flipped={flipped} onFlip={() => setFlipped((f) => !f)} />

        {!flipped ? (
          <div className="mt-6 text-center">
            <button
              onClick={() => setFlipped(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-90 transition"
            >
              <Eye className="h-4 w-4" />
              Show answer
            </button>
            <p className="mt-2 text-xs text-muted-foreground">Click the card or press Space</p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-4 gap-2">
            <GradeBtn label="Again" color="rose" sub="<1m" onClick={() => grade("again")} disabled={reviewing} />
            <GradeBtn label="Hard" color="amber" sub="~1d" onClick={() => grade("hard")} disabled={reviewing} />
            <GradeBtn label="Good" color="emerald" sub="~2d" onClick={() => grade("good")} disabled={reviewing} />
            <GradeBtn label="Easy" color="primary" sub="~4d" onClick={() => grade("easy")} disabled={reviewing} />
          </div>
        )}
      </div>
    </div>
  );
}

function GradeBtn({
  label,
  sub,
  color,
  onClick,
  disabled,
}: {
  label: string;
  sub: string;
  color: "rose" | "amber" | "emerald" | "primary";
  onClick: () => void;
  disabled?: boolean;
}) {
  const colors: Record<string, string> = {
    rose: "bg-rose-500 hover:bg-rose-600 text-white",
    amber: "bg-amber-500 hover:bg-amber-600 text-white",
    emerald: "bg-emerald-500 hover:bg-emerald-600 text-white",
    primary: "bg-primary hover:opacity-90 text-primary-foreground",
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "rounded-lg py-3 text-sm font-semibold transition disabled:opacity-60 flex flex-col items-center",
        colors[color]
      )}
    >
      <span>{label}</span>
      <span className="text-[10px] opacity-80 font-normal">{sub}</span>
    </button>
  );
}

function getFrontText(type: CardType, card: DueCard): string {
  if (type === "vocabulary") return card.word ?? "";
  if (type === "kana") return card.char ?? "";
  if (type === "kanji") return card.character ?? "";
  if (type === "grammar") return card.title ?? "";
  return "";
}

function Flashcard({
  type,
  card,
  flipped,
  onFlip,
}: {
  type: CardType;
  card: DueCard;
  flipped: boolean;
  onFlip: () => void;
}) {
  return (
    <div className="flip-card h-80 select-none cursor-pointer" onClick={onFlip}>
      <div className={cn("flip-card-inner h-full", flipped && "is-flipped")}>
        {/* Front */}
        <div className="flip-face absolute inset-0 rounded-2xl border border-border bg-card shadow-sm grid place-items-center p-6">
          <CardFront type={type} card={card} />
        </div>
        {/* Back */}
        <div className="flip-face flip-back absolute inset-0 rounded-2xl border border-primary/30 bg-primary/5 shadow-sm p-6 overflow-auto np-scroll">
          <CardBack type={type} card={card} />
        </div>
      </div>
    </div>
  );
}

function CardFront({ type, card }: { type: CardType; card: DueCard }) {
  if (type === "vocabulary") {
    return (
      <div className="text-center">
        <div className="font-jp text-5xl font-semibold">{card.word}</div>
        <div className="font-jp text-lg text-muted-foreground mt-2">{card.reading}</div>
        {card.romaji && (
          <div className="text-xs text-muted-foreground/70 mt-1 italic">{card.romaji}</div>
        )}
      </div>
    );
  }
  if (type === "kana") {
    return (
      <div className="text-center">
        <div className="font-jp text-8xl font-medium leading-none">{card.char}</div>
        <div className="mt-4 text-xs uppercase tracking-wide text-muted-foreground">
          What's the reading?
        </div>
      </div>
    );
  }
  if (type === "kanji") {
    return (
      <div className="text-center">
        <div className="kanji-glyph text-8xl font-medium leading-none">{card.character}</div>
        <div className="mt-4 text-xs uppercase tracking-wide text-muted-foreground">
          Meaning &amp; readings?
        </div>
      </div>
    );
  }
  // grammar
  return (
    <div className="text-center">
      <div className="font-jp text-3xl font-semibold">{card.title}</div>
      <code className="mt-3 inline-block rounded bg-muted px-2 py-1 text-xs font-mono">
        {card.structure}
      </code>
      <div className="mt-4 text-xs uppercase tracking-wide text-muted-foreground">
        Meaning &amp; usage?
      </div>
    </div>
  );
}

function CardBack({ type, card }: { type: CardType; card: DueCard }) {
  const speak = (text: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    speakJapanese(text);
  };
  if (type === "vocabulary") {
    return (
      <div>
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="font-jp text-2xl font-semibold">{card.word}</div>
            <div className="font-jp text-sm text-muted-foreground">{card.reading}</div>
          </div>
          <button onClick={speak(card.word ?? "")} className="text-muted-foreground hover:text-primary">
            <Volume2 className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-3 text-lg font-medium">{card.meaning}</div>
        {card.exampleJp && (
          <div className="mt-4 rounded-lg bg-background p-3 border border-border">
            <div className="flex items-start gap-2">
              <p className="font-jp text-sm leading-snug flex-1">{card.exampleJp}</p>
              <button onClick={speak(card.exampleJp!)} className="text-muted-foreground hover:text-primary shrink-0">
                <Volume2 className="h-4 w-4" />
              </button>
            </div>
            {card.exampleEn && <p className="text-xs text-muted-foreground mt-1">{card.exampleEn}</p>}
          </div>
        )}
      </div>
    );
  }
  if (type === "kana") {
    return (
      <div className="text-center py-4">
        <div className="font-jp text-7xl font-medium">{card.char}</div>
        <div className="mt-4 text-3xl font-bold text-primary">{card.romaji}</div>
        <button
          onClick={speak(card.char ?? "")}
          className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-background border border-border px-3 py-1.5 text-sm hover:bg-accent"
        >
          <Volume2 className="h-4 w-4" /> Hear it
        </button>
      </div>
    );
  }
  if (type === "kanji") {
    return (
      <div>
        <div className="flex items-start gap-4">
          <div className="font-jp text-5xl font-medium leading-none">{card.character}</div>
          <div className="flex-1 min-w-0">
            <div className="text-lg font-bold">{card.meaning}</div>
            <dl className="mt-2 space-y-1 text-sm">
              <div className="flex gap-2">
                <dt className="w-16 shrink-0 text-muted-foreground">On'yomi</dt>
                <dd className="font-jp">{card.onyomi}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-16 shrink-0 text-muted-foreground">Kun'yomi</dt>
                <dd className="font-jp">{card.kunyomi}</dd>
              </div>
            </dl>
          </div>
          <button onClick={speak(card.character ?? "")} className="text-muted-foreground hover:text-primary">
            <Volume2 className="h-4 w-4" />
          </button>
        </div>
        {card.exampleWord && (
          <div className="mt-4 rounded-lg bg-background p-3 border border-border">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">Example</div>
            <div className="font-jp text-lg font-semibold mt-1">{card.exampleWord}</div>
            <div className="font-jp text-sm text-muted-foreground">{card.exampleRead}</div>
            {card.exampleMean && <div className="text-sm mt-0.5">{card.exampleMean}</div>}
          </div>
        )}
      </div>
    );
  }
  // grammar
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="font-jp text-xl font-semibold">{card.title}</h3>
      </div>
      <div className="mt-1 text-sm text-muted-foreground">{card.meaning}</div>
      <p className="mt-3 text-sm leading-relaxed">{card.explanation}</p>
      {card.exampleJp && (
        <div className="mt-3 rounded-lg bg-background p-3 border border-border">
          <div className="flex items-start gap-2">
            <p className="font-jp text-sm leading-snug flex-1">{card.exampleJp}</p>
            <button onClick={speak(card.exampleJp!)} className="text-muted-foreground hover:text-primary shrink-0">
              <Volume2 className="h-4 w-4" />
            </button>
          </div>
          {card.exampleEn && <p className="text-xs text-muted-foreground mt-1">{card.exampleEn}</p>}
        </div>
      )}
    </div>
  );
}

// ---------------- Done ----------------
function DoneScreen({
  type,
  level,
  correct,
  wrong,
  total,
  onRestart,
  onBack,
  onDashboard,
}: {
  type: CardType;
  level: string;
  correct: number;
  wrong: number;
  total: number;
  onRestart: () => void;
  onBack: () => void;
  onDashboard: () => void;
}) {
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
  return (
    <div>
      <SectionHeader eyebrow="Session complete" title="Nicely done!" jp="お疲れ様！" />
      <div className="max-w-xl mx-auto rounded-2xl border border-border bg-card p-8 text-center">
        <div className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-full bg-primary/10 text-primary">
          <Brain className="h-10 w-10" />
        </div>
        <div className="text-4xl font-bold tabular-nums">
          {correct}<span className="text-muted-foreground text-2xl"> / {total}</span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          {TYPE_META[type].label} · {type === "kana" ? "All" : level} · {pct}% correct
        </p>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <MiniStat icon={Check} value={correct} label="Correct" tone="emerald" />
          <MiniStat icon={X} value={wrong} label="Missed" tone="rose" />
          <MiniStat icon={Target} value={total} label="Reviewed" tone="primary" />
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={onRestart}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition"
          >
            <RotateCcw className="h-4 w-4" />
            Review again
          </button>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold hover:bg-accent transition"
          >
            <Layers3 className="h-4 w-4" />
            Pick another deck
          </button>
          <button
            onClick={onDashboard}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold hover:bg-accent transition"
          >
            Back to dashboard
          </button>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          Your streak and review schedule have been updated. Come back tomorrow to keep it going.
        </p>
      </div>
    </div>
  );
}

function MiniStat({
  icon: Icon,
  value,
  label,
  tone,
}: {
  icon: React.ElementType;
  value: number;
  label: string;
  tone: "emerald" | "rose" | "primary";
}) {
  const tones: Record<string, string> = {
    emerald: "text-emerald-600 dark:text-emerald-400",
    rose: "text-rose-600 dark:text-rose-400",
    primary: "text-primary",
  };
  return (
    <div className="rounded-xl bg-muted/50 p-3">
      <Icon className={cn("h-4 w-4 mx-auto", tones[tone])} />
      <div className="mt-1 text-xl font-bold tabular-nums">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
