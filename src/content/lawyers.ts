import type { PracticeAreaId } from "./practice-areas";
import { TODO, type Localized } from "./types";

/**
 * ============================================================================
 * PENDIENTE DE CONFIRMACIÓN DEL CLIENTE / AWAITING CLIENT INPUT
 * ============================================================================
 *
 * Nothing below is invented. Every field the client has not supplied carries a
 * `TODO` marker and is listed in that lawyer's `pending` array, so the gaps are
 * queryable rather than buried in prose.
 *
 * Confirmed today:
 *   carlos-gerke-mendieta  name, role, education
 *   marcela-gerke-siles    name, role, education, languages
 *
 * Needed from the client, per lawyer:
 *
 *   carlos-gerke-mendieta  languages, barAdmissions, practiceAreaIds, bio
 *   marcela-gerke-siles    barAdmissions, practiceAreaIds, bio
 *   carlos-gerke-siles     FULL NAME, role, education, languages,
 *                          barAdmissions, practiceAreaIds, bio
 *   david                  FULL NAME, role, education, languages,
 *                          barAdmissions, practiceAreaIds, bio
 *   andres                 FULL NAME, role, education, languages,
 *                          barAdmissions, practiceAreaIds, bio
 *   claudia                FULL NAME, role, education, languages,
 *                          barAdmissions, practiceAreaIds, bio
 *   fabian                 FULL NAME, role, education, languages,
 *                          barAdmissions, practiceAreaIds, bio
 *   diana                  FULL NAME, role, education, languages,
 *                          barAdmissions, practiceAreaIds, bio
 *   christian              FULL NAME, role, education, languages,
 *                          barAdmissions, practiceAreaIds, bio
 *
 * Also to confirm: the slugs for the last six are first names only. Once the
 * surnames arrive, migrate them to `nombre-apellido` form to match the two
 * founding partners, and add redirects if anything has been shared publicly.
 *
 * NOTE: there is deliberately NO photo field in this schema. The client
 * rejected associate photos, and CLAUDE.md rule 1 forbids photographs of
 * people anywhere on the site. Do not add one.
 */

export type LawyerField =
  | "name"
  | "role"
  | "education"
  | "languages"
  | "barAdmissions"
  | "practiceAreaIds"
  | "bio";

export interface Lawyer {
  /** URL segment. Identical in both locales — a person's name is not translated. */
  readonly slug: string;
  /** Full legal name, or a first name where the surname is still pending. */
  readonly name: string;
  readonly role: Localized;
  /** Degrees, institutions and years, exactly as supplied by the firm. */
  readonly education: readonly Localized[];
  readonly barAdmissions: readonly Localized[];
  readonly languages: readonly Localized[];
  readonly practiceAreaIds: readonly PracticeAreaId[];
  readonly bio: Localized;
  /** Fields still awaiting the client. Empty means the entry is complete. */
  readonly pending: readonly LawyerField[];
}

/** Every field a lawyer entry can be missing — used for the placeholder rows. */
const ALL_PENDING: readonly LawyerField[] = [
  "name",
  "role",
  "education",
  "languages",
  "barAdmissions",
  "practiceAreaIds",
  "bio",
];

export const lawyers = [
  {
    slug: "carlos-gerke-mendieta",
    name: "Carlos Gerke Mendieta",
    role: { es: "Socio Fundador", en: "Founding Partner" },
    education: [
      {
        es: "Licenciado en Derecho y Ciencias Políticas, Universidad Mayor de San Andrés (1967)",
        en: "Licenciado en Derecho y Ciencias Políticas, Universidad Mayor de San Andrés (1967)",
      },
    ],
    barAdmissions: [TODO],
    languages: [TODO],
    practiceAreaIds: [],
    bio: TODO,
    pending: ["languages", "barAdmissions", "practiceAreaIds", "bio"],
  },
  {
    slug: "marcela-gerke-siles",
    name: "Marcela Gerke Siles",
    role: { es: "Socia Fundadora", en: "Founding Partner" },
    education: [
      {
        es: 'Universidad Católica Boliviana "San Pablo" (1997)',
        en: 'Universidad Católica Boliviana "San Pablo" (1997)',
      },
      {
        es: "Máster en Derecho Privado, CEU Instituto de Estudios Superiores, Madrid (2002)",
        en: "Máster en Derecho Privado, CEU Instituto de Estudios Superiores, Madrid (2002)",
      },
      {
        es: "LL.M. en Derecho Comparado, Tulane University Law School, Nueva Orleans (1998)",
        en: "LL.M. in Comparative Law, Tulane University Law School, New Orleans (1998)",
      },
    ],
    barAdmissions: [TODO],
    languages: [
      { es: "Español", en: "Spanish" },
      { es: "Inglés", en: "English" },
    ],
    practiceAreaIds: [],
    bio: TODO,
    pending: ["barAdmissions", "practiceAreaIds", "bio"],
  },
  {
    slug: "carlos-gerke-siles",
    name: "Carlos Gerke Siles",
    role: TODO,
    education: [TODO],
    barAdmissions: [TODO],
    languages: [TODO],
    practiceAreaIds: [],
    bio: TODO,
    pending: ["role", "education", "languages", "barAdmissions", "practiceAreaIds", "bio"],
  },
  {
    // TODO: apellido pendiente de confirmación / surname pending confirmation.
    slug: "david",
    name: "David",
    role: TODO,
    education: [TODO],
    barAdmissions: [TODO],
    languages: [TODO],
    practiceAreaIds: [],
    bio: TODO,
    pending: ALL_PENDING,
  },
  {
    // TODO: apellido pendiente de confirmación / surname pending confirmation.
    slug: "andres",
    name: "Andrés",
    role: TODO,
    education: [TODO],
    barAdmissions: [TODO],
    languages: [TODO],
    practiceAreaIds: [],
    bio: TODO,
    pending: ALL_PENDING,
  },
  {
    // TODO: apellido pendiente de confirmación / surname pending confirmation.
    slug: "claudia",
    name: "Claudia",
    role: TODO,
    education: [TODO],
    barAdmissions: [TODO],
    languages: [TODO],
    practiceAreaIds: [],
    bio: TODO,
    pending: ALL_PENDING,
  },
  {
    // TODO: apellido pendiente de confirmación / surname pending confirmation.
    slug: "fabian",
    name: "Fabián",
    role: TODO,
    education: [TODO],
    barAdmissions: [TODO],
    languages: [TODO],
    practiceAreaIds: [],
    bio: TODO,
    pending: ALL_PENDING,
  },
  {
    // TODO: apellido pendiente de confirmación / surname pending confirmation.
    slug: "diana",
    name: "Diana",
    role: TODO,
    education: [TODO],
    barAdmissions: [TODO],
    languages: [TODO],
    practiceAreaIds: [],
    bio: TODO,
    pending: ALL_PENDING,
  },
  {
    // TODO: apellido pendiente de confirmación / surname pending confirmation.
    slug: "christian",
    name: "Christian",
    role: TODO,
    education: [TODO],
    barAdmissions: [TODO],
    languages: [TODO],
    practiceAreaIds: [],
    bio: TODO,
    pending: ALL_PENDING,
  },
] as const satisfies readonly Lawyer[];

export type LawyerSlug = (typeof lawyers)[number]["slug"];

export function getLawyerBySlug(slug: string) {
  return lawyers.find((lawyer) => lawyer.slug === slug);
}

/** True when every field has been confirmed by the client. */
export function isLawyerComplete(lawyer: Lawyer): boolean {
  return lawyer.pending.length === 0;
}

/**
 * True when a specific field is ready to render. `name` is deliberately never
 * gated this way — the six first-name-only entries are real data (a genuine,
 * if incomplete, name), not a TODO placeholder, so it always renders. Every
 * other field is the literal TODO sentinel when pending, and must not reach
 * the page.
 */
export function hasLawyerField(
  lawyer: { readonly pending: readonly LawyerField[] },
  field: Exclude<LawyerField, "name">,
): boolean {
  return !lawyer.pending.includes(field);
}

/** Shared section labels used on every /lawyers/[slug] page. */
export const lawyerProfileLabels = {
  profileHeading: { es: "Perfil", en: "Profile" },
  educationHeading: { es: "Formación", en: "Education" },
  languagesHeading: { es: "Idiomas", en: "Languages" },
  barAdmissionsHeading: {
    es: "Colegios y registros",
    en: "Bar Admissions and Registrations",
  },
} as const satisfies Record<string, Localized>;
