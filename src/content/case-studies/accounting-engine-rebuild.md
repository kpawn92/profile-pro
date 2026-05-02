---
title: 'A double-entry accounting engine that survives the auditors'
summary: 'A SaaS for SMB accounting needed an engine that could close books without manual intervention. We rebuilt the ledger as a domain-pure module with deterministic posting and full event traceability.'
industry: 'Fintech · SaaS'
role: 'Senior Backend Engineer'
year: 2023
duration: '8 months'
featured: true
tags: ['Accounting', 'DDD', 'Clean Architecture', 'TDD', 'PostgreSQL']
stack:
  - 'TypeScript · Node.js'
  - 'PostgreSQL'
  - 'Decimal.js (custom money type)'
  - 'Vitest'
boundedContexts:
  - 'Ledger'
  - 'Period Close'
  - 'Tax Engine'
  - 'Reporting'
metrics:
  - value: '99.998%'
    label: 'Posting reconciliation rate'
  - value: '−92%'
    label: 'Manual closing entries'
  - value: '< 200ms'
    label: 'p95 posting latency'
---

## Problem

The accounting product had grown by accretion: posting rules embedded in service classes, partial double-entry validation done in the database, and a closing process that required a senior accountant to babysit every month. The team wanted to onboard larger SMBs but couldn't credibly do so until reconciliation moved from "best effort" to "deterministic."

## Constraints

- Existing customers couldn't see any change in their UI or in the chart of accounts they had configured.
- The migration of historical journals (≈ 40M entries) had to be reversible.
- Money handling had to be defensible in front of an auditor — no floating point, no implicit rounding, every conversion documented.

## Approach

The ledger was redesigned as a clean-architecture module with three pillars:

1. **A money type** modelled as a value object with explicit currency, scale and rounding policy. All arithmetic goes through it; primitives don't.
2. **A `Journal` aggregate** that enforces the double-entry invariant at construction time. You cannot persist an unbalanced journal; the type system prevents it.
3. **A posting engine** driven by declarative rules — a small DSL describing how a business event maps to debit/credit lines, validated at boot.

Use cases (post invoice, void payment, period close) are application-level orchestrators that depend only on domain ports. The Postgres adapter is purely transactional plumbing.

## Decisions

- **Determinism over flexibility.** The DSL is intentionally limited. Anything you can express posts the same way, every time, regardless of who triggers it.
- **No silent rounding.** Currency conversions produce explicit residuals that route to a configured account. Auditors love this; the team initially didn't.
- **Property-based tests for the ledger.** Generated journals proved the invariants we cared about across millions of synthetic cases — caught two bugs in two days that had hidden in production for months.

## Outcome

Posting reconciliation went from a noisy 99.7% (with daily manual fixes) to 99.998% (with effectively zero). Manual closing entries dropped 92%. The engine has handled three quarter-ends and an external audit without a single intervention from engineering.
