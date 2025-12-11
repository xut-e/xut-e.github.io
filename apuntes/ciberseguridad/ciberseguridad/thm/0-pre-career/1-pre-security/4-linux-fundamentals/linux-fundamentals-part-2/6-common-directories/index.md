---
layout: apunte
title: "6. Common Directories"
---

<h2>/etc</h2>
Viene de etcetera. Es uno de los más importantes. Este directorio es un lugar común en el sistema para almacenar archivos que serán usados por el sistema operativo.

Por ejemplo, el archivo sudoers que contiene una lista de usuarios y grupos que tienen permiso para hacer "sudo".

También están los archivos "passwd" y "shadow". Estos son especiales de Linux porque guardan contraseñas encriptadas para cada usuario.

```bash
tryhackme@linux2:/etc$ ls
shadow passwd sudoers sudoers.d
```

-----------------
<h2>/var</h2>
Viene de variable data. Almacena información que es frecuentemente accedida o escrita por servicios o aplicaciones que corren en el sistema, por ejemplo, los archivos de log son escritos en **/var/log**.

```bash
tryhackme@linux2:/var$ ls
backups log opt tmp
```

-----------------------
<h2>/root</h2>
Root es la carpeta "/home" del usuario root.

```bash
root@linux2:~# ls
myfile myfolder passwords.xlsx
```

---------------------
<h2>/tmp</h2>
Es un directorio que viene de "temporary". Es volátil, lo que implica que lo que haya dentro se borra al apagarse la máquina. Funciona de manera similar a una RAM.

Cualquier usuario puede escribir en este fichero por defecto.

```bash
root@linux2:/tmp# ls
todelete trash.txt rubbish.bin
```
