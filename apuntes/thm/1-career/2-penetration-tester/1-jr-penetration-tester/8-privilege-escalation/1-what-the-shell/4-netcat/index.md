---
layout: apunte
title: "4. Netcat"
---

Como ya hemos mencionado, Netcat es la herramienta más básica en el set de herramientas de un pentester. Con ella podemos hacer una variedad de cosas muy interesantes.

------------------------------------
<h2>Reveserse Shells</h2>
En la tarea anterior hemos visto que las reverse shells requieren un código malicioso y un listener. Hay varias maneras de ejecutar una shell, así que empezaremos por los listeners.

La sintaxis para arrancar un listener con Netcat es:

`nc -lvnp <puerto>`

- `-l`: Para indicar que debe escuchar.
- `-v`: Para obtener verbose.
- `-n`: Para no resolver host names o usar DNS.
- `-p`: Indica el puerto.

-------------------------------
<h2>Bind Shells</h2>
Si buscamos obtener una bind shell, asumimos que ya hay un listener esperándonos en un puerto, sólo tenemos que conectarnos a él.

`nc <ip_objetivo> <puerto_objetivo>`

