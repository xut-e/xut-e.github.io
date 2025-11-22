---
layout: apunte
title: "4. Comparer - Overview"
---

El Comparer, como su nombre implica, nos permite comparar dos piezas de información, ya sea por palabras ASCII o bytes.

Veamos la interfaz:

!**Pasted image 20251116211727.png**

La interfaz puede ser dividida en tres secciones principales.

1. A la izquierda vemos los ítems para ser comparados. Cuando cargamos la información en el Comparer, aparece como filas en las tablas.Seleccionamos dos para compararlos.
2. En la parte superior derecha tenemos opciones para pegar información del clipboard, cargarlo de un archivo, eliminar la fila actual, y limpiar todos los datasets.
3. Por último en la parte inferior derecha, podemos elegir entre compararlos por palabras o por bytes. Da igual lo que selecciones al principio porque se puede cambiar más adelante.

También puedes cargar información en él desde otros módulos haciendo click derecho y "**Send to Comparer**".

Una vez añadidos al menos 2 datasets y le demos a **words** o **bytes** salta una ventana que se ve así:

!**Pasted image 20251116212840.png**

Esta ventana también tiene 3 secciones.

1. La información comparada ocupa la mayor parte de la ventana. Se puede ver en texto o en hex.
2. Abajo a la izquierda está la llave de comparación que muestra lo que representan los colores.
3. La caja de "**Sync views**", abajo a la derecha, hace que cuando la seleccionamos, se asegura de que los datasets tengan el mismo formato.

El título de la pestaña muestra el número total de diferencias encontradas.