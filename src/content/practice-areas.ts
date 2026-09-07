import type { Localized } from "./types";

/**
 * The 20 practice areas.
 *
 * FROZEN — CLAUDE.md rule 3. Exact names, exact order, no regrouping, no
 * renaming, no additions. The client explicitly asked to keep them as-is.
 * `index` is the printed ornament (01–20) and must match array position.
 */

export interface PracticeArea {
  readonly id: string;
  /** Printed index, zero-padded. Ornamental — see DESIGN.md §2. */
  readonly index: string;
  readonly name: Localized;
  /** Localized URL segment for the detail route. */
  readonly slug: Localized;
  /** 40–60 words per locale. */
  readonly description: Localized;
}

export const practiceAreas = [
  {
    id: "derecho-administrativo-y-regulatorio",
    index: "01",
    name: {
      es: "Derecho Administrativo y Regulatorio",
      en: "Administrative and Regulatory Law",
    },
    slug: {
      es: "derecho-administrativo-y-regulatorio",
      en: "administrative-and-regulatory-law",
    },
    description: {
      es: "Asesoramos a empresas reguladas en su relación con las autoridades de fiscalización sectoriales y con el Estado: licencias, concesiones, contratos administrativos y procedimientos sancionatorios bajo la Ley 2341. Representamos a nuestros clientes en recursos de revocatoria y jerárquicos, y en la vía contencioso-administrativa ante el Tribunal Supremo de Justicia.",
      en: "We advise regulated companies on their dealings with Bolivia's sectoral regulators and with the State: licences, concessions, administrative contracts and enforcement proceedings under Law 2341. We represent clients in administrative appeals before the regulators and their supervising ministries, and in judicial review before the Supreme Court of Justice.",
    },
  },
  {
    id: "hidrocarburos",
    index: "02",
    name: { es: "Hidrocarburos", en: "Oil and Gas" },
    slug: { es: "hidrocarburos", en: "oil-and-gas" },
    description: {
      es: "Acompañamos a operadores y contratistas en toda la cadena: contratos de servicios petroleros con YPFB, cesiones de participación, servidumbres y consulta previa, y trámites ante la ANH. Atendemos controversias contractuales y regulatorias, incluidas las sometidas a arbitraje, y la carga tributaria específica del sector.",
      en: "We act for operators and contractors across the value chain: petroleum services contracts with YPFB, farm-outs and assignments, easements and prior consultation, and filings before the ANH. We handle contractual and regulatory disputes, including those referred to arbitration, and advise on the sector's specific tax burden.",
    },
  },
  {
    id: "electricidad",
    index: "03",
    name: { es: "Electricidad", en: "Electricity" },
    slug: { es: "electricidad", en: "electricity" },
    description: {
      es: "Asesoramos a generadores, transmisores y distribuidores bajo la Ley 1604 y sus reglamentos: licencias y concesiones, contratos de suministro y de conexión, y relación con la Autoridad de Fiscalización de Electricidad. Representamos a clientes en procedimientos sancionatorios, revisiones tarifarias y controversias del mercado eléctrico mayorista.",
      en: "We advise generators, transmission companies and distributors under Law 1604 and its regulations: licences and concessions, supply and interconnection agreements, and dealings with the electricity regulator. We represent clients in enforcement proceedings, tariff reviews and disputes arising in the wholesale electricity market.",
    },
  },
  {
    id: "telecomunicaciones",
    index: "04",
    name: { es: "Telecomunicaciones", en: "Telecommunications" },
    slug: { es: "telecomunicaciones", en: "telecommunications" },
    description: {
      es: "Trabajamos con operadores y proveedores de servicios bajo la Ley 164: licencias de uso de frecuencias, registros, interconexión, obligaciones de calidad y protección al usuario. Gestionamos procedimientos ante la ATT, defendemos a nuestros clientes en procesos sancionatorios y asesoramos en la contratación de infraestructura compartida.",
      en: "We work with operators and service providers under Law 164: spectrum licences, registrations, interconnection, quality obligations and user protection. We handle proceedings before the ATT, defend clients in enforcement actions, and advise on network- and infrastructure-sharing agreements, including the regulatory review of transfers of control.",
    },
  },
  {
    id: "mineria",
    index: "05",
    name: { es: "Minería", en: "Mining" },
    slug: { es: "mineria", en: "mining" },
    description: {
      es: "Asesoramos en la constitución y transferencia de derechos mineros bajo la Ley 535: contratos administrativos mineros, adecuación de derechos preconstituidos, trámites ante la AJAM y régimen de regalías. Atendemos contratos de asociación y de riesgo compartido, y representamos a nuestros clientes en oposiciones, nulidades y arbitrajes del sector.",
      en: "We advise on the creation and transfer of mining rights under Law 535: administrative mining contracts, conversion of pre-existing rights, filings before the AJAM, and the royalty regime. We handle joint-venture and risk-sharing agreements, and represent clients in oppositions, annulment actions and sector arbitrations.",
    },
  },
  {
    id: "saneamiento-basico",
    index: "06",
    name: { es: "Saneamiento Básico", en: "Water and Sanitation" },
    slug: { es: "saneamiento-basico", en: "water-and-sanitation" },
    description: {
      es: "Asesoramos a operadores y entidades prestadoras de servicios de agua potable y alcantarillado bajo la Ley 2066: licencias, concesiones, áreas de servicio y estructura tarifaria. Acompañamos procedimientos ante la AAPS y atendemos controversias con usuarios, municipios y contratistas de obra, incluidas las sometidas a arbitraje.",
      en: "We advise water and sanitation operators and service providers under Law 2066: licences, concessions, service areas and tariff structures. We handle proceedings before the AAPS and act in disputes with users, municipalities and construction contractors, including those referred to arbitration.",
    },
  },
  {
    id: "transporte",
    index: "07",
    name: { es: "Transporte", en: "Transport" },
    slug: { es: "transporte", en: "transport" },
    description: {
      es: "Atendemos asuntos de transporte aéreo, terrestre y ferroviario: permisos de operación, contratos de concesión, responsabilidad del transportista y régimen de carga. Gestionamos trámites ante la ATT y la Dirección General de Aeronáutica Civil, y representamos a nuestros clientes en procesos sancionatorios y reclamaciones de daños.",
      en: "We handle air, road and rail transport matters: operating permits, concession contracts, carrier liability and the cargo regime. We manage filings before the ATT and the civil aviation authority, and represent clients in enforcement proceedings, insurance recoveries and damage claims.",
    },
  },
  {
    id: "medio-ambiente",
    index: "08",
    name: { es: "Medio Ambiente", en: "Environmental Law" },
    slug: { es: "medio-ambiente", en: "environmental-law" },
    description: {
      es: "Asesoramos en licenciamiento ambiental bajo la Ley 1333: fichas ambientales, estudios de evaluación de impacto, auditorías y planes de adecuación. Atendemos consulta previa, pasivos ambientales y procedimientos sancionatorios ante la autoridad ambiental competente, y la defensa en denuncias y en los procesos civiles y penales derivados de daño ambiental.",
      en: "We advise on environmental licensing under Law 1333: environmental forms, impact assessment studies, audits and compliance plans. We handle prior consultation, legacy liabilities and enforcement proceedings before the competent environmental authority, and defend clients in complaints and in the civil and criminal proceedings that follow from environmental damage.",
    },
  },
  {
    id: "derecho-civil-procesal-civil",
    index: "09",
    name: {
      es: "Derecho Civil / Derecho Procesal Civil",
      en: "Civil Law / Civil Procedure",
    },
    slug: {
      es: "derecho-civil-procesal-civil",
      en: "civil-law-civil-procedure",
    },
    description: {
      es: "Redactamos y negociamos contratos civiles, garantías y transacciones, y atendemos asuntos de obligaciones, responsabilidad civil y sucesiones. Litigamos ante la judicatura ordinaria bajo el Código Procesal Civil, con procesos orales por audiencias, y gestionamos medidas preparatorias, cautelares y la ejecución de sentencias y laudos.",
      en: "We draft and negotiate civil contracts, security interests and settlements, and handle obligations, tort liability and succession matters. We litigate before the ordinary courts under the Code of Civil Procedure and its oral, hearing-based process, and pursue preliminary and interim measures and the enforcement of judgments and awards.",
    },
  },
  {
    id: "derecho-constitucional",
    index: "10",
    name: { es: "Derecho Constitucional", en: "Constitutional Law" },
    slug: { es: "derecho-constitucional", en: "constitutional-law" },
    description: {
      es: "Planteamos y defendemos acciones de defensa ante el Tribunal Constitucional Plurinacional: amparo constitucional, acción de cumplimiento y acción de libertad, además de acciones de inconstitucionalidad contra normas que afectan a nuestros clientes. Asesoramos sobre el alcance de derechos y garantías en materia económica y de inversión.",
      en: "We bring and defend constitutional actions before the Plurinational Constitutional Court: amparo, compliance actions and habeas corpus, together with challenges to the constitutionality of rules affecting our clients. We advise on the scope of economic and investment-related rights and guarantees.",
    },
  },
  {
    id: "derecho-mercantil",
    index: "11",
    name: { es: "Derecho Mercantil", en: "Commercial Law" },
    slug: { es: "derecho-mercantil", en: "commercial-law" },
    description: {
      es: "Constituimos sociedades, sucursales de empresas extranjeras y contratos asociativos, y llevamos su vida societaria ante el registro de comercio. Asesoramos en adquisiciones, reorganizaciones, aumentos de capital y contratos comerciales, y atendemos conflictos entre socios y procesos de disolución, liquidación y reestructuración.",
      en: "We incorporate companies, branches of foreign corporations and joint-venture vehicles, and manage their corporate life before the commercial registry. We advise on acquisitions, reorganisations, capital increases and commercial contracts, and act in shareholder disputes and in dissolution, liquidation and restructuring proceedings.",
    },
  },
  {
    id: "derecho-tributario",
    index: "12",
    name: { es: "Derecho Tributario", en: "Tax Law" },
    slug: { es: "derecho-tributario", en: "tax-law" },
    description: {
      es: "Asesoramos en la planificación y el cumplimiento de obligaciones bajo el Código Tributario: IVA, IT, IUE, remesas al exterior y convenios para evitar la doble imposición. Representamos a nuestros clientes en fiscalizaciones del Servicio de Impuestos Nacionales, en recursos de alzada y jerárquico ante la AIT, y en la vía judicial.",
      en: "We advise on planning and compliance under the Tax Code: VAT, transaction tax, corporate income tax, payments abroad and double-taxation treaties. We represent clients in audits by the national tax service, in first-instance and hierarchical appeals before the AIT, and in subsequent court proceedings.",
    },
  },
  {
    id: "estructura-de-financiamientos",
    index: "13",
    name: { es: "Estructura de Financiamientos", en: "Financing Structures" },
    slug: { es: "estructura-de-financiamientos", en: "financing-structures" },
    description: {
      es: "Estructuramos financiamientos de proyecto y corporativos: contratos de préstamo, sindicaciones, fideicomisos de garantía, hipotecas y prendas, y su inscripción registral. Trabajamos con banca local, prestamistas del exterior y organismos multilaterales, y emitimos opiniones legales sobre exigibilidad y ejecución de garantías en Bolivia.",
      en: "We structure project and corporate financings: loan agreements, syndications, security trusts, mortgages and pledges, and their registration. We work with local banks, foreign lenders and multilateral agencies, and issue legal opinions on the enforceability and foreclosure of security under Bolivian law.",
    },
  },
  {
    id: "derecho-financiero",
    index: "14",
    name: { es: "Derecho Financiero", en: "Financial Law" },
    slug: { es: "derecho-financiero", en: "financial-law" },
    description: {
      es: "Asesoramos a bancos, entidades financieras, aseguradoras y participantes del mercado de valores en licenciamiento, gobierno corporativo y cumplimiento bajo la Ley 393. Atendemos requerimientos e inspecciones de la ASFI y de la APS, emisiones en la Bolsa Boliviana de Valores y procedimientos sancionatorios.",
      en: "We advise banks, financial institutions, insurers and capital-markets participants on licensing, corporate governance and compliance under Law 393. We handle information requests and inspections by the financial and pension regulators, securities issues on the Bolivian stock exchange, and enforcement proceedings.",
    },
  },
  {
    id: "propiedad-intelectual",
    index: "15",
    name: { es: "Propiedad Intelectual", en: "Intellectual Property" },
    slug: { es: "propiedad-intelectual", en: "intellectual-property" },
    description: {
      es: "Registramos y defendemos marcas, patentes y derechos de autor ante el SENAPI, bajo las Decisiones 486 y 351 de la Comunidad Andina. Atendemos oposiciones, cancelaciones y nulidades, acciones por infracción y competencia desleal, y negociamos licencias, franquicias y contratos de transferencia de tecnología.",
      en: "We register and defend trademarks, patents and copyright before SENAPI, under Andean Community Decisions 486 and 351. We handle oppositions, cancellations and invalidity actions, infringement and unfair-competition claims, and negotiate licences, franchises and technology-transfer agreements for clients operating across the Andean market.",
    },
  },
  {
    id: "resolucion-alternativa-de-conflictos",
    index: "16",
    name: {
      es: "Resolución Alternativa de Conflictos",
      en: "Alternative Dispute Resolution",
    },
    slug: {
      es: "resolucion-alternativa-de-conflictos",
      en: "alternative-dispute-resolution",
    },
    description: {
      es: "Actuamos como abogados de parte en arbitrajes nacionales e internacionales bajo la Ley 708 y en conciliaciones previas. Redactamos cláusulas arbitrales, tramitamos procesos ante los centros de las cámaras de comercio y bajo reglamentos CCI y UNCITRAL, y gestionamos el reconocimiento y la ejecución de laudos.",
      en: "We act as counsel in domestic and international arbitrations under Law 708 and in pre-litigation conciliation. We draft arbitration clauses, conduct proceedings before the chambers of commerce arbitration centres and under ICC and UNCITRAL rules, and pursue the recognition and enforcement of awards.",
    },
  },
  {
    id: "sistema-de-buenas-practicas",
    index: "17",
    name: {
      es: "Sistema de Buenas Prácticas",
      en: "Good Practices and Compliance",
    },
    slug: { es: "sistema-de-buenas-practicas", en: "good-practices-and-compliance" },
    description: {
      es: "Diseñamos programas de cumplimiento calibrados al riesgo boliviano: prevención de la legitimación de ganancias ilícitas ante la UIF, políticas anticorrupción bajo la Ley 004 y su articulación con la FCPA y la UK Bribery Act. Realizamos investigaciones internas, capacitación y debida diligencia de contrapartes.",
      en: "We design compliance programmes calibrated to Bolivian risk: anti-money-laundering obligations before the Financial Investigations Unit, anti-corruption policies under Law 004, and their interaction with the FCPA and the UK Bribery Act. We conduct internal investigations, training and counterparty due diligence.",
    },
  },
  {
    id: "derecho-laboral-seguridad-social",
    index: "18",
    name: {
      es: "Derecho Laboral / Seguridad Social",
      en: "Labor and Social Security Law",
    },
    slug: {
      es: "derecho-laboral-seguridad-social",
      en: "labor-and-social-security-law",
    },
    description: {
      es: "Asesoramos en contratación, reglamentos internos, tercerización, terminación y beneficios sociales bajo la Ley General del Trabajo. Atendemos inspecciones y conminatorias de reincorporación del Ministerio de Trabajo, aportes a la seguridad social de corto y largo plazo, y litigios ante la judicatura laboral.",
      en: "We advise on hiring, workplace rules, outsourcing, termination and statutory severance under the General Labour Act. We handle inspections and reinstatement orders issued by the Ministry of Labour, short- and long-term social security contributions, and litigation before the labour courts.",
    },
  },
  {
    id: "derecho-familiar",
    index: "19",
    name: { es: "Derecho Familiar", en: "Family Law" },
    slug: { es: "derecho-familiar", en: "family-law" },
    description: {
      es: "Atendemos asuntos de familia con la discreción que exigen: divorcio y separación, régimen de bienes, asistencia familiar, filiación, adopción y autorizaciones judiciales, bajo el Código de las Familias. Litigamos ante los juzgados públicos en materia familiar y asesoramos a familias empresarias en acuerdos prenupciales y sucesorios que afectan la propiedad de sus empresas.",
      en: "We handle family matters with the discretion they require: divorce and separation, matrimonial property, maintenance, filiation, adoption and judicial authorisations under the Family Code. We litigate before the public family courts and advise business families on prenuptial agreements and on succession arrangements that affect company ownership.",
    },
  },
  {
    id: "derecho-inmobiliario-derechos-reales",
    index: "20",
    name: {
      es: "Derecho Inmobiliario / Derechos Reales",
      en: "Real Estate and Property Rights",
    },
    slug: {
      es: "derecho-inmobiliario-derechos-reales",
      en: "real-estate-and-property-rights",
    },
    description: {
      es: "Realizamos auditoría de títulos en Derechos Reales y, en predios rurales, ante el INRA. Asesoramos en compraventa, anticresis, usufructo, servidumbres, propiedad horizontal y desarrollos inmobiliarios, y litigamos acciones reivindicatorias, de usucapión, de mejor derecho propietario y de desalojo, además de la ejecución de hipotecas.",
      en: "We audit title at the Real Rights Registry and, for rural land, before the agrarian authority. We advise on sale and purchase, antichresis, usufruct, easements, condominium regimes and real-estate developments, and litigate ownership, adverse possession, better-title and eviction claims, as well as mortgage foreclosure.",
    },
  },
] as const satisfies readonly PracticeArea[];

/** Union of the 20 frozen ids — lets other content files reference them safely. */
export type PracticeAreaId = (typeof practiceAreas)[number]["id"];

/**
 * Compile-time guard on rule 3. `practiceAreas` is a readonly tuple, so its
 * `.length` is the literal `20`. Adding or removing an area breaks the build
 * here rather than silently shipping.
 */
export const PRACTICE_AREA_COUNT: 20 = practiceAreas.length;

export function getPracticeAreaById(id: string) {
  return practiceAreas.find((area) => area.id === id);
}
