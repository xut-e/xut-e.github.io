---
layout: apunte
title: "1. Introduction"
---

Las Operations Security (OPSEC) es un término acuñado por el ejército de los estados unidos. En el campo de la ciberseguridad, empezaremos con la definición dada por [NIST](https://csrc.nist.gov/glossary/term/opsec):

"Proceso sistemático y probado por el cual adversarios potenciales pueden ser denegados de información sobre capacidades e intenciones mediante la identificación, el control y la protección generalmente no clasificada del plan y la ejecución de actividades sensibles. El proceso incluye cinco pasos: identificación de información crítica, análisis de amenazas, análisis de vulnerabilidades, evaluación de riesgos y aplicación de contramedidas apropiadas."

Veamos la definición desde una perspectiva de red team. Como miembro de red team, tus adversarios potenciales son el blue team y terceros. El blue team es considerado adversario debido a que estamos atacando los sistemas que ellos pretenden defender. Los ejercicios red vs blue son comunes para ayudar a una organización a entender qué amenazas existen en un entorno dado y prepararse mejor si el ataque real ocurriese. Como red teamers, incluso aunque estemos obedeciendo las leyes y estemos autorizados para atacar los sistemas, no cambia el hecho de que estamos actuando contra los objetivos del blue team e intentando evitar su detección.

Denegar a cualquier potencial adversario la habilidad para obtener información sobre nuestras capacidades e intenciones es crítico para mantener OPSEC. OPCSEC es un proceso de identificación, control y protección sobre cualquier información relacionada al plan y ejecución de nuestras actividades. Los frameworks como [Lockheed Martin's Cyber Kill Chain](https://www.lockheedmartin.com/en-us/capabilities/cyber/cyber-kill-chain.html) y [MITRE ATT&CK](https://attack.mitre.org/) ayuda a los defensores a identificar los objetivos que un adversario intenta cumplir.

!**Pasted image 20260512144413.png**

El proceso de OPSEC tiene cinco pasos:

1. Identificar información crucial.
2. Analizar amenazas.
3. Analizar vulnerabilidades.
4. Evaluar riesgos.
5. Aplicar contramedidas apropiadas.

!**Pasted image 20260512144507.png**

Si el adversario descubre que estás escaneando tu red con Nmap (el blue team en nuestro caso), deberían poder fácilmente descubrir la dirección IP usada. Por ejemplo, si usas la misma IP para hostear un sitio web de phishing, no será difícil para ellos conectar los dos elementos y atribuírselos al mismo actor.

OPSEC no es un conjunto de reglas o una solución, sino un proceso de cinco pasos para denegar a los adversarios la posibilidad de ganar acceso a cualquier información crítica.