---
layout: apunte
title: "3. Port Scanning - Who is Listening"
---

Antes hemos usado `-sn` para descubrir dispositivos activos. En esta lección veremos como descubrir servicios activos escuchando a estos dispositivos. Por diseño, TCP tiene 65535 puertos y lo mismo para UDP.

------------------
<h2>Escaneando Puertos TCP</h2>
La forma más básica y sencilla de saber si un puerto TCP está abierto es intentar conectarse con `telnet` a dicho puerto.

--------------------
<h2>Connect Scan</h2>
Puede ser utilizado usando `-sT`. Intenta completar el three-way handshake con cada objetivo TCP. Si resulta estar abierto y se conecta, Nmap tira la conexión.

El la imagen de abajo podemos ver que nuestra máquina tiene la IP `192.168.124.148` y el Sistema objetivo tiene TCP en el puerto 22 (abierto) y 23 (cerrado). Marcado con un 1, puedes ver el handshake; con un 2, una conexión intentada a un puerto cerrado.

![](/apuntes/img/122.png)

-----------------
<h2>SYN Scan (Stealth)</h2>
Al contrario que el escaneo de conexión, el escaneo SYN sólo ejecuta el primer paso del handshake (mandar un paquete TCP SYN). Consecuentemente, nunca se completa el handshake. La ventaja principal es que conlleva menos logs y por eso se considera más sigilosa. Puedes usarlo escribiendo `-sS`.

En la imagen de debajo, podemos escanear el sistema con el puerto 22 abierto. La parte marcada con un 1, muestra el servicio en escucha respondiendo con un paquete TCP SYN-ACK. Sin embargo, Nmap responde con un TCP RST para no completar el handshake. En la parte marcada con un 2, se muestra una conexión TCP intentándolo en un puerto cerrado. En este caso el intercambio es igual que el del escaneo de conexión.

![](/apuntes/img/123.png)

-----------------------
<h2>Escaneando Puertos UDP</h2>
Aunque la mayoría de los servicios usan TCP para la comunicación, algunos usan UDP. Algunos ejemplos son: DNS, DHCP, NTP (Network Time Protocol), SNMP (Simple Network Management Protocol) y VoIP (Voice over IP). UDP no requiere establecer una conexión y romperla después. Es útil para comunicaciones de broadcast en vivo.

Nmap ofrece la opción `-sU` para escanear servicios UDP. La imagen de abajo muestra varias respuestas de destino inalcanzable de ICMP, que es el mensaje que devuelven los puertos UDP cerrados.

![](/apuntes/img/124.png)

---------------
<h2>Limitando los Puertos Objetivo</h2>
Nmap escanea los 1000 puertos más comunes por defecto. De todas formas, esto puede no ser lo que necesitas. Es por eso que Nmap tiene algunas opciones más:

- `-F`: Es para modo rápido, que escanea los 100 puertos más comunes (en lugar de los 1000).
- `-p[rango]`: Te permite especificar exactamente el rango de puertos que quieres investigar, por ejemplo del 10 al 1024: `-p10-1024`. Si no estableces un inicio irá desde el puerto 1 al que indiques, por ejemplo, del 1 al 25: `-p-25`. Y si quieres mirarlos TODOS, puedes hacer `-p-`, de esta forma mirará desde el 1 hasta el 65535.

------------------
<h2>Resumen</h2>

| Opción      | Explicación                                  |
| ----------- | -------------------------------------------- |
| `-sT`       | Escaneo de conexión, conexión total TCP.     |
| `-sS`       | Escaneo sigiloso, sólo la primera parte TCP. |
| `-sU`       | Escaneo UDP.                                 |
| `-F`        | Modo rápido (100 puertos).                   |
| `-p[rango]` | Especificar el rango.                        |
