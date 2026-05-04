---
lang: es
title: 'TDD como herramienta de diseño para sistemas financieros'
description: 'Por qué el desarrollo dirigido por tests rinde dividendos inusualmente altos en software financiero — y cómo se ven en la práctica los modos de fallo de una base de código sin TDD.'
pubDate: 2026-01-15
readingTime: 7
tags: ['TDD', 'Testing', 'Arquitectura']
---

He heredado bastantes bases de código financiero. Las más sanas no eran las que tenían más tests. Eran aquellas cuyos tests se habían escrito *primero*, mientras el diseño aún era moldeable.

Esto no es coincidencia.

## Lo que TDD realmente presiona

TDD se vende como una forma de verificar el comportamiento. Su valor real es el feedback de diseño. Cuando escribes el test primero, sientes inmediatamente el coste de las costuras malas: objetos difíciles de construir, side effects no testeables, dependencias ocultas, estado global mutable. El dolor aparece antes de que el código llegue a producción.

En software financiero, ese dolor se acumula. Una función difícil de testear en aislamiento es también una función cuyo comportamiento es difícil de *razonar* — y el razonamiento es la única moneda que tienes cuando un auditor te pregunta por qué cambió un número.

## Lo que dejas de tolerar

Tras unos meses de TDD sobre un núcleo de dominio, ciertos patrones se vuelven visiblemente intolerables:

- **Dependencias estáticas del tiempo.** `new Date()` dentro de un método de dominio es un mal olor de testing mucho antes de ser un mal olor de corrección. Inyectas un reloj y, de pronto, tu lógica de cierre de período se puede testear cruzando fin de año sin viajar en el tiempo del SO.
- **Invariantes acopladas a la base de datos.** "No puede ser inválido porque la constraint de la BD no lo permite" es un test que no puedes escribir. La invariante se traslada al constructor del agregado y la constraint se vuelve defensa en profundidad.
- **Localizadores de servicios mágicos.** Hacen que los tests requieran catedrales de fixtures. Dejas de usarlos.

## Lo que TDD no arregla

TDD no te salvará de un modelo de dominio incorrecto. Si tu agregado `Order` no refleja la forma en que el negocio realmente gestiona pedidos, todos los tests verdes del mundo seguirán enviando software equivocado más rápido.

La implicación es que TDD se empareja bien con un modelado de dominio deliberado. El ciclo se vuelve: modelar → testear → codificar → refinar el modelo. Cada vuelta aprieta la alineación entre el código y la forma en que la gente que opera el negocio realmente piensa.

## La pirámide que sobrevive a un cierre trimestral

Una suite de tests sana para un sistema financiero se ve más o menos así:

- **Una base gruesa de tests de dominio rápidos.** Toda la lógica, todas las invariantes, sin I/O. Debe correr en segundos en una máquina de desarrollo.
- **Una banda enfocada de tests de integración.** Base de datos real, ORM real, adaptadores reales. Capturan lo que los tests de dominio no pueden ver.
- **Una capa fina de tests e2e o de contrato.** Las reservas se confirman en checkout. Los códigos fiscales se aplican correctamente a una cesta de muestra. El contrato del 3PL todavía coincide con lo que nos están enviando.

Lo que específicamente quieres *evitar* es la pirámide invertida — una capa gruesa de tests e2e frágiles sobre una capa de dominio fina. Esas suites mueren lentas y ruidosas, y para cuando un test falla, la causa está a tres servicios y una cola de distancia.

## Por qué merece la pena la disciplina

TDD es genuinamente más difícil que no hacer TDD, y cualquiera que pretenda lo contrario o no lo ha probado de verdad o te está vendiendo algo. Lo que te compra, particularmente en software financiero, es la libertad de *cambiar* el sistema sin contener la respiración.

Esa libertad es lo que separa una base de código de la que el equipo está orgulloso de una a la que tiene miedo. En sistemas de los que el negocio depende, no es opcional.
