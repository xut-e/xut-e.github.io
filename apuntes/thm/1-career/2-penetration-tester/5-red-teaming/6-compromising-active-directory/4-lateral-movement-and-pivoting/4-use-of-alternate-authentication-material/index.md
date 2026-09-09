---
layout: apunte
title: "4. Use of Alternate Authentication Material"
---

Por material alternativo de autentificación nos referimos a cualquier pieza de información que pueda ser usado para acceder a una cuanta de Windows sin realmente conocer la contraseña. Esto es posible debido a cómo algunos protocolos de autentificación usados por las redes Windows funcionan. En esta tarea, estaremos viendo un par de alternativas disponibles para iniciar sesión como un usuario cuando cualquiera de los siguientes protocolos de autentificación está disponible en la red:

- Autentificación NTLM
- Autentificación Kerberos

---------------------------------
<h2>Autentificación NTLM</h2>
Antes de adentrarnos en las técnicas de movimiento lateral, vamos a echar un vistazo a cómo la autentificación NTLM funciona:

!**Pasted image 20260908194444.png**

1. El cliente manda una petición de autentificación al servidor que quiere acceder.
2. El servidor genera un número random y lo manda como reto al cliente.
3. El cliente combina su hash de contraseña NTLM con el reto (y otra información conocida) para generar una respuesta al reto y lo manda de vuelta al servidor para la verificación.
4. El servidor redirige tanto el reto como la respuesta al controlador del dominio para verificación.
5. El controlador de dominio usa el reto para recalcular la respuesta y la compara a la respuesta inicial mandado por el cliente. Si ambos coinciden, el cliente es autentificado; de no ser así, se deniega el acceso. El resultado de la autentificación es mandado de vuelta al servidor.
6. El servidor redirije el resultado de la autentificación al cliente.

-------------------------------
<h2>Pass-the-Hash</h2>
