---
layout: apunte
title: "6. Password Cracking"
---

ya hemos hablado de cómo las tablas arcoiris nos pueden ayudar si los hashes no usan salt, pero ¿qué pasa si sí que está involucrada?

No puedes desencriptar hashes porque no están encriptados. Los puedes crackear hasheando múltiples entradas como `rockyou.txt`, añadiendo salt, si hay. Herramientas como [Hashcat](https://hashcat.net/hashcat/) o [John the Ripper](https://www.openwall.com/john/) son comúnmente utilizadas para este propósito.

-----------------
<h2>Crackeando Contraseñas con GPUs</h2>
Las gráficas modernas tienen miles de núcleos. Se especializan en procesamiento de imágenes digitales y aceleración de computación de gráficos. Aunque no pueden hacer el mismo tipo de trabajo que hacen las CPUs, son muy buenas con ciertas operaciones matemáticas, así que puedes usarlas para romper los hashes más rápido, aunque algunos algoritmos como Bcrypt no ofrecen ventajas con respecto a la CPU lo que los ayuda a mantanerse protegidos.

-----------
<h2>¿Crackeando en Máquinas Virtuales?</h2>
Normalmente, las máquinas virtuales no tienen acceso a la tarjeta gráfica del dispositivo que las hostea, aunque se puede configurar para ello.

Si quieres usar Hashcat, es mejor usarlo en el host. Si prefieres MS Windows también puedes, desde Powershell.

John the Ripper usa CPU por defecto y funciona en una máquina virtual, aunque puedes conseguir mejor rendimiento en el host.

--------------
<h2>Hora de Crackear algunos Hashes</h2>
Vamos a usar Hashcat para crackear algunos hashes. La sintaxis básica de Hashcat es:

`hashcat -m <tipo_hash> -a <modo_ataque> hashfile wordlist` donde:

- `-m <tipo_hash>`: Especifica el tipo de hash en formato numérico. por ejemplo `-m 1000` es para NTLM. para comprobar el código puedes usar `man hashcat | grep <tipo_hash>`.
- `-a <modo_ataque>`: Especifica el modo de ataque. Por ejemplo, `-a 0` es para "directo" (usar una contraseña de la lista después de otra).
- `hashfile`: Es el archivo que contiene el hash que quieres crackear.
- `wordlist`: Es el archivo que contiene la lista de palabras que quieres utilizar.

Por ejemplo, `hashcat -m 3200 -a 0 hash.txt /usr/share/wordlists/rockyou.txt` tratará el hash como Bcrypt e intentará las contraseñas del archivo `rockyou.txt`.