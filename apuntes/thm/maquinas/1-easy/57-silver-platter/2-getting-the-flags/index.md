---
layout: apunte
title: "2. Getting the Flags"
---

<h2>Reconocimiento Inicial</h2>
Comenzamos escaneando los puertos abiertos de la máquina.

!**Pasted image 20260924161204.png**

Ahora analizamos los puertos abiertos.

!**Pasted image 20260924161257.png**

Vamos a ver qué directorios tiene.

!**Pasted image 20260924161633.png**

Ahora vamos a ver cómo es la web.

!**Pasted image 20260924161647.png**

-----------------------------------------
<h2>Profundización</h3>
Vamos a buscar información en la web.

!**Pasted image 20260924161617.png**

Como no hemos encontrado nada más que un username (`scr1ptkiddy`), vamos a enumerar vhosts y mas archivos/directorios que nos podamos haber dejado.

!**Pasted image 20260924162442.png**
!**Pasted image 20260924163028.png**
!**Pasted image 20260924162502.png**

Lo único que encontramos nuevo son `/console` y `/website`. Pero después de probarlas nos damos cuenta de que no podemos acceder a ellas. Después de pensar un rato nos damos cuenta de que se menciona algo llamado `silverpeas`, por lo que decidimos probar en este puerto.

!**Pasted image 20260924162736.png**

Es un portal de inicio de sesión. Vamos a abrir BurpSuite. Recordamos que teníamos un username.

!**Pasted image 20260924163313.png**

Vamos a probar con este botón.

!**Pasted image 20260924163433.png**

No hemos conseguido nada. Sin embargo podemos probar a crear un diccionario (porque dice que `rockyou.txt` no valdrá).

!**Pasted image 20260924163641.png**

Vamos a realizar fuerza bruta contra el login.

!**Pasted image 20260924164028.png**

Después de encontrar la contraseña, iniciamos sesión.

!**Pasted image 20260924164052.png**

Si miramos la notificación sin leer podemos encontrar un posible nombre de usuario.

!**Pasted image 20260924164234.png**

---------------------------
<h2>Explotación</h2>
Después de mirar por toda la página y un par de intentos de SQLi fallidos, llegamos a un sitio aparentemente interesante:

!**Pasted image 20260924164819.png**

Nosotros solo tenemos una notificación, la 5, pero si cambiamos el 5 por un 1 vemos lo siguiente:

!**Pasted image 20260924165005.png**

Vamos a revisar más números.

!**Pasted image 20260924165107.png**

Parece que hemos encontrado un acceso por SSH, vamos a ver.

!**Pasted image 20260924165211.png**

Vamos a ver qué encontramos.

!**Pasted image 20260924165240.png**

La primera flag. Ahora hay que escalar. 

<h2>Pivotaje</h2>
Después de probar las técnicas normales vamos a ver si hay algo en `/var/log`.

```bash
grep -iR "password"
```

!**Pasted image 20260924170409.png**

Al final del documento se puede observar una contraseña. Vamos a utilizarla para cambiar a `root`.

!**Pasted image 20260924170602.png**

Con `root` no funciona pero con `tyler` sí.

-------------------------------
<h2>Escalada de Privilegios</h2>
Ahora hay que escalar a `root`.

!**Pasted image 20260924170824.png**

Parece que podemos ejecutar todos los comandos como `root`. Pues usaremos `sudo su`.

!**Pasted image 20260924170930.png**

>[!SUCCESS] Hemos conseguido las dos flags!

