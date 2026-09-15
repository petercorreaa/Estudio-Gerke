import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { getDictionary, LAWYER_PHOTO_WIDTH, LAWYER_PHOTO_HEIGHT } from "@/content";
import { Section, SectionTitle, Prose, BracketFrame, Hairline } from "@/components/ui";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

/** Portraits above the fold on the widest grid; the rest load lazily. */
const EAGER_PORTRAIT_COUNT = 3;

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

      <Section tone="paper">
        <ul
          aria-label={ui.aria.lawyerList}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10"
        >
          {lawyers.map((lawyer, i) => (
            <li key={lawyer.slug}>
              <Link
                href={{ pathname: "/lawyers/[slug]", params: { slug: lawyer.slug } }}
                className="group block h-full"
              >
                <BracketFrame
                  tone="muted"
                  openSide="right"
                  className="flex h-full flex-col p-5 transition-[border-color,translate] duration-200 ease-out hover:-translate-y-0.5 hover:border-brand-700 lg:p-6"
                >
                  <Image
                    src={lawyer.photo}
                    alt={lawyer.name}
                    width={LAWYER_PHOTO_WIDTH}
                    height={LAWYER_PHOTO_HEIGHT}
                    sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 90vw"
                    priority={i < EAGER_PORTRAIT_COUNT}
                    className="h-auto w-full rounded-bracket rounded-r-none object-cover"
                  />
                  <Hairline className="mb-4 mt-5" />
                  <span className="u-display u-h3 block">{lawyer.name}</span>
                  <span className="mt-1 block text-sm text-brand-ink">{lawyer.role}</span>
                </BracketFrame>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
