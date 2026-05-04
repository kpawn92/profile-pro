---
lang: es
title: 'Arquitectura hexagonal para ERPs, sin dogma'
description: 'Por qué puertos y adaptadores funcionan especialmente bien para software empresarial — y los compromisos prácticos que mantienen al equipo productivo en lugar de purista.'
pubDate: 2026-03-12
readingTime: 9
tags: ['Hexagonal', 'ERP', 'Arquitectura']
---

La arquitectura hexagonal tiene un problema de reputación. En forma de tutorial parece austera — un núcleo de dominio amurallado por puertos, rodeado de adaptadores, con reglas estrictas sobre qué flecha apunta dónde. En ERPs reales, esa pureza es exactamente lo que la hace valiosa, pero solo si estás dispuesto a hacer algunos compromisos prácticos por el camino.

## La promesa

La promesa de la arquitectura hexagonal en sistemas tipo ERP es clara: las partes que son difíciles de cambiar (las reglas de negocio, las invariantes con las que opera la empresa) se vuelven las partes *más fáciles* de cambiar en código. Las partes que son fáciles de intercambiar (bases de datos, colas, integraciones de terceros) se vuelven realmente intercambiables.

Esa promesa rara vez se cumple por accidente.

## Lo que la hexagonal pura hace bien

Un módulo hexagonal puro te da tres propiedades que se acumulan:

1. **Los tests de dominio corren en milisegundos.** Sin BD. Sin HTTP. Sin gimnasia de mocking. Escribes un test, obtienes una respuesta. A lo largo de un año, esto cambia cómo diseña el equipo.
2. **Los adaptadores son honestos.** Cuando un puerto se define en el lenguaje del dominio, un adaptador que no encaja destaca de inmediato — y esa presión saca los problemas de integración temprano en lugar de tarde.
3. **El lenguaje ubicuo sobrevive.** Cuando se permite a la capa de dominio hablar su propio vocabulario, deja de ser erosionada por nombres de ORM, abstracciones de framework y peculiaridades de columnas de BD.

## Los compromisos que importan

Dicho esto, en ocho meses construyendo un motor contable te tropezarás con cosas que los diagramas canónicos no contemplan. Algunos que ahora trato como valores por defecto:

### Las transacciones cruzan la capa de aplicación

El consejo canónico es que las transacciones son una preocupación de infraestructura. En la práctica, la mayoría de casos de uso de un ERP son *intrínsecamente* transaccionales — "registra esta factura y escribe el asiento" es una sola operación por definición. Dejo que la capa de aplicación tenga un puerto `UnitOfWork` y lo orqueste explícitamente. El dominio se mantiene puro; el caso de uso sabe que está coordinando escrituras.

### Los puertos pueden ser gruesos

Un error común es definir un puerto por método de repositorio. Acabas con diez interfaces, cada una con un método, y un dominio que se lee como acceso a base de datos disfrazado. Prefiero menos puertos, reveladores de intención — `JournalRepository` con `find`, `save` y un par de queries enfocadas — antes que `IFindJournalById`, `ISaveJournal`, etc.

### Los modelos de lectura viven fuera del dominio

Reportes, dashboards, exportaciones — no pertenecen al dominio. Son proyecciones, a menudo construidas directamente contra SQL desnormalizado o un índice de búsqueda. Forzarlos a través del modelo de agregados crea exactamente el tipo de desastre de rendimiento de "carga 10.000 entidades para renderizar una lista" que le da mala fama al DDD.

## Cuándo no molestarse

Hexagonal es excesivo para CRUD. Si tu sistema es fundamentalmente un formulario sobre una tabla, no tienes un dominio que proteger, y la ceremonia superará los beneficios. Recurre a ella cuando haya *invariantes que al negocio le importen* y quieras hacerlas cumplir independientemente de quién llame al sistema.

En los ERPs, esas invariantes están en todas partes. Por eso compensa.
