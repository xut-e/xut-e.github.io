---
layout: apunte
title: "4. Windows Enumeration"
---

En esta tarea tendremos acceso a la `cmd` en un host Windows. Puede que hayas ganado acceso explotando una vulnerabilidad y consiguiendo una shell o reverse shell. Puede que hayas instalado una backdoor o un servidor SSH. En cualquier caso, los comandos que veremos requieren de `cmd` para funcionar.

---------------------------------
<h2>Sistema</h2>
Un comando que puede darnos información detallada sobre el sistema, como su número de construcción y parches instalados, sería `systeminfo`. En el ejemplo de abajo podemos ver qué parches han sido instalados:

```batch
C:\>systeminfo

Host Name:                 WIN-SERVER-CLI
OS Name:                   Microsoft Windows Server 2022 Standard
OS Version:                10.0.20348 N/A Build 20348
OS Manufacturer:           Microsoft Corporation
[...]
Hotfix(s):                 3 Hotfix(s) Installed.
                           [01]: KB5013630
                           [02]: KB5013944
                           [03]: KB5012673
Network Card(s):           1 NIC(s) Installed.
                           [01]: Intel(R) 82574L Gigabit Network Connection
[...]
```

Puedes comprobar las actualizaciones instaladas usando `wmic qfe get Caption,Description`. Esta información te dará una idea de cómo de rápido se están parcheando los sistemas.

```batch
C:\>wmic qfe get Caption,Description
Caption                                     Description      
http://support.microsoft.com/?kbid=5013630  Update
https://support.microsoft.com/help/5013944  Security Update
                                            Update
```

Puedes comprobar los servicios instalados e iniciados de Windows usando `net start`. Espera una lista larga.

```batch
C:\>net start
These Windows services are started:

   Base Filtering Engine
   Certificate Propagation
   Client License Service (ClipSVC)
   COM+ Event System
   Connected User Experiences and Telemetry
   CoreMessaging
   Cryptographic Services
   DCOM Server Process Launcher
   DHCP Client
   DNS Client
[...]
   Windows Time
   Windows Update
   WinHTTP Web Proxy Auto-Discovery Service
   Workstation

The command completed successfully.
```

Si sólo estás interesado en apps instaladas, puedes ejecutar `wmic product get name,version,vendor`. 

```batch
C:\>wmic product get name,version,vendor
Name                                                            Vendor                                   Version
Microsoft Visual C++ 2019 X64 Minimum Runtime - 14.28.29910     Microsoft Corporation                    14.28.29910
[...]
Microsoft Visual C++ 2019 X64 Additional Runtime - 14.28.29910  Microsoft Corporation                    14.28.29910
```

----------------------------------------------
<h2>Usuarios</h2>
Para saber quién eres, ejecuta `whoami`. Además, para saber de qué eres capaz (tus privilegios), puedes usar `whoami /priv`.

```batch
C:\>whoami
win-server-cli\strategos

> whoami /priv

PRIVILEGES INFORMATION
----------------------

Privilege Name                            Description                                                        State
========================================= ================================================================== =======
SeIncreaseQuotaPrivilege                  Adjust memory quotas for a process                                 Enabled
SeSecurityPrivilege                       Manage auditing and security log                                   Enabled
SeTakeOwnershipPrivilege                  Take ownership of files or other objects                           Enabled
[...]
```

Además, puedes usar `whoami /groups` para saber a qué grupos perteneces. El output de la terminal muestra que este usaurio pertenece a `NT AUTHORITY\Local account and member of Administrators group`:

```batch
C:\>whoami /groups

GROUP INFORMATION
-----------------

Group Name                                                    Type             SID          Attributes
============================================================= ================ ============ ===============================================================
Everyone                                                      Well-known group S-1-1-0      Mandatory group, Enabled by default, Enabled group
NT AUTHORITY\Local account and member of Administrators group Well-known group S-1-5-114    Mandatory group, Enabled by default, Enabled group
BUILTIN\Administrators                                        Alias            S-1-5-32-544 Mandatory group, Enabled by default, Enabled group, Group owner
[...]
```

Puedes ver usuarios ejecutando `net user`:

```batch
C:\>net user

User accounts for \\WIN-SERVER-CLI

-------------------------------------------------------------------------------
Administrator            DefaultAccount           Guest
michael                  peter                    strategos
WDAGUtilityAccount
The command completed successfully.
```

Puedes descubrir grupos disponibles usando `net group` si el sistema es un Domain Controller o `net localgroup` si no.

```batch
C:\>net localgroup

Aliases for \\WIN-SERVER-CLI

-------------------------------------------------------------------------------
*Access Control Assistance Operators
*Administrators
*Backup Operators
*Certificate Service DCOM Access
*Cryptographic Operators
*Device Owners
[...]
```

Puedes listar los usuarios que pertenecen al grupo de administradores locales usando el comando `net localgroup administrators`.

```batch
C:\>net localgroup administrators
Alias name     administrators
Comment        Administrators have complete and unrestricted access to the computer/domain

Members

-------------------------------------------------------------------------------
Administrator
michael
peter
strategos
The command completed successfully.
```

Usa `net accounts` para ver los ajustes locales en la máquina. Además, puedes usar `net accounts /domain` si la máquina pertenece al dominio. Este comando ayuda a entender la política de contraseñas, como longitud mínima, máxima edad de la contraseña, etc.

-----------------------------------------------
<h2>Redes</h2>
Puedes usar el comando `ipconfig` para ver la configuración de red de tu sistema. Si quieres saber todo lo relacionado con los ajustes de red, puedes usar `ipconfig /all`. El output de la terminal muestra el resultado.

```batch
C:\>ipconfig

Windows IP Configuration


Ethernet adapter Ethernet0:

   Connection-specific DNS Suffix  . : localdomain
   Link-local IPv6 Address . . . . . : fe80::3dc5:78ef:1274:a740%5
   IPv4 Address. . . . . . . . . . . : 10.20.30.130
   Subnet Mask . . . . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . . . . : 10.20.30.2
```

En MS indows, podemos usar `netstat` para obtener varia información. Como qué puertos tiene el sistema en escucha, qué conexiones están activas y quién las está utilizando. En este ejecmplo, usamos las opciones `-a` para mostrar todos los puertos en escucha y conexiones activas. El parámetro `-b` nos permite encontrar el binario involucrado en la conexión, mientras que `-n` es usado para evitar resolver drecciones IP y números de puerto. Por último, `-o` muestra el PID.

El el output parcial mostrado abajo, podemos ver que `netstat -abno` muestra que el servidor está escuchando en los puertos TCP `22`, `135`, `445` y `3389`. Los procesos `sshd.exe`, `RpcSs` y `TermService` están en los puertos `22`, `135` y `3389`. Además podemos ver dos conexiones establecidas al servidor SSH como se indica por el estado `ESTABLISHED`.

```batch
C:\>netstat -abno

Active Connections

  Proto  Local Address          Foreign Address        State           PID
  TCP    0.0.0.0:22             0.0.0.0:0              LISTENING       2016
 [sshd.exe]
  TCP    0.0.0.0:135            0.0.0.0:0              LISTENING       924
  RpcSs
 [svchost.exe]
  TCP    0.0.0.0:445            0.0.0.0:0              LISTENING       4
 Can not obtain ownership information
  TCP    0.0.0.0:3389           0.0.0.0:0              LISTENING       416
  TermService
 [svchost.exe]
[...]
  TCP    10.20.30.130:22        10.20.30.1:39956       ESTABLISHED     2016
 [sshd.exe]
  TCP    10.20.30.130:22        10.20.30.1:39964       ESTABLISHED     2016
 [sshd.exe]
[...]
```

Puede que pienses que puedes obtener un resultado idéntico escaneando los puertos del sistema. Sin embargo, es  impreciso poor dos razones. Un firewall podría bloquear el host escaneador de llegar a puertos específicos. Además, el escaneo de puertos genera un montón de ruido, al contrario que `netstat`.

Finalmente, merece la pena tener en cuenta que usar `arp -a` te ayuda a descubrir otros sistemas en la misma LAN que recientemente se hayan comunicado con tu sistema. ARP quiere decir Address Resolution Protocol, por lo que `arp -a` muestra las entradas actuales, las direcciones físicas de los sistemas en la misma LAN. Un ejemplo se muestra abajo. Esto indica que esas direcciones IP se han comunicado de alguna manera con tu sistema. Esta comunicación puede ser un intento, una conexión o incluso un simple `ping`.

```batch
C:\>arp -a

Interface: 10.10.204.175 --- 0x4 
  Internet Address      Physical Address      Type
  10.10.0.1             02-c8-85-b5-5a-aa     dynamic
  10.10.16.117          02-f2-42-76-fc-ef     dynamic
  10.10.122.196         02-48-58-7b-92-e5     dynamic
  10.10.146.13          02-36-c1-4d-05-f9     dynamic
  10.10.161.4           02-a8-58-98-1a-d3     dynamic
  10.10.217.222         02-68-10-dd-be-8d     dynamic
  10.10.255.255         ff-ff-ff-ff-ff-ff     static
```

