---
layout: apunte
title: "13. Proxying HTTPS"
---

Al interpretar tráfico HTTP, podemos encontrarnos un inconveniente al navegar a sitios con TLS activado. Por ejemplo, al acceder a `https://google.com/`, podemos recibir un error indicando que el Certificado de Autoridad (CA) de PortSwigger no está autorizado para una conexión segura.

!**Pasted image 20251006222056.png**

Para solucionar este problema, podemos añadir manualmente el CA de PortSwigger a nuestro navegador.

1. **Descargar el certificado CA:** Con el proxy activado ve a `http://burp/cert`. Esto descarga el `cacert.der`.
2. **Accede a Firefox:** Escribe `about:preferences` en el campo URL y dale a **Enter**. Esto te llevará a la página de ajustes de certificado de Firefox.
   !**Pasted image 20251006222519.png**
3. **Importa el CA:** En la ventana de manejo de certificados, haz click en **Import**. Selecciona el archivo.
4. **Configura confianza:** En la siguiente pestaña que aparezca, marca la opción que dice "Trust this CA to identify websites" y **OK**.
   !**Pasted image 20251006223021.png**

Ahora ya podemos visitar sitios con TLS activado sin tener errores.