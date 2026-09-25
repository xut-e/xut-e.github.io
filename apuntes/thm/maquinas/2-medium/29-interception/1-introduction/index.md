---
layout: apunte
title: "1. Introduction"
---

!**Pasted image 20260923094353.png**

Usa BurpSuite o conocimiento sobre intercepciones para modificar el tráfico y pwnear la máquina.

MediaHub parece ser un portal de internet normal usado por periodistas para gestionar contenido. Parece que todo está protegido detrás de un sistema de login y verificación, pero la historia real radica en cómo la aplicación se comunica con las APIs del backend.

!**Pasted image 20260923094535.png**

Tu tarea es asumir el rol de atacante y observar el tráfico entre el navegador y el servidor. Usando tus habilidades proxy, intercepta peticiones, analiza cómo la aplicación las procesa y experimenta con la modificación de información que se manda.

Si entiendes el flujo suficientemente bien, un pequeño cambio en la petición puede ser lo que necesites para bypassear los controles.

