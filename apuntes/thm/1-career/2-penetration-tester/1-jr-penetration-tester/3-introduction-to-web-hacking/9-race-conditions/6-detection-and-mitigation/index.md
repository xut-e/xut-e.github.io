---
layout: apunte
title: "6. Detection and Mitigation"
---

<h2>Detección</h2>
Detectar race conditions desde la perspectiva del dueño puede ser complicado. Si unos cuantos usuarios reclamaran la misma tarjeta de regalo múltiples veces, probablemente no se notaría a no ser que los logs estén siendo monitorizados y filtrados en busca de este tipo de actividad. Por eso se necesita la ayuda de pentesters y bug bounty hunters.

Los pentesters deben entender cómo funciona el sistema bajo condiciones normales cuando los controles son reforzados. Estos controles pueden ser: usar una vez, votar una vez, puntuar una vez, limitar al balance, limitar cada cierto tiempo, etc. El próximo paso sería tratar de circunvalar este límite aprovechando race conditions.

--------------------------
<h2>Mitigación</h2>
Listaremos unas cuantas técnicas de mitigación.

- **Mecanismos de Sincronización:** Los lenguajes de programación modernos ofrecen mecanismos de sincronización como "locks". Un único hilo puede adquirir el "lock" a la vez, previniendo que otros accedan al mismo recurso hasta que se libere.
- **Operaciones Atómicas:** Las operaciones atómicas se refieren a unidades de ejecución indivisibles. Un conjunto de instrucciones agrupado y ejecutado sin interrupción de otro hilo.
- **Transacciones de Bases de Datos:** Las transacciones agrupan múltiples operaciones de bases de datos en una unidad. Consecuentemente, todas las operaciones en la transacción tienen éxito o todas fracasan.