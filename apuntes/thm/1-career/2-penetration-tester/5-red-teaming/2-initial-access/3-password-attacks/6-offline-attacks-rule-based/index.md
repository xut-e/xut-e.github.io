---
layout: apunte
title: "6. Offline Attacks - Rule-Based"
---

<h2>Ataques Basados en Reglas</h2>
Los ataques basados en reglas también son conocidos como `ataques  híbridos`. Los ataques basados en reglas asumen que el atacante conoce algo sobre las políticas de contraseñas. Las reglas son aplicadas para crear contraseñas dentro de las permitidas por estas políticas. Usar wordlists preexistentes puede ser útil al generar contraseñasque cumplan las políticas. Por ejemplo, manipular o cambiar una contraseña como `password` por `p@ssword`, `Pa$$word`, `Passw0rd`, etc.

Para este ataque, podemos expandir una wordlist usando tanto `hashcat` como `John the ripper`. Sin embargo, para este ataque veamos cómo funciona `john`. Normalmente, tiene un archivo de configuración que contiene conjuntos de reglas, el cual está en `/etc/john/john.conf` o `/opt/john/john.conf`, dependiendo de la distro. Puedes leer dicho archivo y buscar las reglas en `List.Rules`:

```bash
user@machine$ cat /etc/john/john.conf|grep "List.Rules:" | cut -d"." -f3 | cut -d":" -f2 | cut -d"]" -f1 | awk NF
JumboSingle
o1
o2
i1
i2
o1
i1
o2
i2
best64
d3ad0ne
dive
InsidePro
T0XlC
rockyou-30000
specific
ShiftToggle
Split
Single
Extra
OldOffice
Single-Extra
Wordlist
ShiftToggle
Multiword
best64
Jumbo
KoreLogic
T9
```

Podemos ver que hay varias reglas para que podamos usar. Crearemos una wordlist con sólo una contraseña que contenga la string `tryhackme`, para ver cómo podemos expandir la wordlist. Vamos a elegir una de las reglas, la `best64`, la cual contiene las mejores 64 reglas incrustadas de `john` y veremos lo que puede hacer.

```bash
user@machine$ john --wordlist=/tmp/single-password-list.txt --rules=best64 --stdout | wc -l
Using default input encoding: UTF-8
Press 'q' or Ctrl-C to abort, almost any other key for status
76p 0:00:00:00 100.00% (2021-10-11 13:42) 1266p/s pordpo
76
```

- `--wordlist=`: Especifica la lista o diccionario.
- `--rules`: Especifica la regla o reglas a usar.
- `--stdout`: Imprime el output en la terminal.
- `| wc -l`: Para contar cuántas líneas ha producido John.

Ejecutando dicho comandoo, expandimos las contraseñas de 1 a 76. Ahora vamos a comprobar otra de las nejores reglas de John: `KoreLogic`. Esta usa varias reglas incrustadas y personalizadas para generar contraseñas complejas. Ahora vamos a usarla y comprobar si `Tryh@ckm3` está en nuestra lista:

```bash
user@machine$ john --wordlist=single-password-list.txt --rules=KoreLogic --stdout | grep "Tryh@ckm3"
Using default input encoding: UTF-8
Press 'q' or Ctrl-C to abort, almost any other key for status
Tryh@ckm3
7089833p 0:00:00:02 100.00% (2021-10-11 13:56) 3016Kp/s tryhackme999999
```

El output del comando anterior muestra que nuestra lista tiene una versión compleja de `tryhackme`, que es `Tryh@ckm3`.Finalmente, recomendamos comprobar todas las reglas hasta encontrar una que funcione para ti. Muchas reglas aplican combinaciones de ordlists existentes y expanden dicha wordlist para incrementar la probabilidad de encontrar una contraseña válida.

-------------------------------------
<h2>Reglas Personalizadas</h2>
`John the ripper` tiene mucho que ofrecer. Por ejemplo, podemos construir nuestras propias reglas y usarlas en tiempo de ejecución mientras john está creackeando un hash o usandr una regla para contruir wordlists personalizadas.

Digamos que queremos crear una lista personalizada de un diccionario ya existente con una modificación personalizada del diccionario original. El objetivo es añadir caracteres especiales al comienzo de cada palabra y añadir números del 0-9 al final. El formato será:

`[símbolo]palabra[0-9]`

Podemos añadir la siguiente regla al final del archivo `john.conf`:

```bash
user@machine$ sudo vi /etc/john/john.conf 
[List.Rules:THM-Password-Attacks] 
Az"[0-9]" ^[!@#$]
```

- `[List.Rules:THM-Password-Attacks]`: Especifica el nombre de la regla.
- `Az`: Representa una sola palabra de la wordlist original usando `-p`.
- `"[0-9]"`: Añade un dígito del 0 al 9 al final. Para dos dígitos `"[0-9][0-9]"`, etc.
- `^[!@#$]`: Añade un caracter especial al principio de cada palabra. `^` significa el comienzo de la palabra/línea. Cambiar `^` por `$` añadirá los caracteres especiales al final de la palabra en lugar de al principio.

Ahora vamos a crear un archivo que contenga la palabra `password` únicamente.

```bash
echo "password" > /tmp/single.lst
```

Incluímos el nombre de la regla que hemos creado en el comando de `john`, usando la opción `--rules`. También tenemos que mostrar el resultado en la terminal, usando `--stdout`:

```bash
user@machine$ john --wordlist=/tmp/single.lst --rules=THM-Password-Attacks --stdout 
Using default input encoding: UTF-8 
!password0 
@password0 
#password0 
$password0
```