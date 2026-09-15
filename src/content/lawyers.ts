import type { Localized } from "./types";

/**
 * The roster, transcribed from the firm's own site (lawfirm-gerke.com).
 *
 * Every field here is the firm's published wording, copied verbatim from the
 * Spanish and English profile pages: role, practice-area list, biography,
 * languages and the lawyer's direct email address. Nothing is paraphrased,
 * translated or invented. If a profile needs to change, the firm changes the
 * copy and it is transcribed again; do not edit the prose to taste.
 *
 * One deliberate exception, flagged rather than hidden: the English page for
 * Marcela Gerke Siles repeats its bar-admission and graduation sentences twice.
 * The duplicate pair is omitted below. The Spanish page has no such repetition.
 *
 * NOTE ON PHOTOGRAPHS: CLAUDE.md rule 1 forbade photographs of people. The
 * client reversed that decision and asked for the portraits from the current
 * site, so each entry carries one. Rule 1 still holds for everything else:
 * no stock imagery of books, gavels, scales, courthouses or handshakes.
 * The portraits live in `public/lawyers/`, named by slug, cropped from the
 * firm's originals.
 */

export interface Lawyer {
  /** URL segment. Identical in both locales; a person's name is not translated. */
  readonly slug: string;
  readonly name: string;
  readonly role: Localized;
  /** The lawyer's direct address, exactly as published by the firm. */
  readonly email: string;
  /** Portrait in `public/`, 422x459. */
  readonly photo: string;
  /** The firm's own "Áreas de Práctica" line, verbatim. Free prose, not the frozen twenty. */
  readonly practiceAreasText: Localized;
  readonly bio: Localized;
  readonly languages: Localized;
}

/** Intrinsic size of every portrait in `public/lawyers/`. */
export const LAWYER_PHOTO_WIDTH = 422;
export const LAWYER_PHOTO_HEIGHT = 459;

export const lawyers = [
  {
    slug: "carlos-gerke-mendieta",
    name: "Carlos Gerke Mendieta",
    role: { es: "Socio Fundador", en: "Founding Partner" },
    email: "cgerkem@lawfirm-gerke.com",
    photo: "/lawyers/carlos-gerke-mendieta.jpg",
    practiceAreasText: {
      es: "Derecho civil, derecho comercial, derecho administrativo, sucesiones, derecho de familia, inversiones, negocios internacionales, derecho minero, contratos, asesoría legal en sectores regulados de electricidad, gas y petróleo, telecomunicaciones, bancos y otras entidades financieras, mercados de valores, y transporte, fusiones y adquisiciones, arbitraje comercial internacional, estructuración y financiamiento de proyectos, asesoramiento legal relativo al gobierno de empresas familiares y abiertas, derecho tributario, asesoría fiscal y tributación, litigación civil, comercial, administrativa, tributaria, familiar, laboral y constitucional, conciliación y arbitraje.",
      en: "Civil law, commercial law, administrative law, inheritance law, family law, investments, international business, mining law, contract law, legal advisory in regulated sectors of electricity, gas and oil, telecommunications, banks and other financial entities, security markets, and transportation, mergers and acquisitions, international commercial arbitration, project structuring and financing, legal advice regarding family and public company governance, tax law, fiscal and taxation advisory; civil, commercial, administrative, tax, family, labor, and constitutional litigation, conciliation and arbitration.",
    },
    bio: {
      es: 'Carlos Gerke Mendieta, inició su práctica jurídica tras obtener su título de Licenciado en Derecho y Ciencias Políticas de la Universidad Mayor de San Andrés en 1967. A lo largo de su carrera como abogado ha asesorado a clientes locales e internacionales en una amplia variedad de asuntos en materia civil, comercial, banca, recursos naturales, minería e inversiones en los mayores proyectos de infraestructura ejecutados en Bolivia. El Dr. Gerke ha formado parte, entre muchos otros, de directorios de los principales bancos en Bolivia, empresas mineras, empresas industriales líderes en sus segmentos, la Universidad Católica Boliviana "San Pablo", la Comisión Andina de Juristas y entidades sin fines de lucro, incluyendo un periódico nacional y el Colegio de Abogados de La Paz. La brillante carrera del Dr. Gerke en el mundo del derecho como abogado, consejero, director, asesor en materia legislativa, como catedrático y escritor lo ubica entre los grandes juristas de su época tanto en Bolivia como en la región. Ha recibido varios premios, reconocimientos y honores a lo largo de su vida, entre los cuales destacan el título de Comendador de la Orden de San Gregorio Magno otorgado por el Papa Juan Pablo II, el de Doctor Honoris Causa de la Universidad Católica Boliviana "San Pablo", y el Premio "Hernando Siles" otorgado por la Universidad Mayor de San Andrés.',
      en: 'Carlos Gerke Mendieta began his legal practice after obtaining his degree in Law and Political Sciences from the "Universidad Mayor de San Andrés" in 1967. Throughout his career as a lawyer, he has advised local and international clients on a wide variety of matters in civil, commercial, banking, natural resources, mining, and investments in the largest infrastructure projects executed in Bolivia. Dr. Gerke has served on the boards of major banks in Bolivia, leading industrial companies, the Bolivian Catholic University "San Pablo", the Andean Commission of Jurists, and various non-profit organizations, including a national newspaper and the La Paz Bar Association. Dr. Gerke\'s illustrious career in law as a lawyer, counselor, director, legislative advisor, professor, and writer places him among the great jurists of his time both in Bolivia and the region. He has received several awards, recognitions, and honors throughout his life, including the title of Commander of the Order of St. Gregory the Great, awarded by Pope John Paul II, a doctor honoris causa from the Bolivian Catholic University "San Pablo", and the "Hernando Siles" Award granted by the Universidad Mayor de San Andrés.',
    },
    languages: { es: "Español", en: "Spanish" },
  },
  {
    slug: "marcela-gerke-siles",
    name: "Marcela Gerke Siles",
    role: { es: "Socia Fundadora", en: "Founding Partner" },
    email: "mgerke@lawfirm-gerke.com",
    photo: "/lawyers/marcela-gerke-siles.jpg",
    practiceAreasText: {
      es: "Derecho civil, derecho comercial, derecho administrativo, sucesiones, inversiones, negocios internacionales, asesoría legal en sectores regulados de bancos, otras entidades financieras y mercados de valores, derecho de familia, derecho laboral y de seguridad social, contratos y derecho registral, derecho minero, asesoramiento relativo al gobierno de empresas familiares y abiertas, litigación civil, comercial, administrativa, tributaria, familiar, laboral y propiedad intelectual.",
      en: "Civil law, commercial law, administrative law, inheritance law, investments, international business; legal advisory in regulated sectors of banks, other financial entities, and securities markets, family law, labor and social security law, contract law and registry law, mining law; advisory regarding governance of family and public companies, civil, commercial, administrative, tax, family, labor, and intellectual property litigation.",
    },
    bio: {
      es: 'Marcela Gerke Siles es socia del Estudio Gerke desde el año 2004. Tiene una amplia y exitosa trayectoria como abogada relacionada con el asesoramiento en derecho civil, comercial, derecho de familia, derecho laboral y de seguridad social, derecho administrativo, contratos e inversiones y litigación civil, comercial, administrativa, tributaria, familiar y laboral, y propiedad intelectual. Marcela Gerke Siles obtuvo una maestría en Derecho Comparado LL.M. en la escuela de leyes de Tulane University en New Orleans, Estados Unidos, el año 1998. Además, obtuvo una maestría en Derecho Privado del Instituto de Estudios Superiores CEU, Madrid, España en el año 2002. Se encuentra inscrita en el Ilustre Colegio de Abogados de La Paz desde el año 1997 y en el Registro Público de Abogados del Ministerio de Justicia de Bolivia desde el año 2013. Se graduó como abogada de la Universidad Católica Boliviana "San Pablo" el año 1997. Ha desempeñado cargos directivos en entidades financieras y fue docente de Derecho de Pensiones en la Universidad Católica Boliviana "San Pablo".',
      en: 'Marcela Gerke Siles has been a partner at Gerke Law Firm since 2004. She has a broad and successful career as a lawyer, specializing in advising on civil law, commercial law, family law, labor and social security law, administrative law, contracts and investments, and civil, commercial, administrative, tax, family, labor litigation, and intellectual property law. Marcela Gerke Siles obtained an LL.M. in Comparative Law from Tulane University Law School in New Orleans, USA, in 1998. Additionally, she earned a Master\'s degree in Private Law from the "Instituto de Estudios Superiores CEU", Madrid, Spain, in 2002. She has been registered with the Illustrious Bar Association of La Paz since 1997 and with the Public Registry of Lawyers of the Ministry of Justice of Bolivia since 2013. She graduated as a lawyer from the Bolivian Catholic University "San Pablo" in 1997. She has held managerial positions in financial institutions and was a professor of Pension Law at the Bolivian Catholic University "San Pablo".',
    },
    languages: { es: "Español e Inglés", en: "Spanish and English" },
  },
  {
    slug: "carlos-gerke-siles",
    name: "Carlos Gerke Siles",
    role: { es: "Socio Fundador", en: "Founding Partner" },
    email: "cgerkes@lawfirm-gerke.com",
    photo: "/lawyers/carlos-gerke-siles.jpg",
    practiceAreasText: {
      es: "Derecho civil, derecho comercial, derecho administrativo, derecho constitucional, inversiones, negocios internacionales, derecho minero, asesoría legal en los sectores regulados de electricidad, gas y petróleo, telecomunicaciones, bancos y otras entidades financieras, fusiones y adquisiciones, arbitraje comercial internacional, estructuración y financiamiento de proyectos, asesoramiento legal relativo al gobierno de empresas familiares y abiertas, litigación civil, comercial, administrativa, tributaria y constitucional.",
      en: "Civil law, commercial law, administrative law, constitutional law, investments, international business, mining law, legal advisory in the regulated sectors of electricity, gas and oil; telecommunications, banks and other financial entities; mergers and acquisitions; international commercial arbitration; project structuring and financing; legal advisory on the governance of family and public companies, civil, commercial, administrative, tax, and constitutional litigation.",
    },
    bio: {
      es: 'Carlos Gerke Siles es socio del Estudio Gerke desde el año 2004. Tiene una destacada trayectoria como abogado y asesor legal en derecho civil, derecho comercial y derecho administrativo, negocios internacionales, fusiones y adquisiciones con una amplia experiencia en los sectores regulados de electricidad, gas y petróleo, telecomunicaciones y bancos. Adicionalmente, brinda su asesoramiento jurídico en asuntos relativos a la estructuración y funcionamiento de sistemas de gobierno corporativo. Carlos Gerke Siles obtuvo una maestría en Derecho Comparado LL.M. en la escuela de leyes de Tulane University en New Orleans, Estados Unidos, el año 1999. Además cursó un posgrado en Derecho Internacional y Comparado impartido por Cornell Law School-Université Paris 1 Pantheón-Sorbone en París, Francia en 1998. Se encuentra inscrito en el Ilustre Colegio de Abogados de La Paz desde el año 1998 y en el Registro Público de Abogados del Ministerio de Justicia de Bolivia desde el año 2015. Se graduó como abogado de la Universidad Católica Boliviana el año 1998 con máximos honores. Es docente en la Universidad Católica Boliviana "San Pablo" desde el año 2000, actualmente imparte la cátedra de Constitución y Derecho Constitucional. Fue también docente de Derecho Comercial, Gobierno Corporativo y Mercado de Valores. Es miembro del Concejo y del Directorio de la Fundación IES y de la Junta Directiva de la Universidad Católica Boliviana "San Pablo". Ha desempeñado cargos directivos en entidades financieras y empresas industriales y de servicios.',
      en: 'Carlos Gerke Siles has been a partner at the Gerke Law Firm since 2004. He has a distinguished career as a lawyer and as legal advisor in civil law, commercial law, administrative law, international business, and mergers and acquisitions, with extensive experience in the regulated sectors of electricity, gas and oil, telecommunications, and banks. Additionally, he provides legal advice on matters related to the structuring and functioning of corporate governance systems. Carlos Gerke Siles obtained an LL.M. in Comparative Law from Tulane University Law School in New Orleans, USA, in 1999. He also completed a postgraduate course in International and Comparative Law offered by Cornell Law School-Université Paris 1 Panthéon-Sorbonne in Paris, France, in 1998. Carlos Gerke has been registered with the Illustrious Bar Association of La Paz since 1998 and with the Public Registry of Lawyers of the Ministry of Justice of Bolivia since 2015. He graduated as a lawyer from the Bolivian Catholic University "San Pablo" in 1998 with the highest honors. Carlos Gerke has been a professor at the Bolivian Catholic University "San Pablo" since 2000. There he currently teaches Constitutional Law. He has also taught Commercial Law, Corporate Governance, and Securities Market Law. Carlos Gerke is a member of the Council and Board of Directors of the "IES Foundation" and the Board of Directors of the Bolivian Catholic University "San Pablo". He has held managerial positions in financial institutions, industrial and service companies.',
    },
    languages: { es: "Español e Inglés", en: "English and Spanish" },
  },
  {
    slug: "david-terrazas-ruiz",
    name: "David Terrazas Ruiz",
    role: { es: "Socio", en: "Partner" },
    email: "dterrazas@lawfirm-gerke.com",
    photo: "/lawyers/david-terrazas-ruiz.jpg",
    practiceAreasText: {
      es: "Derecho civil, derecho de familia, sucesiones, derecho laboral y de seguridad social, contratos y derecho registral, conciliación y arbitraje, litigación civil, comercial, administrativa, tributaria, familiar, laboral y constitucional.",
      en: "Civil law, family law, inheritance law, labor and social security law, contract law and registry law, conciliation and arbitration, civil, commercial, administrative, tax, family law, labor & employment and constitutional litigation.",
    },
    bio: {
      es: 'David Terrazas Ruiz comenzó a trabajar en el Estudio Gerke el año 2001 y se hizo socio en el año 2011. Su práctica está principalmente vinculada a la litigación en materia civil, comercial, tributaria, familiar, laboral y constitucional. Adicionalmente, mantiene una sólida práctica en derecho civil, sucesiones, contratos y derecho registral. Terrazas obtuvo una maestría en Derecho Procesal Civil en la Universidad Andina Simón Bolívar de Sucre, Bolivia en el año 2006. Está Inscrito en el Ilustre Colegio de Abogados de La Paz el año 2002 y en el Registro Público de Abogados del Ministerio de Justicia de Bolivia el año 2010, así como en el Tribunal Supremo de Justicia. Previo a su ingreso al Estudio Jurídico Gerke, Terrazas hizo una pasantía en la Federación de Entidades Empresariales Privadas de Cochabamba y obtuvo la licenciatura en Derecho en la Universidad Católica Boliviana "San Pablo" el año 2001.',
      en: 'David Terrazas Ruiz began working at the Gerke Law Firm in 2001 and became a partner in 2011. His practice is primarily focused on litigation in civil, commercial, tax, family, labor, and constitutional matters. Additionally, he maintains a solid practice in civil law, inheritance law, contracts, and registry law. David Terrazas obtained a Master\'s degree in Civil Procedural Law from the Universidad Andina Simón Bolívar in Sucre, Bolivia, in 2006. He has been registered with the Illustrious Bar Association of La Paz since 2002 and with the Public Registry of Lawyers of the Ministry of Justice of Bolivia since 2010, as well as with the Supreme Court of Justice. Before joining the Gerke Law Firm, Terrazas interned at the Federation of Private Business Entities of Cochabamba and obtained his law degree from the Bolivian Catholic University "San Pablo" in 2001.',
    },
    languages: {
      es: "Español, Portugués e inglés básico",
      en: "Spanish, Portuguese, and basic English",
    },
  },
  {
    // The English page heads this profile "Jorge Andrés Ostertag Antezana".
    // The Spanish page and both biographies use the shorter form kept here.
    slug: "andres-ostertag-antezana",
    name: "Andrés Ostertag Antezana",
    role: { es: "Asociado", en: "Associate Attorney" },
    email: "ostertag@lawfirm-gerke.com",
    photo: "/lawyers/andres-ostertag-antezana.jpg",
    practiceAreasText: {
      es: "Derecho tributario, asesoría fiscal y tributación, derecho comercial, asesoría legal para promociones empresariales en el sector regulado por la Autoridad de Juegos, estructuración de proyectos, asesoramiento relativo al gobierno de empresas familiares y abiertas, litigación administrativa y tributaria.",
      en: "Tax law, fiscal and tax advisory, commercial law, legal advisory for business promotions in the sector regulated by the Gaming Authority; project structuring; advisory on the governance of family and public companies; administrative and tax litigation.",
    },
    bio: {
      es: "Andrés Ostertag Antezana está a cargo del departamento de asesoría legal tributaria en el Estudio Gerke desde principios del año 2018. Su práctica está principalmente relacionada con el asesoramiento jurídico estratégico y planificación en temas tributarios y aquellos sujetos a la regulación de la Autoridad del Juego (AJ) en Bolivia. Adicionalmente, tiene vasta experiencia en litigación administrativa y tributaria y apoya al equipo de abogados del Estudio Gerke en la estructuración de proyectos, y la planificación y organización de sistemas de gobierno de empresas familiares. Ostertag obtuvo una maestría en asesoría fiscal y tributación en la Fundación CTO de Madrid, España en el año 2014, y complementó su formación con un curso de Post grado en Successful Negotiation: Essential Strategies and Skills en la University of Michigan en el año 2017. Fue estudiante de Derecho en University of Oklahoma, en Estados Unidos en el 2010, como parte del programa de intercambio de la Universidad Privada Boliviana; esta última en la que obtuvo su licenciatura en Derecho el año 2012. Inscrito en el Registro Público de Abogados del Ministerio de Justicia de Bolivia el año 2012. Previo a su ingreso al Estudio Jurídico Gerke, Ostertag realizó prácticas como asistente legal desde el 2010 en el Estudio Jurídico Benítez Rivas, Pérez y Asociados, para luego desempeñarse como abogado en el mismo Estudio, cargo que ocupó hasta el año 2017.",
      en: 'Andrés Ostertag Antezana has been in charge of the tax legal advisory department at the Gerke Law Firm since early 2018. His practice is primarily related to strategic legal advisory and planning on tax matters and those subject to regulation by the Gaming Authority (AJ) in Bolivia. Additionally, he has extensive experience in administrative and tax litigation and supports the Gerke Law Firm team in project structuring, and the planning and organization of governance systems for family companies. Andrés Ostertag obtained a Master\'s degree in Fiscal and Tax Advisory from the "Fundación CTO" in Madrid, Spain, in 2014, and complemented his education with a postgraduate course in "Successful Negotiation: Essential Strategies and Skills" at the University of Michigan in 2017. He studied law at the University of Oklahoma, USA, in 2010, as part of an exchange program with the Bolivian Private University, where he obtained his law degree in 2012. He has been registered with the Public Registry of Lawyers at the Ministry of Justice of Bolivia since 2012. Before joining Gerke Law Firm, Ostertag interned as a legal assistant at Benítez Rivas, Pérez y Asociados Law Firm starting in 2010, and later worked as a lawyer at the same firm until 2017.',
    },
    languages: {
      es: "Español, Inglés, Italiano básico.",
      en: "Spanish, English, basic Italian.",
    },
  },
  {
    slug: "claudia-sanchez-hurtado",
    name: "Claudia Sánchez Hurtado",
    role: { es: "Abogada", en: "Associate" },
    email: "csanchez@lawfirm-gerke.com",
    photo: "/lawyers/claudia-sanchez-hurtado.jpg",
    practiceAreasText: {
      es: "Propiedad intelectual, derecho civil, derecho de familia, derecho laboral, derechos humanos, derecho comercial, sucesiones, arbitraje, asesoría legal empresarial, contratos, derecho registral, litigación civil, comercial, administrativa, familiar, laboral y de propiedad intelectual.",
      en: "Intellectual property law, civil law, family law, labor law, human rights, commercial law, inheritance law, arbitration, corporate legal advisory, contracts, registry law, civil, commercial, administrative, family, labor, and intellectual property litigation.",
    },
    bio: {
      es: 'Claudia Mariana Sánchez Hurtado inició su práctica jurídica en el Estudio Gerke el año 2015. Actualmente está a cargo del departamento de propiedad intelectual en el Estudio Gerke desde el año 2023. Su práctica está principalmente relacionada con propiedad intelectual, derecho civil, derecho de familia, derecho laboral, derechos humanos, derecho comercial, sucesiones, arbitraje, asesoría legal empresarial, contratos y derecho registral. Adicionalmente, litigación civil, comercial, administrativa, familiar y laboral. Sánchez obtuvo una maestría en asesoramiento jurídico a empresas en la Universidad Carlos III de Madrid, España en el año 2014. Además, obtuvo una maestría en Derechos Humanos en la Universidad Autónoma de Madrid, España en el año 2021. Complementó su formación con un diplomado en Arbitraje, Conciliación, Negociación y Mediación en la Universidad Real de la Cámara Nacional de Comercio en el año 2013 y realizó un curso en Inglés Jurídico en Economist & Jurist en el año 2021. Está inscrita en el Registro Público de Abogados del Ministerio de Justicia de Bolivia desde el año 2014. Se graduó como abogada de la Universidad Católica Boliviana "San Pablo" el año 2011. Previo a su ingreso al Estudio Jurídico Gerke, Sánchez trabajó como asistente legal en derecho laboral en una firma de abogados y como abogada independiente.',
      en: 'Claudia Mariana Sánchez Hurtado began her legal practice at the Gerke Law Firm in 2015, where she has been in charge of the intellectual property department since 2023. Her practice primarily focuses on intellectual property, civil law, family law, labor law, human rights, commercial law, inheritance law, arbitration, corporate legal advisory, contracts, and registry law. Additionally, she handles civil, commercial, administrative, family, and labor litigation. Sánchez obtained a Master\'s degree in Legal Advisory for Businesses from Universidad Carlos III de Madrid, Spain, in 2014. She also earned a Master\'s degree in Human Rights from Universidad Autónoma de Madrid, Spain, in 2021. She complemented her education with a diploma in Arbitration, Conciliation, Negotiation, and Mediation from the "Universidad Real de la Cámara Nacional de Comercio" in 2013 and completed a course in Legal English at Economist & Jurist in 2021. Ms. Sánchez has been registered with the Public Registry of Lawyers of the Ministry of Justice of Bolivia since 2014. She graduated as a lawyer from the Bolivian Catholic University "San Pablo" in 2011. Before joining the Gerke Law Firm, Sánchez worked as a legal assistant in labor law at a law firm and as an independent lawyer.',
    },
    languages: { es: "Español, inglés y alemán.", en: "Spanish, English, German" },
  },
  {
    slug: "fabian-arce-bellido",
    name: "Fabián Andrés Arce Bellido",
    role: { es: "Abogado", en: "Attorney" },
    email: "farce@lawfirm-gerke.com",
    photo: "/lawyers/fabian-arce-bellido.jpg",
    practiceAreasText: {
      es: "Derecho civil, obligaciones, contratos, sucesiones, litigación civil, comercial, conciliación y arbitraje y constitucional.",
      en: "Civil law, obligations, contracts, inheritance law, civil litigation, commercial litigation, conciliation and arbitration, and constitutional law.",
    },
    bio: {
      es: "Fabián Arce Bellido inició su práctica jurídica en el Estudio Gerke el año 2019. Su práctica está principalmente relacionada con el asesoramiento permanente en procesos judiciales, derecho civil, derecho de familia, derecho laboral y de seguridad social y derecho constitucional. Adicionalmente, tiene una sólida práctica en obligaciones y apoya al equipo de abogados del Estudio Gerke en diversos casos en materia de contratos, derecho registral y litigación. Arce obtuvo una maestría en Derecho Tributario y Derecho Procesal Tributario en la Universidad Andina Simón Bolívar de La Paz - Bolivia en el año 2018, y en 2019 realizó distintos cursos de prácticas jurídicas para optimizar la litigación oral. Obtuvo su título de abogado de la Universidad Católica Boliviana San Pablo en el año 2016, y está inscrito en el Registro Público de Abogados del Ministerio de Justicia de Bolivia desde el año 2017. Previo a su ingreso al Estudio Jurídico Gerke, Arce realizó prácticas como asistente legal desde el 2016 en una firma de abogados, para luego desempeñarse como abogado en el mismo Estudio, hasta el año 2019.",
      en: 'Fabián Arce Bellido began his legal practice at the Gerke Law Firm in 2019. His practice is primarily related to ongoing advisory in judicial processes, civil law, family law, labor and social security law, and constitutional law. Additionally, he has a solid practice in obligations and he supports the Gerke Law Firm team in various cases related to contracts, registry law, and litigation. Arce obtained a Master\'s degree in Tax Law and Tax Procedural Law from the Universidad Andina Simón Bolívar in La Paz, Bolivia, in 2018. In 2019, he took various courses in legal practice to optimize oral litigation. He earned his law degree from the Bolivian Catholic University "San Pablo" in 2016 and has been registered with the Public Registry of Lawyers of the Ministry of Justice of Bolivia since 2017.',
    },
    languages: { es: "Español e Inglés", en: "Spanish and English" },
  },
  {
    slug: "diana-rodriguez-aguero",
    name: "Diana María Rodríguez Agüero",
    role: { es: "Abogada", en: "Attorney" },
    email: "drodriguez@lawfirm-gerke.com",
    photo: "/lawyers/diana-rodriguez-aguero.jpg",
    practiceAreasText: {
      es: "Derecho civil, comercial, familiar y propiedad intelectual.",
      en: "Civil law, commercial law, family law, and intellectual property law.",
    },
    bio: {
      es: 'Diana María Rodríguez Agüero inició su práctica jurídica en el Estudio Gerke el año 2020, apoyando al equipo de abogados en diversos casos en materia de derecho civil, familiar, comercial, contratos y propiedad intelectual. Rodríguez obtuvo la licenciatura en Derecho de la Universidad Católica Boliviana "San Pablo" el año 2019 y está inscrita en el Registro Público de Abogados del Ministerio de Justicia de Bolivia desde el año 2020. Previo a su ingreso al Estudio Jurídico Gerke, Rodríguez realizó prácticas en el área de derecho comercial en el Banco FIE, en derecho penal en una firma de abogados y en derecho administrativo y civil en el Banco de Crédito de Bolivia.',
      en: 'Diana María Rodríguez Agüero began her legal practice at the Gerke Law Firm in 2020, supporting the team in various cases related to civil law, family law, commercial law, contracts, and intellectual property law. Rodríguez obtained her law degree from the Bolivian Catholic University "San Pablo" in 2019 and has been registered with the Public Registry of Lawyers of the Ministry of Justice of Bolivia since 2020. Before joining the Gerke Law Firm, Rodríguez interned in the commercial law department at "Banco FIE", in criminal law at a private law firm, and in administrative and civil law at "Banco de Crédito de Bolivia".',
    },
    languages: { es: "Español e Inglés", en: "English and Spanish" },
  },
  {
    slug: "christian-branisa-caballero",
    name: "Christian Eduardo Branisa Caballero",
    role: { es: "Abogado", en: "Associate" },
    email: "cbranisa@lawfirm-gerke.com",
    photo: "/lawyers/christian-branisa-caballero.jpg",
    practiceAreasText: {
      es: "Derecho Internacional, Conciliación y Arbitraje, Arbitraje Comercial Internacional, Arbitraje Internacional de Inversiones, Propiedad Intelectual, Derecho Comercial, Derecho Civil.",
      en: "International law, conciliation and arbitration, international commercial arbitration, international investment arbitration, intellectual property, commercial law, civil law.",
    },
    bio: {
      es: 'Christian Branisa Caballero se asoció al Estudio Gerke desde el año 2022. Su práctica está principalmente relacionada con el asesoramiento jurídico estratégico y planificación en Derecho Internacional, Arbitraje, Inversiones, Derecho Comercial y Derecho Civil. Branisa obtuvo una maestría en Derecho Comparado Magister iuris (M.iur.) de la Jurisdicción de la Unión Europea, el Mercosur y la Comunidad Andina de Naciones en la Georg August Universität Göttingen, Baja Sajonia - Alemania en el año 2007. El año 2015 participó en el VII Programa de Prácticas Profesionales en el Servicio Jurídico de la sede de la Secretaría General de la Comunidad Andina en la ciudad de Lima, Perú. En el 2021 asistió a los cursos de verano de la Academia de Derecho Internacional de La Haya, Países Bajos. Branisa obtuvo su licenciatura en Derecho en la Universidad Católica Boliviana "San Pablo" el año 2004, y está inscrito en el Registro Público de Abogados del Ministerio de Justicia de Bolivia desde el año 2009. Previo a asociarse al Estudio Jurídico Gerke, además de ejercer como abogado independiente, trabajó en la Procuraduría General del Estado; entre 2019 y 2020 como Jefe de Unidad, y entre 2017 y 2019 como Especialista, dependiente de la Dirección General de Defensa de la Subprocuraduría de Defensa y Representación Legal del Estado en la ciudad de El Alto.',
      en: 'Christian Branisa Caballero joined the Gerke Law Firm in 2022. His practice primarily focuses on strategic legal advisory and planning in international law, arbitration, investments, commercial law, and civil law. Branisa obtained a Master of Comparative Law, Magister Iuris (M.iur.), on the Jurisdiction of the European Union, Mercosur, and the Andean Community of Nations at the Georg August University Göttingen, Lower Saxony, Germany, in the year 2007. In 2015, he participated in the VII Professional Internship Program at the Legal Service of the Secretariat General of the Andean Community in Lima, Peru. In 2021, he attended summer courses at The Hague Academy of International Law, the Netherlands. Mr. Branisa earned his law degree from the Bolivian Catholic University "San Pablo" in 2004 and has been registered with the Public Registry of Lawyers of the Ministry of Justice of Bolivia since 2009. Before joining the Gerke Law Firm, in addition to practicing as an independent lawyer, Branisa worked at the State Attorney General\'s Office; from 2019 to 2020 as a Unit Chief, and from 2017 to 2019 as a Specialist, under the General Directorate of Defense of the Sub-Attorney General\'s Office of Defense and Legal Representation of the State in El Alto.',
    },
    languages: {
      es: "Español, inglés, alemán e italiano básico",
      en: "Spanish, English, German, and basic Italian",
    },
  },
] as const satisfies readonly Lawyer[];

export type LawyerSlug = (typeof lawyers)[number]["slug"];

export function getLawyerBySlug(slug: string) {
  return lawyers.find((lawyer) => lawyer.slug === slug);
}

/** Shared section labels used on every /lawyers/[slug] page. */
export const lawyerProfileLabels = {
  practiceAreasHeading: { es: "Áreas de Práctica", en: "Practice Areas" },
  biographyHeading: { es: "Biografía", en: "Biography" },
  languagesHeading: { es: "Idiomas", en: "Languages" },
  emailHeading: { es: "Correo electrónico", en: "Email" },
} as const satisfies Record<string, Localized>;
