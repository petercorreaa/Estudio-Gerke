import { defineRouting } from "next-intl/routing";
import type { Pathnames } from "next-intl/routing";

export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale = "es" satisfies Locale;

/**
 * The slug map.
 *
 * Keys are the *internal* pathnames — they match the directory names under
 * `src/app/[locale]/`. Values are what the visitor actually sees, per locale.
 * Because both languages describe the same internal route, the language
 * switcher can translate the current URL instead of falling back to the home
 * page. Foreign clients use that switcher constantly; landing them on the home
 * page each time is the failure mode this map exists to prevent.
 *
 * Adding a route means adding it here in BOTH languages (CLAUDE.md rule 6).
 * Unlisted paths — `/styleguide` — pass through unchanged.
 *
 * Slugs inside dynamic segments are localized too, but in the content layer:
 * see `practiceAreas[].slug` and `src/i18n/paths.ts`.
 */
export const pathnames = {
  "/": "/",
  "/firm-profile": {
    es: "/perfil-del-estudio",
    en: "/firm-profile",
  },
  "/practice-areas": {
    es: "/areas-de-practica",
    en: "/practice-areas",
  },
  "/practice-areas/[slug]": {
    es: "/areas-de-practica/[slug]",
    en: "/practice-areas/[slug]",
  },
  "/lawyers": {
    es: "/abogados",
    en: "/lawyers",
  },
  "/lawyers/[slug]": {
    es: "/abogados/[slug]",
    en: "/lawyers/[slug]",
  },
  "/publications": {
    es: "/publicaciones",
    en: "/publications",
  },
  "/publications/[slug]": {
    es: "/publicaciones/[slug]",
    en: "/publications/[slug]",
  },
  "/contact": {
    es: "/contacto",
    en: "/contact",
  },
  "/legal-notice": {
    es: "/aviso-legal",
    en: "/legal-notice",
  },
  // TEMPORARY — the design-system review route. Same path in both languages.
  // Remove this entry together with the route before launch.
  "/styleguide": "/styleguide",
} as const satisfies Pathnames<typeof locales>;

export type AppPathname = keyof typeof pathnames;

/**
 * Spanish is the default: the firm is in La Paz and its Bolivian clients read
 * Spanish first. English is a peer, not a fallback — CLAUDE.md rule 6 requires
 * every page to exist in both languages at equal quality.
 *
 * `localeDetection: false` makes `/` redirect to `/es` for everyone, rather
 * than routing on Accept-Language. Flip it to `true` if the firm would rather
 * greet English-speaking visitors in English.
 */
export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "always",
  localeDetection: false,
  pathnames,
});
