---
layout: apunte
title: "2. Subnetworks"
---

Revisemos algunos conceptos antes de movernos hacia las tareas principales. Un segmento de red es un grupo de ordenadores conectados usando un medio compartido. Un segmento de red es una conexión física mientras que una subred es una conexión lógica.

En el siguiente diagrama tenemos 4 segmentos de red o subredes. Generalmente, tu sistema estaría conectado a uno de estos segmentos/subredes. Una subred tiene su propio rango de IPs y está conectada a redes más extensas vía router.

!**Pasted image 20251117231032.png**

La figura muestra dos tipos de subred:

- Subredes con `/16`, lo que significa que la máscara de subred puede ser escrita como `255.255.0.0` y tiene 65536 hosts.
- Subredes con `/24`, que indican que la máscara de subred puede ser expresada como `255.255.255.0` y tiene 256 hosts.

Puede que quieras repasar [0. Introduction to LAN](/apuntes/thm/0-pre-career/1-pre-security/2-network-fundamentals/2-introduction-to-lan/0-introduction-to-lan/) si estás muy perdido.

Como parte del reconocimiento activo, queremos descubrir más información sobre un grupo de hosts o subred. Si estamos conectados a la misma subred, el escáner dependerá de ARP (Address Resolution Protocol) para descubrir hosts activos. Una query ARP busca obtener la dirección MAC para que la comunicación sea posible.

Si estás en la red A, puedes usar ARP sólo para descubrir hosts activos en esa subred (10.1.100.0/24). Supón que estás conectado a una subred diferente de la subred del objetivo. En este caso, los paquetes generados por tu escáner serán enrutados vía default gateway (puerta de enlace predeterminada) para alcanzar objetivos en otra subred. Sin embargo, las queries ARP no serán enrutadas por lo lo que no cruzarán el router. ARP es un protocolo de Capa 2 (Link Layer) y no de Capa 3 (Network), como sí lo son los routers.