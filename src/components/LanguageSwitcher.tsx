"use client";

import { useParams } from "next/navigation";
import { usePathname } from "@/i18n/navigation";
import { getAlternateUrl } from "@/i18n/paths";
import { locales, type Locale } from "@/i18n/routing";
import { getDictionary } from "@/content";
import { cn } from "@/lib/cn";

export type LanguageSwitcherTone = "light" | "dark" | "teal";

type LanguageSwitcherProps = {
  locale: Locale;
  /** `light` for white backgrounds (header, body copy). `dark` for the brand-900 mobile panel. */
  tone?: LanguageSwitcherTone;
  /** Fires when a language link is activated — the mobile panel uses this to close itself. */
  onNavigate?: () => void;
  className?: string;
};

const toneClasses: Record<
  LanguageSwitcherTone,
  { active: string; inactive: string; separator: string }
> = {
  // Active: brand-900 (near-black, ~10:1 on white). Inactive: brand-ink, the
  // system's sanctioned "small teal text on white" (6.71:1) — not
  // neutral-500, which fails AA for text under CLAUDE.md rule 4.
  light: {
    active: "text-brand-900",
    inactive: "text-brand-ink hover:text-brand-900",
    separator: "text-neutral-500",
  },
  dark: {
    active: "text-paper",
    inactive: "text-paper/75 hover:text-paper",
    separator: "text-paper/40",
  },
  // brand-700 (the header's scrolled state) is only 4.57:1 against white —
  // unlike brand-900's 11.3:1, there's no headroom left to dim inactive text
  // and stay AA. Both states stay full paper; hover gets an underline
  // instead of a color shift for its affordance.
  teal: {
    active: "text-paper",
    inactive: "text-paper hover:underline underline-offset-4 decoration-paper/70",
    separator: "text-paper/55",
  },
};

/**
 * Switches language while staying on the same page — including detail routes,
 * where the slug itself has to be translated (`/es/areas-de-practica/mineria`
 * -> `/en/practice-areas/mining`). Falls back to the home page only when the
 * current route genuinely has no counterpart.
 */
export function LanguageSwitcher({
  locale,
  tone = "light",
  onNavigate,
  className,
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : undefined;
  const t = getDictionary(locale);
  const palette = toneClasses[tone];

  return (
    <nav
      aria-label={t.ui.aria.languageSwitcher}
      className={cn("flex items-center gap-1.5", className)}
    >
      {locales.map((target, i) => {
        const isCurrent = target === locale;
        const label = target === "es" ? t.ui.language.esShort : t.ui.language.enShort;
        const ariaLabel =
          target === "es" ? t.ui.aria.switchToSpanish : t.ui.aria.switchToEnglish;

        return (
          <span key={target} className="flex items-center gap-1.5">
            {i > 0 ? (
              <span aria-hidden="true" className={palette.separator}>
                /
              </span>
            ) : null}
            {isCurrent ? (
              <span
                aria-current="true"
                className={cn(
                  "inline-flex min-h-11 items-center text-xs font-bold uppercase tracking-[0.18em]",
                  palette.active,
                )}
              >
                {label}
              </span>
            ) : (
              <a
                href={getAlternateUrl(pathname, locale, target, slug)}
                hrefLang={target}
                aria-label={ariaLabel}
                onClick={onNavigate}
                className={cn(
                  "inline-flex min-h-11 min-w-11 items-center justify-center text-xs font-bold uppercase tracking-[0.18em] transition-colors duration-200 ease-out",
                  palette.inactive,
                )}
              >
                {label}
              </a>
            )}
          </span>
        );
      })}
    </nav>
  );
}

export default LanguageSwitcher;
