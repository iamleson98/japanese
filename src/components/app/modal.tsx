"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn, X } from "@/components/app/imports";

/**
 * Reusable modal/overlay that:
 *  - Blurs + dims the background
 *  - Centers content vertically when it fits the viewport
 *  - Scrolls internally when content is taller than the viewport (no page scroll needed)
 *  - Locks body scroll while open
 *  - Closes on Escape and on backdrop click
 *  - Renders through a portal to document.body so it is NOT affected by
 *    ancestor CSS transforms (e.g. the page's np-fade-in animation, which
 *    uses transform: translateY and would otherwise turn position:fixed
 *    into position:absolute relative to the transformed ancestor — causing
 *    the modal to be misplaced and require page scrolling).
 */
export function Modal({
  open,
  onClose,
  children,
  className,
  showCloseButton = true,
  backdropClass,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
  backdropClass?: string;
}) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  // Lock body scroll while open + close on Escape
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm",
        backdropClass
      )}
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      {/* Inner wrapper: centers when there's room, allows scroll when not */}
      <div className="min-h-full w-full flex items-start sm:items-center justify-center p-4">
        <div
          className={cn(
            "relative w-full max-h-[calc(100vh-2rem)] overflow-y-auto np-scroll rounded-2xl bg-card border border-border shadow-2xl np-fade-in",
            className
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {showCloseButton && (
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-10 grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
