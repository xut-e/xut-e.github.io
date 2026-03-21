---
layout: apunte
title: "2. Reconnaissance"
---

Vamos a ir respondiendo a las preguntas que se nos hacen:

1. ¿Cuántos puertos hay abiertos?

Para ver esto hacemos un escaneo de puertos común con `nmap`.

!**Pasted image 20260320151748.png**

Vemos que hay `2`.

2. ¿Qué versión de SSH corre?

Para esto podemos utilizar `-sV` pero yo voy a optar por `-A`, que es una opción más completa.

!**Pasted image 20260320151849.png**

Podemos ver que la versión de SSH es `OpenSSH 7.6p1`.

3. ¿Qué versión de Apache corre?

En la foto de arriba también vemos que la versión de Apache es `Apache httpd 2.4.29`.

4. ¿Que distribución de Linux corre?

La distribución que corre de Linux es `Ubuntu`.

5. ¿Cuál es el nombre del directorio oculto?

Para encontrar esto vamos a realizar enumeración de directorios.

!**Pasted image 20260320152205.png**

Podemos ver que el directorio es `/admin/`.