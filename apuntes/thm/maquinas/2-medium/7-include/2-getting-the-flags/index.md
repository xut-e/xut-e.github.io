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
3. Vamos a meternos en nuestro perfil.
   !**Pasted image 20260213170025.png**
   Parece que son objetos. Si vamos más abajo podemos ver una manera de lo que parece compartir notas.
   !**Pasted image 20260213170059.png**
4. Si metemos una nota random como `Book:testBook` se ve reflejado en el perfil, lo que nos lleva a preguntarnos si podremos modificarlos.
   !**Pasted image 20260213170143.png**
5. Probaremos a introducir `isAdmin:true`.
   !**Pasted image 20260213170241.png**
6. Se ha cambiado y nos han aparecido dos opciones que antes no había:
	1. Settings:
	   !**Pasted image 20260213170335.png**
	2. API:
	   !**Pasted image 20260213170352.png**
7. Vamos a comprobar si el link de settings realiza peticiones:
	1. Configuramos un servidor sencillito:
	   !**Pasted image 20260213170446.png**
	2. Introducimos nuestra URL en la caja y pulsamos enter.
	   !**Pasted image 20260213170554.png**
	3. Observamos si hay conexión.
	   !**Pasted image 20260213170617.png**
8. Vamos a probar a hacer una petición a la API interna con la dirección del endpoint censurado: `getAllAdmins101099991`.
   !**Pasted image 20260213170830.png**
   Obtenemos lo siguiente:
   !**Pasted image 20260213170845.png**
9. Vamos a decodificarlo.
   !**Pasted image 20260213171019.png**
10. Iniciamos sesión en SysMon con las credenciales obtenidas.
    !**Pasted image 20260213171141.png**
    

>[!SUCCESS] Y así obtenemos la primera flag.
>


--------------------------------------
<h2>¿Cuál es el contenido del archivo de texto escondido en /var/www/html?</h2>
<h4>Investigación Web</h4>
1. Estando ya en la página del administrador, vamos a mirar desde dónde se carga la imagen de perfil del usuario `administrator`.
   !**Pasted image 20260214160839.png**
   Parece ser que está cargando la foto desde una ruta interna. Esto huele a LFI de manual.
2. Vamos a intentar acceder a `/etc/passwd`.
	1. Primero vamos a la ruta.
	   !**Pasted image 20260214161438.png**
	2. Ahora vamos a probar un par de payloads (`../../` y `....//....//`).
	   !**Pasted image 20260214161839.png**
	   Ninguno ha funcionado, por lo que vamos a fuzzear.
	3. Preparamos el comando y lo lanzamos.
	   !**Pasted image 20260214162023.png**
	   Después de probar un par de diccionarios encontramos varios payloads que funcionan.
	4. Si miramos en la web uno de estos payloads:
	   !**Pasted image 20260214162141.png**
	   Observamos que hay dos usuarios `joshua` y `charles`, puede que nos ayude más tarde. También hay un mail server.
3. Si recordamos el escaneo inicial, había varios servicios que nos hacían pensar que podía haber algo relacionado con el mail. Si buscamos en internet:
   !**Pasted image 20260214162358.png**
4. Vamos a intentar leerlo.
   !**Pasted image 20260214162441.png**
   Parece que está vacío.
5. Vamos a intentar mandar un mail al servidor para ver si se registra en los logs aprovechando que el puerto 25 está abierto.
	1. Buscamos la sintaxis para mandar emails por telnet en SMTP (25).
	   !**Pasted image 20260214162919.png**
	2. Lo replicamos.
	   !**Pasted image 20260214163129.png**
	3. Vamos a ver si se ha registrado.
	   !**Pasted image 20260214163200.png**
	   Sí que se ha registrado. Huele a log poisoning debido a que aparece lo que hemos indicado.
	   !**Pasted image 20260214163340.png**
	4. Vamos a intentar un log poisoning con una webshell en php: `<?php system($_GET['cmd']);?>`
	   !**Pasted image 20260214170010.png**
	5. Ahora intentamos cargar la página con el parámetro `&cmd=whoami`.
	   !**Pasted image 20260214170028.png**
	6. Vamos a listar ahora `/var/www/html`.
	   !**Pasted image 20260214170138.png**
	7. Lo leemos.
	   !**Pasted image 20260214170234.png**

>[!SUCCESS] Hemos conseguido obtener las dos flags!!

