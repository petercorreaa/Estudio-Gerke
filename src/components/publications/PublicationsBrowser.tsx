"use client";

import { useMemo, useState } from "react";
import { BracketFrame, Button } from "@/components/ui";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { format } from "@/content";
import { ArticleCard, type ArticleCardData, type ArticleCardLabels } from "./ArticleCard";
import type { Locale } from "@/i18n/routing";

interface BrowserArea {
  readonly id: string;
  readonly name: string;
}

interface BrowserLabels extends ArticleCardLabels {
  readonly filterAllLabel: string;
  readonly searchLabel: string;
  readonly searchPlaceholder: string;
  readonly emptyStateTitle: string;
  readonly emptyStateBody: string;
  readonly clearFilters: string;
  readonly filterGroupLabel: string;
}

export function PublicationsBrowser({
  articles,
  areas,
  locale,
  labels,
}: {
  articles: readonly ArticleCardData[];
  /** Only the areas actually used by at least one article — see the page. */
  areas: readonly BrowserArea[];
  locale: Locale;
  labels: BrowserLabels;
}) {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const isUnfiltered = selectedArea === null && query.trim() === "";

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((article) => {
      const matchesArea = !selectedArea || article.practiceAreaIds.some((id) => id === selectedArea);
      const matchesQuery =
        !q || article.title.toLowerCase().includes(q) || article.summary.toLowerCase().includes(q);
      return matchesArea && matchesQuery;
    });
  }, [articles, selectedArea, query]);

  const [featured, ...rest] = filtered;
  const showFeatured = isUnfiltered && featured !== undefined;
  const gridArticles = showFeatured ? rest : filtered;

  function clearFilters() {
    setSelectedArea(null);
    setQuery("");
  }

  return (
    <div>
      {/* ------------------------------------------------------- filter bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div
          role="group"
          aria-label={labels.filterGroupLabel}
          className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:flex-wrap sm:overflow-visible"
        >
          <button
            type="button"
            aria-pressed={selectedArea === null}
            onClick={() => setSelectedArea(null)}
            className={cn(
              "inline-flex min-h-11 shrink-0 items-center rounded-bracket border px-3 py-1.5 text-sm transition-colors duration-200 ease-out",
              selectedArea === null
                ? "border-brand-700 bg-brand-700 text-paper"
                : "border-neutral-500 text-ink hover:border-brand-700 hover:text-brand-900",
            )}
          >
            {labels.filterAllLabel}
          </button>
          {areas.map((area) => {
            const active = selectedArea === area.id;
            return (
              <button
                key={area.id}
                type="button"
                aria-pressed={active}
                onClick={() => setSelectedArea(active ? null : area.id)}
                className={cn(
                  "inline-flex min-h-11 shrink-0 items-center rounded-bracket border px-3 py-1.5 text-sm transition-colors duration-200 ease-out",
                  active
                    ? "border-brand-700 bg-brand-700 text-paper"
                    : "border-neutral-500 text-ink hover:border-brand-700 hover:text-brand-900",
                )}
              >
                {area.name}
              </button>
            );
          })}
        </div>

        <div className="shrink-0 sm:w-64">
          <label htmlFor="publications-search" className="sr-only">
            {labels.searchLabel}
          </label>
          <input
            id="publications-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={labels.searchPlaceholder}
            className="min-h-11 w-full rounded-bracket border border-neutral-500 bg-paper px-4 py-2 text-sm text-ink outline-none transition-colors duration-200 ease-out placeholder:text-ink/70 focus:border-2 focus:border-brand-700"
          />
        </div>
      </div>

      {/* ------------------------------------------------------------ results */}
      {filtered.length === 0 ? (
        <div className="mt-16 flex flex-col items-center gap-4 text-center">
          <p className="u-display u-h3">{labels.emptyStateTitle}</p>
          <p className="u-body">{labels.emptyStateBody}</p>
          <Button variant="ghost" onClick={clearFilters} type="button">
            {labels.clearFilters}
          </Button>
        </div>
      ) : (
        <>
          {showFeatured ? (
            <Link
              href={{ pathname: "/publications/[slug]", params: { slug: featured.slug } }}
              className="group mt-10 block"
            >
              <BracketFrame
                openSide="right"
                className="flex flex-col gap-6 p-6 transition-colors duration-200 ease-out group-hover:border-brand-700 lg:flex-row lg:items-start lg:gap-10 lg:p-10"
              >
                <div className="lg:w-5/12">
                  <p className="text-xs text-brand-ink">
                    <time dateTime={featured.date}>
                      {new Intl.DateTimeFormat(locale === "es" ? "es-BO" : "en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }).format(new Date(featured.date))}
                    </time>
                    {featured.areaName ? ` · ${featured.areaName}` : null}
                  </p>
                  <h2 className="mt-3 u-display u-h3">{featured.title}</h2>
                </div>
                <div className="lg:w-7/12">
                  <p className="u-body">{featured.summary}</p>
                  <div className="mt-5 flex items-center gap-3">
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-ink transition-colors duration-200 ease-out group-hover:text-brand-900">
                      {labels.readMore}
                    </span>
                    <span className="text-xs text-ink/70">
                      {format(labels.readingTime, { minutes: featured.readingTime })}
                    </span>
                  </div>
                </div>
              </BracketFrame>
            </Link>
          ) : null}

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {gridArticles.map((article) => (
              <ArticleCard
                key={article.slug}
                article={article}
                locale={locale}
                labels={labels}
                headingLevel={showFeatured ? 3 : 2}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default PublicationsBrowser;
