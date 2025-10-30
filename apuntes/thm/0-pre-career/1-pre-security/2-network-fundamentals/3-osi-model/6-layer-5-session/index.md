---
layout: apunte
title: "6. Layer 5 - Session"
---

Una vez que la información ha sido correctamente traducido o formateado de la capa de presentación, la capa actual comenzará a crear y mantener la conexión al ordenador al que debe llegar la información. Cuando se establece la conexión, se crea una sesión que estará activa mientras dure la conexión.

Esta capa también es la responsable de cerrar la conexión si no se ha usado en mucho tiempo o si se ha perdido. Además, la sesión puede tener checkpoints, de tal manera que si se pierde la información en cierto punto, sólo se tenga que mandar la información más reciente.

Las sesiones son únicas, por lo que la información no puede viajar entre sesiones