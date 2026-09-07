import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Ubuntu } from "next/font/google";
import { routing, type Locale } from "@/i18n/routing";
import { getDictionary } from "@/content";
import { Header, Footer, SkipLink } from "@/components/layout";
import "../globals.css";

/**
 * Ubuntu is the only family on this site (DESIGN.md §2).
 * latin-ext is required — Spanish copy needs í, ó, ñ.
 */
const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  weight: ["300", "400", "500", "700"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { site, ui } = getDictionary(locale);

  return {
    title: {
      default: site.name,
      template: `%s — ${site.shortName}`,
    },
    description: ui.pages.home.description,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${ubuntu.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <NextIntlClientProvider>
          <SkipLink locale={locale} />
          <Header locale={locale} />
          <main id="main-content" className="flex flex-1 flex-col">
            {children}
          </main>
          <Footer locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
