---
layout: apunte
title: "6. Remediation"
---

Como desarrollador, es importante estar al tanto de las vulnerabilidades de aplicaciones web, cómo encontrarlas y los métodos de prevención. Para prevenir las vulnerabilidades de inclusión de archivos sigue las siguientes recomendaciones:

1. Mantén sistemas y servicios, incluyendo frameworks de aplicaciones web, actualizados a la última versión.
2. Apaga los errores PHP para evitar la ruta de la aplicación y otra información reveladora.
3. Un Firewall de Aplicación Web (WAF) es una buena opción para ayudar a mitigar los ataques de aplicaciones web.
4. Deshabilita algunas funcionalidades PHP que causan vulnerabilidades de inclusión de archivos si tu aplicación web no los necesita, como `allow_url_fopen` y `allow_url_include`.
5. Analiza tu aplicación web concienzudamente y permite sólo protocolos y wrappers PHP que se necesiten.
6. Nunca confíes en el input del usuario e implementa validación de input correcta.
7. Implementa una lista blanca para nombres de archivos y rutas permitidas, así como una lista negra.
