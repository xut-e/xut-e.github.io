---
layout: apunte
title: "1. Configuration"
---

<h2>AVISO IMPORTANTE</h2>
>[!CAUTION] ATENCIÓN!: No sirvas DVWA en un servidor público, ten cuidado y lee la documentación de su página web oficial. Esto es sólo una guía rápida para aquellos que entienden los riesgos de instalar aplicaciones vulnerables y no me hago responsable de nada

-------------------------------------
<h2>Pasos</h2>
1. Clonamos el [repositorio oficial](https://github.com/digininja/DVWA?tab=readme-ov-file) desde GitHub en `/var/www/html/`.
   !**Pasted image 20251203163530.png**
2. Iniciamos el servicio `apache2`.
   !**Pasted image 20251203163939.png**
3. Nos metemos en el directorio DVWA y ejecutamos el siguiente comando.
   !**Pasted image 20251203164154.png**
4. Podemos mirar la contraseña y el usuario en este archivo`php`.
5. Comenzamos el servicio `mariadb` (en kali).
   !**Pasted image 20251203164515.png**
6. Iniciamos sesión como root en mariaDB.
   !**Pasted image 20251203164822.png**
7. Seguimos los pasos de configuración de la base de datos.
	1. Creamos la base de datos `dvwa`.
	   !**Pasted image 20251203164939.png**
	2. Creamos en usuario con la contraseña.
	   !**Pasted image 20251203165151.png**
	3. Le damos permisos al usuario en la base de datos correspondiente.
	   !**Pasted image 20251203165638.png**
	4. Recargamos la caché de privilegios (necesario después de editar manualmente privilegios).
	   !**Pasted image 20251203165758.png**
8. Ya podemos iniciar sesión en la base de datos.
   !**Pasted image 20251203170008.png**
9. Usamos la base de datos `dvwa`.
   !**Pasted image 20251203171107.png**
10. Vamos a `http://localhost/DVWA/login.php`.
    !**Pasted image 20251203171243.png**
11. Iniciamos sesión y le damos al botón `Create / Reset Database` abajo del todo y nos logueamos con `admin:password` (tal cual, no es un placeholder).
    !**Pasted image 20251203171631.png**

>[!CAUTION] Recuerda configurar la dificultad al nivel que quieras.

En mi caso yo la pondré en `low` y le darè a `submit`.

!**Pasted image 20251203174130.png**
