# Estudio Jurídico Gerke — design system

The source of truth for every visual decision on this site. Companion to
[CLAUDE.md](CLAUDE.md), which holds the hard rules. Every token below is
implemented in `src/app/globals.css` inside Tailwind v4's `@theme` block, and
consumed through the components in `src/components/ui/`.

Review the live rendering of everything on this page at `/styleguide`.

---

## 1. Color

Pre-validated for contrast — **do not substitute**. Contrast ratios are against
`#FFFFFF` unless noted.

| Token | Hex | Ratio | Use |
| --- | --- | --- | --- |
| `--color-brand-700` | `#39817B` | 4.57:1 | Primary. Buttons, headings, rules. |
| `--color-brand-600` | `#3F8E87` | 3.87:1 | Large display text **≥24px**, borders, fills **only**. |
| `--color-brand-900` | `#14413E` | 11.3:1 with white text | Dark bands, footer. |
| `--color-brand-ink` | `#2A6560` | 6.71:1 | Links and small teal text on white. |
| `--color-neutral-500` | `#919191` | 2.85:1 | Hairlines and dividers **only**. |
| `--color-ink` | `#1A1A1A` | 17.4:1 | Body copy. |
| `--color-paper` | `#FFFFFF` | — | Default background. |
| `--color-paper-alt` | `#FAFAF8` | — | Alternating section bands. |
| `--color-error` | `#B3261E` | 6.53:1 | Form validation error text/borders **only**. |

### Non-negotiables

- **Body copy is `#1A1A1A`.** Never `#3F8E87`, never `#919191` — both fail
  WCAG AA on white.
- `brand-600` may carry text **only** at display sizes (≥24px / 1.5rem), where
  WCAG's large-text threshold (3:1) applies. Below that, use `brand-ink`.
- `neutral-500` never carries text at any size. It is a line color.
- On `brand-900` bands, text is `#FFFFFF` (11.3:1). Secondary text on dark uses
  white at 80% opacity, never a mid grey.

### Tailwind utilities

`bg-brand-700`, `text-brand-ink`, `border-brand-600`, `bg-paper-alt`,
`text-ink`, `border-neutral-500`, `bg-brand-900`, … are generated automatically
from the token names.

---

## 2. Typography

**Ubuntu only. No second family.** Loaded via `next/font/google` with weights
300 / 400 / 500 / 700 and subsets `latin` + `latin-ext` (Spanish requires
í, ó, ñ). Exposed as the CSS variable `--font-ubuntu` and set on `<html>`.

### Display — all section and page titles

700 · uppercase · `letter-spacing: 0.06em` · `line-height: 1.05` ·
color `#14413E` or `#1A1A1A`.

| Level | Size | Class |
| --- | --- | --- |
| h1 | `clamp(2rem, 5vw, 3.75rem)` | `.u-h1` |
| h2 | `clamp(1.5rem, 3.2vw, 2.5rem)` | `.u-h2` |
| h3 | `clamp(1.125rem, 2vw, 1.5rem)` | `.u-h3` |

### Eyebrow — small label above titles

700 · uppercase · `0.18em` tracking · `0.75rem` · color `#2A6560` · `.u-eyebrow`

### Body

400 · `1.0625rem` mobile / `1.125rem` desktop · `line-height: 1.7` ·
`max-width: 68ch` · `.u-body`

### Lead paragraph

300 · `clamp(1.125rem, 2vw, 1.375rem)` · `line-height: 1.55` · `.u-lead`

### Numerals — practice-area indices, years

500 · `font-variant-numeric: tabular-nums` · color `#2A6560` (`brand-ink`) ·
`.u-num`

`.u-num` is **ornament**: an index or a founding year that sits beside the
label it decorates, never information the reader has to parse on its own. It
uses `brand-ink` — the same token as small teal text elsewhere — specifically
*because* it stays AA-compliant (6.71:1) at any size, including well below
24px. An earlier version of this rule used `brand-600` here and leaned on
`aria-hidden` to make that safe; that doesn't work, because `aria-hidden`
only removes a redundant announcement for screen-reader users — a sighted,
low-vision reader still sees the glyph at full size and still needs it to
pass 1.4.3. Below 24px, `brand-600` fails that regardless of `aria-hidden`.

- Below 24px, a `.u-num` element must still be `aria-hidden`, but now purely
  to avoid a screen reader announcing a number whose meaning is already
  carried by the adjacent label — not as a substitute for contrast.
- Anything a reader must actually read — a figure in a sentence, a phone
  number, a date that carries meaning, a value in a table — is body copy. It
  renders in `#1A1A1A` with `tabular-nums`, not in `.u-num`.

If you are unsure which case you have, it is body copy.

---

## 3. Spacing & layout

| Token | Value |
| --- | --- |
| `--spacing-section` | `clamp(4rem, 9vw, 8rem)` vertical rhythm |
| `--container-site` | `1200px` max-width |
| Side padding | `1.25rem` mobile / `2.5rem` from `md` up |

- **Grid:** 12 columns at `≥1024px` (`.u-grid-12`, `gap: 1.5rem / 2rem`).
  Single column below `768px`. The 768–1023px band is a 6-column intermediate.
- **Mobile-first.** Every layout is verified at 360, 390, 768, 1024 and 1440 px
  with zero horizontal overflow.
- Measure for running text never exceeds `68ch`.

---

## 4. The bracket motif

The firm's logo is a rounded-square bracket frame around the wordmark. That
bracket — **a 2px rounded rule that opens on one side** — is the site's
recurring device: section markers, card frames, hover states, pull quotes.

Implemented as `<BracketFrame>`:

- `2px` border, `--radius-bracket: 14px`, color `brand-600` (borders are a
  sanctioned use of `brand-600`).
- `openSide` — `left` | `right` | `top` | `bottom` | `none`. The open side drops
  its rule; the two rules that meet it keep their rounded corners, so the frame
  reads as a bracket rather than a broken box.
- `tone` — `brand` (default), `dark` (white rule on `brand-900`), `muted`
  (`neutral-500` hairline, for dividers and quiet frames).
- `marker` variant renders the bracket as a short section marker rather than a
  wrapper.

**Use it deliberately, not decoratively.** One bracket per idea. Never nest a
bracket inside a bracket, and never use it as a border on every card in a grid —
it marks the one thing that matters in a view.

One sanctioned exception: the lawyer card grid (`/lawyers`), where every card
is a `BracketFrame`. Each frame there marks a distinct *person* — the bracket
functions as an identity mark (the client's stated visual substitute for a
photograph), not as generic card decoration. That is a different job from
decorating every tile in a features grid, which is what the rule above
forbids. Default state is `tone="muted"` (`neutral-500`, quiet, at rest);
`border-brand-700` on hover is a one-off override, not a new `tone` value —
`brand-700` isn't one of `BracketFrame`'s three tones.

---

## 5. Motion

One shared utility, `revealOnScroll`, exposed as the `<Reveal>` component:

- `opacity: 0 → 1`, `translateY: 12px → 0`
- `360ms`, `ease-out`
- triggered **once** via `IntersectionObserver`
- fully disabled under `prefers-reduced-motion: reduce` (content renders in its
  final state immediately, no transition)

**No other scroll-triggered animation anywhere.** No carousels, no
autoplaying video, no parallax, no counters, no marquees.

Three further instances are sanctioned — each tied to a specific interactive
component, none a general license for more motion:

- **Hover states**, including the bracket motif's rules and underlines, may
  transition `color` / `background-color` / `border-color` **and** a
  `scale`/`transform` used to grow a rule open (e.g. the header nav's
  underline), ≤200ms. This is the one exception to "color only": the bracket
  motif is explicitly a hover device (CLAUDE.md), and a rule that "opens" on
  hover is a transform, not a color change.
- **The mobile nav panel's open/close** — `opacity` + `translateY(12px)`,
  `280ms`, token `--duration-panel` — implemented as `.u-panel-transition` in
  `globals.css` rather than composed from Tailwind utilities, because two
  separately-generated utility classes for the same `transition` property
  don't reliably order themselves so a `motion-reduce:` variant wins; a single
  hand-written declaration does. Also disabled under
  `prefers-reduced-motion: reduce` (the panel snaps open/closed instead).
- **The practice-area index row's description reveal** — `grid-template-rows`
  `0fr → 1fr`, `200ms`, token `--duration-row-reveal`, on hover/focus at
  `≥1024px` (the description is always visible below that). This is
  progressive disclosure of content that already exists in the DOM and is
  always visible on mobile — not decoration — so it gets its own exception
  rather than being read as an opening for arbitrary height/size transitions
  elsewhere. Same `.u-row-reveal`-in-`globals.css` reasoning as the panel
  transition above; the `0fr`/`1fr` toggle itself is plain
  `grid-rows-[0fr] group-hover:grid-rows-[1fr]`, since that's a single
  Tailwind utility at different variants, not two utilities competing for one
  property.

---

## 6. Components

All in `src/components/ui/`. These are the entire vocabulary — build pages from
them rather than from raw markup.

| Component | Purpose |
| --- | --- |
| `Container` | Centered `1200px` max-width wrapper with the responsive side padding. |
| `Section` | Vertical rhythm band. `tone="paper" \| "alt" \| "dark"`. |
| `Eyebrow` | Small uppercase label above a title. |
| `SectionTitle` | Display heading, `as`/`level` controlled, optional eyebrow + bracket marker. |
| `Button` | `variant="primary"` (solid `brand-700`) \| `"ghost"` (outlined). Renders `<a>` when given `href`. |
| `BracketFrame` | The logo motif as a reusable wrapper or marker. |
| `Hairline` | `1px` `neutral-500` divider, full or short. |
| `Prose` | Body-copy container: `68ch` measure, `#1A1A1A`, `1.7` leading, styled `p`/`ul`/`a`/`strong`. Safe inside `Section tone="dark"` — `u-on-dark` recolors it and its nested links/emphasis/markers, same as `.u-body`. |

Plus `src/components/Reveal.tsx` — the scroll-triggered motion primitive (§5).

### Site shell

`src/components/layout/`, wired into every page via
`src/app/[locale]/layout.tsx`. Built from the vocabulary above, not from raw
markup.

| Component | Purpose |
| --- | --- |
| `Header` | Sticky, `64px`/`88px` (mobile/desktop). Gains a `neutral-500` hairline + shadow past `8px` of scroll — implemented as an inset `box-shadow`, not a `border`, so the height stays exact. Never shrinks or hides. |
| `MobileNav` | Full-screen `brand-900` overlay below `1024px`. Focus-trapped, closes on Escape or backdrop navigation, locks body scroll, stays mounted with the `inert` attribute toggling focusability so the panel transition (§5) can run both ways. |
| `Footer` | `brand-900` band, three columns ≥`768px` (identity, contact, sitemap), single column below. Phone numbers render as real `tel:` links. |
| `SkipLink` | First focusable element on the page; jumps to `#main-content`. |

`LanguageSwitcher` (`src/components/LanguageSwitcher.tsx`) takes a `tone`
(`light` default, `dark` for the mobile panel) and an optional `onNavigate` so
the mobile panel can close itself on tap. Its inactive-locale color is
`brand-ink`, not the `neutral-500` a raw color spec might suggest — see the
color table in §1; `neutral-500` fails AA for text at any size.

### Publications (MDX)

Article bodies compile through `next-mdx-remote/rsc`'s `compileMDX`, render
inside `<Prose>` for the `68ch` measure, and map onto the system via
`src/components/mdx-components.tsx`:

| MDX element | Renders as |
| --- | --- |
| `##` / `###` | `.u-display u-h3` / bold uppercase `text-base` — not full `.u-display`, so it ranks visibly below `##` |
| `> quote` | `<BracketFrame as="blockquote" openSide="right">`, `brand-900`, per the client's pull-quote spec |
| GFM table | Wrapped in `overflow-x-auto` so it scrolls inside itself on mobile, never the page |
| `p` / `ul` / `ol` / `a` / `strong` | Already handled by `.u-prose` — brand-600 markers, no override needed |

These only fire for **markdown-derived** elements. A literal `<blockquote>`
tag in the MDX source is treated as an author's explicit JSX choice and
bypasses the override entirely, rendering unstyled — use `> quote` syntax.
`src/components/publications/` (`ArticleCard`, `PublicationsBrowser`) is the
index page's card grid and client-side filter/search; the featured-card
treatment is CSS-only (a wider grid span on the newest article, unfiltered
view only), not a second component.

---

## 7. Conventions

- Never hand-write a hex value in a component; use tokens.
- Never introduce a second font family, a second motion utility, or a color
  outside the table in §1.
- Class composition uses `clsx`. Component props that affect styling are closed
  unions (`tone`, `variant`, `openSide`), never open strings — the system stays
  finite on purpose.
