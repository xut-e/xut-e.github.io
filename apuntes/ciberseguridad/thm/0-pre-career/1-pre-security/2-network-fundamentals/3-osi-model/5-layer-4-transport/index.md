---
layout: apunte
title: "5. Layer 4 - Transport"
---

La capa 4 del modelo OSI juega un rol vital en transmitir información a través de la red. Cuando la información es enviada, sigue uno de los siguientes caminos:

- TCP
- UDP

---------------
<h2>TCP</h2>
Transmission Control Protocol, pensado con fiabilidad y garantía como motivo, reserva una conexión constante entre los dos dispositivos mientras la información esté en camino. Además, TCP incorpora la comprobación de errores en su diseño. Esta es la forma en la que TCP garantiza que la información enviada a cachos en la capa 5 sea reensamblada en el mismo orden y sin alteraciones.

| **Ventajas de TCP**                      | **Desventajas de TCP  <br>**                                                                                                              |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Garantiza que los datos estén correctos. | Requiere una conexión estable entre los dispositivos. Si un trozo de la información no es recibido, el paquete entero queda inutilizable. |
| Capaz de sincronizar dos dispositivos.   | Una conexión lenta puede causar un cuello de botella en otro dispositivo.                                                                 |
| Hace más comprobaciones para fiabilidad. | TCP es más lento que UDP por las comprobaciones que hace.                                                                                 |
TCP es usado en compartir archivos, buscar en internet o enviar emails. Esto es porque los servicios requieren que la información mandada sea precisa.

----------------
<h2>UDP</h2>

User Datagram Protocol, no es tan avanzado como TCP y tampoco ofrece tantas funcionalidades.

| **Ventajas de UDP**                                                                                              | **Desventajas de UDP**                                                     |
| ---------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| UDP mucho más rápido TCP.                                                                                        | A UDP no le importa si la información es recibida.                         |
| UDP abandona la capa de aplicación para decidir si hay algún control sobre cómo de rápido se envían los paquetes | Conexiones inestables resultan en una experiencia nefasta para el usuario. |
| UDP no reserva una conexión entre dispositivos como hace TCP.                                                    |                                                                            |
UDP es útil en situaciones donde hay pequeñas piezas de información siendo mandadas. Por ejemplo ARP o DHCP (vistos en [3. ARP](/apuntes/ciberseguridad/thm/0-pre-career/1-pre-security/2-network-fundamentals/2-introduction-to-lan/3-arp/) y [4. DHCP](/apuntes/ciberseguridad/thm/0-pre-career/1-pre-security/2-network-fundamentals/2-introduction-to-lan/4-dhcp/)) o archivos muy grandes como streaming de video.