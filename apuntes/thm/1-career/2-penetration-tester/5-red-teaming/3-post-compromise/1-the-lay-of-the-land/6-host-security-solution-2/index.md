---
layout: apunte
title: "6. Host Security Solution 2"
---

<h2>Registro y Monitorización de Eventos de Seguridad</h2>
Por defecto, los sistemas operativos registran varios eventos de actividad usando los archivos de registro. El registro de eventos es una funcionalidad disponible a los sistemas IT y administradoores de red para monitorizar y analizar eventos importantes, ya sean en el host on en la red. En las redes cooperativas, los equipos de seguridad utilizan técnicas de registro de eventos para rastrear e investigar los incidentes de seguridad.

Hay varias categorías donde el sistema operativo de Windows registra eventos y su información, incluyendo la aplicación, sistema, seguridad, servicios, etc. Además, los dispositivos de seguridad y red guardan la información de eventos en archivos de registro para permitir a los administradores de sistema obtener una vista general de lo que está pasando.

Podemos obtener una lista de registros de eventos usando el cmdlet `Get-EventLog`.

```powershell
PS C:\Users\thm> Get-EventLog -List

  Max(K) Retain OverflowAction        Entries Log
  ------ ------ --------------        ------- ---
     512      7 OverwriteOlder             59 Active Directory Web Services
  20,480      0 OverwriteAsNeeded         512 Application
     512      0 OverwriteAsNeeded         170 Directory Service
 102,400      0 OverwriteAsNeeded          67 DNS Server
  20,480      0 OverwriteAsNeeded       4,345 System
  15,360      0 OverwriteAsNeeded       1,692 Windows PowerShell
```

A veces, la lista de registro de eventos disponible te da una vista de qué aplicaciones y servicios están instalados en la máquina.

------------------------------------
<h2>System Monitor (Sysmon)</h2>
El monitor de sistema de Windows, `sysmon`, es un servicio y  driver. Es una de las suites de Microsoft de Sysinternals. La herramienta `sysmon` no es una herramienta esencial (no instalada por defecto), pero comienza a recopilar y registrar eventos una vez instalada. Estos registros pueden ayudar enormemente al administrador del sistema y a los blue teamers a rastrear e investigar actividad maliciosa.

Una de las funcionalidades buenas que tiene `sysmon` es que puede registrar muchos eventos importantes y también puedes crear tus propias reglas y configuración para monitorizar:

- Creación y eliminación de procesos.
- Conexiones de red.
- Modificaciones a un archivo.
- Amenazas remotas.
- Acceso a procesos y memoria.
- Y muchos más...

Para aprender más sobre `sysmon`, visita esta [página](https://docs.microsoft.com/en-us/sysinternals/downloads/sysmon).

Como red teamer, uno de los objetivos primarios es mantenerse indetectado, por lo que es esencial estar al corriente de estas herramientas e intentar no causar o generar alertas. Los siguientes son algunos de los trucos que pueden ser usados para detectar si `sysmon` está disponible en la máquina o no:

1. Podemos buscar un proceso o servicio llamado "Sysmon":

```powershell
PS C:\Users\thm> Get-Process | Where-Object { $_.ProcessName -eq "Sysmon" }

Handles  NPM(K)    PM(K)      WS(K)     CPU(s)     Id  SI ProcessName
-------  ------    -----      -----     ------     --  -- -----------
    373      15    20212      31716              3316   0 Sysmon
```

2. O buscar servicios de la siguiente manera:

```powershell
PS C:\Users\thm> Get-CimInstance win32_service -Filter "Description = 'System Monitor service'"
# or
Get-Service | where-object {$_.DisplayName -like "*sysm*"}
```

3. También podemos comprobar el registro de Windows:

```powershell
PS C:\Users\thm> reg query HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\WINEVT\Channels\Microsoft-Windows-Sysmon/Operational
```

Todos estoos comandos confirman si `sysmon` está o no instalado. Si lo está, podemos tratar de encontrar el archivo de configuración de `sysmon` si tenemos permisos de lectura para ver qué está monitorizando el administrador.

```powershell
PS C:\Users\thm> findstr /si '<ProcessCreate onmatch="exclude">' C:\tools\*
C:\tools\Sysmon\sysmonconfig.xml:      
C:\tools\Sysmon\sysmonconfig.xml:      
```

-----------------------------------
<h2>Sistemas de Detección/Prevención de Intrusión Basados en Hosts (HIDS/HIPS)</h2>
**HIDS** es Host-Based Intrusion Detection System. Es un software que tiene la habilidad de monitorizar y detectar actividades anormales y maliciosas en el host. El propósito principal del HIDS es detectar actividad sospechosa, no prevenirlas. Hay dos métodos que usan este tipo de sistemas:

- **IDS basado en Firmas:** Comprueba el checksum y mensaje de autentificación.
- **IDS basado en Anomalías:** Busca actividades no esperadas, como uso inesperado de ancho de banda, protocolos o puertos.

**HIPS** es Host-Based Intrusion Prevention System. Securizan las actividades del sistema operativo del dispositivo en el que se instalan. Es una solución de detección y prevención contra ataques conocidos. Los HIPS pueden auditar los archivos de registro, monitorizar procesos y proteger los recursos del sistema. HIPS combina muchas funcionalidades de productos como antivirus, análisis de comportamiento, red, aplicación, firewall, etc.

También existe un IDS/IPS basado en red.

---------------------------------------
<h2>Endpoint Detection and Response (EDR)</h2>
!**Pasted image 20260620181239.png**

También es conocido como Endpoint Detection and Threat Response (EDTR). El EDR es una solución de ciberseguridad que defiende contra malware y otras amenazas. Los EDRs pueden buscar archivos maliciosos, monitoorizar endpoints, sistemas y eventos de red y registrarlos en un base de datos para posterior análisis, detección e investigación. Los EDRs son la próxima generación de antivirus y detectan actividades maliciosas en tiempo real en el host.

Los EDR analizan la información y comportamiento del sistema incluyendo:

- Malware como virus, troyanos, adware, keyloggers...
- Cadenas de exploit
- Ransomware

Algunos de los EDRs más comunes para endpoints son:

- Cylance
- Crowdstrike
- Symantec
- SentinelOne
- Y muchos más...

Incluso si un atacante consiguiera exitosamente su payload y bypasseara el EDR para recibir una reverse shell, el EDR seguiría corriendo y monitorizando el sistema. Podría bloquearnos de hacer nada más si se disparase una alerta.

Podemos usar scripts para enumerar productos de seguridad en la máquina, como [Invoke-EDRChecker](https://github.com/PwnDexter/Invoke-EDRChecker) y [SharpEDRChecker](https://github.com/PwnDexter/SharpEDRChecker).

