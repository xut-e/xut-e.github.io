---
layout: apunte
title: "1. Introduction"
---

El mayor reto cuando estudiamos los protocolos es que no tenemos acceso a las "conversaciones" de estos. Todo queda detrás de interfaces de usuario. La mejor práctica es capturar el tráfico de la red y mirar de cerca los protocolos.

Esta unidad introduce algunos comandos usados para Tcpdump. La herramienta Tcpdump y su librería `libpcap` están escritas en C y C++, lanzadas a finales de los 1980s y principio de los 1990s. La librería `libpcap` fue llevada a Windows MS como `winpcap`.

----------------
<h2>Objetivos de Aprendizaje</h2>
Esta unidad intenta ofrecerte conocimientos necesarios básicos sobre `tcpdump`:

- Capturar paquetes y guardarlos en un archivo.
- Establecer filtros en los paquetes capturados.
- Controlar cómo se muestran los paquetes capturados.

-----------------
<h2>Pre-requisitos</h2>
Se recomienda estar familiarizado con el modelo TCP/IP, sus conceptos relacionados y sus numerosos protocolos.

- [0. Networking Concepts](/apuntes/thm/0-pre-career/2-cyber-security-101/5-networking/1-networking-concepts/0-networking-concepts/)
- [0. Networking Essentials](/apuntes/thm/0-pre-career/2-cyber-security-101/5-networking/2-networking-essentials/0-networking-essentials/)
- [0. Networking Core Protocols](/apuntes/thm/0-pre-career/2-cyber-security-101/5-networking/3-networking-core-protocols/0-networking-core-protocols/)
- [0. Networking Secure Protocols](/apuntes/thm/0-pre-career/2-cyber-security-101/5-networking/4-networking-secure-protocols/0-networking-secure-protocols/)

