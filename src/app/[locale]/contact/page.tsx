import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getDictionary } from "@/content";
import { Section, SectionTitle, Eyebrow, BracketFrame, Hairline, Prose } from "@/components/ui";
import { ContactForm } from "@/components/contact/ContactForm";
import { toTelHref } from "@/lib/phone";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { ui } = getDictionary(locale);
  return {
    title: ui.pages.contact.title,
    description: ui.pages.contact.description,
  };
}

/** Half-width of the OpenStreetMap embed's bounding box, in degrees. */
const MAP_BBOX_DELTA = 0.006;

export default async function ContactPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ area?: string | string[] }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { area: areaParam } = await searchParams;
  const { ui, site, practiceAreas } = getDictionary(locale);

  const requestedArea = Array.isArray(areaParam) ? areaParam[0] : areaParam;
  const initialAreaId = practiceAreas.some((area) => area.id === requestedArea)
    ? (requestedArea as string)
    : "";

  const { lat, lng } = site.mapCoordinates;
  const osmEmbedUrl =
    `https://www.openstreetmap.org/export/embed.html?bbox=` +
    `${lng - MAP_BBOX_DELTA}%2C${lat - MAP_BBOX_DELTA}%2C${lng + MAP_BBOX_DELTA}%2C${lat + MAP_BBOX_DELTA}` +
    `&layer=mapnik&marker=${lat}%2C${lng}`;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: site.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address,
      addressLocality: site.city,
      addressCountry: site.country,
    },
    telephone: site.phones.map((phone) => toTelHref(phone).replace("tel:", "")),
    foundingDate: String(site.founded),
    ...(site.email ? { email: site.email } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ==================================================== HEADER ======= */}
      <Section tone="paper" className="pb-0">
        <SectionTitle level={1} eyebrow={`${site.city}, ${site.country}`} marker>
          {ui.pages.contact.title}
        </SectionTitle>
        <Prose lead className="mt-6">
          {ui.pages.contact.lead}
        </Prose>
        <Hairline className="mt-12" />
      </Section>

      {/* ============================================ DETAILS + FORM ======== */}
      <Section tone="paper">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          {/* -------------------------------------------------- LEFT: details */}
          <div className="lg:col-span-5">
            <address className="flex flex-col gap-6 not-italic">
              <div>
                <Eyebrow as="h2">{ui.contact.addressLabel}</Eyebrow>
                <p className="mt-2 text-base leading-relaxed text-ink">{site.address}</p>
              </div>

              <div>
                <Eyebrow as="h2">{ui.contact.casillaLabel}</Eyebrow>
                <p className="mt-2 text-base leading-relaxed text-ink">{site.casilla}</p>
              </div>

              <div>
                <Eyebrow as="h2">{ui.contact.phoneLabel}</Eyebrow>
                <div className="mt-2 flex flex-col gap-2">
                  {site.phones.map((phone) => (
                    <a
                      key={phone}
                      href={toTelHref(phone)}
                      className="w-fit text-base text-brand-ink underline decoration-1 underline-offset-2 transition-colors duration-200 ease-out hover:text-brand-900"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </div>

              {site.email ? (
                <div>
                  <Eyebrow as="h2">{ui.contact.emailLabel}</Eyebrow>
                  <a
                    href={`mailto:${site.email}`}
                    className="mt-2 block w-fit text-base text-brand-ink underline decoration-1 underline-offset-2 transition-colors duration-200 ease-out hover:text-brand-900"
                  >
                    {site.email}
                  </a>
                </div>
              ) : null}

              <div>
                <Eyebrow as="h2">{ui.contact.hoursLabel}</Eyebrow>
                {/* TODO: client to confirm exact opening/closing times — do not invent them. */}
                <p className="mt-2 text-base leading-relaxed text-ink">{ui.contact.hoursDays}</p>
              </div>
            </address>

            <div className="mt-8">
              <BracketFrame openSide="right" tone="muted" className="overflow-hidden p-0">
                <iframe
                  src={osmEmbedUrl}
                  title={ui.contact.mapFrameTitle}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  // The map is a supplementary visual aid; the "Ver en Google
                  // Maps" link below is the actual, fully keyboard-reachable
                  // wayfinding action. Without this, sequential Tab
                  // navigation walks through several unlabeled stops inside
                  // the third-party embed (its zoom controls, attribution
                  // links) before ever reaching that link.
                  tabIndex={-1}
                  className="h-64 w-full border-0 sm:h-72"
                />
                <div className="p-4">
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-brand-ink underline decoration-1 underline-offset-2 transition-colors duration-200 ease-out hover:text-brand-900"
                  >
                    {ui.contact.mapLinkLabel}
                  </a>
                </div>
              </BracketFrame>
            </div>
          </div>

          {/* ----------------------------------------------------- RIGHT: form */}
          <div className="mt-12 lg:col-span-6 lg:col-start-7 lg:mt-0">
            <h2 className="u-display u-h3">{ui.form.heading}</h2>
            <p className="u-body mt-3">{ui.form.intro}</p>
            <div className="mt-8">
              <ContactForm
                locale={locale}
                practiceAreas={practiceAreas.map((area) => ({ id: area.id, name: area.name }))}
                initialAreaId={initialAreaId}
                form={ui.form}
                validation={ui.validation}
                ariaLabel={ui.aria.contactForm}
              />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
