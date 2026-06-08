---
layout: apunte
title: "4. Password Profiling 2 - Keyspace Technique and CUPP"
---

<h2>Técnica Keyspace</h2>
Otra forma de preparar una wordlist es usar la técnica key-space. En esta técnica, especificamos un rango de caracteres, números y símbolos en nuestra wordlist. La herramienta `crunch` es una de las más poderosas offline para crear diccionarios. Con `crunch`, podemos especificar numerosas opciones, incluyendo mínimo, máximo y opciones de la siguiente manera:

```bash
user@thm$ crunch -h
crunch version 3.6

Crunch can create a wordlist based on the criteria you specify.  
The output from crunch can be sent to the screen, file, or to another program.

Usage: crunch   [options]
where min and max are numbers

Please refer to the man page for instructions and examples on how to use crunch.
```

El siguiente ejemplo crea una wordlist que contiene todas las posibles combinaciones de 2 caracteres, incluyendo 0-4 y a-d. Podemos usar el argumento `-o` para especificar un archivo en el que guardar el output.

```bash
user@thm$ crunch 2 2 01234abcd -o crunch.txt
Crunch will now generate the following amount of data: 243 bytes
0 MB
0 GB
0 TB
0 PB
Crunch will now generate the following number of lines: xx
crunch: 100% completed generating output
```

Aquí una muestra del output:

```text
00
01
02
03
04
0a
0b
0c
0d
10
.
.
.
cb
cc
cd
d0
d1
d2
d3
d4
da
db
dc
dd
```

Hace falta recalcar que `crunch` puede generar un archivo muy grande dependiendo de la longitud y las opciones de combinación que especifiques. El siguiente comando crea una lista con una longitud exacta de 8 caracteres, conteniendo números 0-9, minúsculas a-f y mayúsculas A-F:

```bash
crunch 8 8 0123456789abcdefABCDEF -o crunch.txt
```

El archivo generado contiene 54.875.873.536 de palabras y ocupa 459 GB.

Además, `crunch` también nos deja especificar un conjunto de caracteres usando la opción `-t` para combinar las palabras de nuestra elección. Aquí hay algunas de las otras opciones que podrían ser usadas para ayudar a crear diferentes combinaciones de tu elección:

- `@`: Caracteres alpha en minúscula.
- `,`: Caracteres alpha en mayúscula.
- `%`: Caracteres numéricos.
- `^`: Caracteres especiales incluyendo espacios.

Por ejemplo, si parte de la contraseña es conocida para nosotros y sabemos que empieza con `pass` y le siguen dos números, podemos usar el símbolo `%` de arriba para coincidir los números. Aquí generamos una wordlist que contenga `pass` seguido de dos números:

```bash
user@thm$  crunch 6 6 -t pass%%
Crunch will now generate the following amount of data: 700 bytes
0 MB
0 GB
0 TB
0 PB
Crunch will now generate the following number of lines: 100
pass00
pass01
pass02
pass03
```

-----------------------------------
<h2>CUPP - Common User Passwords Profiler</h2>
CUPP es una herramienta automática e interactiva escrita en Python para crear wordlists personalizadas. Por ejemplo, si sabes algunos detalles sobre un objetivo específico, como su fecha de cumpleaños, nombre de mascota, nombre de compañía, etc., esto podría ser útil para generar contraseñas basadas en la información conocida. CUPP tomará la información suministrada y generará wordlists personalizadas basado en lo dado. También hay soporte para modo `1337/leet`, lo que sustituye las letras `a`, `i`, `e`, `t`, `o`, `s`, `g`, `z` con números. Por ejemplo, reemplaza `a` con `4` o `i` con `1`.

Para ejecutar CUPP, necesitamos python 3. Clonamos el repositorio:

```bash
user@thm$  git clone https://github.com/Mebus/cupp.git
Cloning into 'cupp'...
remote: Enumerating objects: 237, done.
remote: Total 237 (delta 0), reused 0 (delta 0), pack-reused 237
Receiving objects: 100% (237/237), 2.14 MiB | 1.32 MiB/s, done.
Resolving deltas: 100% (125/125), done.
```

Y cambiamos de directorio al del programa para ejecutarlo:

```bash
user@thm$  python3 cupp.py
 ___________
   cupp.py!                 # Common
      \                     # User
       \   ,__,             # Passwords
        \  (oo)____         # Profiler
           (__)    )\
              ||--|| *      [ Muris Kurgas | j0rgan@remote-exploit.org ]
                            [ Mebus | https://github.com/Mebus/]

usage: cupp.py [-h] [-i | -w FILENAME | -l | -a | -v] [-q]

Common User Passwords Profiler

optional arguments:
  -h, --help         show this help message and exit
  -i, --interactive  Interactive questions for user password profiling
  -w FILENAME        Use this option to improve existing dictionary, or WyD.pl output to make some pwnsauce
  -l                 Download huge wordlists from repository
  -a                 Parse default usernames and passwords directly from Alecto DB. Project Alecto uses purified databases of Phenoelit and CIRT which were merged and enhanced
  -v, --version      Show the version of this program.
  -q, --quiet        Quiet mode (don't print banner)
```

CUPP soporta un modo interactivo donde hace preguntas sobre el objetivo y basándose en las respuestas proporcionadas, crea una wordlist personalizada. Si no tienes una respuesta para un campo dado, sáltalo presionando `Enter`.

```bash
user@thm$  python3 cupp.py -i
 ___________
   cupp.py!                 # Common
      \                     # User
       \   ,__,             # Passwords
        \  (oo)____         # Profiler
           (__)    )\
              ||--|| *      [ Muris Kurgas | j0rgan@remote-exploit.org ]
                            [ Mebus | https://github.com/Mebus/]


[+] Insert the information about the victim to make a dictionary
[+] If you don't know all the info, just hit enter when asked! ;)

> First Name: 
> Surname: 
> Nickname: 
> Birthdate (DDMMYYYY): 


> Partners) name:
> Partners) nickname:
> Partners) birthdate (DDMMYYYY):


> Child's name:
> Child's nickname:
> Child's birthdate (DDMMYYYY):


> Pet's name:
> Company name:


> Do you want to add some key words about the victim? Y/[N]:
> Do you want to add special chars at the end of words? Y/[N]:
> Do you want to add some random numbers at the end of words? Y/[N]:
> Leet mode? (i.e. leet = 1337) Y/[N]:

[+] Now making a dictionary...
[+] Sorting list and removing duplicates...
[+] Saving dictionary to .....txt, counting ..... words.
> Hyperspeed Print? (Y/n)
```

Como resultado, una lista personalizada que contiene varias palabras basada en las entradas proporcionadas. Las wordlists pre-creadas pueden ser descargadas en tu máquina de la siguiente manera:

```bash
user@thm$  python3 cupp.py -l
 ___________
   cupp.py!                 # Common
      \                     # User
       \   ,__,             # Passwords
        \  (oo)____         # Profiler
           (__)    )\
              ||--|| *      [ Muris Kurgas | j0rgan@remote-exploit.org ]
                            [ Mebus | https://github.com/Mebus/]


        Choose the section you want to download:

     1   Moby            14      french          27      places
     2   afrikaans       15      german          28      polish
     3   american        16      hindi           29      random
     4   aussie          17      hungarian       30      religion
     5   chinese         18      italian         31      russian
     6   computer        19      japanese        32      science
     7   croatian        20      latin           33      spanish
     8   czech           21      literature      34      swahili
     9   danish          22      movieTV         35      swedish
    10   databases       23      music           36      turkish
    11   dictionaries    24      names           37      yiddish
    12   dutch           25      net             38      exit program
    13   finnish         26      norwegian


        Files will be downloaded from http://ftp.funet.fi/pub/unix/security/passwd/crack/dictionaries/ repository

        Tip: After downloading wordlist, you can improve it with -w option

> Enter number:
```

Basado en tus intereses, puedes elegir una wordlist de las de la lista de arriba para ayudar en la generación de diccionarios para fuerza bruta.

Finalmente, CUPP también ofrecerá nombres de usuario y contraseñas por defecto de la base de datos de Aleco usando la opción `-a`.

```bash
user@thm$  python3 cupp.py -a
 ___________
   cupp.py!                 # Common
      \                     # User
       \   ,__,             # Passwords
        \  (oo)____         # Profiler
           (__)    )\
              ||--|| *      [ Muris Kurgas | j0rgan@remote-exploit.org ]
                            [ Mebus | https://github.com/Mebus/]


[+] Checking if alectodb is not present...
[+] Downloading alectodb.csv.gz from https://github.com/yangbh/Hammer/raw/b0446396e8d67a7d4e53d6666026e078262e5bab/lib/cupp/alectodb.csv.gz ...

[+] Exporting to alectodb-usernames.txt and alectodb-passwords.txt
[+] Done.
```

