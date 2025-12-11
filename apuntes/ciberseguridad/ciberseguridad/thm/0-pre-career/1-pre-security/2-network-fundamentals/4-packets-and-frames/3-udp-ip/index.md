---
layout: apunte
title: "3. UDP-IP"
---

Es un protocolo sin estados, no como TCP.

Algunas ventajas y desventajas de UDP frente a TCP:

| **Ventajas de UDP**                                                                | **Desventajas de UDP**                                         |
| ---------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| UDP es muchi mas rápido que TCP.                                                   | A UDP no le importa si la información es recibida              |
| UDP deja la aplicacion para decidir si hay control sobre cómo de rápido se mandan. | Es flexible para los desarrolladores de software               |
| UDP no reserva una conexión                                                        | Las conexiones inestables resultan en una experiencia nefasta. |
Como mencionamos anteriormente, no existe proceso que forme una conexión entre dispositivos. Los headers de UDP son menos y los paquetes más sencillos:

| **Header**          | **Descripción**                                                                      |
| ------------------- | ------------------------------------------------------------------------------------ |
| Time to Live (TTL)  | Tiempo de expiración dell paquete.                                                   |
| Source Address      | La dirección IP del dispositivo que manda la información.                            |
| Destination Address | La dirección IP del dispositivo que recibe la información.                           |
| Source Port         | Puerto entre el 0 y el 65535 que no esté en uso desde donde se envía la información. |
| Destination Port    | Puerto entre el 0 y el 65535 donde se encuentra corriendo el servicio receptor.      |
| Data                | Almacena la informcaión del envío.                                                   |
UDP es stateless (sin estado). Eso quiere decir que la conexión se ve de esta manera:

1. Request - Client.
2. Response - Server.