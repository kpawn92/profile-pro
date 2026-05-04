---
lang: es
title: 'Una plataforma de control horario y flujo de caja, modelada como bounded contexts en NestJS'
summary: 'Un monorepo full-stack (NestJS + React 19 + Prisma) para operaciones de RR.HH.: horarios, cierres de nómina, deducciones, cargos, pagos y cuentas de flujo de caja. Misma disciplina orientada al dominio que un backend hermano en Java/Spring — Hexagonal, DDD, CQRS — portada deliberadamente a TypeScript con un kernel propio de 83 primitivos.'
industry: 'Operaciones B2B · RR.HH. y nómina'
role: 'Arquitecto Full-Stack · Backend Lead'
year: 2025
duration: 'Compromiso activo, en curso desde 2025'
featured: true
tags:
  - 'Arquitectura Backend'
  - 'DDD'
  - 'CQRS'
  - 'Hexagonal'
  - 'NestJS'
  - 'TypeScript'
  - 'React'
  - 'Prisma'
stack:
  - 'TypeScript · Node.js 20+'
  - 'NestJS · Prisma · JWT (passport-jwt)'
  - 'React 19 · Vite'
  - 'PostgreSQL'
  - 'class-validator · class-transformer · Joi'
  - 'xlsx-populate · Swagger / OpenAPI'
  - 'npm workspaces (monorepo)'
boundedContexts:
  - 'shared (kernel) — buses, command/query handlers, base de agregados, puertos de repositorio'
  - 'attendance — employee, schedules, payroll-closure, payment, charges, deduction'
  - 'attendance — discount-traker, targeted-discount, rate-management, schedules-counter'
  - 'cash-flow — transaction, account, transactions-counter'
metrics:
  - { value: '466', label: 'archivos TypeScript de backend entre kernel y bounded contexts' }
  - { value: '15', label: 'subcontextos entre RR.HH. y flujo de caja' }
  - { value: '12', label: 'primitivos tipados de dominio solo en payroll-closure' }
---

## Problema

Un equipo de operaciones llevando RR.HH. y nómina con hojas de cálculo y formularios ad hoc. Cada ciclo sangraba horas: horarios irregulares, salarios en varias divisas, deducciones por trabajador, cierres de nómina que tenían que cuadrar contra contabilidad. El SaaS de RR.HH. estándar modelaba lo fácil y empujaba lo incómodo al equipo. Los reportes nunca cuadraban del todo.

El encargo era construir un sistema en el que el equipo de operaciones realmente pudiera apoyarse — diseñado en torno a cómo ellos piensan la nómina, no a cómo los frameworks pintan formularios.

## Restricciones

- **Naming guiado por operaciones.** Cada agregado tenía que mapear a un término que alguien en RR.HH. o finanzas usara realmente. Sin vocabulario inventado.
- **Cierres auditables.** Los eventos de cierre de nómina son eventos contables. Tienen que reconstruirse línea a línea, no solo producir un número final.
- **Multi-divisa desde el primer día.** Trabajadores pagados en distintas monedas. Los cierres tenían que respetarlo sin filtrar conversiones a la lógica de negocio.
- **Equipo pequeño, ciclos rápidos.** Sin margen para una arquitectura por la que nadie pudiera navegar dos meses después.

## Aproximación

Un monorepo con npm workspaces. Backend NestJS, frontend React 19 / Vite, Prisma contra PostgreSQL. Misma disciplina arquitectónica que un backend hermano en Java/Spring — Hexagonal, DDD, CQRS — traducida deliberadamente a TypeScript. Los patrones pertenecen al problema, no al stack.

### El kernel (`core/shared`)

83 archivos TypeScript con los primitivos que cada bounded context consume:

- **Buses** — `CommandBus`, `QueryBus`, `EventBus`, más `CommandHandler`, `QueryHandler`, `DomainEventSubscriber`, `Command`, `Query`, `DomainEvent`, con un vocabulario tipado de errores: `CommandNotRegisterException`, `QueryNotRegisterException`.
- **Primitivos de dominio** — `Entity`, `AggregateEntity`, `AggregateRoot`, `EntityStaticFromPrimitives`, `ContextDomain`, `Cursor`, `Nullable`, `Response`, `PaginationOptions`, `PaginatedResult`.
- **Puertos de persistencia** — `CrudRepository`, `DataSource`, `NewableClass`.
- **Aplicación transversal** — un `AuditCreator` con semántica de auditoría compartida entre contextos.
- **Puente NestJS** — un `ClassInjectableDecorator` que expone los puertos del dominio a través del contenedor de Nest sin hacer que las clases de dominio dependan de Nest.

Construido desde primeros principios para TypeScript en lugar de envolver un framework de terceros. El equipo es dueño de cada abstracción.

### Bounded contexts

**Attendance (274 archivos, 11 subcontextos).** El núcleo de RR.HH.:

- `employee` — agregado de empleado con metadata de tarifa
- `schedules` + `schedules-counter` — horarios de trabajo y agregados
- `payroll-closure` — cierres de nómina auditables
- `payment` — eventos de pago vinculados a cierres
- `charges`, `deduction`, `discount-traker`, `targeted-discount` — cada ajuste salarial modelado como concepto de primer nivel
- `rate-management` — pricing del trabajo
- `shared` local al contexto

**Cash flow (49 archivos, 4 subcontextos).** La contraparte financiera:

- `transaction` — movimientos de dinero
- `account` — cuentas financieras
- `transactions-counter` — agregados analíticos
- `shared` local al contexto

### Vitrina: el contexto `payroll-closure`

Forma representativa de un contexto. Doce primitivos tipados en la capa de dominio:

- agregado: `PayrollClosure`
- identidad: `PayrollClosureId`
- enums: `PayrollClosureType`, `PayrollClosureConcept`
- temporal: `PayrollClosureAt`
- compensación: `WorkerAmount`, `WorkerCurrency`, `WorkerHourly`, `WorkHistorical`
- consulta: `PayrollClosureCriteria`, `SearchPayrollClosureCriteria`
- puerto: `PayrollClosureRepository`

La capa de aplicación se separa limpiamente en comandos y queries:

- `closure/` — `ClosurePayrollCommand` → `ClosurePayrollCommandHandler` → `PayrollClosureCreator`
- `remove/` — `RemovePayrollClosureCommand` → `RemovePayrollClosureCommandHandler` → `PayrollClosureRemover`
- `search/` — `SearchLastPayrollClosureQuery` → `SearchLastPayrollClosureQueryHandler` → `PayrollClosureSearcher`

La infraestructura es un único adaptador Prisma (`prisma-orm-payroll-closure.repository.ts`) más un módulo de inyección NestJS. La capa de transporte (`app/`, 60 archivos) tiene los controladores NestJS, DTOs validados con `class-validator`, autenticación JWT (passport-jwt), docs Swagger y exportación a Excel vía `xlsx-populate`.

## Decisiones

- **Misma arquitectura, distinto stack.** La disciplina DDD/CQRS que funcionó en Java/Spring se portó deliberadamente a TypeScript/NestJS. Buses, value objects, handlers de comando/query, puertos de repositorio — misma forma. Prueba de que los patrones viajan y el rigor pertenece al arquitecto, no al framework.
- **CQRS sin coste operativo.** Comandos y queries son tipos y handlers separados despachados por buses. El lado de lectura consulta Prisma sobre la misma base. CQRS como disciplina, no como despliegue.
- **Prisma como adaptador deliberado.** Los puertos de repositorio viven en el dominio. Las implementaciones de Prisma están en `infrastructure/`. Si Prisma cambia, el dominio no.
- **La DI de NestJS puentea las capas, no se filtra dentro.** Un `ClassInjectableDecorator` expone los puertos del dominio a través del contenedor de Nest sin hacer que las clases de dominio dependan de anotaciones Nest.
- **El frontend espeja los contextos.** React 19 + Vite + TypeScript. Cada área de negocio tiene su propio slice de UI; los flujos de cierre de nómina en la interfaz mapean a los casos de uso de cierre en el backend.
- **El dinero está tipado en la frontera.** `WorkerAmount`, `WorkerCurrency`, `WorkerHourly` existen precisamente para que nadie pase primitivos que confundan conceptos. Las exportaciones a Excel y la auth JWT son preocupaciones de infraestructura; el dominio no las toca.

## Resultado

- Una plataforma full-stack de control horario y flujo de caja — 466 archivos TypeScript de backend en 15 subcontextos y un kernel propio de 83 archivos con los primitivos CQRS / DDD.
- Los cierres de nómina se ejecutan como eventos auditables, multi-divisa, por trabajador — no como un único número de fin de ciclo que después hay que defender.
- La misma disciplina arquitectónica aplicada a dos stacks (Java/Spring y TypeScript/NestJS), con diseño paralelo del kernel — prueba de que los patrones viajan y que el framework es un vehículo de entrega, no una elección estructural.
