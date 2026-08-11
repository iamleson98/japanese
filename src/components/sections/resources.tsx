"use client";

import * as React from "react";
import {
  cn,
  Youtube,
  ExternalLink,
  PlayCircle,
  ListVideo,
  Radio,
  Search,
} from "@/components/app/imports";
import { SectionHeader, LevelTabs, EmptyState } from "./_primitives";
import { youtubeThumb } from "@/lib/sections/shared";
import { YouTubePlayer } from "@/components/app/youtube-player";

type Resource = {
  id: string;
  title: string;
  url: string;
  type: string;
  level: string;
  topic: string;
  description: string;
  order: number;
};

const TOPIC_LABEL: Record<string, string> = {
  kana: "Kana 仮名",
  grammar: "Grammar 文法",
  vocabulary: "Vocabulary 単語",
  kanji: "Kanji 漢字",
  listening: "Listening 聴解",
  particles: "Particles 助詞",
  reading: "Reading 読解",
};

const TYPE_META: Record<string, { label: string; icon: React.ElementType }> = {
  video: { label: "Video", icon: PlayCircle },
  playlist: { label: "Playlist", icon: ListVideo },
  channel: { label: "Channel", icon: Radio },
};

export function ResourcesSection() {
  const [level, setLevel] = React.useState("all");
  const [topic, setTopic] = React.useState("all");
  const [query, setQuery] = React.useState("");
  const [items, setItems] = React.useState<Resource[]>([]);
  const [topics, setTopics] = React.useState<{ name: string; count: number }[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [playing, setPlaying] = React.useState<Resource | null>(null);

  React.useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (level && level !== "all") params.set("level", level);
    fetch(`/api/resources?${params.toString()}`)
      .then((r) => r.json())
      .then((d) => {
        setItems(d.items ?? []);
        setTopics(d.topics ?? []);
      })
      .finally(() => setLoading(false));
  }, [level]);

  const filtered = React.useMemo(() => {
    let out = items;
    if (topic !== "all") out = out.filter((r) => r.topic === topic);
    if (query.trim()) {
      const q = query.toLowerCase();
      out = out.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.topic.toLowerCase().includes(q)
      );
    }
    return out;
  }, [items, topic, query]);

  return (
    <div>
      <SectionHeader
        eyebrow="Curated & in-app"
        title="Resources"
        jp="動画・参考"
        description="Hand-picked YouTube videos, playlists, and channels. Click any card to play it right here in the app — you'll only be redirected to YouTube for channels, playlists, or fullscreen."
      />

      <div className="mb-5 space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <LevelTabs value={level} onChange={setLevel} includeAll />
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search resources…"
              className="w-full rounded-lg border border-border bg-background pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>

        <div className="np-scroll flex items-center gap-1.5 overflow-x-auto pb-1">
          <TopicChip active={topic === "all"} onClick={() => setTopic("all")} label="All topics" />
          {topics
            .sort((a, b) => {
              const order = ["kana", "grammar", "vocabulary", "kanji", "listening", "particles", "reading"];
              return order.indexOf(a.name) - order.indexOf(b.name);
            })
            .map((t) => (
              <TopicChip
                key={t.name}
                active={topic === t.name}
                onClick={() => setTopic(t.name)}
                label={`${TOPIC_LABEL[t.name] ?? t.name} (${t.count})`}
              />
            ))}
        </div>
      </div>

      <div className="mb-3 text-sm text-muted-foreground">
        {loading ? "Loading…" : `${filtered.length} resources`}
      </div>

      {loading ? (
        <ResourceSkeleton />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={Youtube}
          title="No resources match"
          description="Try a different level, topic, or search."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => (
            <ResourceCard key={r.id} r={r} onPlay={() => setPlaying(r)} />
          ))}
        </div>
      )}

      {playing && (
        <YouTubePlayer url={playing.url} title={playing.title} onClose={() => setPlaying(null)} />
      )}
    </div>
  );
}

function TopicChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition",
        active
          ? "bg-primary text-primary-foreground"
          : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
      )}
    >
      {label}
    </button>
  );
}

function ResourceCard({ r, onPlay }: { r: Resource; onPlay: () => void }) {
  const thumb = youtubeThumb(r.url);
  const meta = TYPE_META[r.type] ?? TYPE_META.video;
  const Icon = meta.icon;
  const isChannel = r.url.includes("/@") || r.url.includes("/channel/") || r.url.includes("/user/");
  const isPlaylist = r.url.includes("playlist?");
  const canEmbed = !isChannel && !isPlaylist && thumb !== null;

  const levelColors: Record<string, string> = {
    N5: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
    N4: "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
    N3: "bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300",
    all: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
  };

  return (
    <button
      onClick={onPlay}
      className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden hover:border-primary/40 hover:shadow-sm transition text-left"
    >
      <div className="relative aspect-video bg-muted overflow-hidden">
        {thumb ? (
          <img
            src={thumb}
            alt=""
            className="h-full w-full object-cover transition group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full grid place-items-center bg-gradient-to-br from-primary/10 to-amber-100/30 dark:from-primary/15 dark:to-amber-950/20">
            <Icon className="h-10 w-10 text-primary/40" />
          </div>
        )}
        {/* Play overlay */}
        {canEmbed && (
          <div className="absolute inset-0 grid place-items-center bg-black/0 group-hover:bg-black/40 transition">
            <PlayCircle className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition drop-shadow-lg" />
          </div>
        )}
        <div className="absolute top-2 left-2 flex items-center gap-1.5">
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
              levelColors[r.level] ?? levelColors.all
            )}
          >
            {r.level}
          </span>
        </div>
        <div className="absolute bottom-2 right-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-black/70 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur">
            <Icon className="h-3 w-3" />
            {meta.label}
          </span>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
          <span className="font-medium">{TOPIC_LABEL[r.topic] ?? r.topic}</span>
        </div>
        <h3 className="font-semibold leading-snug line-clamp-2 group-hover:text-primary transition">
          {r.title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2 flex-1">{r.description}</p>
        <div className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary">
          {canEmbed ? (
            <>
              <PlayCircle className="h-3 w-3" />
              Play in app
            </>
          ) : (
            <>
              <ExternalLink className="h-3 w-3" />
              Open on YouTube
            </>
          )}
        </div>
      </div>
    </button>
  );
}

function ResourceSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-xl border border-border overflow-hidden">
          <div className="aspect-video bg-muted animate-pulse" />
          <div className="p-4 space-y-2">
            <div className="h-3 w-20 rounded bg-muted animate-pulse" />
            <div className="h-4 w-full rounded bg-muted animate-pulse" />
            <div className="h-3 w-3/4 rounded bg-muted animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}
