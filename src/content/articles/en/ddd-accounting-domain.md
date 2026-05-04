---
lang: en
title: 'Modelling an accounting domain that auditors actually trust'
description: 'A walkthrough of the core invariants behind a double-entry ledger — and how to encode them so the type system and the test suite, not the developer, enforce them.'
pubDate: 2026-02-04
readingTime: 11
tags: ['DDD', 'Accounting', 'Domain Modelling']
---

Most accounting bugs are not bugs in arithmetic. They're bugs in modelling.

A floating-point error in a sum is easy to find and easier to fix. A subtle confusion between *transaction date* and *posting date*, or between *gross* and *net* amounts at the boundary of a tax calculation, can run undetected for quarters and surface only when an auditor asks an inconvenient question.

This is why the accounting domains I've worked on were never modelled by mapping database columns to objects. They start from invariants.

## The invariants worth encoding

Three invariants reliably show up in any double-entry system:

1. **Every journal balances.** Sum of debits equals sum of credits, in the same currency, at the same scale.
2. **Money has currency.** A `Money` of EUR cannot be added to a `Money` of USD without an explicit conversion that produces an explicit residual.
3. **Posted journals are immutable.** Corrections happen by reversing entries, not by editing history.

If your model lets you violate any of these in the type system, you'll violate them in production.

## Encoding them

Here's a sketch of what that looks like in TypeScript — minimal, illustrative, not production-grade:

```ts
class Money {
  private constructor(
    readonly amount: bigint,         // minor units
    readonly currency: Currency,
    readonly scale: number,
  ) {}

  static of(major: string, currency: Currency): Money { /* … */ }

  plus(other: Money): Money {
    if (other.currency !== this.currency) {
      throw new CurrencyMismatch(this.currency, other.currency);
    }
    return new Money(this.amount + other.amount, this.currency, this.scale);
  }

  negate(): Money {
    return new Money(-this.amount, this.currency, this.scale);
  }
}
```

```ts
class Journal {
  private constructor(
    readonly id: JournalId,
    readonly date: PostingDate,
    readonly lines: ReadonlyArray<Line>,
  ) {}

  static draft(date: PostingDate, lines: Line[]): Journal {
    const sum = lines.reduce(
      (acc, l) => acc.plus(l.signedAmount()),
      Money.zero(lines[0].amount.currency),
    );
    if (!sum.isZero()) {
      throw new UnbalancedJournal(sum);
    }
    return new Journal(JournalId.next(), date, lines);
  }
}
```

The interesting line is the constructor being private. There is no path to constructing an unbalanced journal. The compiler can't reach it; reflection can't reach it; the test suite doesn't need a "what if it's unbalanced" case for save-and-load, because it's unrepresentable.

## The vocabulary problem

The harder part of the work isn't writing this code. It's getting the vocabulary right.

In the codebases I've inherited that *worked*, "post" always means the same thing. "Reverse" always means the same thing. "Voided" is distinct from "reversed" and the team can articulate why. The chart of accounts is named the same way in the codebase as it is on the wall in finance.

In the codebases I've inherited that *didn't* work, those words are inconsistent across files, and developers and accountants use them to mean different things in the same conversation.

That's not a code problem. It's the problem code is supposed to solve.

## The reward

Done well, an accounting domain becomes a tool for thinking — not just for computing. Finance teams start asking "what does the system call this?" before they design a process. New rules become local edits to a small piece of the model. And, when an auditor walks in with a list of transactions and a question, you can answer it.

That's worth the modelling time, every time.
