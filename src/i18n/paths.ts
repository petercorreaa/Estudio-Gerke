import { practiceAreas } from "@/content/practice-areas";
import { lawyers } from "@/content/lawyers";
import { publicationTranslations } from "@/content/publications-translations";
import { getPathname } from "./navigation";
import { pathnames, type AppPathname, type Locale } from "./routing";

/**
 * Translating the CURRENT url into the other language.
 *
 * `pathnames` in routing.ts handles the static segments. What it cannot handle
 * is the value inside a dynamic segment: `/es/areas-de-practica/mineria` has to
 * become `/en/practice-areas/mining`, not `/en/practice-areas/mineria`. These
 * helpers close that gap so the language switcher always lands on the same
 * page, never the home page.
 */

/** An internal href, ready to hand to `getPathname` / `<Link>`. */
export type InternalHref =
  | { pathname: Exclude<AppPathname, `${string}[slug]`> }
  | { pathname: "/practice-areas/[slug]"; params: { slug: string } }
  | { pathname: "/lawyers/[slug]"; params: { slug: string } }
  | { pathname: "/publications/[slug]"; params: { slug: string } };

const staticPathnames = Object.keys(pathnames).filter(
  (key): key is Exclude<AppPathname, `${string}[slug]`> =>
    !key.includes("[slug]"),
);

function isStaticPathname(
  value: string,
): value is Exclude<AppPathname, `${string}[slug]`> {
  return (staticPathnames as readonly string[]).includes(value);
}

/** Practice-area slug in `from` -> the same area's slug in `to`. */
export function translatePracticeAreaSlug(
  slug: string,
  from: Locale,
  to: Locale,
): string | undefined {
  return practiceAreas.find((area) => area.slug[from] === slug)?.slug[to];
}

export function findPracticeAreaBySlug(slug: string, locale: Locale) {
  return practiceAreas.find((area) => area.slug[locale] === slug);
}

/** Article slug in `from` -> the translationKey it belongs to, if any. */
function findArticleTranslationKey(slug: string, from: Locale): string | undefined {
  return Object.entries(publicationTranslations).find(([, entry]) => entry[from] === slug)?.[0];
}

/**
 * Article slug in `from` -> the same article's slug in `to`. Unlike the other
 * translators here, this never signals "no counterpart" with `undefined`: if
 * the article hasn't been written in `to` yet, it resolves to the
 * publications index in that language instead, the switcher must never
 * point at a 404.
 */
export function translateArticleHref(slug: string, from: Locale, to: Locale): InternalHref {
  const key = findArticleTranslationKey(slug, from);
  const targetSlug = key ? publicationTranslations[key][to] : undefined;
  return targetSlug
    ? { pathname: "/publications/[slug]", params: { slug: targetSlug } }
    : { pathname: "/publications" };
}

/**
 * Maps an internal pathname to the equivalent internal href in `to`.
 *
 * `pathname` is what next-intl's `usePathname()` returns: the internal route
 * with locale and localized static segments already stripped. Depending on the
 * route it may still carry either the resolved slug (`/lawyers/diana`) or the
 * template (`/lawyers/[slug]`), so `slug` (read from `useParams()`) is
 * accepted as a fallback.
 *
 * Returns `undefined` when the route has no counterpart, which the caller
 * should treat as "link to the home page instead".
 */
export function getAlternateHref(
  pathname: string,
  from: Locale,
  to: Locale,
  slug?: string,
): InternalHref | undefined {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return { pathname: "/" };
  }

  const [head, tail] = segments;
  const value = tail === "[slug]" ? slug : tail;

  if (head === "practice-areas" && value) {
    const translated = translatePracticeAreaSlug(value, from, to);
    return translated
      ? { pathname: "/practice-areas/[slug]", params: { slug: translated } }
      : undefined;
  }

  if (head === "lawyers" && value) {
    // A person's name is not translated, so the slug is locale-independent.
    return lawyers.some((lawyer) => lawyer.slug === value)
      ? { pathname: "/lawyers/[slug]", params: { slug: value } }
      : undefined;
  }

  if (head === "publications" && value) {
    return translateArticleHref(value, from, to);
  }

  const candidate = `/${segments.join("/")}`;
  return isStaticPathname(candidate) ? { pathname: candidate } : undefined;
}

/** The full, locale-prefixed URL for the other language. */
export function getAlternateUrl(
  pathname: string,
  from: Locale,
  to: Locale,
  slug?: string,
): string {
  const href = getAlternateHref(pathname, from, to, slug);
  return getPathname({ href: href ?? { pathname: "/" }, locale: to });
}
