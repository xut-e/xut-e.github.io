---
layout: apunte
title: "2. Getting the Flags"
---

<h2>Reconocimiento Inicial</h2>
Comenzamos escaneando en busca de puertos abiertos.

!**Pasted image 20260315140650.png**

Una vez hecho esto vamos a escanear dichos puertos más en profundidad.

!**Pasted image 20260315140803.png**

Vemos que el anonymous login está habilitado para FTP.

Ahora vamos a escanear directorios en la web.

!**Pasted image 20260315142144.png**
!**Pasted image 20260315142200.png**

Después de este escaneo concluimos que los archivos subidos en FTP muy seguramente sean accesibles mediante la web. Vamos a mirar a ver cómo se ve la web.

!**Pasted image 20260315142301.png**

No hay nada ni en el código fuente ni nada, vamos a ver si el directorio `/files/` es accesible por web.

!**Pasted image 20260315142419.png**

Pues sí que lo es.

-------------------------------------------------
<h2>Profundización</h2>
Con todo lo que tenemos es hora de profundizar en los sistemas. Ya que estamos en la web vamos a ver de qué se tratan los archivos que hay en el directorio de archivos.

Primero miramos qué es `notice.txt`.

!**Pasted image 20260315142549.png**

Ahora vamos a ver qué es `important.jpg`.

!**Pasted image 20260315142624.png**

Vamos a ver si esconde algo.

!**Pasted image 20260315142832.png**

Parece que no. Vamos a mirar en el directorio `/ftp/`.

!**Pasted image 20260315142900.png**

Está vacío de momento. Vamos ahora a iniciar sesión en el ftp.

!**Pasted image 20260315143021.png**

Vamos a ver qué es ese archivo, aunque parece que está vacío.

!**Pasted image 20260315143052.png**

Pues no está vacío pero casi.

Vamos a ver si podemos subir archivos. Vamos a probar a subir un archivo `test.txt`.

```text
test
```

!**Pasted image 20260315144924.png**

Con la sesión iniciada intentamos subirlo en `ftp/`.

!**Pasted image 20260315144834.png**

Efectivamente podemos subir archivos, parece que hemos encontrado el vector de ataque.

----------------------------------------
<h2>Explotación</h2>
Editamos una reverse shell y nos ponemos en escucha.

!**Pasted image 20260315145012.png**

La subimos.

!**Pasted image 20260315145057.png**

Vamos a la web para ejecutarla.

!**Pasted image 20260315145129.png**

Así obtenemos una reverse shell. Vamos a estabilizarla.

!**Pasted image 20260315145246.png**

Si miramos qué hay en nuestro directorio:

!**Pasted image 20260315145441.png**

Aquí está la receta. Vamos a intentar conseguir la flag de usuario. Si nos fijamos, hay dos archivos que pertenecen a `www-data`. Vamos a mirar en `incidents/`.

!**Pasted image 20260315145726.png**

Parece que hay un archivo `pcapng`, vamos a mandárnoslo a nuestra máquina.

!**Pasted image 20260315145929.png**

Vamos a abrirlo con `Wireshark`.

Si filtramos por tráfico `http` podemos ver que alguien más ha subido una shell en el pasado.

!**Pasted image 20260315150927.png**

Vamos a ver el flujo TCP, para ello hacemos click en cualquier paquete TCP y le damos a seguir tcp.

!**Pasted image 20260315151745.png**

Se nos abrirá la página de flujo TCP, ahí, vamos subiendo por el flujo con las flechitas de abajo a la derecha.

!**Pasted image 20260315151943.png**

En la secuencia 7 encontramos una contraseña. Vamos a utilizarla para iniciar sesión como `lennie` por SSH.

!**Pasted image 20260315152051.png**

Hemos conseguido una sesión SSH, vamos a leer la flag del usuario.

!**Pasted image 20260315152204.png**

>[!IMPORTANT] Si prefieres una shell en condicioens escribe `bash` en la sesión SSH.

------------------------------------------
<h2>Escalada de Privilegios</h2>
Ahora toca escalar privilegios. Lo primero que vamos a hacer es mirar qué hay en `scripts/`.

!**Pasted image 20260315152303.png**

Vamos a ver qué contienen los archivos.

!**Pasted image 20260315152828.png**

Nada muy interesante por Documents. Vamos a ver en scripts.

!**Pasted image 20260315152921.png**

Parece que hay otro script: `/etc/print.sh`.

!**Pasted image 20260315153038.png**

Parece que además, `startup_list.txt` está siendo actualizado cada minuto, por lo que es probable que un script de root esté ejecutando `planner.sh` cada minuto, aunque no aparezca en el crontab.

!**Pasted image 20260315155552.png**

Acabamos de encontrar nuestro vector de escalada. Vamos a ejecutar `planner.sh` para asegurarnos de que se ejecuta efectivamente.

!**Pasted image 20260315153827.png**

Gracias al `Done!` sabemos que `/etc/print.sh` se ha ejecutado, por lo que vamos a introducir una reverse shell en `print.sh` y a esperar una conexión en nuestra consola.

!**Pasted image 20260315154445.png**

Nos ponemos en escucha.

!**Pasted image 20260315154017.png**

Si esperamos obtenemos la shell.

!**Pasted image 20260315154816.png**

Ahora podemos buscar la flag de root.

!**Pasted image 20260315154850.png**

------------------------------------------------
<h2>Conclusión</h2>
Una máquina divertida que te hace adentrarte en el análisis de tráfico de red. Me ha gustado bastante. Quizá la parte más complicada fue darse cuenta de que el script que corría para actualizar la lista estaba automatizado por root, aunque no apareciese en el crontab.

>[!SUCCESS] Hemos conseguido la receta y las dos flags.

