---
layout: apunte
title: "1. What are Packets and Frames"
---

Son pequeñas piezas de información que, al combinarse todas juntas forman una pieza mayor.

Un frame (o marco) está en el nivel [3. Layer 2 - Data Link](/apuntes/thm/1-pre-security/2-network-fundamentals/3-osi-model/3-layer-2-data-link/), queriendo esto decir que no contiene información tal como la dirección IP. Wl frame sería, por así decirlo, el sobre de una carta (sin remitente ni destino).

Este proceso es llamado encapsulación, del que hablamos en [1. What is the OSI Model](/apuntes/thm/1-pre-security/2-network-fundamentals/3-osi-model/1-what-is-the-osi-model/). En esta fase cuando hablamos de direcciones IP, estamos hablando del marco en sí. 

Los paquetes son una forma eficiente de comunicar información a través de una red. Gracias al tamaño pequeño de los paquetes es fácil de evitar los cuellos de botella. El archivo final es reconstruido a partir de los paquetes mandados en el dispositivo de destino.

Debido a que hay diferentes estructuras de paquetes, si no hubiera estndarización, podría romper las comunicaciones. Es por esto que existen Headers, que amplían información sobre los paquetes mandados:

| **Header**          | **Descripción**                                                                                      |
| ------------------- | ---------------------------------------------------------------------------------------------------- |
| Time to Live        | Pone un temporizador de expiración para que los paquetes que no son recibidos no saturen la red      |
| Checksum            | Este campo le sirve a los protocolos como TCP/IP para comprobar si ha habido pérdida de información. |
| Source Address      | Contiene la dirección IP de la máquina desde la que se mandan los datos.                             |
| Destination Address | Contiene la dirección IP de la máquina hacia la que se mandan los datos.                             |
