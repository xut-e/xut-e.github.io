---
layout: apunte
title: "1. Firewalls Refresher"
---

Antes de profundizar en soluciones avanzadas, revisemos al historia de los firewalls. En los primeros tiempos de la computación por red, la seguridad solía ser un pensamiento a posteriori. Cuando las organizaciones comenzaron a conectar sus redes internas al mundo exterior, se dieron cuenta de que necesitaban un "segurata" en la entrada. Necesitaban una manera de decidir qué tráfico pasaba y cuál no. Considerando la tecnología disponible en aquel momento, la respuesta era el stateless packet filter.

------------------------------------
<h2>Firewalls Stateless: El Guardián sin Memoria</h2>
Como el nombre adelanta, un filtrador de paquetes sin estado es un guardián sin memoria. Opera en las capas 3 y 4 del modelo OSI, donde puede inspeccionar direcciones IP, puertos TCP y UDP, algunos headers y otros protocolos. Este filtro de paquetes básico es completamente ignorante del contexto del tráfico, cada paquete se juzga aislado. Piensa en un agente de frontera mirando el pasaporte de un niño como si este estuviera viajando solo.

Esta medida de seguridad funcionó durante un tiempo antes de que los hackers se dieran cuenta de que podían abusar del hecho de que no tenía estado. En otras palabras, un atacante podría mandar un paquete con la flag ACK configurada para engañar al servidor para tratar dicho paquete como si formara parte de una conexión existente.

---------------------------------
<h2>Firewalls Stateful: Recordar la Conversación</h2>
Durante mediados de los 90, un nuevo tipo de firewall apareció: el firewall stateful. Al contrario que los firewalls sin estado, el firewall con estado toma nota de las conexiones activas, lo que les permite judgar mejor un paquete antes de dejarlo pasar. Piensa en él como si fuera capaz de entender la pregunta "¿Pertenece este paquete a una conversación legítima?".

Debido a que registran las sesiones abiertas, forzar una flag ACK en un paquete ya no funciona para engañar al firewall. Además, los paquetes fuera de secuencia junto con otras anomalías pueden ser detectados más fácilmente y dropeados.

-------------------------------------
<h2>Firewalls que Entienden la Capa 7</h2>
A medida que la necesidad de seguridad mejorada incrementa, nuevas tecnologías de firewall emergen en el mercado. Antes de explorar los Web Application Firewalls (WAF), vamos a revisar otros tres tipos de firewalls:

- Application-Level Gateway (Proxy Firewall)
- Deep Packet Inspection (DPI) Firewall
- Next-Generation Firewall (NGFW)

<h3>Application-Level Gateway</h3>
Una manera de pensar en él es como un intérprete de protocolo. Es como un intérprete diplomático que escucha tu mensaje y lo repite, asegurando que no contiene ningún tipo de insulto o código secreto. Al contrario que los firewalls stateful, que meramente rastrean conexiones TCP, los ALGs terminan conexiones entrantes y comienzan nuevas en nombre del cliente. Esta configuración ofrece visibilidad completa hacia los protocolos de la capa de aplicación como HTTP y FTP entre otros. Por consecuencia, pueden validar sintaxis de comandos y sanitizar payloads. Ha sido superado por nueva tecnología pero sentó un precedente en la seguridad de capa de aplicación.

<h3>Deep Packet Inspection Firewall</h3>
Este tipo de firewall inspecciona los contenidos del mensaje en sí mismos.. DPI va más allá de los headers para escanear el payload en sí de los paquetes, buscando malware, tráfico p2p o balizas c2 encriptadas. DPI no es un firewall solitario, sino más bien una capabilidad más incrustada en la arquitectura de los sistemas modernos. Por ejemplo, puede señalar equivocadamente un paquete HTTP benigno por tener una entropía similar a la de tráfico ransomware conocido, o bloquear una conexión disfrazada de Tor en HTTPS. Sin embargo al firewall DPI le falta contexto. Puede detectar `UNION SELECT` en un paquete pero no puede determinar si es de una conexión legítima del administrador de bases de datos o un ataque. Esta limitación es justo por lo que DPI evolucionó hacia NGFW.

<h3>Next-Generation Firewall</h3>
Este es un firewall con estado que decidió sacarse un doctorado en contexto. Un NGFW no sólo pregunta "¿Dónde va el tráfico?". Pregunta "¿Quién lo manda?¿Qué aplicación lo usa?¿Está encriptado, y si lo está puedo desencriptarlo de forma segura?¿Debería este usuario poder acceder a este servicio?". Al fusionar inspección con estado, prevención de intrusión integrada (IPS), desencriptación SSL/TLS y contexto de identidad (vía AD, certificados o SAML), los NGFWs refuerzan las políticas basadas en usuarios y aplicaciones, no sólo duplas de IP y puerto. 

