---
layout: apunte
title: "5. Incident Response Techniques"
---

Recuerda que hemos estudiado la segunda fase del ciclo de respuesta a incidentes: "Identificación" en SANS y "Detección y Análisis" en NIST. Es muy difícil mirar a un comportamiento inusual e identificar incidentes manualmente. Hay múltiples soluciones de seguridad que sirven para su propio rol en la detección de incidentes. Algunos tienen la capacidad de responder.

- **SIEM:** La solución Security Information and Event Manager (SIEM) recolecta todos los logs importantes en una localización centralizada y los correlaciona con los incidentes.
- **AV:** El antivirus detecta programas maliciosos conocidos en un sistema con escaneos regulares.
- **EDR:** Endpoint Detection and Response se despliega en cada sistema, protegiéndolo contra algunas amenazas de nivel avanzado. También puede contener y erradicar la amenaza.

Después de identificar los incidentes, deben seguirse ciertos procedimientos, incluyendo investigar la extensión del ataque, tomar medidas necesarias para evitar más daño y eliminarlo de la raíz. Estos pasos pueden ser diferentes dependiendo del tipo de incidente. En este escenario, tener instrucciones paso a paso para cada incidente ayuda mucho. Estas soluciones se conocen como **playbooks**.

Aquí vemos un ejemplo de playbook:

1. Notificar a todos los interesados del incidente de phishing en email.
2. Determinar si el email era malicioso realizando análisis de header y body del email.
3. Buscar cualquier archivo adjunto al email y analizarlo.
4. Aislar el sistema infectado de la red.
5. Bloquear al recipiente.

Por otro lado, los **runbooks** son instrucciones paso a paso detalladas sobre pasos específicos durante diferentes incidentes. Estos pasos pueden variar en función de los recursos dispoonibles para la investigación.

