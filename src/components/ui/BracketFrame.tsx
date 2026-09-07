import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type BracketSide = "left" | "right" | "top" | "bottom" | "none";
export type BracketTone = "brand" | "dark" | "muted";

type BracketFrameProps = {
  as?: ElementType;
  /** Which side of the frame stays open. `none` closes the frame entirely. */
  openSide?: BracketSide;
  tone?: BracketTone;
  /** `frame` wraps content; `marker` is a standalone section mark. */
  variant?: "frame" | "marker";
  className?: string;
  children?: ReactNode;
};

/**
 * The firm's logo motif: a 2px rounded rule that opens on one side.
 *
 * Use it deliberately, not decoratively — one bracket per idea, never nested,
 * never on every card in a grid. See CLAUDE.md and DESIGN.md §4.
 */

const toneClasses: Record<BracketTone, string> = {
  brand: "border-brand-600",
  dark: "border-paper",
  muted: "border-neutral-500",
};

/** The open side drops its rule; the adjacent corners stay rounded. */
const openSideClasses: Record<BracketSide, string> = {
  none: "border-2",
  left: "border-y-2 border-r-2 border-l-0 rounded-l-none",
  right: "border-y-2 border-l-2 border-r-0 rounded-r-none",
  top: "border-x-2 border-b-2 border-t-0 rounded-t-none",
  bottom: "border-x-2 border-t-2 border-b-0 rounded-b-none",
};

/** The marker is the bracket reduced to a single corner. */
const markerClasses: Record<BracketSide, string> = {
  none: "h-4 w-10 border-2 rounded-bracket",
  left: "h-4 w-10 border-t-2 border-r-2 rounded-tr-bracket",
  right: "h-4 w-10 border-t-2 border-l-2 rounded-tl-bracket",
  top: "h-4 w-10 border-b-2 border-l-2 rounded-bl-bracket",
  bottom: "h-4 w-10 border-t-2 border-l-2 rounded-tl-bracket",
};

export function BracketFrame({
  as: Tag = "div",
  openSide = "right",
  tone = "brand",
  variant = "frame",
  className,
  children,
}: BracketFrameProps) {
  if (variant === "marker") {
    return (
      <Tag
        aria-hidden="true"
        className={cn(
          "block shrink-0 border-solid",
          toneClasses[tone],
          markerClasses[openSide],
          className,
        )}
      />
    );
  }

  return (
    <Tag
      className={cn(
        "rounded-bracket border-solid",
        toneClasses[tone],
        openSideClasses[openSide],
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export default BracketFrame;
