---
layout: apunte
title: "5. Displaying Packets"
---

Tcpdump es un programa rico con muchas opciones para personalizar cómo los paquetes se muestran. Hemos seleccionado las siguientes opciones para enseñar:

- `-q`: Rápido (quick), muestra información resumida.
- `-e`: Muestra el header de link-level.
- `-A`: Muestra la información del paquete en ASCII.
- `-xx`: Muestra la información del paquete en formato hexadecimal.
- `-X`: Muestra los headers y la información en hexadecimal y ASCII.

---------------------
<h2>Información de Paquete Reducida</h2>
Si prefieres lineas más reducidas la opción `-q` es ideal. Se muestra algo así:

```bash
user@TryHackMe$ tcpdump -r TwoPackets.pcap -q 
reading from file TwoPackets.pcap, link-type EN10MB (Ethernet), snapshot length 262144 
18:59:59.979771 IP 104.18.12.149.https > g5000.45248: tcp 25 
18:59:59.980574 IP g5000.45248 > 104.18.12.149.https: tcp 29
```

------------------
<h2>Mostrando la Cabecera Link-Level</h2>
Si estás en una red WiFi o Ethernet y quieres incluir las direcciones MAC, todo lo que necesitas hacer es `-e`.

```bash
user@TryHackMe$ tcpdump -r TwoPackets.pcap -e 
reading from file TwoPackets.pcap, link-type EN10MB (Ethernet), snapshot length 262144 
18:59:59.979771 44:df:65:d8:fe:6c (oui Unknown) > 02:83:1e:40:5d:17 (oui Unknown), ethertype IPv4 (0x0800), length 91: 104.18.12.149.https > g5000.45248: Flags [P.], seq 2695955324:2695955349, ack 2856007037, win 16, options [nop,nop,TS val 412758285 ecr 3959057198], length 25 
18:59:59.980574 02:83:1e:40:5d:17 (oui Unknown) > 44:df:65:d8:fe:6c (oui Unknown), ethertype IPv4 (0x0800), length 95: g5000.45248 > 104.18.12.149.https: Flags [P.], seq 1:30, ack 25, win 2175, options [nop,nop,TS val 3959057384 ecr 412758285], length 29
```

-----------------
<h2>Mostrando Paquetes en ASCII</h2>
ASCII significa American Standard Code for Information Interchange, representa texto. Convierte los bytes a símbolos del alfabeto inglés.

```bash
user@TryHackMe$ tcpdump -r TwoPackets.pcap -A 
reading from file TwoPackets.pcap, link-type EN10MB (Ethernet), snapshot length 262144 
18:59:59.979771 IP 104.18.12.149.https > g5000.45248: Flags [P.], seq 2695955324:2695955349, ack 2856007037, win 16, options [nop,nop,TS val 412758285 ecr 3959057198], length 25 
E..M..@.5..)h.....BY.......|.;5}........... ..1...k......j.3.2.....&9a.....-L
18:59:59.980574 IP g5000.45248 > 104.18.12.149.https: Flags [P.], seq 1:30, ack 25, win 2175, options [nop,nop,TS val 3959057384 ecr 412758285], length 29
E..Ql.@.@.VV..BYh........;5}............... ..k...1.......1.y.&VC<#._J$..z...D#.`
```

-----------
<h2>Mostrando Paquetes en Formato Hexadecimal</h2>
El formato ASCII funciona bien cuando el contenido es texto en inglés, pero no funcionará si ha sido encriptado o comprimido. Aquí entra en juego el hexadecimal. Para ello usamos `-xx`.

 ```bash
 user@TryHackMe$ tcpdump -r TwoPackets.pcap -xx 
 reading from file TwoPackets.pcap, link-type EN10MB (Ethernet), snapshot length 262144 
 18:59:59.979771 IP 104.18.12.149.https > g5000.45248: Flags [P.], seq 2695955324:2695955349, ack 2856007037, win 16, options [nop,nop,TS val 412758285 ecr 3959057198], length 25         
	 0x0000:  0283 1e40 5d17 44df 65d8 fe6c 0800 4500         
	 0x0010:  004d fbd8 4000 3506 d229 6812 0c95 c0a8         
	 0x0020:  4259 01bb b0c0 a0b1 037c aa3b 357d 8018         
	 0x0030:  0010 f905 0000 0101 080a 189a 310d ebfa         
	 0x0040:  6b2e 1703 0300 146a 8f33 1832 e6a2 fb99         
	 0x0050:  eb26 3961 dad4 1611 152d 4c 
18:59:59.980574 IP g5000.45248 > 104.18.12.149.https: Flags [P.], seq 1:30, ack 25, win 2175, options [nop,nop,TS val 3959057384 ecr 412758285], length 29         
	0x0000:  44df 65d8 fe6c 0283 1e40 5d17 0800 4500         
	0x0010:  0051 6ca8 4000 4006 5656 c0a8 4259 6812         
	0x0020:  0c95 b0c0 01bb aa3b 357d a0b1 0395 8018         
	0x0030:  087f 17e0 0000 0101 080a ebfa 6be8 189a         
	0x0040:  310d 1703 0300 18f4 31fa 798d 2656 433c         
	0x0050:  2389 5f4a 24c2 fa7a 1496 8444 238e 60
 ```

----------------
<h2>Lo Mejor de Ambos Mundos</h2>
Si quieres mostrarlo en hexadecimal y ASCII, usa `-X`.

-------------
<h2>Resumen y Ejemplos</h2>
Una tabla con algunos comandos aprendidos:

| Comando       | Explicación                                  |
| ------------- | -------------------------------------------- |
| `tcpdump -q`  | Información resumida.                        |
| `tcpdump -e`  | Añade dirección MAC.                         |
| `tcpdump -A`  | Muestra el contenido en ASCII.               |
| `tcpdump -xx` | Muestra el contenido en hexadecimal.         |
| `tcpdump -X`  | Muestra el contenido en hexadecimal y ASCII. |
