---
layout: apunte
title: "6. System and Network Information"
---

PowerShell fue creada específicamente para combatir la necesidad creciente de una herramienta potente de automatización. Como tal, provee una cantidad de cmdlets que nos permite obtener información detallada de la configuración del sistema y ajustes de red.

Por ejemplo, `Get-ComputerInfo` nos devuelve una lista de información del sistema que incluye información del sistema operativo, especificaciones de hardware, detalles de la BIOS y más. En contrapartida a u homólogo tradicional, `systeminfo` que sólo devuelve algunos detalles.

Esencial para el manejo de cuentas es `Get-LocalUser` que lista todas las cuentas de usuarios locales en el sistema. Devuelve el nombre de la cuenta, el estado y una breve descripción.

El cmdlet `Get-NetIpConfiguration` nos da información detallada sobre las interfaces de red en el sistema, incluyendo la dirección IP, servidores DNS y configuraciones gateway.

En caso de que necesitemos detalles específicos de las direcciones IP asignadas a las interfaces de red, el cmdlet `Get-NetIpAddress` nos servirá.