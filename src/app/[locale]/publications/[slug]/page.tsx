import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getDictionary, getLawyerBySlug, format } from "@/content";
// Server-only — see the note in src/content/index.ts.
import { getArticleBySlug, getPublishedArticles, getRelatedArticles } from "@/content/publications-loader";
import type { ArticleFrontmatter } from "@/content/publications-loader";
import { Section, Eyebrow, Button, BracketFrame, Prose } from "@/components/ui";
import { ArticleCard } from "@/components/publications/ArticleCard";
import { mdxComponents } from "@/components/mdx-components";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { site } from "@/content/site";

type Params = { locale: Locale; slug: string };

function resolveAuthorName(author: string): string {
  if (author === "Estudio Jurídico Gerke") return author;
  const lawyer = getLawyerBySlug(author);
  return lawyer ? lawyer.name : author;
}

function formatDate(date: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "es" ? "es-BO" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function generateStaticParams({ params }: { params: { locale: string } }) {
  const locale = hasLocale(routing.locales, params.locale) ? params.locale : routing.defaultLocale;
  return getPublishedArticles(locale).map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticleBySlug(locale, slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      type: "article",
      publishedTime: article.date,
      locale,
      authors: [resolveAuthorName(article.author)],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const article = getArticleBySlug(locale, slug);
  if (!article) notFound();

  const { ui, practiceAreas, publicationLabels } = getDictionary(locale);
  const authorName = resolveAuthorName(article.author);
  const relatedAreas = practiceAreas.filter((area) => article.practiceAreaIds.includes(area.id));
  const relatedArticles = getRelatedArticles(article, 3);

  const { content } = await compileMDX<ArticleFrontmatter>({
    source: article.content,
    components: mdxComponents,
    options: {
      mdxOptions: { remarkPlugins: [remarkGfm] },
    },
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    datePublished: article.date,
    inLanguage: locale,
    author:
      article.author === "Estudio Jurídico Gerke"
        ? { "@type": "Organization", name: article.author }
        : { "@type": "Person", name: authorName },
    publisher: { "@type": "Organization", name: site.name },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ==================================================== HEADER ======= */}
      <Section tone="paper" className="pb-0">
        {relatedAreas.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {relatedAreas.map((area) => (
              <Link
                key={area.id}
                href={{ pathname: "/practice-areas/[slug]", params: { slug: area.slug } }}
                className="inline-flex items-center rounded-bracket border border-brand-600 px-3 py-1 text-xs text-brand-ink transition-colors duration-200 ease-out hover:border-brand-700 hover:text-brand-900"
              >
                {area.name}
              </Link>
            ))}
          </div>
        ) : null}

        <h1 className="u-display u-h1 mt-4 max-w-[24ch] break-words">{article.title}</h1>

        <p className="mt-4 text-sm text-ink">
          <time dateTime={article.date}>{formatDate(article.date, locale)}</time>
          {" · "}
          {format(publicationLabels.byAuthor, { author: authorName })}
          {" · "}
          {format(publicationLabels.readingTime, { minutes: article.readingTime })}
        </p>
      </Section>

      {/* ====================================================== BODY ======= */}
      <Section tone="paper">
        <Prose>{content}</Prose>

        {article.pdfUrl ? (
          <div className="mt-8">
            {/* A trusted, author-supplied URL from frontmatter — not
                necessarily an internal route, so this bypasses <Button>'s
                typed href (internal route object | strict external template)
                and is styled to match its ghost variant directly. */}
            <a
              href={article.pdfUrl}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-bracket border-2 border-brand-700 px-6 py-3 text-sm font-medium uppercase tracking-[0.08em] text-brand-700 transition-colors duration-200 ease-out hover:bg-brand-700 hover:text-paper"
            >
              {publicationLabels.downloadPdf}
            </a>
          </div>
        ) : null}
      </Section>

      {/* ==================================================== FOOTER ======= */}
      <Section tone="alt">
        {relatedAreas.length > 0 ? (
          <div>
            <Eyebrow as="h2">{publicationLabels.relatedPracticeAreasHeading}</Eyebrow>
            <div className="mt-4 flex flex-wrap gap-2">
              {relatedAreas.map((area) => (
                <Link
                  key={area.id}
                  href={{ pathname: "/practice-areas/[slug]", params: { slug: area.slug } }}
                  className="inline-flex items-center rounded-bracket border border-brand-600 px-3 py-1.5 text-sm text-brand-ink transition-colors duration-200 ease-out hover:border-brand-700 hover:text-brand-900"
                >
                  {area.name}
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        <BracketFrame openSide="right" className="mt-10 p-6 lg:p-8">
          <p className="u-display u-h3">{publicationLabels.consultCta}</p>
          <p className="u-body mt-3">{publicationLabels.consultCtaBody}</p>
          <Button
            className="mt-5"
            href={{ pathname: "/contact", query: { subject: article.title } }}
          >
            {publicationLabels.consultCta}
          </Button>
        </BracketFrame>

        {relatedArticles.length > 0 ? (
          <div className="mt-14">
            <Eyebrow as="h2">{publicationLabels.relatedArticlesHeading}</Eyebrow>
            <div className="mt-5 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {relatedArticles.map((related) => (
                <ArticleCard
                  key={related.slug}
                  locale={locale}
                  labels={{ readMore: ui.actions.readMore, readingTime: publicationLabels.readingTime }}
                  article={{
                    slug: related.slug,
                    title: related.title,
                    date: related.date,
                    summary: related.summary,
                    practiceAreaIds: related.practiceAreaIds,
                    readingTime: related.readingTime,
                    areaName: practiceAreas.find((a) => a.id === related.practiceAreaIds[0])?.name,
                  }}
                />
              ))}
            </div>
          </div>
        ) : null}
      </Section>
    </>
  );
}
