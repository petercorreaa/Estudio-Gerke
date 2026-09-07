import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getDictionary } from "@/content";
// Server-only — see the note in src/content/index.ts.
import { getPublishedArticles } from "@/content/publications-loader";
import { Section, SectionTitle, Prose } from "@/components/ui";
import { PublicationsBrowser } from "@/components/publications/PublicationsBrowser";
import type { ArticleCardData } from "@/components/publications/ArticleCard";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { ui } = getDictionary(locale);
  return {
    title: ui.pages.publications.title,
    description: ui.pages.publications.description,
  };
}

export default async function PublicationsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { ui, practiceAreas, publicationLabels } = getDictionary(locale);

  const articles = getPublishedArticles(locale);

  const cardData: ArticleCardData[] = articles.map((article) => ({
    slug: article.slug,
    title: article.title,
    date: article.date,
    summary: article.summary,
    practiceAreaIds: article.practiceAreaIds,
    readingTime: article.readingTime,
    areaName: practiceAreas.find((a) => a.id === article.practiceAreaIds[0])?.name,
  }));

  // Only areas actually in use — an empty filter that always returns nothing
  // is worse than no filter at all — kept in the frozen 01-20 order.
  const usedAreaIds = new Set(articles.flatMap((a) => a.practiceAreaIds));
  const areas = practiceAreas
    .filter((area) => usedAreaIds.has(area.id))
    .map((area) => ({ id: area.id, name: area.name }));

  return (
    <>
      <Section tone="paper" className="pb-0">
        <SectionTitle level={1} eyebrow={ui.pages.publications.eyebrow} marker>
          {ui.pages.publications.title}
        </SectionTitle>
        <Prose lead className="mt-6">
          {ui.pages.publications.lead}
        </Prose>
      </Section>

      <Section tone="paper">
        <PublicationsBrowser
          articles={cardData}
          areas={areas}
          locale={locale}
          labels={{
            readMore: ui.actions.readMore,
            readingTime: publicationLabels.readingTime,
            filterAllLabel: publicationLabels.filterAllLabel,
            searchLabel: publicationLabels.searchLabel,
            searchPlaceholder: publicationLabels.searchPlaceholder,
            emptyStateTitle: publicationLabels.emptyStateTitle,
            emptyStateBody: publicationLabels.emptyStateBody,
            clearFilters: publicationLabels.clearFilters,
            filterGroupLabel: publicationLabels.filterGroupLabel,
          }}
        />
      </Section>
    </>
  );
}
