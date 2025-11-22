---
layout: apunte
title: "7. Nmap Host Discovery Using TCP and UDP"
---

<h2>TCP SYN Ping</h2>
Podemos mandar un paquete con la flag SYN (Synchronize) al puerto TCP 80 (por defecto) y esperar una respuesta. Un puerto abierto debe responder con SYN/ACK (Acknowledge), mientras que uno cerrado responderá con RST (Reset). En este caso sólo comprobamos que obtengamos alguna respuesta, el estado específico del puerto es irrelevante.

!**Pasted image 20251119001336.png**

Si quieres que Nmap use el TCP SYN ping, debes usar `-PS` seguido del número del puerto (`-PS21` o `-PS21-25`). Los usuarios con privilegios pueden mandarlo sin completar el 3-way handshake. aunque el puerto esté abierto.

!**Pasted image 20251119001536.png**

Veamos un ejemplo:

```shell
pentester@TryHackMe$ sudo nmap -PS -sn 10.10.68.220/24
Starting Nmap 7.92 ( https://nmap.org ) at 2021-09-02 13:45 EEST
Nmap scan report for 10.10.68.52
Host is up (0.10s latency).
Nmap scan report for 10.10.68.121
Host is up (0.16s latency).
Nmap scan report for 10.10.68.125
Host is up (0.089s latency).
Nmap scan report for 10.10.68.134
Host is up (0.13s latency).
Nmap scan report for 10.10.68.220
Host is up (0.11s latency).
Nmap done: 256 IP addresses (5 hosts up) scanned in 17.38 seconds
```

Veamos como aparece la captura de paquetes en Wireshark:

!**Pasted image 20251119001626.png**

------------------------------------
<h2>TCP ACK Ping</h2>
Como puedes haber adivinado, esto manda un paquete con la flag ACK. Debes correr Nmap como usuario privilegiado.

Se usa el puerto 80 por defecto. La sintaxis es similar a la de TCP SYN ping, solo que ahora la opción es `-PA`. El puerto, si está activo, responde con un RST ya que el paquete no forma parte de ninguna comunicación activa.

!**Pasted image 20251119001920.png**

Veamos un ejemplo:

```shell
pentester@TryHackMe$ sudo nmap -PA -sn 10.10.68.220/24
Starting Nmap 7.92 ( https://nmap.org ) at 2021-09-02 13:46 EEST
Nmap scan report for 10.10.68.52
Host is up (0.11s latency).
Nmap scan report for 10.10.68.121
Host is up (0.12s latency).
Nmap scan report for 10.10.68.125
Host is up (0.10s latency).
Nmap scan report for 10.10.68.134
Host is up (0.10s latency).
Nmap scan report for 10.10.68.220
Host is up (0.10s latency).
Nmap done: 256 IP addresses (5 hosts up) scanned in 29.89 seconds
```

Si le echamos un vistazo al tráfico de red descubriremos varios paquetes con la flag ACK.

!**Pasted image 20251119002017.png**

---------------------------------------------
<h2>UDP Ping</h2>
Finalmente, podemos usar UDP para descubrir si el host está online. Al contrario que con TCP SYN ping, mandar un paquete UDP a un puerto abierto no espera respuesta alguna. Sin embargo, si mandamos un paquete UDP a un puerto UDP cerrado, recibiremos un ICMP port unreachable, lo cual indica que el host está activo.

!**Pasted image 20251119002454.png**

La sintaxis específica es similar a las anteriores pero con la opción `-PU`.

```shell
pentester@TryHackMe$ sudo nmap -PU -sn 10.10.68.220/24
Starting Nmap 7.92 ( https://nmap.org ) at 2021-09-02 13:45 EEST
Nmap scan report for 10.10.68.52
Host is up (0.10s latency).
Nmap scan report for 10.10.68.121
Host is up (0.10s latency).
Nmap scan report for 10.10.68.125
Host is up (0.14s latency).
Nmap scan report for 10.10.68.134
Host is up (0.096s latency).
Nmap scan report for 10.10.68.220
Host is up (0.11s latency).
Nmap done: 256 IP addresses (5 hosts up) scanned in 9.20 seconds
```

Inspeccionemos los paquetes UDP generados con Wireshark:

!**Pasted image 20251119002558.png**

---------------------------------------------
<h2>Masscan</h2>
Masscan usa un acercamiento similar para descubrir los sistemas disponibles. Sin embargo, para acabar este escaneo rápido, Masscan es bastante agresivo con la cantidad de paquetes que genera. La sintaxis es similar, `-p` puede ir seguido de un puerto, lista o rango.

- `masscan MACHINE_IP/24 -p443`
- `masscan MACHINE_IP/24 -p80,443`
- `masscan MACHINE_IP/24 -p22-25`
- `masscan MACHINE_IP/24 ‐‐top-ports 100`

Puedes instalar Masscan haciendo `sudo apt install masscan`.
