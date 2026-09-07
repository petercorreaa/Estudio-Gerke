import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

/**
 * next-intl is used here for routing only — locale prefixes, the localized
 * slug map, and navigation helpers. Site copy does NOT live in message files:
 * it lives in `src/content/` and is read through `getDictionary(locale)`, so
 * there is exactly one source of truth for every string.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return { locale, messages: {} };
});
