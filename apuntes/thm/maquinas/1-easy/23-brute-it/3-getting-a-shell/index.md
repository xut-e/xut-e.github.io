---
layout: apunte
title: "3. Getting a Shell"
---

Nos piden encontrar la forma de obtener una shell.

1. ¿Cuál es el user:password del panel de administración?

Como la máquina es de fuerza bruta sabemos que tendremos que hacerla, sin embargo, no tenemos ningún username todavía. Vamos a ver el código fuente de la página:

!**Pasted image 20260320152552.png**

Parece que un usuario se llama John, pero lo importante es que dicen que el username es `admin`. Vamos a hacer un ataque de fuerza bruta. Para ello, primero abrimos BurpSuite y vamos a ver cómo se ve una petición de login.

!**Pasted image 20260320152804.png**

Y ahora la respuesta de un mal login.

!**Pasted image 20260320152832.png**

Esto es lo que usaremos como filtro invertido.

!**Pasted image 20260320153251.png**

Ahora que tenemos el usuario y la contraseña vamos a iniciar sesión.

!**Pasted image 20260320153350.png**

Con esto hemos obtenido la flag web y la clave privada RSA.

2. ¿Cuál es la passphrase de la clave privada RSA?

Una vez tenemos la clave privada, podemos intentar usarla, pero no va a funcionar, porque necesitamos una passphrase:

!**Pasted image 20260320155723.png**

Así que vamos a usar el módulo `ssh2john` para convertir el hash de la passphrase de la clave RSA en un formato que la herramienta `john` pueda entender.

!**Pasted image 20260320154001.png**

Así encontramos la passphrase de la clave RSA.

3. ¿Cuál es la flag `user.txt`?

Vamos a iniciar sesión por SSH y a mirar.

!**Pasted image 20260320155802.png**

4. ¿Cuál es la flag web?

La encontramos en la web antes.