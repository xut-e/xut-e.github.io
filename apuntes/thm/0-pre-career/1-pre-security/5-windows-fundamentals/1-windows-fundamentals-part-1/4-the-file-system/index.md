---
layout: apunte
title: "4. The File System"
---

El sistema de archivos usado en versiones modernas de Windows es NTFS (New Technology File System). Antes de esto estuvieron FAT16/FAT32 (File Allocation Table) y HPFS (High Performance File System).

Todavía se ven las particiones FAT hoy en día, sobretodo en dispositivos como USB, MicroSD, etc.

NTFS es conocido como un sistema de ficheros "journaling". Puede reparar archivos y ficheros del disco en caso de falla usando información que se guarda en el disco. Esta función no es posible con FAT.

NTFS combate muchas de las limitaciones de los sistemas de ficheros previos:

- Soporta archivos mayores que 4 GB.
- Puede aportar permisos específicos a archivos y ficheros.
- Compresión de archivos y ficheros.
- Encriptación (Encryption File System o EFS).

[Aquí](https://docs.microsoft.com/en-us/troubleshoot/windows-client/backup-and-storage/fat-hpfs-and-ntfs-file-systems) puedes encontrar la documentación oficial de Windows de FAT, HPFS y NTFS.

En volúmenes NTFS puedes establecer permisos que den o denieguen acceso a archivos o ficheros. Estos son:

- Control absoluto.
- Modificar.
- Leer y ejecutar.
- Listar contenidos del fichero.
- Escribir.
- Leer.

Para ver permisos de un archivo o fichero:

1. Click derecho en el archivo o fichero.
2. Seleccionar Propiedades.
3. Seleccionar la pestaña Seguridad.
4. En la lista de nombre de usuarios o grupos selecciona aquella persona/grupo del cual quieras ver los permisos.

Otra peculiaridad de NTFS es ADS (Alternate Data Streams). Es un atributo específico de Windows NTFS.

Todos los archivos tienen al menos un data stream ($DATA) y ADS permite a los archivos tener más de uno. Para ver esta información debemos hacer uso de la Powershell.

Los desarrolladores de malware han utilizado históricamente este ADS para esconder información.