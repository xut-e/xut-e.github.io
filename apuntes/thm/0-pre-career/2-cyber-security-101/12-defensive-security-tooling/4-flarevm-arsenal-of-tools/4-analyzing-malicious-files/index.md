---
layout: apunte
title: "4. Analyzing Malicious Files!"
---

En esta tarea nos mancharemos las manos. Vamos a ello.

Usando las herramientas de nuestra máquina FLARE, analizaremos diferentes ejecutables, los ejecutaremos y veremos qué hacen en una máquina.

Un archivo malicioso **windows.exe** fue descargado por un usuario el 24/09/2024 a las 3:43 PM. Esta descarga fue etiquetada como una amenaza potencial. El equipo de monitorización te ha enviado un email pidiéndote realizar un análisis de él. Te han mandado el archivo que ahora está en: `C:\Users\Administrator\Desktop\Sample`.

!**Pasted image 20251030121219.png**

En nuestro acercamiento inicial a la investigación, realizaremos un análisis estático para obtener información inicial del binario.

-----------------------------
<h2>Análisis usando PEStudio</h2>
Empecemos con PEStudio. Abre el archivo con esta herramienta, ¿Qué información podemos usar aquí?

!**Pasted image 20251030122444.png**

Para los hashes generados en MD5 `9FDD4767DE5AEC8E577C1916ECC3E1D6` y SHA-1 `A1BC55A7931BFCD24651357829C460FD3DC4828F`, se recomienda compararlos en bases de datos como [VirusTotal](https://www.virustotal.com/gui/). Si no hay coincidencias es probable de que se trate de una nueva campaña de malware.

Aunque el archivo dice estar conectado al Editor de Registros de Windows (REGEDIT), que podemos ver basada en la descripción, es probablemente un truco para jugársela a la gente y evadir la detección.

Herramientas legítimas de REGEDIT se suelen encontrar en `C:\Windows\System32` más que en la carpeta de descargas.

¿Qué más?

!**Pasted image 20251030123024.png**

Редактор реестра" - "Registry Editor", "Операционная система Microsoft® Windows®"), en los metadatos del archivo es bastante sospechoso. Más que nada porque ni el usuario ni la organización opera en un entorno de habla rusa.

La ausencia de un **rich header** indica que el archivo es potencialmente empaquetado u ofuscado para evitar detección en herramientas de análisis estático. Este es un comportamiento típico de malware sofisticado que intenta evadir la detección alterando secciones críticas del archivo PE.

La pestaña funciones lista las llamadas a APIs que el archivo ha importado. Esto también se conoce como IAT (Import Address Table). Haciendo click en la pestaña de lista negra, PEStudio reorganizará la pestaña moviendo todas aquellas en la lista negra arriba.

!**Pasted image 20251030123525.png**

Aquí algunas funciones importantes que vimos:

- `set_UseShellExecute`: Esta función permite al proceso usar la shell del sistema operativo para ejecutar otros procesos. Se suele ver en malware que crea nuevos procesos para llevar a cabo las acciones maliciosas.
- `CryptoStream, RijndaelManage, CipherMode, CreateDecryptor`: Estas APIs indican que los ejecutables usan funciones criptográficas, especialmente Rijndael (encriptación AES). El malware puede usar encriptación criptográfica para comunicaciones y archivos o incluso para implementar funcionalidades del malware.

-------------------------------
<h2>Análisis usando FLOSS</h2>
Abre PowerShell y ve al directorio donde está nuestro archivo, que es `C:\Users\Administrator\Desktop\Sample`. Ejecuta el comando `FLOSS.exe .\windows.exe > windows.txt`. Esto ejecutará la herramienta FLOSS y guardará el resultado de la ejecución en `windows.txt`.

```powershell
PS C:\Users\Administrator\Desktop\Sample > FLOSS.exe .\windows.exe > windows.txt
WARNING: floss: .NET language-specific string extraction is not supported yet
WARNING: floss: FLOSS does NOT attempt to deobfuscate any strings from .NET binaries
INFO: floss: disabled string deobfuscation
INFO: floss: extracting static strings
INFO: floss: finished execution after 0.34 seconds
INFO: floss: rendering results
```

Abre el archivo y ve a la parte de abajo del resultado:

!**Pasted image 20251030124700.png**

¿Te resultan familiares? Son las funciones que vimos antes usando la herramienta PEStudio.

------------------------------
<h2>Análisis con Process Explorer y Process Monitor</h2>
En este ejemplo, analizaremos la conexión de red del archivo **cobaltstrike.exe** localizado en `C:\Users\Administrator\Desktop\Sample`.

Trataremos de saber si el archivo está realizando alguna conexión de red a algún posible servidor C2. Ejecuta el archivo **cobaltstrike.exe** y abre **Process Explorer** en el escritorio o desde la barra de tareas.

!**Pasted image 20251030125121.png**

El ID del proceso (PID) es 4756. Date cuenta de que el PID puede ser diferente en tu máquina. Haz click en el proceso, selecciona **Propiedades** y ve a la pestaña **TCP/IP**. Deberíamos ser capaces de determinar el destino al que se conecta y el estado que manda.

!**Pasted image 20251030125248.png**

Ahí lo tenemos. En otra nota, cuando hacemos el análisis debemos verificarlo con precisión. Así no dependeremos sólo de una herramienta. Para el proceso y vuelve a ejecutarlo. Esta vez usaremos **Procmon**.

Cuando abrimos procmon, buscar el binario es un reto ya que este lista todos los pocesos activos. Lo que vamos a hacer es filtrarlo. Puedes darle al icono de abajo o hacer **CRTL + L**.

!**Pasted image 20251030125458.png**

Usar este filtro involucra varios pasos:

1. Seleccionar **Process Name**.
2. Seleccionar **Contains**.
3. Escribir cualquier palabra relacionada con el proceso. En este caso **cobalt**.
4. Click en **include**.
5. Click en **Add** y luego en **Apply**.
6. Deberíamos ver las condiciones añadidas.
   !**Pasted image 20251030125703.png**

Esto debería darnos un resultado más detallado.

!**Pasted image 20251030125734.png**

Esto nos confirma que el binario estaba en efecto realizando una conexión a una IP desconocida que es `47.120.46.210`.

