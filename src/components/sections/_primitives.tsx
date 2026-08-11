"use client";

import * as React from "react";
import { cn } from "@/components/app/imports";
import {
  LEVELS,
  LEVEL_LABEL,
  LEVEL_DESC,
  LEVEL_BADGE,
  LEVEL_DOT,
  type Level,
} from "@/lib/sections/shared";

export function SectionHeader({
  eyebrow,
  title,
  jp,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  jp?: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-6 sm:mb-8">
      {eyebrow && (
        <div className="text-xs font-semibold uppercase tracking-wider text-primary mb-1.5">
          {eyebrow}
        </div>
      )}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-baseline gap-3">
            {title}
            {jp && (
              <span className="font-jp text-lg sm:text-xl text-muted-foreground font-medium">
                {jp}
              </span>
            )}
          </h1>
          {description && (
            <p className="mt-1.5 text-sm sm:text-base text-muted-foreground max-w-2xl">
              {description}
            </p>
          )}
        </div>
        {children && <div className="flex items-center gap-2 flex-wrap">{children}</div>}
      </div>
    </div>
  );
}

export function LevelTabs({
  value,
  onChange,
  includeAll = false,
}: {
  value: string;
  onChange: (v: string) => void;
  includeAll?: boolean;
}) {
  const options: string[] = includeAll ? ["all", ...LEVELS] : [...LEVELS];
  return (
    <div className="inline-flex items-center gap-1 rounded-lg bg-muted p-1">
      {options.map((lvl) => {
        const active = value === lvl;
        return (
          <button
            key={lvl}
            onClick={() => onChange(lvl)}
            className={cn(
              "relative rounded-md px-3 py-1.5 text-sm font-medium transition",
              active
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {lvl === "all" ? "All" : lvl}
            {active && (
              <span
                className={cn(
                  "absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-6 rounded-full",
                  LEVEL_DOT[lvl] ?? "bg-slate-400"
                )}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

export function LevelBadge({ level }: { level: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
        LEVEL_BADGE[level] ?? LEVEL_BADGE.all
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", LEVEL_DOT[level] ?? LEVEL_DOT.all)} />
      {level}
    </span>
  );
}

export function LevelPathCard({
  level,
  learned,
  total,
  description,
  onStart,
  onReview,
}: {
  level: Level;
  learned: number;
  total: number;
  description: string;
  onStart: () => void;
  onReview: () => void;
}) {
  const pct = total > 0 ? Math.round((learned / total) * 100) : 0;
  return (
    <div className="relative rounded-2xl border border-border bg-card p-5 sm:p-6 overflow-hidden">
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-1",
          level === "N5" ? "bg-emerald-500" : level === "N4" ? "bg-amber-500" : "bg-rose-500"
        )}
      />
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold">{LEVEL_LABEL[level]}</h3>
          </div>
          <p className="mt-1 text-sm text-muted-foreground max-w-xs">{description}</p>
        </div>
        <LevelBadge level={level} />
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between text-sm mb-1.5">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium tabular-nums">
            {learned}/{total} <span className="text-muted-foreground">({pct}%)</span>
          </span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all",
              level === "N5" ? "bg-emerald-500" : level === "N4" ? "bg-amber-500" : "bg-rose-500"
            )}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          onClick={onStart}
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
        >
          Start learning
        </button>
        <button
          onClick={onReview}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3.5 py-2 text-sm font-medium hover:bg-accent transition"
        >
          Review flashcards
        </button>
      </div>
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  accent = "primary",
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon: React.ElementType;
  accent?: "primary" | "emerald" | "amber" | "rose" | "slate";
}) {
  const accentMap: Record<string, string> = {
    primary: "bg-primary/10 text-primary",
    emerald: "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-300",
    amber: "bg-amber-100 text-amber-600 dark:bg-amber-950/50 dark:text-amber-300",
    rose: "bg-rose-100 text-rose-600 dark:bg-rose-950/50 dark:text-rose-300",
    slate: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
  };
  return (
    <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </span>
        <span className={cn("grid h-8 w-8 place-items-center rounded-lg", accentMap[accent])}>
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <div className="mt-2 text-2xl sm:text-3xl font-bold tabular-nums">{value}</div>
      {hint && <div className="mt-0.5 text-xs text-muted-foreground">{hint}</div>}
    </div>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: React.ElementType;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-dashed border-border p-10 text-center">
      <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-muted">
        <Icon className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="font-semibold">{title}</h3>
      {description && (
        <p className="mt-1 text-sm text-muted-foreground max-w-sm mx-auto">{description}</p>
      )}
      {action && <div className="mt-4 flex justify-center">{action}</div>}
    </div>
  );
}

export { LEVELS, LEVEL_LABEL, LEVEL_DESC };
