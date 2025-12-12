---
layout: apunte
title: "3. Types of Shell"
---

A alto nivel, estamos interesados en dos tipos de shell cuando se refiere a explotar un objetivo:

- **Reverse shells:** Es cuando el objetivo es forzado a ejecutar código que le conecta a nuestro ordenador. En nuestra máquina, configuraríamos un listener con alguna de las herramientas antes vistas, el cual recibiría la conexión. Son una buena manera de sobrepasar reglas de firewall. Hacer esto a través de internet tiene la complicación de que necesitas configurar tu propia red para que acepte esta shell.
- **Bind shells:** Es cuando el código ejecutado en la máquina se usa para abrir un listener en un puerto. Tiene la ventaja de que no tienes que hacer configuraciones extra en tu red. Sin embargo, puede ser prevenida debido a reglas de firewall.

---------------------------
<h2>Ejemplo de Reverse Shell</h2>
Nueve de cada diez veces será la que usemos.

Mira la siguiente imagen. A la izquierda tenemos el listener. A la derecha la simulación de mandar una reverse shell.

!**Pasted image 20251123201348.png**

----------------------------
<h2>Ejemplo de Bind Shell</h2>
Son menos comunes pero muy útiles también. A la izquierda volvemos a tener la máquina del atacante y a la derecha la objetivo.

!**Pasted image 20251123201439.png**

------------------------------------
El último concepto importante es el de interactividad.

En las shells interactivas, podemos ejecutar comandos como `ssh` para conectarnos a otra máquina. Sin embargo, en una shell no interactiva sólo podremos introducir comandos como `whoami`, los cuales no necesitan una interacción del usuario.

En máquinas futuras veremos el comando `listener`. Este no existe por defecto, sino que es un alias configurado que apunta a `sudo rlwrap nc -lvnp 443`.