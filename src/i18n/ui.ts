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
      'I design domain-driven backends — Hexagonal, DDD, CQRS — for ERP, accounting, payroll and operational workflows. Same kernel discipline across Java/Spring and TypeScript/NestJS.',
    'site.availability': 'Selectively taking on engagements for 2026',
    'site.location': 'Havana, Cuba',

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
    'writing.empty.title': 'Notes are in progress.',
    'writing.empty.body':
      'Long-form writing on architecture and domain modelling is on the way. In the meantime, the case studies are the best read.',
    'writing.empty.cta': 'Read the case studies →',

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
      'I design and build the backend of business software — the engines that have to run correctly every day: ERP cores, payroll closures, accounting moves, inventory ledgers, scheduling and operational flows. My focus is the architecture: domain modelling, kernel design, and the discipline that keeps systems editable years after they ship.',
    'about.h2': 'How I work',
    'about.p2':
      'Every engagement starts with the language of the business. The bounded contexts emerge from how the operations team actually thinks about the work, not from a database schema. Once those seams are clear, I build a kernel — buses, ports, value objects, sagas, an outbox, an idempotence layer — so each new context costs less than the last.',
    'about.p2b':
      'Implementation moves in small, deliberate steps. New flows live in clean domain layers; legacy code keeps shipping until its replacement has proven itself in production. Anti-corruption layers bridge the two, and an ADR-style note explains every non-obvious choice.',
    'about.h3': 'Background',
    'about.p3':
      'Backend architecture in two parallel stacks: Java/Spring and TypeScript/NestJS. The same patterns — Hexagonal, DDD, CQRS — applied across both, so the framework is a delivery vehicle rather than a structural choice. Recent engagements include an ERP backend with a fifteen-context architecture and a hand-built kernel of CQRS / saga / outbox primitives, and a full-stack HR / payroll platform with a parallel kernel design in TypeScript.',
    'about.principles': 'Principles',
    'about.principle1.title': 'Build the kernel first',
    'about.principle1.body':
      'Every reusable pattern — buses, value objects, ports, saga, outbox, idempotence — lives in a hand-built foundation. Each new bounded context costs less because the foundation paid the upfront tax.',
    'about.principle2.title': 'Patterns over frameworks',
    'about.principle2.body':
      'The architecture travels. Hexagonal, DDD, CQRS work the same in Java/Spring as in TypeScript/NestJS. The framework is a delivery vehicle; the discipline belongs to the architect.',
    'about.principle3.title': 'Progressive coexistence over rewrites',
    'about.principle3.body':
      'Legacy code keeps shipping while new contexts prove themselves. Anti-corruption layers bridge the two. A god-service retires only when its replacement has earned its place under real production load.',
    'about.principle4.title': 'Documentation pairs with code',
    'about.principle4.body':
      'Every non-obvious decision has a markdown next to it. Bounded contexts, refactor narratives, runbooks. The system explains itself before anyone has to open the editor.',
    'about.stackHeading': 'Stack',

    // ─── Misc
    'lang.label': 'Language',
    'lang.toggle.aria': 'Switch language',
  },

  es: {
    // ─── Site / hero
    'site.role': 'Senior Full-Stack Developer para sistemas empresariales complejos',
    'site.description':
      'Diseño backends orientados al dominio — Hexagonal, DDD, CQRS — para ERP, contabilidad, nómina y flujos operativos. La misma disciplina de kernel propio en Java/Spring y TypeScript/NestJS.',
    'site.availability': 'Aceptando proyectos seleccionados para 2026',
    'site.location': 'La Habana, Cuba',

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
    'writing.empty.title': 'Notas en preparación.',
    'writing.empty.body':
      'Pronto habrá texto largo sobre arquitectura y modelado de dominio. Por ahora, los casos de estudio son la mejor lectura.',
    'writing.empty.cta': 'Ver los casos de estudio →',

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
      'Diseño y construyo el backend del software empresarial — los motores que tienen que ejecutarse correctamente cada día: núcleos de ERP, cierres de nómina, movimientos contables, libros de inventario, programación y flujos operativos. Mi foco es la arquitectura: modelado de dominio, diseño de kernel y la disciplina que mantiene los sistemas editables años después de su lanzamiento.',
    'about.h2': 'Cómo trabajo',
    'about.p2':
      'Cada proyecto empieza por el lenguaje del negocio. Los bounded contexts emergen de cómo el equipo de operaciones piensa realmente el trabajo, no de un esquema de base de datos. Una vez claras esas costuras, construyo un kernel — buses, puertos, value objects, sagas, outbox, capa de idempotencia — para que cada contexto nuevo cueste menos que el anterior.',
    'about.p2b':
      'La implementación avanza en pasos pequeños y deliberados. Los flujos nuevos viven en capas de dominio limpias; el código legacy sigue funcionando hasta que su reemplazo se ha probado en producción. Capas anti-corrupción puentean ambos lados, y una nota tipo ADR explica cada decisión no evidente.',
    'about.h3': 'Trayectoria',
    'about.p3':
      'Arquitectura backend en dos stacks paralelos: Java/Spring y TypeScript/NestJS. Los mismos patrones — Hexagonal, DDD, CQRS — aplicados en ambos, de modo que el framework es un vehículo de entrega y no una elección estructural. Proyectos recientes incluyen un backend ERP con una arquitectura de quince contextos y un kernel propio de primitivos CQRS / saga / outbox, y una plataforma full-stack de RR.HH. y nómina con un diseño de kernel paralelo en TypeScript.',
    'about.principles': 'Principios',
    'about.principle1.title': 'Construir el kernel primero',
    'about.principle1.body':
      'Cada patrón reutilizable — buses, value objects, puertos, saga, outbox, idempotencia — vive en una base hecha a mano. Cada bounded context nuevo cuesta menos porque la base ya pagó el coste inicial.',
    'about.principle2.title': 'Patrones por encima de frameworks',
    'about.principle2.body':
      'La arquitectura viaja. Hexagonal, DDD, CQRS funcionan igual en Java/Spring que en TypeScript/NestJS. El framework es un vehículo de entrega; la disciplina pertenece al arquitecto.',
    'about.principle3.title': 'Coexistencia progresiva sobre reescrituras',
    'about.principle3.body':
      'El código legacy sigue en producción mientras los contextos nuevos demuestran su valor. Capas anti-corrupción puentean ambos lados. Un god-service se retira solo cuando su reemplazo se ha ganado su lugar bajo carga real.',
    'about.principle4.title': 'La documentación va con el código',
    'about.principle4.body':
      'Cada decisión no evidente tiene un markdown al lado. Bounded contexts, narrativas de refactor, runbooks. El sistema se explica solo antes de que nadie tenga que abrir el editor.',
    'about.stackHeading': 'Stack',

    // ─── Misc
    'lang.label': 'Idioma',
    'lang.toggle.aria': 'Cambiar idioma',
  },
} as const;

export type UIKey = keyof (typeof ui)[typeof defaultLang];
