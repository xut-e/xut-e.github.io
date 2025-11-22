---
layout: apunte
title: "4. Stored XSS"
---

Como su nombre indica, el payload XSS se guarda en la aplicación web (en una base de datos por ejemplo) y se ejecuta cuando otros usuarios visitan la página o el sitio web.

----------------------------------
<h2>Escenario de Ejemplo</h2>
Un blog de un sitio web que permite a los usuarios comentas. Desafortunadamente, estos comentarios no se revisan para ver si contienen JavaScript o código malicioso. Si publicamos un comentario que contenga JavaScript, será guardado en la base de datos y cada usuario que visite el artículo cargará el JavaScript en su buscador.

!**Pasted image 20251106201028.png**

--------------------------
<h2>Impacto Potencial</h2>
El código JavaScript malicioso podría redirigir a los usuarios hacia otro sitio web, robar su cookie de sesión o realizar otras acciones mientras actúa como el usuario visitante.

----------------------------------
<h2>Cómo Comprobar Stored XSS</h2>
Necesitarás comprobar cada posible punto de entrada donde parezca que la información puede ser guardada y mostrada:

- Comentarios en un blog.
- Información del perfil del usuario.
- Listados web.

A veces los desarrolladores piensan que limitar los valores de input del lado del cliente es suficiente protección, así que cambiar los valores a algo que la aplicación web no esperaría es una buena manera de descubrir vulnerabilidades XSS, por ejemplo, un campo de edad que está esperando un entero de un menú desplegable pero mandas la petición manualmente.

Una vez hayas encontrado información que puede ser guardada en la aplicación, necesitaras confirmar que puedes correr tu payload JavaScript. Este dependerá de dónde en la aplicación se refleje tu código.

