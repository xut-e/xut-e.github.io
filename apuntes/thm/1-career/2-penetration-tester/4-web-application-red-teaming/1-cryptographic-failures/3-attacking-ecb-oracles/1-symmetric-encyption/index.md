---
layout: apunte
title: "1. Symmetric Encyption"
---

<h2>Bases de la Criptografía</h2>
La encriptación usa dos componentes principales: la key (un valor secreto usado para encriptar la información, clave) y el algoritmo de cifrado (el algoritmo usado para convertir el texto plano en ciphertext). La gente suele confundir encodeado con encriptación o viceversa pero la principal diferencia es que el encoding usa un algoritmo, no hay clave. Esto significa que el encoding no se hace para mantener la información confidencial sino para transformar la información de un formato a otro. La encriptación por otro lado aunque transforma la información, recae en la clave para asegurar que se transforma de tal manera que si se desconoce esta clave no sea suficiente para transformar la información de vuelta a su estado original.

Usando esta lógica, ROT13 es un algoritmo de encriptación, puesto que usa un algoritmo (ROT) y una clave (13). Aunque todo el mundo puede estar de acuerdo con que es un algoritmo terrible ya que puede ser crackeado fácilmente. Pero esto es importante porque hasta 1997 la encriptación recaía gravemente en mantener el algoritmo secreto, lo que no funciona cuando dicha información debe ser transmitida. NIST, el Instituto Nacional de Estándares para la Tecnología, realizó una competición para crear un nuevo algoritmo de encriptación donde el algoritmo en sí mismo fuera seguro, asegurando que la desencriptación sólo pudiera ocurrir si se conocía la clave. Hay tres conceptos fundamentales para toda la encriptación:

- **Confusión:** Para que un algoritmo de encriptación sea seguro, debemos ocultar suficientemente la relación entre nuestro texto original y el ciphertext obtenido.
- **Difusión:** Para ayudar a crear confusión entre los dos, es muy buena idea extender partes del texto plano original antes de ser transformados en el ciphertext.
- **Confianza sólo en la clave:** Como hemos mencionado antes, la encriptación puede sólo comenzar a considerarse segura si podemos distribuir libremente el algoritmo usado ya que sin la clave el ciphertext no puede ser convertido de vuelta en el mensaje original.

Así es como AES (Advance Encryption Standard) nació. AES es ampliamente usado globalmente en varias implementaciones. Sin embargo, como veremos en esta unidad, no todas las implementaciones son seguras.

Hay dos tipos principales de encriptación, llamados simétrico y asimétrico. La simétrica usa la misma clave para encriptar y desencriptar:

!**Pasted image 20260316130454.png**

>[!IMPORTANT] AES no debe ser usado tal y como es, sino como un bloque de construcción en tu algoritmo de encriptación simétrica.

