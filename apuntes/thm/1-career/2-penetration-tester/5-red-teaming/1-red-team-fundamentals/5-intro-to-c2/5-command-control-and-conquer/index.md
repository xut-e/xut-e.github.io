---
layout: apunte
title: "5. Command, Control and Conquer"
---

<h2>Mismo Exploit</h2>
<h3>Enumeración de Hosts con Armitage</h3>
Antes de mandarte por ti mismo, vamos a demostrar cómo explotar una máquina virtual de ejemplo. Primero, ejecutaremos un escaneo de puertos en Armitage yendo a la sección "Hosts", haciendo hovering sobre "Nmap Scan" y seleccionando "Quick Scan".

!**Pasted image 20260514173134.png**

Después de seleccionar "Quick Scan", una nueva opción saldrá. Esta te pedirá introducir la dirección IP que deseas escanear.

!**Pasted image 20260514173300.png**

Después de presionar "Ok" y esperar un momento, deberías ver una nueva pestaña que se abre llamada "nmap" y una nueva máquina se muestra en la pestaña "Workspace". En la pestaña "nmap" verás los resultados del escaneo.

!**Pasted image 20260514173519.png**

Ahora que has aprendido a ejecutar escaneo de puertos básico, intenta ejecutar varios escaneos contra el obetivo y mira la información adicional que recibes del host.

<h3>Explotación con Armitage</h3>
Ahora, vamos a mostrar el proceso de explotación con Armitage; nuestra víctima es en nuestro ejemplo una máquina Windows 7. Esta máquina e vulnerable a el exploit clásico "Eternal Blue". Para encontrar esto, noe enfocaremos en la parte de la derecha de la pestaña con carpetas, expandiremos "Exploit", luego "Windows", luego "SMB" y ahí verás los exploits.

!**Pasted image 20260514174327.png**

Después podemos hacer doble click en el exploit que queramos explotar o arrastrarlo al host que queramos, y una nueva pestaña se abrirá. Haciendo click en "launch" lanzará el ataque.

!**Pasted image 20260514174727.png**

Después de hacer click en "Launch", notarás que se abre una nueva pestaña "Exploit". Armitage ejecutará todas las comprobaciones normales que Metasploit suele hacer. En el caso de Eternal Blue, corre los scripts de comprobación estándar seguidos de los scripts de exploit hasta que consigue una shell exitosa.

!**Pasted image 20260514183230.png**

Después de recibir la shell, haz click derecho en el host y selecciona "Interact". Esto se abrirá como una shell estándar con la que ya estás familiarizado. Para obtener la shell de Meterpreter, recomendamos que ejecutes el módulo `multi/manage/shell_to_meterpreter`.

!**Pasted image 20260514183449.png**

---------------------------------
<h2>Hora de Practicar</h2>
Ahora que has aprendido cómo explotar hosts usando Armitage, practicarás tus habilidades hackeando la máquina virtual con Metasploit y Armitage. Hay múltiples exploits que puedes seguir.

----------------------------------
<h2>Solución</h2>
