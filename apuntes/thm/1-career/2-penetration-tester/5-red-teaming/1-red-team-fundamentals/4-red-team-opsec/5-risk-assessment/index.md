---
layout: apunte
title: "5. Risk Assessment"
---

Hemos terminado de analizar las vulnerabilidades, ahora podemos proceder con el cuarto paso: realizar una evaluación de riesgos. [NIST](https://csrc.nist.gov/glossary/term/risk_assessment) define una evaluación de riesgos como "El proceso de identificar riesgos de las operaciones de organización (incluyendo misión, funciones, imagen, reputación), activos de organización, individuos, otras organizaciones, y la nación, resultado de la operación de un sistema informático." En OPSEC, la evaluación de riesgos requiere la concienciación de que un evento ocurra junto al coste esperado de dicho evento. Consecuentemente, esto incluye evaluar la habilidad del adversario para explotar las vulnerabilidades.

!**Pasted image 20260512152437.png**

Una vez que el nivel de riesgo es determinado, las contramedidas se consideran para mitigar ese riesgo. Necesitamos considerar los siguientes tres factores:

1. La eficiencia de la contramedida en la reducción del riesgo.
2. El coste de la contramedida en comparación al impacto de la explotación de la vulnerabilidad.
3. La posibilidad de que la contramedida pueda revelar información al adversario.

Veamos dos ejemplos de tareas anteriores. En el primer ejemplo, consideramos la vulnerabilidad de escanear una red con Nmap, usar Metasploit y hostear una página de phishing usando la misma IP. Analizamos que esta vulnerabilidad hace muy sencillo para los adversario bloquear toda nuestra actividad. Ahora evaluemos el riesgo. Para evaluar el riesgo relacionado a esta vulnerabilidad, necesitamos afrontar la posibilidad de que una o más de estas actividades sea detectada. No podemos responder esto sin conocer las capacidades del adversario. Consideremos que el cliente tiene un SIEM. Podemos comprender que un SIEM haría la tarea de detección no muy complicada. Como resultado, podríamos evaluar el riesgo relacionado como alto. Por otro lado, si sabemos que nuestro adversario tiene recursos mínimos para detectar eventos de seguridad, podemos evaluar el riesgo asociado a la vulnerabilidad como bajo.

Consideremos el segundo ejemplo de una base de datos no securizada correctamente donde almacenamos la información recibida por la página de phishing. Basado en la información recolectada de varios grupos de investigación usando honeypots, podemos esperar que varios bots maliciosos apunten a nuestra IP en internet. Por lo que sólo es cuestión de tiempo que uno de estos encuentre la base de datos, que si no está securizada, expondrá información crítica, por lo que podemos evaluar el riesgo asociado a esta vulnerabilidad como alto.