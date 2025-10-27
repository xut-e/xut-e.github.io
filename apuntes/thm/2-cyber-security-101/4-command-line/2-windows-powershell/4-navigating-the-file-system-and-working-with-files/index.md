---
layout: apunte
title: "4. Navigating the File System and Working with Files"
---

PowerShell nos ofrece un rango de cmdlets para navegar por el sistema de ficheros y gestionar archivos.

Similar a `dir` (o `ls` en UNIX), `Get-ChildItem` lista los archivos y directorios de una localización especificada con el parámetro `-Path`. Si no se especifica la ruta, se tomará por defecto la actual.

Para navegar a un directorio diferente podemos usar `Set-Location`. Es el homólogo de `cd`.

Para crear cualquier cosa podemos usar `New-Item`. Después especificamos la ruta y qué tipo de ítem es. De forma similar, para borrar un ítem: `Remove-Item`.

Para copiar y mover: `Copy-Item` y `Move-Item`.

Para leer los contenidos de un archivo, `Get-Content`.