---
layout: apunte
title: "5. Secure Shell (SSH)"
---

Secure Shell (SSH) fue creado para ofrecer una forma segura de administra un sistema remoto. En otras palabras, te permite conectarte de forma segura a otro sistema a través de la red y ejecutar comandos en el sistema remoto. Es decir que puedes:

1. Confirmar la identidad del servidor remoto.
2. Intercambiar mensajes cifrados sólo descifrables por el receptor.
3. Detectar modificaciones hechas a los mensajes.

Para usar SSH necesitas un servidor SSH y un cliente. Escucha en el puerto 22 por defecto. Para autentificarte usa:

- Usuario y contraseña.
- Clave pública y privada.

Veamos un ejemplo de conexión.

```shell
user@TryHackMe$ ssh mark@10.82.183.163
mark@10.82.183.163`s password: XBtc49AB

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
Last login: Mon Sep 20 13:53:17 2021
mark@debian8:~$ 
```

Como es la primera vez que nos conectamos a este sistema, tenemos que verificar que en efecto es quien dice ser.

Podemos usar SCP (Secure Copy Protocol) que está basado en SSH para transportar archivos de una máquina a otra. La sintaxis es: 
1. `scp user@ip:/remote_path /local_path` para descargar.
2. `scp /local_path user@ip:/remote_path` para enviar.

>[!IMPORTANT] FTP puede ser securizado usando SSL/TL (puerto 990) que resulta en FTPS o usando el protocolo SSH que resulta en SFTP (puerto 22, como SSH).

