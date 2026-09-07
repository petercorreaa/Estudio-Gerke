import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";
import { BracketFrame } from "./BracketFrame";

type SectionTitleProps = {
  /** Heading level. Drives both the tag and the type size. */
  level?: 1 | 2 | 3;
  /** Optional small label rendered above the title. */
  eyebrow?: ReactNode;
  /** Render the bracket motif as a marker above the block. */
  marker?: boolean;
  /** brand = #14413E (default), ink = #1A1A1A. Both are display-safe. */
  color?: "brand" | "ink";
  id?: string;
  className?: string;
  children: ReactNode;
};

const sizeClasses = {
  1: "u-h1",
  2: "u-h2",
  3: "u-h3",
} as const;

const tags = {
  1: "h1",
  2: "h2",
  3: "h3",
} as const;

/**
 * Display heading: 700 · uppercase · 0.06em tracking · 1.05 leading.
 * See DESIGN.md §2.
 */
export function SectionTitle({
  level = 2,
  eyebrow,
  marker = false,
  color = "brand",
  id,
  className,
  children,
}: SectionTitleProps) {
  const Tag = tags[level];

  return (
    <div className={cn("flex flex-col", className)}>
      {marker ? <BracketFrame variant="marker" className="mb-5" /> : null}
      {eyebrow ? <Eyebrow className="mb-3">{eyebrow}</Eyebrow> : null}
      <Tag
        id={id}
        className={cn(
          "u-display",
          sizeClasses[level],
          color === "ink" && "text-ink",
        )}
      >
        {children}
      </Tag>
    </div>
  );
}

export default SectionTitle;
