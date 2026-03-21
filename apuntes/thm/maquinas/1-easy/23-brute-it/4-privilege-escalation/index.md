---
layout: apunte
title: "4. Privilege Escalation"
---

Nos piden escalar los privilegios.

1. ¿Cuál es la contraseña de `root`?

Para esto primero miramos el grupo en el que estamos y nos damos cuenta de que estamos en el grupo sudo. Vamos a ver qué comandos podemos utilizar con `sudo -l`.

!**Pasted image 20260320163045.png**

Vamos a mirar en GTFOBins a ver si se puede hacer algo con esto.

!**Pasted image 20260320163150.png**

Podemos leer archivos como sudo. Sabemos que las contraseñas (o más bien los hashes) se almacenan en el archivo `/etc/shadow`, por lo que vamos a buscar allí.

!**Pasted image 20260320163252.png**

Hemos encontrado el hash de la contraseña sudo. Vamos a crackearlo.

!**Pasted image 20260320163646.png**

Y así de fácil obtenemos la contraseña.

2. ¿Cuál es `root.txt`?

Nos metemos con la contraseña obtenida y leemos el archivo correspondiente.

!**Pasted image 20260320163814.png**

