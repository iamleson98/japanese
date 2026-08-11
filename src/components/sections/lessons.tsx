"use client";

import * as React from "react";
import {
  cn,
  Route,
  BookOpen,
  Languages,
  CheckCircle2,
  ChevronRight,
  Circle,
  ArrowRight,
  GraduationCap,
  ListChecks,
  Volume2,
  PlayCircle,
  Target,
  Lightbulb,
  RotateCcw,
  ArrowLeft,
  Layers3,
} from "@/components/app/imports";
import { SectionHeader, EmptyState, LevelBadge } from "./_primitives";
import { useApp } from "@/lib/store";
import { speakJapanese } from "@/lib/sections/shared";
import { Furigana } from "@/components/app/furigana";

type LessonDef = {
  id: number;
  level: string;
  title: string;
  jp: string;
  chapter: string;
  desc: string;
  steps: string[];
  isReview?: boolean;
  vocabCount: number;
  grammarCount: number;
};

type LessonDetail = {
  lesson: LessonDef;
  vocab: any[];
  grammar: any[];
  kanji: any[];
  progress: { started: boolean; completed: boolean; completedSteps: string[]; steps: string[] };
};

const STEP_LABELS: Record<string, { label: string; jp: string; icon: any }> = {
  grammar: { label: "Grammar", jp: "文法", icon: Languages },
  vocab: { label: "Vocabulary", jp: "単語", icon: BookOpen },
  kanji: { label: "Kanji", jp: "漢字", icon: GraduationCap },
  examples: { label: "Examples", jp: "例文", icon: Lightbulb },
  practice: { label: "Practice", jp: "練習", icon: ListChecks },
  review: { label: "Review", jp: "復習", icon: RotateCcw },
};

export function LessonsSection() {
  const setSection = useApp((s) => s.setSection);
  const startReview = useApp((s) => s.startReview);
  const [lessons, setLessons] = React.useState<LessonDef[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [openId, setOpenId] = React.useState<number | null>(null);
  const [detail, setDetail] = React.useState<LessonDetail | null>(null);
  const [detailLoading, setDetailLoading] = React.useState(false);

  React.useEffect(() => {
    fetch("/api/lessons")
      .then((r) => r.json())
      .then((d) => setLessons(d.lessons ?? []))
      .finally(() => setLoading(false));
  }, []);

  function openLesson(id: number) {
    setOpenId(id);
    setDetailLoading(true);
    setDetail(null);
    fetch(`/api/lessons?id=${id}`)
      .then((r) => r.json())
      .then((d) => setDetail(d))
      .finally(() => setDetailLoading(false));
  }

  function closeLesson() {
    setOpenId(null);
    setDetail(null);
  }

  async function markStep(step: string) {
    if (!openId) return;
    await fetch("/api/lessons", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "mark-step", lessonId: openId, step }),
    });
    // refresh detail
    openLesson(openId);
  }

  async function completeLesson() {
    if (!openId) return;
    await fetch("/api/lessons", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "complete-lesson", lessonId: openId }),
    });
    // refresh both list and detail
    openLesson(openId);
    fetch("/api/lessons").then((r) => r.json()).then((d) => setLessons(d.lessons ?? []));
  }

  // Group lessons by chapter
  const chapters: Record<string, LessonDef[]> = {};
  for (const l of lessons) {
    if (!chapters[l.chapter]) chapters[l.chapter] = [];
    chapters[l.chapter].push(l);
  }

  if (openId) {
    return (
      <LessonDetailView
        detail={detail}
        loading={detailLoading}
        onClose={closeLesson}
        onMarkStep={markStep}
        onComplete={completeLesson}
        onGoVocab={() => setSection("vocabulary")}
        onGoKanji={() => setSection("kanji")}
        onReview={(type, level) => startReview(type, level)}
      />
    );
  }

  return (
    <div>
      <SectionHeader
        eyebrow="Follow the path"
        title="Lessons"
        jp="学習コース"
        description="A Minna-no-Nihongo-inspired curriculum from beginner (N5) to intermediate (N3). Each lesson follows Grammar → Vocabulary → Kanji → Examples → Practice → Review. Periodic review lessons consolidate what you've learned."
      />

      {/* Roadmap progress bar */}
      <RoadmapProgress lessons={lessons} />

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-24 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : lessons.length === 0 ? (
        <EmptyState icon={Route} title="No lessons available" />
      ) : (
        <div className="space-y-8">
          {Object.entries(chapters).map(([chapter, chapterLessons]) => (
            <div key={chapter}>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">{chapter}</h2>
              <div className="relative">
                <div className="absolute left-[27px] sm:left-[31px] top-2 bottom-2 w-px bg-border" />
                <div className="space-y-3">
                  {chapterLessons.map((lesson) => (
                    <LessonRow
                      key={lesson.id}
                      lesson={lesson}
                      onOpen={() => openLesson(lesson.id)}
                      onReview={() => startReview("vocabulary", lesson.level)}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function RoadmapProgress({ lessons }: { lessons: LessonDef[] }) {
  const completed = lessons.filter((l) => (l as any).progress?.completed).length;
  const started = lessons.filter((l) => (l as any).progress?.started && !(l as any).progress?.completed).length;
  const pct = lessons.length > 0 ? Math.round((completed / lessons.length) * 100) : 0;
  return (
    <div className="mb-6 rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="font-semibold flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            Your roadmap
          </h3>
          <p className="text-sm text-muted-foreground">
            {completed} of {lessons.length} lessons completed · {pct}%
          </p>
        </div>
        {completed > 0 && (
          <div className="text-right">
            <div className="text-2xl font-bold text-primary tabular-nums">{pct}%</div>
            <div className="text-[11px] text-muted-foreground">progress</div>
          </div>
        )}
      </div>
      <div className="h-2.5 rounded-full bg-muted overflow-hidden">
        <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function LessonRow({
  lesson,
  onOpen,
  onReview,
}: {
  lesson: LessonDef;
  onOpen: () => void;
  onReview: () => void;
}) {
  const prog = (lesson as any).progress ?? { started: false, completed: false, steps: [] };
  const completedSteps = prog.steps ?? [];
  const totalSteps = lesson.steps.length;
  const doneSteps = completedSteps.length;
  const levelColor = lesson.level === "N5" ? "bg-emerald-500" : lesson.level === "N4" ? "bg-amber-500" : "bg-rose-500";
  const isReview = lesson.isReview;
  return (
    <div className="relative pl-12 sm:pl-16">
      <div
        className={cn(
          "absolute left-0 top-3 grid h-14 w-14 place-items-center rounded-full border-4 border-background text-white font-bold shadow-sm",
          isReview ? "bg-violet-500" : levelColor
        )}
      >
        {prog.completed ? <CheckCircle2 className="h-6 w-6" /> : <span className="text-xs">{lesson.id}</span>}
      </div>
      <button
        onClick={onOpen}
        className={cn(
          "w-full text-left rounded-xl border bg-card transition p-4 sm:p-5",
          prog.completed ? "border-emerald-300/60" : prog.started ? "border-primary/40 ring-1 ring-primary/20" : "border-border hover:border-primary/30"
        )}
      >
        <div className="flex items-start gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2 flex-wrap">
              {isReview && <span className="rounded bg-violet-100 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300 px-1.5 py-0.5 text-[10px] font-semibold uppercase">Review</span>}
              <h3 className="font-semibold text-base sm:text-lg">{lesson.title}</h3>
              <span className="font-jp text-sm text-muted-foreground">{lesson.jp}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">{lesson.desc}</p>
            <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
              <span className="inline-flex items-center gap-1">
                <BookOpen className="h-3 w-3" />
                {lesson.vocabCount} words
              </span>
              <span className="inline-flex items-center gap-1">
                <Languages className="h-3 w-3" />
                {lesson.grammarCount} grammar
              </span>
              <span className="inline-flex items-center gap-1">
                {prog.completed ? <CheckCircle2 className="h-3 w-3 text-emerald-500" /> : <Circle className="h-3 w-3" />}
                {prog.completed ? "Completed" : prog.started ? `${doneSteps}/${totalSteps} steps` : "Not started"}
              </span>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />
        </div>
      </button>
    </div>
  );
}

// ----------------- Lesson Detail View -----------------

function LessonDetailView({
  detail,
  loading,
  onClose,
  onMarkStep,
  onComplete,
  onGoVocab,
  onGoKanji,
  onReview,
}: {
  detail: LessonDetail | null;
  loading: boolean;
  onClose: () => void;
  onMarkStep: (step: string) => void;
  onComplete: () => void;
  onGoVocab: () => void;
  onGoKanji: () => void;
  onReview: (type: "vocabulary" | "kanji" | "grammar", level: string) => void;
}) {
  const lesson = detail?.lesson;
  const [activeStep, setActiveStep] = React.useState<string>("grammar");

  React.useEffect(() => {
    if (detail) {
      // jump to first incomplete step
      const steps = detail.lesson.steps;
      const completed = new Set(detail.progress.completedSteps);
      const next = steps.find((s) => !completed.has(s)) ?? steps[0];
      setActiveStep(next);
    }
  }, [detail]);

  if (loading || !lesson) {
    return (
      <div>
        <button onClick={onClose} className="mb-4 text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" /> Back to lessons
        </button>
        <div className="h-96 rounded-xl bg-muted animate-pulse" />
      </div>
    );
  }

  const steps = lesson.steps;
  const completedSet = new Set(detail.progress.completedSteps);

  return (
    <div>
      {/* Header */}
      <button onClick={onClose} className="mb-4 text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
        <ArrowLeft className="h-4 w-4" /> Back to lessons
      </button>

      <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 mb-5">
        <div className="flex items-center gap-2 mb-2">
          <LevelBadge level={lesson.level} />
          {lesson.isReview && (
            <span className="rounded bg-violet-100 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300 px-2 py-0.5 text-[10px] font-semibold uppercase">Review Lesson</span>
          )}
          <span className="text-xs text-muted-foreground">Lesson {lesson.id}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold flex items-baseline gap-3">
          {lesson.title}
          <span className="font-jp text-lg text-muted-foreground font-medium">{lesson.jp}</span>
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">{lesson.desc}</p>

        {/* Step tracker */}
        <div className="mt-5 flex items-center gap-1.5 flex-wrap">
          {steps.map((step, i) => {
            const meta = STEP_LABELS[step];
            const done = completedSet.has(step);
            const active = activeStep === step;
            const Icon = meta?.icon ?? Circle;
            return (
              <React.Fragment key={step}>
                {i > 0 && <ArrowRight className="h-3 w-3 text-muted-foreground/50" />}
                <button
                  onClick={() => setActiveStep(step)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition",
                    active
                      ? "bg-primary text-primary-foreground"
                      : done
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                      : "bg-muted text-muted-foreground hover:bg-accent"
                  )}
                >
                  {done ? <CheckCircle2 className="h-3 w-3" /> : <Icon className="h-3 w-3" />}
                  {meta?.label ?? step}
                </button>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Active step content */}
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
        {activeStep === "grammar" && (
          <StepGrammar detail={detail} onReview={(lvl) => onReview("grammar", lvl)} />
        )}
        {activeStep === "vocab" && (
          <StepVocab detail={detail} onGoVocab={onGoVocab} onReview={(lvl) => onReview("vocabulary", lvl)} />
        )}
        {activeStep === "kanji" && (
          <StepKanji detail={detail} onGoKanji={onGoKanji} onReview={(lvl) => onReview("kanji", lvl)} />
        )}
        {activeStep === "examples" && <StepExamples detail={detail} />}
        {activeStep === "practice" && <StepPractice detail={detail} />}
        {activeStep === "review" && <StepReview detail={detail} onReview={(lvl) => onReview("vocabulary", lvl)} />}
      </div>

      {/* Footer: mark step + next */}
      <div className="mt-5 flex items-center justify-between gap-3">
        <button
          onClick={() => onMarkStep(activeStep)}
          disabled={completedSet.has(activeStep)}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition",
            completedSet.has(activeStep)
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
              : "bg-primary text-primary-foreground hover:opacity-90"
          )}
        >
          {completedSet.has(activeStep) ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
          {completedSet.has(activeStep) ? "Step completed" : "Mark step complete"}
        </button>
        {completedSet.size >= steps.length - 1 && !detail.progress.completed && (
          <button
            onClick={onComplete}
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition"
          >
            <CheckCircle2 className="h-4 w-4" />
            Complete lesson
          </button>
        )}
      </div>
    </div>
  );
}

function StepGrammar({ detail, onReview }: { detail: LessonDetail; onReview: (level: string) => void }) {
  const grammar = detail.grammar;
  if (!grammar.length) return <EmptyState icon={Languages} title="No grammar for this lesson" description="This lesson focuses on other content." />;
  return (
    <div>
      <StepHeader icon={Languages} title="Grammar" jp="文法" desc="Learn the rules, conjugation, and usage. Study the examples, then do the exercises." />
      <div className="space-y-4 mt-4">
        {grammar.map((g) => (
          <div key={g.id} className="rounded-xl border border-border p-4">
            <div className="flex items-baseline justify-between gap-2 mb-2">
              <h4 className="font-jp font-semibold text-base">{g.title}</h4>
              <code className="text-xs font-mono bg-muted px-2 py-0.5 rounded">{g.structure}</code>
            </div>
            <p className="text-sm font-medium text-primary mb-2">{g.meaning}</p>
            {g.rule && <p className="text-sm leading-relaxed mb-3 whitespace-pre-line">{g.rule}</p>}
            {g.conjugation && (
              <div className="rounded-lg bg-sky-50 dark:bg-sky-950/30 p-3 mb-3">
                <p className="text-xs font-semibold text-sky-700 dark:text-sky-300 uppercase tracking-wide mb-1">Conjugation</p>
                <p className="text-sm whitespace-pre-line">{g.conjugation}</p>
              </div>
            )}
            {g.usage && (
              <p className="text-sm text-muted-foreground mb-3"><span className="font-medium text-foreground">Usage:</span> {g.usage}</p>
            )}
            {g.examples?.length > 0 && (
              <div className="space-y-1.5">
                {g.examples.map((ex: any, i: number) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <Furigana text={ex.jp} className="leading-snug flex-1" />
                    <button onClick={() => speakJapanese(ex.jp)} className="text-muted-foreground hover:text-primary shrink-0">
                      <Volume2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {g.commonMistake && (
              <p className="text-xs text-rose-600 dark:text-rose-400 mt-2"><span className="font-semibold">⚠ Common mistake:</span> {g.commonMistake}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function StepVocab({ detail, onGoVocab, onReview }: { detail: LessonDetail; onGoVocab: () => void; onReview: (level: string) => void }) {
  const vocab = detail.vocab;
  if (!vocab.length) return <EmptyState icon={BookOpen} title="No vocabulary for this lesson" />;
  return (
    <div>
      <StepHeader icon={BookOpen} title="Vocabulary" jp="単語" desc="Key words for this lesson. Add them to your flashcard deck to review later." />
      <div className="grid gap-2 sm:grid-cols-2 mt-4">
        {vocab.slice(0, 20).map((v) => (
          <div key={v.id} className="rounded-lg border border-border p-3 flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2">
                <Furigana text={v.word} reading={v.reading} className="text-lg font-semibold" />
                <button onClick={() => speakJapanese(v.word)} className="text-muted-foreground hover:text-primary">
                  <Volume2 className="h-3.5 w-3.5" />
                </button>
              </div>
              <p className="text-xs text-muted-foreground">{v.meaning}</p>
            </div>
            {v.pos && <span className="text-[10px] uppercase text-muted-foreground">{v.pos}</span>}
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <button onClick={onGoVocab} className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3.5 py-2 text-sm font-medium hover:bg-accent transition">
          <BookOpen className="h-4 w-4" /> Browse all vocabulary
        </button>
        <button onClick={() => onReview(detail.lesson.level)} className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition">
          <Layers3 className="h-4 w-4" /> Review {detail.lesson.level} flashcards
        </button>
      </div>
    </div>
  );
}

function StepKanji({ detail, onGoKanji, onReview }: { detail: LessonDetail; onGoKanji: () => void; onReview: (level: string) => void }) {
  const kanji = detail.kanji;
  if (!kanji.length) return <EmptyState icon={GraduationCap} title="No kanji for this lesson" description="Kanji are introduced in later lessons." />;
  return (
    <div>
      <StepHeader icon={GraduationCap} title="Kanji" jp="漢字" desc="Characters for this level. Tap any to see readings, mnemonic, and examples." />
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 mt-4">
        {kanji.map((k) => (
          <div key={k.id} className="rounded-lg border border-border p-2 text-center">
            <div className="kanji-glyph text-2xl font-medium leading-none">{k.character}</div>
            <div className="text-[10px] text-muted-foreground mt-1 line-clamp-1">{k.meaning}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <button onClick={onGoKanji} className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3.5 py-2 text-sm font-medium hover:bg-accent transition">
          <GraduationCap className="h-4 w-4" /> Browse all kanji
        </button>
      </div>
    </div>
  );
}

function StepExamples({ detail }: { detail: LessonDetail }) {
  // Pull examples from grammar + vocab
  const allExamples: { jp: string; en: string; source: string }[] = [];
  for (const g of detail.grammar) {
    for (const ex of g.examples ?? []) {
      allExamples.push({ jp: ex.jp, en: ex.en, source: g.title });
    }
  }
  for (const v of detail.vocab) {
    if (v.exampleJp) allExamples.push({ jp: v.exampleJp, en: v.exampleEn ?? "", source: v.word });
  }
  if (!allExamples.length) return <EmptyState icon={Lightbulb} title="No example sentences" />;
  return (
    <div>
      <StepHeader icon={Lightbulb} title="Example Sentences" jp="例文" desc="See the grammar and vocabulary in real sentences. Listen to each one." />
      <div className="space-y-2 mt-4">
        {allExamples.map((ex, i) => (
          <div key={i} className="rounded-lg bg-muted/50 p-3">
            <div className="flex items-start gap-2">
              <Furigana text={ex.jp} className="text-sm leading-snug flex-1" />
              <button onClick={() => speakJapanese(ex.jp)} className="text-muted-foreground hover:text-primary shrink-0">
                <Volume2 className="h-4 w-4" />
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{ex.en}</p>
            <p className="text-[10px] text-primary mt-0.5">from: {ex.source}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function StepPractice({ detail }: { detail: LessonDetail }) {
  const allExercises: { question: string; answer: string; hint?: string; type: string; options?: string[]; source: string }[] = [];
  for (const g of detail.grammar) {
    for (const ex of g.exercises ?? []) {
      allExercises.push({ ...ex, source: g.title });
    }
  }
  if (!allExercises.length) return <EmptyState icon={ListChecks} title="No exercises for this lesson" description="Do the Quiz section to practice instead." />;
  return (
    <div>
      <StepHeader icon={ListChecks} title="Practice" jp="練習" desc="Apply what you learned. Fill in the blanks or pick the right answer." />
      <div className="space-y-3 mt-4">
        {allExercises.map((ex, i) => (
          <div key={i} className="rounded-lg border border-border p-3">
            <p className="text-sm mb-2"><span className="text-muted-foreground mr-1">{i + 1}.</span>{ex.question}</p>
            {ex.hint && <p className="text-[11px] text-muted-foreground mb-1.5">💡 {ex.hint}</p>}
            {ex.type === "multiple-choice" && ex.options ? (
              <div className="flex flex-wrap gap-1.5">
                {ex.options.map((opt) => (
                  <span key={opt} className="rounded border border-border bg-background px-2.5 py-1 text-xs">{opt}</span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">Answer: <span className="font-jp text-primary">{ex.answer}</span></p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function StepReview({ detail, onReview }: { detail: LessonDetail; onReview: (level: string) => void }) {
  const counts = {
    grammar: detail.grammar.length,
    vocab: detail.vocab.length,
    kanji: detail.kanji.length,
  };
  return (
    <div>
      <StepHeader icon={RotateCcw} title="Review" jp="復習" desc="Consolidate what you learned. Run a flashcard session to lock it in." />
      <div className="grid grid-cols-3 gap-3 mt-4 mb-4">
        <ReviewCount icon={Languages} label="Grammar" value={counts.grammar} />
        <ReviewCount icon={BookOpen} label="Vocabulary" value={counts.vocab} />
        <ReviewCount icon={GraduationCap} label="Kanji" value={counts.kanji} />
      </div>
      <button onClick={() => onReview(detail.lesson.level)} className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition">
        <Layers3 className="h-4 w-4" />
        Start review session ({detail.lesson.level})
      </button>
    </div>
  );
}

function ReviewCount({ icon: Icon, label, value }: { icon: any; label: string; value: number }) {
  return (
    <div className="rounded-lg bg-muted/50 p-3 text-center">
      <Icon className="h-5 w-5 mx-auto text-primary mb-1" />
      <div className="text-xl font-bold tabular-nums">{value}</div>
      <div className="text-[11px] text-muted-foreground">{label}</div>
    </div>
  );
}

function StepHeader({ icon: Icon, title, jp, desc }: { icon: any; title: string; jp: string; desc: string }) {
  return (
    <div className="flex items-start gap-3 pb-3 border-b border-border">
      <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary shrink-0">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <h2 className="text-lg font-bold flex items-baseline gap-2">{title} <span className="font-jp text-sm text-muted-foreground font-medium">{jp}</span></h2>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
}
