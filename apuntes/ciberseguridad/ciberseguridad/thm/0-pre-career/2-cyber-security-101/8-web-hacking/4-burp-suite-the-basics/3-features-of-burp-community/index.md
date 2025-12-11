---
layout: apunte
title: "3. Features of Burp Community"
---

Aunque Burp Suite Community ofrece un conjunto más limitado de funcionalidades, sigue siendo impresionante. Sus herramientas son altamente valiosas para testear aplicaciones web. Exploremos algunas de sus características principales:

- **Proxy:** El Proxy de Burp es el aspecto con más renombre. Permite interceptar y modificar peticiones y respuestas mientras interactuamos con aplicaciones web.
- **Repeater:** Permite capturar, modificar y remandar la misma petición múltiples veces. Especialmente útil al crear payloads mediante prueba y error.
- **Intruder:** Aún con la limitación de frecuencia, permite mandar peticiones a endpoints. Comúnmente utilizado para ataques de fuerza bruta o de fuzzeo.
- **Decoder:** Ofrece un valioso servicio para transformación de información.
- **Comparer:** Como el nombre sugiere, habilita la comparación entre elementos de información ya sea a nivel de palabra o de byte.
- **Sequencer:** Típicamente utilizado cuando se intenta descifrar un token, si le faltaba randomizado al generarse se puede exponer a ataques.

Además de las funcionalidades pre-implementadas, la base de código de Java facilita el desarrollo de extensiones para aumentar su funcionalidad. Estas pueden ser escritas en Java, Python (usando el intérprete Java-Python), o Ruby (usando el intérprete Java-JRuby). El módulo **Burp Suite Extender** permite la rápida y fácil carga de extensiones en el marco de trabajo mientras que el marketplace, **BApp Store**, permite descargar módulos de terceros. Aunque algunas extensiones requieren tener una licencia, sigue habiendo muchas que no lo necesitan, como por ejemplo **Logger++**.