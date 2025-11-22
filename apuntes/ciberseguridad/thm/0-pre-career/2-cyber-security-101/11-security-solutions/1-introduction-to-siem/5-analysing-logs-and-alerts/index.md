---
layout: apunte
title: "5. Analysing Logs and Alerts"
---

Los SIEMs recogen todos los logs relacionados con la seguridad ingeridos por los agentes, port forwarding, etc. Una vez que los logs ses han ingerido, el SIEM busca todos los comportamientos no deseados o patrones sospechosos dentro de los logs con la ayuda de condiciones configuradas por reglas. Si la condición coincide, se dispara una alerta.

-------------------------
<h2>Dashboard</h2>
Los dashboards son el componente más importante de los SIEMs. El SIEM presenta la información después de ser normalizada e ingerida. El resumen de estos análisis se presenta en forma de vista accionable, con la ayuda de múltiples dashboards. Cada solución SIEM viene con algunos dashboards por defecto y ofrece una opción de personalizar dashboards. Alguna de la información que podemos encontrar en un dashboard es:

- Alertas importantes
- Notificaciones del sistema
- Alerta de salud
- Lista de los intentos fallidos de inicio de sesión
- Contador de los eventos ingeridos
- Reglas disparadas
- Dominios más visitados

!**Pasted image 20251024095310.png**

----------------------------
<h2>Reglas de Correlación</h2>
La reglas de correlación juegan un papel importante en la detección temprana de amenazas, permitiendo a los analistas tomar medidas a tiempo. Son expresiones lógicas que pueden ser comprobadas, algunos ejemplos son:

- Si un usuario obtiene 5 intentos de autentificación fallidos en 10 segundos - Eleva una alerta por `Multiple Failed Login Attempts`.
- Si un login es exitoso después de más de 15 login attempts - Eleva una alerta por `Login After Multiple Attempts`.
- Una regla que avise cuando se conecta un pincho, útil si está prohibido por política de compañía.
- Si el tráfico saliente es > 25MB- Eleva una alerta por `Potential Data Exfiltration`.

---------------------------
<h2>Cómo se Crea una Regla de Correlación</h2>
Para explicar cómo funciona la regla, consideraremos los siguientes dos escenarios:

<h4>Caso de Uso 1:</h4>
Los atacantes tienden a borrar logs después de su intrusión para eliminar el rastro. Un evento con ID único (**104**) se registra cada vez que un usuario intente borrar un log. Para crear una regla basada en esta condición podemos hacerlo como:

**Rule:** Si la fuente de log es WinEventLog **AND** ID de Evento es 104 - Dispara alerta para `Event Log Cleared`

<h4>Caso de Uso 2:</h4>
Los atacantes usan comandos como whoami después de una explotación o escalada de privilegios. Los siguientes campos serían útiles de incluir en la regla.

- Fuente de log
- ID de evento
- Nombre del nuevo proceso

**Rule:** Si la fuente de log es WinEventLog **AND** EventCode es **4688** **AND** NewProcessName contiene **whoami** - Dispara una alerta para `WHOAMI command Execution DETECTED`

------------------------------
<h2>Después de la Investigación</h2>
Al monitorizar SIEM, los analistas pasan la mayor parte de su tiempo en las dashboards. Una vez se dispara una alerta, los flujos asociados a estas se examinan. Basado en la investigación, el analista determina si es un verdadero o falso positivo. Algunas de las acciones realizadas son:

- La alerta es una falsa alarma. Requiere ajustar la regla para evitar falsos positivos más adelante.
- La alerta es un positivo real. Realiza investigación más avanzada.
- Contactar al dueño del media para preguntar por la actividad.
- Se confirma actividad sospechosa. Aislar al host infectado.
- Bloquear la IP sospechosa.

