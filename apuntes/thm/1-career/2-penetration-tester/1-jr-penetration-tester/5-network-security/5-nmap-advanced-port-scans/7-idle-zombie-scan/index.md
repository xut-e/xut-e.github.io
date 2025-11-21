---
layout: apunte
title: "7. Idle-Zombie Scan"
---

Suplantar la dirección IP de origen puede ser una buena manera de implementar sigilo al escanear. Sin embargo, suplantar sólo funcionará en configuraciones de red específicas. Requiere que estés en una posición en donde puedas monitorizar el tráfico. Sin embargo, podemos mejorar este método con el escaneo idle.

El escaneo idle (ausente), o zombie, requiere que haya un sistema conectado a la red con el que te puedas comunicar. Básicamente, Nmap hará que parezca que el escaneo viene del host ausente. Luego, comprobará indicadores de si el host idle recibió alguna respuesta. Esto se consigue comprobando la identificación IP (IP ID) del IP header. Puedes ejecutar este escaneo usando `nmap -sI ZOMBIE_IP TARGET_IP`.

Primero escaneamos un idle host (como una impresora). Al mandar un SYN/ACK responde con un RST que contiene su nuevo IP ID. 

!**Pasted image 20251120161459.png**

Luego se manda un TCP SYN a la máquina objetivo por un puerto TCP. Pero este paquete usara la dirección de la máquina ausente como dirección IP de origen. En la primera imagen de debajo es lo que pasa si el puerto está cerrado y en la segunda si este mismo está abierto.

!**Pasted image 20251120161859.png**
!**Pasted image 20251120161904.png**

En el tercer caso (sin imagen), la máquina no responde debido a reglas de firewall.

En cualquier caso, como paso final se debe mandar otro paquete SYN/ACK a la máquina ausente para que te devuelva otro IP ID. Necesitas compararlos. Si la diferencia es 1, significa que el puerto estaba cerrado o filtrado. Si la diferencia fue de 2, significa que el puerto estaba abierto.

