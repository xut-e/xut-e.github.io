---
layout: apunte
title: "4. DHCP"
---

Las direccione IP pueden ser asignadas de forma manual, metiéndolas en los dispositivos, o automáticamente, más comúnmente utilizando un servidor DHCP (**D**ynamic **H**ost **C**onfiguration **P**rotocol).

Cuando un dispositivo se conecta a una red, si no ha sido asignado con una IP manualmente:

1. Manda una petición (DHCP Discover) para ver si hay algún servidor DHCP en la red. 
2. El servidor (si lo hay) contesta entonces con una IP que el dispositivo podría usar (DHCP Offer). 
3. El dispositivo responde Diciendo que quiere esa IP (DHCP Request). 
4. Por último el servidor responde que la asignación ha sido completada de forma exitosa (DHCP ACK).

![](/apuntes/img/004.png)
