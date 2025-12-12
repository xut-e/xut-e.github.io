---
layout: apunte
title: "2. Sniffing Attack"
---

Un ataque de esnifado se refiere a usar una herramienta de captura de paquetes para recolectar información sobre el objetivo. Cuando un protocolo se comunica en texto plano, la información transmitida puede ser capturada por un tercero para analizarla.

Hay varios programas para llevar a cabo este tipo de ataque:

1. **Tcpdump:** Es una herramienta gratuita de línea de comandos soportada en muchos sistemas operativos.
2. **Wireshark:** Es una herramienta gráfica gratuita disponible para múltiples sistemas operativos.
3. **Tshark:** Es una alternativa CLI a Wireshark.

Considera a un usuario usando POP3 para comprobar sus mensajes. Primero vamos a usar Tcpdump para capturar su usuario y contraseña. En el ejemplo de abajo hemos usado el comando `sudo tcpdump port 110 -A`. 

- `sudo`: Porque necesitamos permisos de administrador para capturar paquetes de red.
- `tcpdump`: Herramienta que invocamos.
- `port 110`: Seleccionamos el puerto por defecto de POP3.
- `-A`: Queremos mostrar los elementos capturados en ASCII.

```shell
pentester@TryHackMe$ sudo tcpdump port 110 -A
[...]
09:05:15.132861 IP 10.20.30.1.58386 > 10.20.30.148.pop3: Flags [P.], seq 1:13, ack 19, win 502, options [nop,nop,TS val 423360697 ecr 3958275530], length 12
E..@.V@.@.g.
...
......n......"............
.;....}.USER frank

09:05:15.133465 IP 10.20.30.148.pop3 > 10.20.30.1.58386: Flags [.], ack 13, win 510, options [nop,nop,TS val 3958280553 ecr 423360697], length 0
E..4..@.@.O~
...
....n....".........?P.....
...i.;..
09:05:15.133610 IP 10.20.30.148.pop3 > 10.20.30.1.58386: Flags [P.], seq 19:43, ack 13, win 510, options [nop,nop,TS val 3958280553 ecr 423360697], length 24
E..L..@.@.Oe
...
....n....".........<-.....
...i.;..+OK Password required.

09:05:15.133660 IP 10.20.30.1.58386 > 10.20.30.148.pop3: Flags [.], ack 43, win 502, options [nop,nop,TS val 423360698 ecr 3958280553], length 0
E..4.W@.@.g.
...
......n......".....??.....
.;.....i
09:05:22.852695 IP 10.20.30.1.58386 > 10.20.30.148.pop3: Flags [P.], seq 13:28, ack 43, win 502, options [nop,nop,TS val 423368417 ecr 3958280553], length 15
E..C.X@.@.g.
...
......n......".....6......
.<.....iPASS D2xc9CgD
[...]
```

En la terminal podemos ver los paquetes que transportan el usuario y la contraseña en texto plano.

También podemos usar Wireshark para conseguir los mismos resultados. Introducimos `pop` en la barra de búsqueda para filtrar por dicho protocolo.

!**Pasted image 20251121140504.png**

En resumen: cualquier protocolo que use comunicación en texto plano es susceptible de dicho ataque.

La mitigación recae en añadir una capa de cifrado a cada uno de los protocolos. En concreto TLS (Transport Layer Security), el cual ya se ha añadido a estos, y cambiado Telnet por SSH.
