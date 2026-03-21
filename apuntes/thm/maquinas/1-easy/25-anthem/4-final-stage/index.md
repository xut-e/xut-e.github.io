---
layout: apunte
title: "4. Final Stage"
---

Vamos a meternos usando todo lo que encontramos.

1. Asegura acceso inicial a la máquina, ¿cuál es el contenido de user.txt?

Usando el usuario del email `sg` y la contraseña que encontramos, vamos a entrar por `rdesktop`.

!**Pasted image 20260320194348.png|518**

En el escritorio vemos lo siguiente:

!**Pasted image 20260320194500.png**

Si hacemos click:

!**Pasted image 20260320194533.png|561**

2. ¿Puedes encontrar la contraseña del admin?

Le damos a la carpeta, luego a `View` y ahí a `hidden items`.

!**Pasted image 20260320194809.png**

Vemos que hay una carpeta llamada `backup` que estaba oculta.

!**Pasted image 20260320194935.png**

Dentro hay un documento llamado `restore`.

!**Pasted image 20260320194905.png**

Si intentamos abrirlo vemos que no podemos.

!**Pasted image 20260320195332.png**

Le damos:

1. Click derecho -> Propiedades
2. Edit
3. Añadimos al usuario SG
4. Le damos todos  los permisos
5. Aplicamos

!**Pasted image 20260320195433.png**

Ya podemos verla.

6. Escala tus privilegios, ¿cuál es el contenido de root.txt?

Vamos a la carpeta `Users` y le damos a `Administrator`.

!**Pasted image 20260320195557.png**

Nos saldrá esto:

!**Pasted image 20260320195614.png**

Le damos a `Continue` y metemos la contraseña.

Si ahora navegamos hasta el escritorio del administrador encontramos la flag.

!**Pasted image 20260320200046.png**

Y la leemos sin problemas.

!**Pasted image 20260320200108.png**