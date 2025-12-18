---
layout: apunte
title: "9. Bypassing Server-Side Filtering - Magic Numbers"
---

Ya hemos visto el filtrado de extensiones del lado del servidor, pero vamos a aprovechar para ver cómo se comprueban los magic numbers del lado del servidor también.

Los magic numbers se utilizan para identificar los archivos de manera más precisa. El magic number de un archivo es una string de dígitos hexadecimales y es siempre la primera parte de un archivo. De esta manera, leyendo los primeros bytes de un archivo y comparándolos con una whitelist o blacklist, podemos verificar si el archivo es o no legítimo para su subida.

>[!IMPORTANT] Esta técnica puede ser efectiva contra servidores basados en PHP pero puede fallar contra otros tipos de servidores web.

Veamos un ejemplo. Como generalmente, tenemos una página de subida.

!**Pasted image 20251217135821.png**

