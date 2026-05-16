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
      'I design domain-driven backends — Hexagonal, DDD, CQRS — for ERP, accounting, payroll and operational workflows. Java/Spring on the backend, React/TypeScript on the frontend, with the same kernel discipline on both sides.',
    'site.availability': 'Selectively taking on engagements for 2026',
    'site.location': 'Havana, Cuba',

    'hero.eyebrow': 'Available · Selectively taking on engagements for 2026',
    'hero.cta.primary': 'View case studies',
    'hero.cta.secondary': 'Start a conversation',

    'hero.meta.focus.label': 'Focus',
    'hero.meta.focus.value': 'ERP · Accounting · Operations',
    'hero.meta.stack.label': 'Stack',
    'hero.meta.stack.value': 'React · TypeScript · Spring · Postgres',
    'hero.meta.approach.label': 'Approach',
    'hero.meta.approach.value': 'DDD · Hex · TDD',
    'hero.meta.location.label': 'Based in',

    // ─── Navigation
    'nav.work': 'Work',
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

    // ─── Work page
    'wk.meta.title': 'Work',
    'wk.meta.desc':
      'Selected work — domain-driven architecture proven under real production load. Two live engagements across Java/Spring and TypeScript/NestJS.',

    'wk.intro.eyebrow': 'Selected work',
    'wk.intro.title': 'Proof, not promises.',
    'wk.intro.lede':
      'Two live engagements, anonymised. Each is the same thesis under real production load: domain-driven architecture that gets cheaper to extend, not more expensive. Outcomes verifiable on request.',

    'wk.evidence.caption': 'Two engagements. Two stacks. One architecture, proven twice.',
    'wk.ev.s1.label': 'Live engagements',
    'wk.ev.s2.label': 'Architectural kernels built',
    'wk.ev.s3.label': 'Bounded contexts modelled',
    'wk.ev.s4.label': 'Legacy lines retired',

    'wk.bus.eyebrow': 'The common kernel',
    'wk.bus.title': 'Both engagements run on the same hand-built kernel.',
    'wk.bus.body':
      'Commands change state, queries read it, and domain events let the rest of the system react — over a CQRS message bus. Around the domain, ports and adapters keep it pure. The same kernel is reused by every bounded context in both case studies.',
    'wk.bus.cqrs': 'CQRS message bus',
    'wk.bus.hex': 'Ports & adapters',
    'wk.bus.live': 'live',

    'wk.index.eyebrow': 'Case studies',
    'wk.index.title': 'Each project is the same idea, tested differently.',
    'wk.index.filterAll': 'All',
    'wk.index.filterLabel': 'Filter by industry',

    'wk.cta.eyebrow': 'Working together',
    'wk.cta.title': 'Your system could be the next proof.',
    'wk.cta.body':
      "If you're rebuilding a critical part of your operation and want architecture that compounds instead of decaying, I'd like to hear about it.",
    'wk.cta.email': 'Start a conversation',
    'wk.cta.about': 'How I work',

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

    // ─── On the horizon (AI assistant)
    'horizon.eyebrow': 'On the horizon',
    'horizon.title':
      'Natural language as a first-class interface to enterprise systems.',
    'horizon.body':
      'An AI assistant module currently in production-readiness on top of the ERP backend. Natural-language requests are classified into intents and routed deterministically to a registry of read-only Tools that wrap existing application services. Authorization stays inside the access context — no parallel permission model. The next phase brings command-side tools with HITL confirmation and conversational state for end-to-end operational sales management.',
    'horizon.stat1': 'Tools registered',
    'horizon.stat2': 'Intents classified',
    'horizon.stat3': 'LLM providers',
    'horizon.stat4': 'Confirmation flow',
    'horizon.cap1.title': 'Deterministic tool routing',
    'horizon.cap1.body':
      'Intents are resolved by a keyword classifier, not by the LLM. The LLM composes the response, never decides what to call. Failure modes degrade to a deterministic fallback.',
    'horizon.cap2.title': 'Swappable LLM providers',
    'horizon.cap2.body':
      'A single provider port — three implementations: mock for tests, Ollama for local privacy-first inference, OpenAI-compatible for managed deployment. Switch by config; the domain never knows.',
    'horizon.cap3.title': 'Authorization stays where it lives',
    'horizon.cap3.body':
      'Every tool call goes through the existing AuthorizeActionHandler. Tenant, business unit and permissions remain owned by the access context. The assistant never reaches around them.',

    // ─── Contact CTA
    'ctaSection.eyebrow': 'Currently',
    'ctaSection.titleA': 'Designing the next generation of business systems takes',
    'ctaSection.titleB': 'careful hands.',
    'ctaSection.body':
      "If you're rebuilding a critical part of your operation — accounting, ERP, financial workflows — and need a senior pair of hands on the architecture, I'd like to hear about it.",
    'ctaSection.email': 'Write me an email',
    'ctaSection.form': 'Working together',

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

    // ─── About page
    'about.title': 'About',
    'about.meta.desc':
      'Alejandro Pozo — senior backend architect for complex business systems. ERP and payroll engines built on DDD, Hexagonal and CQRS, with a hand-built kernel that makes every new context cost less.',

    'ab.intro.eyebrow': 'Who you would be funding',
    'ab.intro.title': 'I design the part of the system that has to be right.',
    'ab.intro.lede':
      "I'm Alejandro Pozo — a senior backend architect for complex business software. ERP cores, payroll closures, accounting moves: the engines where a wrong answer is not a bug, it is a liability.",

    'ab.value.eyebrow': 'The work',
    'ab.value.title': 'Not features. Foundations.',
    'ab.value.body':
      'Anyone can add a screen. I build the layer underneath it — the domain model, the boundaries, the kernel — so the tenth feature costs less than the first and the system is still editable years after it ships. That is the line between software that compounds and software that decays.',

    'ab.method.eyebrow': 'How I work',
    'ab.method.title': 'Every engagement runs the same disciplined path.',
    'ab.method.body':
      'Select each phase. None of it is improvised — the sequence holds whether the stack is Java or TypeScript.',
    'ab.method.p1.title': 'Start with the language',
    'ab.method.p1.body':
      'Bounded contexts emerge from how the operations team actually thinks about the work — not from a database schema. Shared vocabulary before a line of code.',
    'ab.method.p2.title': 'Draw the boundaries',
    'ab.method.p2.body':
      'Explicit seams between contexts. Each one owns its model; integration is deliberate. This is where most systems are quietly won or lost.',
    'ab.method.p3.title': 'Build the kernel',
    'ab.method.p3.body':
      'Buses, ports, value objects, saga, outbox, idempotence — a hand-built foundation. Pay the upfront tax once; every context after it costs less.',
    'ab.method.p4.title': 'Coexist, never rewrite blindly',
    'ab.method.p4.body':
      'New contexts ship into clean layers while legacy keeps running. Anti-corruption layers bridge the two. A god-service retires only when its replacement has earned it under real load.',

    'ab.kernel.eyebrow': 'The compounding asset',
    'ab.kernel.title': 'Each bounded context costs less than the last.',
    'ab.kernel.body':
      'The kernel is built once. After that, every new context reuses it — so the marginal cost of growth falls instead of rising. Add contexts and watch the two cost curves separate.',
    'ab.kernel.cta': 'Add a bounded context',
    'ab.kernel.reset': 'Reset',
    'ab.kernel.unit': 'context',
    'ab.kernel.units': 'contexts',
    'ab.kernel.withKernel': 'With a kernel',
    'ab.kernel.ghost': 'Without a kernel',
    'ab.kernel.note':
      'Most systems get more expensive to extend every year. A kernel makes them get cheaper. That gap is what you are funding.',

    'ab.principles.eyebrow': 'Principles',
    'ab.principles.title': 'Four rules I do not bend.',
    'ab.pr1.title': 'Build the kernel first',
    'ab.pr1.body':
      'Every reusable pattern lives in a hand-built foundation. Each new context costs less because the foundation already paid the upfront tax.',
    'ab.pr2.title': 'Patterns over frameworks',
    'ab.pr2.body':
      'The architecture travels. Hexagonal, DDD and CQRS work the same in Java/Spring as in TypeScript/NestJS. The framework is only a delivery vehicle.',
    'ab.pr3.title': 'Coexistence over rewrites',
    'ab.pr3.body':
      'Legacy keeps shipping while new contexts prove themselves. Anti-corruption layers bridge the two. Nothing is retired on faith.',
    'ab.pr4.title': 'Documentation pairs with code',
    'ab.pr4.body':
      'Every non-obvious decision has a markdown beside it — bounded contexts, refactor narratives, runbooks. The system explains itself.',

    'ab.stacks.eyebrow': 'Two stacks, one architecture',
    'ab.stacks.title': 'The framework is the vehicle. The discipline is the asset.',
    'ab.stacks.body':
      'I work in two parallel stacks. The patterns are identical in both. Switch the stack below — only the adapters change; the domain at the core never moves.',
    'ab.stacks.note':
      'This is why funding judgment beats funding a framework specialist. Judgment travels between stacks; framework knowledge expires with them.',
    'ab.stacks.core': 'Domain',
    'ab.stacks.patterns': 'Hexagonal · DDD · CQRS — unchanged',

    'ab.bg.eyebrow': 'Background',
    'ab.bg.title': 'Where the discipline comes from.',
    'ab.bg.body':
      'Software Engineer, graduated from Universidad de Oriente in Santiago de Cuba. Recent engagements: an ERP backend with a fifteen-context architecture and a hand-built kernel of CQRS, saga and outbox primitives; and a full-stack HR and payroll platform with a parallel kernel in TypeScript. The same patterns, proven twice, in two languages.',
    'ab.stack.heading': 'Stack',

    'ab.cta.eyebrow': 'Working together',
    'ab.cta.title': 'If correctness is non-negotiable, we should talk.',
    'ab.cta.body':
      'I selectively take on engagements where the architecture is the thing that matters. Email is the fastest path — I read every message myself.',
    'ab.cta.email': 'Start a conversation',

    // ─── Leverage page (the case for funding architecture)
    'nav.case': 'The case',
    'lev.meta.title': 'The case for architecture',
    'lev.meta.desc':
      'AI made code cheap. It did not make the wrong system cheap. Why funding architectural judgment — patterns, algorithms, spec-driven domain design — is the highest-leverage investment in the age of AI.',

    'lev.hero.eyebrow': 'The case for funding architecture',
    'lev.hero.title': "Code got cheap. Being right didn't.",
    'lev.hero.sub':
      'AI collapsed the cost of producing code. It did nothing to the cost of producing the wrong system. This page is about that gap — and why the person who controls it is the highest-leverage thing you can fund.',
    'lev.hero.codeLabel': 'AI-generated · 0.4s',
    'lev.hero.verdict': 'Plausible. Compiles. Wrong.',
    'lev.hero.scroll': 'Read the case',

    'lev.shift.eyebrow': 'The shift',
    'lev.shift.title': 'AI scaled output. It never scaled coherence.',
    'lev.shift.body':
      'Drag the slider. As AI capability grows, the volume of code an organisation can produce explodes. Whether that code forms a system that holds together does not move on its own — a person moves it.',
    'lev.shift.slider': 'AI capability',
    'lev.shift.curve1': 'Code volume',
    'lev.shift.curve2': 'Architectural coherence',
    'lev.shift.note':
      'The distance between these two lines is risk. It is paid later, with interest.',

    'lev.spec.eyebrow': 'Specification',
    'lev.spec.title': 'The same request. Two completely different systems.',
    'lev.spec.body':
      'A model is a function of its input. Give it a vague prompt and it fills the gaps with guesses. Give it a precise specification and it fills them with your intent. Toggle the input below.',
    'lev.spec.vague': 'Vague prompt',
    'lev.spec.precise': 'Precise specification',
    'lev.spec.vagueText': '“Build me an orders module.”',
    'lev.spec.preciseText':
      'Order is an aggregate. It cannot ship below available stock. Totals are derived from lines — never stored raw. Cancellation after fulfilment is forbidden. Money is an explicit value object.',
    'lev.spec.vagueVerdict':
      'Tangled. No boundaries. The bugs are structural — you cannot test them away.',
    'lev.spec.preciseVerdict':
      'Bounded. Invariants enforced at the type level. The model resists misuse by construction.',

    'lev.sdd.eyebrow': 'Spec-driven domain design',
    'lev.sdd.title': 'The specification is the asset. The code is a build artefact.',
    'lev.sdd.body':
      'When the spec is the source of truth, code can be regenerated — but the thinking behind it cannot. Activate each layer of the specification and watch the architecture compile.',
    'lev.sdd.t1.label': 'Ubiquitous language',
    'lev.sdd.t1.body':
      'Names mean exactly one thing — in the spec, in the code, and in the conversation with the business.',
    'lev.sdd.t2.label': 'Invariants',
    'lev.sdd.t2.body':
      'Rules that must always hold. Encoded once, they make whole categories of bug unrepresentable.',
    'lev.sdd.t3.label': 'Bounded contexts',
    'lev.sdd.t3.body':
      'Explicit seams. Each context owns its model; integration becomes deliberate, never accidental.',
    'lev.sdd.empty': 'An empty spec compiles to nothing you can trust.',
    'lev.sdd.complete': 'A complete spec compiles to a system that defends itself.',
    'lev.sdd.compiled': 'spec → architecture',

    'lev.irr.eyebrow': 'The irreducible',
    'lev.irr.title': 'Four things a model cannot decide for you.',
    'lev.irr.c1.title': 'Judgment under ambiguity',
    'lev.irr.c1.body':
      'When a requirement contradicts itself, someone has to choose what the business actually means. A model averages the training data; an architect decides.',
    'lev.irr.c2.title': 'Trade-offs with consequences',
    'lev.irr.c2.body':
      'Consistency or availability. Speed or auditability. Every real system is a chain of trade-offs that only a human can own and defend.',
    'lev.irr.c3.title': 'Irreversible decisions',
    'lev.irr.c3.body':
      'Schema shape, context boundaries, the public API. Get these wrong and no volume of generated code buys them back.',
    'lev.irr.c4.title': 'The invariants of your business',
    'lev.irr.c4.body':
      'That an invoice can never be negative is not in the training data. It is in your domain. Someone has to know it — and encode it.',

    'lev.cost.eyebrow': 'The compounding cost',
    'lev.cost.title': 'Architectural debt does not add up. It multiplies.',
    'lev.cost.body':
      'Scroll through eighteen months of the same project. One path had an architect shaping every boundary. The other shipped whatever generated fastest.',
    'lev.cost.lineA': 'With architectural discipline',
    'lev.cost.lineB': 'Without it',
    'lev.cost.t0': 'Month 0',
    'lev.cost.t1': 'Month 18',
    'lev.cost.axis': 'Cost of change',
    'lev.cost.caption':
      'Both teams used the same AI. Only one stayed cheap to change.',

    'lev.eq.eyebrow': 'The leverage equation',
    'lev.eq.title': 'AI is a multiplier. A multiplier needs something worth multiplying.',
    'lev.eq.body':
      'Trustworthy output is AI throughput multiplied by human judgment. Throughput is now effectively unlimited. Drag judgment toward zero and watch what unlimited throughput is worth.',
    'lev.eq.factorAi': 'AI throughput',
    'lev.eq.factorHuman': 'Architectural judgment',
    'lev.eq.result': 'Trustworthy output',
    'lev.eq.slider': 'Architectural judgment',
    'lev.eq.collapsed':
      'Unlimited speed times zero judgment is still zero. This is the case for funding the judgment.',

    'lev.cta.eyebrow': 'The decision',
    'lev.cta.titleA': 'Fund the person who makes the AI',
    'lev.cta.titleB': 'worth the spend.',
    'lev.cta.body':
      "I design domain-driven backends — DDD, Hexagonal, CQRS — for systems where being wrong is expensive. If you're investing in AI-accelerated delivery and want it to compound instead of decay, let's talk.",
    'lev.cta.email': 'Start a conversation',
    'lev.cta.work': 'See how I work',

    // ─── Misc
    'lang.label': 'Language',
    'lang.toggle.aria': 'Switch language',
  },

  es: {
    // ─── Site / hero
    'site.role': 'Senior Full-Stack Developer para sistemas empresariales complejos',
    'site.description':
      'Diseño backends orientados al dominio — Hexagonal, DDD, CQRS — para ERP, contabilidad, nómina y flujos operativos. Java/Spring en el backend, React/TypeScript en el frontend, con la misma disciplina de kernel en ambos lados.',
    'site.availability': 'Aceptando proyectos seleccionados para 2026',
    'site.location': 'La Habana, Cuba',

    'hero.eyebrow': 'Disponible · Aceptando proyectos seleccionados para 2026',
    'hero.cta.primary': 'Ver casos de estudio',
    'hero.cta.secondary': 'Iniciar una conversación',

    'hero.meta.focus.label': 'Enfoque',
    'hero.meta.focus.value': 'ERP · Contabilidad · Operaciones',
    'hero.meta.stack.label': 'Stack',
    'hero.meta.stack.value': 'React · TypeScript · Spring · Postgres',
    'hero.meta.approach.label': 'Aproximación',
    'hero.meta.approach.value': 'DDD · Hex · TDD',
    'hero.meta.location.label': 'Ubicación',

    // ─── Navigation
    'nav.work': 'Trabajo',
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

    // ─── Work page
    'wk.meta.title': 'Trabajo',
    'wk.meta.desc':
      'Trabajo seleccionado — arquitectura orientada al dominio probada bajo carga real de producción. Dos proyectos activos en Java/Spring y TypeScript/NestJS.',

    'wk.intro.eyebrow': 'Trabajo seleccionado',
    'wk.intro.title': 'Pruebas, no promesas.',
    'wk.intro.lede':
      'Dos proyectos activos, anonimizados. Cada uno es la misma tesis bajo carga real de producción: arquitectura orientada al dominio que se vuelve más barata de extender, no más cara. Resultados verificables bajo petición.',

    'wk.evidence.caption': 'Dos proyectos. Dos stacks. Una arquitectura, probada dos veces.',
    'wk.ev.s1.label': 'Proyectos activos',
    'wk.ev.s2.label': 'Kernels propios construidos',
    'wk.ev.s3.label': 'Bounded contexts modelados',
    'wk.ev.s4.label': 'Líneas de legacy retiradas',

    'wk.bus.eyebrow': 'El kernel común',
    'wk.bus.title': 'Ambos proyectos corren sobre el mismo kernel hecho a mano.',
    'wk.bus.body':
      'Los comandos cambian el estado, las consultas lo leen y los eventos de dominio dejan que el resto del sistema reaccione — sobre un bus de mensajes CQRS. Alrededor del dominio, los puertos y adaptadores lo mantienen puro. El mismo kernel lo reutiliza cada bounded context en ambos casos de estudio.',
    'wk.bus.cqrs': 'Bus de mensajes CQRS',
    'wk.bus.hex': 'Puertos y adaptadores',
    'wk.bus.live': 'en vivo',

    'wk.index.eyebrow': 'Casos de estudio',
    'wk.index.title': 'Cada proyecto es la misma idea, puesta a prueba de forma distinta.',
    'wk.index.filterAll': 'Todos',
    'wk.index.filterLabel': 'Filtrar por industria',

    'wk.cta.eyebrow': 'Trabajar juntos',
    'wk.cta.title': 'Tu sistema podría ser la próxima prueba.',
    'wk.cta.body':
      'Si estás reconstruyendo una parte crítica de tu operación y quieres una arquitectura que se componga en vez de degradarse, me gustaría escucharlo.',
    'wk.cta.email': 'Iniciar una conversación',
    'wk.cta.about': 'Cómo trabajo',

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

    // ─── On the horizon (AI assistant)
    'horizon.eyebrow': 'En el horizonte',
    'horizon.title':
      'Lenguaje natural como interfaz de primer nivel a los sistemas empresariales.',
    'horizon.body':
      'Un módulo de asistente IA actualmente en endurecimiento de producción sobre el backend ERP. Las peticiones en lenguaje natural se clasifican en intents y se enrutan de forma determinista a un registro de Tools de solo lectura que envuelven los servicios de aplicación existentes. La autorización vive dentro del contexto de access — sin modelo de permisos paralelo. La siguiente fase incorpora tools de escritura con confirmación HITL y estado conversacional para gestión operacional de ventas end-to-end.',
    'horizon.stat1': 'Tools registradas',
    'horizon.stat2': 'Intents clasificadas',
    'horizon.stat3': 'Proveedores LLM',
    'horizon.stat4': 'Flujo de confirmación',
    'horizon.cap1.title': 'Routing determinista de tools',
    'horizon.cap1.body':
      'Las intents se resuelven con un clasificador por keywords, no con el LLM. El LLM compone la respuesta, nunca decide qué llamar. Los modos de fallo degradan a un fallback determinista.',
    'horizon.cap2.title': 'Proveedores LLM intercambiables',
    'horizon.cap2.body':
      'Un único puerto de proveedor — tres implementaciones: mock para tests, Ollama para inferencia local privacy-first, compatible con OpenAI para despliegue gestionado. Se cambia por configuración; el dominio no se entera.',
    'horizon.cap3.title': 'La autorización vive donde le toca',
    'horizon.cap3.body':
      'Cada llamada a una tool pasa por el AuthorizeActionHandler existente. Tenant, business unit y permisos siguen siendo propiedad del contexto de access. El asistente nunca los esquiva.',

    // ─── Contact CTA
    'ctaSection.eyebrow': 'Actualmente',
    'ctaSection.titleA':
      'Diseñar la próxima generación de sistemas empresariales requiere',
    'ctaSection.titleB': 'manos cuidadosas.',
    'ctaSection.body':
      'Si estás reconstruyendo una parte crítica de tu operación — contabilidad, ERP, flujos financieros — y necesitas un par de manos senior en la arquitectura, me gustaría escucharlo.',
    'ctaSection.email': 'Escríbeme un email',
    'ctaSection.form': 'Trabajar juntos',

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

    // ─── About page
    'about.title': 'Sobre mí',
    'about.meta.desc':
      'Alejandro Pozo — arquitecto backend senior para sistemas empresariales complejos. Motores de ERP y nómina sobre DDD, Hexagonal y CQRS, con un kernel hecho a mano que abarata cada contexto nuevo.',

    'ab.intro.eyebrow': 'A quién estarías financiando',
    'ab.intro.title': 'Diseño la parte del sistema que tiene que estar bien.',
    'ab.intro.lede':
      'Soy Alejandro Pozo — arquitecto backend senior para software empresarial complejo. Núcleos de ERP, cierres de nómina, movimientos contables: los motores donde una respuesta equivocada no es un bug, es un pasivo.',

    'ab.value.eyebrow': 'El trabajo',
    'ab.value.title': 'No funcionalidades. Cimientos.',
    'ab.value.body':
      'Cualquiera puede añadir una pantalla. Yo construyo la capa que va debajo — el modelo de dominio, las fronteras, el kernel — para que la décima funcionalidad cueste menos que la primera y el sistema siga siendo editable años después de su lanzamiento. Esa es la línea entre el software que se compone y el que se degrada.',

    'ab.method.eyebrow': 'Cómo trabajo',
    'ab.method.title': 'Cada proyecto recorre el mismo camino disciplinado.',
    'ab.method.body':
      'Selecciona cada fase. Nada se improvisa — la secuencia se sostiene tanto si el stack es Java como TypeScript.',
    'ab.method.p1.title': 'Empezar por el lenguaje',
    'ab.method.p1.body':
      'Los bounded contexts emergen de cómo el equipo de operaciones piensa realmente el trabajo — no de un esquema de base de datos. Vocabulario compartido antes de una línea de código.',
    'ab.method.p2.title': 'Trazar las fronteras',
    'ab.method.p2.body':
      'Costuras explícitas entre contextos. Cada uno es dueño de su modelo; la integración es deliberada. Aquí es donde la mayoría de los sistemas se ganan o se pierden en silencio.',
    'ab.method.p3.title': 'Construir el kernel',
    'ab.method.p3.body':
      'Buses, puertos, value objects, saga, outbox, idempotencia — una base hecha a mano. Pagas el coste inicial una vez; cada contexto posterior cuesta menos.',
    'ab.method.p4.title': 'Coexistir, nunca reescribir a ciegas',
    'ab.method.p4.body':
      'Los contextos nuevos llegan a capas limpias mientras el legacy sigue funcionando. Capas anti-corrupción puentean ambos lados. Un god-service se retira solo cuando su reemplazo se lo ha ganado bajo carga real.',

    'ab.kernel.eyebrow': 'El activo que se compone',
    'ab.kernel.title': 'Cada bounded context cuesta menos que el anterior.',
    'ab.kernel.body':
      'El kernel se construye una vez. Después, cada contexto nuevo lo reutiliza — así el costo marginal de crecer baja en vez de subir. Añade contextos y observa cómo se separan las dos curvas de costo.',
    'ab.kernel.cta': 'Añadir un bounded context',
    'ab.kernel.reset': 'Reiniciar',
    'ab.kernel.unit': 'contexto',
    'ab.kernel.units': 'contextos',
    'ab.kernel.withKernel': 'Con un kernel',
    'ab.kernel.ghost': 'Sin un kernel',
    'ab.kernel.note':
      'La mayoría de los sistemas se vuelven más caros de extender cada año. Un kernel hace que se vuelvan más baratos. Esa brecha es lo que estás financiando.',

    'ab.principles.eyebrow': 'Principios',
    'ab.principles.title': 'Cuatro reglas que no negocio.',
    'ab.pr1.title': 'Construir el kernel primero',
    'ab.pr1.body':
      'Cada patrón reutilizable vive en una base hecha a mano. Cada contexto nuevo cuesta menos porque la base ya pagó el coste inicial.',
    'ab.pr2.title': 'Patrones por encima de frameworks',
    'ab.pr2.body':
      'La arquitectura viaja. Hexagonal, DDD y CQRS funcionan igual en Java/Spring que en TypeScript/NestJS. El framework es solo un vehículo de entrega.',
    'ab.pr3.title': 'Coexistencia sobre reescrituras',
    'ab.pr3.body':
      'El legacy sigue en producción mientras los contextos nuevos demuestran su valor. Capas anti-corrupción puentean ambos lados. Nada se retira por fe.',
    'ab.pr4.title': 'La documentación va con el código',
    'ab.pr4.body':
      'Cada decisión no evidente tiene un markdown al lado — bounded contexts, narrativas de refactor, runbooks. El sistema se explica solo.',

    'ab.stacks.eyebrow': 'Dos stacks, una arquitectura',
    'ab.stacks.title': 'El framework es el vehículo. La disciplina es el activo.',
    'ab.stacks.body':
      'Trabajo en dos stacks paralelos. Los patrones son idénticos en ambos. Cambia el stack abajo — solo cambian los adaptadores; el dominio del núcleo nunca se mueve.',
    'ab.stacks.note':
      'Por esto financiar juicio supera a financiar a un especialista en frameworks. El juicio viaja entre stacks; el conocimiento de framework caduca con ellos.',
    'ab.stacks.core': 'Dominio',
    'ab.stacks.patterns': 'Hexagonal · DDD · CQRS — sin cambios',

    'ab.bg.eyebrow': 'Trayectoria',
    'ab.bg.title': 'De dónde viene la disciplina.',
    'ab.bg.body':
      'Ingeniero de Software, graduado por la Universidad de Oriente en Santiago de Cuba. Proyectos recientes: un backend ERP con una arquitectura de quince contextos y un kernel propio de primitivos CQRS, saga y outbox; y una plataforma full-stack de RR.HH. y nómina con un kernel paralelo en TypeScript. Los mismos patrones, probados dos veces, en dos lenguajes.',
    'ab.stack.heading': 'Stack',

    'ab.cta.eyebrow': 'Trabajar juntos',
    'ab.cta.title': 'Si la corrección no es negociable, deberíamos hablar.',
    'ab.cta.body':
      'Acepto de forma selectiva proyectos donde la arquitectura es lo que importa. El correo es el camino más rápido — leo cada mensaje yo mismo.',
    'ab.cta.email': 'Iniciar una conversación',

    // ─── Leverage page (the case for funding architecture)
    'nav.case': 'El argumento',
    'lev.meta.title': 'El argumento por la arquitectura',
    'lev.meta.desc':
      'La IA abarató el código. No abarató el sistema equivocado. Por qué financiar el juicio arquitectónico — patrones, algoritmos, diseño de dominio guiado por especificación — es la inversión de mayor apalancamiento en la era de la IA.',

    'lev.hero.eyebrow': 'El argumento para financiar arquitectura',
    'lev.hero.title': 'El código se abarató. Acertar no.',
    'lev.hero.sub':
      'La IA desplomó el costo de producir código. No hizo nada con el costo de producir el sistema equivocado. Esta página trata de esa brecha — y de por qué la persona que la controla es lo de mayor apalancamiento que puedes financiar.',
    'lev.hero.codeLabel': 'Generado por IA · 0.4s',
    'lev.hero.verdict': 'Plausible. Compila. Incorrecto.',
    'lev.hero.scroll': 'Lee el argumento',

    'lev.shift.eyebrow': 'El desplazamiento',
    'lev.shift.title': 'La IA escaló la producción. Nunca escaló la coherencia.',
    'lev.shift.body':
      'Arrastra el control. A medida que crece la capacidad de la IA, el volumen de código que una organización puede producir se dispara. Que ese código forme un sistema que se sostiene no se mueve solo — lo mueve una persona.',
    'lev.shift.slider': 'Capacidad de la IA',
    'lev.shift.curve1': 'Volumen de código',
    'lev.shift.curve2': 'Coherencia arquitectónica',
    'lev.shift.note':
      'La distancia entre estas dos líneas es riesgo. Se paga después, con intereses.',

    'lev.spec.eyebrow': 'Especificación',
    'lev.spec.title': 'La misma petición. Dos sistemas completamente distintos.',
    'lev.spec.body':
      'Un modelo es una función de su entrada. Dale un prompt vago y rellena los huecos con conjeturas. Dale una especificación precisa y los rellena con tu intención. Cambia la entrada abajo.',
    'lev.spec.vague': 'Prompt vago',
    'lev.spec.precise': 'Especificación precisa',
    'lev.spec.vagueText': '«Hazme un módulo de pedidos.»',
    'lev.spec.preciseText':
      'Order es un agregado. No puede despachar por debajo del stock disponible. Los totales se derivan de las líneas — nunca se almacenan crudos. Cancelar tras el despacho está prohibido. El dinero es un value object explícito.',
    'lev.spec.vagueVerdict':
      'Enredado. Sin fronteras. Los bugs son estructurales — no se eliminan con tests.',
    'lev.spec.preciseVerdict':
      'Acotado. Invariantes garantizadas a nivel de tipos. El modelo resiste el mal uso por construcción.',

    'lev.sdd.eyebrow': 'Diseño de dominio guiado por especificación',
    'lev.sdd.title': 'La especificación es el activo. El código es un artefacto de build.',
    'lev.sdd.body':
      'Cuando la especificación es la fuente de verdad, el código se puede regenerar — pero el pensamiento detrás de él no. Activa cada capa de la especificación y observa cómo compila la arquitectura.',
    'lev.sdd.t1.label': 'Lenguaje ubicuo',
    'lev.sdd.t1.body':
      'Los nombres significan exactamente una cosa — en la especificación, en el código y en la conversación con el negocio.',
    'lev.sdd.t2.label': 'Invariantes',
    'lev.sdd.t2.body':
      'Reglas que siempre deben cumplirse. Codificadas una vez, vuelven categorías enteras de bugs imposibles de representar.',
    'lev.sdd.t3.label': 'Bounded contexts',
    'lev.sdd.t3.body':
      'Costuras explícitas. Cada contexto es dueño de su modelo; la integración se vuelve deliberada, nunca accidental.',
    'lev.sdd.empty': 'Una especificación vacía compila a algo en lo que no puedes confiar.',
    'lev.sdd.complete': 'Una especificación completa compila a un sistema que se defiende solo.',
    'lev.sdd.compiled': 'especificación → arquitectura',

    'lev.irr.eyebrow': 'Lo irreducible',
    'lev.irr.title': 'Cuatro cosas que un modelo no puede decidir por ti.',
    'lev.irr.c1.title': 'Juicio bajo ambigüedad',
    'lev.irr.c1.body':
      'Cuando un requisito se contradice a sí mismo, alguien tiene que elegir qué quiere decir realmente el negocio. Un modelo promedia los datos de entrenamiento; un arquitecto decide.',
    'lev.irr.c2.title': 'Trade-offs con consecuencias',
    'lev.irr.c2.body':
      'Consistencia o disponibilidad. Velocidad o auditabilidad. Todo sistema real es una cadena de trade-offs que solo un humano puede asumir y defender.',
    'lev.irr.c3.title': 'Decisiones irreversibles',
    'lev.irr.c3.body':
      'La forma del esquema, las fronteras de contexto, la API pública. Equivócate en esto y ningún volumen de código generado lo recompra.',
    'lev.irr.c4.title': 'Las invariantes de tu negocio',
    'lev.irr.c4.body':
      'Que una factura nunca pueda ser negativa no está en los datos de entrenamiento. Está en tu dominio. Alguien tiene que conocerla — y codificarla.',

    'lev.cost.eyebrow': 'El costo compuesto',
    'lev.cost.title': 'La deuda arquitectónica no se suma. Se multiplica.',
    'lev.cost.body':
      'Recorre dieciocho meses del mismo proyecto. Un camino tuvo a un arquitecto dando forma a cada frontera. El otro entregó lo que se generara más rápido.',
    'lev.cost.lineA': 'Con disciplina arquitectónica',
    'lev.cost.lineB': 'Sin ella',
    'lev.cost.t0': 'Mes 0',
    'lev.cost.t1': 'Mes 18',
    'lev.cost.axis': 'Costo de cambiar',
    'lev.cost.caption':
      'Ambos equipos usaron la misma IA. Solo uno siguió siendo barato de cambiar.',

    'lev.eq.eyebrow': 'La ecuación de apalancamiento',
    'lev.eq.title': 'La IA es un multiplicador. Un multiplicador necesita algo que valga la pena multiplicar.',
    'lev.eq.body':
      'La producción confiable es el rendimiento de la IA multiplicado por el juicio humano. El rendimiento es ya prácticamente ilimitado. Lleva el juicio hacia cero y observa cuánto vale ese rendimiento ilimitado.',
    'lev.eq.factorAi': 'Rendimiento de la IA',
    'lev.eq.factorHuman': 'Juicio arquitectónico',
    'lev.eq.result': 'Producción confiable',
    'lev.eq.slider': 'Juicio arquitectónico',
    'lev.eq.collapsed':
      'Velocidad ilimitada por juicio cero sigue siendo cero. Este es el argumento para financiar el juicio.',

    'lev.cta.eyebrow': 'La decisión',
    'lev.cta.titleA': 'Financia a quien hace que la IA',
    'lev.cta.titleB': 'valga lo que cuesta.',
    'lev.cta.body':
      'Diseño backends orientados al dominio — DDD, Hexagonal, CQRS — para sistemas donde equivocarse sale caro. Si estás invirtiendo en entrega acelerada por IA y quieres que se componga en vez de degradarse, hablemos.',
    'lev.cta.email': 'Iniciar una conversación',
    'lev.cta.work': 'Ver cómo trabajo',

    // ─── Misc
    'lang.label': 'Idioma',
    'lang.toggle.aria': 'Cambiar idioma',
  },
} as const;

export type UIKey = keyof (typeof ui)[typeof defaultLang];
