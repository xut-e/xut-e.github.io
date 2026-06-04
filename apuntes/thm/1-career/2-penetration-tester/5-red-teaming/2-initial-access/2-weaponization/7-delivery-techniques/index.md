---
layout: apunte
title: "7. Delivery Techniques"
---

Las técnicas de entrega son uno de los factores más importantes para ganar acceso inicial. Deben parecer profesionales, legítimos y convencer a la víctima para que haga lo que se le pide.

!**Pasted image 20260603143139.png**

----------------------------------
<h2>Email Delivery</h2>
Es un método común usado para mandar el payload a través de un email de phishing con un link o un archivo adjunto. Este método adjunta un archivo malicioso que podría ser del tipo que hemos visto durante esta unidad. El objetivo es convencer a la víctima de visitar una web maliciosa o descargar y ejecutar un archivo malicioso para ganar acceso inicial a la red o host de la víctima.

Los red teamers deberían tener su propia infraestructura para propósitos de phishing. Dependiendo del engagement requerido, esto requiere configurar varias opciones en el servidor email, incluyendo DomainKeys Identified Mail (DKIM), Sender Policy Framework (SPF) y registros DNS Pointer (PTR).

Los red teamers también podrían usar servicios email de terceros como Google Gmail, Outlook, Yahoo y otras con buena reputación.

Otro método interesante sería usar una cuenta de email comprometida de una compañía para mandar phishing a otros. El email comprometido podría ser hackeado pro phishing o por otras técnicas como los ataques de spray de contraseñas.

------------------------------
<h2>Web Delivery</h2>
Otro método es hostear un payload malicioso en un servidor web controlado por red teamers. El servidor web tiene que seguir las medidas de seguridad, como registro limpio, reputación del dominio y certificado TLS.

Este método incluye otras técnicas como la ingeniería social para que la víctima visite o se descargue el archivo malicioso. Un acortador de URL es útil al usar este método.

En este método, otras técnicas pueden ser combinadas y usadas. El atacante se aprovecha de exploits zero day como explotar software vulnerable para ganar acceso.

-----------------------------------------
<h2>USB Delivery</h2>
Este método requiere que la víctima inserte el USB malicioso físicamente. Este método puede ser efectivo y útil en conferencias o eventos donde el adversario puede distribuir el USB.

A menudo, organizaciones establecen políticas estrictas sobre la desactivación de USBs en su entorno empresarial por seguridad.