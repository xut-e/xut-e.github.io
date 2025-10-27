---
layout: apunte
title: "5. Cracking Windows Authentification Hashes"
---

Ahora que entendemos la sintaxis básica y su uso, vamos a ver cómo crackear algo un poco más complicado. Algo que quizás incluso tengas que hacer en un entorno de penetración Red Team. Los hashes de autentificación son versiones hasheadas de las contraseñas guardadas por los sistemas operativos. Es posible crackearlos con fuerza bruta, a veces. Por lo general, para tener acceso a estos ya debemos ser un usuario con privilegios.

--------------
<h2>NTHash / NTLM</h2>
NTHash es el formato de hash moderno que las máquinas Windows usan para guardar sus contraseñas (de usuarios y servicios). También se le llama comúnmente NTLM, que hace referencia a la versión previa de este formato, LM, así que NT LM.

Un poco de historia: la designacion NT de Windows originalmente significaba "New Technology", para denotar a los productos no construidos para el SO MS-DOS. Con el tiempo el significado se diluyó hacia el nombre del sistema operativo.

En Windows, SAM (Security Account Manager) es usado para almacenar información de la cuenta del usuario. Se pueden adquirir los NTHash dumpeando la base de datos de SAM de una máquina Windows usando una herramienta como `Mimikatz` o usando la base de datos de Active Directory: `NTDS.dit`. Puede incluso que no tengas que romper el hash para conseguir una escalada de privilegios pues podrías llegar a ejecutar un ataque "pass the hash".