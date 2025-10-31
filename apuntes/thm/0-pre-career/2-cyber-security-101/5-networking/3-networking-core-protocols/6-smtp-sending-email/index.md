---
layout: apunte
title: "6. SMTP - Sending Email"
---

Como con buscar en la web y descargar archivos, mandar emails tiene su propio protocolo. Simple Mail Transfer Protocol (SMTP) define cómo el cliente de mail se habla con el servidor y viceversa.

Veamos algunos de los comandos usados por dicho protocolo:

- `HELO` o `EHLO` comienza la sesión.
- `MAIL FROM` especifica el emisor del mail.
- `RCPT TO` especifica el receptor del mail.
- `DATA` indica que el cliente va a empezar a mandar el contenido del mail.
- `.` se manda en una linea por separado para indicar el final del mail.

A continuación un ejemplo de un email mandado por `telnet`:

```bash
user@TryHackMe$ telnet MACHINE_IP 25 
Trying MACHINE_IP... 
Connected to MACHINE_IP. 
Escape character is '^]'. 
220 example.thm ESMTP Exim 4.95 Ubuntu Thu, 27 Jun 2024 16:18:09 +0000 
HELO client.thm 
250 example.thm Hello client.thm [10.11.81.126] 
MAIL FROM: <user@client.thm> 
250 OK 
RCPT TO: <strategos@server.thm> 
250 Accepted 
DATA 
354 Enter message, ending with "." on a line by itself 
From: user@client.thm 
To: strategos@server.thm 
Subject: Telnet email  
Hello. I am using telnet to send you an email! 
. 
250 OK id=1sMrpq-0001Ah-UT 
QUIT 
221 example.thm closing connection 
Connection closed by foreign host.
```

Mandar un email por `telnet` es complicado e ineficiente, pero te ayuda a comprender mejor cómo funciona el protocolo. Una imagen de Wireshark (cliente en rojo y servidor en azul) para visualizarlo mejor:

!**084.png**

