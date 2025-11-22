---
layout: apunte
title: "4. Computer Management"
---

Seguimos con herramientas disponibles en el panel de configuración del sistema.

La utilidad del gestor del ordenador (Computer Management) `compmgmt`, tiene tres secciones, primariamente: `System Tools`, `Storage` y `Services and Applications`.

<h2>System Tools</h2>
Empezaremos con el organizador de tareas (Task Scheduler). Con él podemos crear y dirigir tareas que nuestro ordenador ejecutará cuando le digamos.

Para crear una tarea le damos a `Crate Basic Task` debajo de `Actions`.

Después viene el visor de eventos (Event Viewer). Nos permite ver eventos que han ocurrido en el ordenador. Pueden ser entendidos como logs que nos permiten auditar la integridad del sistema.

El visor de eventos tiene tres partes:

1. La parte de la izquierda nos da un listado jerárquico en árbol de los proveedores de logs de eventos.
2. El medio nos enseña una vista general y un resumen de los eventos específicos seleccionados.
3. El lado de la derecha nos muestra las acciones.

Hay cinco tipos de eventos que pueden ser registrados:

!**039.png**

Los logs estándar son visibles debajo de `Windows Logs`:

!**040.png**

En `Shared Folders` (carpetas compartidas), verás una lista completa de los archivos y carpetas compartidos a los que otros pueden acceder/conectarse.

La compartición de Windows por defecto se llama `C$`:

!**041.png**

Debajo de `Sessions` puedes ver a usuarios que están conectados a los shares. Y todos los archivos a los que accedan se listarán debajo de `Open Files`.

La sección de usuarios y grupos locales debería sonarte pues la vimos en [6. User Accounts, Profiles and Permissions](/apuntes/ciberseguridad/thm/0-pre-career/1-pre-security/5-windows-fundamentals/1-windows-fundamentals-part-1/6-user-accounts-profiles-and-permissions/). Es `lusrmgr.msc`.

En `Performance` verás una utilidad llamada `Performance Monitor` (`perfmon`). Es usada para ver la información en tiempo real o de un archivo log.

`Device Manager` nos permite ver y configurar el hardware como deshabilitar cualquier parte unida al ordenador.

!**042.png**

-------------------
<h2>Storage</h2>
En Storage se encuentran `Windows Server Backup` y `Disk Management`.

Disk Management es una utilidad del sistema en Windows que nos permite realizar tareas de almacenaje complejas. Algunas son:

- Montar un nuevo disco.
- Extender una partición.
- Reducir una partición.
- Asignar o cambiar la letra de un disco (por ejemplo `E:`).

!**043.png**

-------------------
<h2>Services and Applications</h2>
Un servicio es un tipo de aplicación especial que corre en el fondo (bg). Aquí a parte de activar o desactivar el servicio, puedes ver sus propiedades.

!**044.png**

WMI (Windows Management Instrumentation) es el servicio que configura y controla precisamente la instrumentación del Windows Manager.

En versiones modernas esta `deprecated`. Powershell la ha sustituido.