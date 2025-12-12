---
layout: apunte
title: "10. Cracking Password-Protected RAR Archives"
---

Podemos usar un proceso similar para obtener la contraseña de archivos RAR.

-----------------
<h2>Rar2John</h2>
Prácticamente idéntico a la herramienta `zip2john`, usaremos la herramienta `rar2john` para convertir los archivos RAR en formato de hash que John pueda entender. La sintáxis básica es:

`rar2john [archivo rar] > [archivo de salida]`

- `rar2john`: Herramienta para convertir el RAR.
- `[archivo rar]`: Ruta al archivo RAR.
- `>`: Redireccionador.
- `[archivo de salida]`: Nombre del archivo que contendrá el hash.

Por ejemplo:

`/opt/john/rar2john rarfile.rar > rar_hash.txt`

---------------
<h2>Crackeo</h2>
Para obtener la contraseña del archivo usaremos el hash que hemos obtenido y un diccionario:

`john --wordlist=/usr/share/wordlists/rockyou.txt rar_hash.txt`
