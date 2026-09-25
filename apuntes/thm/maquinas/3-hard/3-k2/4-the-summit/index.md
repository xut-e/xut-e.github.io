---
layout: apunte
title: "4. The Summit"
---

Ya casi estás ahí. Puedes ver la cima desde donde estás. Incluso el equipo IT está impresionado de cómo de lejos has llegado.

No puedes parar ahora. Con toda la información recopilada, puedes alcanzar la cima y probar tus habilidades.

---------------------------------
<h2>Reconocimiento Inicial</h2>
Comenzamos escaneando los puertos abiertos.

!**Pasted image 20260924125316.png**

Ahora vamos a analizar dichos puertos más en profundidad.

!**Pasted image 20260924125534.png**

Vamos a añadir el DC a `/etc/hosts`.

---------------------------------
<h2>Profundización</h2>
Ahora vamos a ver si encontramos algún usuario válido en el nuevo Domain Controller:

!**Pasted image 20260924130421.png**

Parece que sí. Vamos pues a realizar un ataque de fuerza bruta sobre estos usuarios.

!**Pasted image 20260924130709.png**

No hemos encontrado nada. Puede que tengamos que crackear el hash NTLM de `Administrator`.

!**Pasted image 20260924130950.png**

No hemos conseguido crackearlo, pero igual podemos realizar un ataque PtH sobre este DC.

!**Pasted image 20260924131237.png**

El PtH no tuvo éxito con `administrator` pero sí que lo tuvo con `j.smith`. Vamos a investigar.

!**Pasted image 20260924131341.png**

Aquí podemos ver un nuevo usuario: `o.armstrong`. Vamos a investigar el sistema de ficheros.

!**Pasted image 20260924131658.png**

Parece que hay notas en el escritorio de este nuevo usuario pero no tenemos permiso para leerlas.

!**Pasted image 20260924132847.png**

Aquí podemos ver que nuestro usuario, `j.smith`, no tiene permisos de escritura sobre `backup.bat`. Sin embargo, sí que los tiene sobre el directorio que lo contiene. 

-------------------------------
<h2>Explotación</h2>
Vamos a aprovecharnos de esto. Vamos a intentar eliminar `backup.bat` para reescribirlo después.

!**Pasted image 20260924133359.png**

Y ahora vamos a configurar responder en otra pestaña para intentar robar el hash del usuario que ejecuta el `.bat`.

!**Pasted image 20260924133933.png**

Ahora escribimos algo parecido a lo que había.

>[!NOTE] Lo de `pwned.txt` realmente da igual, lo único que pretendemos es capturar una conexión.

!**Pasted image 20260924134247.png**

Si ahora volvemos a `responder`, podemos ver el hash NTLM de `o.armstrong`.

!**Pasted image 20260924134325.png**

Vamos a crackear el hash.

!**Pasted image 20260924134631.png**

Ahora configuramos Bloodhound de nuevo:

!**Pasted image 20260924135003.png**

Vamos a entrar en la UI.

!**Pasted image 20260924135420.png**

E iniciamos sesión con `o.armstrong` mediante `evil-winrm`.

!**Pasted image 20260924135211.png**

Investigando en su sistema vemos una nota, aunque no revela nada que no sepamos: Sí, es vulnerable y te hemos hackeado, `o.armstrong`.

!**Pasted image 20260924135405.png**

Si nos vamos al escritorio podemos encontrar la flag.

!**Pasted image 20260924135523.png**

---------------------------------
<h2>Escalada de Privilegios</h2>
Ingestamos en Bloodhound los archivos que obtuvimos de `bloodhoun-python` la segunda vez.

!**Pasted image 20260924140030.png**

Parece que el grupo `PERFORMANCE LOG USERS` es interesante. Sin embargo, en `Outbound Object Control` hay algo mucho más interesante:

!**Pasted image 20260924140220.png**

Vamos a ver si hay alguna forma de explotar esto.

!**Pasted image 20260924140454.png**

Bloodhound literalmente nos da los pasos. Vamos a seguirlos. Comenzamos buscando y comprobando `addcomputer.py`.

!**Pasted image 20260924140617.png**

Ahora lo ejecutamos como se nos indica.

!**Pasted image 20260924141150.png**

Obtenemos un error. Si cambiamos el método nos dice lo siguiente.

!**Pasted image 20260924141250.png**

Como LDAPS no ha funcionado, vamos a probar SAMR.

!**Pasted image 20260924141343.png**

Parece que ha añadido la cuenta exitosamente. Vamos a seguir con los pasos.

!**Pasted image 20260924141603.png**

Y el último paso:

!**Pasted image 20260924141855.png**

Ahora toca usar dicho ticket. Vamos a realizar un ataque PtT.

!**Pasted image 20260924142144.png**

>[!CAUTION] Tenemos que exportar el ticket con ese nombre de variable: `KRB5CCNAME`.

Cuando nos pida la contraseña simplemente le damos a enter. Ahora simplemente buscamos la flag.

!**Pasted image 20260924142342.png**

>[!SUCCESS] Hemos conseguido ambas flags!

