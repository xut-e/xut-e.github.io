---
layout: apunte
title: "3. Setting Up a C2 Framework"
---

Para ganar un mejor entendimiento de lo que se requiere para configurar y administrar un servidor C2, estaremos usando Armitage. Como recordatorio, es una GUI para Metasploit.

----------------------------------------
<h2>Configurar Armitage</h2>
<h3>Descargar, Buildear e Instalar Armitage</h3>
Primero debemos clonar el repositorio de GitHub.

```bash
git clone https://gitlab.com/kalilinux/packages/armitage.git && cd armitage
```

Después, debemos buildear la release actual; podemos hacerlo con el siguiente comando:

```bash
bash package.sh
```

Después de eso, la build release estará en `./releases/unix/`. Deberías comprobar que Armitage fue capaz de completar la build exitosamente.

```bash
root@kali$ cd ./release/unix/ && ls -la
total 11000
drwxr-xr-x 2 root root    4096 Feb  6 20:20 .
drwxr-xr-x 4 root root    4096 Feb  6 20:20 ..
-rwxr-xr-x 1 root root      75 Feb  6 20:20 armitage
-rw-r--r-- 1 root root 4334705 Feb  6 20:20 armitage.jar
-rw-r--r-- 1 root root   25985 Feb  6 20:20 armitage-logo.png
-rw-r--r-- 1 root root     282 Feb  6 20:20 build.txt
-rw-r--r-- 1 root root 6778470 Feb  6 20:20 cortana.jar
-rw-r--r-- 1 root root    1491 Feb  6 20:20 license.txt
-rw-r--r-- 1 root root    4385 Feb  6 20:20 readme.txt
-rwxr-xr-x 1 root root    2665 Feb  6 20:20 teamserver
-rw-r--r-- 1 root root   85945 Feb  6 20:20 whatsnew.txt
```

En este directorio hay dos carpetas clave que utilizaremos:

- `teamserver`
- `armitage`

<h3>Teamserver</h3>
Este es el archivo que arrancará el servidor Armitage al que múltiples usuarios podrán conectarse. Este archivo toma dos argumentos:

- Dirección IP.
- Contraseña compartida.

<h3>Armitage</h3>
Este es el archivo que tú usarás para conectarte al Teamserver de Armitage. Al ejecutar el binario, se abrirá un prompt, mostrando la información de conexión y tu nombre de usuario (nickname, no username para autentificación) y contraseña.

!**Pasted image 20260514102637.png**

-----------------------------------------------------
<h2>Preparar Nuestro Entorno</h2>
Antes de que podamos lanzar Armitage, debemos hacer unas comprobaciones previas para asegurarnos de que Metasploit está configurado debidamente. Armitage depende de la funcionalidad de base de datos de Metasploit, por lo que debemos arrancar e inicializar la base de datos antes de lanzar Armitage. Para poder hacer eso, ejecutamos los siguientes comandos:

```bash
sudo systemctl start postgresql && sudo systemctl status postgresql
```

Por último, configura la variable de entorno `MSF_DATABASE_CONFIG` a la localización del archivo `database.yml` de tu Metasploit, que en nuestro caso está en `/root/.msf4/database.yml`.

```bash
export MSF_DATABASE_CONFIG=/root/.msf4/database.yml
```

Después de esto, podemos arrancar el Team Server de Armitage.

---------------------------------------
<h2>Arrancar y Conectarse a Armitage</h2>
```bash
root@kali$ cd /opt/armitage/release/unix && ./teamserver YourIP P@ssw0rd123
[*] Generating X509 certificate and keystore (for SSL)
Picked up _JAVA_OPTIONS: -Dawt.useSystemAAFontSettings=on -Dswing.aatext=true
[*] Starting RPC daemon
[*] MSGRPC starting on 127.0.0.1:55554 (NO SSL):Msg...
[*] MSGRPC backgrounding at 2022-02-06 17:47:08 -0500...
[*] MSGRPC background PID 2083
[*] sleeping for 20s (to let msfrpcd initialize)
[*] Starting Armitage team server
Picked up _JAVA_OPTIONS: -Dawt.useSystemAAFontSettings=on -Dswing.aatext=true
[*] Use the following connection details to connect your clients:
        Host: 127.0.0.2
        Port: 55553
        User: msf
        Pass: P@ssw0rd123

[*] Fingerprint (check for this string when you connect):
        d211e51c8886113433f63b588fd5ccfc9e323059
[+] hacking is such a lonely thing, until now
```

Una vez que tu Teamserver está levantado y corriendo, puedes arrancar el cliente de Armitage. Este es usado para conectarse al servidor y mostrar la GUI.

```bash
root@kali$ cd /opt/armitage/release/unix && ./armitage
[*] Used the incumbent: 10.10.69.193
[*] Starting Cortana on 10.10.69.193
[*] Starting Cortana on 10.10.69.193
[*] Creating a default reverse handler... 0.0.0.0:8836
```

Al operar un framework C2, nunca quieres exponer la interfaz de gestión públicamente. Deberías escuchar en tu interfaz local, nunca una pública. Esto complica el acceso para nuestros operadores de confianza. Por suerte, hay una fácil solución a esto. Para que los operadores ganen acceso al servidor, deberías crear una nueva cuenta de usuario para ellos y habilitar el acceso al servidor mediante SSH y serán capaces de conectarse por SSH al puerto TCP/55553. Armitage deniega explícitamente a usuarios de escuchar en 127.0.0.1. Esto es porque es un servidor compartido de Metasploit con un "Deconfliction Server" que cuando muchos usuarios se conectan al servidor, no ves todo lo que ven otros usuarios. Con Armitage debes escuchar en tu dirección IP tun0/eth0.

!**Pasted image 20260514104325.png**

Después de hacer click en "Connect", se te pedirá un nickname. Puedes configurar esto a lo que quieras, solo tus operadores lo verán.

!**Pasted image 20260514104407.png**

Después de un momento, la UI de Armitage debería abrirse. Hasta que empecemos a interactuar con sistemas remotos, se verá vacío. En la siguiente tarea, explotaremos una máquina virtual vulnerable para acostumbrarnos la la UI de Armitage y a cómo puede ser usada.

!**Pasted image 20260514104520.png**

