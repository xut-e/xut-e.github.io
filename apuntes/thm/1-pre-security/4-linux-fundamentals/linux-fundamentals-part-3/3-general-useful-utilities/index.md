---
layout: apunte
title: "3. General-Useful Utilities"
---

<h2>Descargar archivos (wget)</h2>
Una funcionalidad bastante útil de la computación es la capacidad de transferir archivos. Para descargar programas, scripts o incluso imágenes, vamos a cubrir la herramienta `wget`. 

Este comando nos permite descargar archivos web vía HTTP. Simplemente tenemos que proporcionar la URL del recurso. Por ejemplo si quisiera descargar un archivo `web_file.txt`, suponiendo que se la dirección URL: `wget https://assets.tryhackme.com/additional/linux-fundamentals/part3/web_file.txt`.

---------------------
<h2>Transferir archivos desde tu Host - SCP (SSH)</h2>
Secure CoPy (SCP) es una manera de copiar archivos de manera segura. Al contrario que el comando `cp`, este te permite mandar archivos entre dos ordenadores usando SSH. Te permite:

- Copiar archivos y directorios desde tu ordenador a uno remoto.
- Copiar archivos y directorios desde un ordenador remoto a tu ordenador.

Tomando como premisa que conocemos nombre de usuario y contraseña para un usuario del sistema remoto y un usuario del sistema local, para hacerlo necesitamos la siguiente información:

1. La dirección IP de la máquina remota.
2. Un usuario en la máquina remota.
3. Nombre del archivo en la máquina local.
4. Nombre que le pondremos al archivo en la máquina remota.

`scp important.txt ubuntu@192.168.1.30:/home/ubuntu/transferred.txt`

Para la manera inversa (transferir un archivo desde un equipo remoto a un equipo local):

`scp ubuntu@192.168.1.30:/home/ubuntu/transferred.txt`

-------------------
<h2>Servir archivos desde tu Host - WEB</h2>
Las máquinas Linux vienen preparadas con python3. Este proporciona un módulo fácil de usar llamado `"HTTPServer"`. Lo que hace es convertir tu ordenador en un servidor web de manera rápida y sencilla para hostear tus archivos, que pueden ser entonces descargados con `curl` o `wget`.

`HTTPServer` correrá el servidor en el directorio en el que ejecutaste el comando. El comando que debes utilizar para ello es: `python3 -h http.server <puerto>`.