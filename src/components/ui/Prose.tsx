import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ProseProps = {
  as?: ElementType;
  /** Lead treatment: 300 weight, larger, 1.55 leading. */
  lead?: boolean;
  className?: string;
  children: ReactNode;
};

/**
 * Running copy: 68ch measure, #1A1A1A, 1.7 leading.
 * Body copy is never teal and never grey — CLAUDE.md rule 4.
 */
export function Prose({
  as: Tag = "div",
  lead = false,
  className,
  children,
}: ProseProps) {
  return (
    <Tag className={cn(lead ? "u-lead" : "u-prose", className)}>{children}</Tag>
  );
}

export default Prose;
