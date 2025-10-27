---
layout: apunte
title: "2. Areas of Defensive Security"
---

<h2>Security Operations Center (SOC)</h2>
Es un equipo de profesionales de la ciberseguridad que monitorea la red y los sistemas para detectar eventos maliciosos. Algunas áreas de interés para los SOC son:
- **Vulnerabilidades**: Esencial instalar el adecuado parche o actualización inmediatamente después de detectarla.
- **Violación de Políticas**: Cuando se infringen el conjunto de reglas de seguridad en un sistema, por ejemplo, los usuarios del sistema comparten información privilegiada con agentes externos.
- **Actividad no Autorizada**: Por ejemplo cuando las credenciales de un usuario son robadas. Se debe proceder a bloquear la intrusión de esa cuenta de inmediato.
- **Intrusiones en la red**: Por muy buena que sea tu seguridad siempre hay una posibilidad de ser vulnerado. En esos momentos hay que actuar rápida y diligentemente.

---------------------------------
<h2>Threat Intelligence</h2>

En este contexto, inteligencia se refiere a la información que eres capaz de recolectar sobre amenazas/enemigos actuales y potenciales. Threat Intelligence ayuda a la empresa a prepararse mejor de cara a potenciales adversarios. Hay diferentes tipos de amenaza dependiendo de la empresa víctima. Por ejemplo podrían intentar **robar** datos de una compañía de teléfonos o **parar** la refinación de petróleo en una planta.

Para esto necesitamos recolectar datos. Estos datos son recogidos de redes locales, logs de red y recursos públicos como foros. El procesamiento de datos los ordena en un formato analizable. La parte de análisis busca obtener más información sobre los atacantes/adversarios, sus técnicas, tácticas y procedimientos.

------------------------------
<h2>Digital Forensics</h2>
Es la aplicación de la ciencia a la investigación de crímenes. Con la expansión de la tecnología una nueva ciencia forense se alzó: Computer Forensics, que terminó siendo Digital Forensics. La misión principal es analizar evidencia de los crímenes y a sus perpetradores. 

Para ello nos centramos en:

- File System: Analizando una copia a bajo nivel del sistema de archivos.
- System Memory: Analizando la memoria del sistema a bajo nivel (copia).
- System Logs: Analizando los logs del sistema.
- Network Logs: Analizando los logs de la red y los paquetes enviados y recibidos.

-------------------------------------------
<h2>Incident Response</h2>
Un incidente normalmente se refiere a una brecha de seguridad o una filtración de información o ciberataque. De todas maneras, puede ser algo poco crítico como una mal configuración, un intento de intrusión, etc. 

Las cuatro fases de la respuesta ante incidentes son:

1. Preparación: Requiere de un equipo entrenada listo para responder ante estos.
2. Detección y análisis: El equipo tiene los recursos y herramientas necesarios para poder detectarlo a tiempo.
3. Contención, erradicación y recuperación: Una vez detectado hay que erradicarlo o en su defecto contenerlo. Además si es posible se debe intentar recuperar los datos.
4. Actividad post-incidente: Después de una intrusión exitosa o no un informe debe de ser redactado.

------------------------------
<h2>Malware Analysis</h2>
Malware significa Malicious Software. Son programas, documentos o archivos diseñados específicamente para infectar equipos. Para aprender sobre ellos usan:

- Análisis estático: Miran el código sin ejecutarlo.
- Análisis dinámico: Ejecutan el código en entornos controlados.