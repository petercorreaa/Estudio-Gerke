import { site } from "./site";
import { ui } from "./ui";
import { practiceAreas } from "./practice-areas";
import { lawyers, lawyerProfileLabels } from "./lawyers";
import { home } from "./home";
import { firmProfile } from "./firm-profile";
import { practiceAreaDetailLabels } from "./practice-area-details";
import { publicationLabels } from "./publications-labels";
import { localize, type Locale, type Localize } from "./types";

export { site } from "./site";
export { ui } from "./ui";
export {
  practiceAreas,
  getPracticeAreaById,
  PRACTICE_AREA_COUNT,
  type PracticeArea,
  type PracticeAreaId,
} from "./practice-areas";
export {
  lawyers,
  getLawyerBySlug,
  lawyerProfileLabels,
  LAWYER_PHOTO_WIDTH,
  LAWYER_PHOTO_HEIGHT,
  PENDING_MEMBER_COUNT,
  type Lawyer,
  type LawyerSlug,
} from "./lawyers";
export { home, type HomeContent } from "./home";
export { firmProfile, type FirmProfileContent, type FirmProfileCard } from "./firm-profile";
export {
  getPracticeAreaDetail,
  practiceAreaDetailLabels,
  type PracticeAreaDetail,
} from "./practice-area-details";
// NOTE: publications-loader.ts is deliberately NOT re-exported here. It reads
// the filesystem, and this barrel is imported by client components
// (LanguageSwitcher, via getDictionary), bundling `fs` for the browser
// breaks the build. Server components (page.tsx files) import it directly:
// `import { getPublishedArticles } from "@/content/publications-loader"`.
export { publicationLabels, type PublicationLabels } from "./publications-labels";
export {
  format,
  localize,
  isLocalized,
  TODO,
  type Locale,
  type Localize,
  type Localized,
} from "./types";

const source = {
  site,
  ui,
  practiceAreas,
  lawyers,
  home,
  firmProfile,
  practiceAreaDetailLabels,
  lawyerProfileLabels,
  publicationLabels,
} as const;

/** Everything a page needs, resolved to one language. */
export type Dictionary = Localize<typeof source>;

const dictionaries: Readonly<Record<Locale, Dictionary>> = {
  es: localize(source, "es"),
  en: localize(source, "en"),
};

/**
 * The single entry point for site copy.
 *
 * Synchronous on purpose: the content lives in TypeScript modules, not on
 * disk, so there is nothing to await, and both locales are resolved once at
 * module load rather than on every render.
 *
 *   const t = getDictionary(locale);
 *   t.ui.nav.practiceAreas   // "Áreas de Práctica" | "Practice Areas"
 *   t.practiceAreas[0].name  // already a plain string
 */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
