"use client";

import { useEffect, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { getDictionary } from "@/content";
import { cn } from "@/lib/cn";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { MobileNav } from "./MobileNav";
import { NAV_ITEMS, isActiveRoute } from "./nav-items";
import type { Locale } from "@/i18n/routing";

function HamburgerIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Sticky site header. Calm on purpose per CLAUDE.md rule 2 — no shrinking,
 * no hide-on-scroll. Past 8px of scroll the bar crossfades from paper to
 * brand-700 (nav text, rule and logo swap to their on-dark equivalents along
 * with it) plus a shadow; all color-only, 200ms, same ceiling as every other
 * hover-state transition already on this page.
 */
export function Header({ locale }: { locale: Locale }) {
  const { ui } = getDictionary(locale);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const query = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (query.matches) setMobileOpen(false);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, [mobileOpen]);

  // The mobile nav is a full-screen overlay, but `aria-modal` alone is not
  // reliably enough for every assistive technology to treat everything
  // beneath it as hidden. Marking `main` and the footer `inert` while open
  // closes that gap — this bar's own trigger row is handled below via the
  // `inert` prop directly, since it's in this component's own tree.
  useEffect(() => {
    const main = document.getElementById("main-content");
    const footer = document.querySelector("footer");
    if (mobileOpen) {
      main?.setAttribute("inert", "");
      footer?.setAttribute("inert", "");
    } else {
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
    }
    return () => {
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
    };
  }, [mobileOpen]);

  const items = NAV_ITEMS.map((item) => ({
    ...item,
    label: ui.nav[item.labelKey],
    active: isActiveRoute(pathname, item.href),
  }));

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-[background-color,box-shadow] duration-200 ease-out",
        scrolled
          ? "bg-brand-700 shadow-[0_1px_3px_rgba(0,0,0,0.12)]"
          : "bg-paper shadow-[inset_0_-1px_0_transparent,0_1px_3px_transparent]",
      )}
    >
      <div
        inert={mobileOpen}
        // `gap-6` is a floor, not the usual spacing: right at the `lg`
        // breakpoint the logo steps up to its larger size in the same
        // instant the nav reveals, and `justify-between` alone let the two
        // land flush against each other with zero space between — the
        // 1024px-wide "no gap" case a spacing audit exists to catch.
        className="u-container flex h-16 items-center justify-between gap-6 lg:h-22"
      >
        <Link
          href="/"
          aria-label={ui.aria.homeLink}
          className="shrink-0 rounded-bracket"
        >
          {/* Ratio-locked height only — never stretched, never recolored.
              width/height attrs (matching the SVG's intrinsic ratio) let the
              browser reserve the box before the file loads, so nothing
              shifts once it does. Source swaps with scroll state, same as
              the footer's own fixed choice of the white mark on brand-900. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={scrolled ? "/logo-white.png" : "/logo-color.png"}
            alt=""
            width={1195}
            height={1114}
            className="h-10 w-auto lg:h-13"
          />
        </Link>

        <div className="hidden items-center gap-10 lg:flex">
          <nav aria-label={ui.aria.mainNavigation} className="flex items-center gap-8">
            {items.map((item) => (
              <Link
                key={item.href}
                href={{ pathname: item.href }}
                aria-current={item.active ? "page" : undefined}
                className="group inline-flex flex-col items-start gap-1.5"
              >
                <span
                  className={cn(
                    "text-[0.78rem] font-medium uppercase tracking-[0.12em] transition-colors duration-200 ease-out",
                    scrolled
                      ? // brand-700 is only 4.57:1 against white — no headroom to
                        // dim inactive text the way the light/dark tones do
                        // elsewhere; the underline bar below is what marks
                        // active vs. hover here instead.
                        "text-paper"
                      : item.active
                        ? "text-brand-700"
                        : "text-ink group-hover:text-brand-700",
                  )}
                >
                  {item.label}
                </span>
                {/* The bracket motif at its smallest: a rule that grows in on
                    hover and stays open on the active page. */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "h-0.5 w-full origin-left transition-transform duration-200 ease-out",
                    scrolled ? "bg-paper" : "bg-brand-700",
                    item.active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                  )}
                />
              </Link>
            ))}
          </nav>
          <LanguageSwitcher locale={locale} tone={scrolled ? "teal" : "light"} />
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label={ui.aria.openMenu}
          aria-haspopup="dialog"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-bracket transition-colors duration-200 ease-out lg:hidden",
            scrolled ? "text-paper hover:text-paper/80" : "text-ink hover:text-brand-700",
          )}
        >
          <HamburgerIcon />
        </button>
      </div>

      <MobileNav locale={locale} open={mobileOpen} onClose={() => setMobileOpen(false)} items={items} />
    </header>
  );
}

export default Header;
