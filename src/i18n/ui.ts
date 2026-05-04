export const languages = {
  en: 'English',
  es: 'Español',
} as const;

export const defaultLang = 'en';
export type Lang = keyof typeof languages;

export const ui = {
  en: {
    // ─── Site / hero
    'site.role': 'Senior Full-Stack Developer for Complex Business Systems',
    'site.description':
      'I design robust backend architectures and full-stack solutions for ERP, accounting, inventory, sales and financial operation workflows.',
    'site.availability': 'Selectively taking on engagements for 2026',
    'site.location': 'Remote · EU timezone',

    'hero.eyebrow': 'Available · Selectively taking on engagements for 2026',
    'hero.cta.primary': 'View case studies',
    'hero.cta.secondary': 'Start a conversation',

    'hero.meta.focus.label': 'Focus',
    'hero.meta.focus.value': 'ERP · Accounting · Operations',
    'hero.meta.stack.label': 'Stack',
    'hero.meta.stack.value': 'TypeScript · Node · Postgres',
    'hero.meta.approach.label': 'Approach',
    'hero.meta.approach.value': 'DDD · Hex · TDD',
    'hero.meta.location.label': 'Based in',

    // ─── Navigation
    'nav.work': 'Work',
    'nav.writing': 'Writing',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.home': 'Home',

    // ─── Footer
    'footer.contact': 'Contact',
    'footer.elsewhere': 'Elsewhere',
    'footer.crafted': 'Crafted with care · Built on Astro',
    'footer.rights': '© {year} {name}',

    // ─── Specialization
    'spec.eyebrow': 'What I do',
    'spec.title':
      'Backend foundations for systems where correctness is non-negotiable.',
    'spec.p1.title': 'Domain modelling',
    'spec.p1.body':
      'I translate complex accounting, inventory and operational rules into expressive domain models — invariants enforced at compile and runtime, ubiquitous language shared with the business.',
    'spec.p2.title': 'Architectural rigor',
    'spec.p2.body':
      'Hexagonal and clean boundaries that keep the domain pure, integrations swappable, and the test pyramid healthy. Decisions documented; trade-offs explicit.',
    'spec.p3.title': 'Operational reality',
    'spec.p3.body':
      'Systems that survive month-end close, quarterly audits and tax deadlines: idempotent processes, traceable events, predictable performance under real load.',

    // ─── Featured case studies
    'cs.eyebrow': 'Selected work',
    'cs.title': 'Case studies',
    'cs.viewAll': 'All work →',
    'cs.read': 'Read case study →',
    'cs.allTitle': 'Case Studies',
    'cs.allEyebrow': 'Selected Work',
    'cs.allLede':
      'A curated set of engagements across ERP, accounting and operations. Names anonymised; outcomes verifiable on request.',
    'cs.filter.all': 'All',
    'cs.back': 'All case studies',
    'cs.stack': 'Stack',
    'cs.boundedContexts': 'Bounded contexts',

    // ─── Approach
    'approach.eyebrow': 'Approach',
    'approach.title':
      'A disciplined approach to building software that an organisation can rely on for years.',
    'approach.p1.title': 'Domain at the core',
    'approach.p1.body':
      'Pure domain logic — no frameworks, no infrastructure. The accounting rules, the inventory invariants, the order workflow live untouched by transport or persistence concerns.',
    'approach.p2.title': 'Ports & adapters',
    'approach.p2.body':
      'Inbound use cases drive the domain through explicit ports; outbound integrations (DB, queues, third parties) implement adapters. Swappable, testable, observable.',
    'approach.p3.title': 'Tests as design pressure',
    'approach.p3.body':
      'TDD as a feedback tool: red, green, refactor. Unit tests for the domain, integration tests at the boundaries, contract tests for external systems — pyramid stays in shape.',
    'approach.p4.title': 'Documented decisions',
    'approach.p4.body':
      'ADRs for trade-offs, ubiquitous language for shared meaning, runbooks for the things that page someone at 3am. The system explains itself.',
    'approach.diagram.caption': 'Hexagonal Architecture · Information Flow',

    // ─── Latest writing / writing index
    'writing.latest.eyebrow': 'Writing',
    'writing.latest.title': 'Notes on architecture & domain.',
    'writing.viewAll': 'All articles →',
    'writing.read': 'Read article →',
    'writing.indexTitle': 'Writing',
    'writing.indexEyebrow': 'Notes',
    'writing.indexLede':
      'Long-form notes on architecture, domain modelling and the practice of building software for organisations that depend on it.',
    'writing.minRead': 'min read',
    'writing.back': 'All writing',

    // ─── Contact CTA
    'ctaSection.eyebrow': 'Currently',
    'ctaSection.titleA': 'Designing the next generation of business systems takes',
    'ctaSection.titleB': 'careful hands.',
    'ctaSection.body':
      "If you're rebuilding a critical part of your operation — accounting, ERP, financial workflows — and need a senior pair of hands on the architecture, I'd like to hear about it.",
    'ctaSection.email': 'Write me an email',
    'ctaSection.form': 'Contact form',

    // ─── Contact page
    'contact.title': 'Contact',
    'contact.eyebrow': 'Get in touch',
    'contact.lede':
      'The fastest path is email — I read every message myself, and aim to reply within two business days.',
    'contact.direct': 'Direct',
    'contact.directBody':
      'Best for engagement enquiries, advisory work or technical conversations. Include enough context so I can be useful in the first reply.',
    'contact.availability': 'Availability',
    'contact.workingWithMe': 'Working with me',
    'contact.workingItem1': 'Most engagements run 3–9 months, full or part-time.',
    'contact.workingItem2': 'Remote-first; on-site for kick-off when it helps.',
    'contact.workingItem3': 'I work independently or embed within your existing team.',
    'contact.workingItem4': 'References available on request.',
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.org': 'Organisation',
    'contact.form.topic': 'Topic',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Send via email',
    'contact.form.topic.erp': 'ERP engagement',
    'contact.form.topic.accounting': 'Accounting / financial system',
    'contact.form.topic.architecture': 'Architecture review',
    'contact.form.topic.advisory': 'Advisory / mentoring',
    'contact.form.topic.other': 'Other',

    // ─── About page
    'about.title': 'About',
    'about.eyebrow': 'Profile',
    'about.h1': 'What I do',
    'about.p1':
      'I design and build the operational core of business software — the accounting engines, ERP modules, inventory systems and financial workflows that an organisation depends on every day. My focus is the backend: domain modelling, architecture, and the discipline that keeps systems editable years after they ship.',
    'about.h2': 'How I work',
    'about.p2':
      'I prefer engagements where I can pair closely with the people who actually run the business. The best architectural decisions I have made came out of conversations with finance teams, warehouse managers and operations leads — not from whiteboards in isolation. Code follows understanding; the reverse is rarely true.',
    'about.p2b':
      'On a project I tend to spend the first weeks listening, sketching the ubiquitous language, and identifying the bounded contexts that matter. Implementation starts only once those seams are clear. From there: small, deliberate steps; tests that drive design; ADRs for every non-obvious choice.',
    'about.h3': 'Background',
    'about.p3':
      "Ten plus years of full-stack development, the last six focused on complex business systems across manufacturing, retail and SaaS finance. I have led architectural rebuilds, mentored teams new to DDD and hexagonal architecture, and stayed on call for the systems I built — which I consider non-optional. If a 3am page is impossible to debug, the system isn't really finished.",
    'about.principles': 'Principles',
    'about.principle1.title': 'Domain first, frameworks last',
    'about.principle1.body':
      'I start every engagement by understanding the business — the rules, the language, the failure modes that matter. Frameworks come after, in service of the domain.',
    'about.principle2.title': 'Tests as design pressure',
    'about.principle2.body':
      "A test you can't write is a design you should reconsider. TDD is not a verification ritual; it is the most reliable feedback I have on architectural decisions.",
    'about.principle3.title': 'Boring tech, deliberate choices',
    'about.principle3.body':
      "Postgres, Node, well-understood patterns. New technology must justify itself against operational cost — and most of the time it doesn't.",
    'about.principle4.title': 'Document the why',
    'about.principle4.body':
      'ADRs, runbooks, ubiquitous language documents. Not because process matters; because the team in two years will thank the team today.',
    'about.stackHeading': 'Stack',

    // ─── Misc
    'lang.label': 'Language',
    'lang.toggle.aria': 'Switch language',
  },

  es: {
    // ─── Site / hero
    'site.role': 'Senior Full-Stack Developer para sistemas empresariales complejos',
    'site.description':
      'Diseño arquitecturas backend robustas y soluciones full-stack para ERP, contabilidad, inventario, ventas y operaciones financieras.',
    'site.availability': 'Aceptando proyectos seleccionados para 2026',
    'site.location': 'Remoto · zona horaria UE',

    'hero.eyebrow': 'Disponible · Aceptando proyectos seleccionados para 2026',
    'hero.cta.primary': 'Ver casos de estudio',
    'hero.cta.secondary': 'Iniciar una conversación',

    'hero.meta.focus.label': 'Enfoque',
    'hero.meta.focus.value': 'ERP · Contabilidad · Operaciones',
    'hero.meta.stack.label': 'Stack',
    'hero.meta.stack.value': 'TypeScript · Node · Postgres',
    'hero.meta.approach.label': 'Aproximación',
    'hero.meta.approach.value': 'DDD · Hex · TDD',
    'hero.meta.location.label': 'Ubicación',

    // ─── Navigation
    'nav.work': 'Trabajo',
    'nav.writing': 'Artículos',
    'nav.about': 'Sobre mí',
    'nav.contact': 'Contacto',
    'nav.home': 'Inicio',

    // ─── Footer
    'footer.contact': 'Contacto',
    'footer.elsewhere': 'En otros sitios',
    'footer.crafted': 'Hecho con cuidado · Construido con Astro',
    'footer.rights': '© {year} {name}',

    // ─── Specialization
    'spec.eyebrow': 'Qué hago',
    'spec.title':
      'Cimientos backend para sistemas en los que la corrección no es negociable.',
    'spec.p1.title': 'Modelado de dominio',
    'spec.p1.body':
      'Traduzco reglas complejas de contabilidad, inventario y operaciones a modelos de dominio expresivos — invariantes garantizadas en compilación y ejecución, lenguaje ubicuo compartido con negocio.',
    'spec.p2.title': 'Rigor arquitectónico',
    'spec.p2.body':
      'Fronteras hexagonales y limpias que mantienen el dominio puro, integraciones intercambiables y la pirámide de tests sana. Decisiones documentadas; trade-offs explícitos.',
    'spec.p3.title': 'Realidad operativa',
    'spec.p3.body':
      'Sistemas que sobreviven al cierre de mes, las auditorías trimestrales y los plazos fiscales: procesos idempotentes, eventos trazables, rendimiento predecible bajo carga real.',

    // ─── Featured case studies
    'cs.eyebrow': 'Trabajo seleccionado',
    'cs.title': 'Casos de estudio',
    'cs.viewAll': 'Todo el trabajo →',
    'cs.read': 'Leer caso →',
    'cs.allTitle': 'Casos de estudio',
    'cs.allEyebrow': 'Trabajo seleccionado',
    'cs.allLede':
      'Una selección curada de proyectos en ERP, contabilidad y operaciones. Nombres anonimizados; resultados verificables bajo petición.',
    'cs.filter.all': 'Todos',
    'cs.back': 'Todos los casos',
    'cs.stack': 'Stack',
    'cs.boundedContexts': 'Bounded contexts',

    // ─── Approach
    'approach.eyebrow': 'Aproximación',
    'approach.title':
      'Una aproximación disciplinada a construir software del que una organización pueda depender durante años.',
    'approach.p1.title': 'El dominio en el núcleo',
    'approach.p1.body':
      'Lógica de dominio pura — sin frameworks, sin infraestructura. Las reglas contables, las invariantes de inventario y los flujos de pedido viven intactos respecto a transporte o persistencia.',
    'approach.p2.title': 'Puertos y adaptadores',
    'approach.p2.body':
      'Los casos de uso entrantes mueven el dominio a través de puertos explícitos; las integraciones salientes (BD, colas, terceros) implementan adaptadores. Intercambiables, testeables, observables.',
    'approach.p3.title': 'Los tests como presión de diseño',
    'approach.p3.body':
      'TDD como herramienta de feedback: rojo, verde, refactor. Tests unitarios para el dominio, de integración en las fronteras, de contrato con sistemas externos — la pirámide se mantiene en forma.',
    'approach.p4.title': 'Decisiones documentadas',
    'approach.p4.body':
      'ADRs para los trade-offs, lenguaje ubicuo para significado compartido, runbooks para lo que despierta a alguien a las 3am. El sistema se explica solo.',
    'approach.diagram.caption': 'Arquitectura hexagonal · flujo de información',

    // ─── Latest writing / writing index
    'writing.latest.eyebrow': 'Artículos',
    'writing.latest.title': 'Notas sobre arquitectura y dominio.',
    'writing.viewAll': 'Todos los artículos →',
    'writing.read': 'Leer artículo →',
    'writing.indexTitle': 'Artículos',
    'writing.indexEyebrow': 'Notas',
    'writing.indexLede':
      'Notas extensas sobre arquitectura, modelado de dominio y la práctica de construir software para organizaciones que dependen de él.',
    'writing.minRead': 'min de lectura',
    'writing.back': 'Todos los artículos',

    // ─── Contact CTA
    'ctaSection.eyebrow': 'Actualmente',
    'ctaSection.titleA':
      'Diseñar la próxima generación de sistemas empresariales requiere',
    'ctaSection.titleB': 'manos cuidadosas.',
    'ctaSection.body':
      'Si estás reconstruyendo una parte crítica de tu operación — contabilidad, ERP, flujos financieros — y necesitas un par de manos senior en la arquitectura, me gustaría escucharlo.',
    'ctaSection.email': 'Escríbeme un email',
    'ctaSection.form': 'Formulario de contacto',

    // ─── Contact page
    'contact.title': 'Contacto',
    'contact.eyebrow': 'Hablemos',
    'contact.lede':
      'El camino más rápido es el correo — leo cada mensaje yo mismo y respondo en un máximo de dos días laborables.',
    'contact.direct': 'Directo',
    'contact.directBody':
      'Mejor para consultas de proyectos, asesoría o conversaciones técnicas. Incluye contexto suficiente para que pueda ser útil en la primera respuesta.',
    'contact.availability': 'Disponibilidad',
    'contact.workingWithMe': 'Trabajar conmigo',
    'contact.workingItem1':
      'La mayoría de proyectos duran de 3 a 9 meses, a tiempo completo o parcial.',
    'contact.workingItem2':
      'Remoto primero; presencial solo en el kick-off cuando ayuda.',
    'contact.workingItem3':
      'Trabajo de forma independiente o integrado en tu equipo existente.',
    'contact.workingItem4': 'Referencias disponibles bajo petición.',
    'contact.form.name': 'Nombre',
    'contact.form.email': 'Email',
    'contact.form.org': 'Organización',
    'contact.form.topic': 'Asunto',
    'contact.form.message': 'Mensaje',
    'contact.form.submit': 'Enviar por email',
    'contact.form.topic.erp': 'Proyecto ERP',
    'contact.form.topic.accounting': 'Sistema contable / financiero',
    'contact.form.topic.architecture': 'Revisión de arquitectura',
    'contact.form.topic.advisory': 'Asesoría / mentoría',
    'contact.form.topic.other': 'Otro',

    // ─── About page
    'about.title': 'Sobre mí',
    'about.eyebrow': 'Perfil',
    'about.h1': 'Qué hago',
    'about.p1':
      'Diseño y construyo el núcleo operativo del software empresarial — los motores contables, los módulos ERP, los sistemas de inventario y los flujos financieros de los que una organización depende cada día. Mi foco es el backend: modelado de dominio, arquitectura y la disciplina que mantiene los sistemas editables años después de su lanzamiento.',
    'about.h2': 'Cómo trabajo',
    'about.p2':
      'Prefiero proyectos donde puedo trabajar codo a codo con quienes operan el negocio. Las mejores decisiones de arquitectura que he tomado salieron de conversaciones con equipos de finanzas, jefes de almacén y responsables de operaciones — no de pizarras en aislamiento. El código sigue al entendimiento; rara vez al revés.',
    'about.p2b':
      'En un proyecto suelo dedicar las primeras semanas a escuchar, esbozar el lenguaje ubicuo e identificar los bounded contexts que importan. La implementación empieza solo cuando esas costuras están claras. Desde ahí: pasos pequeños y deliberados; tests que dirigen el diseño; ADRs para cada decisión no evidente.',
    'about.h3': 'Trayectoria',
    'about.p3':
      'Más de diez años de desarrollo full-stack, los últimos seis enfocados en sistemas empresariales complejos en manufactura, retail y SaaS financiero. He liderado reescrituras arquitectónicas, mentorizado equipos que arrancaban con DDD y arquitectura hexagonal, y mantenido guardia para los sistemas que construí — algo que considero no opcional. Si a las 3am es imposible depurar una alerta, el sistema no está realmente terminado.',
    'about.principles': 'Principios',
    'about.principle1.title': 'Dominio primero, frameworks después',
    'about.principle1.body':
      'Empiezo cada proyecto entendiendo el negocio — las reglas, el lenguaje, los modos de fallo que importan. Los frameworks vienen después, al servicio del dominio.',
    'about.principle2.title': 'Tests como presión de diseño',
    'about.principle2.body':
      'Un test que no puedes escribir es un diseño que deberías reconsiderar. TDD no es un ritual de verificación; es el feedback más fiable que tengo sobre decisiones arquitectónicas.',
    'about.principle3.title': 'Tecnología aburrida, elecciones deliberadas',
    'about.principle3.body':
      'Postgres, Node, patrones bien entendidos. La tecnología nueva debe justificarse frente al coste operativo — y la mayoría de las veces no lo hace.',
    'about.principle4.title': 'Documentar el porqué',
    'about.principle4.body':
      'ADRs, runbooks, documentos de lenguaje ubicuo. No porque el proceso importe; porque el equipo de dentro de dos años agradecerá al equipo de hoy.',
    'about.stackHeading': 'Stack',

    // ─── Misc
    'lang.label': 'Idioma',
    'lang.toggle.aria': 'Cambiar idioma',
  },
} as const;

export type UIKey = keyof (typeof ui)[typeof defaultLang];
