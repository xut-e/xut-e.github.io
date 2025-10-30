---
layout: apunte
title: "5. The Windows System32 Folders"
---

El fichero `C:\Windows` es tradicionalmente conocido como el fichero que contiene el sistema operativo de Windows. Este fichero no tiene por qué estar en C. Ni siquiera tiene por que estar en el mismo drive.

Es aquí donde entran en juego las variables de entorno. La variable de entorno para el directorio Windows es `%windir%`. 

Los ficheros de System32 son críticos para el sistema operativo y muy importantes. El borrado accidental de cualquier fichero ubicado dentro de Windows32 puede dejar inutilizable el sistema operativo.