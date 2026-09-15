import { Link } from "@/i18n/navigation";
import { Section, Eyebrow } from "@/components/ui";
import { getDictionary, format } from "@/content";
import { toTelHref } from "@/lib/phone";
import { NAV_ITEMS } from "./nav-items";
import type { Locale } from "@/i18n/routing";

/**
 * Server component, no interactivity beyond plain anchors and the
 * locale-aware <Link>, so no "use client" boundary needed.
 */
export function Footer({ locale }: { locale: Locale }) {
  const { site, ui } = getDictionary(locale);
  const year = new Date().getFullYear();

  return (
    <Section as="footer" tone="dark">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
        {/* Identity */}
        <div>
          {/* Adjacent text already carries the firm name, decorative image.
              Same file and brightness-0/invert recolor as the header's
              scrolled state, since the band here is brand-900 too. Explicit
              width/height prevent layout shift while it loads. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-solo.png"
            alt=""
            width={1266}
            height={413}
            className="h-8 w-auto brightness-0 invert"
          />
          <p className="mt-5 max-w-[26ch] text-sm leading-relaxed text-paper/90">
            {site.name}
          </p>
          <p className="mt-3 text-sm font-medium text-paper/75">
            {format(ui.footer.since, { year: site.founded })}
          </p>
        </div>

        {/* Contact */}
        <div>
          <Eyebrow as="h2">{ui.footer.contactHeading}</Eyebrow>
          <address className="mt-4 flex flex-col gap-3 text-sm leading-relaxed text-paper/90 not-italic">
            <span>{site.address}</span>
            <span>{site.casilla}</span>
            <span className="flex flex-col gap-2">
              {site.phones.map((phone) => (
                <a
                  key={phone}
                  href={toTelHref(phone)}
                  className="w-fit transition-colors duration-200 ease-out hover:text-paper"
                >
                  {phone}
                </a>
              ))}
            </span>
            {site.email ? (
              <a
                href={`mailto:${site.email}`}
                className="transition-colors duration-200 ease-out hover:text-paper"
              >
                {site.email}
              </a>
            ) : null}
          </address>
        </div>

        {/* Sitemap */}
        <div>
          <Eyebrow as="h2">{ui.footer.navHeading}</Eyebrow>
          <nav aria-label={ui.aria.footerNavigation} className="mt-4">
            <ul className="flex flex-col gap-3 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={{ pathname: item.href }}
                    className="text-paper/90 transition-colors duration-200 ease-out hover:text-paper"
                  >
                    {ui.nav[item.labelKey]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="mt-14 flex flex-col gap-4 border-t border-paper/15 pt-8 text-xs text-paper/70 sm:flex-row sm:items-center sm:justify-between">
        <p>{format(ui.footer.copyright, { year })}</p>
        <Link
          href={{ pathname: "/legal-notice" }}
          className="underline underline-offset-4 transition-colors duration-200 ease-out hover:text-paper"
        >
          {ui.footer.legalNotice}
        </Link>
      </div>
    </Section>
  );
}

export default Footer;
