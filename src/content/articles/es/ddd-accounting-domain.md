---
lang: es
title: 'Modelar un dominio contable en el que los auditores realmente confíen'
description: 'Un recorrido por las invariantes esenciales detrás de un libro mayor de partida doble — y cómo codificarlas para que el sistema de tipos y la suite de tests, no el desarrollador, las hagan cumplir.'
pubDate: 2026-02-04
readingTime: 11
tags: ['DDD', 'Contabilidad', 'Modelado de dominio']
---

La mayoría de los bugs contables no son bugs de aritmética. Son bugs de modelado.

Un error de coma flotante en una suma es fácil de encontrar y más fácil de arreglar. Una confusión sutil entre *fecha de transacción* y *fecha de asiento*, o entre cantidades *brutas* y *netas* en la frontera de un cálculo fiscal, puede correr sin detectar durante trimestres y aflorar solo cuando un auditor formula una pregunta inconveniente.

Por eso los dominios contables en los que he trabajado nunca se modelaron mapeando columnas de base de datos a objetos. Empiezan desde invariantes.

## Las invariantes que merece la pena codificar

Tres invariantes aparecen de forma fiable en cualquier sistema de partida doble:

1. **Cada asiento cuadra.** La suma de débitos iguala la suma de créditos, en la misma divisa, a la misma escala.
2. **El dinero tiene divisa.** Un `Money` en EUR no puede sumarse a un `Money` en USD sin una conversión explícita que produzca un residuo explícito.
3. **Los asientos contabilizados son inmutables.** Las correcciones ocurren revirtiendo entradas, no editando el histórico.

Si tu modelo te permite violar cualquiera de estas en el sistema de tipos, las violarás en producción.

## Codificándolas

Aquí va un esbozo de cómo se ve en TypeScript — mínimo, ilustrativo, no listo para producción:

```ts
class Money {
  private constructor(
    readonly amount: bigint,         // unidades menores
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

La línea interesante es que el constructor es privado. No hay camino para construir un asiento desbalanceado. El compilador no puede llegar; la reflexión no puede llegar; la suite de tests no necesita un caso "qué pasa si está desbalanceado" para guardar y cargar, porque es irrepresentable.

## El problema del vocabulario

La parte más dura del trabajo no es escribir este código. Es acertar con el vocabulario.

En las bases de código que he heredado que *funcionaban*, "registrar" significa siempre lo mismo. "Revertir" significa siempre lo mismo. "Anulado" es distinto de "revertido" y el equipo puede articular por qué. El plan de cuentas se nombra igual en el código que en la pared del departamento financiero.

En las que *no funcionaban*, esas palabras son inconsistentes a lo largo de archivos, y desarrolladores y contables las usan con significados distintos en la misma conversación.

Eso no es un problema de código. Es el problema que el código se supone que debe resolver.

## La recompensa

Bien hecho, un dominio contable se vuelve una herramienta para pensar — no solo para computar. Los equipos de finanzas empiezan a preguntar "¿cómo llama el sistema a esto?" antes de diseñar un proceso. Las nuevas reglas se vuelven ediciones locales en una pequeña parte del modelo. Y, cuando un auditor entra con una lista de transacciones y una pregunta, puedes responderla.

Eso vale el tiempo de modelado, siempre.
