---
layout: apunte
title: "3. WHOIS"
---

En la lección anterior hemos visto cómo el nombre de dominio se resuelve en una dirección IP. De todas formas, para que esto pase, alguien tiene que tener la autoridad de configurar los registros A, AAAA y MX.

Puedes registrar cualquier nombre de dominio disponible  durante uno o más años. Necesitas pagar la tasa anual y se requiere que ofrezcas información de contacto detallada como el registrador. Esta información es parte de la información disponible mediante los registros WHOIS y disponible públicamente. Si quieres hacerlo de manera privada puedes recurrir a herramientas que ocultan tu información de los registros WHOIS.

Puedes ver los detalles de cualquier dominio registrado haciendo `whois <dominio>`, en los sistemas Linux.

Aquí un ejemplo de un dominio protegido de manera privada:

```bash
user@TryHackMe$ whois [REDACTED].com 
[...] 
Domain Name: [REDACTED].COM Registry 
Domain ID: [REDACTED] Registrar WHOIS 
Server: whois.godaddy.com Registrar 
URL: https://www.godaddy.com 
Updated Date: 2017-07-05T16:02:43Z 
Creation Date: 1993-04-02T00:00:00Z 
Registrar Registration Expiration Date: 2026-10-20T14:56:17Z 
Registrar: GoDaddy.com, LLC Registrar IANA 
ID: 146 Registrar 
Abuse Contact Email: abuse@godaddy.com 
Registrar Abuse Contact Phone: +1.4806242505 
[...] 
Registrant Name: Registration Private 
Registrant Organization: Domains By Proxy, LLC 
Registrant Street: DomainsByProxy.com 
[...]
```
