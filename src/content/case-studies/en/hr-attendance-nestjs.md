---
lang: en
title: 'An HR attendance and cash-flow platform, modelled as bounded contexts in NestJS'
summary: 'A full-stack monorepo (NestJS + React 19 + Prisma) for HR operations: schedules, payroll closures, deductions, charges, payments and cash-flow accounts. Same domain-driven discipline as a sibling Java/Spring backend — Hexagonal, DDD, CQRS — deliberately ported to TypeScript with a kernel of 83 in-house primitives.'
industry: 'B2B Operations · HR & Payroll'
role: 'Full-Stack Architect · Backend Lead'
year: 2025
duration: 'Active engagement, ongoing since 2025'
featured: true
tags:
  - 'Backend Architecture'
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
  - 'shared (kernel) — buses, command/query handlers, aggregate base, repository ports'
  - 'attendance — employee, schedules, payroll-closure, payment, charges, deduction'
  - 'attendance — discount-traker, targeted-discount, rate-management, schedules-counter'
  - 'cash-flow — transaction, account, transactions-counter'
metrics:
  - { value: '466', label: 'backend TypeScript files across kernel and bounded contexts' }
  - { value: '15', label: 'sub-contexts across HR and cash flow' }
  - { value: '12', label: 'typed domain primitives in payroll-closure alone' }
---

## Problem

An operations team running HR and payroll on spreadsheets and ad-hoc forms. Every cycle bled hours: irregular schedules, multi-currency wages, deductions tracked per worker, payroll closures that had to reconcile against accounting. Off-the-shelf HR SaaS modelled the easy parts and pushed the awkward ones onto the team. Reports never quite balanced.

The brief was to build a system the operations team could actually rely on — designed around the way they think about payroll, not around the way frameworks render forms.

## Constraints

- **Operations-led naming.** Every aggregate had to match a term someone in HR or finance actually used. No invented vocabulary.
- **Auditable closures.** Payroll closure events are accounting events. They must reconstruct line-by-line, not just produce a final number.
- **Multi-currency from day one.** Workers paid in different currencies. Closures had to respect this without leaking conversions into business logic.
- **Single team, fast cycles.** No room for an architecture nobody could navigate two months in.

## Approach

A monorepo with npm workspaces. NestJS backend, React 19 / Vite frontend, Prisma against PostgreSQL. Same architectural discipline as a sibling Java/Spring backend — Hexagonal, DDD, CQRS — deliberately translated to TypeScript. The patterns belong to the problem, not to the stack.

### The kernel (`core/shared`)

83 TypeScript files providing the primitives every bounded context consumes:

- **Buses** — `CommandBus`, `QueryBus`, `EventBus`, plus `CommandHandler`, `QueryHandler`, `DomainEventSubscriber`, `Command`, `Query`, `DomainEvent`, with typed `CommandNotRegisterException` and `QueryNotRegisterException` error vocabulary.
- **Domain primitives** — `Entity`, `AggregateEntity`, `AggregateRoot`, `EntityStaticFromPrimitives`, `ContextDomain`, `Cursor`, `Nullable`, `Response`, `PaginationOptions`, `PaginatedResult`.
- **Persistence ports** — `CrudRepository`, `DataSource`, `NewableClass`.
- **Cross-cutting application** — an `AuditCreator` for shared audit semantics across contexts.
- **NestJS bridge** — a `ClassInjectableDecorator` that exposes domain ports through NestJS dependency injection without making the domain classes depend on Nest.

Built from first principles for TypeScript rather than wrapping a third-party framework. The team owns every abstraction.

### Bounded contexts

**Attendance (274 files, 11 sub-contexts).** The HR core:

- `employee` — the employee aggregate with rate metadata
- `schedules` + `schedules-counter` — work schedules and aggregated counts
- `payroll-closure` — auditable payroll closures
- `payment` — payment events tied to closures
- `charges`, `deduction`, `discount-traker`, `targeted-discount` — every wage adjustment modelled as a first-class concept
- `rate-management` — pricing of work
- context-local `shared`

**Cash flow (49 files, 4 sub-contexts).** The financial counterpart:

- `transaction` — money movements
- `account` — financial accounts
- `transactions-counter` — analytics-grade aggregations
- context-local `shared`

### Showcase: the `payroll-closure` context

A representative shape of a context. Twelve typed primitives in the domain layer:

- aggregate: `PayrollClosure`
- identity: `PayrollClosureId`
- enums: `PayrollClosureType`, `PayrollClosureConcept`
- temporal: `PayrollClosureAt`
- compensation: `WorkerAmount`, `WorkerCurrency`, `WorkerHourly`, `WorkHistorical`
- query: `PayrollClosureCriteria`, `SearchPayrollClosureCriteria`
- port: `PayrollClosureRepository`

The application layer splits cleanly into commands and queries:

- `closure/` — `ClosurePayrollCommand` → `ClosurePayrollCommandHandler` → `PayrollClosureCreator`
- `remove/` — `RemovePayrollClosureCommand` → `RemovePayrollClosureCommandHandler` → `PayrollClosureRemover`
- `search/` — `SearchLastPayrollClosureQuery` → `SearchLastPayrollClosureQueryHandler` → `PayrollClosureSearcher`

Infrastructure is a single Prisma adapter (`prisma-orm-payroll-closure.repository.ts`) plus a NestJS injection module. The transport layer (`app/`, 60 files) holds NestJS controllers, DTOs validated with `class-validator`, JWT auth (passport-jwt), Swagger docs, and Excel exports via `xlsx-populate`.

## Decisions

- **Same architecture, different stack.** The DDD/CQRS discipline that worked in Java/Spring was deliberately ported to TypeScript/NestJS. Buses, value objects, command/query handlers, repository ports — same shape. Proof that the patterns travel and the rigour belongs to the architect, not the framework.
- **CQRS without operational cost.** Commands and queries are separate types with separate handlers dispatched through buses. The read side queries Prisma over the same database. CQRS-as-discipline, not CQRS-as-deployment.
- **Prisma as a deliberate adapter.** Repository ports live in the domain. Prisma implementations sit in `infrastructure/`. If Prisma changes, the domain doesn't.
- **NestJS DI bridges the layers, doesn't leak into them.** A `ClassInjectableDecorator` exposes domain ports through Nest's container without making domain classes depend on Nest annotations.
- **Frontend mirrors the contexts.** React 19 + Vite + TypeScript. Each business area has its own UI slice; payroll closure flows in the UI map to closure use cases in the backend.
- **Money is typed at the boundary.** `WorkerAmount`, `WorkerCurrency`, `WorkerHourly` exist precisely because no one should be passing primitives that conflate concepts. Excel exports and JWT auth are infrastructure concerns; the domain doesn't touch them.

## Outcome

- A full-stack HR attendance and cash-flow platform — 466 backend TypeScript files across 15 sub-bounded contexts and an 83-file kernel of CQRS / DDD primitives.
- Payroll closures execute as auditable, multi-currency, per-worker events — not as a single end-of-cycle number that has to be defended after the fact.
- The same architectural discipline applied across two stacks (Java/Spring and TypeScript/NestJS), with parallel kernel design — proof that the patterns travel and that the framework is a delivery vehicle, not a structural choice.
