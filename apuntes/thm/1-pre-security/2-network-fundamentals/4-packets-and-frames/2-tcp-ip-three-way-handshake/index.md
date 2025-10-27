---
layout: apunte
title: "2. TCP-IP (Three-Way Handshake)"
---

TCP es otra de estas reglas usada en el networking ([1. What is Networking](/apuntes/thm/1-pre-security/2-network-fundamentals/1-what-is-networking/1-what-is-networking/)).

Este protocolo es muy similar al modelo OSI que hemos discutido en [1. What is the OSI Model](/apuntes/thm/1-pre-security/2-network-fundamentals/3-osi-model/1-what-is-the-osi-model/). Este protocolo consiste de cuatro capas y es como una versión resumida del modelo OSI. Las capas son:

- Application.
- Transporte.
- Internet.
- Network Interface.

Muy similar a como funciona el modelo OSI, se añade información en cada capa (encapsulación).

TCP es connection-based, lo que quiere decir qye debe establecer una conexión entre el servidor y el cliente antes de mandar información.

TCP garantiza la entrega precisa de la información. Este proceso se conoce como Three-Way Handshake. Algunas ventajas y desventajas de TCP son:

| **Ventajas de TCP**                                                                           | **Desventajas de TCP**                                                                                                            |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Garantiza la integridad de la información.                                                    | Necesita una conexión fiable entre los dos dispositivos. Cualquier paquete pasado incorrecto queda inválido y hay que reenviarlo. |
| Capaz de conecar dos dispositivos y evitar que se saturen de información en orden incorrecto. | Una conexión lenta puede causar cuello de botella en el otro dispositivo porque se reserva la conexión entre ellos.               |
| Hace un montón más de procesos y comprobaciones                                               | Bastante más lento que UDP por ese motivo.                                                                                        |
Los paquetes TCP contienen varias secciones, con información, conocidas como Headers:

| Header                 | Descripcion                                                                                                                                                                                                        |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Source Port            | Contiene el valor del puerto desde el cual se manda el paquete. Entre el 0 y el 65535 (que no esté siendo ya utilizado).                                                                                           |
| Destination Port       | Contiene el valor del puerto donde corre el servicio en la máquina receptora (puerto 80 para web por ejemplo).                                                                                                     |
| Source IP              | Dirección IP del dispositivo que manda el paquete.                                                                                                                                                                 |
| Destination IP         | Dirección IP del dispositivo que recibe el paquete.                                                                                                                                                                |
| Sequence Number        | Cuando se establece una conexión, la primera parte de la información transmitida es un número random.                                                                                                              |
| Acknowledgement Number | Después de la primera comunicación, la siguiente tendrá el numero de secuencia + 1.                                                                                                                                |
| Checksum               | Es lo que le da la fiabilidad a TCP. Del lado emisor se hace una comrpobación de hash. Después de haberse recibido, del lado receptor se hace una comprobación de hash y si no coinciden el archivo está corrupto. |
| Data                   | La parte donde la información que está siendo transmitida se almacena.                                                                                                                                             |
| Flag                   | Este header determina como serán trataados los paquetes de cada lado. Diferentes flags llevarán a diferentes tratamientos                                                                                          |
Vamos a explorar el Three-Way Handshake, el término usado para el proceso de conexión entre dos dispositivos. Un Three-Way Handshake ocurre de la siguiente manera:

| **Paso** | **Mensaje** | **Descripción**                                                                                                                    |
| -------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| 1        | SYN         | Es el paquete inicial mandado por el cliente. Es usado para iniciar la comunicación.                                               |
| 2        | SYN/ACK     | Es mandado por el servidor para establecer que el SYN ha sido recibido.                                                            |
| 3        | ACK         | Puede ser usado tanto por el servidor como por el cliente para establecer que una serie de paquetes se han recibido correctamente. |
| 4        | DATA        | Una vez que la conexión está establecida, la información se manda mendiante el paquete DATA.                                       |
| 5        | FIN         | Este paquete se utiliza para cerrar correctamente la conexión entre los dispositivos después de la comunicación.                   |
| #        | RST         | Este paquete termina la comunicación de manera abrupta y es la manera de decir que hubo un error.                                  |
1. SYN - Cliente: Aquí esta mi ISN (Initial Sequence Number) para SYNcronizarte (0).
2. SYN/ACK - Server: Aquí está mi ISN (5000) y yo ACKnoledge (reconozco) tu ISN (0).
3. ACK - Cliente: Yo ACK tu ISN (5000) y aquí hay algo de mi información ISN +1 (1).

![](/apuntes/img/000.jpg)

------------------------
<h3>Cerrando una conexión con TCP</h3>
TCP cerrará una conexión una vez que sea sabido que el otro dispositivo hay recibido correctamente toda la información.

Para iniciar la finalización de la comunicación se manda un paquete FIN. El otro dispositivo hace un ACK del FIN del otro y manda un FIN suyo. Por último el primer dispositivo hace un ACK del FIN del segundo.

![](/apuntes/img/001.png)
