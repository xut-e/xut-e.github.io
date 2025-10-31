---
layout: apunte
title: "5. Group Policies"
---

Por el momento hemos organizado usuarios y ordenadores en OUs por el simple hecho de hacerlo, pero la idea detrás es aplicar diferentes políticas para cada OU.

Windows controla esas políticas a través de GPO (Group Policy Objects). Los GPOs son simplemente una colección de ajustes que puede ser aplicada a las OUs. Para configurar GPOs podemos usar la herramienta GPM (Group Policy Management).

Lo primero que vemos al abrirlo es la jerarquía de OU, previamente definida. Para configurar las políticas de los grupos, debemos crear primero un GPO debajo de "Group Policy Objects" y linkearlo con el OU donde queremos aplicar sus políticas. Hay algunas ya creadas en nuestra máquina:

!**056.png**

Podemos ver en la imagen de arriba que se han creado 3 GPOs. `Default Domain Policy` y `RDP Policy` están conectados con el dominio `thm.local` y `Default Domain Controllers Policy` está linkeado con `Domain Controllers`.

>[!IMPORTANT] Cualquier GPO será aplicado a la OU linkeada y cualquier sub-OU debajo de esta. Por ejemplo, la OU `Sales` se verá afectada por `Default Domain Policy`.

Analicemos  `Default Domain Policy` para ver qué contiene una GPO. La primera pestaña que veremos al seleccionar un GPO es **scope**, que es donde el GPO es linkeado en el AD. Podemos ver que sólo ha sido linkeado al dominio `thm.local`.

!**057.png**

Como podemos ver, también se puede aplicar filtrado de seguridad a los GPOs para que sólo se apliquen a ciertos usuarios u ordenadores bajo una OU. Por defecto se aplicarán a los usuarios autentificados, lo que incluye a todos los usuarios/PCs.

La pestaña `Settings` incluye los contenidos del GPO y nos deja ver las configuraciones específicas que aplica. Como ya hemos visto, cada GPO tiene configuraciones que aplican a los ordenadores sólo y configuraciones que aplican a los usuarios sólo. En este caso `Default Domain Policy` sólo contiene configuraciones de ordenador.

!**058.png**

Como este GPO aplica a todo el dominio, cualquier cambio afectará a todos los ordenadores. Cambiemos la longitud mínima de las contraseñas para que tengan 10 caracteres al menos:

!**059.png**

Esto abrirá una nueva pestaña. Para cambiar la longitud: `Computer Configuratios -> Policies -> Windows Setting -> Security Settings -> Account Policies -> Password Policy` y ahí cambiamos el valor requerido:

!**060.png**

Como podemos ver, múltiples políticas pueden establecerse en un GPO. Si necesitas información sobre cualquiera de ellas puedes hacer doble click en ellas y leer la pestaña `Explain`.

!**061.png**

------------------------
<h2>Distribución de GPOs</h2>
Los GPOs son distribuidos a la red a través de una compartición de red llamada `SYSVOL`, que está almacenada en el DC. Todos los usuarios en el dominio deberían típicamente tener acceso a esta compartición para sincronizar sus GPOs periódicamente. `SYSVOL` comparte al directorio `C:\Windows\SYSVOL\sysvol\` por defecto.

Si queremos forzar la sincronización de un dispositivo después de hacer un cambio en los GPOs podemos ejecutar el siguiente comando en el ordenador a actualizar: `PS C:\> gpupdate /force`.

------------------------
<h2>Creando algunos GPOs para THM Inc.</h2>
Como parte de nuestro nuevo trabajo, nos han pedido implementar algunos GPOs pare permitir:

1. Bloquear a los usuarios fuera de IT de acceder al panel de control.
2. Hacer que las estaciones de trabajo y servidores bloqueen su pantalla después de 5 minutos de inactividad.

Vamos a ver cómo podemos hacerlo:

<h3>Restringir acceso al Panel de Control</h3>
Queremos restringir el acceso al panel de control para aquellos usuarios que no pertenezcan al departamento de IT.

Crearemos un nuevo GPO llamado `Restrict Control Panel Access`. Como queremos que este GPO se aplique a usuarios específicos buscaremos debajo de `User Configuration` la siguiente política:

!**062.png**

Le damos a `Enable`.

Ahora tenemos que linkearlos con las OUs correspondientes (todas menos IT). Para ello, arrastramos el GPO a las OUs.

-----------------------
<h3>Auto Lock de la Pantalla</h3>
Podríamos aplicar este GPO a las OUs que creamos antes (Workstations y Servers). Pero esta no es la mejor solución. Ya que queremos que todos los ordenadores sean afectados por esto, podemos aplicarlo al dominio raíz.

Hagamos un GPO nuevo que llamaremos `Auto Lock Screen`.

!**063.png**

Después de crearlo y configurarlo lo arrastramos a `thm.local`.