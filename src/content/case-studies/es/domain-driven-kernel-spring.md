---
lang: es
title: 'Un kernel orientado a dominio para Spring Boot — y el bounded context que lo demostró'
summary: 'Un backend Spring Boot 4 / Java 25 refactorizado de un monolito en capas a una arquitectura orientada al dominio. Dos entregables: un kernel arquitectónico propio — buses CQRS, motor de sagas, transactional outbox, idempotencia, criteria declarativo y primitivos de value object — y un primer bounded context construido sobre él como prueba, sustituyendo un servicio legacy de 743 líneas por quince servicios de aplicación con responsabilidad única y una saga transaccional.'
industry: 'Empresarial · B2B SaaS'
role: 'Arquitecto Backend · Líder de kernel y migración'
year: 2025
duration: 'Compromiso activo, en curso desde 2025'
featured: true
tags:
  - 'Arquitectura Backend'
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
  - 'shared (kernel) — buses, saga, outbox, idempotencia, criteria, value objects'
  - 'sale — primer contexto migrado'
  - 'accounting · inventory · opening · pricing · statistics'
  - 'devolution · reconciliation · tax · transfer'
  - 'catalog · master · access · assistant'
metrics:
  - { value: '184', label: 'archivos del kernel (framework DDD propio sobre Spring)' }
  - { value: '171', label: 'archivos del contexto de ventas en 8 subdominios' }
  - { value: '743→0', label: 'líneas del god-service legacy reemplazadas' }
---

## Problema

Un monolito Spring en estilo clásico de capas — controladores que llaman a servicios que llaman a repositorios JPA. Ventas, inventario, contabilidad y reporting enredados en servicios compartidos. El dolor estaba concentrado en una sola clase: 743 líneas orquestando validación, pricing, recálculo de stock, movimientos contables y persistencia en un único árbol de métodos. Tocar una preocupación rompía rutinariamente otra. El código de dominio era inejecutable de forma aislada. Las consultas de reporting iban montadas sobre las entidades transaccionales y degradaban el rendimiento de escritura.

El encargo era avanzar sin reescribir desde cero. Construir los flujos nuevos sobre cimientos modernos; dejar el código legacy donde aún servía.

## Restricciones

- **Sistema en producción.** Uso real activo. La migración tenía que ser incremental, funcionalidad por funcionalidad.
- **Esquema como fuente de verdad.** `spring.jpa.hibernate.ddl-auto=validate` — la aplicación valida el esquema existente, nunca lo modifica. Los cambios de esquema son migraciones explícitas, coordinadas.
- **Pragmatismo sobre pureza.** La arquitectura tenía que ser legible y operable por un equipo real — no un escaparate académico.
- **Sin distribución prematura.** Un único deployable en Render. Los microservicios estaban explícitamente fuera de la mesa hasta que los bounded contexts demostraran su valor bajo carga real.

## Aproximación

Dos entregables en paralelo: un kernel arquitectónico que cualquier bounded context futuro pudiera consumir, y un primer contexto construido sobre él para probar la base bajo peso real de producción.

### El kernel

Una base de 184 archivos sobre Spring Boot. Sin framework DDD pesado de terceros — construido desde primeros principios para que el equipo entendiera cada línea. El kernel ofrece:

- **Buses CQRS.** `InMemoryCommandBus`, `InMemoryQueryBus`, `InMemoryAsyncEventBus`, `OutboxAwareEventBus`, con un `EventBusSubscribersRegistrar` que cablea handlers automáticamente desde el contexto Spring. CQRS a nivel de caso de uso sin el coste operativo de bases de datos separadas para escritura y lectura.
- **Transactional outbox.** `OutboxEventRecorder`, `OutboxPoller`, `OutboxEventEntity`, configuración de scheduling, más un `DomainEventDeserializerRegistry` para reemisión tipada. Los eventos de dominio sobreviven a caídas; la integración es at-least-once por construcción.
- **Motor de sagas.** `Saga`, `SagaStep`, `SagaContext`, `SagaStatus` y `SagaStepStatus` como primitivos de dominio. La infraestructura añade `SagaEngine`, `SagaStateStore`, `SagaRecoveryService`, eventos de ciclo de vida por WebSocket, detección de drift, persistencia JPA (`SagaInstanceEntity`, `SagaStepEntity`), servicio de retención y métricas. Workflows largos, recuperables, observables — no inventados por caso de uso.
- **Capa de idempotencia.** `IdempotentEventSubscriberDecorator` más `ProcessedEventEntity` para reintentos seguros en suscriptores asíncronos. Se envuelve una vez, se reutiliza en todas partes.
- **Criteria declarativo.** `Criteria`, `Filters`, `Filter`, `FilterField`, `FilterOperator`, `FilterValue`, `Order`, `OrderBy`, `Pagination`, `Cursor`. Un traductor en el lado HTTP (`CriteriaHttpRequest`, `CriteriaFilterHttp`) acepta filtrado estructurado en la frontera del controlador sin filtrar detalles de persistencia al dominio.
- **Primitivos de value object.** `Decimal`, `Amount`, `Percentage`, `Period`, `WeekRange`, `WeekPeriod`, `YearWeek`, `Coin`, `DateUtc`, `Uuid`, más clases base (`StringValueObject`, `IntValueObject`, `BooleanValueObject`, `EnumValueObject`) y un vocabulario tipado de errores (`InvalidArgumentError`, `DateOutOfWeekRangeError`).
- **Motores de recálculo.** Primitivos genéricos de recálculo contable y de inventario, más proyecciones compartidas que usa cada contexto que toca stock o balances.
- **Un contexto de notificaciones in-house** como documentación viva. Un bounded context completo — dominio, aplicación, infraestructura con controladores, persistencia y entrega por WebSocket — que ejerce cada primitivo. Los contextos nuevos copian su estructura.

### El bounded context que lo demostró

Ventas se migró primero, deliberadamente. Concentraba el mayor riesgo y el mayor valor de negocio: persistencia transaccional, recálculo de stock, movimientos contables, validación de inventario, impuestos. Si el kernel sobrevivía a ventas, sobreviviría al resto.

El estado actual:

- **171 archivos** en 8 subcontextos (operation, adjustment, accountMove, productMove, product, rebalance, account, customer). El subdominio de operation por sí solo tiene 143 archivos.
- **Capa de dominio** — cero imports de Spring. Agregados (`OperationSale`, `OperationSaleHistory`), puertos de repositorio, y value objects tipados para cada medida que importaba: `ChangeAmount`, `DiscountByRounding`, `PaymentAmount`, `PaymentExchangeRate`, `PaymentSystemAmount`, `TipAmount`, `TotalPaid`, `TotalToPay`, `DueDate`, `OperationReference`. Errores como tipos del dominio: `SaleEditWindowExpiredException`. Servicios de dominio como `SaleStockApplier`.
- **Eventos de dominio** — `OperationSaleCreated`, `OperationSaleBooked`, `OperationSaleRequestedStock`, `OperationSaleRemoved`. Cada uno tiene un deserializador outbox y un suscriptor asíncrono dedicados.
- **Capa de aplicación** — quince servicios con responsabilidad única orquestados por un único compositor (`OperationSaleCreator`):
  - validación: `SaleRequestValidationService`, `SaleClientTotalsValidationService`, `SaleStockValidationService`, `SaleUnitConversionProvider`
  - pricing y contabilidad: `SalePricingCalculator`, `SalePricingPlan`, `SalePricingPlanner`, `SaleSettlementService`, `SaleTaxPolicy`, `SaleAccountingService`
  - resolvers hacia la infraestructura: `SaleAccountResolver`, `SalePartnerResolver`, `SaleCurrentPeriodProvider`, `SaleRoundingSettingsProvider`, `SaleReferenceCatalog`
  - más una `CreateOperationSaleSaga` transaccional construida sobre el motor de sagas del kernel
- **Infraestructura** — controlador REST, controlador de queries, controlador WebSocket para selección de partner en vivo, persistencia JPA con implementaciones en memoria paralelas para tests, read models JDBC para consultas analíticas, siete adaptadores de caché Caffeine con invalidación explícita y métricas, un worker asíncrono de saga con su propio `ExecutorService`, y post-procesamiento conmutable controlado por flags `SALE_ASYNC_*`.

## Decisiones

- **Monolito modular sobre microservicios.** Un único deployable con fronteras internas fuertes. La hoja de ruta arquitectónica es explícita: monolito → extraer contextos a servicios cuando el dolor lo justifique → event-driven cuando el dominio lo exija. Sin distribución prematura.
- **Construir el kernel primero, propagarlo después.** Cada patrón de infraestructura que más de un contexto fuera a necesitar — buses, outbox, saga, idempotencia, criteria, clases base de value object — se construyó en el kernel antes de que ningún bounded context pudiera justificar atajos. Los contextos nuevos cuestan menos porque la base ya pagó el coste inicial.
- **Coexistencia progresiva con el legacy.** El servicio legacy de 743 líneas siguió sirviendo en producción mientras el nuevo flujo se estabilizaba. Capas anti-corrupción (`PartnerRepositorySalePartnerResolver`, `AccountServiceSaleAccountResolver`, `ProductServiceSaleCostProvider`, `ProductServiceSaleStockProvider`) puentearon el nuevo dominio con los módulos legacy. El código antiguo se retiró solo cuando su reemplazo había demostrado su valor.
- **JDBC para los read models.** Las consultas analíticas (estadísticas de venta, diario contable, mayor) impactan proyecciones desnormalizadas vía JDBC. El modelo transaccional permanece enfocado; el reporting permanece rápido. Cada read model es una decisión de diseño deliberada, no una optimización accidental de queries.
- **Post-procesamiento asíncrono conmutable por entorno.** El post-procesamiento de venta corre sync, async o transaccional según los flags `SALE_ASYNC_*`. No negociable en producción: modos degradados para incidentes, async completo en estado estable.
- **Contexto de notificaciones in-house como documentación viva.** En lugar de describir cómo usar el kernel en prosa, el kernel viene con un bounded context completo que ejerce cada primitivo. Los contextos nuevos copian su estructura.
- **La documentación va con el código.** Cerca de setenta archivos markdown cubren planes de migración, implementaciones de bounded contexts, narrativas de refactor, cierre de período, sagas, idempotencia de transferencias, estadísticas. El documento de handoff — actualizado continuamente, ~200KB — es la fuente de verdad operativa entre sesiones.

## Resultado

- Un kernel arquitectónico reutilizable — 184 archivos de buses CQRS, motor de sagas, outbox, idempotencia, criteria y value objects — que cada bounded context futuro consume.
- Un primer contexto (ventas, 171 archivos en 8 subdominios) probado sobre ese kernel, sustituyendo un god-service legacy de 743 líneas por quince servicios de aplicación con responsabilidad única, una saga, cuatro eventos de dominio entregados vía outbox, y siete capas de caché con invalidación explícita y métricas.
- Doce bounded contexts más ya esqueletados sobre la misma base y migrados progresivamente.
- La arquitectura dejó de ser conocimiento tribal: cualquiera que se incorpora puede leer la documentación y razonar sobre el sistema antes de abrir el código.
