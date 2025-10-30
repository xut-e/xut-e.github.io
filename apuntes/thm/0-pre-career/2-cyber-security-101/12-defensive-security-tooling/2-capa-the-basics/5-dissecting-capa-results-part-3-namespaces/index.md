---
layout: apunte
title: "5. Dissecting CAPA Results Part 3 - Namespaces"
---

Dividiremos el tema en dos tópicos: Capacidad y Namespace. En esta tarea veremos el **Namespace**.

Debajo podemos ver el output de `capa.exe`:

```powershell
┌──────────────────────────────────────────┬────────────────────────────────────┐
│ Capability                               │ Namespace                          │
├──────────────────────────────────────────┼────────────────────────────────────┤
│ reference anti-VM strings                │ anti-analysis/anti-vm/vm-detection │
│ reference anti-VM strings targeting VMWar│ anti-analysis/anti-vm/vm-detection │
│ reference anti-VM strings targeting Virtu│ anti-analysis/anti-vm/vm-detection │
│ contain obfuscated stackstrings          │ anti-analysis/obfuscation/string/  │
| (2 matches)                              | stackstring                        |
│ reference HTTP User-Agent string         │ communication/http                 │
│ check HTTP status code                   │ communication/http/client          │
│ reference Base64 string                  │ data-manipulation/encoding/base64  │
│ encode data using XOR                    │ data-manipulation/encoding/xor     │
│ contain a thread local storage (.tls)    │ executable/pe/section/tls          │
| section                                  |                                    |
│ get common file path                     │ host-interaction/file-system       │
│ create directory                         │ host-interaction/file-system/create│
│ delete file                              │ host-interaction/file-system/delete│
│ read file on Windows (4 matches)         │ host-interaction/file-system/read  │
│ write file on Windows (5 matches)        │ host-interaction/file-system/write │
│ get thread local storage value           │ host-interaction/process           │
│ create process on Windows                │ host-interaction/process/create    │
│ allocate or change RWX memory            │ host-interaction/process/inject    │
│ reference cryptocurrency strings         │ impact/cryptocurrency              │
│ link function at runtime on Windows      │ linking/runtime-linking            │
| (5 matches)                              |                                    |
│ parse PE header (4 matches)              │ load-code/pe                       │
│ resolve function by parsing PE exports   | load-code/pe                       │
| (186 matches)                            |                                    |
│ run PowerShell expression                │ load-code/powershell/              │
│ schedule task via at                     │ persistence/scheduled-tasks        │
│ schedule task via schtasks               │ persistence/scheduled-tasks        │
└──────────────────────────────────────────┴────────────────────────────────────┘
```

El contenido de este bloque se representa en el formato de abajo:

| Formato                                                               | Ejemplo                                                       | Explicación                                                                                                                                               |
| --------------------------------------------------------------------- | ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Capability(Rule Name)**::**TLN(Top-Level Namespace)**/**Namespace** | reference anti-VM strings::Anti-Analysis/anti-vm/vm-detection | **Reference anti-VM strings** = CAPABILITY (NOMBRE DE REGLA)  <br>**Anti-Analysis** = TLN o Top-Level Namespace  <br>**anti-vm/vm-detection** = NAMESPACE |

----------------------------
<h2>Namespaces</h2>
CAPA usa los namespaces para agrupar ítems con el mismo propósito.

| Top-Level Namespace (TLN) | Explicación                                                                                                                                                                                                                        |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| anti-analysis             | Contiene un conjunto de reglas específicamente diseñadas para detectar comportamientos exhibidos por el malware para evitar análisis (ofuscación, empaquetamiento, técnicas anti-depurado, etc.).                                  |
| collection                | Contiene un conjunto de reglas relacionadas con la información que el malware puede intentar enumerar o recolectar.                                                                                                                |
| communication             | Contiene un conjunto de reglas que rigen los diferentes comportamientos de comunicación del malware, es decir, cómo interactúa con las redes, C2 y otros comportamientos basados en red.                                           |
| compiler                  | Contiene un conjunto de reglas y configuraciones para reconocer entornos de build específicos o compiladores usados en la generación de un ejecutable.                                                                             |
| data-manipulation         | Contiene un set de reglas que gobierna los comportamientos usados en la alteración de información dentro de un archivo ejecutable.                                                                                                 |
| executable                | Contiene un conjunto de reglas que rigen los atributos de los archivos ejecutables.                                                                                                                                                |
| host-interaction          | Contiene un conjunto de reglas relacionadas con los comportamientos que incumben interacciones con el sistema host.                                                                                                                |
| impact                    | Contiene un conjunto de reglas relacionadas a las consecuencias potenciales o efectos del comportamiento de un programa.                                                                                                           |
| internal                  | Las reglas contenidas en el sistema no se espera que sean usadas directamente por los analistas sino para procesos internos de CAPA con el sistema.                                                                                |
| lib                       | Bloques de construcción para crear otras reglas.                                                                                                                                                                                   |
| linking                   | Contiene reglas para identificar comportamientos relacionados al linking o carga dinámica de código o librerías durante la ejecución del programa. El malware suele depender de librerías externas, por eso esto es muy necesario. |
| load-code                 | Contiene un conjunto de reglas y regulaciones relacionadas a la carga dinámica o ejecución de código durante la ejecución del programa.                                                                                            |
| malware-family            | Contiene un conjunto de reglas relacionadas a comportamientos ligados a familias de malware particulares.                                                                                                                          |
| nursery                   | Esto es un terreno de ensayo que contiene reglas para aquellos que no están tan pulidos.                                                                                                                                           |
| persistence               | Contiene reglas relacionadas a comportamientos asociados con mantener acceso o persistencia en un sistema comprometido                                                                                                             |
| runtime                   | Contiene un conjunto de reglas que busca identificar la lengua de la plataforma donde corre el programa.                                                                                                                           |
| targeting                 | Contiene un conjunto de reglas relacionadas a comportamientos exhibidos por programas que interactúan con ATMs.                                                                                                                    |

Veamos cómo funciona esto mirando la tabla de abajo:

| Top-Level Namespace (TLN) | Namespaces           | Rule YAML File                                                                                                  | Explanation                                                                                                                                                                                                                                                                    |
| ------------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Anti-Analysis**         | anti-vm/vm-detection | reference-anti-vm-strings-targeting-virtualbox.yml  <br>  <br>reference-anti-vm-strings-targeting-virtualpc.yml | “anti-vm/vm-detection” namespace contiene reglas para detectar entornos de máquina virtual. Detectan strings o patrones usados por malware para detectar VMs mientras corren. Así CAPA puede detectar si el programa está intentando averiguar si está en una máquina virtual. |
|                           | obfuscation          | obfuscated-with-dotfuscator.yml  <br>  <br>obfuscated-with-smartassembly.yml                                    | El malware suele usar técnicas de ofuscado. Estas incluyen métodos como encriptación de strings, ofuscación del código, empaquetamiento y trucos anti-depuración. El namespace obfuscation lidia con esto para ver el contenido real del código.                               |

Para esto sólo hemos usado **Anti-Analysis** como TLN. Bajo este TLN, hemos agrupado los namespaces como **anti-vm/vm-detection** y **obfuscation**. Cada namespace tiene una colección de reglas dentro de ellos que también se agrupan juntas. Para **anti-vm/vm-detection** tenemos:

- **reference-anti-vm-strings-tartgeting-virtualbox.yml**
- **reference-anti-vm-strings-tartgeting-virtualpc.yml**

Lo mismo para el namespace obfuscation:

- **obfuscated-with-dotfuscator.yml**
- **obfuscated-with-smartassembly.yml**

Recuerda que esto es bajo el TLN **Anti-Analysis**!

![](/apuntes/img/Pasted image 20251028131522.png)

Además de lo mencionado en la tabla de arriba, hay más namespaces bajo **Anti-Analysis** con sus correspondientes reglas. Si quieres investigar más consulta este [enlace](https://github.com/MBCProject/capa-rules-1/tree/master/anti-analysis).

Usa este otro [enlace](https://github.com/MBCProject/capa-rules-1?tab=readme-ov-file#namespace-organization) si estás interesado en otros TLN como collection, compiler, persistence, linking e impact.