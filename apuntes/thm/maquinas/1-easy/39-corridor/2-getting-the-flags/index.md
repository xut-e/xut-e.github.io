---
layout: apunte
title: "2. Getting the Flags"
---

<h2>Reconocimiento Inicial</h2>
Comenzamos realizando un escaneo de puertos abiertos en la máquina.

!**Pasted image 20260406210123.png**

Ahora escaneamos lo que hemos obtenido más a fondo.

!**Pasted image 20260406204513.png**

Vamos a enumerar directorios web.

!**Pasted image 20260406204648.png**

No hemos encontrado nada así que vamos a ir a ver cómo es la web.

!**Pasted image 20260406204738.png**

No parece que haya nada. Sin embargo si investigamos el código fuente vemos lo siguiente:

!**Pasted image 20260406205001.png**

---------------------------
<h2>Profundización</h2>
Parecen hashes, más concretamente MD5. Vamos a cogerlos.

!**Pasted image 20260406205459.png**

Ahora los intentamos crackear.

!**Pasted image 20260406205629.png**

Aquí podemos darnos cuenta claramente de que son IDs. 

----------------------------------
<h2>Explotación</h2>
Vamos a intentar explotar un IDOR. Para ello vamos a probar con el "0" y lo vamos a hashear.

!**Pasted image 20260406205817.png**

Ahora lo colocamos en la URL.

!**Pasted image 20260406205858.png**

---------------------------------------
<h2>Conclusión</h2>
Máquina extremadamente sencilla, pero buena para practicar IDOR. No se le queda corta la categoría de "five minutes hack".