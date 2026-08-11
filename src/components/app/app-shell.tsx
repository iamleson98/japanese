"use client";

import * as React from "react";
import { useApp, type SectionId } from "@/lib/store";
import { useTheme } from "@/components/theme-provider";
import {
  LayoutDashboard,
  Type,
  BookOpen,
  Languages,
  Layers,
  Layers3,
  Youtube,
  Sun,
  Moon,
  Flame,
  cn,
} from "@/components/app/imports";

const NAV: { id: SectionId; label: string; jp: string; icon: React.ElementType }[] = [
  { id: "dashboard", label: "Dashboard", jp: "ホーム", icon: LayoutDashboard },
  { id: "kana", label: "Kana", jp: "仮名", icon: Type },
  { id: "vocabulary", label: "Vocabulary", jp: "単語", icon: BookOpen },
  { id: "grammar", label: "Grammar", jp: "文法", icon: Languages },
  { id: "kanji", label: "Kanji", jp: "漢字", icon: Layers },
  { id: "flashcards", label: "Flashcards", jp: "復習", icon: Layers3 },
  { id: "resources", label: "Resources", jp: "動画", icon: Youtube },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const section = useApp((s) => s.section);
  const setSection = useApp((s) => s.setSection);
  const { theme, setTheme } = useTheme();
  const [streak, setStreak] = React.useState(0);

  React.useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then((d) => setStreak(d.streak ?? 0))
      .catch(() => {});
    const i = setInterval(() => {
      fetch("/api/stats")
        .then((r) => r.json())
        .then((d) => setStreak(d.streak ?? 0))
        .catch(() => {});
    }, 30000);
    return () => clearInterval(i);
  }, [section]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header
        section={section}
        setSection={setSection}
        theme={theme}
        setTheme={setTheme}
        streak={streak}
      />
      <main className="flex-1 w-full">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-6 sm:py-8">{children}</div>
      </main>
      <Footer />
    </div>
  );
}

function Header({
  section,
  setSection,
  theme,
  setTheme,
  streak,
}: {
  section: SectionId;
  setSection: (s: SectionId) => void;
  theme: string;
  setTheme: (t: "light" | "dark" | "system") => void;
  streak: number;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center gap-3">
          {/* Logo */}
          <button
            onClick={() => setSection("dashboard")}
            className="flex items-center gap-2.5 group shrink-0"
            aria-label="Go to dashboard"
          >
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground font-jp text-lg font-bold shadow-sm transition group-hover:scale-105">
              日
            </span>
            <span className="hidden sm:flex flex-col leading-tight">
              <span className="font-semibold text-foreground tracking-tight">Nihongo Path</span>
              <span className="text-[11px] text-muted-foreground font-jp">日本語パス · N5→N3</span>
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1 ml-2">
            {NAV.map((item) => (
              <NavButton
                key={item.id}
                active={section === item.id}
                onClick={() => setSection(item.id)}
                icon={item.icon}
                label={item.label}
                jp={item.jp}
              />
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            {streak > 0 && (
              <div
                className="hidden sm:flex items-center gap-1.5 rounded-full bg-orange-50 dark:bg-orange-950/40 px-3 py-1.5 text-sm font-medium text-orange-700 dark:text-orange-300 ring-1 ring-orange-200/60 dark:ring-orange-800/40"
                title={`${streak}-day streak`}
              >
                <Flame className="h-4 w-4" />
                <span>{streak}</span>
              </div>
            )}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="grid h-9 w-9 place-items-center rounded-lg border border-border hover:bg-accent transition"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile nav: horizontal scrollable pills */}
        <div className="lg:hidden -mx-1 pb-2">
          <div className="np-scroll flex items-center gap-1.5 overflow-x-auto px-1">
            {NAV.map((item) => (
              <button
                key={item.id}
                onClick={() => setSection(item.id)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium whitespace-nowrap transition",
                  section === item.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted text-muted-foreground hover:bg-accent"
                )}
              >
                <item.icon className="h-3.5 w-3.5" />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

function NavButton({
  active,
  onClick,
  icon: Icon,
  label,
  jp,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ElementType;
  label: string;
  jp: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition",
        active
          ? "bg-primary text-primary-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground hover:bg-accent"
      )}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
      <span
        className={cn(
          "font-jp text-[11px]",
          active ? "text-primary-foreground/70" : "text-muted-foreground/70"
        )}
      >
        {jp}
      </span>
    </button>
  );
}

function Footer() {
  return (
    <footer className="mt-auto border-t border-border/70 bg-muted/30">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-primary text-primary-foreground font-jp text-sm font-bold">
              日
            </span>
            <span>
              <span className="font-medium text-foreground">Nihongo Path</span>
              <span className="mx-2 text-border">·</span>
              <span className="font-jp">日本語パス</span>
            </span>
          </div>
          <p className="text-xs">
            Learn Japanese from absolute beginner (N5) to intermediate (N3). Made with curated
            YouTube resources &amp; spaced-repetition flashcards.
          </p>
        </div>
      </div>
    </footer>
  );
}
