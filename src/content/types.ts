import type { Locale } from "@/i18n/routing";

export type { Locale };

/**
 * A single string in both languages. Every piece of copy on this site is one
 * of these, kept side by side so ES/EN parity is visible at review time
 * (CLAUDE.md rule 6) rather than spread across two files that drift.
 */
export interface Localized {
  readonly es: string;
  readonly en: string;
}

/**
 * Resolves a content tree to one locale: every `Localized` leaf collapses to a
 * `string`, everything else keeps its shape and type.
 *
 *   Localize<{ name: Localized; index: string }>  ->  { name: string; index: string }
 */
export type Localize<T> = T extends Localized
  ? string
  : T extends readonly (infer U)[]
    ? readonly Localize<U>[]
    : T extends object
      ? { readonly [K in keyof T]: Localize<T[K]> }
      : T;

export function isLocalized(value: unknown): value is Localized {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as Localized).es === "string" &&
    typeof (value as Localized).en === "string"
  );
}

/** Runtime counterpart of `Localize<T>`. */
export function localize<T>(value: T, locale: Locale): Localize<T> {
  if (isLocalized(value)) {
    return value[locale] as Localize<T>;
  }

  if (Array.isArray(value)) {
    return value.map((item) => localize(item, locale)) as Localize<T>;
  }

  if (typeof value === "object" && value !== null) {
    const result: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(value)) {
      result[key] = localize(item, locale);
    }
    return result as Localize<T>;
  }

  return value as Localize<T>;
}

/**
 * Fills `{placeholders}` in a resolved string.
 * Used for copy that carries a runtime value, e.g. the footer's `{year}`.
 */
export function format(
  template: string,
  values: Readonly<Record<string, string | number>>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}

/** Marks copy the client still has to confirm. Never invent it instead. */
export const TODO: Localized = {
  es: "TODO: pendiente de confirmación",
  en: "TODO: pending client confirmation",
};
