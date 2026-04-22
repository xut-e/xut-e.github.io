---
layout: apunte
title: "1. LLM Output Risks"
---

En la seguridad web tradicional, solemos pensar sobre los inputs como la superficie de ataque principal, como en las inyecciones SQL o XSS, inyección de comandos u otros ataques similares. Pero con los LLMs, los outputs son igual de importantes. Un LLM puede que genere una respuesta que ea procesada después por otro sistema o mostrada al usuario o usada para disparar una acción automatizada. Si ese output no es validado o sanitizado, puede llevar a problemas serios como:

- **Ataques de Inyección Hacia Abajo del Flujo:** Por ejemplo, un LLM genera HTML o JavaScript accidentalmente que se renderiza directamente en la aplicación web.
- **Escalada Basada en Prompts:** Donde el output del modelo incluye instrucciones escondidas o información que manipula los sistemas hacia abajo del flujo.
- **Filtración de Datos:** Si el LLM muestra tokens sensibles, claves API o conocimiento interno que no debería salir del modelo.

Los LLMs suelen tener acceso a más información de lo que un sólo usuario puede esperar. Pueden haber sido entrenados con contenido sensible, tener acceso a bases de datos internas o interactuar con los servicios de backend. Si el output no está controlado claramente, pueden revelar información de forma no intencional, como:

- URLs internas, endpoints de APIs o detalles de infraestructura.
- La información de los usuarios está guardada en conversaciones o logs anteriores.
- Prompts de sistema escondidos o secretos de configuración que son usados para guiar el comportamiento del modelo.

Los atacantes pueden explotar esto construyendo queries diseñadas para engañar al modelo para que filtre información.