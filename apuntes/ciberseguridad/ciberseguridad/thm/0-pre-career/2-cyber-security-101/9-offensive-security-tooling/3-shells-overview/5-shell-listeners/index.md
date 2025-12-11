---
layout: apunte
title: "5. Shell Listeners"
---

Hasta ahora hemos estado usando Netcat para escuchar todas nuestras conexiones, pero hay más. Exploremos algunas de las herramientas de escucha de conexiones.

-----------------------
<h2>Rlwrap</h2>
Es una pequeña utilidad que usa la librería readline de GNU para ofrecernos modificar el teclado e historial. A continuación una muestra de un netcat mejorado con rlwrap:

```shell
attacker@kali:~$ rlwrap nc -lvnp 443
listening on [any] 443 ...
```

Envuelve `nc` con `rlwrap`, permitiendo el uso de funcionalidades como el uso de flechas e historial para una mejor interacción.

-------------------
<h2>Ncat</h2>
Ncat es una versión mejorada de Netcat distribuida por el proyecto NMAP. Ofrece funcionalidades extra, como encriptación SSL. A continuación unos ejemplos escuchando reverse shells sin y con encriptación SSL, respectivamente:

```shell
attacker@kali:~$ ncat -lvnp 4444
Ncat: Version 7.94SVN ( https://nmap.org/ncat )
Ncat: Listening on [::]:443
Ncat: Listening on 0.0.0.0:443
```

```shell
attacker@kali:~$ ncat --ssl -lvnp 4444
Ncat: Version 7.94SVN ( https://nmap.org/ncat )
Ncat: Generating a temporary 2048-bit RSA key. Use --ssl-key and --ssl-cert to use a permanent one.
Ncat: SHA-1 fingerprint: B7AC F999 7FB0 9FF9 14F5 5F12 6A17 B0DC B094 AB7F
Ncat: Listening on [::]:443
Ncat: Listening on 0.0.0.0:443
```

La opción `--ssl` habilita la encriptación SSL para el listener.

--------------------------
<h2>Socat</h2>
Es una utilidad que permite crear una conexión socket entre dos fuentes de información, en este caso, dos hosts diferentes.

```shell
attacker@kali:~$ socat -d -d TCP-LISTEN:443 STDOUT
2024/09/23 15:44:38 socat[41135] N listening on AF=2 0.0.0.0:443
```

El comando de arriba usa la opción `-d` para permitir el output verbose, usarlo más veces incrementa el verbose (`-d -d`). La opción `TCP-LISTEN:443` crea un listener TCP en el puerto 443. Finalmente la opción STDOUT dirije cualquier información entrante a la terminal.