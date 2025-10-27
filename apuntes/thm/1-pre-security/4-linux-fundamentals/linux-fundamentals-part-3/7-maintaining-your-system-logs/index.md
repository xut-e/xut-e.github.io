---
layout: apunte
title: "7. Maintaining your System - Logs"
---

Hemos tocado brevemente los archivos de log y dónde los podemos encontrar en [5. Searching for files](/apuntes/thm/1-pre-security/4-linux-fundamentals/linux-fundamentals-part-1/5-searching-for-files/).

A continuación se ven algunos logs de los siguientes procesos:

- Un servidor web apache2.
- Logs para el servicio fail2ban, el cuales usado para monitorizarataques de fuerza bruta.
- El servicio UFW (firewall).

![](/apuntes/img/032.png)

Estos logs son una excelente manera de monitorizar la salud de tu sistema y procesos. Los dos tipos de logs que vemos debajo son:

- Access logs.
- Error logs.

![](/apuntes/img/033.png)

Hay, también otros logs que guardan otro tipo de información, como intentos de autentificación.