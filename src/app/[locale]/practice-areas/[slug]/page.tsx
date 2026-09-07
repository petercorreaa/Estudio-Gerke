import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { practiceAreas, getPracticeAreaDetail, getDictionary } from "@/content";
import { findPracticeAreaBySlug } from "@/i18n/paths";
import { Section, Eyebrow, Button, BracketFrame, Hairline, Prose } from "@/components/ui";
import { ArrowIcon } from "@/components/icons/ArrowIcon";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

type Params = { locale: Locale; slug: string };

/** Slugs are localized, so the set depends on the parent segment's locale. */
export function generateStaticParams({ params }: { params: { locale: string } }) {
  const locale = hasLocale(routing.locales, params.locale) ? params.locale : routing.defaultLocale;
  return practiceAreas.map((area) => ({ slug: area.slug[locale] }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const area = findPracticeAreaBySlug(slug, locale);
  if (!area) return {};

  return {
    title: area.name[locale],
    description: area.description[locale],
  };
}

export default async function PracticeAreaPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const area = findPracticeAreaBySlug(slug, locale);
  if (!area) notFound();

  const detail = getPracticeAreaDetail(area.id);
  if (!detail) notFound();

  const { ui, practiceAreaDetailLabels } = getDictionary(locale);

  const currentIndex = practiceAreas.findIndex((a) => a.id === area.id);
  const total = practiceAreas.length;
  const prevArea = practiceAreas[(currentIndex - 1 + total) % total];
  const nextArea = practiceAreas[(currentIndex + 1) % total];

  return (
    <>
      {/* =================================================== HEADER =========== */}
      <Section tone="paper" className="pb-0">
        <div className="flex items-start gap-5 lg:gap-6">
          <span aria-hidden="true" className="u-num shrink-0 text-[clamp(2.5rem,6vw,4rem)] leading-none">
            {area.index}
          </span>
          <div className="min-w-0 pt-1 lg:pt-2">
            <Eyebrow>{ui.pages.practiceAreas.title}</Eyebrow>
            <h1 className="u-display u-h1 mt-2 break-words">{area.name[locale]}</h1>
          </div>
        </div>
        <Prose lead className="mt-6">
          {area.description[locale]}
        </Prose>
        <Hairline className="mt-12" />
      </Section>

      {/* ============================================ BODY + STICKY RAIL ====== */}
      <Section tone="paper">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Prose>
              {detail.overview.map((paragraph, i) => (
                <p key={i}>{paragraph[locale]}</p>
              ))}
            </Prose>

            <div className="mt-12">
              <h2 className="u-display u-h3">{practiceAreaDetailLabels.servicesHeading}</h2>
              <Prose className="mt-5">
                <ul>
                  {detail.services.map((service, i) => (
                    <li key={i}>{service[locale]}</li>
                  ))}
                </ul>
              </Prose>
            </div>

            <div className="mt-12">
              <h2 className="u-display u-h3">{practiceAreaDetailLabels.forumsHeading}</h2>
              <Prose className="mt-5">
                <ul>
                  {detail.forums.map((forum, i) => (
                    <li key={i}>{forum[locale]}</li>
                  ))}
                </ul>
              </Prose>
            </div>
          </div>

          <div className="mt-12 lg:col-span-4 lg:col-start-9 lg:mt-0">
            <div className="lg:sticky lg:top-28">
              <BracketFrame openSide="right" className="p-6 lg:p-7">
                <Eyebrow>{practiceAreaDetailLabels.ctaEyebrow}</Eyebrow>
                <p className="u-body mt-3">{practiceAreaDetailLabels.ctaBody}</p>
                <Button
                  className="mt-5 w-full"
                  href={{ pathname: "/contact", query: { area: area.id } }}
                >
                  {ui.actions.enquireAboutArea}
                </Button>
              </BracketFrame>
            </div>
          </div>
        </div>
      </Section>

      {/* ============================================== PREV / NEXT =========== */}
      <Section tone="alt">
        <nav aria-label={ui.aria.practiceAreaList} className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <Link
            href={{ pathname: "/practice-areas/[slug]", params: { slug: prevArea.slug[locale] } }}
            className="group flex min-w-0 items-start gap-3"
          >
            <ArrowIcon
              direction="left"
              className="mt-1 shrink-0 text-brand-700 transition-transform duration-200 ease-out group-hover:-translate-x-1"
            />
            <span className="min-w-0">
              <span className="u-eyebrow block">{ui.actions.previousArea}</span>
              <span className="mt-1 block font-medium uppercase tracking-[0.02em] text-ink break-words">
                <span aria-hidden="true" className="u-num mr-2 text-sm">
                  {prevArea.index}
                </span>
                {prevArea.name[locale]}
              </span>
            </span>
          </Link>

          <Link
            href={{ pathname: "/practice-areas/[slug]", params: { slug: nextArea.slug[locale] } }}
            className="group flex min-w-0 items-start gap-3 sm:justify-end sm:text-right"
          >
            <span className="min-w-0">
              <span className="u-eyebrow block">{ui.actions.nextArea}</span>
              <span className="mt-1 block font-medium uppercase tracking-[0.02em] text-ink break-words">
                {nextArea.name[locale]}
                <span aria-hidden="true" className="u-num ml-2 text-sm">
                  {nextArea.index}
                </span>
              </span>
            </span>
            <ArrowIcon
              direction="right"
              className="mt-1 shrink-0 text-brand-700 transition-transform duration-200 ease-out group-hover:translate-x-1"
            />
          </Link>
        </nav>
      </Section>
    </>
  );
}
