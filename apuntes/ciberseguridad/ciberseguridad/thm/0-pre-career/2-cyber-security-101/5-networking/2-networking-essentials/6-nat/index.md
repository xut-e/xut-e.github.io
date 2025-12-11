---
layout: apunte
title: "6. NAT"
---

Como ya hemos hablado, IPv4 puede soportar hasta 4 billones de dispositivos a la vez como máximo. Con el incremento en dispositivos por usuario este número se ha quedado pequeño. Una solución a esto es NAT.

La idea detrás de NAT es que una IP pública pueda dar acceso a Internet a varias IPs privadas, de tal manera que una empresa con 20 ordenadores puede conectarlos todos a Internet mediante una sola IP pública.

Los routers adaptados a NAT, deben tener una manera de rastrear paquetes en conexiones, por eso tienen una tabla que traduce entre direcciones internas y externas. Generalmente la red interna usa direcciones IP privadas mientras que la externa, públicas.

Abajo un ejemplo. El portátil `192.168.0.129` al establecer una conexión con el servidor, estará desde su punto de vista haciéndolo desde esta misma IP y el puerto `15401`. Sin embargo, para el servidor, esta conexión estará siendo realizada desde `212.3.4.5` y puerto `19273`.

!**079.jpg**
