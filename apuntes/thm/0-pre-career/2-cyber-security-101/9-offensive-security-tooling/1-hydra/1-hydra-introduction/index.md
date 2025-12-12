---
layout: apunte
title: "1. Hydra Introduction"
---

<h2>¿Qué es Hydra?</h2>
Hydra es una herramienta de crackeo de contraseñas por fuerza bruta. Hydra puede correr una lista e ir probando contraseñas de esa lista, mucho más rápido que hacerlo a mano.

Según la documentación en su [repositorio oficial](https://github.com/vanhauser-thc/thc-hydra), Hydra puede bruteforcear los siguientes protocolos: “Asterisk, AFP, Cisco AAA, Cisco auth, Cisco enable, CVS, Firebird, FTP, HTTP-FORM-GET, HTTP-FORM-POST, HTTP-GET, HTTP-HEAD, HTTP-POST, HTTP-PROXY, HTTPS-FORM-GET, HTTPS-FORM-POST, HTTPS-GET, HTTPS-HEAD, HTTPS-POST, HTTP-Proxy, ICQ, IMAP, IRC, LDAP, MEMCACHED, MONGODB, MS-SQL, MYSQL, NCP, NNTP, Oracle Listener, Oracle SID, Oracle, PC-Anywhere, PCNFS, POP3, POSTGRES, Radmin, RDP, Rexec, Rlogin, Rsh, RTSP, SAP/R3, SIP, SMB, SMTP, SMTP Enum, SNMP v1+v2+v3, SOCKS5, SSH (v1 and v2), SSHKEY, Subversion, TeamSpeak (TS2), Telnet, VMware-Auth, VNC and XMPP.”

Esto muestra la importancia de hacer una contraseña segura, ya que si nuestra contraseña se encuentra dentro de algún diccionario es susceptible de ser rota.

---------------------
<h2>Instalando Hydra</h2> 
Para instalar hydra (viene preinstalada en Kali Linux), puedes hacerlo ejecutando `apt install hydra` o `dnf install hydra`. También puedes descargarla desde su repositorio oficial, listado arriba.