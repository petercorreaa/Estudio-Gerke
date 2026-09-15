import type { AppPathname } from "@/i18n/routing";
import type { Ui } from "@/content/ui";

type StaticPathname = Exclude<AppPathname, `${string}[slug]`>;

export interface NavItem {
  readonly href: Extract<
    StaticPathname,
    "/firm-profile" | "/practice-areas" | "/lawyers" | "/publications" | "/contact"
  >;
  readonly labelKey: keyof Ui["nav"];
}

/**
 * The five primary sections, shared by the desktop nav, the mobile overlay
 * and the footer sitemap column, one list, three renderings.
 */
export const NAV_ITEMS: readonly NavItem[] = [
  { href: "/firm-profile", labelKey: "firmProfile" },
  { href: "/practice-areas", labelKey: "practiceAreas" },
  { href: "/lawyers", labelKey: "lawyers" },
  { href: "/publications", labelKey: "publications" },
  { href: "/contact", labelKey: "contact" },
];

export function isActiveRoute(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}
