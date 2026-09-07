import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type EyebrowProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

/**
 * Small uppercase label above a title.
 * 700 · 0.75rem · 0.18em tracking · brand-ink (6.71:1). See DESIGN.md §2.
 */
export function Eyebrow({ as: Tag = "p", className, children }: EyebrowProps) {
  return <Tag className={cn("u-eyebrow", className)}>{children}</Tag>;
}

export default Eyebrow;
