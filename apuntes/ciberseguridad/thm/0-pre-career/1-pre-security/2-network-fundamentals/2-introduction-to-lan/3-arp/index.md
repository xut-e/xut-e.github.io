---
layout: apunte
title: "3. ARP"
---

Recordando [3. Identifying Devices on a Network](/apuntes/ciberseguridad/thm/0-pre-career/1-pre-security/2-network-fundamentals/1-what-is-networking/3-identifying-devices-on-a-network/), tenemos dos maneras de identificar dispositivos: IP (identificador lógico) y MAC (identificador físico).
El ARP (Address Resolution Protocol) es la tecnología responsable de vincular estas dos bajo un dispositivo.
Cuando un dispositivo quiere conectarse con otro, manda un broadcast a la red entera buscando ese dispositivo específico. Los dispositivos pueden usar ARP para encontrar la dirección MAC del dispositivo en cuestión.

------------
<h2>¿Cómo funciona ARP?</h2>
Cada dispositivo en una red tiene un "índice" para guardar información que se llama caché. En este contexto, la caché almacena los identificadores de otros equipos de la red.

Para guardar la IP y la MAC juntas, ARP manda dos tipos de mensaje:

1. ARP Request.
2. ARP Reply.

Cuando un ARP Request se manda, un mensaje es broadcasted (mandado a todos) en la red al resto de dispositivos preguntando: "¿Cuál es la dirección MAC que posee esta IP?". Cuando el resto de dispositivos reciben ese mensaje, responden con un ARP Reply.
!**003.png**
