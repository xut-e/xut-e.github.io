---
layout: apunte
title: "2. CIA"
---

Antes de describir algo como seguro, debemos considerar qué hace que algo lo sea. Cuando quieres juzgar la seguridad de un sistema debes pensar en la tríada de la seguridad: CIA.

- **Confidencialidad:** Se asegura de que sólo las personas destinadas a hacerlo puedan acceder a la información.
- **Integridad:** Busca asegurar que la información no ha sido alterada, además, podemos detectar cualquier alteración si ocurre.
- **Disponibilidad (Availability):** Intenta asegurar que el sistema o servicio esté disponible si se necesita.

![](/apuntes/img/Pasted image 20251030145704.png)

Consideremos la CIA relacionada a registros de pacientes y sistemas relacionados:

- **C:** De acuerdo a varias leyes modernas, los proveedores de servicios de salud deben asegurar y mantener la confidencialidad de registros médicos.
- **I:** Si el registro de un paciente se altera de forma accidental o con intenciones maliciosas, puede recibir un tratamiento erróneo, lo que puede conllevar un peligro para el paciente y multas millonarias para la empresa.
- **A:** Cuando un paciente visita una clínica, el sistema debe estar disponible. Si no, el practicante no podría acceder al registro de salud del paciente, lo que impediría el tratamiento.

El énfasis no necesita se el mismo en las tres funciones de seguridad, por ejemplo, un anuncio de la universidad no es confidencial pero necesita expresamente que sea íntegro.

----------------------------
<h2>Más allá de CIA</h2>
Yendo un paso más allá en la CIA, podemos pensar en:

- **Authenticity:** Trata de asegurar que el documento/archivo/información pertenece a la fuente que dice.
- **Nonrepudiation:** Significa que la fuente original no puede denegar ser la emisora de la información.

Sin estas dos los negocios no se pueden llevar a cabo. Ya que si te llega un pedido tienes que estar seguro de que efectivamente ese pedido ha sido el realizado y la fuente que emitió el pedido no puede denegar haberlo hecho.

----------------------------
<h2>Parkerian Hexad</h2>
En 1998, Donn Parker propuso la héxada parkera. Cuenta con seis elementos de seguridad:

1. **Availability.**
2. **Utility:** Se enfoca en la utilidad de la información. Por ejemplo si se pierde la clave de acceso a un dispositivo. Puede que el dispositivo siga disponible, pero no tiene utilidad porque no se puede acceder a la información, esta no es usable.
3. **Integrity.**
4. **Authenticity.**
5. **Confidentiality.**
6. **Possession:** Requiere que la información no sea tomada, copiada o controlada sin autorización.
