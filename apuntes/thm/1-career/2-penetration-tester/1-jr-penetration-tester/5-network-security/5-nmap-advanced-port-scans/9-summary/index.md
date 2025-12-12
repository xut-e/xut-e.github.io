---
layout: apunte
title: "9. Summary"
---

En esta unidad hemos visto los siguientes escaneos:

| Tipo de Escaneo de Puertos     | Comando de Ejemplo                                       |
| ------------------------------ | -------------------------------------------------------- |
| TCP Null Scan                  | `sudo nmap -sN 10.82.139.236`                            |
| TCP FIN Scan                   | `sudo nmap -sF 10.82.139.236`                            |
| TCP Xmas Scan                  | `sudo nmap -sX 10.82.139.236`                            |
| TCP Maimon Scan                | `sudo nmap -sM 10.82.139.236`                            |
| TCP ACK Scan                   | `sudo nmap -sA 10.82.139.236`                            |
| TCP Window Scan                | `sudo nmap -sW 10.82.139.236`                            |
| Custom TCP Scan                | `sudo nmap --scanflags URGACKPSHRSTSYNFIN 10.82.139.236` |
| Spoofed Source IP              | `sudo nmap -S SPOOFED_IP 10.82.139.236`                  |
| Spoofed MAC Address            | `--spoof-mac SPOOFED_MAC`                                |
| Decoy Scan                     | `nmap -D DECOY_IP,ME 10.82.139.236`                      |
| Idle (Zombie) Scan             | `sudo nmap -sI ZOMBIE_IP 10.82.139.236`                  |
| Fragment IP data into 8 bytes  | `-f`                                                     |
| Fragment IP data into 16 bytes | `-ff`                                                    |

Además hemos visto las siguientes opciones:

| Option                   | Purpose                                                       |
| ------------------------ | ------------------------------------------------------------- |
| `--source-port PORT_NUM` | Especificar el puerto de origen                               |
| `--data-length NUM`      | Añadir ciertos bytes aleatorios para alcanzar cierta longitud |
| `--reason`               | Explica cómo Nmap llegó a esa conclusión                      |
| `-v`                     | Verbose                                                       |
| `-vv`                    | Más verbose                                                   |
| `-d`                     | Depuración                                                    |
| `-dd`                    | Mas detalles de depuración                                    |
