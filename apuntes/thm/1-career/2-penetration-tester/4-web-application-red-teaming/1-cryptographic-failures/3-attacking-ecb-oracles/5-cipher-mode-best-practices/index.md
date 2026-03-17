---
layout: apunte
title: "5. Cipher Mode Best Practices"
---

<h2>Pentesters</h2>
Ver una implementación de ECB debería hacer saltar tus alertas. Esto puede sonar tonto, pero se han encontrado casos en internet tan tardíos como 2022. A veces puedes tener que enumerar para ver si ECB se está usando. Como se ha mostrado en esta room, una buena manera es usar una imagen, lo que puede mostrar patrones reconocibles en el ciphertext.

-------------------------------
<h2>Medidas de Mitigación para Desarrolladores</h2>
Es crítico asegurar que no usen modos de cifrado inseguros, como ECB. En su lugar, modos como AES-GCM o AES-CCM deberían ser usados, especialmente cuando el ciphertext se calcula usando datos del usuario y se le devuelve a este.
