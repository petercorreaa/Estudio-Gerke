import type { PracticeAreaId } from "./practice-areas";
import type { Localized } from "./types";

/**
 * Detail-page content for each of the 20 frozen practice areas, the
 * overview, services and forums sections on /practice-areas/[slug].
 *
 * Regulator and law names are used with reasonable confidence (they are the
 * same references already shipped in practice-areas.ts's short descriptions).
 * No article-level citations are made anywhere. Where a claim would require
 * more precision than that, it is marked TODO for the firm's lawyers rather
 * than guessed, see the TODOs on estructuraDeFinanciamientos' forums list.
 */

export interface PracticeAreaDetail {
  readonly id: PracticeAreaId;
  /** 2 paragraphs. */
  readonly overview: readonly Localized[];
  /** 6 short bullet items. */
  readonly services: readonly Localized[];
  /** Courts, arbitral bodies and regulators relevant to this area. */
  readonly forums: readonly Localized[];
}

export const practiceAreaDetails: readonly PracticeAreaDetail[] = [
  {
    id: "derecho-administrativo-y-regulatorio",
    overview: [
      {
        es: "El derecho administrativo y regulatorio atraviesa buena parte del trabajo del estudio, porque casi cualquier inversión o actividad económica de cierta escala en Bolivia depende, en algún punto, de una autorización, una licencia o una relación continua con una entidad estatal. El estudio asesora a sus clientes en la obtención y el mantenimiento de esas autorizaciones, y en su relación cotidiana con ministerios, superintendencias y otras entidades de fiscalización.",
        en: "Administrative and regulatory law runs through much of the firm's work, because almost any investment or economic activity of meaningful scale in Bolivia depends, at some point, on an authorisation, a licence or an ongoing relationship with a state entity. The firm advises clients on obtaining and maintaining those authorisations, and on their day-to-day dealings with ministries, superintendencies and other supervisory bodies.",
      },
      {
        es: "Cuando esa relación se vuelve conflictiva (por la denegación de un trámite, una sanción o una interpretación regulatoria desfavorable) el estudio representa a sus clientes en la vía administrativa, agotando los recursos internos de la entidad correspondiente, y, cuando es necesario, en la vía contencioso-administrativa ante la judicatura.",
        en: "When that relationship turns adversarial (a rejected filing, a sanction, or an unfavourable regulatory interpretation) the firm represents clients through the administrative process, exhausting the relevant entity's internal remedies, and, where necessary, before the courts in judicial review of that administrative action.",
      },
    ],
    services: [
      { es: "Obtención y renovación de licencias, permisos y concesiones", en: "Obtaining and renewing licences, permits and concessions" },
      { es: "Representación en procedimientos sancionatorios administrativos", en: "Representation in administrative enforcement proceedings" },
      { es: "Recursos de revocatoria y jerárquicos", en: "Internal appeals (revocatoria and hierarchical appeals)" },
      { es: "Auditorías de cumplimiento regulatorio sectorial", en: "Sector-specific regulatory compliance audits" },
      { es: "Asesoramiento en contratos administrativos y de concesión", en: "Advice on administrative and concession contracts" },
      { es: "Litigio contencioso-administrativo", en: "Judicial review of administrative decisions" },
    ],
    forums: [
      { es: "Ministerios y entidades de la Administración Pública competentes por sector", en: "Relevant ministries and public administration bodies, by sector" },
      { es: "Autoridades y superintendencias sectoriales de fiscalización", en: "Sectoral regulators and supervisory authorities" },
      { es: "Tribunal Supremo de Justicia, en la vía contencioso-administrativa", en: "Supreme Court of Justice, in judicial review" },
    ],
  },
  {
    id: "hidrocarburos",
    overview: [
      {
        es: "Bolivia mantiene un régimen de hidrocarburos centrado en YPFB como titular de toda la producción, que opera el sector mediante contratos de servicios petroleros suscritos con empresas operadoras y contratistas. El estudio asesora a estas últimas en la negociación de esos contratos, en las cesiones de participación y en la estructuración de las operaciones conjuntas que suelen acompañarlos.",
        en: "Bolivia's hydrocarbons regime is built around YPFB as the holder of all production, operating the sector through petroleum services contracts entered into with operators and contractors. The firm advises those companies on negotiating those contracts, on farm-outs and assignments, and on structuring the joint operations that typically accompany them.",
      },
      {
        es: "El sector también genera un volumen constante de controversias contractuales y regulatorias (sobre volúmenes, precios, incumplimientos e interpretación de cláusulas) que el estudio atiende tanto por la vía de negociación directa como, cuando corresponde, en arbitraje bajo las cláusulas que suelen incluir estos contratos.",
        en: "The sector also generates a steady volume of contractual and regulatory disputes (over volumes, pricing, breaches and clause interpretation) which the firm handles both through direct negotiation and, where the contract provides for it, through arbitration.",
      },
    ],
    services: [
      { es: "Negociación de contratos de servicios petroleros con YPFB", en: "Negotiating petroleum services contracts with YPFB" },
      { es: "Cesiones de participación y estructuración de operaciones conjuntas", en: "Farm-outs, assignments and joint-operation structuring" },
      { es: "Servidumbres y procesos de consulta previa", en: "Easements and prior consultation processes" },
      { es: "Trámites y licencias ante la ANH", en: "Filings and licences before the ANH" },
      { es: "Controversias contractuales y arbitraje del sector", en: "Contractual disputes and sector arbitration" },
      { es: "Asesoramiento tributario específico de hidrocarburos", en: "Advice on the sector's specific tax regime" },
    ],
    forums: [
      { es: "YPFB (Yacimientos Petrolíferos Fiscales Bolivianos)", en: "YPFB (the state hydrocarbons company)" },
      { es: "Agencia Nacional de Hidrocarburos (ANH)", en: "National Hydrocarbons Agency (ANH)" },
      { es: "Ministerio de Hidrocarburos", en: "Ministry of Hydrocarbons" },
      { es: "Centros de arbitraje, según la cláusula contractual aplicable", en: "Arbitration centres, per the applicable contract clause" },
    ],
  },
  {
    id: "electricidad",
    overview: [
      {
        es: "El sector eléctrico boliviano opera bajo un régimen de licencias y concesiones para generación, transmisión y distribución, con una autoridad de fiscalización que regula tarifas, calidad de servicio y acceso a la red. El estudio asesora a generadores (incluidos proyectos de energías renovables), transmisores y distribuidores en la obtención de esas licencias y en sus contratos de suministro, conexión y transporte de energía.",
        en: "Bolivia's electricity sector operates under a licensing and concession regime for generation, transmission and distribution, with a regulator overseeing tariffs, service quality and grid access. The firm advises generators (including renewable energy projects), transmission companies and distributors on obtaining those licences and on their supply, interconnection and transport agreements.",
      },
      {
        es: "También representamos a nuestros clientes ante la autoridad sectorial en procedimientos sancionatorios y revisiones tarifarias, y en las controversias que surgen dentro del mercado eléctrico mayorista entre generadores, distribuidores y grandes consumidores.",
        en: "We also represent clients before the sector regulator in enforcement proceedings and tariff reviews, and in disputes that arise within the wholesale electricity market between generators, distributors and large consumers.",
      },
    ],
    services: [
      { es: "Licencias y concesiones de generación, transmisión y distribución", en: "Generation, transmission and distribution licences and concessions" },
      { es: "Contratos de suministro e interconexión", en: "Supply and interconnection agreements" },
      { es: "Proyectos de energías renovables", en: "Renewable energy projects" },
      { es: "Representación en revisiones tarifarias", en: "Representation in tariff reviews" },
      { es: "Procedimientos sancionatorios ante la autoridad sectorial", en: "Enforcement proceedings before the sector regulator" },
      { es: "Controversias del mercado eléctrico mayorista", en: "Wholesale electricity market disputes" },
    ],
    forums: [
      { es: "Autoridad de Fiscalización de Electricidad", en: "Electricity regulatory authority" },
      { es: "Ministerio de Hidrocarburos y Energía", en: "Ministry of Hydrocarbons and Energy" },
      { es: "Comité Nacional de Despacho de Carga", en: "National load dispatch committee" },
    ],
  },
  {
    id: "telecomunicaciones",
    overview: [
      {
        es: "El régimen de telecomunicaciones y TIC en Bolivia exige licencias de uso de frecuencias y registros para operar, además del cumplimiento de obligaciones de calidad de servicio y protección al usuario que fiscaliza la ATT. El estudio asesora a operadores y proveedores de servicios en la obtención de estas licencias y en su relación continua con el regulador.",
        en: "Bolivia's telecommunications and ICT regime requires spectrum licences and registrations to operate, alongside quality-of-service and user-protection obligations overseen by the ATT. The firm advises operators and service providers on obtaining those licences and on their ongoing relationship with the regulator.",
      },
      {
        es: "Buena parte del trabajo también involucra contratos de infraestructura compartida (torres, fibra, capacidad satelital) y su revisión regulatoria cuando implican un cambio de control, además de la defensa de nuestros clientes en procedimientos sancionatorios iniciados por la ATT.",
        en: "Much of the work also involves shared-infrastructure agreements (towers, fibre, satellite capacity) and their regulatory review when they involve a change of control, as well as defending clients in enforcement proceedings brought by the ATT.",
      },
    ],
    services: [
      { es: "Licencias de uso de frecuencias y registros ante la ATT", en: "Spectrum licences and registrations before the ATT" },
      { es: "Contratos de interconexión y de infraestructura compartida", en: "Interconnection and shared-infrastructure agreements" },
      { es: "Revisión regulatoria de cambios de control", en: "Regulatory review of changes of control" },
      { es: "Defensa en procedimientos sancionatorios", en: "Defence in enforcement proceedings" },
      { es: "Cumplimiento de obligaciones de calidad y protección al usuario", en: "Compliance with quality and user-protection obligations" },
      { es: "Asesoramiento en despliegue de infraestructura de telecomunicaciones", en: "Advice on telecommunications infrastructure deployment" },
    ],
    forums: [
      { es: "Autoridad de Regulación y Fiscalización de Telecomunicaciones y Transportes (ATT)", en: "Telecommunications and Transport Regulatory Authority (ATT)" },
      { es: "Ministerio de Obras Públicas, Servicios y Vivienda", en: "Ministry of Public Works, Services and Housing" },
    ],
  },
  {
    id: "mineria",
    overview: [
      {
        es: "El régimen minero boliviano opera mediante contratos administrativos mineros y derechos preconstituidos sujetos a un proceso de adecuación, con la AJAM como autoridad jurisdiccional administrativa minera. El estudio asesora a empresas mineras y a titulares de derechos en la constitución, adecuación y transferencia de esos derechos, y en los contratos de asociación y riesgo compartido habituales del sector.",
        en: "Bolivia's mining regime operates through administrative mining contracts and pre-existing rights subject to a conversion process, with the AJAM as the administrative mining jurisdictional authority. The firm advises mining companies and rights holders on creating, converting and transferring those rights, and on the joint-venture and risk-sharing agreements common in the sector.",
      },
      {
        es: "También representamos a nuestros clientes en oposiciones y procesos de nulidad ante la AJAM, y en los arbitrajes que surgen de disputas entre socios o de incumplimientos contractuales, además de asesorar sobre el régimen de regalías mineras aplicable en cada departamento.",
        en: "We also represent clients in opposition and annulment proceedings before the AJAM, and in arbitrations arising from disputes between partners or contractual breaches, as well as advising on the mining royalty regime applicable in each department.",
      },
    ],
    services: [
      { es: "Constitución y adecuación de derechos mineros", en: "Creating and converting mining rights" },
      { es: "Contratos de asociación y riesgo compartido", en: "Joint-venture and risk-sharing agreements" },
      { es: "Transferencia de derechos y due diligence minero", en: "Rights transfers and mining due diligence" },
      { es: "Oposiciones y procesos de nulidad ante la AJAM", en: "Opposition and annulment proceedings before the AJAM" },
      { es: "Régimen de regalías mineras", en: "Mining royalty regime advice" },
      { es: "Arbitrajes y controversias entre socios del sector", en: "Sector arbitrations and partner disputes" },
    ],
    forums: [
      { es: "Autoridad Jurisdiccional Administrativa Minera (AJAM)", en: "Mining Administrative Jurisdictional Authority (AJAM)" },
      { es: "Ministerio de Minería y Metalurgia", en: "Ministry of Mining and Metallurgy" },
      { es: "Centros de arbitraje, según la cláusula contractual aplicable", en: "Arbitration centres, per the applicable contract clause" },
    ],
  },
  {
    id: "saneamiento-basico",
    overview: [
      {
        es: "Los operadores de agua potable y alcantarillado en Bolivia (cooperativas, empresas municipales y operadores privados) trabajan bajo licencias y concesiones que definen su área de servicio y su estructura tarifaria, fiscalizadas por la AAPS. El estudio asesora a estos operadores en la obtención y renovación de esas licencias, y en su relación con la autoridad reguladora.",
        en: "Water and sanitation operators in Bolivia (cooperatives, municipal companies and private operators) work under licences and concessions that define their service area and tariff structure, overseen by the AAPS. The firm advises these operators on obtaining and renewing those licences, and on their relationship with the regulator.",
      },
      {
        es: "También atendemos controversias con usuarios, con los municipios que otorgan las concesiones y con contratistas de obra, incluidas aquellas sometidas a arbitraje conforme a las cláusulas de los contratos de construcción y operación del sector.",
        en: "We also handle disputes with users, with the municipalities that grant the concessions, and with construction contractors, including those referred to arbitration under the sector's construction and operation contracts.",
      },
    ],
    services: [
      { es: "Licencias y concesiones de agua potable y alcantarillado", en: "Water and sanitation licences and concessions" },
      { es: "Definición de áreas de servicio y estructura tarifaria", en: "Service-area and tariff-structure definition" },
      { es: "Relación regulatoria con la AAPS", en: "Regulatory relationship with the AAPS" },
      { es: "Contratos de construcción y operación de infraestructura", en: "Infrastructure construction and operation contracts" },
      { es: "Controversias con usuarios y municipios", en: "Disputes with users and municipalities" },
      { es: "Arbitrajes derivados de contratos de obra del sector", en: "Arbitrations arising from sector construction contracts" },
    ],
    forums: [
      { es: "Autoridad de Fiscalización y Control de Agua Potable y Saneamiento Básico (AAPS)", en: "Water and Sanitation Regulatory Authority (AAPS)" },
      { es: "Gobiernos autónomos municipales", en: "Autonomous municipal governments" },
      { es: "Centros de arbitraje, según la cláusula contractual aplicable", en: "Arbitration centres, per the applicable contract clause" },
    ],
  },
  {
    id: "transporte",
    overview: [
      {
        es: "El estudio asesora en transporte aéreo, terrestre y ferroviario, tres regímenes distintos que comparten la necesidad de un permiso u operación autorizada por el Estado. En transporte aéreo trabajamos con la Dirección General de Aeronáutica Civil en permisos de operación y en asuntos de seguridad operacional; en transporte terrestre y ferroviario, con la ATT en concesiones y licencias.",
        en: "The firm advises on air, road and rail transport, three distinct regimes that share the need for a state-authorised permit or operation. In air transport we work with the civil aviation authority on operating permits and operational safety matters; in road and rail transport, with the ATT on concessions and licences.",
      },
      {
        es: "También asesoramos sobre responsabilidad del transportista y régimen de carga, y representamos a nuestros clientes en procedimientos sancionatorios y en reclamaciones de daños derivadas de siniestros, incluida la coordinación con aseguradoras.",
        en: "We also advise on carrier liability and the cargo regime, and represent clients in enforcement proceedings and in damage claims arising from incidents, including coordination with insurers.",
      },
    ],
    services: [
      { es: "Permisos de operación de transporte aéreo, terrestre y ferroviario", en: "Air, road and rail transport operating permits" },
      { es: "Concesiones y licencias ante la ATT", en: "Concessions and licences before the ATT" },
      { es: "Asesoramiento en responsabilidad del transportista", en: "Carrier liability advice" },
      { es: "Régimen de carga y logística", en: "Cargo and logistics regime" },
      { es: "Procedimientos sancionatorios en materia de transporte", en: "Transport-related enforcement proceedings" },
      { es: "Reclamaciones de daños y coordinación con aseguradoras", en: "Damage claims and insurer coordination" },
    ],
    forums: [
      { es: "Autoridad de Regulación y Fiscalización de Telecomunicaciones y Transportes (ATT)", en: "Telecommunications and Transport Regulatory Authority (ATT)" },
      { es: "Dirección General de Aeronáutica Civil (DGAC)", en: "Directorate General of Civil Aviation (DGAC)" },
      { es: "Ministerio de Obras Públicas, Servicios y Vivienda", en: "Ministry of Public Works, Services and Housing" },
    ],
  },
  {
    id: "medio-ambiente",
    overview: [
      {
        es: "Casi todo proyecto de inversión de cierta escala en Bolivia (minero, energético, industrial o inmobiliario) requiere una licencia ambiental bajo la Ley 1333: una ficha ambiental, y según el nivel de riesgo, un estudio de evaluación de impacto ambiental. El estudio acompaña a sus clientes en la preparación y tramitación de esa licencia, y en las auditorías ambientales y planes de adecuación posteriores.",
        en: "Almost every investment project of meaningful scale in Bolivia (mining, energy, industrial or real estate) requires an environmental licence under Law 1333: an environmental form and, depending on the risk level, an environmental impact assessment study. The firm supports clients through preparing and filing that licence, and through subsequent environmental audits and compliance plans.",
      },
      {
        es: "También asesoramos en procesos de consulta previa y en la gestión de pasivos ambientales, y defendemos a nuestros clientes en procedimientos sancionatorios y, cuando corresponde, en los procesos civiles y penales que puede generar un daño ambiental.",
        en: "We also advise on prior consultation processes and on managing legacy environmental liabilities, and defend clients in enforcement proceedings and, where it applies, in the civil and criminal proceedings that can follow from environmental damage.",
      },
    ],
    services: [
      { es: "Licenciamiento ambiental y fichas ambientales", en: "Environmental licensing and environmental forms" },
      { es: "Estudios de evaluación de impacto ambiental", en: "Environmental impact assessment studies" },
      { es: "Auditorías ambientales y planes de adecuación", en: "Environmental audits and compliance plans" },
      { es: "Procesos de consulta previa", en: "Prior consultation processes" },
      { es: "Gestión de pasivos ambientales", en: "Legacy environmental liability management" },
      { es: "Defensa en procedimientos sancionatorios y procesos judiciales", en: "Defence in enforcement and court proceedings" },
    ],
    forums: [
      { es: "Ministerio de Medio Ambiente y Agua", en: "Ministry of Environment and Water" },
      { es: "Autoridades ambientales competentes departamentales y sectoriales", en: "Competent departmental and sector environmental authorities" },
      { es: "Judicatura ordinaria, en procesos civiles y penales por daño ambiental", en: "Ordinary courts, in civil and criminal proceedings for environmental damage" },
    ],
  },
  {
    id: "derecho-civil-procesal-civil",
    overview: [
      {
        es: "El derecho civil es la base de buena parte de la actividad contractual y patrimonial de nuestros clientes: contratos, garantías, obligaciones y responsabilidad civil. El estudio redacta y negocia estos instrumentos, y asesora en sucesiones y en la administración de patrimonios familiares y empresariales.",
        en: "Civil law is the foundation of much of our clients' contractual and asset-related activity: contracts, security interests, obligations and tort liability. The firm drafts and negotiates these instruments, and advises on succession and on the administration of family and corporate assets.",
      },
      {
        es: "Cuando el asunto llega a litigio, lo hacemos bajo el Código Procesal Civil (Ley 439), que desde 2013 introdujo un proceso predominantemente oral y por audiencias. El estudio gestiona medidas preparatorias y cautelares, litiga en todas las instancias, y se ocupa de la ejecución de sentencias y laudos hasta su cumplimiento efectivo.",
        en: "When a matter goes to litigation, it does so under the Code of Civil Procedure (Law 439), which since 2013 introduced a predominantly oral, hearing-based process. The firm handles preliminary and interim measures, litigates at every instance, and manages the enforcement of judgments and arbitral awards through to actual compliance.",
      },
    ],
    services: [
      { es: "Redacción y negociación de contratos civiles", en: "Drafting and negotiating civil contracts" },
      { es: "Constitución de garantías reales y personales", en: "Real and personal security interests" },
      { es: "Sucesiones y administración de patrimonios", en: "Succession and estate administration" },
      { es: "Medidas preparatorias y cautelares", en: "Preliminary and interim measures" },
      { es: "Litigio civil en todas las instancias", en: "Civil litigation at every instance" },
      { es: "Ejecución de sentencias y laudos", en: "Enforcement of judgments and arbitral awards" },
    ],
    forums: [
      { es: "Juzgados públicos civiles y comerciales", en: "Civil and commercial public courts" },
      { es: "Tribunales departamentales de justicia", en: "Departmental courts of justice" },
      { es: "Tribunal Supremo de Justicia, en casación", en: "Supreme Court of Justice, on cassation" },
    ],
  },
  {
    id: "derecho-constitucional",
    overview: [
      {
        es: "El estudio plantea y defiende acciones de defensa ante el Tribunal Constitucional Plurinacional: acción de amparo constitucional, acción de cumplimiento y acción de libertad, así como acciones de inconstitucionalidad contra normas (incluidas normas tributarias, regulatorias o municipales) que afectan a nuestros clientes.",
        en: "The firm brings and defends constitutional actions before the Plurinational Constitutional Court: amparo, compliance actions and habeas corpus (acción de libertad), as well as challenges to the constitutionality of rules (including tax, regulatory or municipal rules) that affect our clients.",
      },
      {
        es: "Buena parte de este trabajo surge dentro de otros asuntos: una medida administrativa o judicial que vulnera un derecho fundamental exige, con frecuencia, una acción constitucional paralela. El estudio también asesora, de forma preventiva, sobre el alcance de derechos y garantías en materia económica y de inversión bajo la Constitución de 2009.",
        en: "Much of this work arises within other matters: an administrative or judicial measure that infringes a fundamental right frequently calls for a parallel constitutional action. The firm also advises, on a preventive basis, on the scope of economic and investment-related rights and guarantees under the 2009 Constitution.",
      },
    ],
    services: [
      { es: "Acción de amparo constitucional", en: "Constitutional amparo actions" },
      { es: "Acciones de inconstitucionalidad", en: "Constitutionality challenges" },
      { es: "Acción de cumplimiento", en: "Compliance actions" },
      { es: "Acción de libertad", en: "Habeas corpus (acción de libertad)" },
      { es: "Asesoramiento sobre derechos y garantías constitucionales en materia de inversión", en: "Advice on constitutional rights and guarantees in investment matters" },
      { es: "Coordinación de acciones constitucionales con litigios administrativos o civiles en curso", en: "Coordinating constitutional actions with ongoing administrative or civil litigation" },
    ],
    forums: [
      { es: "Tribunal Constitucional Plurinacional", en: "Plurinational Constitutional Court" },
      { es: "Salas constitucionales de los tribunales departamentales de justicia", en: "Constitutional chambers of the departmental courts of justice" },
    ],
  },
  {
    id: "derecho-mercantil",
    overview: [
      {
        es: "El estudio constituye sociedades, sucursales de empresas extranjeras y contratos asociativos, y lleva su vida societaria ante el registro de comercio administrado por FUNDEMPRESA: actas, modificaciones estatutarias, aumentos de capital y demás trámites societarios periódicos.",
        en: "The firm incorporates companies, branches of foreign corporations and joint-venture vehicles, and manages their corporate life before the commercial registry administered by FUNDEMPRESA: minutes, bylaw amendments, capital increases and other routine corporate filings.",
      },
      {
        es: "En el plano transaccional, asesoramos en adquisiciones, reorganizaciones societarias y contratos comerciales bajo el Código de Comercio. Cuando surgen conflictos entre socios o accionistas, o un proceso de disolución, liquidación o reestructuración, el estudio representa a sus clientes tanto en la negociación como, si es necesario, en el litigio correspondiente.",
        en: "On the transactional side, we advise on acquisitions, corporate reorganisations and commercial contracts under the Commercial Code. When disputes arise between partners or shareholders, or a dissolution, liquidation or restructuring process is needed, the firm represents clients both in negotiation and, where necessary, in the resulting litigation.",
      },
    ],
    services: [
      { es: "Constitución de sociedades y sucursales de empresas extranjeras", en: "Incorporating companies and foreign-company branches" },
      { es: "Trámites societarios ante FUNDEMPRESA", en: "Corporate filings before FUNDEMPRESA" },
      { es: "Adquisiciones y reorganizaciones societarias", en: "Acquisitions and corporate reorganisations" },
      { es: "Contratos comerciales y asociativos", en: "Commercial and joint-venture contracts" },
      { es: "Conflictos entre socios y accionistas", en: "Shareholder and partner disputes" },
      { es: "Disolución, liquidación y reestructuración societaria", en: "Corporate dissolution, liquidation and restructuring" },
    ],
    forums: [
      { es: "FUNDEMPRESA (registro de comercio)", en: "FUNDEMPRESA (the commercial registry)" },
      { es: "Juzgados públicos comerciales", en: "Commercial public courts" },
      { es: "Centros de arbitraje, según la cláusula contractual aplicable", en: "Arbitration centres, per the applicable contract clause" },
    ],
  },
  {
    id: "derecho-tributario",
    overview: [
      {
        es: "El estudio asesora en planificación y cumplimiento tributario bajo el Código Tributario boliviano: IVA, IT, IUE, retenciones por remesas al exterior y la aplicación de convenios para evitar la doble imposición cuando el cliente opera desde una jurisdicción con tratado vigente con Bolivia. Buena parte de este trabajo es preventivo: estructurar una operación para que su tratamiento tributario sea claro desde el inicio.",
        en: "The firm advises on tax planning and compliance under Bolivia's Tax Code: VAT, the transaction tax, corporate income tax, withholding on payments abroad, and the application of double-taxation treaties where the client operates from a jurisdiction with a treaty in force with Bolivia. Much of this work is preventive: structuring a transaction so its tax treatment is clear from the outset.",
      },
      {
        es: "Cuando el Servicio de Impuestos Nacionales inicia una fiscalización, representamos a nuestros clientes durante todo el proceso, y en los recursos de alzada y jerárquico ante la Autoridad de Impugnación Tributaria (AIT) si el resultado no es favorable, así como en la vía judicial cuando el caso lo requiere.",
        en: "When the national tax service opens an audit, we represent clients throughout the process, and in first-instance and hierarchical appeals before the Tax Appeals Authority (AIT) if the outcome is unfavourable, as well as in subsequent court proceedings where the case requires it.",
      },
    ],
    services: [
      { es: "Planificación tributaria de operaciones y estructuras", en: "Tax planning for transactions and structures" },
      { es: "Retenciones por remesas al exterior y convenios de doble imposición", en: "Withholding on payments abroad and double-taxation treaties" },
      { es: "Representación en fiscalizaciones del Servicio de Impuestos Nacionales", en: "Representation in national tax service audits" },
      { es: "Recursos de alzada y jerárquico ante la AIT", en: "First-instance and hierarchical appeals before the AIT" },
      { es: "Litigio tributario en vía judicial", en: "Tax litigation before the courts" },
      { es: "Opiniones tributarias para operaciones transfronterizas", en: "Tax opinions for cross-border transactions" },
    ],
    forums: [
      { es: "Servicio de Impuestos Nacionales", en: "National Tax Service" },
      { es: "Autoridad de Impugnación Tributaria (AIT)", en: "Tax Appeals Authority (AIT)" },
      { es: "Tribunal Supremo de Justicia, en la vía contencioso-tributaria", en: "Supreme Court of Justice, in tax-related judicial review" },
    ],
  },
  {
    id: "estructura-de-financiamientos",
    overview: [
      {
        es: "El estudio estructura financiamientos de proyecto y corporativos para clientes que obtienen fondos de banca local, prestamistas del exterior y organismos multilaterales: contratos de préstamo, sindicaciones, y los fideicomisos de garantía, hipotecas y prendas que los respaldan, junto con su inscripción registral correspondiente.",
        en: "The firm structures project and corporate financings for clients raising funds from local banks, foreign lenders and multilateral agencies: loan agreements, syndications, and the security trusts, mortgages and pledges that back them, together with their corresponding registration.",
      },
      {
        es: "Un componente central de este trabajo es la opinión legal: prestamistas extranjeros y multilaterales suelen exigir una opinión sobre la exigibilidad y ejecución de las garantías bajo derecho boliviano antes de desembolsar. El estudio emite estas opiniones y coordina, cuando el financiamiento es transfronterizo, con los asesores del prestamista en la jurisdicción de origen.",
        en: "A central part of this work is the legal opinion: foreign and multilateral lenders typically require an opinion on the enforceability and foreclosure of security under Bolivian law before disbursing funds. The firm issues these opinions and coordinates, where the financing is cross-border, with the lender's counsel in the originating jurisdiction.",
      },
    ],
    services: [
      { es: "Contratos de préstamo y financiamientos sindicados", en: "Loan agreements and syndicated financings" },
      { es: "Fideicomisos de garantía, hipotecas y prendas", en: "Security trusts, mortgages and pledges" },
      { es: "Inscripción registral de garantías", en: "Registration of security interests" },
      { es: "Opiniones legales sobre exigibilidad de garantías en Bolivia", en: "Legal opinions on enforceability of security in Bolivia" },
      { es: "Financiamiento de proyectos con organismos multilaterales", en: "Project financing with multilateral agencies" },
      { es: "Refinanciamientos y reestructuración de deuda", en: "Refinancings and debt restructuring" },
    ],
    // TODO: confirm with the firm's banking lawyers whether ASFI involvement
    // should be stated more broadly (it applies only when the lender itself
    // is a regulated entity, not to financings generally).
    forums: [
      { es: "Registro de Derechos Reales, para la inscripción de garantías", en: "The Real Rights Registry, for registering security" },
      { es: "Autoridad de Supervisión del Sistema Financiero (ASFI), cuando el prestamista es una entidad regulada", en: "The financial regulator (ASFI), where the lender is a regulated entity" },
      { es: "Juzgados públicos civiles y comerciales, en ejecución de garantías", en: "Civil and commercial public courts, in security enforcement" },
    ],
  },
  {
    id: "derecho-financiero",
    overview: [
      {
        es: "El estudio asesora a bancos, entidades financieras, aseguradoras y participantes del mercado de valores en su relación con los reguladores del sistema financiero boliviano bajo la Ley 393: licenciamiento, gobierno corporativo, y el cumplimiento continuo que exige operar como entidad regulada.",
        en: "The firm advises banks, financial institutions, insurers and capital-markets participants on their relationship with Bolivia's financial-system regulators under Law 393: licensing, corporate governance, and the ongoing compliance that comes with operating as a regulated entity.",
      },
      {
        es: "Representamos a nuestros clientes en requerimientos e inspecciones de la ASFI y de la APS, y en procedimientos sancionatorios cuando corresponde. También asesoramos en emisiones de valores en la Bolsa Boliviana de Valores y en la estructuración de instrumentos financieros conforme al marco regulatorio vigente.",
        en: "We represent clients in information requests and inspections by the financial regulator (ASFI) and the pension and insurance regulator (APS), and in enforcement proceedings where they arise. We also advise on securities issues on the Bolivian Stock Exchange and on structuring financial instruments under the current regulatory framework.",
      },
    ],
    services: [
      { es: "Licenciamiento de entidades financieras y aseguradoras", en: "Licensing financial institutions and insurers" },
      { es: "Gobierno corporativo bajo la Ley 393", en: "Corporate governance under Law 393" },
      { es: "Representación en inspecciones y requerimientos de la ASFI y la APS", en: "Representation in ASFI and APS inspections and information requests" },
      { es: "Procedimientos sancionatorios del sector financiero", en: "Financial-sector enforcement proceedings" },
      { es: "Emisiones de valores en la Bolsa Boliviana de Valores", en: "Securities issues on the Bolivian Stock Exchange" },
      { es: "Estructuración de instrumentos financieros regulados", en: "Structuring regulated financial instruments" },
    ],
    forums: [
      { es: "Autoridad de Supervisión del Sistema Financiero (ASFI)", en: "Financial System Supervisory Authority (ASFI)" },
      { es: "Autoridad de Fiscalización y Control de Pensiones y Seguros (APS)", en: "Pensions and Insurance Regulatory Authority (APS)" },
      { es: "Bolsa Boliviana de Valores", en: "Bolivian Stock Exchange" },
    ],
  },
  {
    id: "propiedad-intelectual",
    overview: [
      {
        es: "El estudio registra y defiende marcas, patentes y derechos de autor ante el SENAPI, bajo el marco de las Decisiones 486 y 351 de la Comunidad Andina, que rige la propiedad industrial y el derecho de autor en Bolivia junto con los demás países miembros. Para clientes que operan en varios países andinos, esto significa una estrategia de protección coordinada más allá de Bolivia.",
        en: "The firm registers and defends trademarks, patents and copyright before SENAPI, under the framework of Andean Community Decisions 486 and 351, which governs industrial property and copyright in Bolivia alongside the other member countries. For clients operating across several Andean countries, this means a coordinated protection strategy beyond Bolivia alone.",
      },
      {
        es: "También atendemos oposiciones, cancelaciones por falta de uso y acciones de nulidad, así como acciones por infracción marcaria y competencia desleal. En el plano transaccional, negociamos licencias, contratos de franquicia y acuerdos de transferencia de tecnología para clientes que introducen marcas o productos en el mercado boliviano.",
        en: "We also handle oppositions, non-use cancellations and invalidity actions, as well as trademark infringement and unfair-competition claims. On the transactional side, we negotiate licences, franchise agreements and technology-transfer arrangements for clients bringing brands or products into the Bolivian market.",
      },
    ],
    services: [
      { es: "Registro de marcas, patentes y derechos de autor", en: "Trademark, patent and copyright registration" },
      { es: "Oposiciones, cancelaciones y acciones de nulidad", en: "Oppositions, cancellations and invalidity actions" },
      { es: "Acciones por infracción y competencia desleal", en: "Infringement and unfair-competition claims" },
      { es: "Contratos de licencia y franquicia", en: "Licence and franchise agreements" },
      { es: "Transferencia de tecnología", en: "Technology transfer" },
      { es: "Estrategias de protección coordinadas en la Comunidad Andina", en: "Coordinated protection strategies across the Andean Community" },
    ],
    forums: [
      { es: "Servicio Nacional de Propiedad Intelectual (SENAPI)", en: "National Intellectual Property Service (SENAPI)" },
      { es: "Juzgados públicos civiles y comerciales, en acciones de infracción", en: "Civil and commercial public courts, in infringement actions" },
      { es: "Tribunal de Justicia de la Comunidad Andina, en interpretación prejudicial", en: "Andean Community Court of Justice, on preliminary interpretation matters" },
    ],
  },
  {
    id: "resolucion-alternativa-de-conflictos",
    overview: [
      {
        es: "El estudio actúa como abogado de parte en arbitrajes nacionales e internacionales bajo la Ley 708 de Conciliación y Arbitraje, y en los procesos de conciliación previa que en ciertos casos son un paso obligatorio antes del litigio o el arbitraje. Redactamos cláusulas arbitrales para los contratos de nuestros clientes, cuidando que sean ejecutables y que designen un mecanismo claro de resolución.",
        en: "The firm acts as party counsel in domestic and international arbitrations under Law 708 on Conciliation and Arbitration, and in the pre-litigation conciliation that in certain cases is a mandatory step before litigation or arbitration. We draft arbitration clauses for our clients' contracts, taking care that they are enforceable and designate a clear dispute-resolution mechanism.",
      },
      {
        es: "Cuando el conflicto se materializa, tramitamos el proceso ante los centros de las cámaras de comercio bolivianas o bajo reglamentos internacionales como los de la CCI y UNCITRAL, según lo que las partes hayan pactado. También gestionamos el reconocimiento y la ejecución de laudos arbitrales, incluidos laudos extranjeros, ante la judicatura boliviana.",
        en: "When a dispute materialises, we conduct the proceedings before the arbitration centres of Bolivia's chambers of commerce or under international rules such as those of the ICC and UNCITRAL, as agreed by the parties. We also handle the recognition and enforcement of arbitral awards, including foreign awards, before the Bolivian courts.",
      },
    ],
    services: [
      { es: "Redacción de cláusulas arbitrales", en: "Drafting arbitration clauses" },
      { es: "Representación en arbitrajes nacionales e internacionales", en: "Representation in domestic and international arbitrations" },
      { es: "Conciliación previa y mediación", en: "Pre-litigation conciliation and mediation" },
      { es: "Reconocimiento y ejecución de laudos, incluidos laudos extranjeros", en: "Recognition and enforcement of awards, including foreign awards" },
      { es: "Medidas cautelares en apoyo de procesos arbitrales", en: "Interim measures in support of arbitration proceedings" },
      { es: "Anulación de laudos arbitrales", en: "Setting aside arbitral awards" },
    ],
    forums: [
      { es: "Centros de arbitraje de las cámaras de comercio departamentales", en: "Arbitration centres of the departmental chambers of commerce" },
      { es: "Arbitrajes bajo reglamentos CCI y UNCITRAL", en: "Arbitrations under ICC and UNCITRAL rules" },
      { es: "Juzgados públicos civiles y comerciales, en apoyo y ejecución de laudos", en: "Civil and commercial public courts, in support of and enforcement of awards" },
    ],
  },
  {
    id: "sistema-de-buenas-practicas",
    overview: [
      {
        es: "El estudio diseña programas de cumplimiento calibrados al riesgo boliviano, no plantillas genéricas trasladadas de otra jurisdicción. Eso incluye políticas de prevención de legitimación de ganancias ilícitas ante los estándares de la UIF, y políticas anticorrupción bajo la Ley 004, articuladas con marcos internacionales como la FCPA estadounidense y la UK Bribery Act cuando el cliente responde también a esos regímenes.",
        en: "The firm designs compliance programmes calibrated to Bolivian risk, not generic templates carried over from another jurisdiction. That includes anti-money-laundering policies aligned with the standards of the Financial Investigations Unit (UIF), and anti-corruption policies under Law 004, coordinated with international frameworks such as the US FCPA and the UK Bribery Act where the client also answers to those regimes.",
      },
      {
        es: "Este trabajo se traduce en investigaciones internas cuando surge una alerta o una denuncia, capacitación a equipos locales, y debida diligencia de contrapartes (distribuidores, agentes, socios locales) antes de formalizar una relación comercial en Bolivia.",
        en: "This work translates into internal investigations when a red flag or complaint arises, training for local teams, and due diligence on counterparties (distributors, agents, local partners) before a business relationship in Bolivia is formalised.",
      },
    ],
    services: [
      { es: "Diseño de programas de cumplimiento normativo", en: "Designing regulatory compliance programmes" },
      { es: "Políticas de prevención de legitimación de ganancias ilícitas", en: "Anti-money-laundering policies" },
      { es: "Políticas anticorrupción y su articulación con FCPA y UK Bribery Act", en: "Anti-corruption policies, coordinated with the FCPA and UK Bribery Act" },
      { es: "Investigaciones internas", en: "Internal investigations" },
      { es: "Capacitación en cumplimiento para equipos locales", en: "Compliance training for local teams" },
      { es: "Debida diligencia de contrapartes y socios comerciales", en: "Due diligence on counterparties and business partners" },
    ],
    forums: [
      { es: "Unidad de Investigaciones Financieras (UIF)", en: "Financial Investigations Unit (UIF)" },
      { es: "Ministerio Público, en investigaciones penales derivadas de hallazgos de cumplimiento", en: "Public Prosecutor's Office, in criminal investigations arising from compliance findings" },
    ],
  },
  {
    id: "derecho-laboral-seguridad-social",
    overview: [
      {
        es: "El estudio asesora en toda la relación laboral: contratación, reglamentos internos, tercerización, y su terminación, bajo la Ley General del Trabajo y sus normas complementarias, que en Bolivia otorgan una protección considerable al trabajador y limitan de forma estricta el despido sin causa justificada.",
        en: "The firm advises across the entire employment relationship: hiring, workplace rules, outsourcing, and termination, under the General Labour Act and its complementary rules, which in Bolivia afford considerable protection to employees and strictly limit dismissal without just cause.",
      },
      {
        es: "También atendemos inspecciones y conminatorias de reincorporación emitidas por el Ministerio de Trabajo, aportes a la seguridad social de corto y largo plazo, y litigamos ante la judicatura laboral cuando un conflicto individual o colectivo no se resuelve en la vía administrativa.",
        en: "We also handle inspections and reinstatement orders issued by the Ministry of Labour, short- and long-term social security contributions, and litigate before the labour courts when an individual or collective dispute is not resolved administratively.",
      },
    ],
    services: [
      { es: "Contratación y reglamentos internos de trabajo", en: "Hiring and internal workplace rules" },
      { es: "Tercerización laboral", en: "Outsourcing arrangements" },
      { es: "Procesos de terminación y beneficios sociales", en: "Termination processes and statutory severance" },
      { es: "Inspecciones y conminatorias del Ministerio de Trabajo", en: "Ministry of Labour inspections and reinstatement orders" },
      { es: "Aportes a la seguridad social de corto y largo plazo", en: "Short- and long-term social security contributions" },
      { es: "Litigio laboral individual y colectivo", en: "Individual and collective labour litigation" },
    ],
    forums: [
      { es: "Ministerio de Trabajo, Empleo y Previsión Social", en: "Ministry of Labour, Employment and Social Welfare" },
      { es: "Judicatura laboral (juzgados públicos del trabajo y la seguridad social)", en: "Labour and social security public courts" },
      { es: "Tribunales departamentales de justicia, en apelación", en: "Departmental courts of justice, on appeal" },
    ],
  },
  {
    id: "derecho-familiar",
    overview: [
      {
        es: "El estudio atiende asuntos de familia con la discreción que exigen: divorcio y separación, régimen de bienes, asistencia familiar, filiación, adopción y autorizaciones judiciales, bajo el Código de las Familias y del Proceso Familiar. Muchos de estos asuntos involucran, además, un componente patrimonial relevante (empresas familiares, inmuebles, participaciones societarias) que requiere coordinación con el trabajo societario y sucesorio del estudio.",
        en: "The firm handles family matters with the discretion they require: divorce and separation, matrimonial property, maintenance, filiation, adoption and judicial authorisations, under the Family and Family Process Code. Many of these matters also carry a significant asset component (family businesses, real estate, shareholdings) that calls for coordination with the firm's corporate and succession work.",
      },
      {
        es: "Para familias empresarias en particular, asesoramos en acuerdos prenupciales y en la planificación sucesoria que anticipa cómo se distribuirá la propiedad de la empresa familiar, buscando prevenir disputas que, de otro modo, podrían derivar en litigio familiar y afectar la continuidad del negocio.",
        en: "For business families in particular, we advise on prenuptial agreements and on succession planning that anticipates how ownership of the family business will be distributed, aiming to prevent disputes that might otherwise turn into family litigation and affect the continuity of the business.",
      },
    ],
    services: [
      { es: "Divorcio y separación", en: "Divorce and separation" },
      { es: "Régimen de bienes y asistencia familiar", en: "Matrimonial property and maintenance" },
      { es: "Filiación y adopción", en: "Filiation and adoption" },
      { es: "Autorizaciones judiciales", en: "Judicial authorisations" },
      { es: "Acuerdos prenupciales", en: "Prenuptial agreements" },
      { es: "Planificación sucesoria familiar y empresarial", en: "Family and business succession planning" },
    ],
    forums: [
      { es: "Juzgados públicos en materia familiar", en: "Public family courts" },
      { es: "Tribunales departamentales de justicia, en apelación", en: "Departmental courts of justice, on appeal" },
    ],
  },
  {
    id: "derecho-inmobiliario-derechos-reales",
    overview: [
      {
        es: "El estudio realiza auditoría de títulos ante el registro de Derechos Reales y, en el caso de predios rurales, ante el INRA, como primer paso en cualquier operación inmobiliaria de cierto valor. Asesoramos en compraventa, anticresis, usufructo, servidumbres y propiedad horizontal, y acompañamos desarrollos inmobiliarios desde la etapa de adquisición del terreno hasta la venta o arrendamiento de unidades.",
        en: "The firm audits title before the Real Rights Registry and, for rural land, before the agrarian authority (INRA), as the first step in any real estate transaction of meaningful value. We advise on sale and purchase, antichresis, usufruct, easements and condominium regimes, and support real estate developments from land acquisition through to the sale or lease of units.",
      },
      {
        es: "Cuando el título de un inmueble está en disputa, litigamos acciones reivindicatorias, de usucapión y de mejor derecho propietario, y representamos a nuestros clientes en procesos de desalojo y en la ejecución de hipotecas cuando una garantía inmobiliaria debe hacerse efectiva.",
        en: "Where title to a property is disputed, we litigate ownership, adverse possession and better-title claims, and represent clients in eviction proceedings and in mortgage foreclosure when real estate security must be enforced.",
      },
    ],
    services: [
      { es: "Auditoría de títulos ante Derechos Reales y el INRA", en: "Title audits before the Real Rights Registry and INRA" },
      { es: "Contratos de compraventa, anticresis y usufructo", en: "Sale, antichresis and usufruct agreements" },
      { es: "Constitución de servidumbres y propiedad horizontal", en: "Easements and condominium regimes" },
      { es: "Acompañamiento de desarrollos inmobiliarios", en: "Support for real estate developments" },
      { es: "Litigio de acciones reivindicatorias y de usucapión", en: "Ownership and adverse possession litigation" },
      { es: "Desalojos y ejecución de hipotecas", en: "Evictions and mortgage foreclosure" },
    ],
    forums: [
      { es: "Registro de Derechos Reales", en: "Real Rights Registry" },
      { es: "Instituto Nacional de Reforma Agraria (INRA), en predios rurales", en: "National Institute of Agrarian Reform (INRA), for rural land" },
      { es: "Juzgados públicos civiles, en litigio inmobiliario", en: "Civil public courts, in real estate litigation" },
    ],
  },
] as const satisfies readonly PracticeAreaDetail[];

export function getPracticeAreaDetail(id: string) {
  return practiceAreaDetails.find((d) => d.id === id);
}

/** Shared section labels used on every /practice-areas/[slug] page. */
export const practiceAreaDetailLabels = {
  servicesHeading: { es: "Servicios habituales", en: "Typical Services" },
  forumsHeading: { es: "Ante quién actuamos", en: "Where We Appear" },
  ctaEyebrow: { es: "¿Tiene un asunto en esta área?", en: "Have a matter in this area?" },
  ctaBody: {
    es: "Escríbanos con el contexto de su asunto y lo dirigiremos directamente al socio responsable de esta práctica.",
    en: "Write to us with the background to your matter and we will route it directly to the partner responsible for this practice.",
  },
} as const satisfies Record<string, Localized>;
