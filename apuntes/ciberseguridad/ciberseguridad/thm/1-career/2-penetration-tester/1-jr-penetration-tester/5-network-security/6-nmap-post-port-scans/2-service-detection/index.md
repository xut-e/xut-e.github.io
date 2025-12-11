---
layout: apunte
title: "2. Service Detection"
---

Una vez que Nmap descubre puertos abiertos, puedes escanear los siguientes puertos para detectar servicios en ejecución.

Añadir la opción `-sV` a tu comando recolectará y determinará el servicio y la versión del servicio corriendo en los puertos. Puedes controlar la intensidad con `--version-intensity LEVEL` donde `LECEL` es un número entre 0 y 9. Por ejemplo, `--version-light` es lo mismo que `--version-intensity 2` y `--version-all` el lo mismo que `--version-intensity 9`.

Es importante recalcar que usar la opción `-sV` forzará a Nmap a usar un 3-way handshake para establecer conexión. Es necesario porque Nmap no puede descubrir la versión sin establecer la conexión.

El ejemplo de abajo es un output de la consola al usar la opción `-sV`.

```shell
pentester@TryHackMe$ sudo nmap -sV 10.80.135.73

Starting Nmap 7.60 ( https://nmap.org ) at 2021-09-10 05:03 BST
Nmap scan report for 10.80.135.73
Host is up (0.0040s latency).
Not shown: 995 closed ports
PORT    STATE SERVICE VERSION
22/tcp  open  ssh     OpenSSH 6.7p1 Debian 5+deb8u8 (protocol 2.0)
25/tcp  open  smtp    Postfix smtpd
80/tcp  open  http    nginx 1.6.2
110/tcp open  pop3    Dovecot pop3d
111/tcp open  rpcbind 2-4 (RPC #100000)
MAC Address: 02:A0:E7:B5:B6:C5 (Unknown)
Service Info: Host:  debra2.thm.local; OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 8.40 seconds
```

