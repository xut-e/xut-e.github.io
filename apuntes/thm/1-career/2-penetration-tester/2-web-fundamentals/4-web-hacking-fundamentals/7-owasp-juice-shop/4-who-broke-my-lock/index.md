---
layout: apunte
title: "4. Who Broke my Lock"
---

!**Pasted image 20251210144317.png**

En esta tarea veremos cómo explotar una autentificación a través de diferentes fallos. Cuando hablamos de fallos/debilidades en la autentificación, incluimos mecanismos que son vulnerables a la manipulación. Estos mecanismos, listados debajo, son los que explotaremos.

- Forgotten Password Pages
- Broken Authentication

----------------------------------------------
1. Bruteforcea la contraseña del administrador.
	1. Para ello lo primero que tenemos que hacer es ir a Burp Suite y capturar una petición de inicio de sesión.
	   !**Pasted image 20251210145335.png**
	2. La mandamos al intruder y preparamos la petición para sustituir las contraseñas con el email del admin.
	   !**Pasted image 20251210145442.png**
	3. Configuramos el diccionario de contraseñas (`/usr/share/wordlists/SecLists/Passwords/Common-Credentials/best1050.txt`).
	   !**Pasted image 20251210145644.png**
	4. Empezamos el ataque y esperamos resultados, ordenando por código de respuesta.
	   !**Pasted image 20251210150131.png**
	5. Obtenemos la flag.
	   !**Pasted image 20251210150250.png**
2. Resetea la contraseña de Jim.
	1. Si nos metemos en la opción de "Forgot your Password?" podemos ver que la pregunta de seguridad es el nombre del medio de su hermano.
	   !**Pasted image 20251210150749.png**
	2. Podemos recordar que Jim hacía referencia a Star Trek. Si buscamos Jim Star Trek, nos sale:
	   !**Pasted image 20251210150455.png**
	3. Si nos metemos en la Wikipedia podemos ver que tiene un hermano.
	   !**Pasted image 20251210150535.png**
	4. Si ponemos "Samuel", generamos una contraseña segura y le damos a cambiar, podemos cambiarla y obtener la flag.
	   !**Pasted image 20251210150938.png**

