---
layout: apunte
title: "4. Discovering Live Hosts"
---

Recordemos las capas TCP/IP. Usaremos estos protcolos para descubrir los hosts activos. Empezando de abajo hacia arriba, podemos usar:

- ARP de la capa de enlace.
- ICMP de la capa de red.
- TCP de la capa de transporte.
- UDP de la capa de transporte.

!**Pasted image 20251118155142.png**

Antes de ver cómo los escáners pueden usar cada uno en detalle, veremos brevemente estos cuatro protocolos. ARP tiene un propósito, mandar un marco a la dirección broadcast en el segmento de red y preguntar a los ordenadores con una IP específica que respondan con su dirección MAC.

ICMP tiene varios tipos. ICMP ping usa el tipo 8 (echo) y el tipo 0 (echo reply).

Si quieres hacer ping a un sistema en la misma subred, una petición ARP debería preceder al ICMP echo.

Aunque TCP y UDP son de la capa de transporte, para propósitos de escaneo de red, un escáner puede mandar un paquete crafteaddo especialmente a puertos TCP o UDP comunes para comprobar si el onjetivo responde. Este método es bastante útil cuando ICMP está bloqueado.

