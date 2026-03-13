---
layout: apunte
title: "2. Finding the Flags"
---

Vamos a comenzar esta máquina como siempre, aunque debamos responder más preguntas.

<h2>Reconocimiento Inicial</h2>
Empezaremos con el escaneo de puertos, como de costumbre.

!**Pasted image 20260312162114.png**

Vamos ahora a hacer un reconocimiento más profundo de dichos puertos.

!**Pasted image 20260312162239.png**

Vemos que el login anónimo por ftp está permitido, interesante.

También vemos que hay un servidor web por lo que vamos a realizar enumeración de directorios.

!**Pasted image 20260312162719.png**

No parece que haya mucho interesante por aquí. Vamos a profundizar un poco más.

-------------------------------
<h2>Profundización</h2>
Lo primero que vamos a mirar es qué podemos hacer en el servidor ftp, porque eso de que el anonymous login esté permitido huele raro...

!**Pasted image 20260312162858.png**

Hemos encontrado dos archivos:

- `locks.txt`:
  !**Pasted image 20260312162942.png**
  Parecen posibles contraseñas.
- `task.txt`:
  !**Pasted image 20260312163010.png**
  Una nota sin mucho significado aparente, pero escrita por `lin`.

Vamos a mirar la web.

!**Pasted image 20260312163126.png**

No hay `robots.txt` y en el directorio `/images/` sólo hay una foto `crew.jpg`, la guardaremos y la miramos con `exiftool`. No parece tener nada interesante.

------------------------------
<h2>Explotación</h2>
Como hemos obtenido una lista de posibles contraseñas vamos a intentar hacer fuerza bruta a SSH, que es lo más lógico ya que no hay formularios de login en la web.

Gracias a toda la información que hemos recopilado tenemos varios posibles usernames:

- `spike`
- `jet`
- `ed`
- `edward`
- `ein`
- `faye`
- `lin`
- `vicious`

Vamos a usar hydra para realizar el ataque.

!**Pasted image 20260312163854.png**

Y así encontramos la contraseña. Vamos a iniciar sesión por SSH.

!**Pasted image 20260312163950.png**

Buscamos la flag de usuario.

!**Pasted image 20260312164022.png**

------------------------------
<h2>Escalada de Privilegios</h2>
Para la escalada de privilegios lo primero que miraremos es qué comandos puede ejecutar `lin` con `sudo`:

!**Pasted image 20260312164228.png**

Parece que hemos tenido suerte, vamos a ir a GTFOBins para ver si nos sirve de algo:

!**Pasted image 20260312164358.png**

Vamos a probar la escalada.

!**Pasted image 20260312164504.png**

>[!SUCCESS] Y así de fácil obtenemos las dos flags.

