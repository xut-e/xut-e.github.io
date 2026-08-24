---
layout: apunte
title: "1. Moving Through the Network"
---

<h2>¿Qué es el Movimiento Lateral?</h2>
Puesto de manera simple, el movimiento lateral es el grupo de técnicas usadas por los atacantes para moverse en una red. Una vez que el atacante ha ganado acceso a la primera máquina de la red, moverse es esencial por muchas razones, incluyendo:

- Conseguir nuestros objetivos como atacantes.
- Bypassear las restricciones de red existentes.
- Establecer puntos adicionales de entrada a la red.
- Crear confusión y evitar detección.

Mientras que muchas cadenas referencian movimiento lateral como un paso adicional en un proceso linear, es realmente parte de un ciclo. Durante este ciclo, usamos cualquier credencial disponible para realizar movimiento lateral, dándonos acceso a nuevas máquinas donde elevamos privilegios y extraemos credenciales si es posible. Con las nuevas credenciales, el ciclo comienza de nuevo.

!**Pasted image 20260810133126.png**

Normalmente repetiremos el ciclo varias veces antes de alcanzar nuestro objetivo final. Si la primera máquina a la que accedemos es una máquina con muy poco acceso a recursos, puede que debamos movernos lateralmente hacia otros hosts que tengan más privilegios.

-----------------------------------------
<h2>Un Ejemplo Rápido</h2>
Supón que estamos realizando un engagement de red team donde nuestro objetivo final es alcanzar el código interno de un repositorio, donde obtuvimos nuestro primer compromiso en la erd objetivo usando una campaña de phishing. Normalmente, las campañas de phishing son más efectivas contra usuarios no técnicos, por lo que nuestro primer acceso puede ser una máquina en el departamento de marketing.

Las estaciones de trabjo de marketing normalmente estarán limitadas a través de políticas de firewall par ano acceder a ningún servicio crítico en la red, incluyendo protocolos administrativos, puertos de bases de datos, servicios de monitorización, etc.

Para llegar a hosts y servicios sensibles, necesitamos movernos a otros hosts y pivotar desde ahí hacia nuestro objetivo final. Podríamos tratar de elevar privilegios de la estación de trabajo de Marketing y extraer los hashes de las contraseñas de usuarios locales. Si encontramos un administrador local, la misma cuenta puede estar presente en otros hosts. Después de hacer reconocimiento, encontramos una estación de trabajo con el nombre `DEV-0001-PC`. Podemos usar la contraseña del administrador local para acceder a `DEV-001-PC` y confirmar si pertenece a uno de los desarrolladores de la compañía. Desde ahí, el acceso al código objetivo está disponible.

!**Pasted image 20260810134537.png**

Ten en cuenta que aunque el movimiento lateral necesita ser usado para circunvalar restricciones de firewall, es también útil para evadir la detección. En nuestro ejemplo, incluso si la estación de Marketing tiene acceso directo al repositorio, es probablemente deseable coonectar a través del PC del desarrollador. Este comportamiento sería menos sospechoso desde el punto de vista de un blue teamer.

------------------------------------------------
<h2>La Perspectiva del Atacante</h2>
Hay varias maneras en las que un atacante puede moverse lateralmente. La forma más simple sería usar protocolos administrativos estandar como WinRM, RDP, VNC o SSH para conectarse a otras máquinas de mmmmá´