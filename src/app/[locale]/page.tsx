import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getDictionary, format, getPracticeAreaById } from "@/content";
// Server-only (reads the filesystem) — imported directly, not through the
// @/content barrel, which client components also pull from. See the note in
// src/content/index.ts.
import { getPublishedArticles } from "@/content/publications-loader";
import { Section, SectionTitle, Eyebrow, Button, BracketFrame, Hairline, Prose } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { Link } from "@/i18n/navigation";
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
    title: ui.pages.home.title,
    description: ui.pages.home.description,
  };
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M5 12h13M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const PRACTICE_AREA_PREVIEW_COUNT = 8;
const PUBLICATIONS_PREVIEW_COUNT = 3;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { site, ui, home, practiceAreas, lawyers } = getDictionary(locale);
  const previewAreas = practiceAreas.slice(0, PRACTICE_AREA_PREVIEW_COUNT);
  const recentArticles = getPublishedArticles(locale).slice(0, PUBLICATIONS_PREVIEW_COUNT);

  const statValues: Record<(typeof home.firmBrief.stats)[number]["id"], string> = {
    founded: String(site.founded),
    lawyers: String(lawyers.length),
    practiceAreas: String(practiceAreas.length),
  };

  const dateFormatter = new Intl.DateTimeFormat(locale === "es" ? "es-BO" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      {/* ============================================================ 1. HERO */}
      <Section tone="paper" className="pb-16 lg:pb-28">
        <div className="pt-6 lg:flex lg:items-center lg:justify-between lg:gap-16 lg:pt-20">
          <div className="max-w-[46ch]">
            <Eyebrow>{home.hero.eyebrow}</Eyebrow>
            <h1 className="u-display mt-4 max-w-[14ch] text-[clamp(2rem,5.5vw,4rem)]">
              {home.hero.title}
            </h1>
            <div className="mt-6 max-w-[52ch]">
              <Prose lead>{home.hero.lead}</Prose>
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href={{ pathname: "/practice-areas" }}>{ui.nav.practiceAreas}</Button>
              <Button variant="ghost" href={{ pathname: "/contact" }}>
                {ui.nav.contact}
              </Button>
            </div>
          </div>

          <div className="mt-16 shrink-0 lg:mt-0">
            <BracketFrame openSide="right" className="flex flex-col items-center px-10 py-10 text-center lg:px-14 lg:py-14">
              <p className="u-num text-[clamp(4rem,14vw,8rem)] leading-none">{site.founded}</p>
              <p className="mt-4 max-w-[20ch] text-sm text-ink/80">{home.hero.numeralCaption}</p>
            </BracketFrame>
          </div>
        </div>
      </Section>

      {/* ==================================================== 2. POSITIONING */}
      <Reveal>
        <Section tone="alt">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
            {home.positioning.map((item) => (
              <div key={item.title}>
                <Hairline variant="short" className="mb-6" />
                <BracketFrame variant="marker" className="mb-5" />
                <h2 className="u-display u-h3">{item.title}</h2>
                <p className="u-body mt-3">{item.body}</p>
              </div>
            ))}
          </div>
        </Section>
      </Reveal>

      {/* ============================================ 3. PRACTICE AREAS PREVIEW */}
      <Section tone="paper">
        <SectionTitle level={2} marker>
          {ui.pages.practiceAreas.title}
        </SectionTitle>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 md:gap-x-12">
          {previewAreas.map((area) => (
            <Link
              key={area.id}
              href={{ pathname: "/practice-areas/[slug]", params: { slug: area.slug } }}
              className="group flex min-h-14 items-center justify-between gap-4 border-b border-neutral-500/40 py-4 transition-colors duration-200 ease-out hover:border-brand-700"
            >
              <span className="flex min-w-0 items-baseline gap-4">
                <span aria-hidden="true" className="u-num text-sm">
                  {area.index}
                </span>
                <span className="min-w-0 break-words font-medium text-ink">{area.name}</span>
              </span>
              <ArrowIcon className="shrink-0 text-brand-700 transition-transform duration-200 ease-out group-hover:translate-x-1" />
            </Link>
          ))}
        </div>

        <div className="mt-10">
          <Button variant="ghost" href={{ pathname: "/practice-areas" }}>
            {format(ui.actions.viewAllPracticeAreasCount, { count: practiceAreas.length })}
          </Button>
        </div>
      </Section>

      {/* ====================================================== 4. FIRM BRIEF */}
      <Reveal>
        <Section tone="dark">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <h2 className="u-display u-h2">{home.firmBrief.title}</h2>
            </div>
            <div className="mt-8 lg:col-span-7 lg:col-start-6 lg:mt-0">
              {home.firmBrief.paragraphs.map((paragraph, i) => (
                <p key={i} className="u-body mt-5 first:mt-0">
                  {paragraph}
                </p>
              ))}

              <div className="mt-12 grid grid-cols-3 gap-6 border-t border-paper/15 pt-8">
                {home.firmBrief.stats.map((stat) => (
                  <div key={stat.id}>
                    <p className="u-num text-4xl lg:text-5xl">{statValues[stat.id]}</p>
                    <p className="u-eyebrow mt-2">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>
      </Reveal>

      {/* ============================================ 5. PUBLICATIONS PREVIEW */}
      {/* Omitted entirely when nothing is published yet (all seed content
          ships as status: "draft" — see src/content/publications/) rather
          than showing a title over an empty grid. */}
      {recentArticles.length > 0 ? (
        <Section tone="paper">
          <SectionTitle level={2} marker>
            {home.publicationsPreview.title}
          </SectionTitle>
          <Prose className="mt-5">
            <p>{home.publicationsPreview.intro}</p>
          </Prose>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            {recentArticles.map((article) => {
              const area = getPracticeAreaById(article.practiceAreaIds[0]);
              return (
                <BracketFrame key={article.slug} openSide="right" className="flex h-full flex-col p-6">
                  <p className="text-xs text-brand-ink">
                    <time dateTime={article.date}>{dateFormatter.format(new Date(article.date))}</time>
                    {area ? ` · ${area.name[locale]}` : null}
                  </p>
                  <h3 className="mt-3 font-medium text-ink">{article.title}</h3>
                  <p className="mt-3 line-clamp-2 flex-1 text-sm text-ink">{article.summary}</p>
                  <Link
                    href={{ pathname: "/publications/[slug]", params: { slug: article.slug } }}
                    className="mt-5 inline-flex w-fit items-center gap-1 text-sm font-medium text-brand-ink transition-colors duration-200 ease-out hover:text-brand-900"
                  >
                    {ui.actions.readMore}
                  </Link>
                </BracketFrame>
              );
            })}
          </div>
        </Section>
      ) : null}

      {/* ============================================================ 6. COMMITMENT */}
      <Reveal>
        <Section tone="alt">
          <SectionTitle level={2}>{home.commitment.title}</SectionTitle>
          <Prose className="mt-6">
            {home.commitment.paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </Prose>
        </Section>
      </Reveal>

      {/* ========================================================= 7. CONTACT CTA */}
      <Section tone="paper">
        <div className="mx-auto max-w-2xl text-center">
          <SectionTitle level={2} className="items-center text-center">
            {ui.form.heading}
          </SectionTitle>
          {/* Parent's max-w-2xl already constrains this narrower than Prose's
              own 68ch cap, so no width override is needed here. */}
          <Prose lead className="mt-5 text-center">
            {ui.form.intro}
          </Prose>
          <div className="mt-8 flex justify-center">
            <Button href={{ pathname: "/contact" }}>{ui.nav.contact}</Button>
          </div>
          <div className="mt-10 text-sm text-ink">
            <p>{site.address}</p>
            <p className="mt-2">
              {site.phones.map((phone, i) => (
                <span key={phone}>
                  {i > 0 ? " · " : null}
                  <a
                    href={toTelHref(phone)}
                    className="transition-colors duration-200 ease-out hover:text-brand-ink"
                  >
                    {phone}
                  </a>
                </span>
              ))}
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
