---
lang: en
title: 'A domain-driven kernel for Spring Boot — and the bounded context that proved it'
summary: 'A Spring Boot 4 / Java 25 backend refactored from a layered monolith into an explicit domain-driven architecture. Two deliverables: an in-house architectural kernel — CQRS buses, saga engine, transactional outbox, idempotence, declarative criteria, value-object primitives — and a first bounded context built on it as proof, replacing a 743-line legacy service with fifteen single-responsibility application services and a transactional saga.'
industry: 'Enterprise · B2B SaaS'
role: 'Backend Architect · Kernel & Migration Lead'
year: 2025
duration: 'Active engagement, ongoing since 2025'
featured: true
tags:
  - 'Backend Architecture'
  - 'DDD'
  - 'CQRS'
  - 'Hexagonal'
  - 'Saga'
  - 'Outbox'
  - 'Java'
  - 'Spring Boot'
stack:
  - 'Java 25 · Spring Boot 4.0.3'
  - 'Spring Web MVC · Data JPA · Validation · Security · Actuator'
  - 'Spring AMQP · WebSocket'
  - 'PostgreSQL · Flyway'
  - 'Caffeine · MapStruct · Lombok · JJWT'
  - 'springdoc/OpenAPI · Testcontainers'
  - 'Docker · Render'
boundedContexts:
  - 'shared (kernel) — buses, saga, outbox, idempotence, criteria, value objects'
  - 'sale — first migrated context'
  - 'accounting · inventory · opening · pricing · statistics'
  - 'devolution · reconciliation · tax · transfer'
  - 'catalog · master · access · assistant'
metrics:
  - { value: '184', label: 'kernel files in the in-house Spring DDD framework' }
  - { value: '171', label: 'sale-context files across 8 sub-domains' }
  - { value: '743→0', label: 'lines of legacy god-service replaced' }
---

## Problem

A Spring monolith in classical layered style — controllers calling services calling JPA repositories. Sales, inventory, accounting and reporting tangled in shared services. The pain was concentrated in a single class: 743 lines orchestrating validation, pricing, stock recalculation, accounting moves and persistence in one method tree. Touching one concern routinely broke another. Domain code was untestable in isolation. Reporting queries piggy-backed on transactional entities and degraded write performance.

The brief was to move forward without a from-scratch rewrite. Build new flows on a modern foundation; leave legacy code where it still served.

## Constraints

- **Live system.** Active production use. Migration had to be incremental, feature by feature.
- **Schema as source of truth.** `spring.jpa.hibernate.ddl-auto=validate` — the application validates the existing schema, never modifies it. Schema changes are explicit migrations, coordinated.
- **Pragmatism over purity.** The architecture had to be readable and operable by a real team — not an academic showcase.
- **No premature distribution.** A single deployable on Render. Microservices were explicitly off the table until bounded contexts had proven themselves under production load.

## Approach

Two parallel deliverables: an architectural kernel that any future bounded context could consume, and a first context built on it to prove the foundation under real production weight.

### The kernel

A 184-file foundation on top of Spring Boot. No heavyweight third-party DDD framework — built from first principles so the team understood every line. The kernel provides:

- **CQRS buses.** `InMemoryCommandBus`, `InMemoryQueryBus`, `InMemoryAsyncEventBus`, `OutboxAwareEventBus`, with an `EventBusSubscribersRegistrar` that auto-wires handlers from the Spring context. CQRS at the use-case level without the operational cost of separate write/read databases.
- **Transactional outbox.** `OutboxEventRecorder`, `OutboxPoller`, `OutboxEventEntity`, scheduling configuration, plus a `DomainEventDeserializerRegistry` for typed re-emission. Domain events survive crashes; integration is at-least-once by construction.
- **Saga engine.** `Saga`, `SagaStep`, `SagaContext`, `SagaStatus` and `SagaStepStatus` as domain primitives. Infrastructure adds `SagaEngine`, `SagaStateStore`, `SagaRecoveryService`, lifecycle WebSocket events, drift detection, JPA persistence (`SagaInstanceEntity`, `SagaStepEntity`), retention service and metrics. Long-running, recoverable, observable workflows — not invented per use case.
- **Idempotence layer.** `IdempotentEventSubscriberDecorator` plus `ProcessedEventEntity` for safe retries on async subscribers. Wrap once, reuse everywhere.
- **Declarative criteria.** `Criteria`, `Filters`, `Filter`, `FilterField`, `FilterOperator`, `FilterValue`, `Order`, `OrderBy`, `Pagination`, `Cursor`. An HTTP-side translator (`CriteriaHttpRequest`, `CriteriaFilterHttp`) accepts structured filtering at the controller boundary without leaking persistence details into the domain.
- **Value-object primitives.** `Decimal`, `Amount`, `Percentage`, `Period`, `WeekRange`, `WeekPeriod`, `YearWeek`, `Coin`, `DateUtc`, `Uuid`, plus base classes (`StringValueObject`, `IntValueObject`, `BooleanValueObject`, `EnumValueObject`) and a typed error vocabulary (`InvalidArgumentError`, `DateOutOfWeekRangeError`).
- **Recalculation engines.** Generic accounting and inventory recalculation primitives, plus shared projections used by every context that touches stock or balances.
- **An in-house notification context** as living documentation. A complete bounded context — domain, application, infrastructure with controllers, persistence and WebSocket delivery — exercising every primitive. New contexts copy its structure.

### The bounded context that proved it

Sales was migrated first, deliberately. It concentrated the highest risk and the highest business value: transactional persistence, stock recalculation, accounting moves, inventory validation, taxes. If the kernel survived sales, it would survive everything else.

The current shape:

- **171 files** across 8 sub-contexts (operation, adjustment, accountMove, productMove, product, rebalance, account, customer). The operation subdomain alone holds 143 files.
- **Domain layer** — zero Spring imports. Aggregates (`OperationSale`, `OperationSaleHistory`), repository ports, and typed value objects for every measurement that mattered: `ChangeAmount`, `DiscountByRounding`, `PaymentAmount`, `PaymentExchangeRate`, `PaymentSystemAmount`, `TipAmount`, `TotalPaid`, `TotalToPay`, `DueDate`, `OperationReference`. Errors as domain types: `SaleEditWindowExpiredException`. Domain services like `SaleStockApplier`.
- **Domain events** — `OperationSaleCreated`, `OperationSaleBooked`, `OperationSaleRequestedStock`, `OperationSaleRemoved`. Each has a dedicated outbox deserializer and async subscriber.
- **Application layer** — fifteen single-responsibility services orchestrated by a single composer (`OperationSaleCreator`):
  - validation: `SaleRequestValidationService`, `SaleClientTotalsValidationService`, `SaleStockValidationService`, `SaleUnitConversionProvider`
  - pricing & accounting: `SalePricingCalculator`, `SalePricingPlan`, `SalePricingPlanner`, `SaleSettlementService`, `SaleTaxPolicy`, `SaleAccountingService`
  - infrastructure-facing resolvers: `SaleAccountResolver`, `SalePartnerResolver`, `SaleCurrentPeriodProvider`, `SaleRoundingSettingsProvider`, `SaleReferenceCatalog`
  - plus a transactional `CreateOperationSaleSaga` built on the kernel saga engine
- **Infrastructure** — REST controller, query controller, WebSocket controller for live partner selection, JPA persistence with parallel in-memory implementations for tests, JDBC read models for analytics-grade queries, seven Caffeine-backed cache adapters with explicit invalidation and metrics, an async saga worker with its own `ExecutorService`, and toggleable post-processing controlled by `SALE_ASYNC_*` env flags.

## Decisions

- **Modular monolith over microservices.** A single deployable with strong internal boundaries. The architectural roadmap is explicit: monolith → extract contexts to services where pain justifies it → event-driven where the domain demands it. No premature distribution.
- **Build the kernel first, propagate it last.** Every infrastructure pattern that more than one context would need — buses, outbox, saga, idempotence, criteria, value-object base classes — was built in the kernel before any bounded context could justify shortcuts. New contexts cost less because the foundation paid the upfront tax.
- **Progressive coexistence with legacy.** The 743-line legacy service kept serving production while the new flow stabilised. Anti-corruption layers (`PartnerRepositorySalePartnerResolver`, `AccountServiceSaleAccountResolver`, `ProductServiceSaleCostProvider`, `ProductServiceSaleStockProvider`) bridged the new domain to legacy modules. The legacy code retired only when its replacement had proven itself.
- **JDBC for read models.** Analytics queries (sales statistics, accounting journal, ledger) hit denormalised projections via JDBC. The transactional model stays focused; reporting stays fast. Each read model is a deliberate design decision, not an accidental query optimisation.
- **Async post-processing toggleable per environment.** Sale post-processing runs sync, async, or transactional depending on `SALE_ASYNC_*` flags. Non-negotiable in production: degraded modes for incidents, full async in steady state.
- **In-house notification context as living documentation.** Rather than describing how to use the kernel in prose, the kernel ships with a full bounded context that exercises every primitive. New contexts copy its structure.
- **Documentation pairs with code.** Roughly seventy markdown files cover migration plans, bounded-context implementations, refactor narratives, period-close, sagas, transfer idempotency, statistics. The handoff document — continuously updated, ~200KB — is the operational source of truth between work sessions.

## Outcome

- A reusable architectural kernel — 184 files of CQRS buses, saga engine, outbox, idempotence, criteria and value objects — that every future bounded context consumes.
- A first context (sales, 171 files across 8 sub-domains) proven on that kernel, replacing a 743-line legacy god-service with fifteen single-responsibility application services, a saga, four domain events delivered via outbox, and seven explicitly invalidated cache layers with metrics.
- Twelve more bounded contexts already scaffolded on the same foundation and progressively migrated.
- The architecture stopped being tribal knowledge: anyone joining the project can read the documentation and reason about the system before opening the code.
