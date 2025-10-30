---
layout: apunte
title: "3. Commonly Used Tools for Investigation - Overview"
---

Examinemos las herramientas en las que nos enfocaremos en esta unidad.Estas son las básicas usadas en investigaciones iniciales:

| **Herramienta**  | **Valor Investigativo**                                                                                                                   |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Procmon          | Una herramienta útil para rastrear la actividad del sistema, especialmente en lo concerniente al malware.                                 |
| Process Explorer | Te permite ver el proceso de la relación padre-hijo, DLLs cargados y su ruta.                                                             |
| HxD              | Los archivos maliciosos pueden ser examinados o alterados vía ecidión hexadecimal.                                                        |
| Wireshark        | Observar e invesstigar el tráfico de red buscando actividad inusual.                                                                      |
| CFF Explorer     | Puede generar hashes de archivos para verificación de integridad, autentificar la fuente de los archivos de sistema y validar su validez. |
| PEStudio         | Análisis estático o estudiarpropiedades de un archivo ejecutable sin ejecutarlo.                                                          |
| FLOSS            | Extrae y desofusca todas las strings de un programa de malware usando técnicas avanzadas de análisis estático.                            |

------------------------------------
<h2>Process Monitor (Procmon)</h2>
Una poderosa herramienta diseñada para ayudarte a grabar problemas con las apps de tu sistema. Te deja ver, grabar y llevar control del sistema y la actividad de archivos de Windows en tiempo real. Es útil en cuanto a rastrear la actividad del sistema, especialmente en lo relacionado a la investigación de malware, resolución de problemas e investigaciones forenses.

Así se utiliza de manera eficiente para la investigación:

![](/apuntes/img/Pasted image 20251030102159.png)

De acuerdo con esta entrada de logs, el Servicio del Autoridad de Seguridad Local del Subsistema (LSASS), con proceso lsass.exe ha leído un archivo exitosamente. LSASS maneja autentificación y se comunica frecuentemente con los archivos cruciales del sistema como lsasrv.dll (Local Security Authority Server Service).

Aunque es un archivo estándar del sistema, LSASS puede ser objetivo de dumpeo de credenciales. Mimikatz y otras herramientas suelen intentar acceder a la memoria de LSASS. Deberías fijarte en actividad adicional.

------------------------
<h2>Process Explorer (Procexp)</h2>
Ofrece vistas profundas de los procesos activos corriendo en tu ordenador. Te permite ahondar en los trabajos internos de tu sistema, ofreciendo una lista de los procesos activos y sus cuentas de usuario relacionadas. Si alguna vez has sentido curiosidad sobre qué programa está accediendo a un archivo o directorio específico, Process Explorer nos ofrece esa información.

![](/apuntes/img/Pasted image 20251030104256.png)

Como puedes ver por la imagen de arriba, CFF Explorer está abierto. Usando **Process Explorer (procexp)**, localizado en el escritorio, podemos identificar el proceso y su padre. Esto es útil cuando queremos monitorizar qué otros procesos están siendo creados como documentos Word, LNK (archivos link, o redirecciones) o ISO, ya que los actores maliciosos suelen abusarlos.

---------------------------------
<h2>HxD</h2>
Es un editor hexadecimal rápido y ligero que sirvepara editar archivos, memoria y drives de cualquier capacidad. Puede ser aplicado a la investigación forense, recuperación de información, depuración y manipulación exacta de información binaria. Algunas funcionalidades importantes son la vista del archivo y sus contenidos de memoria, edición, búsqueda y comparación de información hexadecimal. Veamos cómo funciona la herramienta.

![](/apuntes/img/Pasted image 20251030110216.png)

Esta captura del editor hexadecimal HxD muestra el archivo binario **posible_medusa.txt**. La información hexadecimal en la izquierda indica el contenido del archivo en hexadecimal y la interpretación ASCII aparece a la derecha. Interesantemente, el archivo empieza con **4D 5A (Little Endian)**, indicando que es ejecutable.

El inspector de información, a la derecha, nos permite examinar bytes individuales mostrando sus valores en varios tipos de información (int, float, etc.), facilitando la evalucación de dicha información.

--------------------------------
<h2>CFF Explorer</h2>
Con la ayuda de la información de archivo que brinda CFF Explorer, los investigadores pueden generar hashes de archivos para verificar su integridad, autentificar la fuente del sistema de archivos y validar su validez. Esto es importante saberlo al analizar malware ya que el código malicioso puede esconderse en archivos de sistema alterados.

![](/apuntes/img/Pasted image 20251030111047.png)

Los detalles del archivo **cryptominer.bin** se muestran en el ejemplo. El 23 de Septiembre de 2024, se generó un archivo PE de 64 bits. La información del archivo puede ser verificada con hashes (SHA-1 y MD5), Durante las investigaciones, esta herramienta ayuda en la confirmación de la información del archivo y localizando posible problemas.

--------------------------------
<h2>Wireshark</h2>
Concerniente al análisis de tráfico de red, Wireshark es una herramienta poderosa que los investigadores pueden usar para cazar conexiones sospechosas, examinar protocolos y encontrar posibles asaltos o exfiltración de información. En este caso TLSv1.2 sugiere una conexión segura y encriptada que puede enmascarar actividad dañina.

![](/apuntes/img/Pasted image 20251030111613.png)

Muestra paquetes capturados con detalles sobre protocolo, fuente, destinación y otra información. La mayoría de los paquetes muestran que TLSv1.2 y TCP se usan para transmisiones encriptadas. La información raw de los paquetes se muestra en ASCII y hexadecimal, con un bloque significativo encriptado usando TLSv1.2.

---------------------------------
<h2>PEStudio</h2>
Análisis estático, o estudiar propiedades de archivos ejecutables sin correr los archivos se hace con PEStudio. Esta funcionalidad es beneficiosa en varias situaciones. PEStudio ofrece una variedad de información sobre el archivo sin poner a los usuarios en peligro. PEStudio ofrece una variedad de información sobre un archivo sin poner a los usuarios en riesgo por la ejecución, lo que ayuda en identificar ejecutables que parecen o son sospechosos de ser dañinos.

![](/apuntes/img/Pasted image 20251030112822.png)

Este ejemplo muestra la examinación de un archivo ejecutable, como PSexec.exe, usando PEStudio 9.22, una herramienta de análisis estático. Este archivo tiene un propósito doble, legítimo por administradores de sistema pero potencialmente explotado por hackers buscando acceso remoto.

La entropía del archivo de **6.596** sugiere la posibilidad remota de empaquetado o encriptación, que es típico de software peligroso.La versión **2.34** de esta consola basada en 32 bits, permite que el programa se ejecute remotamente, una funcionalidad frecuentemente usada para migrar lateralmente durante los ataques. El archivo se ensambla usando Visual C++ 8.

--------------------------------
<h2>FLOSS</h2>
Usando técnicas avanzadas de análisis estático, el Solucionador de Strings Ofuscadas de FLARE (FLOSS) extrae utomáticamente y desofusca todas las strings de los programas de malware. Como strings.exe, puede mejorar el análisis estático básico de binarios desconocidos. FLOSS también incluye más scripts de Python en el directorio de scripts, lo que puede ser usado para cargar el output del script en otros programas.

```powershell
PS C:\Users\Administrator\Desktop\Sample > floss .\cobaltstrike.exe
INFO: floss: extracting static strings
finding decoding function features: 100%|█████████████████████████████████████████████| 74/74 [00:00<00:00, 2370.15 functions/s, skipped 0 library functions]
INFO: floss.stackstrings: extracting stackstrings from 50 functions
extracting stackstrings: 100%|██████████████████████████████████████████████████████████████████████████████████████| 50/50 [00:00<00:00, 128.00 functions/s]
INFO: floss.tightstrings: extracting tightstrings from 4 functions...
extracting tightstrings from function 0x402e80: 100%|██████████████████████████████████████████████████████████████████| 4/4 [00:00<00:00, 31.99 functions/s]
INFO: floss.string_decoder: decoding strings
emulating function 0x402e80 (call 1/1): 100%|████████████████████████████████████████████████████████████████████████| 21/21 [00:09<00:00,  2.21 functions/s]
INFO: floss: finished execution after 265.61 seconds
INFO: floss: rendering results 


FLARE FLOSS RESULTS (version v3.1.0-0-gdb9af41)

+------------------------+------------------------------------------------------+
| file path              | cobaltstrike.exe                                     |
| identified language    | unknown                                              |
| extracted strings      |                                                      |
|  static strings        | 189 (2050 characters)                                |
|   language strings     |   0 (   0 characters)                                |
|  stack strings         | 0                                                    |
|  tight strings         | 0                                                    |
|  decoded strings       | 0                                                    |
+------------------------+------------------------------------------------------+


 ────────────────────────────
  FLOSS STATIC STRINGS (189)
 ────────────────────────────

+-----------------------------------+
| FLOSS STATIC STRINGS: ASCII (188) |
+-----------------------------------+

!This program cannot be run in DOS mode.
.text
P`.data
.rdata
P@.pdata
0@.xdata
0@.bss
.idata
.CRT
.tls
ffffff.
ATUWVSH

[...]

strncmp
vfprintf
KERNEL32.dll
msvcrt.dll


+------------------------------------+
| FLOSS STATIC STRINGS: UTF-16LE (1) |
+------------------------------------+

msvcrt.dll


 ─────────────────────────
  FLOSS STACK STRINGS (0)
 ─────────────────────────



 ─────────────────────────
  FLOSS TIGHT STRINGS (0)
 ─────────────────────────



 ───────────────────────────
  FLOSS DECODED STRINGS (0)
 ───────────────────────────
```

En este ejemplo, FLOSS extrajo 189 strings estáticas del binario que pueden contener información hardcodeada como rutas, URLs, direcciones IP, llamadas a APIs, mensajes de error, registros, claves de encriptación y configuración de información. Sin embargo no fueron identificadas ninguna string descodificada.