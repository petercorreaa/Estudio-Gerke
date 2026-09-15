import type { Localized } from "./types";

/**
 * Copy for /firm-profile. Generic, reusable interface strings stay in ui.ts, * this file holds the substantial, page-specific prose this route exists for.
 */

export interface FirmProfileCard {
  readonly title: Localized;
  readonly body: Localized;
}

export interface FirmProfileContent {
  readonly header: {
    readonly lead: Localized;
  };
  readonly historia: {
    readonly title: Localized;
    readonly paragraphs: readonly Localized[];
  };
  readonly enfoque: {
    readonly title: Localized;
    readonly paragraphs: readonly Localized[];
  };
  readonly comoTrabajamos: {
    readonly title: Localized;
    readonly cards: readonly FirmProfileCard[];
  };
  readonly asesoriaYLitigio: {
    readonly title: Localized;
    readonly paragraphs: readonly Localized[];
  };
  readonly trabajoLegislativo: {
    readonly title: Localized;
    readonly paragraphs: readonly Localized[];
  };
  readonly compromiso: {
    readonly title: Localized;
    readonly paragraphs: readonly Localized[];
  };
  readonly cta: {
    readonly body: Localized;
  };
}

export const firmProfile = {
  header: {
    lead: {
      es: "Desde 1971, el Estudio Jurídico Gerke asesora a empresas y familias en algunos de sus asuntos jurídicos más consecuentes en Bolivia, combinando conocimiento técnico profundo, discreción absoluta y una capacidad de litigio que pocas firmas de asesoría mantienen.",
      en: "Since 1971, Estudio Jurídico Gerke has advised companies and families on some of their most consequential legal matters in Bolivia, combining deep technical knowledge, absolute discretion and a litigation capacity that few advisory firms maintain.",
    },
  },

  historia: {
    title: { es: "Historia", en: "History" },
    paragraphs: [
      {
        es: "El Estudio Jurídico Gerke fue fundado en La Paz en 1971 por Carlos Gerke Mendieta, con una práctica orientada desde su origen al derecho corporativo y regulatorio. A lo largo de más de cinco décadas, el estudio ha construido una trayectoria continua en un entorno legal y político que ha cambiado de forma sustancial varias veces durante ese periodo.",
        en: "Estudio Jurídico Gerke was founded in La Paz in 1971 by Carlos Gerke Mendieta, with a practice oriented from the outset toward corporate and regulatory law. Over more than five decades, the firm has built a continuous track record through a legal and political environment that has changed substantially more than once during that period.",
      },
      {
        es: "Ese crecimiento no se tradujo en una firma de gran tamaño, sino en una práctica cada vez más especializada, capaz de operar con el mismo nivel de exigencia en materias tan distintas como hidrocarburos, minería, telecomunicaciones, derecho tributario o resolución de conflictos.",
        en: "That growth did not translate into a large firm, but into an increasingly specialised practice, able to operate at the same level of rigour across matters as different as oil and gas, mining, telecommunications, tax law or dispute resolution.",
      },
      {
        es: "Hoy el estudio asesora a empresas bolivianas, extranjeras e internacionales que invierten o ya operan en Bolivia, a familias empresarias en la gestión y sucesión de su patrimonio, y a personas naturales e instituciones (incluidas entidades sin fines de lucro y organismos del Estado) en asuntos que exigen tanto criterio técnico como conocimiento del contexto local.",
        en: "Today the firm advises Bolivian, foreign and international companies investing or already operating in Bolivia, business families on the management and succession of their assets, and individuals and institutions (including non-profit organisations and state bodies) on matters that demand both technical judgment and a working knowledge of the local context.",
      },
      {
        es: "Esa diversidad de clientes es, en sí misma, un rasgo de la práctica: pocas firmas en Bolivia combinan una cartera corporativa internacional con la atención directa a asuntos individuales y familiares, sin que ninguno de los dos reciba un trato secundario.",
        en: "That range of clients is, in itself, a feature of the practice: few firms in Bolivia combine an international corporate portfolio with direct attention to individual and family matters, without treating either as secondary.",
      },
    ],
  },

  enfoque: {
    title: { es: "Nuestro Enfoque", en: "Our Approach" },
    paragraphs: [
      {
        es: "Ser una firma boutique no es, en el estudio, una etiqueta de marketing: es una decisión deliberada sobre cómo se organiza el trabajo. El estudio ha optado por mantener un número reducido de abogados y un número también reducido de clientes activos en un momento dado, en lugar de crecer para atender más asuntos con menos atención en cada uno.",
        en: "Being a boutique firm is not, here, a marketing label; it is a deliberate decision about how the work is organised. The firm has chosen to keep a small number of lawyers and, at any given time, a small number of active clients, rather than grow to handle more matters with less attention on each one.",
      },
      {
        es: "En la práctica, eso significa que un socio conoce el asunto de primera mano, no a través de un resumen preparado por otra persona; que las decisiones sobre estrategia las toma quien además la ejecuta; y que un cliente puede llamar directamente a quien lleva su caso, sin pasar por una cadena de intermediarios.",
        en: "In practice, that means a partner knows the matter first-hand, not through a summary prepared by someone else; that decisions on strategy are made by the same person who then carries it out; and that a client can call directly the person handling their case, without going through a chain of intermediaries.",
      },
      {
        es: "Esta forma de trabajar tiene un costo (el estudio no puede, ni pretende, atender simultáneamente el volumen de asuntos de una firma de mayor tamaño) y una ventaja directa: la calidad del criterio aplicado a cada asunto no depende de cuántos otros asuntos estén abiertos en ese momento.",
        en: "That way of working has a cost (the firm cannot, and does not try to, handle the volume of matters a larger firm would) and a direct advantage: the quality of judgment applied to each matter does not depend on how many other matters happen to be open at the same time.",
      },
    ],
  },

  comoTrabajamos: {
    title: { es: "Cómo Trabajamos", en: "How We Work" },
    cards: [
      {
        title: { es: "Personalización", en: "Personalisation" },
        body: {
          es: "Cada asunto se aborda desde cero. El estudio no aplica plantillas ni fórmulas genéricas: analiza los hechos, el objetivo del cliente y el terreno legal específico antes de proponer una vía de acción, y ajusta esa vía cuantas veces el caso lo exija.",
          en: "Every matter is approached from first principles. The firm applies no templates or generic formulas: it examines the facts, the client's objective and the specific legal terrain before proposing a course of action, and adjusts that course as often as the matter demands.",
        },
      },
      {
        title: { es: "Profesionalidad", en: "Professionalism" },
        body: {
          es: "La profundidad técnica no es negociable. Los abogados del estudio siguen de cerca los cambios normativos y jurisprudenciales en sus áreas, y ese seguimiento se traduce en un trabajo de calidad exigente: opiniones fundamentadas, plazos cumplidos y documentos que resisten escrutinio.",
          en: "Technical depth is not negotiable. The firm's lawyers track regulatory and case-law developments in their fields closely, and that discipline shows in work held to a demanding standard: well-reasoned opinions, deadlines met, and documents built to withstand scrutiny.",
        },
      },
      {
        title: { es: "Confianza", en: "Trust" },
        body: {
          es: "Los clientes que llevan más años con el estudio señalan la misma razón: honestidad incluso cuando la noticia no es buena, y una discreción absoluta sobre sus asuntos. Esa combinación, más que cualquier otra, es lo que sostiene una relación de años.",
          en: "Clients who have worked with the firm longest cite the same reason: honesty even when the news is not good, and absolute discretion about their affairs. That combination, more than any other, is what sustains a relationship over years.",
        },
      },
      {
        title: { es: "Estrategia", en: "Strategy" },
        body: {
          es: "En los asuntos más complejos, el trabajo no termina en el consejo legal: incluye diseñar la estrategia y ejecutarla hasta su resultado. Es esa capacidad de ejecución, y no solo de análisis, la que los clientes buscan en sus conflictos de mayor envergadura.",
          en: "In the most complex matters, the work does not end with legal advice: it includes designing the strategy and carrying it through to a result. That capacity to execute, not analysis alone, is what clients look for in their highest-stakes disputes.",
        },
      },
    ],
  },

  asesoriaYLitigio: {
    title: { es: "Asesoría y Litigio", en: "Advisory and Litigation" },
    paragraphs: [
      {
        es: "Buena parte de las firmas que asesoran a inversionistas extranjeros en Bolivia limitan su práctica al trabajo consultivo: opinan, redactan contratos, estructuran operaciones, y remiten cualquier conflicto a un despacho distinto cuando este llega a los tribunales. El estudio no opera así.",
        en: "Many of the firms that advise foreign investors in Bolivia limit their practice to advisory work: they opine, draft contracts, structure transactions, and hand off any dispute to a different firm once it reaches the courts. This firm does not work that way.",
      },
      {
        es: "El mismo equipo que estructura una operación o redacta un contrato está preparado para defenderlo cuando el conflicto llega a la vía judicial, arbitral o administrativa, y lo hace en todas las instancias, desde el primer planteamiento hasta la ejecución final de una sentencia o un laudo.",
        en: "The same team that structures a transaction or drafts a contract is prepared to defend it once a dispute reaches the judiciary, an arbitral tribunal or an administrative authority, and it does so at every instance, from the first filing through the final enforcement of a judgment or an award.",
      },
      {
        es: "Esa continuidad importa: quien litiga un caso conoce su origen contractual y regulatorio de primera mano, sin depender de un traspaso de información entre despachos distintos en el momento de mayor exposición del cliente.",
        en: "That continuity matters: the lawyer litigating a case knows its contractual and regulatory origin first-hand, rather than relying on a handover between separate firms at the moment a client is most exposed.",
      },
    ],
  },

  trabajoLegislativo: {
    title: { es: "Trabajo Legislativo", en: "Legislative Work" },
    paragraphs: [
      {
        es: "Durante décadas, abogados del estudio han sido convocados (tanto por clientes privados como por instancias del propio Estado) para participar en la redacción de proyectos de ley en materias que van desde el régimen de hidrocarburos hasta el derecho societario y financiero.",
        en: "Over the decades, lawyers at the firm have been called on (by private clients and by the State itself) to take part in drafting bills in areas ranging from the hydrocarbons regime to corporate and financial law.",
      },
      {
        es: "Docenas de esas propuestas normativas han sido promulgadas a nivel nacional por la Asamblea Legislativa Plurinacional y sus antecesoras. No se trata de una anécdota institucional: es experiencia directa en cómo se redacta, negocia y aprueba una norma en Bolivia, y esa experiencia informa cada opinión regulatoria que el estudio emite hoy.",
        en: "Dozens of those legislative proposals have been enacted nationally by the Plurinational Legislative Assembly and its predecessor bodies. This is not an institutional anecdote: it is direct experience in how a law is drafted, negotiated and passed in Bolivia, and that experience informs every regulatory opinion the firm issues today.",
      },
      {
        es: "Pocas firmas en el país pueden acreditar ese nivel de participación en el proceso legislativo mismo, y esa perspectiva (de quien ha estado en la mesa donde se escribe la norma, no solo en la mesa donde se interpreta) distingue el asesoramiento regulatorio del estudio.",
        en: "Few firms in the country can claim that level of involvement in the legislative process itself, and that perspective (from the table where a rule is written, not only the one where it is interpreted) sets the firm's regulatory advice apart.",
      },
    ],
  },

  compromiso: {
    title: { es: "Compromiso con la Comunidad", en: "Commitment to the Community" },
    paragraphs: [
      {
        es: "De manera continua y no solo ocasional, el estudio presta asesoramiento legal a proyectos de asistencia social vinculados a la Iglesia Católica en Bolivia. Ese trabajo incluye hogares de niños, casas de acogida para menores en situación de abandono, y programas dirigidos a personas en situación de extrema pobreza.",
        en: "On an ongoing basis, not only occasionally, the firm provides legal advice to social assistance projects linked to the Catholic Church in Bolivia. That work includes children's homes, shelters for abandoned minors, and programmes serving people living in extreme poverty.",
      },
      {
        es: "El mismo tipo de apoyo se extiende a instituciones de mayor escala: la Universidad Católica Boliviana, hospitales y otros proyectos de carácter similar reciben del estudio la misma atención que cualquier cliente corporativo en sus asuntos jurídicos ordinarios, contratos, cumplimiento normativo y resolución de conflictos cuando estos surgen.",
        en: "The same kind of support extends to larger institutions: the Universidad Católica Boliviana, hospitals and other projects of a similar nature receive from the firm the same attention as any corporate client on their ordinary legal matters, contracts, regulatory compliance, and dispute resolution when it is needed.",
      },
      {
        es: "Este trabajo no se comunica como una campaña ni tiene un propósito de imagen: es una práctica sostenida durante años, que el estudio mantiene porque entiende que su capacidad jurídica tiene un valor más allá de los clientes que pagan por ella.",
        en: "This work is not publicised as a campaign, nor does it serve a reputational purpose. It is a practice the firm has sustained for years, because it recognises that its legal capacity has value beyond the clients who pay for it.",
      },
    ],
  },

  cta: {
    body: {
      es: "Si su asunto requiere una firma que combine criterio técnico, discreción y capacidad real de litigio, conversemos.",
      en: "If your matter calls for a firm that combines technical judgment, discretion and a genuine capacity to litigate, let's talk.",
    },
  },
} as const satisfies FirmProfileContent;
