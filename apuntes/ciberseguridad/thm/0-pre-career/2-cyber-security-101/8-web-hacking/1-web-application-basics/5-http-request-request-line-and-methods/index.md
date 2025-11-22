---
layout: apunte
title: "5. HTTP Request - Request Line and Methods"
---

Una petición HTTP es lo que un usuario manda a un servidor para interactuar con una aplicación web y hacer que algo pase. Ya que estas peticiones son normalmente el primer punto de contacto entre el usuario y el servidor es muy importante saber bien cómo funcionan.

!**138.png**

Imagina una petición HTTP mostrando las partes clave como el método, ruta y versión. Estos elementos hacen lo básico de cómo se comunican el servidor y el cliente.

-----------------------
<h2>Request Line</h2>
La línea de petición (o start line) es la primera parte de una petición HTTP y le dice al servidor qué tipo de petición es. Tiene tres partes principales: el método HTTP, la ruta URL y la versión HTTP.

Ejemplo: `METHOD /path HTTP/version`

<h3>Métodos</h3>
Los métodos HTTP le dicen al servidor qué acción el usuario quiere llevar a cabo en el recurso identificado por la ruta URL. Aquí unos de los métodos más comunes y utilizados.

------------
<h6>GET</h6>
Usado para extraer información del servidor sin hacer cambios. Recuerda exponer sólo información que el usuario pueda ver. Evita poner información sensible como tokens o contraseñas.
<h6>POST</h6>
Manda información al servidor, usualmente para crear o actualizar algo. Valida y limpia SIEMPRE el contenido para evitar ataques como SQLI y XSS.
<h6>PUT</h6>
Reemplaza o actualiza algo en el servidor, recuerda validar que el usuario esté autorizado para hacer estos cambios antes de hacerlos.
<h6>DELETE</h6>
Borra algo del servidor, recuerda, como con PUT, validar que el usuario tenga los permisos correspondientes para llevar a cabo esta acción.

A parte de los métodos más comunes, aquí otros:

<h6>PATCH</h6>
Actualiza un recurso. Es útil para hacer pequeños cambios sin reemplazar la web entera, pero valida la información aportada para evitar inconsistencias.
<h6>HEAD</h6>
Funciona como un GET pero sólo devuelve los headers, útil para comprobar metadata sin descargar el contenido completo.
<h6>OPTIONS</h6>
Te dice qué métodos están disponibles para un recurso específico.
<h6>TRACE</h6>
Similar a OPTIONS, te dice qué métodos están disponibles, con propósito de debugging. Muchos servidores lo desactivan por motivos de seguridad.
<h6>CONNECT</h6>
Usado para crear una conexión segura, como para HTTPS. No es tan común pero es crítica para la comunicación encriptada.

----------------------
<h3>Ruta URL</h3>
La ruta URL le dice al servidor dónde encontrar el recurso al cual el usuario está intentando acceder. Por ejemplo, en la URL `https://tryhackme.com/api/users/12`, la ruta `/api/users/123` identifica a un usuario específico.

Los atacantes comúnmente intentan manipular la ruta URL para explotar vulnerabilidades, así que es crucial:

- Validar la ruta URL para prevenir acceso no autorizado.
- Sanitizar la ruta para evitar ataques de inyección.
- Proteger la información sensible.

-----------------------------
<h3>Versión HTTP</h3>
La versión HTTP muestra la versión del protocolo usada para comunicarse entre el cliente y el servidor. Aquí una vista rápida de los usos más comunes.

<h6>HTTP/0.9 (1991)</h6>
La primera versión, solo soportaba GET.
<h6>HTTP/1.0 (1996)</h6>
Incrementó headers y mejor soporte para diferente tipo de contenido.
<h6>HTTP/1.1 (1997)</h6>
Trajo conexiones persistentes, encoding y mejor cacheo. Ampliamente usado hasta nuestra fecha.
<h6>HTTP/2 (2015)</h6>
Introdujo funcionalidades como multiplexing, compresión de headers y priorización para actuación más rápida.
<h6>HTTP/3 (2022)</h6>
Construido en HTTP/2, pero usa un nuevo protocolo (QUIC) para conexiones más rápidas y seguras.

Aunque HTTP/2 y HTTP/3 ofrecen mejor rapidez y seguridad, muchos sistemas todavía usan HTTP/1.1 porque tiene buen soporte y funciona con casi todos los setups existentes. Sin embargo evolucionar hacia HTTP/2 o HTTP/3 puede tener mejoras significativas en términos de eficiencia y seguridad.