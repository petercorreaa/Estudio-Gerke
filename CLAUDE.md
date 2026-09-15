# Estudio Jurídico Gerke, build rules

Client: boutique law firm, La Paz, Bolivia, founded 1971. Clients are foreign
corporations investing in Bolivia and Bolivian business families. The site must
feel INSTITUTIONAL, SOBER, PREMIUM. One word: Professional.

Hard rules, never violate:
1. The only photographs on the site are the four partners' own portraits,
   supplied by the firm, on `/lawyers` and their profiles. The rest of the team
   is listed by name, deliberately: the firm wants the partners to lead the
   page. Nothing else: no stock imagery of law books, gavels, scales,
   courthouses, or handshakes. Ever. (The client originally rejected all
   photography, then reversed that for the portraits, then narrowed it to the
   partners. The rest of the rule has never moved.)
2. No carousels, no autoplaying video, no parallax, no counters, no marquees.
   Motion is limited to opacity/translateY fades under 400ms.
3. The 20 practice areas are FROZEN, exact names, exact order, no regrouping,
   no renaming, no additions. The client explicitly asked to keep them as-is.
4. Never render body copy in #3F8E87 or #919191, both fail WCAG AA on white.
   Body copy is #1A1A1A. Links and small teal text are #2A6560.
5. Do not add Ellex, Advoc, or EuroLatAmLex logos or links anywhere. The
   client removed them.
6. Every page must exist in both Spanish and English with equal quality.
7. Mobile-first. Every layout must be verified at 360px, 390px, 768px, 1024px,
   1440px with zero horizontal overflow.

Visual motif: the firm's logo is a rounded-square bracket frame around the
wordmark. That bracket (a 2px rounded rule that opens on one side) is the
recurring device across the site: section markers, card frames, hover states,
pull quotes. Use it deliberately, not decoratively.

---

## Implementation notes (how the rules are enforced in this repo)

The design system that serves these rules is documented in [DESIGN.md](DESIGN.md)
and implemented as tokens in `src/app/globals.css`. Read both before changing
any styling.

- **Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4, next-intl,
  `clsx`. Source lives in `src/`. There is no `src/pages`.
- **Routing:** every route is under `src/app/[locale]/`. Locales are `es`
  (default) and `en`; `/` redirects to `/es`. Slugs are localized through the
  map in `src/i18n/routing.ts` (`/es/areas-de-practica` ↔
  `/en/practice-areas`), so the language switcher always lands on the same
  page. Adding a route means adding it to that map in BOTH languages, rule 6
  means a route may not exist in one locale only.
- **Copy:** every user-visible string lives in `src/content/` and is read
  through `getDictionary(locale)`. Components must never hardcode copy, and
  never import a locale-specific file directly. `src/content/ui.ts` holds
  generic interface copy; `practice-areas.ts` (frozen list + short
  descriptions) and `practice-area-details.ts` (overview/services/forums per
  area) hold the practice-area content; `lawyers.ts` holds the roster,
  transcribed verbatim from the firm's own site (role, practice-area line,
  biography, languages, direct email, portrait), never paraphrased or
  rewritten to taste, with `isPartner` driving the split between the portrait
  row and the name-only list and `PENDING_MEMBER_COUNT` standing in for
  lawyers the firm has taken on but not yet named; `home.ts` and
  `firm-profile.ts` hold page-specific prose; `site.ts` holds contact details
  identical in both languages. When someone leaves the firm, remove the entry
  and the portrait file outright rather than commenting either out.
- **Unconfirmed data:** never invent a credential, a date, an email address, or
  a statute/article citation you're not confident of. Missing values carry the
  `TODO` marker from `src/content/types.ts`, as a code comment flagging what
  needs the firm's confirmation (`practice-area-details.ts`, `site.ts`).
- **Publications (MDX):** articles live as `.mdx` files in
  `src/content/publications/{es,en}/`, loaded by `publications-loader.ts`
  (server-only, reads the filesystem, so it must never be imported by a
  "use client" file or re-exported from the `@/content` barrel; import it
  directly). Frontmatter is strictly validated on load; a malformed file
  fails `next build`, not just the affected page. `status: "draft"` articles
  are visible in `next dev` for review and invisible in production (both the
  index listing and the route itself 404), see `isVisible()`. In MDX source,
  use **markdown syntax** (`> quote`, `##`, GFM tables), not raw HTML tags
  (`<blockquote>`), only markdown-derived elements route through the
  `mdxComponents` overrides in `src/components/mdx-components.tsx` that give
  headings, pull quotes and tables their styling; a literal `<blockquote>`
  renders as an unstyled browser default instead.
- **Type & color:** never hand-write a hex value in a component. Use the token
  utilities (`text-ink`, `bg-brand-900`, `.u-eyebrow`, `.u-h2`, …). Rule 4 is
  enforced by the token names themselves: `brand-600` and `neutral-500` have no
  body-copy utility bound to them.
- **Site shell:** `Header`, `Footer`, `SkipLink` and `MobileNav`
  (`src/components/layout/`) are wired into `src/app/[locale]/layout.tsx` and
  render on every page. The layout owns the single `<main id="main-content">`
  landmark, page components (`RouteStub` and, later, real pages) must not
  render their own `<main>`. The five nav items live once, in
  `src/components/layout/nav-items.ts`, and are shared by the desktop nav, the
  mobile overlay and the footer sitemap.
- **Motion:** the only *scroll-triggered* animation primitive is `<Reveal>`
  (`src/components/Reveal.tsx`). Two further motion instances are sanctioned
  and documented in DESIGN.md §5, hover-state rules/underlines tied to the
  bracket motif, and the mobile nav panel's open/close, do not add a third.
- **Font:** Ubuntu via `next/font/google`, weights 300/400/500/700, subsets
  `latin` + `latin-ext` (Spanish needs í, ó, ñ). Exposed as `--font-ubuntu`.
  No second family, ever.
- **Imagery:** the lawyer portraits in `public/lawyers/` (422x459, named by
  slug) are the site's only photographs, and each one is framed with the
  bracket motif rather than a shadow. Everywhere else, visual interest comes
  from the bracket, typography, rules, and the dark band. If a layout feels
  empty, fix it with type and space, not with a picture.
- **Punctuation:** no em dashes, anywhere. Not in copy, not in comments, not in
  MDX. They read as machine-written. Use a comma, a colon, a semicolon or
  parentheses, whichever the sentence actually calls for.
- **Maps:** `/contact` embeds Google Maps. Set `GOOGLE_MAPS_API_KEY` in the
  deployment environment to use the Maps Embed API (read at build time, since
  the page prerenders); without it the page falls back to Google's keyless
  embed so the map still renders. Never swap in OpenStreetMap.

## Review checklist for every change

- [ ] Both locales updated, equal quality.
- [ ] No new hex values; tokens only.
- [ ] No em dashes introduced.
- [ ] Body copy is `#1A1A1A`; no `#3F8E87` or `#919191` text. `.u-num` used
      only for ornament, `aria-hidden` below 24px (DESIGN.md §2).
- [ ] No photography beyond the lawyer portraits, no forbidden motion patterns.
- [ ] Verified at 360 / 390 / 768 / 1024 / 1440 px, no horizontal overflow.
- [ ] `npm run build` and `npm run lint` clean.
