import { BracketFrame } from "@/components/ui";
import { Link } from "@/i18n/navigation";
import { format } from "@/content";
import type { Locale } from "@/i18n/routing";
import type { Article } from "@/content/publications-loader";

export interface ArticleCardData
  extends Pick<Article, "slug" | "title" | "date" | "summary" | "practiceAreaIds" | "readingTime"> {
  /** Resolved name of the first matching practice area, if any. */
  areaName?: string;
}

export interface ArticleCardLabels {
  readonly readMore: string;
  /** "{minutes} min de lectura" / "{minutes} min read" — templated with format(). */
  readonly readingTime: string;
}

function formatDate(date: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "es" ? "es-BO" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

/**
 * The standard (non-featured) article card. The featured treatment on the
 * index page is a distinct layout, not a size variant of this one — see
 * PublicationsBrowser.
 */
export function ArticleCard({
  article,
  locale,
  labels,
  headingLevel = 3,
}: {
  article: ArticleCardData;
  locale: Locale;
  labels: ArticleCardLabels;
  /** 3 when nested under a featured article's h2; 2 when this card is the
   * first subheading after the page's h1 (e.g. a filtered result grid with
   * no featured article) — callers must not let a bare h3 follow the h1. */
  headingLevel?: 2 | 3;
}) {
  const TitleTag = headingLevel === 2 ? "h2" : "h3";

  return (
    <BracketFrame openSide="right" className="flex h-full flex-col p-6">
      <p className="text-xs text-brand-ink">
        <time dateTime={article.date}>{formatDate(article.date, locale)}</time>
        {article.areaName ? ` · ${article.areaName}` : null}
      </p>
      <TitleTag className="mt-3 u-display text-lg leading-snug">{article.title}</TitleTag>
      <p className="mt-3 line-clamp-3 flex-1 text-sm text-ink">{article.summary}</p>
      <div className="mt-5 flex items-center justify-between gap-3">
        <Link
          href={{ pathname: "/publications/[slug]", params: { slug: article.slug } }}
          className="inline-flex w-fit items-center gap-1 text-sm font-medium text-brand-ink transition-colors duration-200 ease-out hover:text-brand-900"
        >
          {labels.readMore}
        </Link>
        <span className="shrink-0 text-xs text-ink/70">
          {format(labels.readingTime, { minutes: article.readingTime })}
        </span>
      </div>
    </BracketFrame>
  );
}

export default ArticleCard;
