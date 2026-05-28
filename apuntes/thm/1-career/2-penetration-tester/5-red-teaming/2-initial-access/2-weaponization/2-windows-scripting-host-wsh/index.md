---
layout: apunte
title: "2. Windows Scripting Host - WSH"
---

Windows Scripting Host es una herramienta de administración incrustada en Windows que ejecuta archivos batch para automatizar y gestionar tareas en el sistema operativo.

Es un motor nativo de Windows, `cscript.exe` (para scripts de línea de comandos) y `wscript.exe` (para scripts UI), que son responsables de ejecutar varios Microsoft Visual Basic Scripts (VBScript), incluyendo `vbs` y `vbe`. Para más información sobre VBScript, visita esta [página](https://en.wikipedia.org/wiki/VBScript). Es importante darse cuenta de que el motor VBScript en un sistema operativo Windows ejecuta aplicaciones con el mismo nivel de acceso y permiso que un usuario normal, por lo que es útil para los red teamers.

Ahora vamos a escribir un código VBScript para crear una caja de mensaje en Windows que muestre "Welcome to THM". Asegúrate de guardar el código en un archivo, por ejemplo `hello.vbs`.

```vbscript
Dim message 
message = "Welcome to THM"
MsgBox message
```

En la primera línea declaramos la variable `message` usando `Dim`. Luego guardamos el valor string de `Welcome to THM` en la variable `message`. En la siguiente línea usamos la función `MsgBox` para mostrar el contenido de la variable. Luego, usamos `wscript` para ejecutar el contenido de `hello.vbs`. Como resultado, se abre un mensaje en Windows.

!**Pasted image 20260527123109.png**

Ahora usaremos el VBScript para ejecutar archivos. El siguiente código `vbs` es para abrir la calculadora de Windows, prueba de que podemos ejecutar archivos `.exe` usando el motor nativo de Windows (WSH).

```vbscript
Set shell = WScript.CreateObject("Wscript.Shell")
shell.Run("C:\Windows\System32\calc.exe " & WScript.ScriptFullName),0,True
```

Creamos un objeto de la librería `WScript` usando `CreateObject` para llamar al payload. Luego utilizamos el método `Run` para ejecutar el payload. Para esta tarea, ejecutaremos la calculadora de Windows, `calc.exe`.

Para ejecutar el archivo `vbs`, podemos ejecutar `wscript` como a continuación:

```powershell
c:\Windows\System32>wscript c:\Users\thm\Desktop\payload.vbs
```

También se puede hacer mediante `cscript`:

```powershell
c:\Windows\System32>cscript.exe c:\Users\thm\Desktop\payload.vbs`
```

Como resultado, la calculadora de Windows aparecerá en el escritorio.

!**Pasted image 20260527123655.png**

Otro truco. Si los archivos VBS están en lista negra, podemos renombrarlos a `.txt` y luego ejecutarlos con `wscript` de la siguiente forma:

```powershell
c:\Windows\System32>wscript /e:VBScript c:\Users\thm\Desktop\payload.txt
```

El resultado será el mismo.

!**Pasted image 20260527123809.png**

