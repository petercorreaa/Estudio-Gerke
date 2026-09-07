import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getDictionary } from "@/content";
import { Section, SectionTitle, Button, BracketFrame, Hairline, Prose } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { ui } = getDictionary(locale);
  return {
    title: ui.pages.firmProfile.title,
    description: ui.pages.firmProfile.description,
  };
}

/**
 * A title in the left rail and body copy on the right, at >=1024px. Below
 * that, both release to normal single-column flow — including `sticky`,
 * which only applies at the `lg` breakpoint.
 */
function ReadingRail({
  title,
  paragraphs,
  sticky = false,
}: {
  title: string;
  paragraphs: readonly string[];
  sticky?: boolean;
}) {
  return (
    <div className="lg:grid lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-4">
        <div className={sticky ? "lg:sticky lg:top-28" : undefined}>
          <BracketFrame variant="marker" className="mb-5" />
          <h2 className="u-display u-h3">{title}</h2>
        </div>
      </div>
      <div className="mt-8 lg:col-span-7 lg:col-start-6 lg:mt-0">
        <Prose>
          {paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </Prose>
      </div>
    </div>
  );
}

export default async function FirmProfilePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { ui, firmProfile } = getDictionary(locale);

  return (
    <>
      {/* ============================================================ 1. HEADER */}
      <Section tone="paper">
        <SectionTitle level={1} eyebrow={ui.footer.navHeading} marker>
          {ui.pages.firmProfile.title}
        </SectionTitle>
        <Prose lead className="mt-6">
          {firmProfile.header.lead}
        </Prose>
        <Hairline className="mt-12" />
      </Section>

      {/* ============================================================ 2. HISTORIA */}
      <Section tone="alt">
        <ReadingRail
          title={firmProfile.historia.title}
          paragraphs={firmProfile.historia.paragraphs}
          sticky
        />
      </Section>

      {/* ===================================================== 3. NUESTRO ENFOQUE */}
      <Section tone="paper">
        <ReadingRail
          title={firmProfile.enfoque.title}
          paragraphs={firmProfile.enfoque.paragraphs}
        />
      </Section>

      {/* =================================================== 4. CÓMO TRABAJAMOS */}
      <Reveal>
        <Section tone="alt">
          <SectionTitle level={2} marker>
            {firmProfile.comoTrabajamos.title}
          </SectionTitle>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
            {firmProfile.comoTrabajamos.cards.map((card) => (
              <BracketFrame key={card.title} openSide="right" className="p-6 lg:p-8">
                <h3 className="u-display u-h3">{card.title}</h3>
                <p className="u-body mt-4">{card.body}</p>
              </BracketFrame>
            ))}
          </div>
        </Section>
      </Reveal>

      {/* =============================================== 5. ASESORÍA Y LITIGIO */}
      <Reveal>
        <Section tone="dark">
          <SectionTitle level={2} marker>
            {firmProfile.asesoriaYLitigio.title}
          </SectionTitle>
          <Prose className="mt-6">
            {firmProfile.asesoriaYLitigio.paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </Prose>
        </Section>
      </Reveal>

      {/* ============================================= 6. TRABAJO LEGISLATIVO */}
      <Section tone="paper">
        <ReadingRail
          title={firmProfile.trabajoLegislativo.title}
          paragraphs={firmProfile.trabajoLegislativo.paragraphs}
        />
      </Section>

      {/* ======================================== 7. COMPROMISO CON LA COMUNIDAD */}
      <Reveal>
        <Section tone="alt">
          <ReadingRail
            title={firmProfile.compromiso.title}
            paragraphs={firmProfile.compromiso.paragraphs}
          />
        </Section>
      </Reveal>

      {/* ==================================================== 8. CLOSING CTA */}
      <Section tone="paper">
        <div className="mx-auto max-w-2xl text-center">
          <SectionTitle level={2} className="items-center text-center">
            {ui.form.heading}
          </SectionTitle>
          <Prose lead className="mt-5 text-center">
            {firmProfile.cta.body}
          </Prose>
          <div className="mt-8 flex justify-center">
            <Button href={{ pathname: "/contact" }}>{ui.nav.contact}</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
