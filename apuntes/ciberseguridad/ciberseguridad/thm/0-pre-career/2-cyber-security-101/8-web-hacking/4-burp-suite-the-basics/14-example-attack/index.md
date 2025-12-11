---
layout: apunte
title: "14. Example Attack"
---

Habiendo visto cómo configurar y como usar nuestro proxy, veamos un ejemplo real simplificado:

Empezaremos visitando el formulario "Support" en `http://IP/ticket/`.

!**Pasted image 20251006223732.png**

En un pentest de apps web real, testearíamos esto vara una variedad de vulnerabilidades, una de ellas será Cross-Site Scripting (XSS). Si todavía no has visto XSS, se puede pensar como inyectar scripts del lado del cliente (usualmente en JavaScript) en la página web, de tal manera que se ejecuta. Hay varios tipos de XSS, este que veremos es "Reflected" ya que sólo afecta a la persona haciendo la petición.

--------------------
<h2>Walkthrough</h2>
Escribe `<script>alert("Succ3ssful XSS")</script>` en el campo de "Contact Email". Hay un filtro del lado del cliente que nos impide ingresar caracteres especiales, pero esto es fácil de bypassear.

Para ello enviamos la petición con campos válidos y capturamos esta con Burp Suite, donde la cambiaremos. Después hacemos click en **Forward** para dejarla pasar y obtenemos lo esperado.

!**Pasted image 20251006224730.png**
