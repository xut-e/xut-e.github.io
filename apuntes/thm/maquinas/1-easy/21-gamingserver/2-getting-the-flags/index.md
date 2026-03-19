---
layout: apunte
title: "2. Getting the Flags"
---

<h2>Reconocimiento Inicial</h2>
Comenzaremos escaneando los puertos abiertos en la máquina.

!**Pasted image 20260318165838.png**

Vamos a escanear dichos puertos más a fondo.

!**Pasted image 20260318165944.png**

Viendo esto, vamos a listar directorios de la página web.

!**Pasted image 20260318170118.png**

Vamos a ver qué hay en los directorios encontrados de la web.

!**Pasted image 20260318170301.png**

En la página inicial no parece haber nada muy interesante. Si miramos el código fuente vemos algo que nos llama la atención, parece un mensaje entre dos personas, una de ellas llamada `john`.

!**Pasted image 20260318170402.png**

Miraremos ahora el resto de los directorios y archivos.

!**Pasted image 20260318170446.png**

Parece que en `/secrets/` había algo interesante, vamos a ver en `/uploads/`.

!**Pasted image 20260318170523.png**

Puede que sea algo también.

---------------------------
<h2>Profundización</h2>
Vamos a empezar mirando en donde está la clave, a ver qué tipo de clave es.

!**Pasted image 20260318170718.png**

Es una clave RSA, puede que la podamos utilizar para iniciar sesión por SSH con el usuario `john`. Vamos ahora a mirar en el resto de archivos.

!**Pasted image 20260318170823.png**

Este parece un diccionario de posibles contraseñas. Vamos a seguir.

Esto es todo lo interesante de momento, hay un meme y un manifesto hacker, pero sin aparente mayor relevancia.

-------------------------------
<h2>Explotación</h2>
Vamos primero con la clave, vamos a intentar usarla para acceder a la cuenta de john, que parece ser el que corta el bacalao.

!**Pasted image 20260318171608.png**

Nos piden una passfrase para la clave, vamos a usar john para crackearla:

!**Pasted image 20260318171808.png**

Vamos a entrar ahora.

!**Pasted image 20260318171836.png**

Y así de fácil obtenemos la primera flag.

!**Pasted image 20260318171915.png**

----------------------------------
<h2>Escalada de Privilegios</h2>
Vamos a intentar escalar privilegios. Como siempre comenzamos por `sudo -l`.

!**Pasted image 20260318172007.png**

No podemos verlo, debemos de buscar otras técnicas. Después de comprobar varias técnicas nos fijamos en un detalle:

!**Pasted image 20260318173104.png**

Pertenecemos al grupo lxd.

!**Pasted image 20260318173238.png**

Vamos a ver qué podemos hacer. En [Exploit-DB](https://www.exploit-db.com/exploits/46978) encontramos un exploit publicado por... S4vitar, ¡qué sorpresa! Seguimos los pasos:

!**Pasted image 20260318173734.png**

Ahora metemos el tar generado en la máquina.

!**Pasted image 20260318173908.png**

Y así de fácil obtenemos privilegios root:

!**Pasted image 20260318174039.png**

Vamos a leer la flag.

!**Pasted image 20260318174230.png**

-----------------------------------
<h2>Conclusión</h2>
Una máquina bastante fácil, en la que lo más complicado era percatarse de que el grupo LXD, en el que estábamos podía ser aprovechado para realizar una escalada de privilegios. Hemos trabajado:

- Enumeración
- SSH
- John
- Escalada de privilegios

Además con la grata sorpresa de habernos encontrado con un exploit subido por S4vitar. Personalmente, es una persona especial. No lo conozco, pero fue la razón por la que empecé en ciberseguridad.

>[!SUCCESS] Hemos conseguido las dos flags!!


