/**
 * Client-safe translation manifest for articles.
 *
 * `LanguageSwitcher` runs in the browser and must never import the MDX
 * loader (`publications-loader.ts`, which reads the filesystem and cannot be
 * bundled for the client), so it uses this small, plain, hand-maintained
 * mapping instead. The loader cross-checks every article's `translationKey`
 * against this file at load time and throws if they disagree, so drift here
 * fails the build rather than silently producing a wrong language-switch
 * link.
 *
 * Adding a new article: add its `translationKey`/`slug` here too. An article
 * with only one language published so far is fine, just omit the other
 * locale's slug; the switcher falls back to the publications index rather
 * than linking to a 404.
 */
export const publicationTranslations: Readonly<Record<string, { es?: string; en?: string }>> = {
  "establishing-foreign-company": {
    es: "establecer-empresa-extranjera-en-bolivia",
    en: "establishing-a-foreign-owned-company-in-bolivia",
  },
  "commercial-arbitration": {
    es: "arbitraje-comercial-en-bolivia",
    en: "commercial-arbitration-in-bolivia",
  },
  "family-business-governance": {
    es: "gobernanza-en-empresas-familiares",
    en: "governance-in-family-businesses",
  },
  "regulated-sectors-investor": {
    es: "sectores-regulados-que-anticipar",
    en: "regulated-sectors-what-to-anticipate",
  },
  "ma-transactions": {
    es: "fusiones-y-adquisiciones-en-bolivia",
    en: "ma-in-bolivia",
  },
  "estate-succession": {
    es: "sucesion-patrimonial-y-proteccion-de-activos",
    en: "estate-succession-and-asset-protection",
  },
} as const;
