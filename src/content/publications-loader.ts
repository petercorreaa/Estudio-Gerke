import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { practiceAreas, type PracticeAreaId } from "./practice-areas";
import { lawyers } from "./lawyers";
import { publicationTranslations } from "./publications-translations";
import type { Locale } from "./types";

/**
 * The MDX content pipeline, server-only (reads the filesystem via `fs`).
 * Never import this from a "use client" file; see `publications-translations.ts`
 * for the client-safe alternative used by the language switcher.
 *
 * Every file under src/content/publications/{es,en}/*.mdx is parsed and its
 * frontmatter strictly validated when this module first loads. A malformed
 * file, a missing field, a bad date, an unknown practice area id, a
 * translationKey that disagrees with publications-translations.ts, throws,
 * which fails `next build` rather than shipping bad content.
 */

const CONTENT_ROOT = path.join(process.cwd(), "src/content/publications");
const LOCALES: readonly Locale[] = ["es", "en"];
const VALID_AREA_IDS = new Set<string>(practiceAreas.map((a) => a.id));
const VALID_AUTHORS = new Set<string>([...lawyers.map((l) => l.slug), "Estudio Jurídico Gerke"]);

export type ArticleStatus = "draft" | "published";

export interface ArticleFrontmatter {
  readonly title: string;
  readonly slug: string;
  readonly date: string;
  readonly locale: Locale;
  readonly practiceAreaIds: readonly PracticeAreaId[];
  readonly summary: string;
  readonly author: string;
  /** Minutes. */
  readonly readingTime: number;
  readonly translationKey: string;
  readonly status: ArticleStatus;
  readonly pdfUrl?: string;
}

export interface Article extends ArticleFrontmatter {
  /** Raw MDX body (frontmatter already stripped), ready for compileMDX. */
  readonly content: string;
  readonly filePath: string;
}

function fail(filePath: string, message: string): never {
  throw new Error(`[publications] ${path.relative(process.cwd(), filePath)}: ${message}`);
}

function requireString(data: Record<string, unknown>, field: string, filePath: string): string {
  const value = data[field];
  if (typeof value !== "string" || value.trim() === "") {
    fail(filePath, `"${field}" must be a non-empty string`);
  }
  return value as string;
}

function validateFrontmatter(data: Record<string, unknown>, filePath: string): ArticleFrontmatter {
  const title = requireString(data, "title", filePath);

  const slug = requireString(data, "slug", filePath);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
    fail(filePath, `"slug" must be lowercase kebab-case, got "${slug}"`);
  }

  const date = requireString(data, "date", filePath);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date))) {
    fail(filePath, `"date" must be an ISO date (YYYY-MM-DD), got "${date}"`);
  }

  const locale = requireString(data, "locale", filePath);
  if (locale !== "es" && locale !== "en") {
    fail(filePath, `"locale" must be "es" or "en", got "${locale}"`);
  }

  const practiceAreaIdsRaw = data.practiceAreaIds;
  if (!Array.isArray(practiceAreaIdsRaw) || practiceAreaIdsRaw.length === 0) {
    fail(filePath, `"practiceAreaIds" must be a non-empty array`);
  }
  for (const id of practiceAreaIdsRaw) {
    if (typeof id !== "string" || !VALID_AREA_IDS.has(id)) {
      fail(filePath, `unknown practice area id "${String(id)}" in "practiceAreaIds"`);
    }
  }

  const summary = requireString(data, "summary", filePath);
  if (summary.length > 200) {
    fail(filePath, `"summary" must be at most 200 characters, got ${summary.length}`);
  }

  const author = requireString(data, "author", filePath);
  if (!VALID_AUTHORS.has(author)) {
    fail(
      filePath,
      `unknown "author" "${author}": must be a lawyer slug from lawyers.ts or "Estudio Jurídico Gerke"`,
    );
  }

  const readingTime = data.readingTime;
  if (typeof readingTime !== "number" || !Number.isFinite(readingTime) || readingTime <= 0) {
    fail(filePath, `"readingTime" must be a positive number (minutes)`);
  }

  const translationKey = requireString(data, "translationKey", filePath);

  const status = requireString(data, "status", filePath);
  if (status !== "draft" && status !== "published") {
    fail(filePath, `"status" must be "draft" or "published", got "${status}"`);
  }

  let pdfUrl: string | undefined;
  if (data.pdfUrl !== undefined) {
    pdfUrl = requireString(data, "pdfUrl", filePath);
  }

  return {
    title,
    slug,
    date,
    locale,
    practiceAreaIds: practiceAreaIdsRaw as PracticeAreaId[],
    summary,
    author,
    readingTime,
    translationKey,
    status,
    pdfUrl,
  };
}

function loadArticlesFromDisk(): Article[] {
  const articles: Article[] = [];

  for (const locale of LOCALES) {
    const dir = path.join(CONTENT_ROOT, locale);
    if (!fs.existsSync(dir)) continue;

    for (const filename of fs.readdirSync(dir)) {
      if (!filename.endsWith(".mdx")) continue;
      const filePath = path.join(dir, filename);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);

      const frontmatter = validateFrontmatter(data as Record<string, unknown>, filePath);
      if (frontmatter.locale !== locale) {
        fail(
          filePath,
          `frontmatter "locale" is "${frontmatter.locale}" but the file lives in the "${locale}" directory`,
        );
      }

      articles.push({ ...frontmatter, content: content.trim(), filePath });
    }
  }

  // Duplicate slugs within a locale would make two pages fight for one route.
  const seenSlugs = new Set<string>();
  for (const article of articles) {
    const key = `${article.locale}:${article.slug}`;
    if (seenSlugs.has(key)) {
      fail(article.filePath, `duplicate slug "${article.slug}" already used in locale "${article.locale}"`);
    }
    seenSlugs.add(key);
  }

  // Cross-check against the client-safe translation manifest so the two
  // never drift silently.
  for (const article of articles) {
    const entry = publicationTranslations[article.translationKey];
    if (!entry) {
      fail(
        article.filePath,
        `translationKey "${article.translationKey}" has no entry in publications-translations.ts`,
      );
    }
    if (entry[article.locale] !== article.slug) {
      fail(
        article.filePath,
        `publications-translations.ts lists "${entry[article.locale]}" for ` +
          `${article.translationKey}.${article.locale}, but this file's slug is "${article.slug}"`,
      );
    }
  }

  return articles;
}

let cache: Article[] | null = null;

/**
 * Cached in production, where content is frozen at build time and every hit
 * would otherwise re-read and re-parse every file. Never cached in
 * development, so editing an .mdx file is reflected on the next request
 * instead of needing a dev-server restart.
 */
function allArticles(): Article[] {
  if (process.env.NODE_ENV !== "production") return loadArticlesFromDisk();
  if (!cache) cache = loadArticlesFromDisk();
  return cache;
}

/**
 * `next build` runs with NODE_ENV=production for the whole build, so this
 * also governs generateStaticParams, draft articles get neither a static
 * page nor an on-demand fallback in production. In development, drafts are
 * visible so they can be reviewed before publication.
 */
function isVisible(article: Article): boolean {
  return process.env.NODE_ENV !== "production" || article.status === "published";
}

/** Newest first. */
export function getPublishedArticles(locale: Locale): Article[] {
  return allArticles()
    .filter((a) => a.locale === locale && isVisible(a))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getArticleBySlug(locale: Locale, slug: string): Article | undefined {
  const article = allArticles().find((a) => a.locale === locale && a.slug === slug);
  return article && isVisible(article) ? article : undefined;
}

/** The same article in the other language, if it has been written yet. */
export function getArticleTranslation(article: Pick<Article, "locale" | "translationKey">): Article | undefined {
  const otherLocale: Locale = article.locale === "es" ? "en" : "es";
  return allArticles().find(
    (a) => a.locale === otherLocale && a.translationKey === article.translationKey && isVisible(a),
  );
}

/** Other published articles sharing at least one practice area, newest first. */
export function getRelatedArticles(article: Pick<Article, "slug" | "locale" | "practiceAreaIds">, count: number): Article[] {
  return getPublishedArticles(article.locale)
    .filter((a) => a.slug !== article.slug)
    .filter((a) => a.practiceAreaIds.some((id) => article.practiceAreaIds.includes(id)))
    .slice(0, count);
}
