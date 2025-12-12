---
layout: apunte
title: "5. Practical Example"
---

El repetidor está particularmente bien equipado para tareas repetitivas de peticiones similares, típicamente con modificaciones menores. Esto es particularmente útil para actividades como el testeo manual de SQLi, intentar sobrepasar los filtros del firewall o ajustar parámetros en un formulario.

Comencemos por una actividad sencilla, manipular los headers que una aplicación manda a un servidor. Abre Burp Suite, captura una petición y añádele un header nuevo llamado `FlagAuthorised` y configúrala en `True`.

------------------------
<h2>Challenge</h2>
1. Abrimos Burp Suite.
   !**Pasted image 20251114202144.png**
2. Nos dirigimos a proxy, abrimos el navegador, le damos a interceptar y vamos a la página dada.
   !**Pasted image 20251114202312.png**
3. La mandamos al repetidor.
   !**Pasted image 20251114202343.png**
4. Añadimos el header que nos piden.
   !**Pasted image 20251114202536.png**
5. Vemos la petición y le damos a mandar.
   !**Pasted image 20251114202615.png**
6. Observamos que la respuesta contiene la flag.
   !**Pasted image 20251114202642.png**