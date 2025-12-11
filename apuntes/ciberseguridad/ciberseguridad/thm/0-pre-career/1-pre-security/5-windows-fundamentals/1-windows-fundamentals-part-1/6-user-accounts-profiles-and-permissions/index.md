---
layout: apunte
title: "6. User Accounts, Profiles and Permissions"
---

Las cuentas de usuarios pueden ser de dos tipos principalmente: Administrador o Usuario estándar.

El tipo de cuenta determina qué acciones se pueden llevar a cabo.

- Un administrador puede hacer cambios al sistema: añadir usuarios, eliminarlos, modificar grupos, cambiar ajustes del sistema, etc.
- Un usuario estándar sólo puede hacer cambios en carpetas o archivos atribuídos a él y no puede hacer modificaciones a nivel de sistema, como instalar programas.

Hay varias maneras de ver qué usuarios existen en el sistema. Una manera es hacer click en `Start Menu` y escribir `Other user`. Un atajo de `System Settings > Other users` aparecerá.

Cada usuario se localiza en `C:\Users`. Todos ellos tendrán las mismas carpetas iniciales. Algunas son:

- Desktop
- Documents
- Downloads
- Music
- Pictures

Otra manera de acceder a esta información es hacer click derecho en el menú de inicio y seleccionar `Run`. Después escribir `lusrmgr.msc`.

!**036.gif**

Allí deberías ver dos carpetas: **Users** y **Groups**.

Si haces click en grupos, verás los nombres de los grupos locales con una breve descripción de cada uno.

Cada uno de estos grupos tiene permisos ya dados por el administrador. Cuando un usuario es asignado a un grupo, adquiere los permisos de ese grupo. Un usuario puede ser asignado a múltiples grupos.