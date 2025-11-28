---
layout: apunte
title: "6. Privilege Escalation - SUID"
---

Muchos de los controles de privilegios en Linux recaen en controlar las interacciones de usuarios y archivos. Esto se hace con permisos. Ya sabemos que los archivos/directorios pueden tener permisos de lectura, escritura y ejecución. Estos se le dan a usuarios con su nivel de privilegios. Esto cambia con el SUID (Set-User IDentification) y SGID (Set-Group IDentification). Estos permiten que los archivos sean ejecutados con un nivel de permisos del dueño o grupo dueño del archivo, respectivamente.

Notarás que estos archivos tienen un bit "s" que muestra su nivel de permiso especial.

`find / -type f -perm -04000 -ls 2>/dev/null` listará los archivos con el bit SUID o SGID configurado.

!**Pasted image 20251127122635.png**

Una buena práctica sería comparar ejecutables en esta lista con GTFOBins. Hacer click en el botón SUID filtrará binarios que se sepa que son explotables cuando el bit SUID esté configurado.

La lista arriba muestra que nano tiene el bit SUID configuradoo. Desafortunadamente, GTFOBins no ofrece una victoria fácil. Típico en los entornos reales, necesitaremos encontrar pasos intermedios en la escalada de privilegios.

!**Pasted image 20251127123032.png**

El bit SUID configurado para nano nos permite crear, editar o leer archivos con permisos del ueño. Nano es propiedad de root, lo que quiere decir que podemos leer y editar archivos a alto nivel de privilegios. Aquí tenemos dos opciones básicas para la escalada de privilegios: leer el archivo `/etc/shadow` o añadir el usuario a `/etc/passwd`.

Aquí los pasos para explotar ambos vectores.

Leyendo el archivo `/etc/file`:

Vemos que el editor nano tiene el SUID configurado ejecutando el comando `find / -type f -perm -04000 -ls 2>/dev/null`.

`nano /etc/shadow` imprimirá los contenidos de `/etc/shadow`. Ahora podemos usar la herramienta `unshadow` para crear un archivo crackeable por `John the Ripper`. Para conseguir esto, `unshadow` necesita ambos archivos: `/etc/passwd` y `/etc/shadow`.

!**Pasted image 20251127123722.png**

La herramienta unshadow se usa así:

`unshadow passwd.txt shadow.txt > passwords.txt`

!**Pasted image 20251127123836.png**

Con el diccionario correcto y un poco de suerte, John the Ripper puede devolver una o varias contraseñas en texto plano.

La otra opción sería añadir un nuevo usuario con privilegios root. Esto podría sernos de ayuda para circunvalar el tedioso proceso de romper las contraseñas.

Necesitamos el valor hash de la contraseña que queramos usar. Esto se puede hacer rápidamente usando la herramienta `openssl` en Kali Linux.

!**Pasted image 20251127124105.png**

Entonces añadimos la contraseña con un nombre de usuario en el archivo `/etc/shadow`.

!**Pasted image 20251127124133.png**

>[!IMPORTANT] Fíjate que hemos usado `root:/bin/bash` para conseguir una shell de root.

Si nos cambiamos a este usuario tendremos la shell como root.

!**Pasted image 20251127124308.png**

