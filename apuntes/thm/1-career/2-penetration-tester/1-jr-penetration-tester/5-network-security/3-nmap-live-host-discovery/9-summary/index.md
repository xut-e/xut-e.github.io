---
layout: apunte
title: "9. Summary"
---

Hemos aprendido como ARP, ICMP, TCP y UDP pueden detectar hosts  activos.

| Tipo de Escaneo        | Comando de Ejemplo                          |
| ---------------------- | ------------------------------------------- |
| ARP Scan               | `sudo nmap -PR -sn MACHINE_IP/24`           |
| ICMP Echo Scan         | `sudo nmap -PE -sn MACHINE_IP/24`           |
| ICMP Timestamp Scan    | `sudo nmap -PP -sn MACHINE_IP/24`           |
| ICMP Address Mask Scan | `sudo nmap -PM -sn MACHINE_IP/24`           |
| TCP SYN Ping Scan      | `sudo nmap -PS22,80,443 -sn MACHINE_IP/30`  |
| TCP ACK Ping Scan      | `sudo nmap -PA22,80,443 -sn MACHINE_IP/30`  |
| UDP Ping Scan          | `sudo nmap -PU53,161,162 -sn MACHINE_IP/30` |

Recuerda añadir `-sn` si sólo estás interesado en los hosts sin el escaneo de puertos.

| Opción | Propósito                                      |
| ------ | ---------------------------------------------- |
| `-n`   | No mira DNS                                    |
| `-R`   | Mira reverse-DNS para todos los posibles hosts |
| `-sn`  | Sólo descubrimiento de hosts                   |

