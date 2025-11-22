---
layout: apunte
title: "8. Scripting"
---

El scripting es el proceso de escribir y ejecutar una serie de comandos en un archivo de texto, conocido como script, para automatizar tareas que un usuario realizaría en una CLI.

De manera simple, scriptear es como darle a un ordenador una lista de tareas (to-do list). Cada una de las lineas del script representa un comando.

Dependiendo de tu equipo los scripts pueden servir para múltiples cosas:

- Blue team: Puede automatizar tareas como escaneo de logs, detección de anomalías o extracción de indicadores de compromiso.
- Red team: Puede automatizar tareas como la enumeración, ejecución remota de comandos y la creación de scripts ofuscados para sobrepasar defensas.
- System administrators: Puede automatizar tareas como el manejo de configuraciones del sistema o securización de redes.

No podemos acabar esta unidad sin mencionar el cmdlet `Invoke-Command`. Es esencial para ejecutar comandos en sistemas remotos. Puede ser usado para ejecutar payloads o scripts en otros sistemas.

```powershell
PS C:\Users\captain> Get-Help Invoke-Command -examples

NAME
    Invoke-Command
    
SYNOPSIS
    Runs commands on local and remote computers.
    
    ------------- Example 1: Run a script on a server -------------
    
    Invoke-Command -FilePath c:\scripts\test.ps1 -ComputerName Server01
    
    The FilePath parameter specifies a script that is located on the local computer. The script runs on the remote computer and the results are returned to the local computer.

    --------- Example 2: Run a command on a remote server ---------

    Invoke-Command -ComputerName Server01 -Credential Domain01\User01 -ScriptBlock { Get-Culture }

    The ComputerName parameter specifies the name of the remote computer. The Credential parameter is used to run the command in the security context of Domain01\User01, a user who has permission to run commands. The ScriptBlock parameter specifies the command to be run on the remote computer.

    In response, PowerShell requests the password and an authentication method for the User01 account. It then runs the command on the Server01 computer and returns the result.
```

En el segundo ejemplo vemos que añadiendo `-ScriptBlock { ... }` no necesitamos saber scripting pues podemos ejecutar cualquier comando directamente.