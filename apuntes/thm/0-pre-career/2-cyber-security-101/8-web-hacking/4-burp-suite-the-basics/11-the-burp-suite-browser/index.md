---
layout: apunte
title: "11. The Burp Suite Browser"
---

Si la tarea anterior te pareció muy complicada, descansa. Esta será mucho más simple.

Además de poder modificar nuestro navegador para trabajar con el proxy, Burp Suite incluye su propio navegador, el cual ya está conectado con este por defecto. Simplemente haz click en `Open Browser`.

Si ejecutas Burp Suite como el usuario root, puede ser que no se te abra el navegador de Burp. Puedes solucionarlo de dos maneras:

1. Crea un nuevo usuario y ejecuta Burp Suite en una cuenta sin privilegios.
2. Ve a `Settings -> Tools -> Burp's Browser` y marca la opción `Allow Burp's browser to run without a sandbox`.
   
>[!CAUTION] Aunque esta segunda manera funciona, puede significar un riesgo de seguridad para ti, cuidado.
   
   