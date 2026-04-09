---
layout: apunte
title: "2. Getting the Flags"
---

<h2>Reconocimiento Inicial</h2>
Comenzamos escaneando los puertos abiertos de la máquina.

!**Pasted image 20260408204118.png**

Ahora vamos a escanear dichos puertos más en profundidad.

!**Pasted image 20260408204131.png**

Vamos a listar directorios de la web.

!**Pasted image 20260408204740.png**

No hemos encontrado nada, vamos a ver cómo se ve la web.

!**Pasted image 20260408204332.png**

No parece que haya nada, sólo una foto de un conejo, vamos a descargarla.

------------------------------------
<h2>Profundización</h2>
Vamos a analizarla.

!**Pasted image 20260408204547.png**

Parece que hemos encontrado una pista, vamos a ver qué hay dentro.

!**Pasted image 20260408204653.png**

Un poco críptica la pista, sin embargo, si recordamos el escaneo, había un output `/r --> r/`. Puede que esto sean directorios.

!**Pasted image 20260408204902.png**

¡Justo en el clavo! Vamos a seguir investigando. Sólo hay una imagen y algo que dada la naturaleza críptica de las pistas del reto podría llegar a ser una pista, algo sobre izquierda (left) y derecha (right). Vamos a mirar el código fuente:

!**Pasted image 20260408212739.png**

Parece que hemos encontrado un usuario y una contraseña, vamos a intentar entrar por SSH.

!**Pasted image 20260408212840.png**

Y estamos dentro, vamos a buscar la primera flag.

!**Pasted image 20260408213034.png**

No podemos encontrarla , seguramente tengamos que realizar un movimiento lateral. 

-------------------------------
<h2>Explotación</h2>
Investigando vemos lo siguiente:

!**Pasted image 20260408213657.png**

Parece que podemos ejecutar un script como `rabbit`. Vamos a ver de qué trata el script.

!**Pasted image 20260408213914.png**

Parece que carga un poema y elige 10 lineas al azar. Sin embargo hay algo más importante, también está cargando el módulo `random`.

!**Pasted image 20260408214719.png**

Podemos tratar de realizar un Python Module Hijacking. Para ello creamos un archivo `random.py` con el siguiente contenido:

```python
import os
os.system("/bin/bash")
```

Lo dejamos guardado en la misma carpeta del script. Y ahora ejecutamos el script como `rabbit`.

!**Pasted image 20260408215101.png**

Una vez dentro de `rabbit`, podemos ver lo siguiente:

!**Pasted image 20260408215511.png**

Es un binario con SUID. Si nos fijamos bien hay un comando: `date`.

!**Pasted image 20260408215836.png**

Y lo que pasa es que este no se ejecuta con ruta completa, al contrario que `/bin/echo`. Vamos a mirar el PATH, porque esto podría darnos la clave para un PATH hijacking.

!**Pasted image 20260408220105.png**

Acabamos de meter en el PATH como primera ruta el home de `rabbit` la cual es escribible por nosotros, vamos a ver qué hace el binario exactamente.

!**Pasted image 20260408220219.png**

Pata explotar esto ahora vamos a crear un archivo llamado `date` con el siguiente contenido:

```bash
#!/bin/bash
/bin/bash
```

Lo guardamos en la misma ruta que hemos metido en el PATH y le damos permisos de ejecución.

!**Pasted image 20260408220707.png**

Ahora ejecutamos `teaParty`.

!**Pasted image 20260408220740.png**

Hemos conseguido escalar privilegios hasta `hatter` (el sombrerero). Vamos a ver si este encuentra la flag de usuario.

!**Pasted image 20260408220838.png**

Pues no, xD. Vamos a ver qué hay en su home.

!**Pasted image 20260408220947.png**

Parece que hay una contraseña de alguien.

!**Pasted image 20260408221154.png**

Es su propia contraseña. 

-------------------------------------
<h2>Escalada de Privilegios</h2>
Vamos a ver si podemos escalar privilegios de alguna forma.

!**Pasted image 20260408221321.png**

Parece que hay algunas capabilities, la de `perl` nos permite escalar privilegios:

!**Pasted image 20260408221409.png**

Sin embargo cuando tratamos de utilizarlo vemos que no nos deja:

!**Pasted image 20260408221806.png**

Puede que sea porque no somos parte de grupo `hatter`, lo cual es raro, vamos a iniciar sesión de manera fresca por SSH con la contraseña de `hatter`.

!**Pasted image 20260408221929.png**

Ahora ya si somos grupo `hatter` y sí debería dejarnos utilizar la capability.

!**Pasted image 20260408222044.png**

Efectivamente ya somos root.

Vamos a buscar `user.txt` porque no hemos podido encontrarla sin ser `root`.

!**Pasted image 20260408222134.png**

HUH??? Con razón no la encontrábamos, la flag `user.txt` estaba en el directorio root.

!**Pasted image 20260408222224.png**

Ahora vamos a buscar la flag de `root.txt` (que estaba en el directorio home de alice, lo vimos al empezar).

!**Pasted image 20260408222319.png**

---------------------------------------
<h2>Conclusión</h2>
Una máquina muy divertida. Fácil pero tampoco demasiado. En ella hemos trabajado:

- Esteganografía.
- Python Module Hijacking.
- PATH Hijacking.

Entre otras. Un reto que nos ha puesto a prueba pero dejándonos respirar.

>[!SUCCESS] Ambas flags obtenidas!

