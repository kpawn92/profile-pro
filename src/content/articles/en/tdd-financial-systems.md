---
lang: en
title: 'TDD as a design tool for financial systems'
description: 'Why test-driven development pays unusually high dividends in financial software — and how the failure modes of a TDD-less codebase look in practice.'
pubDate: 2026-01-15
readingTime: 7
tags: ['TDD', 'Testing', 'Architecture']
---

I've inherited a lot of financial codebases. The healthiest ones were not the ones with the most tests. They were the ones whose tests had been written *first*, while the design was still soft.

This is not a coincidence.

## What TDD really pressures

TDD is sold as a way to verify behaviour. Its real value is the design feedback. When you write the test first, you immediately feel the cost of bad seams: hard-to-construct objects, untestable side effects, hidden dependencies, mutable global state. The pain shows up before the code goes into production.

In financial software, those pains compound. A function that's hard to test in isolation is also a function whose behaviour is hard to *reason about* — and reasoning is the only currency you have when an auditor asks why a number changed.

## What you stop tolerating

After a few months of TDD on a domain core, certain patterns become visibly intolerable:

- **Static dependencies on time.** `new Date()` inside a domain method is a test smell long before it's a correctness smell. You inject a clock, and now your period-close logic is testable across year-end without time-traveling the OS.
- **Database-coupled invariants.** "It can't be invalid because the DB constraint won't let it" is a test you can't write. The invariant moves into the aggregate constructor, and the constraint becomes a defence-in-depth.
- **Magical service locators.** They make tests require fixture cathedrals. You stop using them.

## What TDD doesn't fix

TDD will not save you from a wrong domain model. If your `Order` aggregate doesn't reflect the way the business actually runs orders, all the green tests in the world will still ship the wrong software faster.

The implication is that TDD pairs well with deliberate domain modelling. The cycle becomes: model → test → code → refine model. Each loop tightens the alignment between the code and the way the people running the business actually think about it.

## The pyramid that survives a quarter-end

A healthy test suite for a financial system looks something like this:

- **A thick base of fast domain tests.** Most logic, most invariants, no I/O. Should run in single-digit seconds on a developer machine.
- **A focused band of integration tests.** Real database, real ORM, real adapter implementations. Catch the stuff the domain tests can't see.
- **A thin layer of e2e or contract tests.** Reservations are confirmed at checkout. Tax codes are correctly applied to a sample basket. The 3PL contract still matches what they're sending us.

What you specifically want to *avoid* is the inverted pyramid — a thick layer of brittle e2e tests on top of a thin domain layer. Those suites die slowly and noisily, and by the time a test fails, the cause is three services and a queue away.

## Why it's worth the discipline

TDD is genuinely harder than not doing TDD, and anyone who pretends otherwise has either not really tried it or is selling something. What it buys you, particularly in financial software, is the freedom to *change* the system without holding your breath.

That freedom is what separates a codebase the team is proud of from one they're afraid of. In systems that the business depends on, it's not optional.
