---
layout: apunte
title: "7. More Information, more fun!"
---

En esta tarea trataremos de determinar la razón del disparo de las reglas y condiciones involucradas. Usaremos el parámetro `-vv` (very verbose) para conseguir esto.

| Opción                | Descripción          | Sintaxis de Ejemplo           |
| --------------------- | -------------------- | ----------------------------- |
| `-v` or `--verbose`   | Habilita verbose     | `capa.exe -v .\cryptbot.bin`  |
| `-vv` or `--vverbose` | Habilita muy verbose | `capa.exe -vv .\cryptbot.bin` |

¡Ejecutémoslo!

```powershell
PS C:\Users\Administrator\Desktop\capa> capa -vv .\cryptbot.bin
loading : 100%|████████████████████| 485/485 [00:00<00:00, 1108.84     rules/s]
/ analyzing program...
```

Esto nos dará resultados más detallados, sin embargo, llevará mucho tiempo. Como ya está hecho, miraremos el ejemplo:

```powershell
PS C:\Users\Administrator\Desktop\capa> Get-Content .\cryptbot_vv.txt
```

Acceder a esta información desde consola o un editor de texto puede ser abrumador debido a la cantidad de texto en su interior.

Para analizar su contenido con facilidad, necesitamos hacer dos cosas. La primera es usar los parámetros `-j` y `-vv` y redirigir el resultado a un archivo `.json`. El comando quedaría así: `capa.bin -j -vv .\cryptbot.bin > cryptbot_vv.json`.

```powershell
PS C:\Users\Administrator\Desktop\capa> capa.bin -j -vv .\cryptbot.bin > cryptbot_vv.json
loading : 100%|████████████████████| 485/485 [00:00<00:00, 1108.84     rules/s]
/ analyzing program...
```

Con esto podemos empezar el siguiente paso.

--------------------------
<h2>Explorador Web CAPA</h2>
Lo segundo que tenemos que hacer es subir el archivo al **CAPA Web Explorer**. Podemos o usar la versión online en este [enlace](https://mandiant.github.io/capa/explorer/#/) o usar la versión offline en nuestra máquina virtual.

Ahora deberíamos ver la página de **Home**.

!**Pasted image 20251028151115.png**

Buscaremos el botón "**Upload from local**" en la esquina inferior izquierda y selecciona el archivo `.json` que hemos preparado. Una vez subido deberías ver un output similar a este:

!**Pasted image 20251028151321.png**

Ahora es momento de explorar esta adición a la herramienta. Revisaremos algunas capabilities y comprobaremos qué parte de las reglas exactamente fue un match.

Veamos el primer ejemplo debajo. Sabemos que la capability fue **reference anti-VM strings targeting VMWare** y que el archivo de configuración de regla correspondiente fue **anti-vm-strings-targeting-vmware.yml**.

!**Pasted image 20251028151705.png**

Veamos el contenido de la regla:

```PowerShell
rule:
  meta:
    name: reference anti-VM strings targeting VMWare
    namespace: anti-analysis/anti-vm/vm-detection
    authors:
      - michael.hunhoff@mandiant.com
      - "@johnk3r"
    scopes:
      static: file
      dynamic: file
    att&ck:
      - Defense Evasion::Virtualization/Sandbox Evasion::System Checks [T1497.001]
    mbc:
      - Anti-Behavioral Analysis::Virtual Machine Detection [B0009]
    references:
      - https://github.com/LordNoteworthy/al-khaser/blob/master/al-khaser/AntiVM/VMWare.cpp
    examples:
      - al-khaser_x86.exe_
      - b83480162ede09d4aa6d4850f9faa0a4c3834152752fd04cfdb22d647aa1f825:0x17D80
  features:
    - or:
      - string: /VMWare/i
      - string: /VMTools/i
      - string: /SOFTWARE\\VMware, Inc\.\\VMware Tools/i
      - string: /VMWare/i
      - string: /VMTools/i
      - string: /SOFTWARE\\VMware, Inc\.\\VMware Tools/i
      - string: /vmnet\.sys/i
      - string: /vmmouse\.sys/i
      - string: /vmusb\.sys/i
      - string: /vm3dmp\.sys/i
      - string: /vmci\.sys/i
      - string: /vmhgfs\.sys/i
      - string: /vmmemctl\.sys/i
      - string: /vmx86\.sys/i
      - string: /vmrawdsk\.sys/i
      - string: /vmusbmouse\.sys/i
      - string: /vmkdb\.sys/i
      - string: /vmnetuserif\.sys/i
      - string: /vmnetadapter\.sys/i
      - string: /\\\\.\\HGFS/i
      - string: /\\\\.\\vmci/i
      - string: /vmtoolsd\.exe/i
      - string: /vmwaretray\.exe/i
      - string: /vmwareuser\.exe/i
      - string: /VGAuthService\.exe/i
      - string: /vmacthlp\.exe/i
      - string: /vmci/i
        description: VMWare VMCI Bus Driver
      - string: /vmhgfs/i
        description: VMWare Host Guest Control Redirector
      - string: /vmmouse/i
      - string: /vmmemctl/i
        description: VMWare Guest Memory Controller Driver
      - string: /vmusb/i
      - string: /vmusbmouse/i
      - string: /vmx_svga/i
      - string: /vmxnet/i
      - string: /vmx86/i
      - string: /VMwareVMware/i
      - string: /vmGuestLib\.dll/i
      - string: /vmGuestLib\.dll/i
      - string: /Applications\\VMwareHostOpen\.exe/i
      - string: /vm3dgl\.dll/i
      - string: /vmdum\.dll/i
      - string: /vm3dver\.dll/i
      - string: /vmtray\.dll/i
      - string: /VMToolsHook\.dll/i
      - string: /vmmousever\.dll/i
      - string: /VmGuestLibJava\.dll/i
      - string: /vmscsi\.sys/i
```

¿Lo viste? Bajo la funcionalidad "**string: /VMWare/i**" fue referenciado por CAPA Web Explorer. Simplemente CAPA diciendo que bajo ese namespace, pudimos identificar strings con el valor **VMWare** usando las condiciones en la regla y con regex.

Veamos otro ejemplo. Sabemos que la capability fue **scheduled tasks via schtasts**, y que el archivo de regla fue **scheduled-tasks-via-schtasks.yml**.

!**Pasted image 20251028152213.png**

Lo mismo aplica que a nuestro primer ejemplo, nos centraremos en las features ya que es lo que CAPA usa para detectar coincidencias:

```powershell
rule:
  meta:
    name: schedule task via schtasks
    namespace: persistence/scheduled-tasks
    authors:
      - 0x534a@mailbox.org
    scopes:
      static: function
      dynamic: thread
    att&ck:
      - Persistence::Scheduled Task/Job::Scheduled Task [T1053.005]
    examples:
      - 79cde1aa711e321b4939805d27e160be:0x401440
  features:
    - and:
      - match: host-interaction/process/create
      - or:
        - and:
          - string: /schtasks/i
          - string: /\/create /i
        - string: /Register-ScheduledTask /i
```

Bajo las funcionalidades "**string: /schtasks/i**" y "**string: /\/create/i**" fueron referenciadas en CAPA Web Explorer. Simplemente CAPA diciendo que bajo este namespace, y usando las condiciones en la regla y regex, pudo identificar strings con un valor de **schtasks** y **create**.

---------------------------
<h2>Caja de Búsqueda Global</h2>
Otra funcionalidad guay de esta herramienta es poder filtrar y la búsqueda global.

!**Pasted image 20251028152712.png**

Es mucho más rápido el análisis de esta información usando CAPA Web Explorer que cualquier editor de texto.