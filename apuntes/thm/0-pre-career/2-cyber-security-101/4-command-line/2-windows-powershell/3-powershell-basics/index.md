---
layout: apunte
title: "3. PowerShell Basics"
---

<h2>Ejecutando PowerShell</h2>
PowerShell se puede ejecutar de diferentes maneras.

- Menú de inicio: Escribe `powershell` y haz click en `Windows PowerShell` o `PowerShell`.
- Run Dialog: Presiona `Win + R` para abrir el run dialog, escribe `powershell` y dale a `Enter`.
- Explorador de archivos: Escribe `powershell`en la barra de direcciones. Esto abre PowerShell específicamente en ese directorio.
- Gestor de tareas: Abre el task manager, ve a `File -> Run new task`, escribe `powershell` y presiona `Enter`.

También puedes ejecutarlo desde la cmd escribiendo `powershell`.

------------------
<h2>Sintaxis Básica: Verbo-Nombre</h2>
Como ya hemos hablado, los comandos de la PowerShell se llaman `cmdlets` (`command-lets`). Son mucho más poderosos que los comandos de Windows tradicionales.

Estos siguen una norma de nomenclatura consistente `verbo-nombre`. Esto hace fácil entender lo que hace cada uno. el verbo describe la acción y el nombre especifica el objeto sobre el que se aplica la acción. Por ejemplo:

- `Get-Content`: Devuelve el contenido de un archivo.
- `Set-Location`: Cambia el directorio actual de trabajo.

-----------------
<h2>Cmdlets Básicos</h2>
Para ver la mayoría de los cmdlets que podemos usar, hay un comando: `Get-Command`.

Para cada objeto `CommandInfo` devuelto por el cmdlet, algunas propiedades se muestran en pantalla. Es posible filtrar, por ejemplo, si queremos ver sólo los cmdlets de tipo función:
`Get-Command -CommandType "Function"`.

Otro cmdlet importante de saber es: `Get-Help`. Devuelve información detallada sobre cmdlets: `Get-Help Get-Date`. Si añadimos `-examples` nos devolverá una lista de ejemplos comunes.

Para hacer más sencillo el cambio para profesionales de IT hacia PowerShell, este cuenta con una lista de aliases, que son comandos que llevan hacia otros cmdlets, por ejemplo `cat -> Get-Content`. Si escribimos cat en la terminal, tendrá el mismo efecto que escribir Get-Content, que es el cmdlet correcto para la acción que normalmente suele hacer cat. `Get-Alias` lista todos los aliases disponibles.

---------------
<h2>Dónde Encontrar y Descargar cmdlets</h2>
Otra poderosa función de PowerShell es la posibilidad de extender sus funcionalidades descargando cmdlets adicionales de repositorios online.

>[!NOTE] Los cmdlets que veremos ahora requieren conexión a Internet. Como la máquina a la que nos hemos conectado no tiene acceso a Internet, no podremos usarlos.

Para buscar módulos podemos usar `Find-Module`. A veces, si no sabemos el nombre exacto nos podemos ayudar de `*`, por ejemplo para encontrarlo con mayor facilidad.

```powershell
PS C:\Users\captain> Find-Module -Name "PowerShell*"

Version    Name                                Repository           Description 
-------    ----                                ----------           ----------- 
0.4.7      powershell-yaml                     PSGallery            Powershell module for serializing and deserializing YAML

2.2.5      PowerShellGet                       PSGallery            PowerShell module with commands for discovering, installing, updating and publishing the PowerShell artifacts like Modules, DSC Resources, Role Capabilities and Scripts.                                                   
1.0.80.0   PowerShell.Module.InvokeWinGet      PSGallery            Module to Invoke WinGet and parse the output in PSOjects

0.17.0     PowerShellForGitHub                 PSGallery
```

Una vez identificado, el módulo puede ser instalado con `Install-Module`.