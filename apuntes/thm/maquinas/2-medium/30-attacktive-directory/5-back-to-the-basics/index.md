---
layout: apunte
title: "5. Back to the Basics"
---

<h2>Enumeración</h2>
Con las credenciales de la cuenta de un usuario ahora tenemos bastante más acceso en el dominio. Ahora podemos intentar enumerar cualquier compartición que el controlador de dominio tenga.

--------------------------
1. ¿Qué utilidad puede ser usada para mapear comparticiones de SMB remotas?

Usamos `smbclient`.

2. ¿Qué opción listará las comparticiones?

La opción es `-L`.

3. ¿Cuántas comparticiones remotas tiene el servidor?

!**Pasted image 20260925152812.png**

Hay 6.

4. Hay una compartición en particular a la que tenemos acceso. ¿Cuál es?

!**Pasted image 20260925152949.png**

Es backup.

5. ¿Cuál es el contenido del archivo?

Lo podemos ver arriba.

6. Descodifica el contenido del archivo, ¿cuál es su contenido completo?

!**Pasted image 20260925153102.png**

Lo decodeamos.