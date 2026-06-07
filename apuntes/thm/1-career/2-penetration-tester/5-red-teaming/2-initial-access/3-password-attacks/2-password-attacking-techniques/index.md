---
layout: apunte
title: "2. Password Attacking Techniques"
---

En esta tarea veremos las técnicas que podrían ser utilizadas para realizar ataques de contraseñas. Cubriremos varias técnicas, como diccionario, fuerza bruta, basada en reglas, y ataques de adivinación. Todas las técnicas de arriba se consideran de modo activo (online) donde el atacante necesita comunicarse con la máquina para obtener la contraseña y ganar acceso no autorizado.

----------------------------------
<h2>Crackeo de Contraseñas vs. Adivinación de Contraseñas</h2>
Esta sección discute la terminología de crackeo de contraseñas desde un punto de vista de ciberseguridad. También veremos diferencias significativas entre las dos. Finalmente demostraremos varias herramientas usadas para el crackeo de contraseñas, incluyendo John the Ripper.

El crackeo de contraseñas es una técnica utilizada para descubrir contraseñas de hashes o información encriptada. Los atacantes pueden obtener contraseñas hasheadas o encriptadas de una máquina comprometida o capturarlas desde la información transmitida en una red. Una vez obtenidas, el atacante puede utilizar las técnicas de crackeo.

El crackeo de contraseñas es una de las técnicas tradicionales en el pentesting. El objetivo primario es escalar a privilegios elevados y acceder a un sistema o red. La adivinación de contraseñas es un método de adivinar las contraseñas en protocolos online basado en diccionarios. Las diferencias son:

- La adivinación de contraseñas es una técnica que ataca protocolos y servicios. Por esto es considerada lenta y abre la oportunidad para generar logs para los intentos de login fallados. Un ataque de adivinación es llevado a cabo en en un sistema basado en web que suele requerir una nueva petición para cada intento, fácilmente detectable.
- El crackeo de contraseñas es una técnica realizada en local o en sistemas controlados por el atacante.

