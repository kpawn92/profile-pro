---
lang: es
title: 'Inventario y operaciones de almacén, modelados como un dominio real'
summary: 'El módulo de inventario de una cadena retail llevaba años escrito como CRUD sobre una tabla de stock. Lo reemplazamos por un modelo de dominio real: trazabilidad por lote, reservas multi-almacén y stock consistente entre canales.'
industry: 'Retail omnicanal'
role: 'Arquitecto Backend'
year: 2025
duration: '9 meses'
featured: true
tags: ['Inventario', 'DDD', 'Hexagonal', 'Event-Driven', 'TDD']
stack:
  - 'TypeScript · NestJS'
  - 'PostgreSQL · Redis'
  - 'Kafka'
  - 'Playwright (e2e)'
boundedContexts:
  - 'Stock Ledger'
  - 'Operaciones de almacén'
  - 'Reservas y asignación'
  - 'Reposición'
metrics:
  - value: '−74%'
    label: 'Incidentes de sobreventa'
  - value: '4×'
    label: 'Throughput de asignación'
  - value: '7→2'
    label: 'Días para reconciliar stock'
---

## Problema

Los conteos de stock divergían entre la web, el ERP y el sistema de gestión de almacén. El equipo había superpuesto cron jobs cada vez más elaborados para "reconciliar", pero en Black Friday las grietas siempre se notaban: pedidos sobrevendidos, cancelaciones manuales, disculpas al cliente.

La causa raíz no eran bugs — era que el "stock" nunca había sido modelado como un concepto de dominio con reglas. Era solo un número en una tabla.

## Restricciones

- La migración tenía que ocurrir canal por canal; la web no podía esperar a que el WMS la siguiera.
- Las integraciones con terceros (operadores 3PL, marketplaces) esperaban mantener sus APIs actuales.
- El reemplazo tenía que ser drop-in para el flujo de gestión de pedidos ya en producción.

## Aproximación

Redibujamos los contextos: un **Stock Ledger** (la fuente de verdad sobre lo que existe, dónde, en qué estado), **Operaciones de almacén** (movimientos, picks, ubicaciones), **Reservas** (las retenciones temporales que evitan la sobreventa) y **Reposición** (cuándo reordenar y a qué proveedor).

Cada módulo expone una API basada en puertos. El Stock Ledger se implementó como un log de eventos append-only — cada incremento, decremento, transferencia o ajuste es un hecho inmutable — proyectado a modelos de lectura para consulta.

Las reservas fueron la parte más dura. Las modelamos como agregados de primera clase con ciclo de vida explícito (held → confirmed → released | expired) y semántica TTL impuesta por un scheduler de dominio. La web ahora reserva al añadir al carrito, no en checkout, eliminando la race condition que causaba la mayoría de la sobreventa.

## Decisiones

- **Log de eventos para stock, proyecciones para todo lo demás.** El audit trail vino gratis; el lado de lectura se mantiene rápido.
- **Sin locking optimista en reservas.** Se serializan a través de un único escritor por SKU usando un patrón ligero de advisory lock de Postgres — razonamiento más simple, sin lost updates.
- **Tests de contrato con los 3PL.** Los escribimos nosotros, no ellos. Cuando el 3PL cambió silenciosamente el formato de su payload, lo descubrimos en CI.

## Resultado

La sobreventa en la web cayó un 74% en un trimestre. El throughput de asignación en almacén se cuadruplicó porque el flujo de picking podía finalmente confiar en lo que el sistema le decía. Y el equipo retiró tres cron jobs cuyo único propósito había sido enmascarar problemas de diseño.
