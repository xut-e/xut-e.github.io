---
layout: apunte
title: "7. Maltego"
---

[Maltego](https://www.maltego.com/) es una aplicación que mezcla el mapeo mental con el OSINT. En general, podrías empezar con un nombre de dominio, el nombre de la compañía, el nombre de una persona, una dirección de correo electrónico. Luego dejar que esa pieza de información sufriera varias transformaciones.

La información recolectada en Maltego puede ser usada en fases futuras. Por ejemplo, información de la compañía, nombres de contacto y direcciones email recolectadas pueden ser usadas para crear emails de phishing de apariencia totalmente legítima.

Piensa en cada bloque en el gráfico de Maltego como una entidad. Una entidad puede tener valores que lo describan. En terminología de Maltego, una transformada es una pieza de código que hace una petición a una API para recuperar información relacionada a una entidad específica. La lógica se muestra en la imagen inferior. La información de una entidad pasa por una transformada para devolver cero o más entidades.

!**Pasted image 20260522202141.png**

Es crucial mencionar que algunas de las transformadas disponibles en Maltego, pueden conectarse activamente al sistema objetivo, Por lo que es mejor saber cómo la transformada funciona antes de usarla si quieres limitarte al reconocimiento pasivo.

Cada transformada puede llevar a diferentes valores nuevos. Por ejemplo, si comenzamos con "DNS Name" `cafe.thmredteam.com`, podemos esperar obtener nuevos tipos de entidades basadas en la transformada que usamos. Por ejemplo "To IP Address" nos devolverá direcciones IPs.

!**Pasted image 20260522202726.png**

Una forma de conseguir esto con Maltego es hacer click derecho en el "DNS Name" `cafe.thmredteam.com` y elegir:

1. Transformadas estándar.
2. Resolver a IP.
3. To IP Address (DNS)

Después de ejecutar esta transformada, obtendríamos más direcciones IP como se muestra:

!**Pasted image 20260522202843.png**

Podemos entonces elegir aplicar otra transformada a una de las direcciones IP. Considera la siguiente:

1. DNS desde IP.
2. A Nombre DNS desde DNS pasivo (Robtex)

Esta transformada poblará nuestro gráfico con los nuevos nombres DNS. Con un par más de clicks, puedes conseguir la localización de la dirección IP y demás. El resultado puede verse así:

!**Pasted image 20260522203020.png**

Los dos ejemplos de arriba deberían darte una idea del flujo de trabajo al usar Maltego. Puedes observar que todo el trabajo está basado en transformadas, y Maltego te ayudará a mantener los gráficos organizados. Obtendrías los mismos resultados que haciendo peticiones a diferentes páginas webs y bases de datos online. Sin embargo, Maltego te ayuda a mantener toda la información que necesitas en unos clicks.

Hemos experimentado con `whois` y `nslookup` en tareas anteriores. Obtenemos varia información. desde nombres y direcciones de correo a direcciones IP. Los resultados de `whois` y `nslookup` son mostrados visualmente en el siguiente gráfico de Maltego. Interesantemente, las transformadas de Maltego son capaces de extraer y organizar la información devuelta por la base de datos WHOIS. Aunque el email devuelto no fue útil debido a protecciones de seguridad, merece la pena fijarse en cómo Maltego puede extraer la información y cómo se presenta.

!**Pasted image 20260522203611.png**

Ahora que hemos aprendido cómo el poder de Maltego surge de sus transformadas, la única cosa lógica es hacer a Maltego más poderoso añadiendo nuevas transformadas. Las transformadas son normalmente agrupadas en diferentes categorías basadas en tipos de datos, precios, objetivos y audiencia. Aunque muchas transformadas pueden ser usadas con la edición de comunidad de Maltego, otras requieren una suscripción pagada.

!**Pasted image 20260522203820.png**

Usar Maltego requiere activación tanto si usas CE como una suscripción pagada, visita el [Hub de Transformadas de Maltego](https://www.maltego.com/transform-hub/) para obtener más información.

