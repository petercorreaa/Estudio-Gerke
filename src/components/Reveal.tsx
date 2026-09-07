"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type RevealProps = {
  as?: ElementType;
  /** Stagger in ms. Keep small — total motion must stay under 400ms. */
  delay?: number;
  className?: string;
  children: ReactNode;
};

/**
 * revealOnScroll — the ONLY animation in this system.
 *
 * opacity 0 -> 1, translateY 12px -> 0, 360ms ease-out, fired once via
 * IntersectionObserver, fully disabled under prefers-reduced-motion: reduce.
 *
 * Do not add a second motion utility. See CLAUDE.md rule 2 and DESIGN.md §5.
 */
export function Reveal({
  as: Tag = "div",
  delay = 0,
  className,
  children,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.01 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn("reveal", visible && "is-visible", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

export default Reveal;
