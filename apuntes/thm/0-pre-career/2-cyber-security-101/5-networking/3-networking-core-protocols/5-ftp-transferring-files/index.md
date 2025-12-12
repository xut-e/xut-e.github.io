---
layout: apunte
title: "5. FTP - Transferring Files"
---

Al contrario que HTTP, que está diseñado para devolver páginas, FTP está diseñado para transferir archivos.

Algunos comandos usados por FTP:

- `USER`: Usado para poner el nombre de usuario.
- `PASS`: Usado para poner la contraseña.
- `RETR`: (Retrieve) es usado para descargar un archivo del servidor FTP al cliente.
- `STOR`: (Store) es usado para subir un archivo del cliente al servidor FTP.

FTP escucha en el puerto 21 por defecto. La transferencia de información es hecha mediante otra conexión del cliente al servidor.

Abajo un ejemplo y los pasos seguidos para conectarnos:

- Usamos el nombre de usuario `anonymous` para entrar.
- Así no necesitamos poner contraseña.
- Usamos `ls` para ver lo que podemos descargar.
- `type ascii` para cambiar a modo ascii.
- `get coffee.txt` para poder obtener el archivo que queremos.

```bash
user@TryHackMe$ ftp 10.10.178.231  
Connected to 10.10.178.231 (10.10.178.231). 
220 (vsFTPd 3.0.5) 
Name (10.10.178.231:strategos): anonymous 
331 Please specify the password. 
Password: 
230 Login successful. 
Remote system type is UNIX. 
Using binary mode to transfer files. 
ftp> ls 
227 Entering Passive Mode (10,10,41,192,134,10). 
150 Here comes the directory listing. 
-rw-r--r--    1 0        0            1480 Jun 27 08:03 coffee.txt 
-rw-r--r--    1 0        0              14 Jun 27 08:04 flag.txt 
-rw-r--r--    1 0        0            1595 Jun 27 08:05 tea.txt 226 
Directory send OK. 
ftp> type ascii 
200 Switching to ASCII mode. 
ftp> get coffee.txt 
local: coffee.txt remote: coffee.txt 
227 Entering Passive Mode (10,10,41,192,57,100). 
150 Opening BINARY mode data connection for coffee.txt (1480 bytes). 
WARNING! 47 bare linefeeds received in ASCII mode 
File may not have transferred correctly. 
226 Transfer complete. 
1480 bytes received in 8e-05 secs (18500.00 Kbytes/sec) 
ftp> quit 
221 Goodbye.
```

Usamos Wireshark para examinar los mensajes intercambiados de cerca. Los mensajes del cliente están en rojo y los del servidor en azul. Algunos comandos difieren entre cliente y servidor. Cuando tu tecleas `ls`, al servidor se le manda `LIST`. Otra cosa a destacar es que el listado de directorios y archivos y el archivo descargado son mandados por otra conexión:

!**083.png**
