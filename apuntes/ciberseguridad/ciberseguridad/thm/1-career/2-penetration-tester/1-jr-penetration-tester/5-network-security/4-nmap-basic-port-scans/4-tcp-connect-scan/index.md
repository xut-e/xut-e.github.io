---
layout: apunte
title: "4. TCP Connect Scan"
---

El escaneo TCP connect funciona completando el 3-way handshake TCP. En una conexión TCP estándar, el cliente manda un paquete TCP con la flag SYN, el servidor respondo con SYN/ACK si el puerto está abiert y el cliente completa el handshake con ACK.

!**Pasted image 20251119143310.png**

Estamos interesados en saber si el puerto está abierto, no en establecer una conexión, por lo que  la conexión con este tipo de escaneo se corta con un RST/ACK. Para ello, usa la opción `-sT`.

!**Pasted image 20251119143424.png**

>[!IMPORTANT] Si no tienes privilegios, TCP connect es el único tipo de escaneo que podrás hacer para descubrir puertos TCP abiertos.

En la siguiente captura de Wireshark vemos un escaneo TCP connect.

!**Pasted image 20251119144151.png**

Podemos ver que el puerto 143 está abierto, ya que respondió con SYN/ACK. A continuación vemos cómo Nmap concluyó la conexión con un ACK y después la terminó con un RST/ACK. En total hubo un intercambio de 4 paquetes.

!**Pasted image 20251119144328.png**

Para ilustrar el ejemplo aquí vemos lo que pasa en la CLI.

```shell
pentester@TryHackMe$ nmap -sT MACHINE_IP

Starting Nmap 7.60 ( https://nmap.org ) at 2021-08-30 09:53 BST
Nmap scan report for MACHINE_IP
Host is up (0.0024s latency).
Not shown: 995 closed ports
PORT    STATE SERVICE
22/tcp  open  ssh
25/tcp  open  smtp
80/tcp  open  http
111/tcp open  rpcbind
143/tcp open  imap
993/tcp open  imaps
995/tcp open  pop3s
MAC Address: 02:45:BF:8A:2D:6B (Unknown)

Nmap done: 1 IP address (1 host up) scanned in 0.40 seconds
```

Podemos incluir la opción `-F` para ir maś rápido, lo que reducirá la cantidad de puertos escaneados de los 1000 más comunes a los 100 más comunes. También podemos usar la opción `-r` para escanear los puertos en orden consecutivo en lugar de orden random.