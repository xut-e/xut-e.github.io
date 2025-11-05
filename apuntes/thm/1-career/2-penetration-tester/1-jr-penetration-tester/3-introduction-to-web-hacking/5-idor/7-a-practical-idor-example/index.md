---
layout: apunte
title: "7. A practical IDOR Example"
---

1. Vamos a la página dada y nos registramos
   !**Pasted image 20251104142403.png**
2. Si vamos a la pestaña de información vemos que los parámetros están rellenos automáticamente, así que vamos a investigar cómo se llenan:
   !**Pasted image 20251104142457.png**
3. Si abrimos las herramientas de desarrollador y buscamos en la pestaña network, podemos ver un parámetro **customer?id=X**.
   !**Pasted image 20251104142658.png**
4. Si le damos click derecho y a editar y volver a mandar, podemos modificar el valor a la izquierda y mandarlo de nuevo:
   !**Pasted image 20251104142830.png**
5. Cambiamos el valor a "1" y a "3" y los mandamos:
   !**Pasted image 20251104142910.png**
6. Si hacemos doble click en el parámetro podemos ver la respuesta del servidor:
   !**Pasted image 20251104143006.png**
   !**Pasted image 20251104143102.png**

