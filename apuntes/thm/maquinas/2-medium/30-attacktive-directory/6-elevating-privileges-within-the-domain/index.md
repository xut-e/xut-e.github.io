---
layout: apunte
title: "6. Elevating Privileges Within the Domain"
---

<h2>Sincronicemos</h2>
Ahora que disponemos de nuevas credenciales de cuenta de usuario, es posible que tengamos más privilegios en el sistema que antes. El nombre de usuario de la cuenta «backup» nos hace reflexionar: ¿de qué sistema es esta cuenta de respaldo?

Pues bien, se trata de la cuenta de respaldo del Controlador de dominio. Esta cuenta cuenta con un permiso exclusivo que permite sincronizar todos los cambios de Active Directory con ella; esto incluye los hashes de las contraseñas.

!**Pasted image 20260925161942.png**

Sabiendo esto, podemos utilizar otra herramienta de Impacket llamada "secretsdump.py". Esto nos permitirá extraer todos los hashes de contraseña asociados a esa cuenta de usuario (la cual está sincronizada con el controlador de dominio). Al aprovechar esto, obtendremos efectivamente el control total del dominio de Active Directory.

----------------------------------------
1. ¿Qué método permitió dumpear el NTDS.DIT?

Como podemos ver abajo el método es DRSUAPI.

2. ¿Cuál es el hash del Administrator?

!**Pasted image 20260925164047.png**

Ahí lo tenemos.

3. ¿Qué método de ataque nos permitiría autentificarnos como el usuario sin la contraseña?

El método se llama Pass the Hash.

4. Usando una herramienta llamada evil-winrm, ¿qué opción nos permitirá usar un hash?

!**Pasted image 20260925164347.png**

La opción es `-H`.
