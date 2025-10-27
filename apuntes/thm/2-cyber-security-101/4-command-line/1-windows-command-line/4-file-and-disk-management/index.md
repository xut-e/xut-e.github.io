---
layout: apunte
title: "4. File and Disk Management"
---

Hemos visto cómo obtener información básica del sistema. Ahora aprenderemos a movernos por los directorios y archivos.

------------------
<h2>Trabajando con directorios</h2>
Podemos usar `cd` sin parámetros para mostrar el drive actual y el directorio actual. Podemos ver los directorios hijos usando `dir`. Con este último comando tenemos la opción de mostrar incluso aquellos ocultos (`dir /a`) o mostrar archivos en el directorio actual y todos los subdirectorios (`dir /s`).

Para obtener una representación visual de directorios y archivos podemos usar `tree`.

Para navegar a cualquier directorio podemos usar `cd <nombre_directorio>`. Para volver atrás podemos usar `cd ..`.

Para crear un directorio usamos `mkdir` y para eliminar un directorio vacío `rmdir`.

-------------------
<h2>Trabajando con archivos</h2>
Podemos ver fácilmente archivos de texto con el comando `type <archivo>`.

El comando `copy` nos permite copiar archivos de un sitio a otro.

Con el comando `move` podemos moverlos de un sitio a otro.

Para borrar un archivo podemos usar `del` o `erase`.

>[!TIP] Podemos usar el asterisco para referirnos a todos los archivos, por ejemplo `copy *.md C:\Markdown` para copiar todos los archivos con extensión .md a la carpeta Markdown.

