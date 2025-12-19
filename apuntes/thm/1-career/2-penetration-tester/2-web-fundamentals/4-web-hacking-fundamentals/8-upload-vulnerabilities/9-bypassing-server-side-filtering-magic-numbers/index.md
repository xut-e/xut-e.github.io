---
layout: apunte
title: "9. Bypassing Server-Side Filtering - Magic Numbers"
---

Ya hemos visto el filtrado de extensiones del lado del servidor, pero vamos a aprovechar para ver cómo se comprueban los magic numbers del lado del servidor también.

Los magic numbers se utilizan para identificar los archivos de manera más precisa. El magic number de un archivo es una string de dígitos hexadecimales y es siempre la primera parte de un archivo. De esta manera, leyendo los primeros bytes de un archivo y comparándolos con una whitelist o blacklist, podemos verificar si el archivo es o no legítimo para su subida.

>[!IMPORTANT] Esta técnica puede ser efectiva contra servidores basados en PHP pero puede fallar contra otros tipos de servidores web.

Veamos un ejemplo. Como generalmente, tenemos una página de subida.

!**Pasted image 20251217135821.png**

Como es esperado, si subimos una shell.php, obtendremos un error. Sin embargo, si subimos un JPEG, el sitio web lo acepta.

Del intento anterior sabemos que los archivos JPEG son aceptados, por lo que le meteremos los magic numbers de JPEG a nuestro `shell.php`. Una vista rápida a la [lista de firmas de la Wikipedia](https://en.wikipedia.org/wiki/List_of_file_signatures) muestra que hay varias posibilidades de magic numbers para archivos JPEG. No debería importar cuál usemos aquí, así que elegiremos uno (`FF D8 FF DB`). Podríamos añadir la representación ASCII de estos caracteres (`ÿØÿÛ`) al principio del documento, pero es más fácil trabajar directamente en hexadecimal.

Antes de empezar, usaremos el comando `file` para comprobar el tipo de archivo de shell.php:

!**Pasted image 20251218111141.png**

Obviamente nos dice que es un archivo PHP. Ahora vamos a añadir 4 caracteres (porque el magic number que hemos seleccionado son 4 caracteres) al inicio del documento. No importa qué caracteres sean.

!**Pasted image 20251218111513.png**

Ahora vamos a abrirlo con `hexeditor` o cualquier otra herramienta que permita editar en hexadecimal.

!**Pasted image 20251218111555.png**

Por lo que se ve la "A" se representa como 41 en hezadecimal. Vamos a cambiar las 4 "A"s por magic numbers.

!**Pasted image 20251218111640.png**

Si ahora usamos el comando `file`:

!**Pasted image 20251218111829.png**

Ahora vamos a subir la shell.

!**Pasted image 20251218111849.png**

Ahí lo tenemos, hemos bypasseado el filtro basado en magic numbers del lado del servidor y obtenido una reverse shell.

---------------------------------------
Ve a `magic.uploadvulns.thm` y encuentra la flag en `/var/www/`.

1. Vamos a la página dada.
   !**Pasted image 20251218115633.png**
2. Vamos a escanear la página con `gobuster`.
   !**Pasted image 20251218121545.png**
3. Vamos a probar a subir nuestra reverse shell del tirón.
   !**Pasted image 20251218115909.png**
   Parece que sólo admiten GIFs.
4. Vamos a la [página de firmas de la Wikipedia](https://en.wikipedia.org/wiki/List_of_file_signatures) y buscamos por GIF.
   !**Pasted image 20251218120019.png**
5. Abrimos nuestro archivo shell y le metemos 6 caracteres cualquiera.
   !**Pasted image 20251218120113.png**
6. Abrimos el documento con `hexeditor`.
   !**Pasted image 20251218120156.png**
7. Cambiamos los "42" por los caracteres seleccionados, por ejemplo `47 49 46 38 37 61`.
   !**Pasted image 20251218120320.png**
8. Guardamos y comprobamos con `file`.
   !**Pasted image 20251218120358.png**
9. Subimos el archivo "GIF".
   !**Pasted image 20251218120620.png**
10. Nos ponemos en escucha.
    !**Pasted image 20251218121624.png**
11. Intentamos navegar a nuestra shell, que estará en `/graphics`.
    !**Pasted image 20251218121730.png**
    Hemos recibido la reverse shell.
12. Vamos a leer la flag.
    !**Pasted image 20251218121829.png**

