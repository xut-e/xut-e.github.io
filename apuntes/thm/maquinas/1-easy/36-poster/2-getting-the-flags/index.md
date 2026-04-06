---
layout: apunte
title: "2. Getting the Flags"
---

<h2>Reconocimiento Inicial</h2>
Comenzamos con un escaneo de puertos abiertos.

!**Pasted image 20260405163432.png**

Ahora vamos a escanear dichos puertos más a fondo.

!**Pasted image 20260405163619.png**

Vamos a enumerar directorios web.

!**Pasted image 20260405165228.png**

Vamos a ver cómo es la web.

!**Pasted image 20260405165340.png**

Parece un formulario muerto.

!**Pasted image 20260405165848.png**

Ahora vamos a ver los directorios que hemos encontrado.

!**Pasted image 20260405165429.png**

No hay nada interesante.

----------------------------
<h2>Profundización</h2>
Vamos a mirar en metasploit a ver si encontramos algo para vulnerar la base de datos.

!**Pasted image 20260405170721.png**

Vamos a usarlo.

---------------------------------
<h2>Explotación</h2>
Listamos las opciones y rellenamos lo necesario para ejecutarlo.

!**Pasted image 20260405171212.png**

Y al ejecutarlo obtenemos credenciales:

!**Pasted image 20260405171314.png**

Ahora buscamos un módulo que nos permita ejecutar comandos con las credenciales.

!**Pasted image 20260405171732.png**

Vamos a usarlo. Para ello configuramos las opciones necesarias.

!**Pasted image 20260405172223.png**

Y lo ejecutamos.

!**Pasted image 20260405172250.png**

Ahora buscamos el módulo para dumpear los hashes.

!**Pasted image 20260405173458.png**

Miramos las opciones y configuramos lo necesario.

!**Pasted image 20260405173609.png**

Lo ejecutamos.

!**Pasted image 20260405173653.png**

Ahora vamos a buscar un módulo que nos permita ver archivos de un servidor escogido.

!**Pasted image 20260405173955.png**

Vamos a configurarlo.

!**Pasted image 20260405174124.png**

Lo ejecutamos.

!**Pasted image 20260405174348.png**

Vemos un archivo raro `/home/dark/credentials.txt`. Vamos a leerlo.

!**Pasted image 20260405174441.png**

Vamos a iniciar sesión por SSH con dichas credenciales.

!**Pasted image 20260405174527.png**

Vamos a elevar la shell poniendo `bash`.

!**Pasted image 20260405174631.png**

Y ahora vamos a buscar la flag.

!**Pasted image 20260405174707.png**

No nos deja, tendremos que buscar la manera de pivotar. Enumerando encontramos las siguientes credenciales:

!**Pasted image 20260405175708.png**

Vamos a usarlo para cambiar de usuario.

!**Pasted image 20260405175740.png**

Y ahora miramos la flag.

!**Pasted image 20260405175913.png**

----------------------------
<h2>Escalada de Privilegios</h2>
Vamos a ver en qué grupos se encuentra `alison`.

!**Pasted image 20260405175952.png**

Bastantes, interesante, vamos a seguir nuestra checklist habitual y si no conseguimos nada volveremos aquí.

!**Pasted image 20260405180055.png**

Pues parece que ya hemos escalado los privilegios, no tenía mucha complicación. Vamos a ver la flag de root.

!**Pasted image 20260405180215.png**

----------------------------------------
<h2>Conclusión</h2>
Una máquina bastante sencillita, en la que sobre todo hemos trabajado con metasploit sabiendo únicamente el servicio y su versión.

>[!SUCCESS] Ambas flags conseguidas.

