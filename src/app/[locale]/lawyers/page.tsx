import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getDictionary, hasLawyerField } from "@/content";
import { Section, SectionTitle, Prose, BracketFrame, Hairline } from "@/components/ui";
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
  const { ui, lawyers, practiceAreas } = getDictionary(locale);

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
        <ul aria-label={ui.aria.lawyerList} className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {lawyers.map((lawyer) => {
            const showRole = hasLawyerField(lawyer, "role");
            const areaNames = hasLawyerField(lawyer, "practiceAreaIds")
              ? lawyer.practiceAreaIds
                  .slice(0, 3)
                  .map((id) => practiceAreas.find((area) => area.id === id)?.name)
                  .filter((name): name is string => Boolean(name))
              : [];

            return (
              <li key={lawyer.slug}>
                <Link
                  href={{ pathname: "/lawyers/[slug]", params: { slug: lawyer.slug } }}
                  className="group block h-full"
                >
                  <BracketFrame
                    tone="muted"
                    openSide="right"
                    className="flex h-full flex-col p-6 transition-[border-color,translate] duration-200 ease-out hover:-translate-y-0.5 hover:border-brand-700 lg:p-7"
                  >
                    <span className="u-display u-h3 block">{lawyer.name}</span>
                    {showRole ? (
                      <span className="mt-1 block text-sm text-brand-ink">{lawyer.role}</span>
                    ) : null}
                    {areaNames.length > 0 ? (
                      <>
                        <Hairline className="mb-3 mt-4" />
                        <ul className="flex flex-col gap-1">
                          {areaNames.map((name) => (
                            <li key={name} className="text-sm text-ink">
                              {name}
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : null}
                  </BracketFrame>
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>
    </>
  );
}
