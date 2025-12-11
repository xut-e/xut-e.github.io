---
layout: apunte
title: "3. Message Analysis Toolbar"
---

El repetidor nos ofrece varias opciones de presentación de petición y respuesta, desde hexadecimal a página renderizada.

Para explorar estas opciones, podemos ir a la sección situada encima de la caja de respuesta, donde podemos ver los siguientes botones:

!**Pasted image 20251114165239.png**

Se nos presentan 4 opciones:

1. **Pretty:** Esta es la opción por defecto, que toma la respuesta raw y le aplica mejoras leves de formato para mejorar su legibilidad.
2. **Raw:** Esta opción muestra la respuesta tal cual es recibida desde el servidor.
3. **Hex:** Al seleccionar esta opción, podemos examinar la respuesta en un nivel de byte que es particularmente útil al lidiar con archivos binarios.
4. **Render:** La opción de renderizado nos permite visualizar la página como aparecería en un navegador web.

Junto a estos botones, en la parte derecha, podemos encontrar la opción de **Mostrar los Caracteres no Imprimibles**, en el botón `\n`. Esta funcionalidad activa la vista de caracteres que puede que no sean visibles con las opciones **Pretty** o **Raw**. Por ejemplo, cada línea en la respuesta normalmente acaba con los caracteres `\r\n`. Estos caracteres juegan un papel importante en la interpretación de headers HTTP.

>[!TIP] Aunque no es obligatorio para todas las tareas, esta opción puede ser muy útil en ciertas situaciones.

