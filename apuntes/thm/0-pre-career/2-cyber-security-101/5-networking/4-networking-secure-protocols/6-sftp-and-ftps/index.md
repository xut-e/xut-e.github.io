---
layout: apunte
title: "6. SFTP and FTPS"
---

SFTP significa SSH File Transfer Protocol y permite la transferencia de archivos de manera segura. Es parte de la suite del protocolo SSH y comparte el mismo puerto, 22. Si está configurado de tal manera puedes conectarte con el comando `sftp <username>@<hostname>`. Una vez logueado, puedes usar comandos como `get <filename>` y `put <filename>` para descargar y subir archivos.

SFTP no debe ser confundido con FTPS (File Transfer Protocol Secure).