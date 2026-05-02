---
title: 'Inventory and warehouse operations, modelled as a real domain'
summary: 'A retail chain’s inventory module had been written as CRUD over a stock table for years. We replaced it with a true domain model: lot tracking, multi-warehouse reservations and consistent stock across channels.'
industry: 'Omnichannel Retail'
role: 'Backend Architect'
year: 2025
duration: '9 months'
featured: true
tags: ['Inventory', 'DDD', 'Hexagonal', 'Event-Driven', 'TDD']
stack:
  - 'TypeScript · NestJS'
  - 'PostgreSQL · Redis'
  - 'Kafka'
  - 'Playwright (e2e)'
boundedContexts:
  - 'Stock Ledger'
  - 'Warehouse Operations'
  - 'Reservations & Allocation'
  - 'Replenishment'
metrics:
  - value: '−74%'
    label: 'Overselling incidents'
  - value: '4×'
    label: 'Allocation throughput'
  - value: '7→2'
    label: 'Days to stock reconciliation'
---

## Problem

Stock counts diverged across the website, the ERP, and the warehouse management system. The team had layered increasingly elaborate cron jobs to "reconcile," but on Black Friday the cracks always showed: oversold orders, manual cancellations, customer-facing apologies.

The root cause wasn't bugs — it was that "stock" had never been modelled as a domain concept with rules. It was just a number in a table.

## Constraints

- Migration had to happen channel-by-channel; the website couldn't wait for the WMS to follow.
- Existing third-party integrations (3PL providers, marketplaces) expected to keep their current APIs.
- The replacement had to be drop-in for the order management workflow already in production.

## Approach

We redrew the contexts: a **Stock Ledger** (the source of truth for what exists, where, in what state), **Warehouse Operations** (movements, picks, putaways), **Reservations** (the temporary holds that prevent overselling) and **Replenishment** (when to reorder and from which supplier).

Each module exposes a port-based API. The Stock Ledger is implemented as an append-only event log — every increment, decrement, transfer or adjustment is an immutable fact — projected into read models for query.

Reservations were the hardest part. We modelled them as first-class aggregates with explicit lifecycle (held → confirmed → released | expired) and TTL semantics enforced by a domain scheduler. The website now reserves on add-to-cart, not at checkout, eliminating the race condition that drove most of the overselling.

## Decisions

- **Event log for stock, projections for everything else.** The audit trail came for free; the read side stays fast.
- **No optimistic locking on reservations.** They serialize through a single-writer per SKU using a small Postgres advisory-lock pattern — simpler reasoning, no lost updates.
- **Contract tests with the 3PLs.** We wrote them, not them. When the 3PL changed their payload format silently, we found out in CI.

## Outcome

Overselling on the website dropped 74% within a quarter. Allocation throughput at the warehouse quadrupled because the picking workflow could finally trust what the system told it. And the team retired three cron jobs whose only purpose had been masking design problems.
