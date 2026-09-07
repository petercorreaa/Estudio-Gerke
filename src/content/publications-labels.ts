import type { Localized } from "./types";

/** Shared interface copy for the publications index and article pages. */
export const publicationLabels = {
  filterAllLabel: { es: "Todas", en: "All" },
  filterGroupLabel: {
    es: "Filtrar por área de práctica",
    en: "Filter by practice area",
  },
  searchLabel: { es: "Buscar publicaciones", en: "Search publications" },
  searchPlaceholder: {
    es: "Buscar por título o resumen",
    en: "Search by title or summary",
  },
  emptyStateTitle: { es: "Sin resultados", en: "No results" },
  emptyStateBody: {
    es: "No hay publicaciones que coincidan con estos filtros.",
    en: "No publications match these filters.",
  },
  clearFilters: { es: "Limpiar filtros", en: "Clear filters" },
  /** `{minutes}` substituted with `format()`. */
  readingTime: { es: "{minutes} min de lectura", en: "{minutes} min read" },
  byAuthor: { es: "Por {author}", en: "By {author}" },
  relatedPracticeAreasHeading: {
    es: "Áreas relacionadas",
    en: "Related Practice Areas",
  },
  relatedArticlesHeading: {
    es: "Publicaciones relacionadas",
    en: "Related Publications",
  },
  consultCta: { es: "Consultar con el Estudio", en: "Consult with the Firm" },
  consultCtaBody: {
    es: "Si este tema afecta a su empresa o a su familia, escríbanos y lo dirigiremos al socio responsable de la materia.",
    en: "If this topic affects your company or your family, write to us and we will route it to the partner responsible for the subject.",
  },
  downloadPdf: { es: "Descargar PDF", en: "Download PDF" },
} as const satisfies Record<string, Localized>;

export type PublicationLabels = typeof publicationLabels;
