---
lang: es
title: 'Reconstruyendo el núcleo operativo de un ERP de manufactura'
summary: 'Un monolito de 12 años que daba soporte a planificación de producción, compras e inventario fue reescrito como sistema modular hexagonal — sin un solo día de parada operativa.'
industry: 'Manufactura industrial'
role: 'Arquitecto Backend Principal'
year: 2024
duration: '14 meses'
featured: true
tags: ['ERP', 'Hexagonal', 'DDD', 'Event Sourcing', 'PostgreSQL']
stack:
  - 'TypeScript · Node.js'
  - 'PostgreSQL · Redis'
  - 'RabbitMQ'
  - 'Docker · Kubernetes'
  - 'OpenTelemetry'
boundedContexts:
  - 'Planificación de producción'
  - 'Compras'
  - 'Inventario'
  - 'Control de calidad'
  - 'Costes'
metrics:
  - value: '−68%'
    label: 'Latencia de procesamiento de órdenes'
  - value: '12→3'
    label: 'Días para el cierre de mes'
  - value: '0'
    label: 'Horas de parada durante la migración'
---

## Problema

Un grupo industrial con tres plantas había superado los límites de su ERP. El monolito había crecido durante más de una década, con reglas de negocio duplicadas entre stored procedures, jobs por lote y la capa de UI. Las nuevas plantas no podían integrarse sin semanas de scripting a medida; el cierre de mes consumía rutinariamente doce días; y el equipo había dejado de intentar cualquier cambio sustancial en los módulos de inventario o costes por miedo.

El encargo era inequívoco: reemplazar el núcleo operativo sin interrumpir la producción.

## Restricciones

- **Cero parada operativa.** La planta opera 24/5 y una sola hora de caída no planificada cuesta ~80k€.
- **Coexistencia lectura-escritura.** El sistema antiguo y el nuevo debían compartir una visión consistente de inventario y pedidos durante toda la ventana de migración.
- **Auditabilidad.** Cada cambio de estado debía poder reconstruirse para auditorías fiscales e ISO.
- **Capacidad del equipo.** Cuatro ingenieros, ninguno con experiencia previa en producción con arquitectura hexagonal.

## Aproximación

Empecé mapeando el lenguaje ubicuo implícito y dibujando las costuras entre bounded contexts junto al equipo de operaciones. Cerramos cinco contextos (planificación de producción, compras, inventario, calidad, costes) con responsabilidades claramente delimitadas y capas anti-corrupción explícitas allí donde el monolito antiguo seguía siendo la fuente de verdad durante la migración.

Cada contexto se implementó como módulo hexagonal:

- Capa de **dominio** pura — sin I/O, sin imports de framework — con agregados ricos que aplicaban las invariantes que al negocio realmente le importaban (trazabilidad de lote, costeo FIFO, consistencia de BoM).
- Capa de **aplicación** con casos de uso explícitos guiados por puertos entrantes.
- Adaptadores de **infraestructura** envolviendo Postgres, la API SOAP legacy del ERP antiguo y el bus de mensajes.

De forma crítica, el módulo de inventario se implementó event-sourced desde el primer día, porque reconstruir movimientos de stock a posteriori había sido la parte más dolorosa de cada auditoría previa.

## Decisiones

- **Migración tipo strangler-fig en lugar de big-bang.** Cada capacidad se enrutó a través de un API gateway que progresivamente desplazaba tráfico del sistema legacy al nuevo — funcionalidad por funcionalidad, planta por planta.
- **Event sourcing solo en inventario.** El resto del sistema usa persistencia tradicional basada en estado con eventos de dominio para integración. Resistir la tentación de event-source todo nos ahorró meses.
- **TDD en el dominio.** Cada agregado se desarrolló por ejemplo. Meses después, cuando las reglas de costeo cambiaron a mitad de trimestre, esos tests fueron la diferencia entre una tarde y dos semanas.

## Resultado

A los catorce meses se decomisionó el sistema legacy. La latencia de procesamiento de órdenes cayó un 68%. El cierre de mes pasó de doce a tres días. Más importante: el sistema volvió a ser *editable* — las plantas nuevas se integran ahora en días, y el equipo ha publicado siete capacidades nuevas en el año posterior al corte.
