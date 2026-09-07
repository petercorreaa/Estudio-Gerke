import { cn } from "@/lib/cn";

type HairlineProps = {
  /** `full` spans the container; `short` is a 4rem rule used under headings. */
  variant?: "full" | "short";
  /** Use on brand-900 bands. */
  onDark?: boolean;
  className?: string;
};

/**
 * 1px divider in neutral-500 — the one sanctioned use of that color.
 * It never carries text. See DESIGN.md §1.
 */
export function Hairline({
  variant = "full",
  onDark = false,
  className,
}: HairlineProps) {
  return (
    <hr
      className={cn(
        "border-0 border-t border-solid",
        onDark ? "border-paper/30" : "border-neutral-500",
        variant === "short" ? "w-16" : "w-full",
        className,
      )}
    />
  );
}

export default Hairline;
