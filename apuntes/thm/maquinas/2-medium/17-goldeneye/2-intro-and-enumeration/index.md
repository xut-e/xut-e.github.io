---
layout: apunte
title: "2. Intro and Enumeration"
---

Esta es la primera parte del reto. En ella se nos pide resolver una serie de cuestiones:

1. Usa Nmap para escanear la red en busca de todos los puertos. ¿Cuántos hay abiertos?

Comenzamos realizando el escaneo de puertos que siempre hacemos.

!**Pasted image 20260519165154.png**

2. ¿Quién necesita asegurarse de que actualiza su contraseña por defecto?

Para seguir vamos a escanear dichos puertos más en profundidad.

!**Pasted image 20260519170942.png**

Vamos a ver qué directorios hay en la web.

!**Pasted image 20260519171156.png**

No parece haber nada, vamos a ver cómo se ve la web.

!**Pasted image 20260519171240.png**

Nos están dando un directorio. Pero antes de ir, vamos a mirar el código fuente.

!**Pasted image 20260519171333.png**

A priori no parece haber nada, pero si nos fijamos hay un script JS que se está cargando, vamos a ver de qué se trata.

!**Pasted image 20260519171459.png**

En los comentarios del script podemos ver el nombre de esta persona y su contraseña.

3. ¿Cuál es su contraseña?

La contraseña parece estar encodeada con entidades HTML combinado con ASCII. Si buscamos la cadena en el navegador se traduce sola.

!**Pasted image 20260519171716.png**

