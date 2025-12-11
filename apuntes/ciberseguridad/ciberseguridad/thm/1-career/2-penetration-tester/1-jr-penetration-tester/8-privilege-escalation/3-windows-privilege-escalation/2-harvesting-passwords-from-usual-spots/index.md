---
layout: apunte
title: "2. Harvesting Passwords from Usual Spots"
---

La manera más fácil de conseguir acceso a otro usuario es conseguir credenciales en una máquina comprometida. Aquí presentaremos algunos sitios donde buscar contraseñas en un sistema Windows.

------------------------------------
<h2>Unattended Windows Installations</h2>
Al instalar Windows en un gran número de hosts, los administradores pueden usar los Servicios de Despliegue de Windows, que permiten desplegar una sola imagen de SO a varios hosts a través de la red. Este tipo de instalaciones se llaman "unattended installations" ya que no requieren interacción del usuario. Requieren el uso de una cuenta administradora para realizar la configuración inicial, que puede acabar siendo guardada en alguna de las siguientes localizaciones:

- `C:\Unattend.xml`
- `C:\Windows\Panther\Unattend.xml`
- `C:\Windows\Panther\Unattend\Unattend.xml`
- `C:\Windows\system32\sysprep.inf`
- `C:\Windows\system32\sysprep\sysprep.xml`

Como parte de estos archivos puedes encontrar credenciales.

```xml
<Credentials>
    <Username>Administrator</Username>
    <Domain>thm.local</Domain>
    <Password>MyPassword123</Password>
</Credentials>
```

---------------------------------------
<h2>Powershell History</h2>
Cuando un usuario ejecuta un comando usando Powershell, se almacena en un archivo que tiene una memoria de comandos pasados. Es útil para repetir comandos que hayas usado antes rápidamente. Si un usuario ejecuta un comando que contiene una contraseña como parte directamente, puede ser recuperado después usando el siguiente comando desde `cmd.exe`.

`type %userprofile%\AppData\Roaming\Microsoft\Windows\PowerShell\PSReadline\ConsoleHost_history.txt`

>[!CAUTION] Este comando sólo funciona desde `cmd.exe`.

----------------------------------------
<h2>Saved Windows Credentials</h2>
Windows nos permite usar las credenciales de otro usuario. Esta función también nos da la opción de guardar estas credenciales en el sistema. El siguiente comando lista las credenciales guardadas.

`cmdkey /list`

Aunque no puedes ver las contraseñas en sí, si ves que hay credenciales que merece la pena probar puedes hacerlo con el comando `runas` de la siguiente manera:

`runas /savecred /user:admin cmd.exe`

-------------------------------------
<h2>IIS Configuration</h2>
Internet Information Services (Servicios de Información de Internet) es el servidor web por defecto de las instalaciones Windows. La configuración de los sitios web en IIS se almacena en un archivo llamado `web.config` y puede guardar contraseñas para bases de datos o mecanismos de autentificación configurados. Dependiendo de la versión instalada de IIS, podemos encontrar `web.config` en alguno de los siguientes ficheros:

- `C:\inetpub\wwwroot\web.config`
- `C:\Windows\Microsoft.NET\Framework64\v4.0.30319\Config\web.config`

Aquí tienes un modo rápido de encontrar strings de conexiones a bases de datos en el archivo:

`type C:\Windows\Microsoft.NET\Framework64\v4.0.30319\Config\web.config | findstr connectionString`

---------------------------------------
<h2>Retrieve Credentials from Software: PuTTY</h2>
PuTTY es un cliente SSH comúnmente encontrado en sistemas Windows. En vez de tener que especificar parámetros de conexión cada vez, los usuarios pueden guardar sesiones donde la IP, usuario y otras configuraciones pueden guardarse para más adelante. Aunque PuTTY no permite a los usuarios guardar la contraseña SSH, guarda configuraciones proxy que pueden incluir credenciales de autentificación en texto plano.

Para recuperar las credenciales proxy guardadas, puedes buscar bajo la siguiente clave de registro por la ProxyPassword con el siguiente comando:

`reg query HKEY_CURRENT_USER\Software\SimonTatham\PuTTY\Sessions\ /f "Proxy" /s`

>[!NOTE] Simon Tatham es el creador de PuTTY y su nombre forma parte del path, no es un nombre de usuario.

Al igual que PuTTY, cualquier software que almacene contraseñas, incluyendo navegadores, clientes de email o de FTP o SSH, tendrá métodos para recuperar las contraseñas guardadas.

>[!TIP] Para entrar en una máquina Windows con `xfreerdp3` utiliza el siguiente comando: `xfreerdp3 /dynamic-resolution +clipboard /cert:ignore /v:10.82.139.185 /u:<usuario> /p:'<contraseña>'`

