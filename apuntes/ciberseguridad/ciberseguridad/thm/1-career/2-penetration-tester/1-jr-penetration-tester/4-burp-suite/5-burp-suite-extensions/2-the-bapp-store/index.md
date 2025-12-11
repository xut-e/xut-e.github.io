---
layout: apunte
title: "2. The BApp Store"
---

En Burp Suite, la BApp Store (Burp App Store) nos permite descubrir e integrar fácilmente extensiones oficiales en la herramienta. Las extensiones pueden ser escritas en varios lenguajes siendo Java y Python los más comunes. Las extensiones de Java se integran automáticamente con el framework de Burp Suite, mientras que aquellas hechas en pyhton requieren del interpretador Jython.

Para ver cómo se hace vamos a instalar una extensión de Java, el [Request Timer](https://github.com/portswigger/request-timer), desarrollada por Nick Taylor. La extensión Request Timer nos permite registrar el tiempo que toma a cada petición recibir la respuesta. Muy útil para descubrir e investigar vulnerabilidades basadas en tiempo (como Time-Based SQLi).

1. Ve a la subpestaña **BApp Store** en la pestaña Extensions en Burp Suite.
2. Usamos la función de búsqueda para encontrar **Request Timer**. Sólo debería de haber un resultado para esta extensión.
3. Hacemos click en la extensión devuelta para ver más detalles.
4. Le damos a **Install** para instalar la extensión.

!**Pasted image 20251117095939.png**

Después de instalarla exitosamente, veremos que aparece una nueva pestaña en el menú principal arriba. Las extensiones pueden tener comportamientos diferentes.