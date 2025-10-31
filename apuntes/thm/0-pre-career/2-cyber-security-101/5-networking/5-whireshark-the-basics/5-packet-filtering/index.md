---
layout: apunte
title: "5. Packet Filtering"
---

<h2>Filtrado de Paquetes</h2>
Wireshark tiene un motor de filtrado poderoso que ayuda a estrechar el tráfico. Tiene dos tipos de filtrado: captura y muestra (capture y display).

- Los filtros de captura se utilizan para capturar paquetes válidos para el filtro.
- Los filtros de muestra se usan para ver aquellos paquetes que cumplen con el requisito.

Los filtros son queries específicas diseñadas para los protocolos disponibles en Wireshark. Aunque los filtros son la única opción para estrechar los resultados, hay dos maneras de introducirlos: mediante "comandos" o queries en la barra de filtrado o mediante el click derecho en los menús.

>[!TIP] Si puedes hacer click en él, puedes filtrarlo y copiarlo.

---------------------
<h2>Apply as Filter</h2>
Es la forma más básica de filtrar tráfico. Al investigar una captura, puedes hacer click en el campo que quieres filtrar y usar el menú de click derecho o `Analyze -> Apply as Filter`. Una vez aplicado el filtro, Wireshark generará la query necesaria y la aplicará.

!**115.png**

--------------------
<h2>Conversation Filter</h2>
Al usar la opción de `Apply as Filter`, investigas sobre un paquete en concreto. Sin embargo, si quieres investigar sobre la conversación que ha tenido lugar centrándote en las direcciones IP, este tipo de filtro es muy útil porque permite ver sólo los paquetes relacionados. Puedes acceder usando el menú de click derecho o `Analyze -> Conversation Filter`.

!**116.png**

--------------------------
<h2>Colourise Conversation</h2>
Esta opción es similar a la de `Conversation Filter` solo que remarca los paquetes conectados sin aplicar un filtro de muestra. No tiene en cuenta el color del paquete antes de ser aplicado y puede ser accedido con el click derecho o `View -> Colourise Conversation`. Si queremos devolverlo a la normalidad hacemos `View -> Colourise Conversation -> Reset Colourisation`.

!**117.png**

-------------------
<h2>Prepare as Filter</h2>
Similar a `Apply as Filter`, esta opción crea una muestra usando el click derecho. Sin embargo, no aplica el filtro, sino que sólo lo desarrolla en la barra de queries. Se puede poner otras queries usando `and` u `or`.

!**118.png**

---------------------
<h2>Apply as Column</h2>
Por defecto, la lista de paquetes ofrece información básica sobre cada paquete. Puedes usar el menú de click derecho o `Analyze -> Apply as Column` para añadir columnas al panel de la lista de paquetes. Una vez hecho, será visible en el panel de la lista. Puedes activarlas y desactivarlas haciendo click derecho en la parte superior del panel de paquetes.

!**119.png**

------------------
<h2>Follow Stream</h2>
Wireshark muestra todo en flujo de paquetes. Sin embargo, es posible reconstruir el flujo de uno o varios paquetes concretos.

Seguir el flujo del protocolo ayuda a recrear la información a nivel de aplicación y a entender el evento de interés. También es posible ver información que esté en texto claro como nombres de usuario, contraseñas, etc.

Puedes usar el click derecho o `Analyze -> Follow TCP/UDP/HTTP Stream`. Los flujos salen en una nueva pestaña, siendo en azul la respuesta del servidor y en rojo la petición del cliente.

!**120.png**

Una vez seguido un flujo, Wireshark crea y aplica la query necesaria para seguir el flujo.