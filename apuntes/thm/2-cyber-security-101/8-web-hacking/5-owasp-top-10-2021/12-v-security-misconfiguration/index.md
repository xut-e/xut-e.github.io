---
layout: apunte
title: "12. V. Security Misconfiguration"
---

La configuración errónea es distinta de las Top 10 porque ocurre cuando la seguridad podía haber sido implementada correctamente pero no lo fue. Incluso si tienes las versiones lo más actualizadas posibles, la mala configuración puede vulnerar todo tu sistema.

Estas incluyen:

- Permisos de servicios en la nube pobremente configurados.
- Tener habilitadas funcionalidades innecesarias como servicios, páginas o privilegios.
- Cuentas por defecto sin cambio de credenciales.
- Mensajes de error con demasiada información.
- No usar HTTPS.

Esta vulnerabilidad puede conducir, usualmente, a otras.

-------------------------
<h2>Debuggear Interfaces</h2>
Una mala configuración común tiene que ver con el debugging y cómo se maneja. Si como desarrollador te olvidas de eliminar estos debugs, un atacante podría usarlos como fuente de información para romper el sistema.

Un ejemplo de este tipo de vulnerabilidad es cuando Patreon fue hackeado en 2015. Cinco días antes, un investigador de seguridad le comunicó a Patreon que había encontrado una interfaz de debugging abierta para la consola Werkzeug. Esta podía ser accedida mediante URL con `/console`.

-----------------
<h2>Challenge</h2>
1. Navegamos hasta la página proporcionada:
   ![](/apuntes/img/Pasted image 20251010192138.png)
2. Allí ejecutamos el código que nos dan:
   ![](/apuntes/img/Pasted image 20251010192245.png)
3. Vemos el código fuente de la app, por lo que podemos intentar leerlo:
   ![](/apuntes/img/Pasted image 20251010192428.png)
