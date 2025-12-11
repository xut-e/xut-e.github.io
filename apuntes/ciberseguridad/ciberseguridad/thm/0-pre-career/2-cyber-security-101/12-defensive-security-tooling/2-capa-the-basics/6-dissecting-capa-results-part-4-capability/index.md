---
layout: apunte
title: "6. Dissecting CAPA Results Part 4 - Capability"
---

En esta tarea continuaremos con el tema de la tarea pasada.

----------------------------
<h2>Capabilities</h2>
Debajo hay una tabla con las capacidades (capabilities) y sus TLN, namespaces y reglas relacionados:

| Capability                                     | Top-Level Namespace (TLN)                                                                         | Namespaces            | Archivo Rule YAML                                                         | Notas                                                                                                                                                      |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| reference anti-VM strings                      | [**Anti-Analysis**](https://github.com/MBCProject/capa-rules-1/tree/master/anti-analysis)         | anti-vm/vm-detection  | reference-anti-vm-strings.yml                                             | Para comprobar las reglas bajo este namespace haz click [aquí](https://github.com/MBCProject/capa-rules-1/tree/master/anti-analysis/anti-vm/vm-detection)  |
| reference anti-VM strings targeting VMWare     | **Anti-Analysis**                                                                                 | anti-vm/vm-detection  | reference-anti-vm-strings-targeting-vmware.yml                            | Para comprobar las reglas bajo este namespace haz click  [aquí](https://github.com/MBCProject/capa-rules-1/tree/master/anti-analysis/anti-forensic)        |
| reference anti-VM strings targeting VirtualBox | **Anti-Analysis**                                                                                 | anti-vm/vm-detection  | reference-anti-vm-strings-targeting-virtualbox.yml                        | Puedes querer comprobar el TLN para más reglas                                                                                                             |
| reference HTTP User-Agent string               | [**Communication**](https://github.com/MBCProject/capa-rules-1/tree/master/communication)         | http/client           | reference-http-user-agent-string.yml                                      | Para comprobar las reglas bajo este namespace haz click  [aquí](https://github.com/MBCProject/capa-rules-1/tree/master/communication/http/client))         |
| check HTTP status code                         | **Communication**                                                                                 | http                  | check-http-status-code.yml                                                | Para comprobar las reglas bajo este namespace haz click [aquí](https://github.com/MBCProject/capa-rules-1/tree/master/communication/http)                  |
| reference Base64 string                        | [**Data Manipulation**](https://github.com/MBCProject/capa-rules-1/tree/master/data-manipulation) | encoding/base64       | reference-base64-string.yml                                               | Para comprobar las reglas bajo este namespace haz click  [aquí](https://github.com/MBCProject/capa-rules-1/tree/master/data-manipulation/encoding/base64)  |
| encode data using XOR                          | **Data Manipulation**                                                                             | encoding/XOR          | encode-data-using-xor.yml                                                 | Para comprobar las reglas bajo este namespace haz click  [aquí](https://github.com/MBCProject/capa-rules-1/tree/master/data-manipulation/encoding/xor)     |
| contain a thread local storage (.tls) section  | [**Executable**](https://github.com/MBCProject/capa-rules-1/tree/master/executable)               | pe/section/tls        | contain-a-thread-local-storage-tls-section.yml                            | Puedes querer comprobar el TLN para más reglas                                                                                                             |
| get common file path                           | [**Host-Interaction**](https://github.com/MBCProject/capa-rules-1/tree/master/host-interaction)   | file-system           | get-common-file-path.yml                                                  | Puedes querer comprobar el TLN para más reglas                                                                                                             |
| create directory                               | **Host-Interaction**                                                                              | file-system/create    | create-directory.yml                                                      | Puedes querer comprobar el TLN para más reglas                                                                                                             |
| delete file                                    | **Host-Interaction**                                                                              | file-system/delete    | delete-file.yml                                                           | Para comprobar las reglas bajo este namespace haz click [aquí](https://github.com/MBCProject/capa-rules-1/tree/master/host-interaction/file-system/delete) |
| read file on Windows                           | **Host-Interaction**                                                                              | file-system/read      | read-file-on-windows.yml                                                  | Para comprobar las reglas bajo este namespace haz click  [aquí](https://github.com/MBCProject/capa-rules-1/tree/master/host-interaction/file-system/read)  |
| write file on Windows                          | **Host-Interaction**                                                                              | file-system/write     | write-file-on-windows.yml                                                 | Para comprobar las reglas bajo este namespace haz click  [aquí](https://github.com/MBCProject/capa-rules-1/tree/master/host-interaction/file-system/write) |
| get thread local storage value                 | **Host-Interaction**                                                                              | process               | get-thread-local-storage-value.yml                                        | Esta regla se encuentra bajo **TLN [Nursery](https://github.com/mandiant/capa-rules/tree/master/nursery)**                                                 |
| allocate or change RWX memory                  | **Host-Interaction**                                                                              | process/inject        | allocate-or-change-rwx-memory.yml                                         | Para comprobar las reglas bajo este namespace haz click  [aquí](https://github.com/MBCProject/capa-rules-1/tree/master/host-interaction/process/inject)    |
| create process on Windows                      | **Host-Interaction**                                                                              | process create        | create-process-on-windows.yml                                             | Para comprobar las reglas bajo este namespace haz click  [aquí](https://github.com/MBCProject/capa-rules-1/tree/master/host-interaction/process/create)    |
| reference cryptocurrency strings               | [**Impact**](https://github.com/MBCProject/capa-rules-1/tree/master/impact)                       | impact/cryptocurrency | reference-cryptocurrency-strings.yml                                      | This rule is found under **TLN [Nursery](https://github.com/mandiant/capa-rules/tree/master/nursery),** a staging ground for unpolished rules.             |
| link function at runtime on Windows            | [**Linking**](https://github.com/MBCProject/capa-rules-1/tree/master/linking)                     | runtime-linking       | link-function-at-runtime-on-windows.yml                                   | Para comprobar las reglas bajo este namespace haz click  [aquí](https://github.com/MBCProject/capa-rules-1/tree/master/linking/runtime-linking)            |
| parse PE header                                | [**load-code**](https://github.com/MBCProject/capa-rules-1/tree/master/load-code)                 | load-code/pe          | parse-pe-header.yml  <br>  <br>resolve-function-by-parsing-pe-exports.yml | Para comprobar las reglas bajo este namespace haz click  [aquí](https://github.com/MBCProject/capa-rules-1/tree/master/load-code/pe)                       |
| resolve function by parsing PE exports         | [**load-code**](https://github.com/MBCProject/capa-rules-1/tree/master/load-code)                 | load-code/pe          | resolve-function-by-parsing-pe-exports.yml                                | Para comprobar las reglas bajo este namespace haz click  [aquí](https://github.com/MBCProject/capa-rules-1/tree/master/load-code/pe)                       |
| run PowerShell expression                      | [**load-code**](https://github.com/MBCProject/capa-rules-1/tree/master/load-code/powershell)      | load-code/PowerShell  | run-powershell-expression.yml                                             | Para comprobar las reglas bajo este namespace haz click  [aquí](https://github.com/MBCProject/capa-rules-1/tree/master/linking/runtime-linking)            |
| schedule task via at                           | [**persistence**](https://github.com/MBCProject/capa-rules-1/tree/master/persistence)             | scheduled-tasks       | schedule-task-via-at.yml                                                  | Puedes querer comprobar el TLN para más reglas                                                                                                             |
| schedule task via schtasks                     | [**persistence**](https://github.com/MBCProject/capa-rules-1/tree/master/persistence)             | scheduled-tasks       | schedule-task-via-schtasks.yml                                            | Puedes querer comprobar el TLN para más reglas                                                                                                             |

Para explicar esto más en profundidad, veamos la primera capability en la tabla, "**Reference anti-VM strings**".

- Nos damos cuenta de que las reglas relacionadas en formato YML son **reference-anti-vm-strings.yml**.
- Esto está bajo en Namespace **anti-vm/vm-detection**.
- Este a su vez está bajo el TLN **Anti-Analysis**.

Esto nos dice que CAPA fue capaz de identificar que el software potencialmente malicioso busca claves de registro VM específicas y la presencia de herramientas VMWare y otros elementos relacionados con las VMs usando el archivo **reference-anti-vm-strings.yml**.

Veamos otro ejemplo. Miremos a "schedule tasks via schtasks":

- Nos damos cuenta de que las reglas relacionadas en YML  son **schedule-task-via-schtasks.yml**.
- Esto está bajo el Namespace **scheduled-tasks**.
- Ese a su vez está bajo el TLN **persistence**.

Esto nos dice que CAPA pudo identificar comportamientos relacionados a la programación de tareas en un sistema operativo Windows usando **schedule-task-via-schtasks.yml**.

¿Te has fijado en algo?

El ítem bajo Capability tiene el mismo nombre que el archivo YML bajo Rules, con la única adición de un guión entre los espacios. Esto es porque Capability es el nombre de la regla.

Algunas excepciones donde la Capability no  está localizada bajo su Namespace:

- **reference cryptocurrency strings**: Debería estar bajo **impact**, sin embargo está en **nursery**.

Ahora que tenemos un buen entendimiento y vista sobre los contenidos de Capability y Namespace, deberíamos ser capaces de explicar los resultados del ejemplo de la tarea pasada.

Hagamos un rápido repaso:

```powershell
┌───────────────────────────────────────────┬───────────────────────────────────┐
│ Capability                                │ Namespace                         │
├───────────────────────────────────────────┼───────────────────────────────────┤
│ reference Base64 string                   │ data-manipulation/encoding/base64 │
└───────────────────────────────────────────┴───────────────────────────────────┘
```

La explicación:

| Etiqueta                | Valor                           | Explicación                                                                                                                     |
| ----------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Capability              | **reference base64 string**     | El malware tiene la habilidad de codificar información usando Base64.                                                           |
| Top-Level Namespace     | **data-manipulation**           | Contiene un conjunto de reglas que rige los comportamientos involucrados en la alteración de información (data transformation). |
| Namespace               | **encoding/base64**             | Consiste en las reglas para encodear y decodear usando Base64 y XOR.                                                            |
| Rule YAML File Matched? | **reference-base64-string.yml** | Recuerda que en casi todos los casos el nombre de la regla es el nombre de la Capability con guiones en lugar de espacios.      |

Sabiendo esta información podemos concretar que el archivo usa el esquema de encodeado Base64.