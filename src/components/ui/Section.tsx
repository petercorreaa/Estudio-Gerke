import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

export type SectionTone = "paper" | "alt" | "dark";

type SectionProps = {
  as?: ElementType;
  /** paper = white, alt = #FAFAF8 band, dark = brand-900 band with white copy. */
  tone?: SectionTone;
  /** Set false to lay out the section's own container. */
  contained?: boolean;
  id?: string;
  className?: string;
  /** Applied to the inner Container when `contained`. */
  innerClassName?: string;
  children: ReactNode;
};

const toneClasses: Record<SectionTone, string> = {
  paper: "bg-paper text-ink",
  alt: "bg-paper-alt text-ink",
  dark: "bg-brand-900 u-on-dark",
};

/**
 * Vertical rhythm band: clamp(4rem, 9vw, 8rem) top and bottom. See DESIGN.md §3.
 */
export function Section({
  as: Tag = "section",
  tone = "paper",
  contained = true,
  id,
  className,
  innerClassName,
  children,
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn("py-section", toneClasses[tone], className)}
    >
      {contained ? (
        <Container className={innerClassName}>{children}</Container>
      ) : (
        children
      )}
    </Tag>
  );
}

export default Section;
