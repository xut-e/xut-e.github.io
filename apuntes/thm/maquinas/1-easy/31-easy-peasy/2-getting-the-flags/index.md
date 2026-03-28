---
layout: apunte
title: "2. Getting the Flags"
---

En esta máquina se nos hacen unas cuantas preguntas.

1. ¿Cuántos puertos hay abiertos?

Para esto comenzamos con un escaneo normal de puertos.

!**Pasted image 20260327182637.png**

Hay `3` puertos abiertos.

2. ¿Cuál es la versión de Nginx?

Hacemos un escaneo más en profundidad de los puertos.

!**Pasted image 20260327182804.png**

Corre la versión `1.16.1`.

3. ¿Qué corre en el puerto más alto?

En el puerto más alto corre Apache, como podemos ver arriba.

4. Usando GoBuster localiza la primera flag.

Nos descargamos el diccionario `easypeasy.txt` que nos dan y vamos a listar directorios don GoBuster.

!**Pasted image 20260327183421.png**

Vamos a ver qué hay en el directorio.

!**Pasted image 20260327183522.png**

Nos la descargamos y la investigamos.

No parece haber nada interesante a priori, vamos a enumerar ahora este directorio:

!**Pasted image 20260327185045.png**

Vamos a ver qué hay en este directorio.

!**Pasted image 20260327185124.png**

Si miramos el código fuente encontramos una string en base64.

!**Pasted image 20260327185155.png**

Si la decodeamos encontramos la flag.

!**Pasted image 20260327185255.png**

5. Enumera más la máquina ¿cuál es la segunda flag?

Si nos fijamos en el último puerto, este tiene un `robots.txt`, vamos a ver qué hay en él.

!**Pasted image 20260327185517.png**

Parece un hash md5, vamos a ver qué es.

!**Pasted image 20260327185600.png**

6. Crackea el hash con easypeasy.txt ¿cuál es la tercera flag?

Si vamos a la página home del último puerto y miramos el código fuente vemos lo siguiente:

!**Pasted image 20260327185804.png**

Esta es la tercera flag.

7. ¿Cuál es el directorio escondido?

En la misma página que encontramos la tercera flag, existe una string encodeada en base... No sabemos cuál, así que probamos.

!**Pasted image 20260327190744.png**

Después de probar un poco en CyberChef vemos que era base62.

!**Pasted image 20260327190855.png**

8. Usando el diccionario proporcionado crackea el hash ¿cuál es la contraseña?

Vamos al directorio. Y nos encontramos con esto:

!**Pasted image 20260327191024.png**

Se ve un número escrito en negro, vamos a mirar el código fuente.

!**Pasted image 20260327191100.png**

Para saber qué tipo de hash es usamos hashcat.

!**Pasted image 20260327191643.png**

Probamos cada uno de estos tipos. Hasta que finalmente el formato 6900 nos da resultado.

!**Pasted image 20260327191903.png**

9. ¿Cual es la contraseña para iniciar sesión por SSH?

Vamos a investigar las imágenes que hemos ido encontrando con la contraseña encontrada.

!**Pasted image 20260327192231.png**

De la segunda imagen del directorio secreto obtenemos algo. Vamos a ver qué es.

!**Pasted image 20260327192317.png**

Está en binario, vamos a traducirlo.

!**Pasted image 20260327192401.png**

10. ¿Cual es la flag del user?

Vimos que el SSH de la máquina está en el puerto `6498`. Vamos a conectarnos.

!**Pasted image 20260327192627.png**

Parece haber sufrido una rotación. Vamos a ver cuál.

!**Pasted image 20260327192752.png**

Por lo que se ve era ROT13.

11. ¿Cuál es la flag de root?

Nos decían algo de un cron job y además el mensaje de inicio de sesión dice algo de 1 minuto, por lo que se puede intuir, vamos a ver qué hay en `/etc/crontab`.

!**Pasted image 20260327192905.png**

Parece que se está ejecutando como root `.mysecretcronjob.sh`. Vamos a ver de qué se trata.

!**Pasted image 20260327193024.png**

Parece ser que podemos ejecutar este archivo, es nuestro. Vamos a ver qué contiene.

!**Pasted image 20260327193112.png**

Vale no hace nada, vamos a hacer que sí haga.

Nos ponemos en escucha.

!**Pasted image 20260327193557.png**

Ahora metemos las lineas correctas en el archivo.

!**Pasted image 20260327193623.png**

Y esperamos.

!**Pasted image 20260327193740.png**

Leemos la flag.

!**Pasted image 20260327193954.png**