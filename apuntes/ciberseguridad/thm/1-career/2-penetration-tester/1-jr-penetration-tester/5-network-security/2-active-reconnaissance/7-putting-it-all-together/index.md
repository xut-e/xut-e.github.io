---
layout: apunte
title: "7. Putting It All Together"
---

En esta unidad hemos cubierto varias herramientas desde `ping` y `traceroute` hasta `telnet` y `nc`. En las siguientes unidades estudiaremos Nmap.

| Comando          | Ejemplo                                    |
| ---------------- | ------------------------------------------ |
| ping             | `ping -c 10 10.10.55.97` on Linux or macOS |
| ping             | `ping -n 10 10.10.55.97` on MS Windows     |
| traceroute       | `traceroute 10.10.55.97` on Linux or macOS |
| tracert          | `tracert 10.10.55.97` on MS Windows        |
| telnet           | `telnet 10.10.55.97 PORT_NUMBER`           |
| netcat as client | `nc 10.10.55.97 PORT_NUMBER`               |
| netcat as server | `nc -lvnp PORT_NUMBER`                     |

| Operating System    | Developer Tools Shortcut |
| ------------------- | ------------------------ |
| Linux or MS Windows | `Ctrl+Shift+I`           |
| macOS               | `Option + Command + I`   |