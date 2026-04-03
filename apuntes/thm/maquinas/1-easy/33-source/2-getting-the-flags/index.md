---
layout: apunte
title: "2. Getting the Flags"
---

<h2>Reconocimiento Inicial</h2>
Comenzamos realizando un escaneo de puertos abiertos.

!**Pasted image 20260402200343.png**

Ahora vamos a escanear más a fondo dichos puertos.

!**Pasted image 20260402200740.png**

Vamos a listar directorios en el servicio web.

!**Pasted image 20260402201221.png**

No parece haber encontrado nada, vamos a revisar cómo se ve la web.

!**Pasted image 20260402201303.png**

Ese era el problema, debemos usar HTTPS. Vamos a volver a listar directorios.

!**Pasted image 20260402203726.png**

Vamos a ver cómo se ve la web.

!**Pasted image 20260402201417.png**

-----------------------------------
<h2>Profundización</h2>
Como ya conocemos la versión del servicio (`MiniServ 1.890`) vamos a ver si existe alguna vulnerabilidad para él.

!**Pasted image 20260402202508.png**

Parece que sí hemos encontrado algo, vamos a ver si podemos usarlo.

-----------------------------------
<h2>Explotación</h2>
Descargamos el código del exploit y lo ejecutamos.

!**Pasted image 20260402202723.png**

URL-encodeamos el payload y lo mandamos.

!**Pasted image 20260402203136.png**

En nuestro listener hemos obtenido una shell.

!**Pasted image 20260402203158.png**

Vamos a estabilizarla.

!**Pasted image 20260402203307.png**

Y buscamos la primera flag.

!**Pasted image 20260402203415.png**

-------------------------------
<h2>Escalada de Privilegios</h2>
Somos `root` por lo que ni siquiera tenemos que escalar privilegios.

!**Pasted image 20260402203609.png**

-------------------------------------------
<h2>Conclusión</h2>
Una máquina extremadamente fácil.

>[!SUCCESS] Hemos obtenido ambas flags.

