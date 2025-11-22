---
layout: apunte
title: "3. Ping"
---

Ping debería recordarte al ping-pong. Lanzas la pelota y esperas que te la devuelvan. El propósito principal de `ping` es comprobar si puedes alcanzar un sistema remoto.

El comando ping manda un paquete a un sistema remoto y este le contesta. Si prefieres una definición más técnica, `ping` manda un paquete ICMP Echo al sistema remoto, si este está online, y el paquete fue correctamente enrutado y no bloqueado por el firewall, responderá mandando un ICMP Echo Reply.

Ping recae bajo el protocolo ICMP (Internet Control Message Protocol). ICMP soporta varios tipos de petición, pero en particular, estamos interesados en ping (ICMP echo / type 8) y ping reply (ICMP echo reply / type 0).

```shell
user@AttackBox$ ping -c 5 10.10.71.27 
PING 10.10.71.27 (10.10.71.27) 56(84) bytes of data. 
64 bytes from 10.10.71.27: icmp_seq=1 ttl=64 time=0.636 ms 
64 bytes from 10.10.71.27: icmp_seq=2 ttl=64 time=0.483 ms 
64 bytes from 10.10.71.27: icmp_seq=3 ttl=64 time=0.396 ms 
64 bytes from 10.10.71.27: icmp_seq=4 ttl=64 time=0.416 ms 
64 bytes from 10.10.71.27: icmp_seq=5 ttl=64 time=0.445 ms  
--- 10.10.71.27 ping statistics --- 
5 packets transmitted, 5 received, 0% packet loss, time 4097ms 
rtt min/avg/max/mdev = 0.396/0.475/0.636/0.086 ms
```

Este es el resultado de hacer un ping a una máquina online. Mientras que abajo tenemos lo que ocurre al pinguear un sistema offline:

```shell
user@AttackBox$ ping -c 5 10.10.71.27 
PING 10.10.71.27 (10.10.71.27) 56(84) bytes of data. 
From ATTACKBOX_IP icmp_seq=1 Destination Host Unreachable 
From ATTACKBOX_IP icmp_seq=2 Destination Host Unreachable 
From ATTACKBOX_IP icmp_seq=3 Destination Host Unreachable 
From ATTACKBOX_IP icmp_seq=4 Destination Host Unreachable 
From ATTACKBOX_IP icmp_seq=5 Destination Host Unreachable  
--- 10.10.71.27 ping statistics --- 
5 packets transmitted, 0 received, +5 errors, 100% packet loss, time 4098ms pipe 4
```

Cuando no recibimos ningún tipo de respuesta puede tener varias explicaciones:

- El ordenador de destino no responde (todavía reiniciando, apagado, o crasheado).
- Está desconectado de la red.
- Hay un firewall configurado para bloquear dichos paquetes.
- Tu sistema está desconectado de la red.

