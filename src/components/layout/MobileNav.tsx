"use client";

import { useEffect, useRef } from "react";
import { Link } from "@/i18n/navigation";
import { getDictionary } from "@/content";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { cn } from "@/lib/cn";
import type { Locale } from "@/i18n/routing";
import type { NavItem } from "./nav-items";

type MobileNavProps = {
  locale: Locale;
  open: boolean;
  onClose: () => void;
  items: readonly (NavItem & { label: string; active: boolean })[];
};

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled])';

/**
 * Full-screen mobile nav panel. Stays mounted at all times (so the 280ms
 * fade/slide can transition both ways) and is made properly inert while
 * closed via the `inert` attribute — invisible, unfocusable and hidden from
 * assistive tech in one step, on top of the CSS opacity/transform.
 */
export function MobileNav({ locale, open, onClose, items }: MobileNavProps) {
  const { ui } = getDictionary(locale);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;
      const focusables = panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused.current?.focus();
    };
  }, [open, onClose]);

  return (
    <div
      id="mobile-nav"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label={ui.aria.mainNavigation}
      aria-hidden={!open}
      inert={!open}
      className={cn(
        "fixed inset-0 z-50 flex flex-col overflow-y-auto bg-brand-900 u-panel-transition",
        open ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0",
      )}
    >
      <div className="flex justify-end px-6 pt-5 sm:px-8">
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label={ui.aria.closeMenu}
          className="flex h-11 w-11 items-center justify-center rounded-bracket text-paper transition-colors duration-200 ease-out hover:text-paper/70"
        >
          <CloseIcon />
        </button>
      </div>

      <nav className="flex flex-1 flex-col items-center justify-center gap-5 px-6 py-10">
        {items.map((item) => (
          <Link
            key={item.href}
            href={{ pathname: item.href }}
            onClick={onClose}
            aria-current={item.active ? "page" : undefined}
            className={cn(
              "flex min-h-11 items-center text-2xl font-bold uppercase tracking-[0.04em] text-paper transition-colors duration-200 ease-out hover:text-paper/80",
              item.active && "underline decoration-2 underline-offset-8",
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="flex justify-center pb-10">
        <LanguageSwitcher locale={locale} tone="dark" onNavigate={onClose} />
      </div>
    </div>
  );
}

export default MobileNav;
