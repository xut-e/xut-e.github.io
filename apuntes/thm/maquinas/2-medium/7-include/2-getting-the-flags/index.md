---
layout: apunte
title: "2. Getting the Flags"
---

<h2>¿Cuál es la flag después de iniciar sesión en SysMon App?</h2>
<h4>Escaneo Inicial</h4>
1. Empezamos realizando un escaneo a todos los puertos de la IP.
   !**Pasted image 20260211205256.png**
2. Una vez tenemos el escaneo inicial vamos a lanzar un escaneo con todo contra estos puertos.
   !**Pasted image 20260211213811.png**
   !**Pasted image 20260211213836.png**
   Podemos ver que el puerto 50000 está sirviendo un Apache 2.4.41 y el 4000 un Node.js en http, por lo que como siempre que vemos un servicio web, vamos a ver qué hay.

<h4>Investigación de Puertos</h4>
1. Vamos a ver qué hay en el puerto 50000.
   !**Pasted image 20260211214240.png**
2. Y en el puerto 4000.
   !**Pasted image 20260211214303.png**

<h4>Investigación Web</h4>
1. Empezamos fuzzeando.
	1. En el puerto 50000.
	   !**Pasted image 20260211221934.png**
	2. En el puerto 4000.
	   !**Pasted image 20260211222041.png**
2. Seguimos intentando SQL Injection.
	1. En el puerto 50000.
	   !**Pasted image 20260211222327.png**
	   !**Pasted image 20260211222350.png**
	   Capturé una petición para usarla con SQLMap (era un formulario POST) pero no había ningún parámetro inyectable.
	2. En el puerto 4000 no nos hace falta porque nos han dejado credenciales de acceso.
	   !**Pasted image 20260211221457.png**


--------------------------------------
<h2>¿Cuál es el contenido del archivo de texto escondido en /var/www/html?</h2>
