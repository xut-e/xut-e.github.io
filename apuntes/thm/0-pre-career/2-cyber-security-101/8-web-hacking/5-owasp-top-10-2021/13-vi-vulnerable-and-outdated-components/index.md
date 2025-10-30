---
layout: apunte
title: "13. VI. Vulnerable and Outdated Components"
---

De forma ocasional, podemos encontrar que la compañía o entidad que estamos auditando usa un software que tiene una vulnerabilidad bien conocida.

Por ejemplo, digamos que una compañía no ha actualizado su versión de WordPress desde hace años, y usando una herramienta como [WPScan](https://wpscan.com/), encontramos que es la versión 4.6. Una búsqueda rápida revelará que esta versión es vulnerable a ejecución remota de comandos sin autentificación (RCE) y puedes encontrar un exploit ya hecho en [Exploit-DB](https://www.exploit-db.com/exploits/41962).

Como puedes imaginar, esto sería devastador porque requiere muy poco trabajo del lado del atacante. La situación se agrava cuando te das cuenta de lo relativamente común que es esto.