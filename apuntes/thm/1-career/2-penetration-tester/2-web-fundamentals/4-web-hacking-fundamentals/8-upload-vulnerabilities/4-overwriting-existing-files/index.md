---
layout: apunte
title: "4. Overwriting Existing Files"
---

Cuando se suben archivos a un servidor, se deberían de hacer un número de comprobaciones para asegurar que el archivo no sobrescribirá nada que ya exista en el servidor. Una práctica común es asignar un nombre al archivo ya sea aleatorio o con la fecha y hora de subida. Si un archivo con el mismo nombre ya existe, el servidor debe mandar un mensaje de error conforme ese nombre ya existe. También son relevantes los permisos ya que un archivo que contenga la web no debería ser escribible por el usuario.

Si no se toman dichas precauciones, podemos ser capaces de sobrescribir archivos existentes en el servidor. 

>[!CAUTION] Usaremos `demo.uploadvulns.thm` para todas las demostraciones. Es puramente para propósitos demostrativos y no está disponible en la máquina virtual.

En la siguiente imagen tenemos una página web con un formulario de subida.

!**Pasted image 20251213142409.png**

Puede que necesites enumerar más que esto para un reto real. Sin embargo, por esta vez, miraremos el código fuente de la página.

!**Pasted image 20251213142556.png**

Aquí podemos ver el código responsable de representar la imagen que vemos. Sale de un archivo llamado `spaniel.jpg` dentro de un directorio llamado `images`.

La pregunta aquí es: ¿podemos sobrescribirlo?

Vamos a descargarnos una imagen diferente y a llamarla `spaniel.jpg`.

!**Pasted image 20251213142900.png**

Ahora la subimos a ver qué pasa.

!**Pasted image 20251213142914.png**

Nuestro ataque ha sido exitoso. Hemos conseguido sobrescribir el archivo `images/spaniel.jpg` con nuestra propia copia.

-------------------------------------------
Ahora pongámoslo a prueba. Abre el navegador y navega a `http://overwrite.uploadvulns.thm`. Tu objetivo es sobrescribir el archivo con uno tuyo.

1. Navegamos a la dirección dada.
   !**Pasted image 20251213143124.png**
2. Inspeccionamos el código fuente con `Ctrl + U`.
   !**Pasted image 20251213143158.png**
   Aquí podemos ver que el fondo cargado es una imagen llamada `mountains.jpg` cargada desde el directorio `images`.
3. Vamos a descargarnos una imagen y a llamarla de la misma forma.
   !**Pasted image 20251213143334.png**
4. Le damos a `Select File`, seleccionamos la imagen que nos acabamos de descargar y le damos a `Upload`.
   !**Pasted image 20251213143448.png**
5. Obtenemos la flag.
   !**Pasted image 20251213143507.png**

