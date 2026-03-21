---
layout: apunte
title: "2. Getting the Flags"
---

<h2>Reconocimiento Inicial</h2>
Comenzamos haciendo un escaneo básico de puertos.

!**Pasted image 20260320171845.png**

Ahora vamos a escanear estos puertos más a fondo.

!**Pasted image 20260320171950.png**

Nada extremadamente interesante, aparentemente. Vamos a listar directorios web.

!**Pasted image 20260320172502.png**
!**Pasted image 20260320172521.png**
!**Pasted image 20260320172545.png**

Vamos a mirar cómo es la web.

!**Pasted image 20260320173153.png**

-----------------------------------
<h2>Profundización</h2>
Hay un directorio que llama mucho la atención: `/sitemap/.ssh/id_rsa`. Vamos a ver qué contiene.

!**Pasted image 20260320173259.png**

Una clave privada, ahora sólo nos queda conocer el nombre de usuario que puede usarla. Investigando, volví al directorio `/`, que sale una página de configuración. Pero si vamos al código fuente de dicha página vemos esto:

!**Pasted image 20260320174305.png**

Parece que tenemos un nombre, `jessie`. 

-------------------------------------
<h2>Explotación</h2>
Vamos a probar. Ponemos la clave en un archivo y le damos los permisos correspondientes.

!**Pasted image 20260320174503.png**

Buscamos la flag.

!**Pasted image 20260320174851.png**

-------------------------------------
<h2>Escalada de Privilegios</h2>
Ahora tenemos que encontrar la fórmula para escalar los privilegios hasta root.

!**Pasted image 20260320174953.png**

Vemos unos cuantos grupos, esto puede ser interesante, volveré aquí si ninguna otra técnica funciona.

!**Pasted image 20260320175038.png**

Parece que hemos encontrado un comando utilizable con sudo sin contraseña: `wget`. Vamos a mirar en GTFOBins.

!**Pasted image 20260320175147.png**

Pero no funciona.

!**Pasted image 20260320180048.png**

Parece que en esta versión esa opción no está disponible. Vamos a buscar en GitHub. Buscando encontramos este [repo](https://github.com/ifeelkiddo/Sudo-Wget-Privilege-Escalation). Vamos a hacer lo que dice.

1. Obtenemos el contenido de `/etc/shadow`.

Para esto nos ponemos en escucha en la máquina atacante:

!**Pasted image 20260320180435.png**

En la máquina víctima pasamos el contenido del archivo a la máquina del atacante:

!**Pasted image 20260320180958.png**

Así obtenemos el contenido de `/etc/shadow`.

!**Pasted image 20260320181048.png**

2. Creamos un nuevo archivo `/etc/shadow`.

Pegamos el contenido que hemos obtenido.

!**Pasted image 20260320181234.png**

3. Creamos una nueva contraseña para el usuario `root` y lo añadimos al archivo.

Utilizamos el comando `openssl`.

!**Pasted image 20260320181316.png**

Copiamos el hash generado después de `root:` en el `shadow.txt` que hemos hecho.

>[!CAUTION] Deja lo que hay después de los segundos dos puntos, déjalo así: `root:NUEVO_HASH:18195:0:99999:7:::`.

4. Transferimos el contenido al otro archivo shadow.

Abrimos un servidor de python.

!**Pasted image 20260320181450.png**

Desde la máquina víctima usamos `wget` con sudo para sustituir el archivo.

!**Pasted image 20260320181550.png**

5. Cambiamos a `root`.

!**Pasted image 20260320181826.png**

Una vez conseguido cambiar de cuenta, sólo buscamos la flag de root y ya está.

!**Pasted image 20260320181917.png**

-------------------------------
<h2>Conclusión</h2>
Una máquina bastante facilita. Hemos aprendido a no rendirnos después de que una técnica no funcione. Si un método no termina de funcionar pero hay indicios de que es por ese camino siempre hay que seguir intentándolo. 

>[!SUCCESS] Hemos conseguido obtener las dos flags.

