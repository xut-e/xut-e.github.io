---
layout: apunte
title: "2. Host Discovery - Who is Online"
---

Esta lección se centra en cómo usar `namp` para descubrir dispositivos activos. Nmap usa varios métodos sofisticados para descubrirlos.

Antes de empezar, debemos mencionar que Nmap usa múltiple métodos para especificar sus objetivos:

- Rango IP: Usando `-`, si queremos escanear las direcciones IP desde `192.168.0.1` hasta `192.168.0.10`, podemos escribir `192.168.0.1-10`.
- Submáscara de red: Usando `/`, si queremos buscar en el rango `192.168.0.0-255` es lo mismo que escribir `192.168.0.1/24`.
- Hostname: Podemos especificar el nombre de dominio en lugar de la IP con `example.com`.

Digamos que queremos averiguar los dispositivos activos en una red. Nmap tiene la opción `-sn`. 

Antes de comenzar, deberíamos anotar que a lo largo de esta unidad usaremos `nmap` como `root` (con `sudo`). Esto es porque no queremos restringir las habilidades de `nmap`.

------------
<h2>Escaneando una Red Local</h2>
En este contexto, usamos el término local para referirnos a la red a la que nosotros mismos estamos conectados. Por estar conectados a dicha red podemos ver las direcciones MAC de los dispositivos. Cuando se escanea la red a la que estamos conectados, Nmap empieza mandando peticiones ARP y cuando un dispositivo responde a esta se le califica como activo.

---------------
<h2>Escaneando una Red Remota</h2>
En este contexto, remoto significa que al menos un router nos separa de esa red. Por esto no podemos mandar peticiones ARP. Nmap no se ve afectado por las limitaciones de `arp-scan` y puede averiguar los dispositivos activos en una red remota igualmente. Veamos cómo lo hace:

- `192.168.11.1` está activa y respondió al paquete ICMP echo (ping).
- `192.168.11.2` parece inactiva, nmap mandó dos paquetes ICMP echo, dos paquetes TCP con la flag SYN establecida y dos paquetes al puerto 80 con la flag ACK establecida. El objetivo no respondió ninguna.

![](/apuntes/img/121.png)

Es notable que podemos tener más control sobre cómo Nmap descubre dispositivos activos con `-PS[portlist]`, `-PA[portlist]`, `-PU[portlist]` para TCP SYN, TCP ACK, y UDP.

Como aporte final, Nmap ofrece una lista de objetivos con `-sL`. Esto creará una lista de los dispositivos que serán escaneados sin escanearlos. Esto nos sirve para asegurarnos de que los objetivos son los correctos.

La opción `-sn` no performará análisis agresivos, pero tampoco nos dirá qué servicios están siendo utilizados dónde. Para esto es necesario unos escaneos más "ruidosos".