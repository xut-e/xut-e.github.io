---
layout: apunte
title: "1. Introduction"
---

En la unidad anterior cubrimos varios protocolos:

- Telnet
- HTTP
- FTP
- SMTP
- POP3
- IMAP

Los servidores que implementan estos protocolos son susceptibles a diferentes tipos de ataques. Por nombrar algunos que considerar:

1. Sniffing Attack (captura de paquetes de red).
2. Man-in-the-Middle (MITM) Attack.
3. Password Attack (ataque de autentificación)
4. Vulnerabilidades.

Desde la perspectiva de la seguridad, siempre necesitamos pensar sobre qué tratamos de proteger. Considera la tríada de la seguridad: Confidencialidad, Integridad y Disponibilidad.

Si tienes dudas sobre esta tríada (CIA) o su contraparte (DAD) visita la unidad [0. Security Principles](/apuntes/thm/0-pre-career/2-cyber-security-101/13-build-your-cyber-security-career/1-security-principles/0-security-principles/).

Por ejemplo, un ataque de captura de paquetes en estos servicios viola el principio de confidencialidad, pudiendo llevar a un problema de divulgación. Las vulnerabilidades son un espectro más amplio, y las cubriremos más adelante.