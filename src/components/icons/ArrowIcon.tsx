/** Used by prev/next navigation (practice areas, lawyers). */
export function ArrowIcon({
  direction,
  className,
}: {
  direction: "left" | "right";
  className?: string;
}) {
  const d = direction === "left" ? "M19 12H6M12 5l-7 7 7 7" : "M5 12h13M13 5l7 7-7 7";
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true" className={className}>
      <path d={d} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default ArrowIcon;
