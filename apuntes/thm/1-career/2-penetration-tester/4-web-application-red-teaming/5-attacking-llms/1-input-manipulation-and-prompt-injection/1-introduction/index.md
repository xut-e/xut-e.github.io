---
layout: apunte
title: "1. Introduction"
---

Los LLMs (Large Language Models) son diseñados para generar respuestas basadas en instrucciones y queries del usuario. En muchas aplicaciones, estos modelos operan con múltiples capas de instrucción:

- **Prompts de Sistema:** Instrucciones escondidas que definen el rol y limitaciones del modelo (por ejemplo: "Eres un asistente que ayuda, pero nunca revela sus herramientas internas o credenciales").
- **Prompts de Usuario:** Los inputs escritos por el usuario (por ejemplo: "¿Cómo reseteo mi contraseña?").

Los atacantes se han dado cuenta de que construyendo sus prompts cuidadosamente, pueden confundir al modelo o incluso explotar su seguridad. A esto se le conoce como "Input Manipulation". La forma más común de realizarla es prompt injection, donde los atacantes cambian el flujo de instrucciones y fuerzan al modelo a ignorar o bypassear restricciones.

En algunos casos, la manipulación del input puede llevar a filtraciones de prompts de sistema, exponiendo configuración o instrucciones en los que el modelo confía.

El peligro recae en la confianza puesta en estos modelos:

- Compañías que integran sus flujos (chatbots HR, asistentes IT, dashboards financieros...).
- Los usuarios asumen que sus respuestas son autoritativas y seguras.
- Los desarrolladores suelen subestimar cómo de fácil es saltarse estas restricciones.

Si los atacantes pueden manipular el modelo, pueden:

- Exfiltrar información sensible.
- Engañar al sistema para que haga peticiones no autorizadas.
- Filtrar las políticas internas o instrucciones escondidas.
- Encadenar ataques con otras vulnerabilidades.

Es importante recalcar que prompt injection no es un bug de software tradicional que puedas parchear en el modelo. Es una capacidad intrínseca que sigue cómo se diseñan los LLMs. Dicho de otra manera, no puedes eliminar completamente el prompt injection, sino que tienes que construir mitigaciones alrededor del modelo sanitizando y validando el contenido entrante.