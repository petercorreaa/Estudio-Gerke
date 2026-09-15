import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import {
  getLawyerBySlug,
  getDictionary,
  lawyers,
  LAWYER_PHOTO_WIDTH,
  LAWYER_PHOTO_HEIGHT,
} from "@/content";
import { Section, Eyebrow, Button, Prose, BracketFrame } from "@/components/ui";
import { ArrowIcon } from "@/components/icons/ArrowIcon";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import type { Locale } from "@/i18n/routing";

type Params = { locale: Locale; slug: string };

/** Lawyer slugs are identical in both locales; a name is not translated. */
export function generateStaticParams() {
  return lawyers.map((lawyer) => ({ slug: lawyer.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const lawyer = getLawyerBySlug(slug);
  if (!lawyer) return {};

  return {
    title: lawyer.name,
    description: `${lawyer.name}, ${lawyer.role[locale]}. ${lawyer.practiceAreasText[locale]}`,
  };
}

export default async function LawyerPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const { ui, lawyerProfileLabels, lawyers: resolvedLawyers } = getDictionary(locale);

  const lawyer = resolvedLawyers.find((l) => l.slug === slug);
  if (!lawyer) notFound();

  const currentIndex = resolvedLawyers.findIndex((l) => l.slug === slug);
  const total = resolvedLawyers.length;
  const prevLawyer = resolvedLawyers[(currentIndex - 1 + total) % total];
  const nextLawyer = resolvedLawyers[(currentIndex + 1) % total];

  return (
    <>
      <Section tone="paper">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          {/* ============================================= LEFT: IDENTITY === */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              {/*
                The portrait carries the firm's own motif rather than a drop
                shadow: a 2px bracket, open on the right, offset behind the
                photograph so the frame reads as the logo's rounded square
                holding the person the way it holds the wordmark.
              */}
              {lawyer.photo ? (
                <div className="relative w-full max-w-[19rem]">
                  <div
                    aria-hidden="true"
                    className="absolute -bottom-3 -left-3 h-full w-full rounded-bracket rounded-r-none border-y-2 border-l-2 border-r-0 border-brand-600"
                  />
                  <Image
                    src={lawyer.photo}
                    alt={lawyer.name}
                    width={LAWYER_PHOTO_WIDTH}
                    height={LAWYER_PHOTO_HEIGHT}
                    sizes="(min-width: 1024px) 19rem, (min-width: 640px) 19rem, 60vw"
                    priority
                    className="relative h-auto w-full rounded-bracket object-cover"
                  />
                </div>
              ) : (
                /* Only the partners carry a portrait. Without one, the bracket
                   marker takes the photo's place so the column still opens on
                   the motif rather than starting cold on the name. */
                <BracketFrame variant="marker" openSide="right" />
              )}

              <h1 className={cn("u-display u-h2 break-words", lawyer.photo ? "mt-8" : "mt-6")}>
                {lawyer.name}
              </h1>
              <p className="mt-2 text-brand-ink">{lawyer.role}</p>

              <div className="mt-5">
                <Eyebrow as="h2">{lawyerProfileLabels.emailHeading}</Eyebrow>
                <a
                  href={`mailto:${lawyer.email}`}
                  className="mt-2 block w-fit break-all text-sm text-brand-ink underline decoration-1 underline-offset-2 transition-colors duration-200 ease-out hover:text-brand-900"
                >
                  {lawyer.email}
                </a>
              </div>

              <Button
                className="mt-6"
                href={{ pathname: "/contact", query: { subject: lawyer.name } }}
              >
                {ui.actions.contactLawyer}
              </Button>
            </div>
          </div>

          {/* ============================================== RIGHT: DETAIL === */}
          <div className="mt-14 lg:col-span-7 lg:col-start-6 lg:mt-0">
            <div>
              <Eyebrow as="h2">{lawyerProfileLabels.practiceAreasHeading}</Eyebrow>
              <Prose className="mt-4">
                <p>{lawyer.practiceAreasText}</p>
              </Prose>
            </div>

            <div className="mt-12">
              <Eyebrow as="h2">{lawyerProfileLabels.biographyHeading}</Eyebrow>
              <Prose className="mt-4">
                <p>{lawyer.bio}</p>
              </Prose>
            </div>

            <div className="mt-12">
              <Eyebrow as="h2">{lawyerProfileLabels.languagesHeading}</Eyebrow>
              <p className="u-body mt-4">{lawyer.languages}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ================================================== PREV / NEXT === */}
      <Section tone="alt">
        <nav aria-label={ui.aria.lawyerList} className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <Link
            href={{ pathname: "/lawyers/[slug]", params: { slug: prevLawyer.slug } }}
            className="group flex min-w-0 items-start gap-3"
          >
            <ArrowIcon
              direction="left"
              className="mt-1 shrink-0 text-brand-700 transition-transform duration-200 ease-out group-hover:-translate-x-1"
            />
            <span className="min-w-0">
              <span className="u-eyebrow block">{ui.actions.previousLawyer}</span>
              <span className="mt-1 block break-words font-medium uppercase tracking-[0.02em] text-ink">
                {prevLawyer.name}
              </span>
            </span>
          </Link>

          <Link
            href={{ pathname: "/lawyers/[slug]", params: { slug: nextLawyer.slug } }}
            className="group flex min-w-0 items-start gap-3 sm:justify-end sm:text-right"
          >
            <span className="min-w-0">
              <span className="u-eyebrow block">{ui.actions.nextLawyer}</span>
              <span className="mt-1 block break-words font-medium uppercase tracking-[0.02em] text-ink">
                {nextLawyer.name}
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
