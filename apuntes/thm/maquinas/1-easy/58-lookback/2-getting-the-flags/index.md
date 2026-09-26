---
layout: apunte
title: "2. Getting the Flags"
---

<h2>Reconocimiento Inicial</h2>
Comenzamos escaneando puertos abiertos.

!**Pasted image 20260925102517.png**

Ahora analizamos dichos puertos más en profundidad.

!**Pasted image 20260925105031.png**

Vamos a incluir el dominio en `/etc/hosts`.

Vamos a ver los directorios de la web. En `dirsearch` no hemos encontrado nada interesante ni para HTTP ni para HTTPS. Subdominios tampoco hemos encontrado para ninguno de los dos, así que usaremos `gobuster` para buscar archivos que puedan haber quedado por ahí:

!**Pasted image 20260925104136.png**

Vamos a ver cómo se ven las webs.

- `80`:
  !**Pasted image 20260925104211.png**
- `443`:
  !**Pasted image 20260925104228.png**

--------------------------
<h2>Profundización</h2>
Vamos a investigar los únicos directorios que encontramos. Primero `/test`.

!**Pasted image 20260925104324.png**

Sin embargo si vamos a `/test` en HTTPS vemos lo siguiente:

!**Pasted image 20260925105308.png**

Y ahora `/ecp`:

!**Pasted image 20260925104345.png**

Vamos a ver qué es esto.

!**Pasted image 20260925104426.png**

Con `nikto` podemos encontrar un par de credenciales válido.

!**Pasted image 20260925105827.png**

Ahora vamos a entrar a `/test`:

!**Pasted image 20260925105901.png**

Si le damos a `Run` obtenemos lo siguiente:

!**Pasted image 20260925110224.png**

-------------------------------------
<h2>Explotación</h2>
Vamos a intentar poner un comando.

!**Pasted image 20260925110253.png**

El comando siendo utilizado es:

```powershell
Get-Content ('INPUT')
```

Vamos a intentar inyectar comandos.

!**Pasted image 20260925110431.png**

Parece que hemos conseguido ejecutar un comando. Vamos a intentar conseguir una shell. Para ello vamos a [RevShells](https://www.revshells.com/):

!**Pasted image 20260925110653.png**

Comenzamos un listener e inyectamos el comando.

!**Pasted image 20260925110624.png**

Vamos a buscar la flag.

!**Pasted image 20260925111629.png**

---------------------------------------
<h2>Escalada de Privilegios</h2>
Ahora vamos a mirar la lista `TODO.txt`.

!**Pasted image 20260925111941.png**

De aquí sacamos que aparentemente MS Exchange está desactualizado. Vamos a buscar la versión.

!**Pasted image 20260925112111.png**

Vamos a usar el comando.

!**Pasted image 20260925112202.png**

Vamos a comprobar si es vulnerable.

!**Pasted image 20260925112509.png**

Parece que sí. Vamos a buscar un exploit.

!**Pasted image 20260925113236.png**

Después de mirar las opciones requeridas de unos cuantos, el `8` es el que más se ajusta a nuestro caso.

!**Pasted image 20260925114502.png**

>[!DANGER] ¡¡¡CUIDADO!!! No es `infrastructure` sino `infrastracture`, con `a` no con `u`.

Explotamos.

!**Pasted image 20260925114620.png**
!**Pasted image 20260925114639.png**

Buscamos la flag.

!**Pasted image 20260925114432.png**

>[!SUCCESS] Hemos obtenido las tres flags.

