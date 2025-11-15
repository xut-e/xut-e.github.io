---
layout: apunte
title: "6. Blind SQLI - Authentication Bypass"
---

Al contrario que la SQLi In-Band, donde podemos ver los resultados de nuestro ataque en la pantalla, las vulnerabilidades SQLi Blind son aquellas en las que tenemos muy poco o nada de feedback para confirmar si las queries inyectadas fueron o no exitosas.

-------------------------------------
<h2>Bypasseo de Autentificación</h2>
Una de las técnicas más directas de SQLi Blind es al bypassear los métodos de autentificación como los formularios de log in. Aquí no nos interesa recuperar información, sino simplemente sobrepasar el formulario.

Estos formularios están conectados a la base de datos y normalmente por la forma de desarrollo no le interesa cuáles son los usuario y contraseña introducidos sino más bien si ese par existe a la vez en la base de datos.

----------------------
<h2>Práctica</h2>
Vamos a ver algunos ejemplos prácticos.

--------------------------------------
<h2>Nivel 2</h2>
1. Hacemos pruebas para ver si hay parámetros.
   !**Pasted image 20251114103243.png**
2. Vemos que no los hay, por lo que trabajaremos con los campos de input. También podríamos haber mandado una query como: `SELECT * FROM users WHERE username='' AND password='' OR 1=1;`
   !**Pasted image 20251114103357.png**

>[!CAUTION] Si "admin" no existiera, no nos hubiera valido la primera query.

