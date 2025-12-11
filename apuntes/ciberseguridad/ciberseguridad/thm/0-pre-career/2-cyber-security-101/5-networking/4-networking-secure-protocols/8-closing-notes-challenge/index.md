---
layout: apunte
title: "8. Closing notes + Challenge"
---

En esta lección hemos cubierto el uso de TLS, el cual provee de una capa de seguridad a protocolos como HTTP, SMTP, POP3 e IMAP. Además hemos visto lo que es SSH y cómo usarlo a nivel básico y las VPNs de manera superficial.

------------------
<h2>Challenge</h2>
Al ejecutar `chromium --ssl-hey-log-file=~/ssl-key.log` dumpeamos las claves TLS al archivo `ssl-key.log`. El archivo de captura que analizaremos es `randy-chromium.pcapng` en la carpeta `Documents`. Al abrir `Wireshark` podemos configurarlo para usar `ssl-key.log`.

Para hacerlo seguimos los pasos:

1. Elegimos `Protocol Preferences`.
2. Seleccionamos `Transport Layer Security`.
3. Clickamos en `Open Transport Layer Security preferences`.
4. Le damos a `Browse` y buscamos el documento que contiene las claves TLS.

Una vez allí podemos filtrar con `http2.headers.method == "POST"`. Esto nos lleva al paquete 365. Si seguimos el flujo caemos en el paquete 366, de tipo xml-urlencoded-form. Si desencriptamos el paquete encontramos la flag.