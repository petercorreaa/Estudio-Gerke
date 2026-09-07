import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

/**
 * Centered 1200px wrapper with the responsive side padding
 * (1.25rem mobile / 2.5rem from md up). See DESIGN.md §3.
 */
export function Container({
  as: Tag = "div",
  className,
  children,
}: ContainerProps) {
  return <Tag className={cn("u-container", className)}>{children}</Tag>;
}

export default Container;
