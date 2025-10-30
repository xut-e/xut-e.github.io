---
layout: apunte
title: "9. Security Headers"
---

<h2>Headers de Seguridad</h2>
Los headers de seguridad HTTP ayudan a mejorar la seguridad en general de las aplicaciones web ofreciendo mitigaciones frente a ataques como XSS, clickjacking y otros. Nos meteremos más en profundidad con los siguientes:

- Content-Security-Policy (CSP)
- Strict-Transport-Security (HSTS)
- X-Content-Type-Options
- Referrer-Policy

Puedes usar un sitio web como https://securityheaders.io/ para analizar los headers de seguridad de cualquier sitio web.

---------------
<h2>Content-Security-Policy</h2>
Un header CSP es una capa adicional de seguridad que puede ayudar a mitigar ataques comunes como Cross-Site Scripting (XSS). Código malicioso podría estar hosteado en una web separada o dominio diferente y ser inyectada. Un CSP permite a los administradores decir qué webs o recursos son seguros.

Dentro del propio header puedes ver propiedades como `default-src` o `script-src`. Cada uno de estos parámetros da opciones al administrador para definir varios niveles de seguridad. El uso de `self` es una palabra clave especial que refleja el nombre del mismo dominio desde el que se hostea el sitio web. Viendo un ejemplo:

`Content-Security-Policy: default-src 'self'; script-src 'self' https://cdn.tryhackme.com; style-src 'self'`

Vemos el uso de:

- **default-src**
  Que especifica la política por defecto de self.
  
- **script-src**
  Que especifica la política desde dónde pueden ser cargados los scripts, self y otro dominio.
  
- **style-src**
  Que especifica la política desde dónde se puede cargar el estilo CSS, self en este caso.

-----------------------
<h2>Strict-Transport-Security (HSTS)</h2>
El header HSTS asegura que el navegador web siempre se conectará a través de HTTPS. Veamos un ejemplo:

`Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`

Aquí un desglose:

- **max-age**
  Este es el tiempo de expiración en segundos para este ajuste.
  
- **includeSubDomains**
  Un ajuste opcional que le dice al navegador que aplique este ajuste a todos los subdominios.
  
- **preload**
  Este ajuste opcional permite que el sitio web sea incluido en listas de pre-carga. Los navegadores pueden usarlas para reforzar HSTS.

---------------------
<h2>X-Content-Type-Options</h2>
El header X-Content-Type-Options puede ser usado para indicar al navegador que no debe adivinar el tiempo MIME (Multipurpose Internet Mail Extensions). Aquí un ejemplo:

`X-Content-Type-Options: nosniff`

Aquí hay un desglose:

- **nosniff**
  Esta directiva indica al navegador no esnifar (averiguar) o adivinar el tipo de MIME.

-----------------
<h2>Referrer-Policy</h2>
Este header controla la cantidad de información mandada al servidor de destino cuando un usuario es redireccionado desde la fuente, como un hiperlink. El header es capaz de permitir a un administrador web controlar qué información se comparte. Algunos ejemplos: 

- `Referrer-Policy: no-referrer`
- `Referrer-Policy: same-origin`
- `Referrer-Policy: strict-origin`
- `Referrer-Policy: strict-origin-when-cross-origin`
  
Aquí un desglose:

- **no-referrer**
  Este desactiva que cualquier información sea mandada sobre el referrer.
  
- **same-origin**
  Esta política sólo mandará información del referrer cuando la destinación es parte del origen. Es útil cuando quieres que el referrer se mande cuando el hiperlink está dentro de la misma página pero no hacia otras.
  
- **strict-origin**
  Esta política sólo manda el referrer como el origen cuando el protocolo se mantiene, es decir, que un referrer es mandado cuando una conexión HTTPS es mandada a otra HTTPS.
  
- **strict-origin-when-cross-origin**
  Similar a strict-origin excepto por las peticiones same-origin, donde manda la URL completa en el header origin.
  
