import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getDictionary } from "@/content";
import { Section, SectionTitle, Prose } from "@/components/ui";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { ui } = getDictionary(locale);
  return {
    title: ui.pages.practiceAreas.title,
    description: ui.pages.practiceAreas.description,
  };
}

export default async function PracticeAreasPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { ui, practiceAreas } = getDictionary(locale);

  return (
    <>
      <Section tone="paper" className="pb-0">
        <SectionTitle level={1} eyebrow={ui.pages.practiceAreas.eyebrow} marker>
          {ui.pages.practiceAreas.title}
        </SectionTitle>
        <Prose lead className="mt-6">
          {ui.pages.practiceAreas.lead}
        </Prose>
      </Section>

      {/* The 20 areas — the hero of this page. CSS multi-column (not grid) so
          reading order stays 01->20 top-to-bottom within a column, then wraps
          to the next column, rather than interleaving left-right. */}
      <Section tone="paper">
        <ol aria-label={ui.aria.practiceAreaList} className="list-none xl:columns-2 xl:gap-x-16">
          {practiceAreas.map((area) => (
            <li key={area.id} className="break-inside-avoid">
              <Link
                href={{ pathname: "/practice-areas/[slug]", params: { slug: area.slug } }}
                className="group relative isolate flex min-h-16 flex-col justify-center gap-1 border-b border-neutral-500 px-4 py-4 transition-colors duration-[180ms] ease-out hover:bg-paper-alt lg:flex-row lg:items-center lg:gap-5"
              >
                {/* Bracket tick at the left edge, on hover. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-0 top-1/2 h-7 w-2 -translate-y-1/2 rounded-l-bracket border-y-2 border-l-2 border-brand-600 opacity-0 transition-opacity duration-[180ms] ease-out group-hover:opacity-100"
                />

                <span
                  aria-hidden="true"
                  className="u-num shrink-0 text-2xl transition-colors duration-[180ms] ease-out group-hover:text-brand-700"
                >
                  {area.index}
                </span>

                <span aria-hidden="true" className="hidden h-8 w-px shrink-0 bg-neutral-500 lg:block" />

                <span className="min-w-0 flex-1">
                  <span className="block font-medium uppercase tracking-[0.02em] text-ink break-words">
                    {area.name}
                  </span>
                  {/* Always visible on mobile (grid-rows-[1fr] default);
                      collapses and reveals on hover/focus at >=1024px. */}
                  <span className="u-row-reveal grid grid-rows-[1fr] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] lg:group-focus-visible:grid-rows-[1fr]">
                    <span className="min-h-0 overflow-hidden">
                      <span className="mt-1 block text-sm text-ink">{area.description}</span>
                    </span>
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
