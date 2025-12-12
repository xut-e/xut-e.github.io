---
layout: apunte
title: "3. Packet Dissection"
---

<h2>Disección de Paquetes</h2>

También conocido como disección de protocolos, investiga los detalles de los paquetes descodificando los protocolos y campos disponibles. Wireshark soporta una gran lista de protocolos para la disección y a parte puedes escribir tus propios scripts de disección. En la [documentación de Wireshark](https://github.com/boundary/wireshark/blob/master/doc/README.dissector) puedes encontrar más información sobre esto.

-----------------
<h2>Detalles de Paquetes</h2>

Puedes hacer click en un paquete para abrir los detalles (hacer doble click los abrirá en una pestaña nueva). Los paquetes consisten de entre 5 y 7 capas en el modelo OSI. Cada vez que clickemos en una parte del paquete se subrayarán los bytes correspondiente.

!**099.png**

Podemos ver siete capas distintas en detalle:

1. **El marco (capa 1):** Muestra que tipo de paquete/marco que estamos mirando y los detalles específicos de la capa física de OSI.
   
   !**100.png**
   
2. **Fuente \[MAC] (capa 2):** Muestra la dirección MAC de salida y destino
   
   !**101.png**
   
3. **Fuente \[IP] (capa 3):** Muestra las direcciones IPv4 de destino y fuente.
   
   !**102.png**
   
4. **Protocolo (capa 4):** Muestra detalles del protocolo usado (TCP/UDP) y los puertos de origen y destino de la capa de transporte de OSI.
   
   !**103.png**
   
5. **Errores de Protocolo:** La continuación de la fase 4 muestra segmentos específicos de TCP que tuvieron que ser remontados.
   
   !**104.png**
   
6. **Protocolo de Aplicación (capa 5):** Muestra detalles específicos del protocolo usado como HTTP, FTP o SMB de la capa de aplicación del modelo OSI.
   
   !**105.png**
   
7. **Información de Aplicación:** Esta extensión de la quinta capa muestra la información específicas de la aplicación.
   
   !**106.png**

Ahora que sabemos de qué se compone un paquete general, es hora de mirar varios protocolos de aplicación en detalle.