---
layout: apunte
title: "5. Simple Mail Transfer Protocol (SMTP)"
---

El email es uno de los servicios más usados en internet. Hay varias configuraciones para servidores de email. Por ejemplo, puedes configurar un servidor para permitir a usuarios locales intercambiar emails con cada uno sin acceso a internet. Sin embargo, consideraremos configuraciones más generales.

El envío de emails a través de internet requiere lo siguiente:

1. Mail Submission Agent (MSA)
2. Mail Transfer Agent (MTA)
3. Mail Delivery Agent (MDA)
4. Mail User Agent (MUA)

Son los agentes de subida, transferencia, reparto y usuario.

!**Pasted image 20251121121401.png**

Los pasos son:

1. Un MUA sube un correo al MSA.
2. El MTA lo manda mediante el MDA al MTA del recibidor.
3. El MSA del recibidor lo manda al MUA del recibido.

Un MSA puede funcionar también como MTA.

Para comunicarnos con todos los agentes necesitamos el conjunto de dos protocolos.

- SMTP (Simple Mail Transfer Protocol).
- POP3 (Post Office) o IMAP (Internet Message Access Protocol).

Explicaremos POP3 e IMAP más adelante, en esta tarea nos centraremos en SMTP.

SMTP se utiliza para comunicarse con el servidor MTA. Como SMTP manda las comunicaciones sin cifrar, podemos usar Telnet para conectarnos a un servidor SMTP simulando ser un MUA.

SMTP escucha en el puerto 25 por defecto. Una vez conectados usamos `helo hostname` para empezar a escribir nuestro mail.

```shell
pentester@TryHackMe$ telnet 10.80.185.10 25
Trying 10.80.185.10...
Connected to 10.80.185.10.
Escape character is '^]'.
220 bento.localdomain ESMTP Postfix (Ubuntu)
helo telnet
250 bento.localdomain
mail from: 
250 2.1.0 Ok
rcpt to: 
250 2.1.5 Ok
data
354 End data with .
subject: Sending email with Telnet
Hello Frank,
I am just writing to say hi!             
.
250 2.0.0 Ok: queued as C3E7F45F06
quit
221 2.0.0 Bye
Connection closed by foreign host.
```

Después de `helo`, mandamos `mail from:` y `rcpt to:` para indicar el emisor y el receptor. Cuando mandamos el email usamos el comando `data` y escribimos el mensaje. Usamos  `<CR><LF>.<CR><LF>` o `Enter . Enter`. Entonces el servidor SMTP pone el mensaje en cola.

