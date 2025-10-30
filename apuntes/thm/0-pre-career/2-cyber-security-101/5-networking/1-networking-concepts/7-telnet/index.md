---
layout: apunte
title: "7. Telnet"
---

TELNET (TELetype NETwork) es un protocolo de red para conexión remota a consolas. Es decir, `telnet` es una herramienta que nos permite comunicarnos con un sistema remoto y escribir comandos.

En la máquina a la que nos vamos a conectar hay varios servicios corriendo, nos centraremos en tres:

- Servidor echo: Este servidor repite todo lo que le dices, por defecto opera en el puerto 7.
- Servidor daytime: Este servidor escucha en el puerto 13 por defecto y responde con la hora y día actuales.
- Servidor web (HTTP): Escucha en el puerto 80 por defecto y hostea páginas web.

Antes de continuar deberíamos mencionar que los servidores echo y daytime son considerados factores críticos de seguridad y no deberían ejecutarse. De cualquier forma los hemos conectado para ver su utilidad.

Con telnet nos conectamos al puerto que nos interese, por ejemplo el echo (7) con `telnet <ip> <puerto>`. Para cerrar la conexión usamos `Ctrl + ]`.

![](/apuntes/img/71.png)