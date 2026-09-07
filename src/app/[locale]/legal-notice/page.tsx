import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getDictionary } from "@/content";
import { RouteStub } from "@/components/dev/RouteStub";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { ui } = getDictionary(locale);
  return {
    title: ui.pages.legalNotice.title,
    description: ui.pages.legalNotice.description,
  };
}

export default async function LegalNoticePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { ui } = getDictionary(locale);

  return (
    <RouteStub title={ui.pages.legalNotice.title} description={ui.legalNotice.pending} />
  );
}
