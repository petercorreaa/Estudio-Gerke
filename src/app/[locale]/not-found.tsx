import { getLocale } from "next-intl/server";
import { getDictionary } from "@/content";
import { Section, SectionTitle, Prose, Button } from "@/components/ui";
import type { Locale } from "@/i18n/routing";

export default async function NotFound() {
  const locale = (await getLocale()) as Locale;
  const { ui } = getDictionary(locale);

  return (
    <Section>
      <SectionTitle level={1} eyebrow={ui.notFound.eyebrow} marker>
        {ui.notFound.title}
      </SectionTitle>
      <Prose lead className="mt-6">
        {ui.notFound.body}
      </Prose>
      <div className="mt-10">
        <Button href="/" variant="ghost">
          {ui.actions.goHome}
        </Button>
      </div>
    </Section>
  );
}
