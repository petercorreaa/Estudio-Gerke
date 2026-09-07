import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getLawyerBySlug, getDictionary, hasLawyerField, lawyers } from "@/content";
import { Section, Eyebrow, Button, Prose } from "@/components/ui";
import { ArrowIcon } from "@/components/icons/ArrowIcon";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

type Params = { locale: Locale; slug: string };

/** Lawyer slugs are identical in both locales — a name is not translated. */
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

  const { ui } = getDictionary(locale);

  return {
    title: lawyer.name,
    // Never surface the TODO sentinel in a meta tag — fall back to the
    // section's generic description until the role is confirmed.
    description: hasLawyerField(lawyer, "role")
      ? `${lawyer.name} — ${lawyer.role[locale]}`
      : ui.pages.lawyers.description,
  };
}

export default async function LawyerPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const { ui, lawyerProfileLabels, practiceAreas, lawyers: resolvedLawyers } = getDictionary(locale);

  const lawyer = resolvedLawyers.find((l) => l.slug === slug);
  if (!lawyer) notFound();

  const currentIndex = resolvedLawyers.findIndex((l) => l.slug === slug);
  const total = resolvedLawyers.length;
  const prevLawyer = resolvedLawyers[(currentIndex - 1 + total) % total];
  const nextLawyer = resolvedLawyers[(currentIndex + 1) % total];

  const showRole = hasLawyerField(lawyer, "role");
  const showBio = hasLawyerField(lawyer, "bio");
  const showEducation = hasLawyerField(lawyer, "education") && lawyer.education.length > 0;
  const showLanguages = hasLawyerField(lawyer, "languages") && lawyer.languages.length > 0;
  const showBarAdmissions =
    hasLawyerField(lawyer, "barAdmissions") && lawyer.barAdmissions.length > 0;
  const showPracticeAreas =
    hasLawyerField(lawyer, "practiceAreaIds") && lawyer.practiceAreaIds.length > 0;

  return (
    <>
      <Section tone="paper">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          {/* ============================================= LEFT — IDENTITY === */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <h1 className="u-display u-h1 break-words">{lawyer.name}</h1>
              {showRole ? <p className="mt-2 text-brand-ink">{lawyer.role}</p> : null}
              <Button
                className="mt-6"
                href={{ pathname: "/contact", query: { subject: lawyer.name } }}
              >
                {ui.actions.contactLawyer}
              </Button>
            </div>
          </div>

          {/* ============================================== RIGHT — DETAIL === */}
          <div className="mt-12 lg:col-span-7 lg:col-start-6 lg:mt-0">
            {showBio ? (
              <div>
                <Eyebrow as="h2">{lawyerProfileLabels.profileHeading}</Eyebrow>
                <Prose className="mt-4">
                  <p>{lawyer.bio}</p>
                </Prose>
              </div>
            ) : null}

            {showEducation ? (
              <div className={showBio ? "mt-12" : undefined}>
                <Eyebrow as="h2">{lawyerProfileLabels.educationHeading}</Eyebrow>
                <Prose className="mt-4">
                  <ul>
                    {lawyer.education.map((degree, i) => (
                      <li key={i}>{degree}</li>
                    ))}
                  </ul>
                </Prose>
              </div>
            ) : null}

            {showPracticeAreas ? (
              <div className={showBio || showEducation ? "mt-12" : undefined}>
                <Eyebrow as="h2">{ui.pages.practiceAreas.title}</Eyebrow>
                <div className="mt-4 flex flex-wrap gap-2">
                  {lawyer.practiceAreaIds.map((id) => {
                    const area = practiceAreas.find((a) => a.id === id);
                    if (!area) return null;
                    return (
                      <Link
                        key={id}
                        href={{ pathname: "/practice-areas/[slug]", params: { slug: area.slug } }}
                        className="inline-flex items-center rounded-bracket border border-brand-600 px-3 py-1.5 text-sm text-brand-ink transition-colors duration-200 ease-out hover:border-brand-700 hover:text-brand-900"
                      >
                        {area.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {showLanguages ? (
              <div className={showBio || showEducation || showPracticeAreas ? "mt-12" : undefined}>
                <Eyebrow as="h2">{lawyerProfileLabels.languagesHeading}</Eyebrow>
                <p className="u-body mt-4">{lawyer.languages.join(", ")}</p>
              </div>
            ) : null}

            {showBarAdmissions ? (
              <div
                className={
                  showBio || showEducation || showPracticeAreas || showLanguages ? "mt-12" : undefined
                }
              >
                <Eyebrow as="h2">{lawyerProfileLabels.barAdmissionsHeading}</Eyebrow>
                <Prose className="mt-4">
                  <ul>
                    {lawyer.barAdmissions.map((admission, i) => (
                      <li key={i}>{admission}</li>
                    ))}
                  </ul>
                </Prose>
              </div>
            ) : null}
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
