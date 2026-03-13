---
layout: apunte
title: "2. Finding the Flags"
---

Vamos a responder a las siguientes preguntas.

1. ¿Cuántos servicios corren bajo el puerto 1000?

Hacemos un escaneo de puertos.

!**Pasted image 20260312134941.png**

Hay 2 servicios en el puerto 1000.

2. ¿Qué corre en el puerto más alto?

Hacemos un escaneo normal y miramos la versión del servicio del puerto más alto.

!**Pasted image 20260312141801.png**

Es `SSH`.

3. ¿Cuál es el CVE que usarás contra la aplicación?

Hacemos un análisis más en profundidad de puertos abiertos.

!**Pasted image 20260312143057.png**

Vemos que existe la posibilidad de anonymous login con ftp. Vamos a probar.

!**Pasted image 20260312144337.png**

Vemos que en la nota dice que la contraseña era extremadamente fácil de crackear.

Vamos a listar directorios.

!**Pasted image 20260312144456.png**

A `robots.txt` ya fuimos o sea que vamos a ir a `/simple`.

!**Pasted image 20260312144619.png**

Aquí encontramos que la versión del CMS es la 2.2.8.

!**Pasted image 20260312144554.png**

Vamos a buscar exploits relacionados.

!**Pasted image 20260312144723.png**

4. ¿A qué tipo de vulnerabilidad es vulnerable la aplicación?

Pone en el CVE que es vulnerable a `SQLi`.

5. ¿Cuál es la contraseña?

Si ejecutamos el exploit disponible en Exploit-DB para este CVE (y modificamos un par de cosillas en el código para que funcione), obtenemos los detalles:

!**Pasted image 20260312145831.png**

Probamos a buscar el hash en https://hashes.com:

!**Pasted image 20260312150009.png**

6. ¿Dónde puedes loguearte con los detalles obtenidos?

Bastante obviamente en SSH (en el puerto 2222 si recordamos).

7. ¿Cuál es la flag del usuario?

Después de loguearnos por SSH la leemos.

!**Pasted image 20260312150214.png**

8. ¿Hay algún otro usuario en el directorio home? ¿Cuál es su nombre?

Existe un usuario llamado `sunbath`.

!**Pasted image 20260312150259.png**

9. ¿Qué puedes usar para spawnear una shell privilegiada?

Buscamos los comandos que `mitch` puede ejecutar con sudo.

!**Pasted image 20260312150509.png**

Buscamos en GTFOBins:

!**Pasted image 20260312151354.png**

Si miramos en el apartado de shell:

!**Pasted image 20260312151431.png**

Escribimos:

!**Pasted image 20260312151326.png**

Y así obtenemos la shell.

10. ¿Cuál es la flag de root?

Listamos y leemos la flag.

!**Pasted image 20260312151529.png**

