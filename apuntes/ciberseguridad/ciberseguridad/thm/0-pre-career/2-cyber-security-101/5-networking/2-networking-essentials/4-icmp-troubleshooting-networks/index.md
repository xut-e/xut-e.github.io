---
layout: apunte
title: "4. ICMP - Troubleshooting Networks"
---

El ICMP es usado principalmente para la diagnosis de la red y reporte de errores. Dos comandos populares recaen en ICMP, y son instrumentales en la resolución de problemas de red y seguridad de esta. Los comandos son:

- `ping`: Este comando usa ICMP para comprobar la conectividad de un sistema objetivo y mide el RTT (Round-Trip Time).
- `traceroute`: Este comando es llamado así en sistemas UNIX y `tracert` en sistemas MS Windows. Usa ICMP para descubrir la ruta entre tú y tu destino.

-----------------
<h2>Ping</h2>
A lo mejor nunca has jugado al ping-pong, pero gracias a `ping` ahora puedes hacerlo con un ordenador. El comando `ping` manda una petición echo mediante ICMP (tipo 8).

!**076.png**

El ordenador que lo recibe devuelve un "pong", una petición echo mediante ICMP (tipo 0).

!**077.png**

Muchas cosas pueden interrumpir el ping. Además del hecho de que pueda estar offline o apagado, un firewall puede estar bloqueando el tráfico necesario para que `ping` funcione.

--------------
<h2>Traceroute</h2>
¿Cómo podemos hacer que cada router entre nuestro sistema y el objetivo se identifique?

El protocolo de Internet tiene un campo llamado TTL (Time To Live). que indica el máximo número de routers por el que un paquete puede viajar antes de ser descartado. El router decrementa el TTL en uno antes de mandarlo. Cuando el paquete llega a TTL 0, el router lo descarta y manda un ICMP Time Exceeded (tipo 11). En este contexto, el tiempo se mide en routers, no en segundos.

