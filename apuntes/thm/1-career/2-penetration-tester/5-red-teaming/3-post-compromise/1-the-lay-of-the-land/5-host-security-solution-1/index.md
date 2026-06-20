---
layout: apunte
title: "5. Host Security Solution 1"
---

Ante de realizar más acciones, necesitamos obtener conocimiento general sobre las soluciones de seguridad primero. Recuerda que es importante enumerar métodos de detección de seguridad y antivirus en un endpoint para mantenerse indetectado y reducir la posibilidad de ser cazado.

---------------------------------------
<h2>Soluciones de Seguridad del Host</h2>
Es un conjunto de aplicaciones de software usadas para monitorizar y detectar actividad maliciosa y anormal en el host, incluyendo:

1. Software antivirus.
2. Microsoft Windows Defender.
3. Firewalls basados en hosts.
4. Monitorización y registro de eventos de seguridad.
5. Sistema de detección de intrusión basado en hosts (HIDS) / Sistema de prevención de intrusión basado en hosts (HIPS).
6. Detección y Respuesta en Endpoints (EDR).

Vamos a entrar en detalla con algunas de estas soluciones.

---------------------------------------
<h2>Software Antivirus (AV)</h2>
El software anti virus, también conocido como anti-malware, es principalmente usado para monitorizar, detetar y prevenir software malicioso de ser ejecutado. La mayoría de aplicaciones de software antivirus usan funcionalidades conocidas, incluyendo el escaneo de fondo, escaneos de sistema completo o definiciones de virus. En el escaneo de fondo, el AV trabaja en tiempo real y escanea todos los archivos abiertos y usados en el segundo plano. El escaneo de sistema completo es esencial al instalar el AV. La parte más interesante es la de definiciones del virus, donde el software antivirus responde a virus pre-definidoos, como una vacuna. Por esto, el AV necesita ser actualizado de cuando en cuando.

Hay varias técnicas de detección que los AVs usan, incluyendo:

- **Detección basada en firma:** Es una de las formas tradicionales para identificar archivos maliciosos. Normalmente, los investigadores o usuarios, suben sus archivos infectados al antivirus para posterior análisis y si se confirma que es malicioso, su firma queda registrada. Cuando los antivirus del resto de personas se actualizan, registran esta nueva firma, la que activa el protocolo si detecta una coincidencia.
- **Detección basada en heurística:** Usan machine learning para decidir si tienen un archivo malicioso o no. Escanea y analiza en tiempo real para encontrar propiedades sospechosas en el código de la aplicación o ver si usa APIs poco comunes. 
- **Detección basada en comportamiento:** Requiere de monitorización y examinación de las aplicaciones en ejecución para encontrar comportamientos inusuales, como crear/subir valores en claves de registro, matar/crear procesos, etc.

Como red teamer, es esencial tener en cuenta si estos AVs existen o no. Nos previene de hacer lo que tratamos de hacer. Podemos enumerar AVs usando herramientas de Windows como `wmic`.

```powershell
PS C:\Users\thm> wmic /namespace:\\root\securitycenter2 path antivirusproduct
```

Esto también puede ser hecho usando PowerShell, lo que da el mismo resultado:

```powershell
PS C:\Users\thm> Get-CimInstance -Namespace root/SecurityCenter2 -ClassName AntivirusProduct


displayName              : Bitdefender Antivirus
instanceGuid             : {BAF124F4-FA00-8560-3FDE-6C380446AEFB}
pathToSignedProductExe   : C:\Program Files\Bitdefender\Bitdefender Security\wscfix.exe
pathToSignedReportingExe : C:\Program Files\Bitdefender\Bitdefender Security\bdservicehost.exe
productState             : 266240
timestamp                : Wed, 15 Dec 2021 12:40:10 GMT
PSComputerName           :

displayName              : Windows Defender
instanceGuid             : {D58FFC3A-813B-4fae-9E44-DA132C9FAA36}
pathToSignedProductExe   : windowsdefender://
pathToSignedReportingExe : %ProgramFiles%\Windows Defender\MsMpeng.exe
productState             : 393472
timestamp                : Fri, 15 Oct 2021 22:32:01 GMT
PSComputerName           :
```

Como resultadoo, hay un antivirus de tercero (Bitdefender Antivirus) y Windows Defender instaladoos en el ordenador.

>[!NOTE] Ten en cuenta que puede que los servidores Windows puede que no tengan el namespace `SecurityCenter2`.

-------------------------------
<h2>Microsoft Windows Defender</h2>
Microsooft Windows Defender, es un antivirus preinstalado que corre en los endpoints. Usa varios algoritmos en la detección, incluyendo el machine learning., análisis big-data, investigación de resistencia de amenazas en profundidad e infraestructura nube de Microsoft en la protección contra malware. MS Defender funciona en tres modos de protección:

- **Activo:** Es usado cuando MS Defender se ejecuta como AV principal de la máquina y ofrece protección y remediación.
- **Pasivo:** Es cuando hay un AV de terceros instalado, por lo que funciona como AV secundario, analizando archivos y detectando amenazas, pero sin ofrecer remediación.
- **Desactivado:** Cuando MS Defender es desactivado o desinstalado del sistema.

Podemos comprobar el estado de MS Defender con el siguiente comando:

```powershell
PS C:\Users\thm> Get-Service WinDefend

Status   Name               DisplayName
------   ----               -----------
Running  WinDefend          Windows Defender Antivirus Service
```

Luego, podemos empezar a usar el cmdlet `Get-MpComputerStatus` para obtener el actual estado de MSD. Sin embargo, ofrece el estado actual de los elementos de la solución de seguridad, incluyendo anti-spyare, antivirus, LoavProtection, protección en tiempo real, etc. Podemos usar el comando `select` para especificar qué necesitamos:

```powershell
PS C:\Users\thm> Get-MpComputerStatus | select RealTimeProtectionEnabled

RealTimeProtectionEnabled
-------------------------
                    False
```

-------------------------------------
<h2>Firewall Basado en Host</h2>
Es una herramienta de seguridad instalado y ejecutada en una máquina host que puede prevenir y bloquear atacantes. Por ello, es esencial enumerarlo y recolectar todos los detalles sobre el firewall y sus reglas en la máquina a la que tenemos acceso.

El propóstito principal de esta solución es controlar el tráfico entrante y saliente que pasa por la interfaz del dispositivo. Protege el host de dispositivos no confiables que estás en la misma red. Un firewall basado en hosts moderno, usa múltiples niveles de análisis de tráfico, incluyendo análisis de paquetes mientras se establece la conexión.

Un firewall actúa como control de acceso a la capa de red. Es capaz de permitir y denegar paquetes de red. Los NGFWs también pueden inspeccionar otras capas OSI, como la de aplicación. Es por esto que pueden bloquear además intentos de SQLi u otro tipo de ataques.

```powershell
PS C:\Users\thm> Get-NetFirewallProfile | Format-Table Name, Enabled

Name    Enabled
----    -------
Domain     True
Private    True
Public     True
```

Si tenemos privilegios de administrador en el usuario actual, podemos tratar de deshabilitar uno o más perfiles de firewall usando `Set-NetFirewallProfile`.

```powershell
PS C:\Windows\system32> Set-NetFirewallProfile -Profile Domain, Public, Private -Enabled False
PS C:\Windows\system32> Get-NetFirewallProfile | Format-Table Name, Enabled
---- -------
Domain False
Private False
Public False
```

También podemos ver y comprobar las reglas actuales del firewall.

```powershell
PS C:\Users\thm> Get-NetFirewallRule | select DisplayName, Enabled, Description

DisplayName                                                                  Enabled
-----------                                                                  -------
Lab Machine Monitoring (DCOM-In)                                           False
Lab Machine Monitoring (Echo Request - ICMPv4-In)                          False
Lab Machine Monitoring (Echo Request - ICMPv6-In)                          False
Lab Machine Monitoring (NB-Session-In)                                     False
Lab Machine Monitoring (RPC)                                               False
SNMP Trap Service (UDP In)                                                     False
SNMP Trap Service (UDP In)                                                     False
Connected User Experiences and Telemetry                                        True
Delivery Optimization (TCP-In)                                                  True
```

Durante el engagement del red team, no sabemos qué es lo que bloquea el firewall. Sin embargo, podemos aprovecharnos de algunos cmdlets de powershell como `Test-NetConnection` y `TcpClient`. Asume que sabemos que hay un firewall, y que necesitamos comprobar conexiones internas sin herramientas extra. Podemos hacer lo siguiente:

```powershell
PS C:\Users\thm> Test-NetConnection -ComputerName 127.0.0.1 -Port 80


ComputerName     : 127.0.0.1
RemoteAddress    : 127.0.0.1
RemotePort       : 80
InterfaceAlias   : Loopback Pseudo-Interface 1
SourceAddress    : 127.0.0.1
TcpTestSucceeded : True

PS C:\Users\thm> (New-Object System.Net.Sockets.TcpClient("127.0.0.1", "80")).Connected
True
```

Como resultado, podemos confirmar que la conexión entrante por el puerto 80 está abierta y permitida por el firewall.

>[!TIP] También podemos probar en objetivos remotos en la misma red o dominio, especificando el argumento `-ComputerName` para el cmdlet `Test-NetConnection`.

