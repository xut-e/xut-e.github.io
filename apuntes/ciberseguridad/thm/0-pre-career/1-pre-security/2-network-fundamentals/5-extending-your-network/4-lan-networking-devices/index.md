---
layout: apunte
title: "4. LAN Networking Devices"
---

<h2>¿Qué es un Router?</h2>

El trabajo de un router es conectar redes y pasar información entre ellas. Lo hace haciendo routing.

Routing es el nombre que se le da al proceso de transportar información entre redes. Implica crear un camino entre redes para que esta información pueda viajar entre ellas. Los routers operan en la capa 3 del modelo OSI. Permiten al administrador configurar varias reglas sobre el redireccionamiento de puertos o el firewall.

Imaginémonos un ordenador A conectado a un ordenador B mediante redes. Para que esas redes se conecten necesitamos routers. En concreto en este ejemplo hay dos. El camino que tomará la información depende de:
!**005.png**
- ¿Qué camino es el más corto?
- ¿Qué camino es más fiable?
- ¿Qué camino tiene el medio más rápido?

--------------------
<h2>¿Qué es un Switch?</h2>
Un switch es un dispositivo dedicado a red que provee de conexión a múltiples dispositivos.

Pueden operar bien en la capa 2 o en la 3 del modelo OSI. De todas formas, son exclusivos. Un switch de la capa 2 no puede operar en la capa 3.

<h4>Switch Capa 2</h4>
Los switches reenviarán los frames (marcos) a los dispositivos conectados usando sus direcciones MAC.

!**006.png**

Estos switches son sólamente responsables de mandar los frames a los dispositivos correctos.
<h4>Switch Capa 3</h4>
Estos son más sofisticados que los de la capa 2 ya que pueden realizar algunas de las responsabilidades del router. Estos switches mandarán frames a los dispositivos y paquetes de route a otros dispositivos usando el protocolo IP.

Veamos un ejemplo, hay dos IP's:

- 192.168.1.1
- 192.168.2.1

Una tecnología llamada VLAN (Virtual Local Area Network) permite a dispositivos concretos dentro de una red estar partidos virtualmente. 

!**007.png**

De esta manera se hace que los dos departamentos puedan acceder a internet, pero no puedan comunicarse uno con otro (aunque están conectados al mismo switch).

[1. What is Networking](/apuntes/ciberseguridad/thm/0-pre-career/1-pre-security/2-network-fundamentals/1-what-is-networking/1-what-is-networking/)