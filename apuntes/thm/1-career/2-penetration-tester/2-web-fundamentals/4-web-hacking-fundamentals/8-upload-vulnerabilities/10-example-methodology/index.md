---
layout: apunte
title: "10. Example Methodology"
---

Hemos visto varios tipos de filtro ya, tanto del lado del cliente como del lado del servidor. En la próxima tarea realizaremos un reto black-box, así que vamos a ver cómo es una metodología de acercamiento para este tipo de reto.

1. Lo primero que deberíamos hacer es mirar la página web entera. Usando extensiones de navegador como Wappalyzer, o a mano, buscaríamos indicadores de lenguages y frameworks que usan las aplicaciones web. Un buen comienzo manual sería mandar una petición a la web e interceptarla con Burp Suite buscando headers como `server` o `x-powered-by`. También buscaríamos vectores potenciales de ataque.
2. Habiendo encontrado una página de subida, intentaríamos inspeccionarla más a fondo. Mirando el código fuente en busca de scripts del lado del cliente para determinar si hay algún tipo de filtro del lado del cliente.
3. Luego intentaríamos subir un archivo completamente inocente. Desde ahí buscaríamos a ver cómo se accede a nuestro archivo. En este paso es donde herramientas como `gobuster` entran en juego. Este paso es extremadamente importante pues no sólo nos da un mejor entendimiento de la web, sino que nos da una idea de archivos aceptados en los que podemos basar nuestra investigación futura. Un parámetro muy útil es `-x`, que nos permite listar archivos, Por ejemplo con `-x php,txt,html`.
4. Sabiendo cómo y dónde se suben nuestros archivos, intentaríamos una subida de archivos maliciosa, bypasseando cualquier filtro del lado del cliente. Según el error que devuelva el servidor haríamos una cosa u otra.

Asumiendo que nuestro archivo ha sido parado por el servidor, aquí tienes algunas formas de asegurarte qué tipo de filtros del lado del servidor hay:

- Si puedes subir un archivo con una extensión totalmente inválida (`test.invalidfileextension`),  lo más probable es que el servidor esté usando una blacklist para filtrar extensiones.
- Prueba a subir el archivo inocente de nuevo pero cambia los magic numbers. Si falla, sabes que el servidor usa un filtro de magic numbers.
- Ahora prueba a resubir tu archivo inocente pero intercepta la petición en Burp Suite y cambia el tipo MIME a algo que esperarías que fuese filtrado. Si falla sabes que el filtro está basado en tipos MIME.
- Enumerar tamaño de archivos se basa en empezar subiendo un archivo pequeño e ir incrementando su tamaño hasta dar con el límite.