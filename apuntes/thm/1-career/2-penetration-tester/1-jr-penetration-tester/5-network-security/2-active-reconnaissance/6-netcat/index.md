---
layout: apunte
title: "6. Netcat"
---

Netcat, o simplemente `nc` tiene diferentes aplicaciones que pueden ser de gran valor para un pentester. Netcat soporta TCP y UDP. Puede funcionar como cliente o como servidor.

Primero, puedes conectarte al servidor como lo hiciste con Telnet, para recolectar su banner con `nc <IP> <PUERTO>`.

>[!NOTE] Puede que tengas que presionar `Shift+Enter` después de la línea `GET`.

```shell
pentester@TryHackMe$ nc 10.10.55.97 80 
GET / HTTP/1.1 
host: netcat  

HTTP/1.1 200 OK 
Server: nginx/1.6.2 
Date: Tue, 17 Aug 2021 11:39:49 GMT 
Content-Type: text/html 
Content-Length: 867 
Last-Modified: Tue, 17 Aug 2021 11:12:16 GMT 
Connection: keep-alive 
ETag: "611b9990-363" 
Accept-Ranges: bytes 

...
```

Si lo que queremos es hacer que sea un servidor, podemos hacerlo con la sintaxis: `nc -lp 1234` o incluso mejor `nc -vnlp 1234`. El orden de las letras no importa siempre y cuando el puerto sea precedido de `-p`.

| Opción | Significado                                               |
| ------ | --------------------------------------------------------- |
| -l     | Modo de escucha.                                          |
| -p     | Especifica el puerto.                                     |
| -n     | Sólo direcciones IP, no aplica resolución DNS.            |
| -v     | Output verbose.                                           |
| -vv    | Output muy verbose.                                       |
| -k     | Sigue escuchando después de que se desconecte el cliente. |
