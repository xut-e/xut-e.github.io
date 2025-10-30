---
layout: apunte
title: "5. Routing"
---

¿Cómo puede Internet averiguar cómo llevar los paquetes de la red X a la red Y o a la red Z? Necesitamos algún algoritmo.

Internet se compone de millones de routers y billones de dispositivos. La red de la imagen de abajo es una pequeña subred de Internet. Necesitamos un algoritmo de routeado para averiguar qué camino tomar.

![](/apuntes/img/078.jpg)

Los algoritmos no entran en el temario, pero de cualquier forma, describiremos brevemente unos cuantos protocolos para familiarizarnos:

- OSPF (Open Shortest Path First): Es un protocolo que les permite a los routers compartir información sobre su topología y así calcular la ruta abierta más corta.
- EIGRP (Enhanced Interior Gateway Routing Protocol): Es un protocolo propiedad de Cisco que permite que los routers compartan información sobre a qué redes pueden acceder y cuánto cuesta (en términos de ancho de banda, por ejemplo) de tal forma que se puede calcular la ruta más eficiente.
- BGP (Border Gateway Protocol): Es el protocolo primario usado en Internet. Permite a diferentes redes intercambiar información y establecer caminos eficientes.
- RIP (Routing Information Protocol): Es un protocolo simple usado normalmente en redes pequeñas. Comparten información sobre las redes a las que pueden acceder y los saltos necesarios para llegar allí.