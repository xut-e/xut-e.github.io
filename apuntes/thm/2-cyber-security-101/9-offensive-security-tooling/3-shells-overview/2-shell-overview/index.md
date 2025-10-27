---
layout: apunte
title: "2. Shell Overview"
---

<h2>¿Qué es una shell?</h2>
Una shell es un software que permite al usuario interactuar con el sistema operativo. Puede ser una interfaz gráfica, pero normalmente es una interfaz de línea de comandos.

En ciberseguridad, se suele referir a una sesión shell específica que un atacante usa al acceder a un sistema comprometido, permitiéndole ejecutar comandos y software. Algunas de las cosas que un atacante puede hacer con una shell son:

- **Control Remoto del Sistema:** Permite al atacante ejecutar comandos o software remotamente.
- **Escalada de Privilegios:** Si el acceso inicial a través de una shell está limitado o restringido, los atacantes pueden explorar maneas de escalar privilegios.
- **Exfiltración de Datos:** Una vez que los atacantes pueden ejecutar comandos, pueden explorar el sistema.
- **Persistencia:** Una vez obtenido el acceso, los atacantes pueden dejar "puertas abiertas" en el sistema para volver a entrar más adelante de una manera más sencilla.
- **Actividades de Post-Explotación:** Después de ganar acceso, los atacantes pueden realizar una amplia selección de actividades post-explotación, como desplegar malware, crear cuentas escondidas, borrar información, etc.
- **Acceder a otros Sistemas en la Red:** Dependiendo de las intenciones del atacante, la shell de acceso puede ser sólo el inicio, si planea saltar a otros dispositivos de la red. También se conoce como pivotar.

