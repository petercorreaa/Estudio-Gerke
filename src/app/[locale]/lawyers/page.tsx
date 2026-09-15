import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import {
  getDictionary,
  LAWYER_PHOTO_WIDTH,
  LAWYER_PHOTO_HEIGHT,
  PENDING_MEMBER_COUNT,
} from "@/content";
import { Section, SectionTitle, Eyebrow, Prose, BracketFrame, Hairline } from "@/components/ui";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { ui } = getDictionary(locale);
  return {
    title: ui.pages.lawyers.title,
    description: ui.pages.lawyers.description,
  };
}

export default async function LawyersPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { ui, lawyers } = getDictionary(locale);

  // The firm's own split: the four partners lead the page with their
  // portraits, everyone else is listed by name below them.
  const partners = lawyers.filter((lawyer) => lawyer.isPartner);
  const team = lawyers.filter((lawyer) => !lawyer.isPartner);
  const pending = Array.from({ length: PENDING_MEMBER_COUNT }, (_, i) => i);

  return (
    <>
      <Section tone="paper" className="pb-0">
        <SectionTitle level={1} eyebrow={ui.pages.lawyers.eyebrow} marker>
          {ui.pages.lawyers.title}
        </SectionTitle>
        <Prose lead className="mt-6">
          {ui.pages.lawyers.lead}
        </Prose>
      </Section>

      {/* One band for the whole roster, the two groups spaced inside it:
          partners and team are halves of one list, so putting each in its own
          Section would open the full section rhythm between them and read as
          two unrelated pages. */}
      <Section tone="paper">
        {/* ================================================== THE PARTNERS ===
            Four across on one line from `md` up, two below that. Never three:
            a widow in the second row is exactly what this row exists to
            avoid, since the point of it is that the four read as one group. */}
        <Eyebrow as="h2">{ui.pages.lawyers.partnersHeading}</Eyebrow>
        <ul
          aria-label={ui.pages.lawyers.partnersHeading}
          className="mt-6 grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-6"
        >
          {partners.map((lawyer) => (
            <li key={lawyer.slug}>
              <Link
                href={{ pathname: "/lawyers/[slug]", params: { slug: lawyer.slug } }}
                className="group block h-full"
              >
                <BracketFrame
                  tone="muted"
                  openSide="right"
                  className="flex h-full flex-col p-4 transition-[border-color,translate] duration-200 ease-out hover:-translate-y-0.5 hover:border-brand-700 lg:p-5"
                >
                  {lawyer.photo ? (
                    <Image
                      src={lawyer.photo}
                      alt={lawyer.name}
                      width={LAWYER_PHOTO_WIDTH}
                      height={LAWYER_PHOTO_HEIGHT}
                      sizes="(min-width: 1024px) 17rem, (min-width: 768px) 22vw, 45vw"
                      priority
                      className="h-auto w-full rounded-bracket rounded-r-none object-cover"
                    />
                  ) : null}
                  <Hairline className="mb-3 mt-4" />
                  <span className="u-display block text-[clamp(0.95rem,1.4vw,1.25rem)]">
                    {lawyer.name}
                  </span>
                  <span className="mt-1 block text-sm text-brand-ink">{lawyer.role}</span>
                </BracketFrame>
              </Link>
            </li>
          ))}
        </ul>

        {/* ======================================================= THE TEAM ===
            Name and role only, no portrait, by the firm's instruction. The
            unnamed cards at the end are real people the firm has taken on and
            not yet named to us; they are placeholders on purpose, not a bug. */}
        <Eyebrow as="h2" className="mt-16 lg:mt-20">
          {ui.pages.lawyers.teamHeading}
        </Eyebrow>
        <ul
          aria-label={ui.pages.lawyers.teamHeading}
          className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
        >
          {team.map((lawyer) => (
            <li key={lawyer.slug}>
              <Link
                href={{ pathname: "/lawyers/[slug]", params: { slug: lawyer.slug } }}
                className="group block h-full"
              >
                <BracketFrame
                  tone="muted"
                  openSide="right"
                  className="flex h-full flex-col justify-center p-5 transition-[border-color,translate] duration-200 ease-out hover:-translate-y-0.5 hover:border-brand-700"
                >
                  {/* Same size as the partner names, never larger: the
                      portraits are what give the partners their weight, and a
                      bigger name down here would work against that. */}
                  <span className="u-display block text-[clamp(0.95rem,1.4vw,1.25rem)]">
                    {lawyer.name}
                  </span>
                  <span className="mt-1 block text-sm text-brand-ink">{lawyer.role}</span>
                </BracketFrame>
              </Link>
            </li>
          ))}

          {pending.map((i) => (
            <li key={`pending-${i}`}>
              <BracketFrame
                tone="muted"
                openSide="right"
                className="flex h-full flex-col justify-center p-5"
              >
                <span className="block text-base text-ink/60">
                  {ui.pages.lawyers.pendingMember}
                </span>
              </BracketFrame>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
