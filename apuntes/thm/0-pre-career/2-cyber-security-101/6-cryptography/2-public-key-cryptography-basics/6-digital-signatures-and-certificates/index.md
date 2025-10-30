---
layout: apunte
title: "6. Digital Signatures and Certificates"
---

En el mundo analógico se te pide firmar un papel de vez en cuando. El propósito puede variar dependiendo de la situación. Puede significar que aceptas unos términos, autorizas una transacción o confirmas haber recibido algo. En el mundo digital necesitas una firma digital.

---------------
<h2>¿Qué es una firma digital?</h2>
Las firmas digitales ofrecen una manera de verificar la autenticidad e integridad de un mensaje o documento digital. Probar la autenticidad de los archivos significa que sabemos quién ha creado o modificado dicho archivo. Usando encriptación asimétrica, podemos producir una firma con nuestra clave privada, que puede ser verificada usando la clave pública. Sólo tú deberías tener acceso a tu clave privada, lo que significa que tú firmaste ese documento. En los países modernos las firmas analógicas y digitales tienen la misma validez.

La forma más sencilla de hacer una firma digital es encriptando el documento con tu clave privada. Si alguien quisiera verificar esta firma, desencriptarían el documento usando tu clave pública.

![](/apuntes/img/132.jpg)

Algunos artículos se refieren a firma electrónica y firma digital indistintamente, pero no son lo mismo. Pegar una foto encima de un documento no es una manera real de comprobar autenticidad porque cualquier persona puede hacerlo.

Aquí usamos firma digital para referirnos a firmar un documento usando claves privadas o certificados.

-----------
<h2>Certificados: ¡Prueba quién eres!</h2>
Los certificados son una aplicación esencial de la criptografía pública y están vinculados a firmas digitales. Un sitio común de su uso es HTTPS. ¿Cómo sabe tu navegador que el servidor con el que estás hablando es realmente tryhackme.com?

La respuesta recae en los certificados. El servidor tiene un certificado que acredita que es tryhackme.com. Los certificados son sólo confiados si la CA (Certification Authority) lo corrobora. Es una cadena: El certificado está firmado por una organización, la organización es confiada por la CA, la CA es confiada por tu navegador.

Digamos que tenemos una web y queremos usar HTTPS. Necesitaremos un certificado digital TLS. Podemos obtener uno de varias CAs por una cuota anual. Además puedes conseguir tus propios certificados TLS para tus dominios en propiedad usando [Let's Encrypt](https://letsencrypt.org/) de manera gratuita.