---
layout: apunte
title: "5. Spoofing and Decoys"
---

En algunas configuraciones, serás capaz de hacer un escaneo al sistema usando una dirección IP falsa /suplantada (spoofed). Dicho escaneo sólo es beneficioso en una situación donde puedas garantizar capturar la respuesta. Si lo haces con un sistema de una red cualquiera lo más probable es que no obtengas respuesta alguna.

!**Pasted image 20251120144031.png**

En resumen, escanear con una dirección IP suplantada tiene tres pasos:

1. El atacante manda un paquete con una dirección IP suplantada.
2. La máquina objetivo responde a la IP suplantada.
3. El atacante captura la respuesta para identificar los puertos abiertos.

En general, espera especificar la interfaz de red con `-e` y deshabilitar el escaneo de hosts con ping mediante `-Pn`. Por lo que en vez de `nmap -S SPOOFED_IP IP_OBJETIVO` necesitarás usar: `nmap -e INTERFAZ_DE_RED -Pn -S SPOOFED_IP IP_OBJETIVO`.

Cuando estás en la misma subred que tu objetivo, también podrás suplantar la MAC usando `--spoof-mac SPOOFED_MAC`.

El spoofing sólo funcionará en un número mínimo de casos donde se cumplan ciertas condiciones. Es por esto que los atacantes puedan preferir usar decoys (señuelos) para hacer más complicado señalar la IP real del escaneo. El concepto es simple:

!**Pasted image 20251120152742.png**

Usamos direcciones IP junto a la nuestra para generar ruido. El ejemplo `nmap -D 10.10.0.1,10.10.0.2,ME IP_OBJETIVO` hará que el escaneo parezca venir de esas IPs. También podemos hacer que se asignen IPs aleatorias a los decoys con `nmap -D 10.10.0.2,10.10.0.2,RND,RND,ME IP_OBJETIVO`.