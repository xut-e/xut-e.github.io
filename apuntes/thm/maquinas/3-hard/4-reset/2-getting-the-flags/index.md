---
layout: apunte
title: "2. Getting the Flags"
---

<h2>Reconocimiento Inicial</h2>
Comenzamos escaneando los puertos abiertos.

!**Pasted image 20260929131107.png**

Ahora analizamos dichos puertos.

!**Pasted image 20260929135627.png**

Añadimos el dominio y el DC al `/etc/hosts`. Vamos a ver qué hay en SMB.

!**Pasted image 20260929131141.png**

-----------------------------
<h2>Profundización</h2>
Vamos a ver qué hay en la compartición `Data`.

!**Pasted image 20260929131210.png**

Nos descargamos los archivos. Parece que hay un script detrás que se ejecuta cada 5 segundos o así y que los hace cambiar de nombre:

!**Pasted image 20260929131318.png**

Pero fijándonos en los tamaños podemos saber cuál hemos descargado y cual nos falta. Vamos a ver qué tipo de archivos son.

!**Pasted image 20260929141453.png**

Ahora los abrimos.

- `2frcxplb.kbe.pdf`:
  !**Pasted image 20260929141700.png**
  
  No parece interesante después de mirarlo entero.
- `5fuivvkq.2lb.pdf`:
  !**Pasted image 20260929142046.png**
  
  No parece interesante después de revisarlo.
- `gskyampw.0gw.txt`:
  !**Pasted image 20260929142224.png**
  
  Hemos encontrado una contraseña. Nos queda averiguar un nombre de usuario.

Vamos a usar `kerbrute` para listar posibles usuarios.

!**Pasted image 20260929181517.png**

Mientras se hace el escaneo de `kerbrute` vamos a listar usuarios SMB mediante `crackmapexec`.

!**Pasted image 20260929144623.png**

Cogemos todos los usuarios de una lista y de otras y los escribimos en un archivo sin duplicados. Ahora usamos `kerbrute` para realizar un password spray attack.

!**Pasted image 20260929151529.png**

No hay nada, vamos a mirar en SMB:

!**Pasted image 20260929152529.png**

Parece que un usuario no reseteo su contraseña, vamos a intentar entrar. No se puede. 

------------------------------
<h2>Explotación</h2>
Llegados a este punto hay que valorar otras opciones. Recordamos que hay algún servicio que está cambiando el nombre de los archivos constantemente en SMB. Podemos deducir que el usuario que lo hace es `AUTOMATE`. Vamos a soltar un archivo en SMB que fuerce al usuario a autentificarse a nuestro servidor. Usaremos [ntlm_theft](https://github.com/Greenwolf/ntlm_theft) para crear un archivo `.url` malicioso.

!**Pasted image 20260929154024.png**

Ahora vamos a configurar `responder`:

!**Pasted image 20260929154307.png**

Y por último subimos el archivo a SMB:

!**Pasted image 20260929154505.png**

Ahora vamos al `responder`:

!**Pasted image 20260929154537.png**

Vamos a intentar crackearlo.

!**Pasted image 20260929154917.png**

Con esta contraseña iniciamos sesión:

!**Pasted image 20260929155018.png**

Ahora buscamos la flag.

!**Pasted image 20260929155101.png**

---------------------------
<h2>Movimiento Lateral</h2>
Vamos a recopilar información del dominio con `bloodhound-python`.

!**Pasted image 20260929163135.png**

Ahora configuramos `bloodhound` e ingestamos la información obtenida. Vamos a investigar un poco. 

!**Pasted image 20260929163613.png**

No parece nada interesante respecto a `AUTOMATE`. Vamos a ver si en el sistema existe algo que nos permita escalar.

!**Pasted image 20260929163804.png**

Hay un usuario llamado `CECILE_WONG`. Vamos a investigar sobre este usuario en BloodHound.

!**Pasted image 20260929164020.png**

Este usuario parece mucho más interesante. Sin embargo no encontramos nada en el sistema. Vamos a echar la vista atrás y a buscar usuarios que no requieran preautentificación para Kerberos.

!**Pasted image 20260929164732.png**

Tenemos tres usuarios:

- `ERNESTO_SILVA`
- `TABATHA_BRITT`
- `LEANN_LONG`

Vamos a realizar pruebas.

!**Pasted image 20260929165514.png**

El único hash que hemos podido crackear es el de `TABATHA_BRITT`. Con esta cuenta en posesión vamos a ver si podemos llegar a ser `Administrator`.

--------------------------
<h2>Escalada de Privilegios</h2>
Vamos a investigar sobre este usuario en BloodHound.

!**Pasted image 20260929170320.png**

Parece que podemos llegar a `ADMINISTRATOR` desde `TABATHA_BRITT`.

Vamos a seguir los pasos que nos da BloodHound.

!**Pasted image 20260929170456.png**

Vamos a cambiar la contraseña de `SHWNA_BRAY`.

!**Pasted image 20260929170849.png**

Ahora vamos a ver cómo explotar el siguiente paso.

!**Pasted image 20260929170928.png**

Cambiamos la contraseña de `CRUZ_HALL`.

!**Pasted image 20260929171102.png**

Ahora vamos al siguiente paso de la explotación.

!**Pasted image 20260929171141.png**

Vamos a cambiar la contraseña de `DARLA_WINTERS`.

!**Pasted image 20260929171250.png**

Vamos con el siguiente paso.

!**Pasted image 20260929171316.png**

Seguimos las instrucciones pero no funciona. Después de rebuscar un rato encontramos el comando que obtiene el TGT. Lo hacemos con `getST.py`.

!**Pasted image 20260929174110.png**

>[!CAUTION] Leer lo siguiente atentamente:

Parece que lo primero que hay que hacer es obtener el TGT de DARLA. Cosa que ya había hecho al meter el comando que me decía Bloodhound.

```bash
getTGT.py THM.CORP/DARLA_WINTERS:'newP@ssword2022'
```

Luego usar el comando con `-k` que hace que se utilice un TGT  sin contraseña.

Otra opción visto en el write-up de [jaxafed](https://jaxafed.github.io/posts/tryhackme-reset/) es usar el comando:

```bash
getST.py -spn "cifs/haystack.thm.corp" -impersonate "Administrator" "thm.corp/DARLA_WINTERS:NewPassword123@"
```

>[!CAUTION] Fin.

Y ahora exportamos el TGT y lo usamos para iniciar sesión como `ADMINISTRATOR`:

!**Pasted image 20260929174315.png**

Vamos a buscar la flag.

!**Pasted image 20260929174413.png**

>[!SUCCESS] Hemos conseguido ambas flags!

