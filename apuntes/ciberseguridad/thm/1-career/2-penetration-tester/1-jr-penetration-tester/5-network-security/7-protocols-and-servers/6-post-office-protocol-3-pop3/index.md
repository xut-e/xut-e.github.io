---
layout: apunte
title: "6. Post Office Protocol 3 (POP3)"
---

Post Office Protocol version 3 (POP3) es un protocolo usado para descargar mensajes de un servidor MDA como se muestra en la imagen de abajo.

!**Pasted image 20251121123701.png**

El ejemplo de abajo muestra cómo se ve una sesión de POP3 si fuera conducida vía Telnet. Primero, el usuario se conecta al servidor POP3 en el puerto 110 (por defecto). Se requiere autentificación para acceder a los mensajes. El usuario debe dar el usuario  (`USER username`) y la contraseña (`PASS password`).Al usar el comando `STAT` obtenemos la respuesta `+OK 1 179`. Basado en [RFC 1939](https://datatracker.ietf.org/doc/html/rfc1939), una respuesta positiva de `STAT` tiene el formato `+OK nn mm`, donde `nn` es el número de mensajes en la bandeja de entrada y `mm` es el tamaño de la bandeja de entrada en octetos (bytes). El comando `LIST` ofrece una lista de mensajes nuevos en el servidor y `RETR 1` devuelve el primer mensaje en la lista.

```shell
pentester@TryHackMe$ telnet 10.80.185.10 110
Trying 10.80.185.10...
Connected to 10.80.185.10.
Escape character is '^]'.
+OK 10.80.185.10 Mail Server POP3 Wed, 15 Sep 2021 11:05:34 +0300 
USER frank
+OK frank
PASS D2xc9CgD
+OK 1 messages (179) octets
STAT
+OK 1 179
LIST
+OK 1 messages (179) octets
1 179
.
RETR 1
+OK
From: Mail Server 
To: Frank 
subject: Sending email with Telnet
Hello Frank,
I am just writing to say hi!
.
QUIT
+OK 10.80.185.10 closing connection
Connection closed by foreign host.
```

Según configuración por defecto, el cliente borra el mensaje después de descargarlo, aunque esto se puede cambiar. Entrar con varios clientes a la misma cuenta no está recomendado, ya que este podría perder la habilidad de controlar mensajes leídos/no leídos. Es por esto que para tener todas las bandejas de entrada sincronizadas necesitamos usar otros protocolos como IMAP.