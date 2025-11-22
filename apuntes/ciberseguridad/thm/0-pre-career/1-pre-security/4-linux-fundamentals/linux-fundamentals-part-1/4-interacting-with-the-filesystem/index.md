---
layout: apunte
title: "4. Interacting with the Filesystem"
---

En esta lección veremos cómo navegar en el sistema de ficheros, leer y crear archivos.

<h2>Interactuar con el Sistema de Ficheros</h2>
Ser capaz de navegar entre ficheros es esencial, para ello:

| Command | Full Name                                             |
| ------- | ----------------------------------------------------- |
| ls      | Listar los archivos de un directorio                  |
| cd      | Cambiar de directorio.                                |
| cat     | Concatenar los caracteres de un archivo               |
| pwd     | Print Working Directory, muestra el directorio actual |

-----------------
<h3>Listar los Archivos</h3>
Antes de poder hacer nada como leer el contenido de archivos, necesitamos saber qué existe.

Para esto podemos usar ls. Podemos usar ls en rutas absolutas o relativas, no sólo en nuestro directiorio actual.

```bash
tryhackme@linux1:~$ ls
'Important Files' 'My Documents' Notes Pictures
```

-------------------
<h3>Cambiar nuestro Directorio actual</h3>
Chang Directory (cd) sirve para cambiar de directorio:

```bash
tryhackme@linux1:~$ cd Pictures
tryhackme@linux1:~/Pictures$ ls
dog_picture1.jpg dog_picture2.jpg dog_picture3.jpg
```

--------------------------
<h3>Viendo el contenido de un Archivo</h3>
Cat es una abreviatura de concatenate, que implica concatenar los bits de texto en un sólo output, si no se especifica ese canal de salida, será la pantalla.

```txt
tryhackme@linux1:~/Documents$ cat todo.txt
Here's something important for me to do later!
```

--------------------------
<h3>Encontrando el path entero a nuestro Directorio Actual de Trabajo</h3>
Para saber en qué directorio estamos actualmente existe un comando: pwd (Print Working Directory):

```bash
tryhackme@linux1:~/Documents$ pwd
/home/ubuntu/Documents
```
