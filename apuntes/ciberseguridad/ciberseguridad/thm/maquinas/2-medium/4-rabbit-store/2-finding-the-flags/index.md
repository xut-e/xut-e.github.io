---
layout: apunte
title: "2. Finding the flags"
---

1. Vamos a escanear la IP que nos dan.
   !**Pasted image 20251123154638.png**
2. Vamos a mirar qué es el servicio epmd.
   !**Pasted image 20251123154913.png**
   Esto puede ser interesante más adelante. Como aparece open sabemos que en principio no hay un firewall.
3. Vamos a escanear los puertos abiertos.
   !**Pasted image 20251123155400.png**
4. Vamos a ver la página web.
   !**Pasted image 20251123155551.png**
   Al escribir esta dirección nos redirige a:
   !**Pasted image 20251123155618.png**
5. Vamos a añadirla en nuestro `/etc/hosts`.
   !**Pasted image 20251123155749.png**
6. Volvemos a la página.
   !**Pasted image 20251123155825.png**
   Ahora sí obtenemos la página web.
7. Exploramos la página con una herramienta de descubrimiento activo como `gobuster`.
   !**Pasted image 20251123160442.png**
   Además, hemos encontrado moviéndonos entre botones en la web la página de contacto que podría llegar a ser susceptible de XSS. 
8. También hay un apartado de login, pero no nos ha dejado entrar, por lo que inspeccionaremos el botón.
   !**Pasted image 20251123160721.png**
9. Vamos a meter este subdominio en nuestro `/etc/hosts` y a ir a ver qué hay.
	1. Tenemos la página de login.
	   !**Pasted image 20251123161635.png**
	2. Y la página de register.
	   !**Pasted image 20251123161702.png**
10. Vamos a ver qué pasa si intentamos registrarnos.
    