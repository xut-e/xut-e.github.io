---
layout: apunte
title: "3. Enumerating Users Via Kerberos"
---

<h2>Introducción</h2>
Se están ejecutando diversos servicios adicionales, entre ellos Kerberos. Kerberos es un servicio de autentificación fundamental dentro de Active Directory. Con este puerto abierto, podemos utilizar una herramienta llamada Kerbrute para descubrir usuarios y contraseñas mediante fuerza bruta, e incluso realizar ataques de *password spraying* (rociado de contraseñas).

-----------------------------
<h2>Enumeración</h2>
Para esta máquina, se utilizarán listas modificadas de [usuarios](https://raw.githubusercontent.com/Sq00ky/attacktive-directory-tools/master/userlist.txt) y de [contraseñas](https://raw.githubusercontent.com/Sq00ky/attacktive-directory-tools/master/passwordlist.txt) con el fin de reducir el tiempo necesario para la enumeración de usuarios y el descifrado de *hashes* de contraseñas. NO se recomienda intentar obtener credenciales mediante fuerza bruta debido a las políticas de bloqueo de cuentas, las cuales no es posible enumerar en el controlador de dominio.

-------------------------------------
1. ¿Qué comando dentro de Kerbrute nos permite enumerar usuarios válidos?

!**Pasted image 20260925135818.png**

Es `userenum`.

2. ¿Qué cuenta importante es descubierta?

Para poder hacer esto primero tenemos que añadir el `DNS_Computer_Name` a `/etc/hosts`. Después utilizamos el diccionario proporcionado en la actividad para listar usuarios con `kerbrute`.

!**Pasted image 20260925141555.png**

El primer nombre de usuario que salta a la vista es `svc-admin`. Parece ser la cuenta que gestiona servicios.

3. ¿Cuál es la otra cuenta importante descubierta?

La otra cuenta aparentemente interesante es `backup` ya que parece gestionar las copias de seguridad.

