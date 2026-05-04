---
lang: es
title: 'Un motor contable de partida doble que sobrevive a los auditores'
summary: 'Un SaaS de contabilidad para pymes necesitaba un motor capaz de cerrar libros sin intervención manual. Reconstruimos el ledger como módulo de dominio puro con asiento determinista y trazabilidad completa por eventos.'
industry: 'Fintech · SaaS'
role: 'Senior Backend Engineer'
year: 2023
duration: '8 meses'
featured: true
tags: ['Contabilidad', 'DDD', 'Clean Architecture', 'TDD', 'PostgreSQL']
stack:
  - 'TypeScript · Node.js'
  - 'PostgreSQL'
  - 'Decimal.js (tipo Money propio)'
  - 'Vitest'
boundedContexts:
  - 'Ledger'
  - 'Cierre de período'
  - 'Motor fiscal'
  - 'Reportes'
metrics:
  - value: '99,998%'
    label: 'Tasa de reconciliación de asientos'
  - value: '−92%'
    label: 'Asientos manuales de cierre'
  - value: '< 200ms'
    label: 'Latencia p95 de asiento'
---

## Problema

El producto contable había crecido por acreción: reglas de asiento embebidas en clases de servicio, validación parcial de partida doble realizada en la base de datos, y un proceso de cierre que requería que un contable senior lo babysiteara cada mes. El equipo quería incorporar pymes mayores pero no podía hacerlo con credibilidad mientras la reconciliación pasara de "best effort" a "determinista".

## Restricciones

- Los clientes existentes no podían percibir cambios en su UI ni en el plan de cuentas que tenían configurado.
- La migración de los asientos históricos (≈ 40M entradas) tenía que ser reversible.
- El manejo del dinero tenía que ser defendible ante un auditor — sin coma flotante, sin redondeos implícitos, cada conversión documentada.

## Aproximación

El ledger se rediseñó como módulo de clean architecture con tres pilares:

1. **Un tipo Money** modelado como value object con divisa, escala y política de redondeo explícitas. Toda la aritmética pasa por él; los primitivos no.
2. **Un agregado `Journal`** que aplica la invariante de partida doble en el momento de la construcción. No se puede persistir un asiento desbalanceado; el sistema de tipos lo impide.
3. **Un motor de asientos** dirigido por reglas declarativas — un pequeño DSL que describe cómo un evento de negocio mapea a líneas de debe/haber, validado al arranque.

Los casos de uso (registrar factura, anular pago, cierre de período) son orquestadores de aplicación que dependen únicamente de puertos del dominio. El adaptador de Postgres es plomería transaccional pura.

## Decisiones

- **Determinismo sobre flexibilidad.** El DSL es intencionalmente limitado. Cualquier cosa expresable se asienta de la misma forma, siempre, sin importar quién la dispare.
- **Sin redondeos silenciosos.** Las conversiones de divisa producen residuos explícitos que se enrutan a una cuenta configurada. Los auditores lo aman; el equipo, al principio, no.
- **Tests basados en propiedades para el ledger.** Asientos generados probaron las invariantes que nos importaban a lo largo de millones de casos sintéticos — capturaron dos bugs en dos días que llevaban meses ocultos en producción.

## Resultado

La reconciliación de asientos pasó de un ruidoso 99,7% (con arreglos manuales diarios) al 99,998% (efectivamente cero). Los asientos manuales de cierre cayeron un 92%. El motor ha gestionado tres cierres trimestrales y una auditoría externa sin una sola intervención de ingeniería.
