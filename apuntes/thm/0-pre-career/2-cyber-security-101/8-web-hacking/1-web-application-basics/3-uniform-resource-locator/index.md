---
layout: apunte
title: "3. Uniform Resource Locator"
---

Una URL (Uniform Resource Locator) es una dirección web que te permite acceder a todo tipo de contenido online. Guía a tu navegador hasta el recurso en cuestión, sea cual sea.

--------------
<h2>Anatomía de una URL</h2>
!**137.png**Una URL está compuesta de múltiples partes, cada una ayudando a una cosa. Aquí un desglose de los componentes:

<h5>Scheme</h5>
Es el protocolo usado para acceder a la web. El más común es HTTP/HTTPS, pero existen otros.

<h5>User</h5>
Algunas URLs pueden incluir los detalles de inicio de sesión de un usuario. De todas formas es raro verlo hoy en día, no es muy seguro.

<h5>Host/Dominio</h5>
Es la parte más importante porque te dice a qué sitio web estás accediendo. Cada dominio debe ser único y registrado. **Typosquatting** es la práctica que registra dominios muy parecidos a los originales.

<h5>Port</h5>
El número de puerto te redirecciona hacia el puerto donde se está sirviendo la página web, es como decir la puerta, los estándares son 80 para HTTP y 443 para HTTPS.

<h5>Path</h5>
El path apunta al archivo o página específica dentro del servidor web.

<h5>Query String</h5>
Es la parte de la URL que comienza con un "?". Es usado comúnmente para buscar por o configurar parámetros.

<h5>Fragment</h5>
Comienza con un "#" y ayuda a saltar hacia un sitio específico de la página.