import { notFound } from "next/navigation";

/**
 * Catch-all inside the locale segment.
 *
 * Without it, an unmatched path such as /es/no-existe escapes the `[locale]`
 * layout and renders Next's built-in 404, no `<html lang>`, no Ubuntu, no
 * Spanish. Routing it here instead throws into `[locale]/not-found.tsx`, which
 * renders the localized copy inside the real layout.
 */
export default function CatchAllPage() {
  notFound();
}
