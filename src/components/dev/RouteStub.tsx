import type { ReactNode } from "react";
import { Section, SectionTitle, Prose } from "@/components/ui";

/**
 * TEMPORARY. Placeholder body for a route that exists but has no page design
 * yet. Renders the route's title and meta description so the slug map and
 * layout shell can be exercised end to end.
 *
 * Delete this component — and the whole `components/dev/` folder — as each
 * real page lands. It renders no `<main>` of its own; the locale layout
 * supplies the single sitewide `<main id="main-content">` landmark.
 */
export function RouteStub({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <Section>
      <SectionTitle level={1} eyebrow={eyebrow} marker>
        {title}
      </SectionTitle>
      <Prose lead className="mt-6">
        {description}
      </Prose>
      {children}
    </Section>
  );
}

export default RouteStub;
