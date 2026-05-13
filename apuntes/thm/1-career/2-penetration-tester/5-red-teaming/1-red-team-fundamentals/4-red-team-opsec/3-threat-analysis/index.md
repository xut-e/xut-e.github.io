---
layout: apunte
title: "3. Threat Analysis"
---

Después de identificar la información crítica, necesitamos analizar las amenazas. El análisis de amenazas se refiere a identificar adversarios potenciales y sus intenciones y capacidades. Adaptado del [Manual de Programa de OPSEC del Depeartamento de defensa (DoD)](https://www.esd.whs.mil/Portals/54/Documents/DD/issuances/dodm/520502m.pdf), el análisis de amenazas intenta responder a las siguientes cuestiones:

1. ¿Quién es el adversario?
2. ¿Cuáles son los objetivos del adversario?
3. ¿Qué tácticas, técnicas y procedimientos usan?
4. ¿Qué información crítica ha obtenido ya el adversario?

!**Pasted image 20260512145934.png**

La tarea del red team es emular un ataque real para que el blue team descubra cómo se ve y esté mejor preparado para cuando el peligro real llegue. El objetivo principal del blue team es asegurar la seguridad de la red y sistemas de la organización. Las intenciones del blue team son claras, quieren mantener al red team fuera de su red. Consecuentemente, considerando la tarea del red team, el blue team es considerado nuestro adversario ya que cada equipo tiene objetivos en conflicto.

Los jugadores terceros maliciosos pueden tener diferentes intenciones y capacidades y puede que paren una amenaza como resultado. Este tercer partido puede ser alguien con capacidades humildes escaneando sistemas aleatoriamente o un adversario capaz poniendo como objetivo los sistemas de tu cliente. Consecuentemente, las intenciones y capacidades de estos terceros puede resultar en un adversario también.

| Adversary             | Intentions         | Capabilities     |
| --------------------- | ------------------ | ---------------- |
| Blue team             | Keep intruders out | Not always known |
| Malicious third-party | Varies             | Varies           |

Consideramos cualquier adversario con la intención y capacidad para tomar acciones que nos prevendrían de completar la operación como una amenaza.

`amenaza = adversario + intención + capacidad`

