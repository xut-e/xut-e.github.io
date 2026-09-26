---
layout: apunte
title: "2. Getting the Flags"
---

Ya estás dentro. La brecha ya se produjo, ahora es hora de seguir adelante. Navega a través de un AD comprometido, muévete lateralmente a través del dominio, y escala tus privilegios para tomar control completo. La pregunta no es cómo entraste, sino cómo de lejos puedes llegar.

!**Pasted image 20260925193810.png**

---------------------------------------
<h2>Reconocimiento Inicial</h2>
Comenzamos escaneando los puertos abiertos.

!**Pasted image 20260925194325.png**

Ahora analizamos dichos puertos en profundidad.

!**Pasted image 20260925194403.png**

Y los puertos UDP.

!**Pasted image 20260925194704.png**

Vamos a añadir el DC a `/etc/hosts` (`DC01.ctf.local`). 

----------------------------------
<h2>Profundización</h2>
Vamos a recopilar información del dominio con `bloodhound-python`:

!**Pasted image 20260925195132.png**

Y ahora configuramos `bloodhound` con:

```bash
curl -L https://ghst.ly/getbhce | sudo docker compose -f - up
```

Tomamos la contraseña por defecto y la ingresamos junto al usuario `admin` en `http://localhost:8080/ui/login`. Ahora ingestamos la información recopilada por `bloodhound-python` y esperamos.

!**Pasted image 20260925195538.png**

Mientras esperamos a que se ingeste, vamos a ir abriendo una consola con `evil-winrm`.

!**Pasted image 20260925200350.png**

Parece que `j.smith` no tiene permisos de acceso remoto. Vamos a probar con RDP:

!**Pasted image 20260925200618.png**

Vamos a ver si ya se ha ingestado la información en Bloodhound.

!**Pasted image 20260925200728.png**

Nada muy interesante a priori. Vamos a seguir investigando.

!**Pasted image 20260925200837.png**

No parece haber ningún camino claro por aquí. Es muy probable que debamos movernos lateralmente explotando alguna vulnerabilidad del sistema en lugar del AD. Como no hemos encontrado nada por aquí vamos a mirar a ver qué hay en SMB.

!**Pasted image 20260925202011.png**

No hay nada interesante. 

--------------------------------
<h2>Movimiento Lateral</h2>
Vamos a mirar el sistema de ficheros.

!**Pasted image 20260925202832.png**

Parece un archivo interesante. Buscamos `KeePass` en el sistema y abrimos la base de datos.

!**Pasted image 20260925203040.png**

Simplemente le damos a `Ok` y se nos abre la base de datos.

!**Pasted image 20260926000248.png**

Vamos a extraer la contraseña, simplemente copiando y pegando.

!**Pasted image 20260926000328.png**

Vamos a investigar sobre este usuario en Bloodhound.

!**Pasted image 20260926000452.png**

A primera vista no se ve nada muy jugoso, vamos a seguir investigando. Pero dentro del sistema. También conviene tener en cuenta de que se habla de un portal de ayuda IT en la base de datos.

!**Pasted image 20260926001250.png**

Vamos a ver de qué se trata esto. No es nada. En el sistema no hemos podido encontrar nada. Volvemos atrás. Vamos a probar a ver si alguna de las dos contraseñas que tenemos ha sido utilizada con otro usuario. Primero creamos una lista de usuarios que tenemos.

!**Pasted image 20260926002642.png**

Ahora con `kerbrute` probamos las 2 contraseñas que tenemos.

!**Pasted image 20260926002853.png**

Parece que `r.williams` y `t.jones` usan la misma contraseña. Vamos a investigar acerca de este nuevo usuario.

!**Pasted image 20260926003012.png**

A priori se ve más interesante que los otros dos. Pero ya si nos metemos en `Outbound Object Control`, se ve que en efecto lo es.

!**Pasted image 20260926003231.png**

-------------------------------
<h2>Escalada de Privilegios</h2>
Vamos a ver si hay alguna manera de explotarlo. Además, si miramos formas de llegar a `ADMINISTRATOR`, podemos ver que existen:

!**Pasted image 20260926003430.png**

Pero por ahora vamos a centrarnos en ir del paso 1 al 2. Bloodhound nos da pasos detallados de cómo hacerlo.

!**Pasted image 20260926003543.png**

Vamos allá.

!**Pasted image 20260926003905.png**

Podemos ver que LDAPS da error, por lo que cambiamos al otro método disponible (sólo hay dos). Vamos con el segundo paso.

!**Pasted image 20260926004136.png**

Paso dos completado, vamos a por el siguiente.

!**Pasted image 20260926004343.png**

Ahora vamos a  guardar el ticket en la variable de entorno correspondiente y ejecutamos el PtT.

!**Pasted image 20260926004609.png**

Ahora buscamos la flag.

!**Pasted image 20260926004656.png**

>[!SUCCESS] Hemos conseguido llegar hasta la cuenta de administrador y obtener la flag!!


