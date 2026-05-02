---
title: 'Hexagonal architecture for ERPs, without the dogma'
description: 'Why ports and adapters work especially well for enterprise software — and the practical compromises that keep the team productive instead of pure.'
pubDate: 2026-03-12
readingTime: 9
tags: ['Hexagonal', 'ERP', 'Architecture']
---

Hexagonal architecture has a reputation problem. In tutorial form it looks austere — a domain core walled off by ports, surrounded by adapters, with strict rules about which arrow points where. In real ERPs, that purity is exactly what makes it valuable, but only if you're willing to make some practical compromises along the way.

## The promise

The promise of hexagonal architecture in ERP-shaped systems is straightforward: the parts that are hard to change (the business rules, the invariants the company runs on) become the parts that are *easiest* to change in code. The parts that are easy to swap (databases, queues, third-party integrations) become genuinely swappable.

That promise is rarely fulfilled by accident.

## What pure hexagonal gets right

A pure hexagonal module gives you three properties that compound:

1. **Domain tests run in milliseconds.** No DB. No HTTP. No mocking framework gymnastics. You write a test, you get an answer. Over a year, this changes how the team designs.
2. **Adapters are honest.** When a port is defined in the domain language, an adapter that doesn't fit it stands out immediately — and that pressure surfaces integration problems early instead of late.
3. **The ubiquitous language survives.** When the domain layer is allowed to speak its own vocabulary, it stops being eroded by ORM names, framework abstractions, and database column quirks.

## The compromises that matter

That said, in eight months of building an accounting engine you'll bump into things that the canonical diagrams don't account for. A few that I now treat as defaults:

### Transactions cross the application layer

The canonical advice is that transactions are an infrastructure concern. In practice, most ERP use cases are *intrinsically* transactional — "post this invoice and write the journal" is a single operation by definition. I let the application layer own a `UnitOfWork` port and orchestrate it explicitly. The domain stays pure; the use case knows it's coordinating writes.

### Ports can be coarse

A common mistake is to define a port per repository method. You end up with ten interfaces, each with one method, and a domain that reads like database access in disguise. I prefer fewer, intention-revealing ports — `JournalRepository` with `find`, `save`, and a couple of focused queries — over `IFindJournalById`, `ISaveJournal`, and so on.

### Read models live outside the domain

Reports, dashboards, exports — these don't belong in the domain. They are projections, often built directly against denormalised SQL or a search index. Forcing them through the aggregate model creates exactly the kind of "load 10,000 entities to render a list" performance disaster that gives DDD a bad name.

## When not to bother

Hexagonal is overkill for CRUD. If your system is fundamentally a form on top of a table, you don't have a domain to protect, and the ceremony will outweigh the benefits. Reach for it when there are *invariants the business cares about* that you'd want to enforce regardless of who's calling the system.

In ERPs, those invariants are everywhere. That's why it pays off.
