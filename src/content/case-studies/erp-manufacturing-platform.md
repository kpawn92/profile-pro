---
title: 'Rebuilding the operational core of a manufacturing ERP'
summary: 'A 12-year-old monolith powering production planning, purchasing and inventory was rewritten as a hexagonal modular system — without a single day of operational downtime.'
industry: 'Industrial Manufacturing'
role: 'Lead Backend Architect'
year: 2024
duration: '14 months'
featured: true
tags: ['ERP', 'Hexagonal', 'DDD', 'Event Sourcing', 'PostgreSQL']
stack:
  - 'TypeScript · Node.js'
  - 'PostgreSQL · Redis'
  - 'RabbitMQ'
  - 'Docker · Kubernetes'
  - 'OpenTelemetry'
boundedContexts:
  - 'Production Planning'
  - 'Purchasing'
  - 'Inventory'
  - 'Quality Control'
  - 'Costing'
metrics:
  - value: '−68%'
    label: 'Order processing latency'
  - value: '12→3'
    label: 'Days for month-end close'
  - value: '0'
    label: 'Hours of downtime during cutover'
---

## Problem

A factory group operating across three sites had outgrown its ERP. The monolith had grown for over a decade, with business rules duplicated across stored procedures, batch jobs and the UI layer. New plants couldn't onboard without weeks of bespoke scripting; month-end close routinely took twelve days; and the team had stopped attempting any meaningful changes to the inventory or costing modules out of fear.

The brief was unambiguous: replace the operational core without disrupting production.

## Constraints

- **Zero operational downtime.** The factory floor runs 24/5 and a single hour of unplanned outage costs ~€80k.
- **Read-write coexistence.** Old and new systems must share a consistent view of inventory and orders during the entire migration window.
- **Auditability.** Every state change must be reconstructable for tax and ISO audits.
- **Team capacity.** Four engineers, none of whom had production experience with hexagonal architecture before the project.

## Approach

I started by mapping the implicit ubiquitous language and drawing the seams between bounded contexts with the existing operations team. We landed on five contexts (production planning, purchasing, inventory, quality, costing) with sharply drawn responsibilities and explicit anti-corruption layers wherever the old monolith remained the source of truth during the migration.

Each context was implemented as a hexagonal module:

- **Domain** layer pure — no I/O, no framework imports — with rich aggregates enforcing the invariants the business actually cared about (lot traceability, FIFO costing, BoM consistency).
- **Application** layer of explicit use cases driven by inbound ports.
- **Infrastructure** adapters wrapping Postgres, the legacy SOAP API of the old ERP, and the message bus.

Critically, the inventory module was implemented event-sourced from day one, because reconstructing stock movements after the fact had been the most painful part of every prior audit.

## Decisions

- **Strangler-fig migration over big-bang.** Each capability was routed through an API gateway that progressively shifted traffic from the legacy system to the new one — feature by feature, plant by plant.
- **Event sourcing only for inventory.** The rest of the system uses traditional state-based persistence with domain events for integration. Resisting the temptation to event-source everything saved months.
- **TDD on the domain.** Every aggregate was driven by example. Months later, when the costing rules changed mid-quarter, those tests were the difference between an afternoon and a fortnight.

## Outcome

After fourteen months the legacy system was decommissioned. Order processing latency dropped 68%. Month-end close went from twelve days to three. Most importantly, the system became *editable* again: new plants now onboard in days, and the team has shipped seven new capabilities in the year since cutover.
