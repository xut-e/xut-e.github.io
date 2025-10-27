---
layout: apunte
title: "3. ARP - Bridging Layer 3 Addressing to Layer 2 Addressing"
---

Hemos hablado de que cuando dos hosts se comunican por una red, un paquete IP es encapsulado cuando pasa por la capa 2. Acuérdate que las dos capas de link más comunes son el Ethernet (IEEE 802.3) y la WiFi (IEEE 802.11). Aunque se conozca la IP de destino, necesita comprobar su MAC para que el paquete correcto sea creado.

De cualquier forma, los dispositivos en la misma red de Ethernet, no necesitan saber la MAC del otro todo el rato, sólo mientras se comunican.

Debajo podemos ver un paquete IP en un marco de Ethernet que contiene:

- Dirección MAC de destino.
- Dirección MAC de origen.
- Tipo (IPv4 en este caso).

![](/apuntes/img/074.png)

El ARP hace posible encontrar la dirección MAC de otro dispositivo en Ethernet. En el ejemplo de abajo, un host con IP `192.168.66.89` quiere comunicarse con otro sistema con la IP `192.168.66.1`. Manda una petición ARP pidiendo al host `192.168.66.1` que responda y este lo hace con su dirección MAC.

```bash
user@TryHackMe$ tshark -r arp.pcapng -Nn     
1 0.000000000 cc:5e:f8:02:21:a7 → ff:ff:ff:ff:ff:ff ARP 42 Who has 192.168.66.1? Tell 192.168.66.89     
2 0.003566632 44:df:65:d8:fe:6c → cc:5e:f8:02:21:a7 ARP 42 192.168.66.1 is at 44:df:65:d8:fe:6c
```

Si usamos `tcpdump` en vez de `tshark`, los paquetes se mostrarán con un formato diferente, con request y reply:

```bash
user@TryHackMe$ tcpdump -r arp.pcapng -n -v 
17:23:44.506615 ARP, Ethernet (len 6), IPv4 (len 4), Request who-has 192.168.66.1 tell 192.168.66.89, length 28 
17:23:44.510182 ARP, Ethernet (len 6), IPv4 (len 4), Reply 192.168.66.1 is-at 44:df:65:d8:fe:6c, length 28
```

Una petición ARP no se encapsula en un UDP o paquete IP, sino que es encapsulada directamente en un marco Ethernet como muestra la foto:

![](/apuntes/img/075.png)

ARP se considera capa 2 porque trabaja con direcciones MAC. Otros discutirían que es parte de la capa 3 porque soporta operaciones IP. Lo que es esencial saber es que ARP permite la traducción del direccionamiento de la capa 3 al direccionamiento de la capa 2.
