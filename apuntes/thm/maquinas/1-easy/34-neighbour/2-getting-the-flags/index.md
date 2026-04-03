---
layout: apunte
title: "2. Getting the Flags"
---

<h2>Reconocimiento Inicial</h2>
Comenzamos con un escaneo de puertos abiertos.

!**Pasted image 20260402204537.png**

Y ahora vamos a ver más en profundidad lo que hay en dichos puertos.

!**Pasted image 20260402204354.png**

Aquí vemos que la flag `httponly` no está configurada.

Vamos a listar directorios web.

!**Pasted image 20260402205255.png**

Vamos a ver cómo se ve la página web.

!**Pasted image 20260402204632.png**

Parece que hay una cuenta guest.

!**Pasted image 20260402204703.png**

De aquí también sacamos que hay una cuenta `admin`.

----------------------------------
<h2>Profundización</h2>
Vamos a ver algunos archivos interesantes que hay.

- `users.db`:

!**Pasted image 20260402205500.png**

Es el binario de un script de inserción en base de datos.

- `users.sql`:

!**Pasted image 20260402205534.png**

Este es el archivo en texto plano. Esos hashes parecen MD5. Vamos a crackearlos.

No hemos podido crackearlo. Vamos a entrar con `guest:guest`.

!**Pasted image 20260402210412.png**

--------------------------------
<h2>Explotación</h2>
Parece que puede haber un IDOR en `profile.php?user=`, vamos a intentar explotarlo.

!**Pasted image 20260402210500.png**

Pues efectivamente sí lo había.

-------------------------------
<h2>Conclusión</h2>
Máquina extremadamente fácil, lo único que tiene es un IDOR, literalmente, ni si quiera hay que escalar privilegios.

>[!SUCCESS] Hemos obtenido ambas flags.

