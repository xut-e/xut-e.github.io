---
layout: apunte
title: "3. General Methodology"
---

Bien, ya tenemos un punto de subida de archivos en una página web. ¿Cómo lo explotamos?

Como con cualquier tipo de hacking, la enumeración es clave. Cuanto más entendamos sobre nuestro entorno, más seremos capaces de hacer con esa información. Algunas buenas ideas son:

- Mirar el código fuente de la página.
- Escanear directorios con fuerza bruta (`gobuster`, por ejemplo).
- Interceptar peticiones de subida de archivos con BurpSuite.
- Extensiones como Wappalyzer pueden ofrecer información valiosa en un vistazo.

Con un entendimiento básico de cómo la web trata nuestro input, podemos tratar de tocar por algunos sitios y ver qué y qué no podemos subir. Si el sitio web usa filtros del lado del cliente, podemos buscar estos filtros e intentar bypassearlos. Si usa filtros del lado del servidor, debemos adivinar qué busca el filtro e intentar algo ligeramente diferente. Subir archivos destinados a provocar errores puede ser muy útil. Herramientas como Burp Suite u OWASP Zap pueden ser de gran ayuda en esta fase.