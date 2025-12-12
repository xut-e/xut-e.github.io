---
layout: apunte
title: "3. Managing Users in AD"
---

Nuestra primera tarea como administrador del dominio es comprobar los OUs y usuarios existentes en el AD ya que hay algunos cambios recientes. Los cambios son los siguientes:

!**050.png**

---------------
<h2>Borrar OUs y usuarios</h2>
Lo primero que deberías notar es que hay un departamento OU adicional en nuestro AD actual:

!**051.png**

Nos han dicho que lo han cerrado por ajustes de presupuesto. Si intentas hacer click derecho y borrarlo recibirás el error:

!**052.png**

Para poder borrarlo debemos activar opciones avanzadas en el menú `View` porque los OUs están protegidos contra borrados accidentales.

Una vez allí podemos hacer click derecho en el OU que queramos borrar, darle a propiedades y una vez allí ir a Objeto y quitar el tick de `Protect object from accidental deletion`.

!**053.png**

Acto seguido podemos borrar el OU.

Después de borrarlo nos damos cuenta de que no todos los usuarios coinciden, en concreto sobran Cristine y Robert de Sales, por lo que los eliminamos. El resto está bien.

-------------------
<h2>Delegación</h2>
Una de las cosas buenas que puedes hacer en AD es delegar (dar control a ciertos usuarios sobre algunas OUs). Uno de los casos más comunes para este propósito es darle al `IT Support` los privilegios necesarios para resetear la contraseña de otros usuarios de bajos privilegios.

En este ejemplo vamos a delegar control de Sales a Phillip. Para ello hacemos click derecho en el OU que queramos delegar, después introducimos el nombre y le damos a `check names`. Después le damos a `next` y seleccionamos la opción que queramos aplicar, en este caso: `Reset user passwords and force password change at next logon`.

Para forzar a un usuario a cambiar su contraseña desde la consola podemos usar el comando: `Set-ADAccountPassword sophie -Reset -NewPassword (Read-Host -AsSecureString -Prompt 'New Password') -Verbose.

Como no queremos que siga usando una contraseña que ya conocemos podemos hacer: `Set-ADAccountPassword sophie -Reset -NewPassword (Read-Host -AsSecureString -Prompt 'New Password') -Verbose`


>[!IMPORTANT] Para conectarnos a una máquina Windows por RDP (Remote Desktop Protocol) usamos el comando: `xfreerdp3 /u:<usuario> /p:<contraseña> /v:<direccion_ip>`.

