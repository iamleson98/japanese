"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  cn,
  Zap,
  Brain,
  Layers3,
  Languages,
  Headphones,
  ListChecks,
  CheckCircle2,
  Circle,
  X,
  Eye,
  Volume2,
  ArrowRight,
  Flame,
  Sparkles,
  Clock,
  Star,
  Target,
  toast,
} from "@/components/app/imports";
import { SectionHeader, LevelBadge } from "./_primitives";
import { speakJapanese } from "@/lib/sections/shared";
import { ShadowPlayer } from "@/components/app/shadow-player";
import { useApp } from "@/lib/store";
import { getSectionHref, getFlashcardsHref } from "@/lib/routes";

/**
 * Smart Study — the guided daily session.
 *
 * Research-backed design:
 *  - One button, zero decisions (habit loop; Duolingo-style)
 *  - Interleaved blocks: reviews -> new cards -> grammar -> input -> quiz
 *  - Frequency-first new-card order, capped at the learner's new/day setting
 *  - Reverse-recall (EN->JP) for mature vocabulary cards (production practice)
 *  - Shadowing inside the listening block (2025 meta-analysis: fluency + prosody)
 *  - Deterministic grammar/passage/quiz "of the day"
 */

type Quality = "again" | "hard" | "good" | "easy";

type Plan = {
  dateKey: string;
  level: string;
  newPerDay: number;
  today: { completed: boolean; session: any };
  readiness: { level: string; learned: number; total: number; pct: number }[];
  plan: {
    reviews: { counts: Record<string, number>; total: number; capped: number };
    newCards: {
      count: number;
      level: string;
      items: {
        id: string;
        word: string;
        reading: string;
        meaning: string;
        viMeaning?: string | null;
        romaji?: string | null;
        level: string;
        exampleJp?: string | null;
        exampleEn?: string | null;
      }[];
    };
    grammar: {
      id: string;
      title: string;
      level: string;
      structure: string;
      meaning: string;
      rule?: string | null;
      usage?: string | null;
      commonMistake?: string | null;
      examples: { jp: string; en: string; difficulty?: string; note?: string }[];
      exercises: { question: string; answer: string; options?: string[]; type?: string; hint?: string }[];
    } | null;
    passage: {
      id: string;
      type: "listening" | "reading";
      level: string;
      title: string;
      jp: string;
      reading: string;
      en: string;
      vi?: string | null;
      audioText?: string | null;
      difficulty: string;
      questions: { question: string; questionVi?: string; options: string[]; answer: string; explanation?: string }[];
    } | null;
    quiz: { questions: { kind: string; prompt: string; promptVi?: string | null; options: string[]; answer: string; explanation?: string }[] };
    minutes: number;
  };
  minedSentences: number;
  stats: { xp: number; streak: number; dailyGoal: number; todayActivity: number };
};

type SessionStats = {
  reviewsDone: number;
  reviewsCorrect: number;
  newDone: number;
  grammarDone: boolean;
  inputDone: boolean;
  shadowingDone: boolean;
  quizScore: number;
  quizTotal: number;
  xpEarned: number;
};

const EMPTY_STATS: SessionStats = {
  reviewsDone: 0,
  reviewsCorrect: 0,
  newDone: 0,
  grammarDone: false,
  inputDone: false,
  shadowingDone: false,
  quizScore: 0,
  quizTotal: 0,
  xpEarned: 0,
};

type Phase = "overview" | "reviews" | "new" | "grammar" | "input" | "quiz" | "done";
const BLOCKS: { phase: Phase; label: string; jp: string; icon: React.ElementType }[] = [
  { phase: "reviews", label: "Warm-up reviews", jp: "復習", icon: Brain },
  { phase: "new", label: "New words", jp: "新しい単語", icon: Layers3 },
  { phase: "grammar", label: "Grammar spotlight", jp: "文法", icon: Languages },
  { phase: "input", label: "Listening & reading", jp: "聴読", icon: Headphones },
  { phase: "quiz", label: "Quick quiz", jp: "クイズ", icon: ListChecks },
];

export function SmartStudySection() {
  const router = useRouter();
  const newPerDay = useApp((s) => s.newPerDay);
  const [data, setData] = React.useState<Plan | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [phase, setPhase] = React.useState<Phase>("overview");
  const [stats, setStats] = React.useState<SessionStats>(EMPTY_STATS);
  const startedAt = React.useRef<number | null>(null);
  const posted = React.useRef(false);

  const load = React.useCallback(() => {
    setLoading(true);
    fetch(`/api/smart-session?newPerDay=${newPerDay}`)
      .then((r) => r.json())
      .then((d: Plan) => setData(d))
      .catch(() => toast("Could not load today's session"))
      .finally(() => setLoading(false));
  }, [newPerDay]);

  React.useEffect(() => {
    load();
  }, [load]);

  function beginSession() {
    startedAt.current = Date.now();
    setStats(EMPTY_STATS);
    posted.current = false;
    setPhase(nextPhase("overview", data));
  }

  function nextPhase(from: Phase, plan: Plan | null): Phase {
    // find the next block with content, skipping empties
    const order: Phase[] = ["reviews", "new", "grammar", "input", "quiz"];
    const start = order.indexOf(from);
    for (let i = Math.max(0, start) + (from === "overview" ? 0 : 1); i < order.length; i++) {
      if (blockHasContent(order[i], plan)) return order[i];
    }
    return "done";
  }

  function blockHasContent(p: Phase, plan: Plan | null): boolean {
    if (!plan) return false;
    if (p === "reviews") return plan.plan.reviews.total > 0;
    if (p === "new") return plan.plan.newCards.count > 0;
    if (p === "grammar") return Boolean(plan.plan.grammar);
    if (p === "input") return Boolean(plan.plan.passage);
    if (p === "quiz") return plan.plan.quiz.questions.length > 0;
    return false;
  }

  function completeBlock(p: Phase) {
    if (p === "done") return;
    setPhase(nextPhase(p, data));
  }

  // Keep a ref of the latest session stats (flushed on every stats change)
  const statsRef = React.useRef(stats);
  React.useEffect(() => {
    statsRef.current = stats;
  }, [stats]);

  // When the done phase is reached, log the session once (+10 XP habit bonus)
  React.useEffect(() => {
    if (phase !== "done" || posted.current) return;
    posted.current = true;
    const finalStats = statsRef.current;
    const t = setTimeout(async () => {
      try {
        const r = await fetch("/api/smart-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            reviewsDone: finalStats.reviewsDone,
            newCardsDone: finalStats.newDone,
            grammarDone: finalStats.grammarDone ? 1 : 0,
            inputDone: finalStats.inputDone ? 1 : 0,
            shadowingDone: finalStats.shadowingDone ? 1 : 0,
            quizScore: finalStats.quizScore,
            quizTotal: finalStats.quizTotal,
            xpEarned: finalStats.xpEarned,
            durationSec: startedAt.current ? Math.round((Date.now() - startedAt.current) / 1000) : 0,
          }),
        });
        const d = await r.json();
        if (d.bonusXp) {
          toast("+10 XP — session complete! 今日もよく頑張った！");
        }
      } catch {
        /* keep the done screen even if logging fails */
      }
    }, 500);
    return () => clearTimeout(t);
  }, [phase]);

  if (loading && !data) {
    return (
      <div className="py-24 text-center text-muted-foreground animate-pulse">Building today&apos;s session…</div>
    );
  }
  if (!data) {
    return (
      <div className="py-24 text-center">
        <p className="text-muted-foreground mb-4">Could not load today&apos;s session.</p>
        <button onClick={load} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
          Try again
        </button>
      </div>
    );
  }

  if (phase === "reviews") {
    return (
      <ReviewsPhase
        plan={data}
        onDone={(done, correct, xp) => {
          setStats((s) => ({ ...s, reviewsDone: done, reviewsCorrect: correct, xpEarned: s.xpEarned + xp }));
          completeBlock("reviews");
        }}
        onSkip={() => completeBlock("reviews")}
      />
    );
  }
  if (phase === "new" && data.plan.newCards.items.length) {
    return (
      <NewCardsPhase
        items={data.plan.newCards.items}
        onDone={(done, xp) => {
          setStats((s) => ({ ...s, newDone: done, xpEarned: s.xpEarned + xp }));
          completeBlock("new");
        }}
        onSkip={() => completeBlock("new")}
      />
    );
  }
  if (phase === "grammar" && data.plan.grammar) {
    return (
      <GrammarPhase
        grammar={data.plan.grammar}
        onDone={() => {
          setStats((s) => ({ ...s, grammarDone: true, xpEarned: s.xpEarned + 6 }));
          completeBlock("grammar");
        }}
        onSkip={() => completeBlock("grammar")}
      />
    );
  }
  if (phase === "input" && data.plan.passage) {
    return (
      <InputPhase
        passage={data.plan.passage}
        onDone={(score, total, shadowed, xp) => {
          setStats((s) => ({
            ...s,
            inputDone: true,
            shadowingDone: s.shadowingDone || shadowed,
            xpEarned: s.xpEarned + xp,
          }));
          completeBlock("input");
        }}
        onSkip={() => completeBlock("input")}
      />
    );
  }
  if (phase === "quiz" && data.plan.quiz.questions.length) {
    return (
      <QuizPhase
        questions={data.plan.quiz.questions}
        onDone={(score, total, xp) => {
          setStats((s) => ({ ...s, quizScore: score, quizTotal: total, xpEarned: s.xpEarned + xp }));
          completeBlock("quiz");
        }}
        onSkip={() => completeBlock("quiz")}
      />
    );
  }
  if (phase === "done") {
    return <DonePhase stats={stats} plan={data} onRestart={() => setPhase("overview")} />;
  }

  return <OverviewPhase plan={data} completed={data.today.completed} onStart={beginSession} onRefresh={load} />;
}

// ---------------- Overview ----------------
function OverviewPhase({
  plan,
  completed,
  onStart,
  onRefresh,
}: {
  plan: Plan;
  completed: boolean;
  onStart: () => void;
  onRefresh: () => void;
}) {
  const router = useRouter();
  const hour = new Date().getHours();
  const rhythm =
    hour < 11
      ? { title: "Morning — prime review time", body: "Your brain is freshest now. Clear due reviews first, then meet new words." }
      : hour < 18
        ? { title: "Afternoon — learn something new", body: "Good window for new material: grammar + fresh words stick well with an evening consolidation pass ahead." }
        : hour < 22
          ? { title: "Evening — encode before sleep", body: "New facts learned now get consolidated by tonight's slow-wave sleep. Review + new cards are ideal right now." }
          : { title: "Before bed — one light pass", body: "A short review right before sleep is the single best-remembered study window. Keep it light, then rest." };

  const blocks = [
    { icon: Brain, label: "Warm-up reviews", meta: `${Math.min(plan.plan.reviews.total, 40)} due card${plan.plan.reviews.total === 1 ? "" : "s"}`, active: plan.plan.reviews.total > 0 },
    { icon: Layers3, label: "New words", meta: `${plan.plan.newCards.count} new · ${plan.plan.newCards.level}`, active: plan.plan.newCards.count > 0 },
    { icon: Languages, label: "Grammar spotlight", meta: plan.plan.grammar ? plan.plan.grammar.title : "—", active: Boolean(plan.plan.grammar) },
    { icon: Headphones, label: plan.plan.passage?.type === "reading" ? "Reading dojo" : "Listening dojo", meta: plan.plan.passage ? plan.plan.passage.title : "—", active: Boolean(plan.plan.passage) },
    { icon: ListChecks, label: "Quick quiz", meta: `${plan.plan.quiz.questions.length} mixed questions`, active: plan.plan.quiz.questions.length > 0 },
  ];

  return (
    <div>
      <SectionHeader
        eyebrow="Guided daily session"
        title="Smart Study"
        jp="今日の学習"
        description="One session, everything interleaved: reviews, new words, grammar, listening, and a quick quiz — arranged by the FSRS scheduler and learning science. Just press start."
      />

      {/* Hero start card */}
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card np-hero-grad mb-6">
        <div className="relative p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <LevelBadge level={plan.level} />
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold">
              <Clock className="h-3.5 w-3.5" />
              ~{plan.plan.minutes} min
            </span>
            {plan.stats.streak > 0 && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 dark:bg-orange-950/40 px-3 py-1 text-xs font-semibold text-orange-700 dark:text-orange-300">
                <Flame className="h-3.5 w-3.5" />
                {plan.stats.streak}-day streak
              </span>
            )}
            {completed && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Completed today ✓
              </span>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {completed ? "Extra practice — round two?" : "Ready for today's session?"}
          </h2>
          <p className="mt-2 text-muted-foreground max-w-xl">
            {completed
              ? "You already finished today's guided session — nice work. A second pass deepens encoding, or explore any section freely."
              : "Zero decisions needed. The session below is built from your due cards, the frequency-ordered queue, and today's grammar and dojo picks."}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={onStart}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-base font-bold text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90 transition"
            >
              <Zap className="h-5 w-5" />
              {completed ? "Study again" : "Start today's session"}
            </button>
            <button
              onClick={() => router.push(getFlashcardsHref("vocabulary", null))}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium hover:bg-accent transition"
            >
              <Layers3 className="h-4 w-4" />
              Just review flashcards
            </button>
          </div>
        </div>
      </div>

      {/* Session blocks */}
      <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Today&apos;s blocks</h3>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-6">
        {blocks.map((b) => {
          const Icon = b.icon;
          return (
            <div
              key={b.label}
              className={cn(
                "rounded-xl border bg-card p-4 flex items-start gap-3",
                b.active ? "border-border" : "border-dashed border-border/60 opacity-60"
              )}
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <div className="font-medium text-sm">{b.label}</div>
                <div className="text-xs text-muted-foreground truncate">{b.active ? b.meta : "nothing due today"}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Rhythm tip + readiness */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <h3 className="font-semibold flex items-center gap-2 text-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            {rhythm.title}
          </h3>
          <p className="mt-1.5 text-sm text-muted-foreground">{rhythm.body}</p>
          <p className="mt-3 text-[11px] text-muted-foreground/80">
            Sleep research: vocabulary (facts) consolidates in early-night deep sleep — study new words in the evening, review them the next morning.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-semibold flex items-center gap-2 text-sm mb-3">
            <Target className="h-4 w-4 text-primary" />
            Level readiness (vocabulary)
          </h3>
          <div className="space-y-2.5">
            {plan.readiness.slice(0, 3).map((r) => (
              <div key={r.level}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-medium">{r.level}</span>
                  <span className="text-muted-foreground tabular-nums">
                    {r.learned}/{r.total} · {r.pct}%
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all",
                      r.level === "N5" ? "bg-emerald-500" : r.level === "N4" ? "bg-amber-500" : "bg-rose-500"
                    )}
                    style={{ width: `${r.pct}%` }}
                  />
                </div>
                {r.pct >= 80 && (
                  <p className="mt-0.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                    ✓ Ready for {r.level === "N5" ? "N4" : r.level === "N4" ? "N3" : "N2"} material
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {plan.minedSentences > 0 && (
        <button
          onClick={() => router.push(getFlashcardsHref("sentence", null))}
          className="mt-4 inline-flex items-center gap-2 rounded-lg border border-amber-300 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-800 px-4 py-2 text-sm font-medium text-amber-700 dark:text-amber-300 hover:opacity-90 transition"
        >
          <Star className="h-4 w-4" />
          {plan.minedSentences} mined sentence{plan.minedSentences > 1 ? "s" : ""} in your deck
        </button>
      )}

      <button onClick={onRefresh} className="mt-6 block text-xs text-muted-foreground hover:text-foreground">
        Refresh plan ↻
      </button>
    </div>
  );
}

// ---------------- Reviews (interleaved, mixed types, reverse challenge) ----------------
type MixedCard = {
  itemType: "vocabulary" | "kana" | "kanji" | "grammar" | "sentence";
  item: any;
  reversed: boolean;
};

function ReviewsPhase({
  plan,
  onDone,
  onSkip,
}: {
  plan: Plan;
  onDone: (done: number, correct: number, xp: number) => void;
  onSkip: () => void;
}) {
  const desiredRetention = useApp((s) => s.desiredRetention);
  const reverseChallenge = useApp((s) => s.reverseChallenge);
  const [queue, setQueue] = React.useState<MixedCard[] | null>(null);
  const [idx, setIdx] = React.useState(0);
  const [flipped, setFlipped] = React.useState(false);
  const [done, setDone] = React.useState(0);
  const [correct, setCorrect] = React.useState(0);
  const [xp, setXp] = React.useState(0);
  const [busy, setBusy] = React.useState(false);

  const cap = Math.min(plan.plan.reviews.total, 40);

  React.useEffect(() => {
    const types: MixedCard["itemType"][] = ["vocabulary", "sentence", "kanji", "grammar", "kana"];
    Promise.all(
      types.map((t) =>
        fetch(`/api/flashcards?type=${t}&limit=40&dueLimit=40&newLimit=0`)
          .then((r) => r.json())
          .then((d) => ({ t, due: (d.due ?? []) as any[] }))
          .catch(() => ({ t, due: [] as any[] })),
      ),
    ).then((results) => {
      const lists = new Map(results.map((r) => [r.t, r.due]));
      // Round-robin interleave: vocabulary first, then sentences, kanji, grammar, kana
      const mixed: MixedCard[] = [];
      let more = true;
      while (more) {
        more = false;
        for (const t of types) {
          const list = lists.get(t)!;
          if (list.length) {
            const item = list.shift()!;
            const p = item.progress;
            const matureVocab = t === "vocabulary" && (p?.stability ?? 0) >= 21 && (p?.reps ?? 0) >= 2;
            mixed.push({
              itemType: t,
              item,
              reversed: Boolean(reverseChallenge && matureVocab && Math.random() < 0.4),
            });
            more = true;
            if (mixed.length >= cap) break;
          }
        }
        if (mixed.length >= cap) break;
      }
      setQueue(mixed);
    });
  }, [cap, reverseChallenge]);

  const current = queue?.[idx];
  const finished = queue !== null && idx >= queue.length;
  const onDoneRef = React.useRef(onDone);
  React.useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  React.useEffect(() => {
    if (finished) {
      const t = setTimeout(() => onDoneRef.current(done, correct, xp), 300);
      return () => clearTimeout(t);
    }
  }, [finished, done, correct, xp]);

  React.useEffect(() => {
    setFlipped(false);
    if (current) {
      const text = frontSpeechText(current);
      if (text && /[\u3040-\u30ff\u4e00-\u9fff]/.test(text)) {
        const t = setTimeout(() => speakJapanese(text), 120);
        return () => clearTimeout(t);
      }
    }
  }, [idx, current]);

  async function grade(q: Quality) {
    if (!current || busy) return;
    setBusy(true);
    const ok = q !== "again";
    if (ok) setCorrect((c) => c + 1);
    setDone((d) => d + 1);
    let gained = 0;
    try {
      const r = await fetch("/api/flashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "review",
          itemType: current.itemType,
          itemId: current.item.id,
          quality: q,
          retention: desiredRetention,
        }),
      });
      const d = await r.json();
      gained = d.xpGain ?? 0;
      setXp((x) => x + gained);
    } catch {
      /* offline-tolerant */
    }
    setTimeout(() => {
      if (q === "again") {
        setQueue((qs) => {
          const arr = qs ? [...qs] : [];
          const [c] = arr.splice(idx, 1);
          arr.push(c);
          return arr;
        });
      } else {
        setIdx((i) => i + 1);
      }
      setBusy(false);
    }, 200);
  }

  if (!queue) {
    return <div className="py-24 text-center text-muted-foreground animate-pulse">Gathering due cards…</div>;
  }
  if (finished) {
    return <div className="py-24 text-center text-muted-foreground animate-pulse">Reviews done — moving on…</div>;
  }

  const total = queue.length;
  const progress = Math.round((idx / total) * 100);

  return (
    <BlockShell
      icon={Brain}
      title="Warm-up reviews"
      jp="復習"
      step={1}
      of={5}
      progress={progress}
      counter={`${Math.min(idx + 1, total)} / ${total}`}
      onSkip={onSkip}
    >
      <div className="max-w-2xl mx-auto">
        <MixedReviewCard card={current!} flipped={flipped} onFlip={() => setFlipped((f) => !f)} />
        {!flipped ? (
          <div className="mt-6 text-center">
            <button
              onClick={() => setFlipped(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-90 transition"
            >
              <Eye className="h-4 w-4" />
              Show answer
            </button>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-4 gap-2">
            <GradeBtn label="Again" color="rose" onClick={() => grade("again")} disabled={busy} />
            <GradeBtn label="Hard" color="amber" onClick={() => grade("hard")} disabled={busy} />
            <GradeBtn label="Good" color="emerald" onClick={() => grade("good")} disabled={busy} />
            <GradeBtn label="Easy" color="primary" onClick={() => grade("easy")} disabled={busy} />
          </div>
        )}
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Mixed card types — interleaved practice strengthens discrimination between them.
        </p>
      </div>
    </BlockShell>
  );
}

function frontSpeechText(card: MixedCard): string {
  const { itemType, item, reversed } = card;
  if (itemType === "vocabulary") return reversed ? "" : item.word ?? "";
  if (itemType === "sentence") return item.textJp ?? "";
  if (itemType === "kana") return item.char ?? "";
  if (itemType === "kanji") return item.character ?? "";
  if (itemType === "grammar") return item.title ?? "";
  return "";
}

function MixedReviewCard({ card, flipped, onFlip }: { card: MixedCard; flipped: boolean; onFlip: () => void }) {
  const { itemType, item, reversed } = card;
  const ttsRate = useApp((s) => s.ttsRate);
  const showVi = useApp((s) => s.showVietnamese);
  const speak = (text: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    speakJapanese(text, ttsRate);
  };

  const typeLabel: Record<string, string> = {
    vocabulary: "Vocabulary",
    sentence: "Sentence",
    kana: "Kana",
    kanji: "Kanji",
    grammar: "Grammar",
  };

  return (
    <div className="flip-card h-80 select-none cursor-pointer" onClick={onFlip}>
      <div className={cn("flip-card-inner h-full", flipped && "is-flipped")}>
        {/* Front */}
        <div className="flip-face absolute inset-0 rounded-2xl border border-border bg-card shadow-sm p-6 overflow-auto np-scroll">
          <div className="h-full flex flex-col items-center justify-center text-center">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              {typeLabel[itemType]}
              {reversed ? " · reverse" : ""}
            </span>
            {/* Front content per type */}
            {itemType === "vocabulary" && !reversed && (
              <>
                <div className="font-jp text-5xl font-semibold mt-3">{item.word}</div>
                <div className="mt-4 text-xs uppercase tracking-wide text-muted-foreground">meaning?</div>
              </>
            )}
            {itemType === "vocabulary" && reversed && (
              <>
                <div className="text-2xl font-semibold mt-3 max-w-md">{item.meaning}</div>
                {showVi && item.viMeaning && (
                  <div className="mt-1 text-sm text-muted-foreground">{item.viMeaning}</div>
                )}
                <div className="mt-4 text-xs uppercase tracking-wide text-muted-foreground">
                  recall the Japanese word ↺
                </div>
              </>
            )}
            {itemType === "sentence" && (
              <>
                <div className="font-jp text-2xl sm:text-3xl leading-relaxed mt-3 max-w-xl">{item.textJp}</div>
                <div className="mt-4 text-xs uppercase tracking-wide text-muted-foreground">translation?</div>
              </>
            )}
            {itemType === "kana" && (
              <>
                <div className="font-jp text-8xl font-medium leading-none mt-2">{item.char}</div>
                <div className="mt-4 text-xs uppercase tracking-wide text-muted-foreground">romaji?</div>
              </>
            )}
            {itemType === "kanji" && (
              <>
                <div className="kanji-glyph text-8xl font-medium leading-none mt-2">{item.character}</div>
                <div className="mt-4 text-xs uppercase tracking-wide text-muted-foreground">meaning &amp; readings?</div>
              </>
            )}
            {itemType === "grammar" && (
              <>
                <div className="font-jp text-3xl font-semibold mt-3">{item.title}</div>
                <code className="mt-3 rounded bg-muted px-2 py-1 text-xs font-mono">{item.structure}</code>
                <div className="mt-4 text-xs uppercase tracking-wide text-muted-foreground">meaning &amp; usage?</div>
              </>
            )}
          </div>
        </div>
        {/* Back */}
        <div className="flip-face flip-back absolute inset-0 rounded-2xl border border-primary/30 bg-primary/5 shadow-sm p-6 overflow-auto np-scroll">
          <div className="h-full flex flex-col items-center justify-center text-center gap-2">
            {itemType === "vocabulary" && !reversed && (
              <>
                <div className="font-jp text-xl">{item.reading}</div>
                <div className="text-2xl font-semibold">{item.meaning}</div>
                {showVi && item.viMeaning && <div className="text-sm text-muted-foreground">{item.viMeaning}</div>}
                {item.exampleJp && (
                  <p className="mt-2 font-jp text-sm text-muted-foreground">
                    {item.exampleJp} <span className="not-italic text-muted-foreground/70">— {item.exampleEn}</span>
                  </p>
                )}
                <button onClick={speak(item.word)} className="mt-2 inline-flex items-center gap-1.5 text-primary text-sm hover:underline">
                  <Volume2 className="h-4 w-4" /> Listen
                </button>
              </>
            )}
            {itemType === "vocabulary" && reversed && (
              <>
                <div className="font-jp text-5xl font-semibold">{item.word}</div>
                <div className="font-jp text-lg text-muted-foreground">{item.reading}</div>
                <button onClick={speak(item.word)} className="mt-1 inline-flex items-center gap-1.5 text-primary text-sm hover:underline">
                  <Volume2 className="h-4 w-4" /> Listen
                </button>
              </>
            )}
            {itemType === "sentence" && (
              <>
                <div className="text-xl font-semibold max-w-xl">{item.textEn}</div>
                {showVi && item.textVi && <div className="text-sm text-muted-foreground">{item.textVi}</div>}
                <button onClick={speak(item.textJp)} className="mt-2 inline-flex items-center gap-1.5 text-primary text-sm hover:underline">
                  <Volume2 className="h-4 w-4" /> Replay sentence
                </button>
              </>
            )}
            {itemType === "kana" && <div className="text-4xl font-semibold tracking-widest uppercase">{item.romaji}</div>}
            {itemType === "kanji" && (
              <>
                <div className="text-2xl font-semibold">{item.meaning}</div>
                <div className="text-sm text-muted-foreground">
                  音 {item.onyomi} · 訓 {item.kunyomi}
                </div>
                {item.exampleWord && (
                  <div className="font-jp text-sm">
                    {item.exampleWord} <span className="text-muted-foreground">({item.exampleRead})</span>
                  </div>
                )}
              </>
            )}
            {itemType === "grammar" && (
              <>
                <div className="text-xl font-semibold">{item.meaning}</div>
                <p className="text-sm text-muted-foreground max-w-lg line-clamp-4">{item.rule ?? item.explanation ?? item.usage}</p>
                {item.exampleJp && (
                  <p className="font-jp text-sm">
                    {item.exampleJp} <span className="text-muted-foreground not-italic">— {item.exampleEn}</span>
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function GradeBtn({
  label,
  color,
  onClick,
  disabled,
  sub,
}: {
  label: string;
  color: "rose" | "amber" | "emerald" | "primary";
  onClick: () => void;
  disabled?: boolean;
  sub?: string;
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
      {sub && <span className="text-[10px] opacity-80 font-normal">{sub}</span>}
    </button>
  );
}

// Shared block shell: header + progress + skip
function BlockShell({
  icon: Icon,
  title,
  jp,
  step,
  of,
  progress,
  counter,
  onSkip,
  children,
}: {
  icon: React.ElementType;
  title: string;
  jp: string;
  step: number;
  of: number;
  progress: number;
  counter?: string;
  onSkip: () => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-5 flex items-center gap-3">
        <div className="flex-1">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="font-medium flex items-center gap-2">
              <Icon className="h-4 w-4 text-primary" />
              {title} <span className="font-jp text-muted-foreground font-normal">{jp}</span>
            </span>
            <span className="text-muted-foreground tabular-nums text-xs">
              Block {step}/{of} {counter ? `· ${counter}` : ""}
            </span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <button
          onClick={onSkip}
          className="grid h-9 w-9 place-items-center rounded-lg border border-border hover:bg-accent transition"
          title="Skip this block"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      {children}
    </div>
  );
}

// ---------------- New cards (frequency-first) ----------------
function NewCardsPhase({
  items,
  onDone,
  onSkip,
}: {
  items: Plan["plan"]["newCards"]["items"];
  onDone: (done: number, xp: number) => void;
  onSkip: () => void;
}) {
  const desiredRetention = useApp((s) => s.desiredRetention);
  const ttsRate = useApp((s) => s.ttsRate);
  const showVi = useApp((s) => s.showVietnamese);
  const romajiMode = useApp((s) => s.romajiMode);
  const [idx, setIdx] = React.useState(0);
  const [revealed, setRevealed] = React.useState(false);
  const [learned, setLearned] = React.useState(0);
  const [xp, setXp] = React.useState(0);
  const [busy, setBusy] = React.useState(false);

  const current = items[idx];
  const finished = idx >= items.length;
  const onDoneRef = React.useRef(onDone);
  React.useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  React.useEffect(() => {
    if (finished) {
      const t = setTimeout(() => onDoneRef.current(learned, xp), 300);
      return () => clearTimeout(t);
    }
  }, [finished, learned, xp]);

  React.useEffect(() => {
    setRevealed(false);
    if (current?.word) {
      const t = setTimeout(() => speakJapanese(current.word, ttsRate), 150);
      return () => clearTimeout(t);
    }
  }, [idx, current, ttsRate]);

  async function grade(q: Quality) {
    if (!current || busy) return;
    setBusy(true);
    setLearned((l) => l + 1);
    let gained = 2;
    try {
      const r = await fetch("/api/flashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "review",
          itemType: "vocabulary",
          itemId: current.id,
          quality: q,
          retention: desiredRetention,
        }),
      });
      const d = await r.json();
      gained = d.xpGain ?? 2;
    } catch { /* tolerant */ }
    setXp((x) => x + gained);
    setTimeout(() => {
      setIdx((i) => i + 1);
      setBusy(false);
    }, 200);
  }

  if (finished) {
    return <div className="py-24 text-center text-muted-foreground animate-pulse">New words done — moving on…</div>;
  }

  const progress = Math.round((idx / items.length) * 100);

  return (
    <BlockShell
      icon={Layers3}
      title="New words"
      jp="新しい単語"
      step={2}
      of={5}
      progress={progress}
      counter={`${idx + 1} / ${items.length}`}
      onSkip={onSkip}
    >
      <div className="max-w-2xl mx-auto">
        <div className="rounded-2xl border border-border bg-card shadow-sm p-6 sm:p-8 text-center min-h-[280px] flex flex-col items-center justify-center">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            New word · {current.level}
          </span>
          <div className="font-jp text-5xl font-semibold mt-3">{current.word}</div>
          {revealed ? (
            <div className="mt-4 space-y-1">
              <div className="font-jp text-lg text-muted-foreground">{current.reading}</div>
              {(romajiMode !== "never" && current.romaji) && (
                <div className="text-xs text-muted-foreground/70 italic">{current.romaji}</div>
              )}
              <div className="text-xl font-semibold">{current.meaning}</div>
              {showVi && current.viMeaning && (
                <div className="text-sm text-muted-foreground">{current.viMeaning}</div>
              )}
              {current.exampleJp && (
                <p className="mt-3 font-jp text-sm text-muted-foreground">
                  {current.exampleJp}
                  {current.exampleEn && (
                    <span className="not-italic text-muted-foreground/70"> — {current.exampleEn}</span>
                  )}
                </p>
              )}
              <button
                onClick={(e) => { e.stopPropagation(); speakJapanese(current.word, ttsRate); }}
                className="mt-2 inline-flex items-center gap-1.5 text-primary text-sm hover:underline"
              >
                <Volume2 className="h-4 w-4" /> Listen again
              </button>
            </div>
          ) : (
            <p className="mt-6 text-sm text-muted-foreground">
              First meeting — read it, try to sound it out, then reveal.
            </p>
          )}
        </div>

        {!revealed ? (
          <div className="mt-6 text-center">
            <button
              onClick={() => setRevealed(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-90 transition"
            >
              <Eye className="h-4 w-4" />
              Reveal
            </button>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-4 gap-2">
            <GradeBtn label="Forgot" color="rose" onClick={() => grade("again")} disabled={busy} />
            <GradeBtn label="Tricky" color="amber" onClick={() => grade("hard")} disabled={busy} />
            <GradeBtn label="Got it" color="emerald" onClick={() => grade("good")} disabled={busy} />
            <GradeBtn label="Easy!" color="primary" onClick={() => grade("easy")} disabled={busy} />
          </div>
        )}
        <p className="mt-3 text-center text-xs text-muted-foreground">
          {items.length} new words, ordered by frequency — the most useful words first.
        </p>
      </div>
    </BlockShell>
  );
}

// ---------------- Grammar spotlight ----------------
function GrammarPhase({
  grammar,
  onDone,
  onSkip,
}: {
  grammar: NonNullable<Plan["plan"]["grammar"]>;
  onDone: () => void;
  onSkip: () => void;
}) {
  const showVi = useApp((s) => s.showVietnamese);
  const [exIdx, setExIdx] = React.useState(0);
  const [picked, setPicked] = React.useState<string | null>(null);
  const [correctCount, setCorrectCount] = React.useState(0);

  const exercises = grammar.exercises ?? [];
  const ex = exercises[exIdx];
  const exDone = exIdx >= exercises.length;

  function pick(option: string) {
    if (picked) return;
    setPicked(option);
    if (option === ex.answer) setCorrectCount((c) => c + 1);
  }

  return (
    <BlockShell
      icon={Languages}
      title="Grammar spotlight"
      jp="文法"
      step={3}
      of={5}
      progress={exercises.length ? Math.round((exIdx / exercises.length) * 100) : 100}
      counter={exercises.length ? `${Math.min(exIdx + 1, exercises.length)} / ${exercises.length}` : undefined}
      onSkip={onSkip}
    >
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-2">
            <LevelBadge level={grammar.level} />
            <code className="rounded bg-muted px-2 py-1 text-xs font-mono">{grammar.structure}</code>
          </div>
          <h3 className="font-jp text-2xl font-bold">{grammar.title}</h3>
          <p className="mt-1 font-semibold text-primary">{grammar.meaning}</p>
          {grammar.rule && (
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-6">{grammar.rule}</p>
          )}
          {grammar.examples.slice(0, 2).map((e, i) => (
            <div key={i} className="mt-3 rounded-lg bg-muted/60 p-3">
              <p className="font-jp text-sm">{e.jp}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{e.en}</p>
            </div>
          ))}
          {grammar.commonMistake && (
            <p className="mt-3 text-xs rounded-lg bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 p-3">
              ⚠ Common mistake: {grammar.commonMistake}
            </p>
          )}
        </div>

        {ex && (
          <div className="rounded-2xl border border-primary/25 bg-primary/5 p-5">
            <div className="text-sm font-semibold mb-3 flex items-center gap-2">
              <ListChecks className="h-4 w-4 text-primary" />
              {ex.question}
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {(ex.options ?? []).map((opt) => {
                const isAnswer = opt === ex.answer;
                const state = !picked ? "idle" : isAnswer ? "correct" : opt === picked ? "wrong" : "dim";
                return (
                  <button
                    key={opt}
                    onClick={() => pick(opt)}
                    disabled={Boolean(picked)}
                    className={cn(
                      "rounded-lg border px-4 py-2.5 text-sm font-jp text-left transition",
                      state === "idle" && "border-border bg-card hover:border-primary/50",
                      state === "correct" && "border-emerald-400 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
                      state === "wrong" && "border-rose-400 bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300",
                      state === "dim" && "border-border opacity-50"
                    )}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {picked && (
              <div className="mt-3 flex items-center justify-between">
                <span className={cn("text-sm font-medium", picked === ex.answer ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400")}>
                  {picked === ex.answer ? "正解 — correct! ✓" : `✗ Answer: ${ex.answer}`}
                </span>
                <button
                  onClick={() => { setPicked(null); setExIdx((i) => i + 1); }}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                >
                  {exIdx + 1 >= exercises.length ? "Finish" : "Next"} <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {exDone && (
          <div className="text-center">
            <button
              onClick={onDone}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white hover:bg-emerald-700 transition"
            >
              <CheckCircle2 className="h-4 w-4" />
              Grammar done {exercises.length ? `· ${correctCount}/${exercises.length} correct` : ""} (+6 XP)
            </button>
          </div>
        )}
      </div>
    </BlockShell>
  );
}

// ---------------- Input: listening/reading dojo + shadowing ----------------
function InputPhase({
  passage,
  onDone,
  onSkip,
}: {
  passage: NonNullable<Plan["plan"]["passage"]>;
  onDone: (score: number, total: number, shadowed: boolean, xp: number) => void;
  onSkip: () => void;
}) {
  const ttsRate = useApp((s) => s.ttsRate);
  const showVi = useApp((s) => s.showVietnamese);
  const [qIdx, setQIdx] = React.useState(0);
  const [picked, setPicked] = React.useState<string | null>(null);
  const [score, setScore] = React.useState(0);
  const [stage, setStage] = React.useState<"comprehend" | "shadow">("comprehend");
  const [plays, setPlays] = React.useState(0);
  const [xp, setXp] = React.useState(0);
  const [showTranscript, setShowTranscript] = React.useState(false);

  const questions = passage.questions ?? [];
  const q = questions[qIdx];
  const questionsDone = qIdx >= questions.length;
  const isListening = passage.type === "listening";
  const audioText = passage.audioText || passage.jp;

  React.useEffect(() => {
    if (isListening && stage === "comprehend" && plays === 0) {
      // auto-play once for listening mode
      const t = setTimeout(() => { speakJapanese(audioText, ttsRate); setPlays(1); }, 250);
      return () => clearTimeout(t);
    }
  }, [isListening, stage, plays, audioText, ttsRate]);

  function play() {
    speakJapanese(audioText, ttsRate);
    setPlays((p) => p + 1);
  }

  function pick(option: string) {
    if (picked) return;
    setPicked(option);
    if (option === q.answer) setScore((s) => s + 1);
  }

  async function submitScore() {
    let gained = 0;
    try {
      const r = await fetch("/api/practice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passageId: passage.id, score, total: questions.length }),
      });
      const d = await r.json();
      gained = d.xpGain ?? 0;
      setXp(gained);
    } catch { /* tolerant */ }
    // Shadow both listening AND reading passages (read-aloud practice is evidence-backed too)
    setStage("shadow");
  }

  return (
    <BlockShell
      icon={Headphones}
      title={isListening ? "Listening dojo" : "Reading dojo"}
      jp={isListening ? "聴解" : "読解"}
      step={4}
      of={5}
      progress={questions.length ? Math.round((qIdx / questions.length) * 100) : 100}
      counter={questions.length ? `${Math.min(qIdx + 1, questions.length)} / ${questions.length}` : undefined}
      onSkip={onSkip}
    >
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-2">
            <LevelBadge level={passage.level} />
            <span className="text-xs text-muted-foreground capitalize">{passage.difficulty}</span>
          </div>
          <h3 className="font-semibold text-lg">{passage.title}</h3>

          {isListening ? (
            <div className="mt-4 flex flex-col items-center gap-3">
              <button
                onClick={play}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition"
              >
                <Volume2 className="h-4 w-4" />
                Play audio ({plays})
              </button>
              <button
                onClick={() => setShowTranscript((v) => !v)}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                {showTranscript ? "Hide transcript" : "Show transcript (last resort!)"}
              </button>
              {showTranscript && (
                <p className="font-jp text-sm leading-relaxed text-center max-w-lg">{passage.jp}</p>
              )}
              <p className="text-[11px] text-muted-foreground">
                Listen 2-3 times before revealing anything — struggle builds comprehension.
              </p>
            </div>
          ) : (
            <div className="mt-4">
              <p className="font-jp text-base leading-loose">{passage.jp}</p>
              {showVi && passage.vi && (
                <p className="mt-2 text-xs text-muted-foreground">{passage.vi}</p>
              )}
              <button
                onClick={() => speakJapanese(audioText, ttsRate)}
                className="mt-2 inline-flex items-center gap-1.5 text-primary text-sm hover:underline"
              >
                <Volume2 className="h-4 w-4" /> Read aloud to me
              </button>
            </div>
          )}
        </div>

        {stage === "comprehend" && q && (
          <div className="rounded-2xl border border-primary/25 bg-primary/5 p-5">
            <div className="text-sm font-semibold mb-3">
              {q.question}
              {showVi && q.questionVi && (
                <span className="ml-2 text-xs font-normal text-muted-foreground">{q.questionVi}</span>
              )}
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {q.options.map((opt) => {
                const isAnswer = opt === q.answer;
                const state = !picked ? "idle" : isAnswer ? "correct" : opt === picked ? "wrong" : "dim";
                return (
                  <button
                    key={opt}
                    onClick={() => pick(opt)}
                    disabled={Boolean(picked)}
                    className={cn(
                      "rounded-lg border px-4 py-2.5 text-sm text-left transition",
                      state === "idle" && "border-border bg-card hover:border-primary/50",
                      state === "correct" && "border-emerald-400 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
                      state === "wrong" && "border-rose-400 bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300",
                      state === "dim" && "border-border opacity-50"
                    )}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {picked && (
              <div className="mt-3 flex items-center justify-between gap-3">
                <span className={cn("text-sm font-medium", picked === q.answer ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400")}>
                  {picked === q.answer ? "Correct! ✓" : `✗ ${q.answer}`}
                  {q.explanation && <span className="ml-2 text-xs font-normal text-muted-foreground">{q.explanation}</span>}
                </span>
                <button
                  onClick={() => { setPicked(null); setQIdx((i) => i + 1); }}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shrink-0"
                >
                  {qIdx + 1 >= questions.length ? "Check score" : "Next"} <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {questionsDone && stage === "comprehend" && (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 dark:bg-emerald-950/30 p-5 text-center">
            <p className="font-semibold">
              Comprehension: {score}/{questions.length}
              {score === questions.length && " — perfect! 🎉"}
            </p>
            <button
              onClick={submitScore}
              className="mt-3 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition"
            >
              Next: shadow it <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {stage === "shadow" && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground text-center">
              Now shadow it — replay each sentence and <b>say it aloud</b> right after. This trains fluency and prosody (the strongest evidence-backed use of shadowing).
            </p>
            <ShadowPlayer
              text={passage.jp}
              reading={passage.reading}
              translation={passage.en}
              translationVi={passage.vi}
              sourceId={passage.id}
              compact
              onDone={() => onDone(score, questions.length, true, xp)}
            />
            <button
              onClick={() => onDone(score, questions.length, false, xp)}
              className="block mx-auto text-xs text-muted-foreground hover:text-foreground"
            >
              Skip shadowing →
            </button>
          </div>
        )}


      </div>
    </BlockShell>
  );
}

// ---------------- Quiz ----------------
function QuizPhase({
  questions,
  onDone,
  onSkip,
}: {
  questions: Plan["plan"]["quiz"]["questions"];
  onDone: (score: number, total: number, xp: number) => void;
  onSkip: () => void;
}) {
  const showVi = useApp((s) => s.showVietnamese);
  const ttsRate = useApp((s) => s.ttsRate);
  const [qIdx, setQIdx] = React.useState(0);
  const [picked, setPicked] = React.useState<string | null>(null);
  const [score, setScore] = React.useState(0);
  const [xp, setXp] = React.useState(0);

  const q = questions[qIdx];
  const finished = qIdx >= questions.length;

  React.useEffect(() => {
    if (q?.prompt && /[\u3040-\u30ff\u4e00-\u9fff]/.test(q.prompt) && q.kind !== "grammar") {
      const t = setTimeout(() => speakJapanese(q.prompt, ttsRate), 150);
      return () => clearTimeout(t);
    }
  }, [qIdx, q, ttsRate]);

  async function pick(opt: string) {
    if (picked || !q) return;
    setPicked(opt);
    const ok = opt === q.answer;
    if (ok) {
      setScore((s) => s + 1);
      setXp((x) => x + 3);
      try {
        await fetch("/api/stats", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: "xp", delta: 3 }),
        });
      } catch { /* tolerant */ }
    }
  }

  if (finished) {
    return (
      <div className="max-w-xl mx-auto text-center py-10">
        <Trophyish score={score} total={questions.length} />
        <button
          onClick={() => onDone(score, questions.length, xp)}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white hover:bg-emerald-700 transition"
        >
          Finish session <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    );
  }

  const kindLabel: Record<string, string> = {
    "vocab-meaning": "Vocabulary · meaning",
    "vocab-reading": "Vocabulary · reading",
    "kanji-meaning": "Kanji · meaning",
    grammar: "Grammar",
  };

  return (
    <BlockShell
      icon={ListChecks}
      title="Quick quiz"
      jp="クイズ"
      step={5}
      of={5}
      progress={Math.round((qIdx / questions.length) * 100)}
      counter={`${qIdx + 1} / ${questions.length}`}
      onSkip={onSkip}
    >
      <div className="max-w-xl mx-auto">
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            {kindLabel[q.kind] ?? "Mixed"}
          </span>
          {q.kind === "kanji-meaning" ? (
            <div className="kanji-glyph text-7xl font-medium text-center mt-3">{q.prompt}</div>
          ) : (
            <div className="font-jp text-3xl font-semibold text-center mt-3">{q.prompt}</div>
          )}
          {showVi && q.promptVi && q.kind === "vocab-meaning" && (
            <p className="text-center text-sm text-muted-foreground mt-1">{q.promptVi}</p>
          )}

          <div className="mt-6 grid gap-2 sm:grid-cols-2">
            {q.options.map((opt) => {
              const isAnswer = opt === q.answer;
              const state = !picked ? "idle" : isAnswer ? "correct" : opt === picked ? "wrong" : "dim";
              return (
                <button
                  key={opt}
                  onClick={() => pick(opt)}
                  disabled={Boolean(picked)}
                  className={cn(
                    "rounded-lg border px-4 py-3 text-sm text-left transition font-jp",
                    state === "idle" && "border-border bg-card hover:border-primary/50",
                    state === "correct" && "border-emerald-400 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
                    state === "wrong" && "border-rose-400 bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300",
                    state === "dim" && "border-border opacity-50"
                  )}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {picked && (
            <div className="mt-4 flex items-center justify-between gap-3">
              <span className={cn("text-sm font-medium", picked === q.answer ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400")}>
                {picked === q.answer ? "Correct! +3 XP" : `✗ ${q.answer}`}
                {q.explanation && <span className="ml-2 text-xs font-normal text-muted-foreground">{q.explanation}</span>}
              </span>
              <button
                onClick={() => { setPicked(null); setQIdx((i) => i + 1); }}
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shrink-0"
              >
                {qIdx + 1 >= questions.length ? "See results" : "Next"} <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Mixed question types — retrieval practice with instant feedback.
        </p>
      </div>
    </BlockShell>
  );
}

function Trophyish({ score, total }: { score: number; total: number }) {
  const pct = total ? Math.round((score / total) * 100) : 0;
  return (
    <div>
      <div className="text-5xl">{pct >= 80 ? "🏆" : pct >= 50 ? "👏" : "💪"}</div>
      <p className="mt-2 text-xl font-bold">
        {score}/{total} correct
      </p>
      <p className="text-sm text-muted-foreground">
        {pct >= 80 ? "Excellent recall!" : pct >= 50 ? "Solid — the misses are scheduled for review." : "Tough round — those words will come back in your reviews."}
      </p>
    </div>
  );
}

// ---------------- Done ----------------
function DonePhase({
  stats,
  plan,
  onRestart,
}: {
  stats: SessionStats;
  plan: Plan;
  onRestart: () => void;
}) {
  const router = useRouter();
  const blocks = [
    { label: "Reviews", value: `${stats.reviewsCorrect}/${stats.reviewsDone} recalled`, done: stats.reviewsDone > 0 },
    { label: "New words", value: `${stats.newDone} learned`, done: stats.newDone > 0 },
    { label: "Grammar", value: stats.grammarDone ? "completed" : "skipped", done: stats.grammarDone },
    { label: "Input dojo", value: stats.inputDone ? `completed${stats.shadowingDone ? " + shadowed" : ""}` : "skipped", done: stats.inputDone },
    { label: "Quiz", value: stats.quizTotal ? `${stats.quizScore}/${stats.quizTotal} correct` : "skipped", done: stats.quizTotal > 0 },
  ];
  const xpTotal = stats.xpEarned + 10;

  return (
    <div className="max-w-xl mx-auto text-center py-8">
      <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-primary/10">
        <Flame className="h-10 w-10 text-primary" />
      </div>
      <h1 className="mt-5 text-3xl font-bold">
        今日も完了! <span className="text-muted-foreground font-normal">Session complete</span>
      </h1>
      <p className="mt-2 text-muted-foreground">
        +{xpTotal} XP earned{stats.reviewsDone > 0 || stats.newDone > 0 ? ` · ${stats.reviewsDone + stats.newDone} cards touched` : ""}
        {plan.stats.streak > 0 ? ` · ${plan.stats.streak}-day streak protected 🔥` : ""}
      </p>

      <div className="mt-6 rounded-2xl border border-border bg-card p-5 text-left">
        {blocks.map((b) => (
          <div key={b.label} className="flex items-center justify-between py-2 border-b border-border/60 last:border-0">
            <span className="flex items-center gap-2 text-sm font-medium">
              {b.done ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              ) : (
                <Circle className="h-4 w-4 text-muted-foreground" />
              )}
              {b.label}
            </span>
            <span className={cn("text-sm", b.done ? "text-foreground" : "text-muted-foreground")}>{b.value}</span>
          </div>
        ))}
      </div>

      <p className="mt-5 text-sm text-muted-foreground max-w-md mx-auto">
        Come back tomorrow — your next session is already being scheduled by FSRS. Evening learners: new words before bed, reviews in the morning.
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button
          onClick={() => router.push(getSectionHref("dashboard"))}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition"
        >
          <Sparkles className="h-4 w-4" /> Back to dashboard
        </button>
        <button
          onClick={() => router.push(getFlashcardsHref("vocabulary", null))}
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium hover:bg-accent transition"
        >
          <Layers3 className="h-4 w-4" /> Extra reviews
        </button>
        <button
          onClick={() => router.push(getSectionHref("practice"))}
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium hover:bg-accent transition"
        >
          <Headphones className="h-4 w-4" /> More dojo
        </button>
      </div>

      <button onClick={onRestart} className="mt-6 text-xs text-muted-foreground hover:text-foreground">
        Back to session overview ↻
      </button>
    </div>
  );
}
