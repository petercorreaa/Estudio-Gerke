import type { Localized } from "./types";

/**
 * Copy specific to the home page. Generic, reusable interface strings stay in
 * ui.ts, this file holds structured content only the home page uses.
 */

export interface HomeHero {
  readonly eyebrow: Localized;
  readonly title: Localized;
  readonly lead: Localized;
}

export interface PositioningItem {
  readonly title: Localized;
  readonly body: Localized;
}

export interface HomeStat {
  readonly id: "founded" | "lawyers" | "practiceAreas";
  readonly label: Localized;
}

export interface HomeContent {
  readonly hero: HomeHero;
  readonly positioning: readonly PositioningItem[];
  readonly firmBrief: {
    readonly title: Localized;
    readonly paragraphs: readonly Localized[];
    readonly stats: readonly HomeStat[];
  };
  readonly publicationsPreview: {
    readonly title: Localized;
    readonly intro: Localized;
  };
  readonly commitment: {
    readonly title: Localized;
    readonly paragraphs: readonly Localized[];
  };
}

export const home = {
  hero: {
    eyebrow: {
      es: "La Paz, Bolivia · Desde 1971",
      en: "La Paz, Bolivia · Since 1971",
    },
    title: {
      es: "Asesoría jurídica a medida",
      en: "Tailored legal counsel",
    },
    lead: {
      es: "Asesoramos a corporaciones extranjeras que invierten en Bolivia y a familias empresarias bolivianas en sus asuntos más consecuentes, combinando el trabajo consultivo con una práctica activa de litigio y arbitraje.",
      en: "We advise foreign corporations investing in Bolivia and Bolivian business families on their most consequential matters, combining advisory work with an active litigation and arbitration practice.",
    },
  },

  positioning: [
    {
      title: { es: "Firma boutique", en: "Boutique firm" },
      body: {
        es: "El estudio mantiene una práctica deliberadamente concentrada: cada asunto recibe la atención directa de un socio, no solo de un equipo. Esa estructura permite un seguimiento cercano y decisiones rápidas, sin las capas jerárquicas propias de una firma de mayor tamaño.",
        en: "The firm maintains a deliberately concentrated practice: every matter receives the direct attention of a partner, not merely a team. That structure allows close follow-through and fast decisions, without the hierarchical layers typical of a larger firm.",
      },
    },
    {
      title: { es: "Estándares internacionales", en: "International standards" },
      body: {
        es: "Los procesos del estudio están calibrados a los estándares de trabajo que esperan las corporaciones extranjeras: comunicación directa en inglés y español, plazos claros y documentación ordenada. Esa disciplina se sostiene sobre una práctica estrictamente apegada a la ética profesional.",
        en: "The firm's processes are calibrated to the working standards foreign corporations expect: direct communication in English and Spanish, clear timelines and organised documentation. That discipline rests on a practice held strictly to professional ethics, in every matter it takes on.",
      },
    },
    {
      title: { es: "Litigio y arbitraje", en: "Litigation and arbitration" },
      body: {
        es: "A diferencia de muchas firmas dedicadas solo a la consultoría, el estudio mantiene una actividad constante ante la judicatura, los tribunales arbitrales y las autoridades administrativas, en todas sus instancias. El asesoramiento se respalda en una capacidad real de litigar cuando el caso lo exige.",
        en: "Unlike many firms focused solely on advisory work, the firm maintains constant activity before the judiciary, arbitral tribunals and administrative authorities, at every instance. Advisory work is backed by a genuine capacity to litigate whenever a matter requires it.",
      },
    },
  ],

  firmBrief: {
    title: {
      es: "Un estudio con más de cinco décadas",
      en: "A firm with more than five decades of history",
    },
    paragraphs: [
      {
        es: "Fundado en La Paz en 1971, el Estudio Jurídico Gerke ha mantenido una práctica ininterrumpida durante más de cinco décadas, atendiendo tanto a corporaciones extranjeras que invierten en Bolivia como a familias empresarias bolivianas en la gestión de sus asuntos jurídicos más consecuentes.",
        en: "Founded in La Paz in 1971, Estudio Jurídico Gerke has maintained an uninterrupted practice for more than five decades, advising both foreign corporations investing in Bolivia and Bolivian business families on their most consequential legal matters.",
      },
      {
        es: "A lo largo de su trayectoria, el estudio ha participado en la redacción de propuestas normativas que fueron posteriormente promulgadas a nivel nacional por la Asamblea Legislativa Plurinacional, una experiencia que informa directamente el asesoramiento regulatorio que hoy presta a sus clientes.",
        en: "Over the course of its history, the firm has taken part in drafting regulatory proposals that were later enacted nationally by the Plurinational Legislative Assembly, experience that directly informs the regulatory advice it provides to clients today.",
      },
    ],
    stats: [
      { id: "founded", label: { es: "Fundación", en: "Foundation" } },
      { id: "lawyers", label: { es: "Abogados", en: "Lawyers" } },
      { id: "practiceAreas", label: { es: "Áreas de práctica", en: "Practice areas" } },
    ],
  },

  publicationsPreview: {
    title: {
      es: "Publicaciones y recursos",
      en: "Publications and resources",
    },
    intro: {
      es: "Notas breves del estudio sobre cambios normativos y su efecto práctico en Bolivia.",
      en: "Short notes from the firm on regulatory change and its practical effect in Bolivia.",
    },
  },

  commitment: {
    title: {
      es: "Compromiso con la comunidad",
      en: "Commitment to the community",
    },
    paragraphs: [
      {
        es: "De manera continua, el estudio presta asesoramiento legal a proyectos de asistencia de la Iglesia Católica, entre ellos hogares de niños, casas de acogida para menores en situación de abandono y programas de atención a personas en situación de extrema pobreza.",
        en: "On an ongoing basis, the firm provides legal advice to charitable projects of the Catholic Church, including children's homes, shelters for abandoned minors and programmes serving people living in extreme poverty.",
      },
      {
        es: "Ese mismo apoyo se extiende a instituciones de mayor escala, entre ellas la Universidad Católica Boliviana, hospitales y otros proyectos de carácter similar, a los que el estudio asiste de forma habitual en sus asuntos jurídicos.",
        en: "That same support extends to larger institutions, including the Universidad Católica Boliviana, hospitals and other projects of a similar nature, which the firm assists on a regular basis with their legal matters.",
      },
    ],
  },
} as const satisfies HomeContent;
