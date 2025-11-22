---
layout: apunte
title: "4. Diffie-Hellman Key Exchange"
---

Uno de los retos de usar la encriptación simétrica es compartir la clave secreta. Lo más cómodo para mandarla sería tener un canal de comunicación secreto.

------------
<h2>Intercambio de Clave Diffie-Hellman</h2>
El intercambio de claves tiene como objetivo establecer un secreto compartido entre dos partidos. Es un método que permite que dos partes establezcan un canal de comunicación seguro para compartir secretos sin requerir un secreto compartido previo y sin que un observador pueda obtenerla.

Consideremos el siguiente escenario:

Alice y Bob quieren hablar de forma segura. Quieren establecer una clave para criptografía simétrica pero no quieren usar criptografía asimétrica para el intercambio de clave. Aquí entra en juego Diffie-Hellman.

Alice y Bob generan secretos independientemente, los llamaremos A y B. También tienen algo de material público, lo llamaremos C.

Necesitamos hacer ciertas asunciones:

- Cuando combinamos secretos son prácticamente imposibles de separar.
- El orden en el que se combinen no importa.

Alice y Bob combinarán sus secretos con material común, AC y BC. Se mandarán eso el uno al otro y lo combinarán con su secreto para crear dos llaves idénticas ABC.

Pongamos un ejemplo más explicativo:

1. Alice y Bob se ponen de acuerdo en ciertas variables públicas: un número primo grande *p* y uno generador, *g*; donde *0 < g < p*. Elijamos unos pequeños para el ejemplo: *p = 29* y *g = 3*.
2. Cada parte elige un número entero privado. Como ejemplo numérico digamos que Alice elije *a = 13* y Bob elige *b = 15*. Cada uno de estos valores representa una clave privada.
3. Alice calcula su clave: *A = (g^a) % p = 3¹³ % 29 = 19*. Bob calcula la suya: *B = (g^b) % p = 3¹⁵ % 29 = 26*. Estas son claves públicas.
4. Alice y Bob intercambian las claves. Este proceso se llama intercambio de claves.
5. Alice y Bob finalmente calculan el secreto compartido usando su  clave privada y pública. Alice calcula: *(B^a) % p = 26¹³ % 29 = 10*; Bob calcula: *(A^b) % p = 19¹⁵ % 29 = 10*. Los dos cálculos conllevan al mismo resultado: g⁽ab⁾ % p = 10, su clave secreta compartida.

!**131.jpg**

Diffie-Hellman se suele usar junto a RSA para la criptografía pública. Diffie-Hellman se usa para el acuerdo, mientras que RSA para las firmas digitales, transporte de claves y autentificación. RSA ayuda a identificar la persona con la que hablas. De esta manera se previene a alguien atacando la conexión con un MITM pretendiendo ser quien no es.