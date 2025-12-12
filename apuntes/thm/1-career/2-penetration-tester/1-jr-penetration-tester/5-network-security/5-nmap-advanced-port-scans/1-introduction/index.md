---
layout: apunte
title: "1. Introduction"
---

Esta unidad es la tercera de una lista de 4 unidades dedicadas a Nmap.

1. [0. Nmap Live Host Discovery](/apuntes/thm/1-career/2-penetration-tester/1-jr-penetration-tester/5-network-security/3-nmap-live-host-discovery/0-nmap-live-host-discovery/)
2. [0. Nmap Basic Port Scans](/apuntes/thm/1-career/2-penetration-tester/1-jr-penetration-tester/5-network-security/4-nmap-basic-port-scans/0-nmap-basic-port-scans/)
3. [0. Nmap Advanced Port Scans](/apuntes/thm/1-career/2-penetration-tester/1-jr-penetration-tester/5-network-security/5-nmap-advanced-port-scans/0-nmap-advanced-port-scans/)
4. [0. Nmap Post Port Scans](/apuntes/thm/1-career/2-penetration-tester/1-jr-penetration-tester/5-network-security/6-nmap-post-port-scans/0-nmap-post-port-scans/)

En la unidad anterior vimos las flags TCP y el 3-way handshake. Para iniciar una conexión, TCP necesita que el primer paquete tenga la flag SYN configurada. Pero ¿qué pasa si se manda como primera comunicación un paquete TCP con la flag ACK configurada? Es como si alguien de la nada te dijera: "Sí, continua hablando, te escucho". Pero tú no has dicho nada.

En esta unidad veremos tipos avanzados de escaneo:

- Null Scan
- FIN Scan
- Xmas Scan
- Maimon Scan
- ACK Scan
- Window Scan
- Custom Scan

Además, veremos esto también:

- Spoofing IP
- Spoofing MAC
- Decoy Scan
- Fragmented Packets
- Idle/Zombie Scan

Veremos opciones y técnicas para evadir FireWalls e IDSs