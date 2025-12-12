---
layout: apunte
title: "3. Let the Fun Begin"
---

Ahora que sabes qué servicios están disponibles es hora de explotarlos.

------------------
1. Hay una base de datos por algún lado, ¿cuál es su filename?
	1. Vamos a la URL de la base de datos.
	   !**Pasted image 20251124200959.png**
	2. Vamos a enumerar las páginas de esta URL.
	   !**Pasted image 20251124202106.png**
	   Parece que `robots.txt` está disponible, vamos a mirar a ver qué hay en ella.
	3. Vamos a `http:<ip>:31331/robots.txt`.
	   !**Pasted image 20251124202221.png**
	4. Seguimos los puntos que vamos obteniendo.
	   !**Pasted image 20251124202256.png**
	5. En la única que hay algo interesante es en partners.html.
	   !**Pasted image 20251124202343.png**
	   Parece que hemos encontrado el área de login.
	6. Vamos a intentar entrar con `test`:`test`.
	   !**Pasted image 20251124202428.png**
	   Después de trastear un poco con Burp Suite nos damos cuenta de que por aquí no llegamos a ningún lado. Ni siquiera con hydra, no obtenemos ninguna contraseña para los usuarios obtenidos de la primera página:
		- r00t
		- P4c0
		- Sq4l
	7. Por esto volvemos a la página de inicio de sesión a ver si nos hemos dejado algo, vamos a inspeccionar la página.
	   !**Pasted image 20251124202916.png**
	   Aquí no parece haber nada, vamos a ver en la sección de red.
	8. Nos metemos en la sección de red de las herramientas de desarrollador.
	   !**Pasted image 20251124203009.png**
	   Parece que está llamando a una función, vamos a investigarlo.
	9. Vamos a intentar hacer ping a la máquina localhost del servidor.
	   !**Pasted image 20251124203154.png**
	   Pues parece que podemos inyectar comandos.
	10. Vamos a intentar listar archivos.
	    !**Pasted image 20251124203510.png**
	    Hemos encontrado el filename.
2. ¿Cuál es el hash de la contraseña del primer usuario?
	1. Vamos a leer el archivo `utech.db.sqlite`.
	   !**Pasted image 20251124204342.png**
	2. Sabemos que hay un usuario llamado `r00t` gracias a la página principal, por lo que el hash debe ser lo que sigue.
	   !**Pasted image 20251124204431.png**
3. ¿Cuál es la contraseña asociada a este hash?
	1. Para crackear la contraseña vamos a ir a [CrackStation](https://crackstation.net/).
	   !**Pasted image 20251124204534.png**

