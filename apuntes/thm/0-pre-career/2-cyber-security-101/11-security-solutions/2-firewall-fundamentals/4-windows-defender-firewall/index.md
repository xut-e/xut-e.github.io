---
layout: apunte
title: "4. Windows Defender Firewall"
---

<h2>Windows Defender Firewall</h2>
Es un firewall integrado en Windows OS. Este contiene todas las funcionalidades básicas para crear reglas que permitan o denieguen el tráfico y aplicaciones. Para abrir este firewall debes ir a la barra de búsqueda de Windows y escribir "Windows Defender Firewall". 

La página de entrada de WDF muestra los perfiles de red y las opciones disponibles:

!**Pasted image 20251024155230.png**

----------------------------
<h2>Network Profiles</h2>
Hay dos perfiles de red disponibles. El firewall de Windows determina tu actual red basado en la NLA (Network Location Address) y te aplica ese perfil de red. Podemos tener diferentes configuraciones para cada uno de ellos.

1. **Redes privadas:** Incluye configuraciones del firewall que aplicar cuando nos conectemos a una red privada, como la de nuestra casa.
2. **Redes públicas:** Incluye configuraciones del firewall que aplicar cuando nos conectemos a una red pública, como una cafetería, restaurantes, etc.

Para permitir/denegar alguna aplicación en nuestros perfiles de red, hacemos click en la opción remarcada con un 1. Esto nos llevará a la página que lista todas las apps instaladas en nuestro sistema. Podemos marcar aquellas que queramos permitir. WDF está activado por defecto, pero si lo queremos apagar, podemos hacer click en la opción marcada con un 2. Esto nos llevará a los ajustes de ambos perfiles de red. También puedes hacer click en el 3 "Restore Defaults" para volver a los valores por defecto.

!**Pasted image 20251024161249.png**

-------------------------
<h2>Custom Rules</h2>
WDF también te permite crear reglas personalizadas para tu red. Creemos una para bloquear todo el tráfico saliente en el puerto 80 (HTTP) o 443 (HTTPS).

Antes de crear esta regla comprobamos si podemos acceder a un sitio web:

!**Pasted image 20251024161452.png**

Para crear esta regla elegimos "Configuración Avanzada" de las opciones disponibles en la dashboard. Esto abrirá una pestaña nueva.

!**Pasted image 20251024161638.png**

Ahí podemos ver las opciones disponibles:

!**Pasted image 20251024161656.png**

Crearemos una regla para bloquear todo el tráfico HTTP/S saliente. Para esto, hacemos click en "Outbound Rules" a la izquierda, después en "New Rule". Se abrirá el configurador de reglas. Seleccionamos "Custom" y siguiente.

!**Pasted image 20251024162515.png**

En el segundo paso, seleccionamos "All programs". Te pedirá el protocolo , seleccionamos TCP, mantenemos el puerto local como está y cambiamos el puerto remoto a "Specific ports". Escribimos los números de los puertos (en nuestro caso 80 y 443). Le damos click a next.

>[!NOTE] Separa los puertos con comas sin espacios (ej: 80,443).

!**Pasted image 20251024164150.png**

En la pestaña de alcance (scope), mantén las direcciones IP remotas y locales tal y como están. En la pestaña de acción, habilita la opción "Block the connection" y presiona next.

!**Pasted image 20251024164409.png**

En la pestaña de perfil mantenemos todos los perfiles de red marcados. Por último, la fase final es darle un nombre a la regla y una descripción opcional y presionar **Finish**.

Podemos ver que nuestra regla se ha configurado:

!**Pasted image 20251024164540.png**

Si ahora comprobamos la regla vemos que no podemos acceder a ningún servidor web por puerto 80 o 443:

!**Pasted image 20251024164615.png**

---------------------------
<h2>Exercise</h2>
El equipo de seguridad notó tráfico entrante y saliente sospechoso en sus sistemas Windows críticos. Crearon reglas en su WDF para bloquear algunos en específico. Se te pide responder a unas preguntas.

1. Nos conectamos con `xfreerdp3`:
   !**Pasted image 20251024165623.png**
   !**Pasted image 20251024165751.png**
2. Buscamos el WDF:
   !**Pasted image 20251024165900.png**
3. Vamos a inbound y miramos el puerto 22:
   !**Pasted image 20251024170144.png**
   !**Pasted image 20251024170205.png**
4. Buscamos la regla que permite que una IP en concreto acceda por SSH:
   !**Pasted image 20251024170313.png**
   !**Pasted image 20251024170338.png**
5. 