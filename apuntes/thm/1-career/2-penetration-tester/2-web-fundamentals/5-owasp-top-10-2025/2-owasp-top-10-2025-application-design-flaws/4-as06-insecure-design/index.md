---
layout: apunte
title: "4. AS06 - Insecure Design"
---

<h2>¿Qué es?</h2>
El diseño inseguro ocurre cuando se construye un sistema con un fallo de lógica o arquitectura. Estas debilidades van desde saltarse el modelado de amenazas o no requerimientos/comprobaciones de diseño hasta errores accidentales.

Además, con la introducción de modelaje con asistentes de IA, estos exacerban estos diseños inseguros. Los desarrolladores suelen asumir que los modelos son seguros, correctos o que su código no tiene fallos. Nada más lejos de la realidad.

---------------------------------------
<h2>Ejemplo</h2>
Un buen ejemplo es Clubhouse. Su diseño temprano asumía que los usuarios sólo interactuarían a través de la app de móvil, por lo que el backend API no contaba con autentificación adecuada. Cualquiera podía mandar queries para obtener información de usuarios, rooms e incluso conversaciones privadas.

---------------------------------------------
<h2>¿Por qué importa?</h2>
No puedes parchear un diseño inseguro, está construido en el workflow, la lógica y las fronteras de confianza. Arreglarlo implica repensar cómo los sistemas (y ahora la IA también) toman las decisiones.

-----------------------------------
<h2>Diseño Inseguro en 2025</h2>
- Controles de lógica de negocio débiles.
- Asunción erróneas sobre el comportamiento del usuario/modelo.
- Componentes IA sin autoridad o acceso adecuado.
- Guardas faltantes para agentes LLM y de automatización.
- Bypasses de testeo o debug dejados en producción.
- Reviews de casos de abuso o modelos de amenaza IA inconsistentes.

---------------------------------------
<h2>Diseño Inseguro en la Era de la IA</h2>
La IA introduce nuevos tipos de fallos de diseño. Por ejemplo, la inyección de prompts ocurre cuando el input de un usuario se mezcla con prompts de sistema. La confianza ciega en el output del modelo crea sistemas frágiles que actúan con decisiones de IA sin validación. Cuando se trata de modelos envenenados, tomados de fuentes no verificadas, pueden contener comportamientos ocultos o backdoors que comprometan el sistema desde dentro.

------------------------------------
<h2>¿Cómo diseñar de forma segura?</h2>
- Trata cada modelos como no fiable hasta demostrar lo contrario.
- Valida y filtra todos los inputs y outputs para asegurar precisión e integridad.
- Separa los prompts de sistema del contenido del usuario.
- Mantén la información sensible fuera de prompts a no ser que sea absolutamente necesario y en tal caso protégela de manera estricta.
- Usa revisión humana para acciones de IA de alto riesgo.
- Registra la proveniencia del modelo y el comportamiento y aplica privacidad diferencial para información sensible.
- Incluye modelos de amenaza específicos de IA para ataques de prompts, mal uso del agente y cadena de suministro.
- Construye el modelado de amenazas durante todas las fases del desarrollo, no sólo al inicio.
- Define requerimientos de seguridad claros para cada funcionalidad antes de su implementación.
- Aplica el principio de los menores privilegios en usuario, APIs y servicios.
- Asegura autentificación, autorización y manejo de sesiones adecuadas a lo largo del sistema.
- Mantén verificadas las dependencias, componentes de terceros y recursos de la cadena de suministro.
- Monitoriza y testea el sistema continuamente en busca de fallos de lógica, paths de abuso y riesgos emergentes.

------------------------------------------------
<h2>Reto</h2>
Navega al puerto `5005` de la IP dada. ¿Han asumido que sólo dispositivos móviles pueden acceder?

1. Vamos a la página dada.
   !**Pasted image 20251219162451.png**
2. Sabemos que hay una api así que vamos a probar a mandar un escaneo a `/api`.
   !**Pasted image 20251219164328.png**
3. Vemos el endpoint `/users` así que vamos a ver qué hay en él.
   !**Pasted image 20251219163852.png**
4. Haciendo un poco de ejercicio mental, nos hablan de mensajes, pero no hay mensajes por ningún lado. Tenemos los usuarios, por lo que probaremos a ver si en el directorio `/messages` hay algo, aunque no lo hayamos encontrado en el escaneo.
   !**Pasted image 20251219163933.png**

