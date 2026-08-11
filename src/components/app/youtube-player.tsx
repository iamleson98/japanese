"use client";

import * as React from "react";
import { cn, X, ExternalLink, PlayCircle } from "@/components/app/imports";
import { youtubeEmbed, youtubeThumb } from "@/lib/sections/shared";

/**
 * In-app YouTube player.
 * - Click a resource card to open a modal with an embedded iframe.
 * - The "Open on YouTube" button redirects for fullscreen / playlists / channels.
 */
export function YouTubePlayer({
  url,
  title,
  onClose,
}: {
  url: string;
  title: string;
  onClose: () => void;
}) {
  const embedUrl = youtubeEmbed(url);
  const thumb = youtubeThumb(url);
  const isChannel = url.includes("/@") || url.includes("/channel/") || url.includes("/user/");
  const isPlaylist = url.includes("playlist?");

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/70 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl rounded-2xl bg-card border border-border shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <h3 className="font-semibold text-sm line-clamp-1">{title}</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground shrink-0 ml-2">
            <X className="h-5 w-5" />
          </button>
        </div>

        {embedUrl ? (
          <div className="aspect-video bg-black">
            <iframe
              src={embedUrl}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        ) : (
          <div className="aspect-video grid place-items-center bg-gradient-to-br from-primary/10 to-amber-100/30 dark:from-primary/15 dark:to-amber-950/20">
            {thumb ? (
              <div className="relative w-full h-full">
                <img src={thumb} alt="" className="h-full w-full object-cover opacity-70" />
                <div className="absolute inset-0 grid place-items-center">
                  <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700 transition shadow-lg">
                    <PlayCircle className="h-5 w-5" /> Play on YouTube
                  </a>
                </div>
              </div>
            ) : (
              <div className="text-center p-6">
                <PlayCircle className="h-12 w-12 mx-auto text-primary/40 mb-3" />
                <p className="text-sm text-muted-foreground mb-4">
                  {isChannel ? "This is a YouTube channel." : isPlaylist ? "This is a YouTube playlist." : "This video can't be embedded."}
                </p>
                <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition">
                  <ExternalLink className="h-4 w-4" /> Open on YouTube
                </a>
              </div>
            )}
          </div>
        )}

        <div className="px-4 py-3 flex items-center justify-between gap-2 bg-muted/30">
          <p className="text-xs text-muted-foreground">
            {isChannel || isPlaylist || !embedUrl
              ? "Opens in a new tab — channels & playlists can't be embedded."
              : "Playing in-app. Use fullscreen on YouTube for the full experience."}
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline shrink-0"
          >
            <ExternalLink className="h-3 w-3" />
            YouTube
          </a>
        </div>
      </div>
    </div>
  );
}
