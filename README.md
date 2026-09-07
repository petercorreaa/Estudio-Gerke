# Estudio Jurídico Gerke

Website for a boutique law firm in La Paz, Bolivia, founded 1971.

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · next-intl · Ubuntu ·
MDX (gray-matter + next-mdx-remote).

## Read first

- **[CLAUDE.md](CLAUDE.md)** — the client's hard rules. Non-negotiable.
- **[DESIGN.md](DESIGN.md)** — the design system. Every token, type step,
  component and motion rule.

Both are the permanent source of truth. Any change to the site must respect
them, and any change to the system must update them first.

## Develop

```bash
npm run dev     # http://localhost:3000 -> /es
npm run build
npm run lint
```

## Routes

Every route lives under `src/app/[locale]/` and is reachable in both languages
under a localized slug. `/` redirects to `/es`.

| Internal route | Spanish | English |
| --- | --- | --- |
| `/` | `/es` | `/en` |
| `/firm-profile` | `/es/perfil-del-estudio` | `/en/firm-profile` |
| `/practice-areas` | `/es/areas-de-practica` | `/en/practice-areas` |
| `/practice-areas/[slug]` | `/es/areas-de-practica/mineria` | `/en/practice-areas/mining` |
| `/lawyers` | `/es/abogados` | `/en/lawyers` |
| `/lawyers/[slug]` | `/es/abogados/diana` | `/en/lawyers/diana` |
| `/publications` | `/es/publicaciones` | `/en/publications` |
| `/publications/[slug]` | `/es/publicaciones/arbitraje-comercial-en-bolivia` | `/en/publications/commercial-arbitration-in-bolivia` |
| `/contact` | `/es/contacto` | `/en/contact` |
| `/legal-notice` | `/es/aviso-legal` | `/en/legal-notice` |
| `/styleguide` | `/es/styleguide` | `/en/styleguide` — **temporary** |

The map lives in `src/i18n/routing.ts`. Practice-area slugs are localized in
the content layer, so the language switcher translates the slug too and never
falls back to the home page. Lawyer slugs are the same in both languages — a
person's name is not translated. Article slugs are independent per language,
linked only by `translationKey`; the switcher falls back to the *publications
index* in the other language (never a 404) when a translation doesn't exist
yet — see `translateArticleHref()` in `src/i18n/paths.ts`.

Built so far: home, firm profile, the practice-areas index + all 20 detail
pages, the lawyers index + all 9 profile pages, and publications (index +
article template). All 6 seed articles ship as `status: "draft"` — reviewed
in `npm run dev`, invisible in a production build until the firm approves
them and flips the flag. Everything else still renders through
`src/components/dev/RouteStub.tsx` — a placeholder body, not a designed page.
The site **shell** — header, footer, mobile nav — is real and wraps every
route via `src/app/[locale]/layout.tsx`, which owns the single
`<main id="main-content">` landmark; page components must not render their
own `<main>`.

## Layout

```
src/
  app/[locale]/        routes (layout.tsx wires the shell, font, intl provider)
  app/globals.css      the token layer — Tailwind v4 @theme + utilities
  content/             ALL site copy. site.ts, ui.ts, practice-areas.ts (the
                       frozen list), practice-area-details.ts, lawyers.ts (the
                       roster + hasLawyerField()), home.ts, firm-profile.ts;
                       index.ts exports getDictionary(locale)
  content/publications/{es,en}/*.mdx   the articles themselves
  content/publications-loader.ts       server-only (fs) — parses + strictly
                                       validates frontmatter; never import
                                       from a "use client" file
  content/publications-translations.ts client-safe ES<->EN slug manifest,
                                       used by the language switcher
  content/publications-labels.ts       shared UI copy for both pub. pages
  components/ui/       Container, Section, Eyebrow, SectionTitle, Button,
                       BracketFrame, Hairline, Prose
  components/layout/   Header, Footer, MobileNav, SkipLink, nav-items.ts
                       (the five nav items — shared by header/mobile/footer)
  components/icons/    ArrowIcon (prev/next navigation)
  components/publications/  ArticleCard, PublicationsBrowser (client filter/search)
  components/mdx-components.tsx   MDX -> design-system element mapping
  components/Reveal.tsx           the scroll-triggered motion primitive
  components/LanguageSwitcher.tsx stays on the same page across languages
  components/dev/      TEMPORARY placeholders, delete as real pages land
  i18n/                routing + slug map, request config, navigation, paths
  lib/cn.ts            class composition (clsx)
  lib/phone.ts          display phone number -> tel: href
  lib/initials.ts       "Carlos Gerke Mendieta" -> "CGM", from name on file
```

## Reading copy

```ts
import { getDictionary } from "@/content";

const { ui, site, practiceAreas, lawyers } = getDictionary(locale);
ui.nav.practiceAreas   // "Áreas de Práctica" | "Practice Areas"
practiceAreas[0].name  // already a plain string in the active language
```

Never hardcode a user-visible string in a component, and never import
`es`/`en` copy directly — `getDictionary` is the only entry point.
