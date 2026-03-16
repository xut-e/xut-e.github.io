---
layout: apunte
title: "3. Understanding Length Extension Attacks"
---

Un ataque de length extension se aprovecha de cómo ciertas funciones de hasheo procesan la información. Específicamente, funciona en funciones de hasheo como MD5, SHA-1 y SHA-256, las cuales están construidas usando algo llamado la construcción Merkle-Damgård. Estas funciones de hasheo le permiten a un atacante tomar un hash existente y añadir información extra al mensaje que representa el hash sin necesidad de de conocer el mensaje original o la clave secreta usada para crearlo. Esto funciona porque estas funciones de hasheo procesan la información en bloques con cada hash de bloque influenciando en el procesamiento del siguiente bloque. Si un atacante conoce el hash final, pueden usarlo como el estado inicial para hashear bloques adicionales, extendiendo efectivamente el mensaje original y prediciendo cuál será el nuevo hash.

--------------------------------------
<h2>¿Cómo Funciona?</h2>
Para que un ataque de length extension sea posible, el atacante necesita unas cuantas cosas: debe tener el hash del mensaje original, la longitud del mensaje original (o adivinarlo) y entender cómo funcionan las reglas de padding para dicha función de hasheo.

Las funciones de hasheo procesan información en bloques, actualizando el estado interno después de que cada bloque sea procesado. Cuando un atacante conoce el hash final, este hash representa el estado interno del algoritmo después de que todos los bloques del mensaje original hayan sido procesados. Usando este estado interno, un atacante puede continuar el proceso de hasheo, añadiendo nuevos bloques de información para crear un hash predecible para el mensaje extendido, todo sin conocer el mensaje original.

---------------------------------------
<h2>Visualizando el Ataque</h2>
Aquí una forma fácil de visualizarlo: bajo circunstancias normales, un mensaje es hasheado y tú obtienes un digest (el hash final). El proceso acaba ahí. Pero en un ataque de length extension, el atacante toma el hash final, le añade más información y continúa el proceso de hasheado. Como resultado, generan un nuevo hash válido sin necesitar conocer el input original o la clave usada.

| **Normal Hashing**                                                      | **Length Extension Attack**                                                                       |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Mensaje: "user=test"                                                    | Mensaje Original: "user=test"                                                                     |
| Se añade padding al mensaje para hacerlo del tamaño de bloque correcto. | Se añade el padding al mensaje y el atacante añade nueva información (por ejemplo "&admin=true"). |
| El hash se genera basado en el mesaje original y el padding.            | El atacante usa el hash original para generar un nuevo hash para el mensaje extendido.            |
| Resultado: Hash válido para el mensaje original.                        | Resultado: Hash predecible para el mensaje modificado sin saber la clave.                         |

---------------------------------------------
<h2>¿Por qué Funciona?</h2>
Este ataque funciona por cómo el estado interno de la función de hasheado se deriva entre bloques. Después de procesar el mensaje original, la función de hasheado sale en un estado interno específico (representado por el hash). El atacante puede tomar ese estado, añadir más información y seguir. La función no finaliza el proceso después del mensaje original, por lo que puede ser engañado para seguir hasheando la nueva información.

-----------------------------------------
<h2>Funciones de Hasheo Vulnerables</h2>
La mayoría de funciones de hasheo más comunes son vulnerables a este tipo de ataques, especialmente aquellas basadas en la construcción Merkle-Damgård:

- **MD5:** Antes popular, ahora considerada débil debido a vulnerabilidades como esta. MD5 procesa la información en bloques de 512 bits, haciéndolo un objetivo fácil para este tipo de ataques.
- **SHA-1:** Como MD5, SHA-1 usa procesamiento bloque a bloque y sufre de debilidades similares. Ha sido descartado de los sistemas de seguridad por este motivo.
- **SHA-256:** Aunque es más fuerte que MD5 y SHA-1, SHA-256 también puede ser explotado en un ataque de length extension si se usa sin medidas de protección adicionales como HMAC.

