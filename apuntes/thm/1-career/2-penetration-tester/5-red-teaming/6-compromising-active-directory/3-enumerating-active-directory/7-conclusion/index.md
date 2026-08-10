---
layout: apunte
title: "7. Conclusion"
---

Enumerar el AD es una tarea masiva. Una enumeración AD correcta requiere entender la estructura del dominio y determinar rutas de ataque para realizar escalada de privilegios o movimiento lateral.

-------------------------------------
<h2>Técnicas de Enumeración Adicionales</h2>
En esta red, hemos cubierto varias técnicas que pueden ser usadas para enumerar el AD. Esto no es de ninguna manera una lista exhaustiva. Aquí tienes una lista de técnicas de enumeración que merecen una mención:

- [LDAP enumaration](https://book.hacktricks.xyz/pentesting/pentesting-ldap): Cualquier par válido de credenciales AD debería ser capaz de ligarse a la interfaz LDAP de un controlador de dominio. Esto te pertirá escreibir queries LDAP para enumerar información respecto a los objetos AD del dominio.
- [PowerView](https://github.com/PowerShellMafia/PowerSploit/blob/master/Recon/PowerView.ps1): PowerView es un script de reconocimiento parte del proyecto [PowerSploit](https://github.com/PowerShellMafia/PowerSploit). Aunque este proyecto ya no recibe soporte, los scripts como PoweerView pueden ser increíblemente útiles para realizar enumeración semimanual de objetos AD.
- [Windows Management Instrumentation (WMI)](https://0xinfection.github.io/posts/wmi-ad-enum/): WMI puede ser usado para enumerar información de hosts de Windows. Tiene un proveedor llamado `root\directory\ldap` que puede ser usado para interactuar con el AD. Podemos usar este proveedor y WMI en PowerShell para realizar enumeración AD.

----------------------------------------
<h2>Mitigations</h2>
La enumeración AD es increíblemente difícil de defender. Muchas de estas técnicas imitan tráfico normal de red y su comportamiento, haciéndolo difícil de distinguir del tráfico habitual. Sin embargo, hay un par de cosas que podemos hacer para detectar comportamiento malicioso:

- Las técnicas de enumeración poderosas como Sharphound generan una cantidad significante de eventos LogOn al enumerar información de sesión. Como se ejecuta de una sólo cuenta AD, estos eventos serán asociados con esta cuenta. Podemos escribir reglas de detección para este tipo de comportamientos si ocurre desde una cuenta de usuario.
- Podemos escribir reglas de detección de firmas para las herramientas que deben ser instaladas para ciertas técnicas de enumeración AD como los binarios SharpHound y herramientas AD-RSAT.
- A no ser que se use por empleados de la organización, podemos monitorizazr el uso del prompt de comandos y PowerShell en nuestra organización para detectar intentos potenciales de enumeración de fuentes no autorizadas.

