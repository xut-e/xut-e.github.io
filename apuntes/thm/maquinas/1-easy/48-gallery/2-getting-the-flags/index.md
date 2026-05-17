---
layout: apunte
title: "2. Getting the Flags"
---

<h2>Reconocimiento Inicial</h2>
Comenzamos realizando un escaneo de puertos abiertos.

!**Pasted image 20260516184014.png**

Ahora analizamos dichos puertos más en profundidad.

!**Pasted image 20260516183859.png**

Esta flag "not set" nos indica un potencial XSS.

Vamos a ver qué directorios hay.

!**Pasted image 20260516184041.png**
!**Pasted image 20260516184526.png**

En el puerto 80 lo único que parece haber es un directorio llamado `gallery`, con varios subdirectorios a la vez. Vamos a ver en el aparente proxy (puerto 8080).

```text
gallery.thm:8080
    ├── config [200 2KB]
    ├── index [200 81MB]
    ├── 404.html [200 166B]
    ├── create_account.php [200 8B]
    └── login.php [200 2KB]
```

Vamos a ver cómo se ven las webs.

!**Pasted image 20260516190431.png**

Aquí no parece haber nada.

!**Pasted image 20260516190538.png**

------------------------------------
<h2>Profundización</h2>
Hemos encontrado un panel de login, pero de momento no tenemos usuario y parece que el `create_account` no está habilitado.

!**Pasted image 20260516190807.png**

Si miramos en el directorio `uploads` del puerto `8080`, podemos ver lo siguiente:

!**Pasted image 20260516191230.png**

Si miramos los archivos no encontramos nada.

-----------------------------------------
<h2>Explotación</h2>
Vamos a probar con lo primero que se nos puede venir a la mente cuando vemos un panel de login personalizado: SQLi.

!**Pasted image 20260516191514.png**

Escribimos el mismo payload arriba y abajo y...

!**Pasted image 20260516191536.png**

Vaya vaya, parece que hemos pasado. SI investigamos un poco, podemos ver que en el perfil hay un campo que nos permite cambiar la imagen de avatar que tenemos.

!**Pasted image 20260516191704.png**

Vamos a intentar subir una reverse shell. Nos ponemos en escucha, subimos la shell y...

!**Pasted image 20260516191859.png**

Ahora estabilizamos la shell.

!**Pasted image 20260516191944.png**

Intentamos leer la flag.

!**Pasted image 20260516192025.png**

Pero no nos deja. Habrá que realizar movimiento lateral hacia `mike`. Antes de todo, vamos a ver si podemos encontrar el hash de la contraseña del administrador, pues nos lo preguntan antes que `user.txt`. Para ello buscamos la página e intentamos leer `config.php`.

!**Pasted image 20260516192832.png**

Estos "requires" parecen interesantes, vamos a ver qué hay ahí.

!**Pasted image 20260516192934.png**

Hemos encontrado un par de cosas, vamos a ver si podemos iniciar sesión en la base de datos.

!**Pasted image 20260516193407.png**

Ahora seleccionamos las tablas que nos interese mirar.

!**Pasted image 20260516193505.png**

Y así obtenemos el hash del administrador.

------------------------------------------
<h2>Movimiento Lateral</h2>
Teniendo ya el hash, vamos a intentar pivotar hacia `mike`. Si miramos en `/var/backups`, podemos ver un backup de `mike`.

!**Pasted image 20260516193735.png**

Si listamos archivos vemos que está el historial de comandos. Si leemos el historial:

!**Pasted image 20260516193900.png**

Vamos a iniciar sesión con `mike` por SSH.

!**Pasted image 20260516193932.png**

Ahora vamos a leer la flag de usuario.

!**Pasted image 20260516193958.png**

--------------------------------------------
<h2>Escalada de Privilegios</h2>
Nos toca escalar privilegios. Primero vamos a ver qué id y grupos tiene `mike`.

!**Pasted image 20260516194030.png**

Nada interesante. Vamos con nuestra checklist de escalada.

!**Pasted image 20260516194119.png**

Parece que hemos encontrado un script que podemos ejecutar como `root`. Vamos a ver de qué se trata.

!**Pasted image 20260516194420.png**

Aquí hay un potencial fallo de seguridad, pues `nano` deja escribir comandos en su interior. Vamos a probar.

!**Pasted image 20260516194547.png**

Buscamos en GTFOBins:

!**Pasted image 20260516194649.png**

Vamos a probar.

!**Pasted image 20260516194734.png**

Y nos da la shell.

!**Pasted image 20260516194744.png**

Vamos a leer la flag.

!**Pasted image 20260516194826.png**

--------------------------------------
<h2>Conclusión</h2>
Una máquina divertida y sencilla en la que hemos tocado varios temas

>[!SUCCESS] Hemos conseguido responder a todas las preguntas obteniendo las flags y la contraseña.

