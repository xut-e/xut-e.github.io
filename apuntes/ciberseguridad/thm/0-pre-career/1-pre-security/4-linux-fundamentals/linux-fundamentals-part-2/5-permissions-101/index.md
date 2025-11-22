---
layout: apunte
title: "5. Permissions 101"
---

Como ya habrás comprobado, ciertos usuarios no pueden acceder a según qué archivos o ficheros.

Ya vimos cómo extender comandos con switches como `ls -lh`.

```bash
tryhackme@linux2:~$ ls -lh
-rw-r--r-- 1 cmnatic cmnatic 0 Feb 19 10:37 file1
-rw-r--r-- 8 cmnatic cmnatic 0 Feb 19 10:37 file2
```

Aunque parecen intimidantes, en verdad se leen de manera fácil:

- Read (r)
- Write (w)
- Execute (x)

Estas letras marcan las acciones permitidas a cada grupo.

-------------------
<h2>Diferencias entre Usuarios y Grupos</h2>
Una de las cosas tan geniales de Linux es que mientras un usuario puede tener un cierto conjunto de permisos sobre un archivo o fichero, otro grupo de usuarios puede tener los mismos o diferentes.

------------------
<h2>Cambiar entre Usuarios</h2>
Es muy fácil gracias al comando `su` (switch user). Al hacerlo puedes usar el switch -l para conseguir las variables de entorno, y loguearnos de una manera muy familiar.

```bash
tryhackme@linux2:~$ su user2
Password:
user2@linux2:/home/tryhackme$
```

Al usar `su` para cambiar a user2, la nueva sesión sobrecae en  el directorio anterior al cambio.

```bash
tryhackme@linux2:~$ su -l user2
Password:
user2@linux2:~$ pwd
user2@:/home/user2$
```

Mientras que al usar `-l`, esta recae en la ruta home del nuevo usuario.