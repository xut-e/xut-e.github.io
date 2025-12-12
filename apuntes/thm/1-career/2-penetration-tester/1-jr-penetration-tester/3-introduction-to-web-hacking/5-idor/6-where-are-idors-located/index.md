---
layout: apunte
title: "6. Where are IDORs Located"
---

<h2>¿Dónde se encuentran los IDORs?</h2>
El endpoint vulnerable que estás atacando puede no siempre ser algo que ves en la barra de búsqueda. Podría ser contenido que tu navegador carga vía petición AJAX o algo referenciado en el archivo JavaScript.

A veces, los endpoints podrían tener un parámetro no referenciado que podría haber sido usado durante el desarrollo y se pusheó a producción. Por ejemplo, si llamas a `/user/details`, se muestra tu información por que tienes la sesión iniciada, pero mediante minería de parámetros, podrías descubrir un **user_id** que puedes usar para ver información de otros usuarios: `/user/details?user_id=123`.