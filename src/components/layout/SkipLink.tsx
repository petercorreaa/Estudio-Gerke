import { getDictionary } from "@/content";
import type { Locale } from "@/i18n/routing";

/**
 * Visually hidden until focused. Must be the first focusable element in the
 * document so keyboard users can bypass the header before reaching the page.
 */
export function SkipLink({ locale }: { locale: Locale }) {
  const { ui } = getDictionary(locale);

  return (
    <a
      href="#main-content"
      className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-50 focus-visible:flex focus-visible:min-h-11 focus-visible:items-center focus-visible:rounded-bracket focus-visible:border-2 focus-visible:border-brand-700 focus-visible:bg-paper focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-medium focus-visible:text-brand-700"
    >
      {ui.aria.skipToContent}
    </a>
  );
}

export default SkipLink;
