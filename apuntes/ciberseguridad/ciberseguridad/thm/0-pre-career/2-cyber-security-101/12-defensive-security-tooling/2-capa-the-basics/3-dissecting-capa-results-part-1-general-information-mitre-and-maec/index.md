---
layout: apunte
title: "3. Dissecting CAPA Results Part 1 - General Information, MITRE and MAEC"
---

Como hemos mencionado en la tarea anterior, los resultados de ejecutar CAPA contra cryptbot.bin serán discutidos. Vamos a diseccionar los resultados por bloque y tópico.

El primer bloque contiene información de dominio básica sobre el archivo. Esto incluye lo siguiente:

- Los algoritmos criptográficos, como `md5` y `sha1/256`.
- El campo `analysis` nos dice cómo realizó CAPA el análisis del archivo.
- El campo `os` revela el sistema operativo para el que aplican las capacidades detectadas.
- El campo `arch` nos permite determinar si estamos lidiando con un binario relacionado a arquitectura x86.
- El campo `path` donde estaba localizado el archivo analizado.

```powershell
┌─────────────┬─────────────────────────────────────────────────────────────────┐
│ md5         │ 3b9d26d2e7433749f2c32edb13a2b0a2                                │
│ sha1        │ 969437df8f4ad08542ce8fc9831fc49a7765b7c5                        │
│ sha256      │ ae7bc6b6f6ecb206a7b957e4bb86e0d11845c5b2d9f7a00a482bef63b567ce4c│
│ analysis    │ static                                                          │
│ os          │ windows                                                         │
│ format      │ pe                                                              │
│ arch        │ i386                                                            │
│ path        │ /home/strategos/Room-CAPA/cryptbot.bin                          │
└─────────────┴─────────────────────────────────────────────────────────────────┘
```

-------------------------------
<h2>MITRE ATT&CK</h2>
El framework MITRE ATT&CK (Adversarial Tactics, Techniques, and Common Knowledge) es un repositorio de conocimiento global que meticulosamente documenta las tácticas y técnicas empleadas por los actores de amenazas en cada fase de un ciberataque. Funciona como un playbook estratégico, ofreciendo vistas detalladas en los métodos de los atacantes, desde ganar acceso inicial hasta mantener presencia (persistencia), escalar privilegios, evadir defensas, mover lateralmente en la red y un largo etcétera.

CAPA usa este formato para su output. Algunos resultados pueden no contener el identificador de técnica o subtécnica.

| Formato                                                                                                                    | Ejemplo                                                                                  | Explicación                                                                                                                                                                                                                                |
| -------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **ATT&CK Tactic**::**ATT&CK Technique**::**Technique Identifier**                                                          | Defense Evasion::Obfuscated Files or Information::T1027                                  | **DEFENSE EVASION =** ATT&CK Tactic  <br>**Obfuscated Files or Information =** ATT&CK Technique  <br>**T1027 =** Technique Identifier                                                                                                      |
| **ATT&CK Tactic**::**ATT&CK Technique**::**ATT&CK Sub-Technique**::**Technique Identifier**[.]Sub-technique **Identifier** | Defense Evasion::Obfuscated Files or Information::Indicator Removal from Tools T1027.005 | **DEFENSE EVASION** = ATT&CK Tactic  <br>**Obfuscated Files or Information** = ATT&CK Technique  <br>**Indicator Removal from Tools** = ATT&CK Sub-Technique  <br>**T1027 =** Technique Identifier  <br>**005** = Sub-Technique Identifier |

```powershell
┌──────────────────────┬────────────────────────────────────────────────────────┐
│ ATT&CK Tactic        │ ATT&CK Technique                                       │
├──────────────────────┼────────────────────────────────────────────────────────┤
│ DEFENSE EVASION      │ Obfuscated Files or Information [T1027]                │
│                      │ Obfuscated Files or Information::Indicator Removal from Tools [T1027.005]│
│                      │ Virtualization/Sandbox Evasion::System Checks [T1497.001]│
│ DISCOVERY            │ File and Directory Discovery [T1083]                   │
│ EXECUTION            │ Command and Scripting Interpreter::PowerShell [T1059.001]│
│                      │ Shared Modules [T1129]                                 │
│ IMPACT               │ Resource Hijacking [T1496]                             │
│ PERSISTENCE          │ Scheduled Task/Job::At [T1053.002]                     │
│                      │ Scheduled Task/Job::Scheduled Task [T1053.005]         │
└──────────────────────┴────────────────────────────────────────────────────────┘
```

En el output final de CAPA, referencian el framework MITRE. Esto ayuda a los analistas o defensores a mapear el comportamiento del archivo con el playbook del adversario, lo que puede ayudar acotar el alcance de la investigación durante un incidente. 

---------------------------------
<h2>MAEC</h2>
MAEC (Malware Attribute Enumeration and Characterization) es un lenguaje especializado diseñado para encodear y comunicar detalles complejos respecto a malware. Contiene un rango extenso de atributos, incluyendo comportamientos, artefactos e interconexiones entre varias instancias de malware. Este lenguaje funciona como un sistema estandarizado para trackear y analizar las complejidades del malware.

```powershell
┌─────────────────────────────┬─────────────────────────────────────────────────┐
│ MAEC Category               │ MAEC Value                                      │
├─────────────────────────────┼─────────────────────────────────────────────────┤
│ malware-category            │ launcher                                        │
└─────────────────────────────┴─────────────────────────────────────────────────┘
```

Comprobemos la tabla debajo para ver los valores MAEC más usados por CAPA: Downloader y Launcher.

| **MAEC Value** | Description                                                                                                    |
| -------------- | -------------------------------------------------------------------------------------------------------------- |
| Launcher       | Exhibe comportamientos que disparan acciones específicas similares al comportamiento del malware.              |
| Downloader     | Exhibe comportamientos en los que descarga y ejecuta otros archivos, usualmente visto en malware más complejo. |
Cuando CAPA etiqueta un archivo con el valor MAEC "**launcher**", indica que el archivo muestra comportamiento similar (pero no limitado) a:

- Ejecutar payloads adicionales
- Activar mecanismos de persistencia
- Conectarse a servidores C2 (Command & Control)
- Ejecutar funciones específicas

Algunos de estos comportamientos también están presentes en el catálogo de comportamiento de malware (MBC) y el bloque de capabilities, que veremos más adelante.

Cuando CAPA etiqueta un archivo con el valor MAEC "**downloader**", indica que el archivo muestra comportamiento similar (pero no limitado) a:

- Descargar payloads adicionales o recursos de internet
- Descargar actualizaciones
- Ejecutar payloads secundarios
- Ejecutar etapas secundarias
- Recoger archivos de configuración

