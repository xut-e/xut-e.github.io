---
layout: apunte
title: "3. Decoder - Hashing"
---

Además de su funcionalidad de Encodear/Decodear, el Decoder también ofrece la habilidad de generar hashsums para la información.

--------------------------------
<h2>Teoría</h2>
Hashing es un proceso de una dirección que transforma la información en una firma única. Para que una función se clasifique como un algoritmo de hashing, el output que genera debe ser irreversible. Un algoritmo bueno asegura que cada input de información tenga un único hash. Es por esto que generalmente se utilizan para confirmar la integridad de un archivo.

>[!CAUTION] El algoritmo MD5 está deprecado y no debe usarse para aplicaciones contemporáneas.

Además los hashes se usan para almacenar contraseñas de forma segura ya que como es un proceso unidireccional no puede ser descifrado y por lo tanto las hace "seguras" aunque se filtre la base de datos. Lo que pasa para que esto ocurra es:

1. Intentas entrar con una contraseña. 
2. Se hashea y se comprueba ese hash con el guardado.
3. Si es igual te permite entrar y si no, no.

--------------------------------
<h2>Hashear en el Decoder</h2>
El Decoder nos permite crear hashsums de información directamente en Burp Suite. Opera de manera similar al encoder/decoder. Hacemos click en el menú desplegable `Hash` y seleccionamos el que queramos.

!**Pasted image 20251116210530.png**

Es una lista bastante larga.

El output de un algoritmo de hasheo no es ASCII/Unicode por lo que compete encodearlo aplicando ASCII Hex:

!**Pasted image 20251116210858.png**

