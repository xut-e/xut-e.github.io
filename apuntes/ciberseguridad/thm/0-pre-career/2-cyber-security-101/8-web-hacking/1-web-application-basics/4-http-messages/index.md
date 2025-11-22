---
layout: apunte
title: "4. HTTP Messages"
---

Los mensajes HTTP son los paquetes de información intercambiados entre un usuario (el cliente) y el servidor web. Estos mensajes son muy importantes para entender cómo las aplicaciones web funcionan porque pueden mostrar cómo se comunican las respuestas.

Hay dos tipos de mensajes HTTP:

- **Peticiones HTTP:** Mandadas por el usuario para activar las acciones del servidor web.
- **Respuestas HTTP:** Mandadas por el servidor en respuesta a la petición del usuario.

Cada mensaje sigue un formato específico que ayuda a ambos a comunicarse sin errores.

<h5>Start Line</h5>
Es como la introducción del mensaje. Nos dice qué tipo de mensaje se va a mandar, ya sea una petición del usuario o una respuesta del servidor. También da información a cerca de cómo debería ser tratado el mensaje.

<h5>Headers</h5>
Los headers están compuestos de pares de llaves que ofrecen información extra sobre el mensaje HTTP. Dan instrucciones tanto al cliente como al servidor de cómo manejar la petición o la respuesta. Estos headers cubren muchas cosas como la seguridad, tipos de contenido y más.

<h5>Empty Line</h5>
Es un pequeño divisor que separa el header del cuerpo. Es esencial porque muestra dónde los headers terminan y dónde empieza el verdadero contenido del mensaje.

<h5>Body</h5>
Es donde el mensaje en sí está almacenado. En una petición, el cuerpo puede incluir información que el usuario quiera mandar al servidor mientras que en la respuesta el servidor incluye la información que el usuario puede ver en función de su solicitud.