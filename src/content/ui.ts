import type { Localized } from "./types";

/**
 * Every piece of interface copy on the site, in both languages.
 *
 * Components must never hardcode a user-visible string, read it from here via
 * `getDictionary(locale)`. Keeping ES and EN adjacent is what makes CLAUDE.md
 * rule 6 (equal quality in both languages) reviewable at a glance.
 */

export const ui = {
  nav: {
    firmProfile: { es: "Perfil del Estudio", en: "Firm Profile" },
    practiceAreas: { es: "Áreas de Práctica", en: "Practice Areas" },
    lawyers: { es: "Abogados", en: "Lawyers" },
    publications: { es: "Publicaciones", en: "Publications" },
    contact: { es: "Contacto", en: "Contact" },
  },

  actions: {
    viewAll: { es: "Ver todo", en: "View all" },
    viewAllPracticeAreas: {
      es: "Ver todas las áreas",
      en: "View all practice areas",
    },
    viewAllLawyers: { es: "Ver todos los abogados", en: "View all lawyers" },
    /** `{count}` is substituted with `format()`, from `PRACTICE_AREA_COUNT`. */
    viewAllPracticeAreasCount: {
      es: "Ver las {count} áreas",
      en: "View all {count} areas",
    },
    viewProfile: { es: "Ver perfil", en: "View profile" },
    readMore: { es: "Leer más", en: "Read more" },
    enquireAboutArea: {
      es: "Consultar sobre esta área",
      en: "Enquire about this area",
    },
    previousArea: { es: "Área anterior", en: "Previous area" },
    nextArea: { es: "Siguiente área", en: "Next area" },
    contactLawyer: { es: "Contactar", en: "Contact" },
    previousLawyer: { es: "Abogado anterior", en: "Previous lawyer" },
    nextLawyer: { es: "Siguiente abogado", en: "Next lawyer" },
    back: { es: "Volver", en: "Back" },
    backToPracticeAreas: {
      es: "Volver a Áreas de Práctica",
      en: "Back to Practice Areas",
    },
    backToLawyers: { es: "Volver a Abogados", en: "Back to Lawyers" },
    contactUs: { es: "Contactar al estudio", en: "Contact the firm" },
    goHome: { es: "Ir al inicio", en: "Go to the home page" },
  },

  language: {
    label: { es: "Idioma", en: "Language" },
    es: { es: "Español", en: "Spanish" },
    en: { es: "Inglés", en: "English" },
    /** Shown on the switcher itself, always in the target language. */
    esShort: { es: "ES", en: "ES" },
    enShort: { es: "EN", en: "EN" },
  },

  contact: {
    addressLabel: { es: "Dirección", en: "Address" },
    casillaLabel: { es: "Casilla", en: "P.O. Box" },
    phoneLabel: { es: "Teléfonos", en: "Telephone" },
    emailLabel: { es: "Correo electrónico", en: "Email" },
    hoursLabel: { es: "Horario de atención", en: "Office hours" },
    /** Confirmed by the firm. The specific opening/closing times are not, see TODO. */
    hoursDays: { es: "Lunes a viernes", en: "Monday to Friday" },
    mapLinkLabel: { es: "Ver en Google Maps", en: "View on Google Maps" },
    mapFrameTitle: {
      es: "Mapa: oficina del estudio en Calacoto, La Paz",
      en: "Map: the firm's office in Calacoto, La Paz",
    },
  },

  form: {
    heading: { es: "Escríbanos", en: "Write to us" },
    intro: {
      es: "Cuéntenos brevemente su consulta y le responderemos a la mayor brevedad.",
      en: "Tell us briefly what you need and we will reply promptly.",
    },
    name: { es: "Nombre completo", en: "Full name" },
    organization: { es: "Empresa u organización", en: "Company or organisation" },
    email: { es: "Correo electrónico", en: "Email" },
    phone: { es: "Teléfono", en: "Telephone" },
    practiceArea: { es: "Área de práctica", en: "Practice area" },
    practiceAreaPlaceholder: {
      es: "Seleccione un área",
      en: "Select an area",
    },
    message: { es: "Mensaje", en: "Message" },
    optional: { es: "(opcional)", en: "(optional)" },
    requiredMark: { es: "obligatorio", en: "required" },
    submit: { es: "Enviar consulta", en: "Send enquiry" },
    submitting: { es: "Enviando…", en: "Sending…" },
    successTitle: { es: "Mensaje enviado", en: "Message sent" },
    successBody: {
      es: "Gracias por escribirnos. Hemos recibido su consulta y le responderemos a la brevedad.",
      en: "Thank you for writing. We have received your enquiry and will reply shortly.",
    },
    errorTitle: { es: "No pudimos enviar el mensaje", en: "We could not send your message" },
    errorBody: {
      es: "Ocurrió un problema al enviar el formulario. Vuelva a intentarlo o llámenos por teléfono.",
      en: "Something went wrong while sending the form. Please try again or call us by telephone.",
    },
    /** Disclaimer required so a form submission is not read as engagement. */
    disclaimer: {
      es: "El envío de este formulario no crea una relación abogado-cliente ni constituye asesoramiento legal.",
      en: "Submitting this form does not create a lawyer-client relationship, nor does it constitute legal advice.",
    },
  },

  validation: {
    required: { es: "Este campo es obligatorio.", en: "This field is required." },
    nameTooShort: {
      es: "Ingrese su nombre completo.",
      en: "Please enter your full name.",
    },
    emailInvalid: {
      es: "Ingrese un correo electrónico válido.",
      en: "Please enter a valid email address.",
    },
    phoneInvalid: {
      es: "Ingrese un número de teléfono válido.",
      en: "Please enter a valid telephone number.",
    },
    messageTooShort: {
      es: "Describa su consulta en al menos veinte caracteres.",
      en: "Please describe your enquiry in at least twenty characters.",
    },
    messageTooLong: {
      es: "El mensaje no puede superar los 2.000 caracteres.",
      en: "The message cannot exceed 2,000 characters.",
    },
  },

  footer: {
    tagline: {
      es: "Abogados corporativos en La Paz, Bolivia, desde 1971.",
      en: "Corporate counsel in La Paz, Bolivia, since 1971.",
    },
    navHeading: { es: "El estudio", en: "The firm" },
    contactHeading: { es: "Contacto", en: "Contact" },
    /** `{year}` is substituted at render time with `format()`, from `site.founded`. */
    since: { es: "Desde {year}", en: "Since {year}" },
    /** `{year}` is substituted at render time with `format()`. */
    copyright: {
      es: "© {year} Estudio Jurídico Gerke, Sociedad Civil. Todos los derechos reservados.",
      en: "© {year} Estudio Jurídico Gerke, Sociedad Civil. All rights reserved.",
    },
    legalNotice: { es: "Aviso legal", en: "Legal notice" },
  },

  aria: {
    skipToContent: { es: "Ir al contenido principal", en: "Skip to main content" },
    mainNavigation: { es: "Navegación principal", en: "Main navigation" },
    footerNavigation: { es: "Navegación del pie de página", en: "Footer navigation" },
    languageSwitcher: { es: "Cambiar idioma", en: "Change language" },
    switchToSpanish: { es: "Ver esta página en español", en: "View this page in Spanish" },
    switchToEnglish: { es: "Ver esta página en inglés", en: "View this page in English" },
    openMenu: { es: "Abrir menú", en: "Open menu" },
    closeMenu: { es: "Cerrar menú", en: "Close menu" },
    breadcrumb: { es: "Ruta de navegación", en: "Breadcrumb" },
    currentPage: { es: "Página actual", en: "Current page" },
    practiceAreaList: { es: "Lista de áreas de práctica", en: "List of practice areas" },
    lawyerList: { es: "Lista de abogados", en: "List of lawyers" },
    homeLink: { es: "Estudio Jurídico Gerke, inicio", en: "Estudio Jurídico Gerke, home" },
    requiredField: { es: "Campo obligatorio", en: "Required field" },
    contactForm: { es: "Formulario de contacto", en: "Contact form" },
  },

  notFound: {
    eyebrow: { es: "Error 404", en: "Error 404" },
    title: { es: "Página no encontrada", en: "Page not found" },
    body: {
      es: "La página que busca no existe o cambió de dirección. Puede volver al inicio o escribirnos si necesita ayuda.",
      en: "The page you are looking for does not exist or has moved. You can return to the home page, or write to us if you need help.",
    },
  },

  pages: {
    home: {
      title: { es: "Inicio", en: "Home" },
      description: {
        es: "Estudio jurídico boutique en La Paz, Bolivia. Asesoramos a corporaciones extranjeras que invierten en Bolivia y a familias empresarias bolivianas desde 1971.",
        en: "Boutique law firm in La Paz, Bolivia. Counsel to foreign corporations investing in Bolivia and to Bolivian business families since 1971.",
      },
    },
    firmProfile: {
      title: { es: "Perfil del Estudio", en: "Firm Profile" },
      description: {
        es: "Fundado en La Paz en 1971, el estudio mantiene una práctica corporativa concentrada, con atención directa de los socios en cada asunto.",
        en: "Founded in La Paz in 1971, the firm maintains a focused corporate practice, with direct partner attention on every matter.",
      },
    },
    practiceAreas: {
      title: { es: "Áreas de Práctica", en: "Practice Areas" },
      description: {
        es: "Veinte áreas de práctica en derecho regulatorio, corporativo, tributario y de resolución de conflictos en Bolivia.",
        en: "Twenty practice areas across regulatory, corporate, tax and dispute resolution work in Bolivia.",
      },
      /** Index-page eyebrow, distinct from the page title itself. */
      eyebrow: { es: "Lo que hacemos", en: "What We Do" },
      /** Index-page lead paragraph, longer and more specific than `description`. */
      lead: {
        es: "El estudio cubre las veinte áreas siguientes con la misma capacidad: asesoramiento consultivo y, cuando el asunto lo exige, representación activa ante la vía judicial, arbitral o administrativa. Cada área recibe la misma exigencia técnica, sin distinción entre las materias de mayor perfil público y las de menor visibilidad.",
        en: "The firm covers the twenty areas below with the same capability throughout: advisory work and, when a matter requires it, active representation before the courts, an arbitral tribunal or an administrative authority. Every area receives the same technical rigour, with no distinction between higher-profile matters and those with a lower public profile.",
      },
    },
    lawyers: {
      title: { es: "Abogados", en: "Lawyers" },
      description: {
        es: "Los abogados del Estudio Jurídico Gerke, su formación y las áreas en las que trabajan.",
        en: "The lawyers of Estudio Jurídico Gerke, their education and the areas in which they practise.",
      },
      eyebrow: { es: "El equipo", en: "The Team" },
      lead: {
        es: "Un equipo unido por los mismos estándares profesionales y los mismos valores, con independencia del tamaño del asunto que cada abogado tenga a su cargo.",
        en: "A team bound by the same professional standards and the same values, regardless of the size of the matter any one lawyer is handling.",
      },
    },
    publications: {
      title: { es: "Publicaciones", en: "Publications" },
      description: {
        es: "Notas y análisis del estudio sobre cambios normativos y su efecto práctico en Bolivia.",
        en: "Notes and analysis from the firm on regulatory change and its practical effect in Bolivia.",
      },
      eyebrow: { es: "Recursos", en: "Resources" },
      lead: {
        es: "Análisis del estudio sobre asuntos jurídicos bolivianos de interés general para clientes y potenciales clientes: desde la constitución de una empresa hasta la sucesión patrimonial de una familia.",
        en: "Analysis from the firm on Bolivian legal matters of general interest to clients and prospective clients, from setting up a company to the succession of a family's assets.",
      },
    },
    contact: {
      title: { es: "Contacto", en: "Contact" },
      description: {
        es: "Dirección, teléfonos y formulario de contacto del Estudio Jurídico Gerke en La Paz, Bolivia.",
        en: "Address, telephone numbers and contact form for Estudio Jurídico Gerke in La Paz, Bolivia.",
      },
      lead: {
        es: "Comuníquese con el estudio para una consulta inicial. Puede escribirnos mediante el formulario o contactarnos directamente con los datos que figuran a continuación.",
        en: "Contact the firm for an initial enquiry. You can write to us using the form, or reach us directly using the details below.",
      },
    },
    legalNotice: {
      title: { es: "Aviso Legal", en: "Legal Notice" },
      description: {
        es: "Aviso legal del sitio web del Estudio Jurídico Gerke.",
        en: "Legal notice for the Estudio Jurídico Gerke website.",
      },
    },
  },

  /** Body copy for /legal-notice. Placeholder, do not invent legal terms. */
  legalNotice: {
    pending: {
      es: "Aviso legal pendiente de redacción por el estudio.",
      en: "Legal notice pending drafting by the firm.",
    },
  },
} as const satisfies UiShape;

/**
 * Structural contract for `ui`: every leaf must be a `Localized` pair, so a
 * string can never be added in one language only.
 */
type UiShape = {
  readonly [group: string]: {
    readonly [key: string]: Localized | { readonly [key: string]: Localized };
  };
};

export type Ui = typeof ui;
