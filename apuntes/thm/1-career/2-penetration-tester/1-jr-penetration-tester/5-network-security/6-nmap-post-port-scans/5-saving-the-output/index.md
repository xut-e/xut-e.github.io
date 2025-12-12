---
layout: apunte
title: "5. Saving the Output"
---

Cuando ejecutamos un comando de Nmap, es razonable guardar los resultados en un archivo. Para ello debemos seleccionar el tipo correcto de archivo que necesitemos en cada momento. Seleccionar una buena manera de nombrarlos también es crucial.  Los principales formatos son:

- Normal
- Grepeable (`grep`)
- XML

-----------------------------
<h2>Normal</h2>
Como el nombre infiere, el formato normal es similar al output de nmap que te sale en pantalla. Puedes elegir este formato usando `-oN <nombre_archivo>`.

```shell
pentester@TryHackMe$ cat MACHINE_IP_scan.nmap 
# Nmap 7.60 scan initiated Fri Sep 10 05:14:19 2021 as: nmap -sS -sV -O -oN MACHINE_IP_scan 10.82.182.44

Nmap scan report for 10.82.182.44
Host is up (0.00086s latency).
Not shown: 994 closed ports
PORT    STATE SERVICE VERSION
22/tcp  open  ssh     OpenSSH 6.7p1 Debian 5+deb8u8 (protocol 2.0)
25/tcp  open  smtp    Postfix smtpd
80/tcp  open  http    nginx 1.6.2
110/tcp open  pop3    Dovecot pop3d
111/tcp open  rpcbind 2-4 (RPC #100000)
143/tcp open  imap    Dovecot imapd
MAC Address: 02:A0:E7:B5:B6:C5 (Unknown)
Device type: general purpose
Running: Linux 3.X
OS CPE: cpe:/o:linux:linux_kernel:3.13
OS details: Linux 3.13
Network Distance: 1 hop
Service Info: Host:  debra2.thm.local; OS: Linux; CPE: cpe:/o:linux:linux_kernel

OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
# Nmap done at Fri Sep 10 05:14:28 2021 -- 1 IP address (1 host up) scanned in 9.99 seconds
```

-----------------------------------
<h2>Grepeable</h2>
El formato grepeable saca su nombre del comando `grep` (Global Regular Expression Printer), el cual permite buscar y filtrar patrones. Puedes elegirlo usando `-oG <nombre_archivo>`.

```shell
pentester@TryHackMe$ cat MACHINE_IP_scan.gnmap 
# Nmap 7.60 scan initiated Fri Sep 10 05:14:19 2021 as: nmap -sS -sV -O -oG MACHINE_IP_scan 10.82.182.44
Host: 10.82.182.44	Status: Up
Host: 10.82.182.44	Ports: 22/open/tcp//ssh//OpenSSH 6.7p1 Debian 5+deb8u8 (protocol 2.0)/, 25/open/tcp//smtp//Postfix smtpd/, 80/open/tcp//http//nginx 1.6.2/, 110/open/tcp//pop3//Dovecot pop3d/, 111/open/tcp//rpcbind//2-4 (RPC #100000)/, 143/open/tcp//imap//Dovecot imapd/	Ignored State: closed (994)	OS: Linux 3.13	Seq Index: 257	IP ID Seq: All zeros
# Nmap done at Fri Sep 10 05:14:28 2021 -- 1 IP address (1 host up) scanned in 9.99 seconds
```

Es útil y eficiente al buscar por cosas como el siguiente motivo:

```shell
pentester@TryHackMe$ grep http MACHINE_IP_scan.gnmap 
Host: 10.82.182.44	Ports: 22/open/tcp//ssh//OpenSSH 6.7p1 Debian 5+deb8u8 (protocol 2.0)/, 25/open/tcp//smtp//Postfix smtpd/, 80/open/tcp//http//nginx 1.6.2/, 110/open/tcp//pop3//Dovecot pop3d/, 111/open/tcp//rpcbind//2-4 (RPC #100000)/, 143/open/tcp//imap//Dovecot imapd/	Ignored State: closed (994)	OS: Linux 3.13	Seq Index: 257	IP ID Seq: All zeros
```

---------------------------------
<h2>XML</h2>
El tercer formato es XML. Puedes guardar los resultados del escaneo en formato XML usando `-oX <nombre_archivo>`. El formato XML es muy conveniente al cargarlo en otros programas gracias a sus etiquetas.


>[!IMPORTANT] También puedes guardar el resultado en todos los formatos usando `-oA <nombre_archivo>`.

