---
layout: apunte
title: "1. Introduction"
---

<h2>¿Qué es File Inclusion (Inclusión de Archivos)?</h2>
Esta unidad apunta a equiparte con los conocimientos esenciales para explotar las vulnerabilidades de inclusión de archivos, incluyendo LFI, RFI y Directory Traversal. Ademaás, veremos los riesgos de estas vulnerabilidades y cómo remediarlas.

En algunos casos, las aplicaciones web se escriben para pedir acceso a archivos nen ciertos sistemas, incluir imágenes, texto estático y más vía parámetros. Los parámetros son strings query añadidas a la URL y sirven para recuberar información o realizar acciones.

!**Pasted image 20251104144444.png**

Por ejemplo, Google usa parámetros para buscar lo introducido por el usuario: `https://www.google.com/search?q=TryHackMe`. Por ejemplo, si un usuario quiere mostrar su CV en la página web, la petición puede verse algo como: `http://webapp.thm/get.php?file=userCV.pdf`, donde file es el parámetro y userCV.pdf el archivo.

!**Pasted image 20251104144703.png**

---------------------------------
<h2>¿Por qué ocurren las vulnerabilidades de File Inclusion?</h2>
Se encuentran comúnmente en varios lenguajes de programación de aplicaciones web, como PHP. EL principal problema es la validación del input, en el que el input del usuario no está correctamente validado y sanitizado.

--------------------------------------
<h2>¿Cuál es el riesgo del File Inclusion?</h2>
Un atacante podría exfiltrar información e incluso ganar acceso (RCE).