"use client";

import * as React from "react";
import {
  cn,
  Route,
  ArrowRight,
  BookOpen,
  Languages,
  CheckCircle2,
  ChevronRight,
} from "@/components/app/imports";
import { SectionHeader, EmptyState } from "./_primitives";
import { useApp } from "@/lib/store";

type Lesson = {
  id: number;
  level: string;
  title: string;
  jp: string;
  desc: string;
  vocabCount: number;
  grammarCount: number;
};

export function LessonsSection() {
  const setSection = useApp((s) => s.setSection);
  const startReview = useApp((s) => s.startReview);
  const [lessons, setLessons] = React.useState<Lesson[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [openLesson, setOpenLesson] = React.useState<number | null>(null);

  React.useEffect(() => {
    fetch("/api/lessons")
      .then((r) => r.json())
      .then((d) => setLessons(d.lessons ?? []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <SectionHeader
        eyebrow="Follow the path"
        title="Lessons"
        jp="学習コース"
        description="A suggested study order from absolute beginner (N5) to intermediate (N3). Each lesson groups vocabulary and grammar thematically. Work through them in order, adding cards to your deck as you go."
      />

      {/* Path visualization */}
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-24 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : lessons.length === 0 ? (
        <EmptyState icon={Route} title="No lessons available" />
      ) : (
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[27px] sm:left-[31px] top-2 bottom-2 w-px bg-border" />

          <div className="space-y-3">
            {lessons.map((lesson, idx) => (
              <LessonRow
                key={lesson.id}
                lesson={lesson}
                isLast={idx === lessons.length - 1}
                isOpen={openLesson === lesson.id}
                onToggle={() => setOpenLesson(openLesson === lesson.id ? null : lesson.id)}
                onStudyVocab={() => {
                  setSection("vocabulary");
                }}
                onStudyGrammar={() => {
                  setSection("grammar");
                }}
                onReview={() => startReview("vocabulary", lesson.level)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function LessonRow({
  lesson,
  isLast,
  isOpen,
  onToggle,
  onStudyVocab,
  onStudyGrammar,
  onReview,
}: {
  lesson: Lesson;
  isLast: boolean;
  isOpen: boolean;
  onToggle: () => void;
  onStudyVocab: () => void;
  onStudyGrammar: () => void;
  onReview: () => void;
}) {
  const levelColor =
    lesson.level === "N5" ? "bg-emerald-500" : lesson.level === "N4" ? "bg-amber-500" : "bg-rose-500";
  return (
    <div className="relative pl-12 sm:pl-16">
      {/* Node */}
      <div
        className={cn(
          "absolute left-0 top-3 grid h-14 w-14 place-items-center rounded-full border-4 border-background text-white font-bold shadow-sm",
          levelColor
        )}
      >
        <span className="text-xs">{lesson.id}</span>
      </div>

      <div
        className={cn(
          "rounded-xl border bg-card transition",
          isOpen ? "border-primary/40 ring-1 ring-primary/30" : "border-border hover:border-primary/30"
        )}
      >
        <button onClick={onToggle} className="w-full text-left p-4 sm:p-5 flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2 flex-wrap">
              <h3 className="font-semibold text-base sm:text-lg">{lesson.title}</h3>
              <span className="font-jp text-sm text-muted-foreground">{lesson.jp}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">{lesson.desc}</p>
            <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <BookOpen className="h-3 w-3" />
                {lesson.vocabCount} words
              </span>
              <span className="inline-flex items-center gap-1">
                <Languages className="h-3 w-3" />
                {lesson.grammarCount} grammar
              </span>
            </div>
          </div>
          <ChevronRight
            className={cn(
              "h-5 w-5 text-muted-foreground transition-transform shrink-0",
              isOpen && "rotate-90"
            )}
          />
        </button>

        {isOpen && (
          <div className="px-4 sm:px-5 pb-5 -mt-1 np-fade-in">
            <div className="rounded-lg bg-muted/40 p-3 text-sm text-muted-foreground mb-3">
              This lesson contains vocabulary and grammar tagged for study. Open the relevant section to add these to your flashcard deck, then review.
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={onStudyVocab}
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
              >
                <BookOpen className="h-4 w-4" />
                Study vocabulary
              </button>
              {lesson.grammarCount > 0 && (
                <button
                  onClick={onStudyGrammar}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3.5 py-2 text-sm font-medium hover:bg-accent transition"
                >
                  <Languages className="h-4 w-4" />
                  Study grammar
                </button>
              )}
              <button
                onClick={onReview}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3.5 py-2 text-sm font-medium hover:bg-accent transition"
              >
                <CheckCircle2 className="h-4 w-4" />
                Review {lesson.level} flashcards
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
