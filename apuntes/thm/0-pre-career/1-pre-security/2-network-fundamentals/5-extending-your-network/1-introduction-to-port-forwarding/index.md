---
layout: apunte
title: "1. Introduction to Port Forwarding"
---

El redireccionamiento de puertos es un componente esencial al conectar aplicaciones y servicios a internet. Sin él, los servicios y aplicaciones sólo estarían disponibles en los dispositivos en la misma red.

Tomaremos de ejemplo la siguiente red. En esta red, el dispositivo con IP 192.168.1.10 está corriendo un servidor web en el puerto 80. Sólo los dispositivos conectados a la misma red podrán acceder. Esto se llama intranet.
!**002.png**

Si el administrador quisiera que fuera accesible para el reso del público, necesitaría implementar redireccionamiento de puertos.

!**003.png**
Con este diseño, la red #2 ahora sería capaz de acceder al servidor web corriendo en la redi #1 usando la Ip pública de la red #1: 82.62.51.70 .

El redireccionamiento de puertos se configura en el router de la red.