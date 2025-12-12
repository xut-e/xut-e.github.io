---
layout: apunte
title: "1. Introduction"
---

Considera este escenario. Te acabas de descargar un archivo de 6 GB y quieres saber si la copia que has descargado es idéntica al archivo original, bit a bit. O si una persona te diese un pincho con 6 GB, ¿cómo sabrías si es exactamente igual?

La respuesta descansa en la comparación de los valores hash. Si dos hashes son iguales, podemos estar seguros de que los archivos son idénticos.

Un valor hash es una string de caracteres de valor fijo computada por una función hasheadora. Esta toma un input de cualquier tamaño y devuelve una string de caracteres de tamaño fijo único.

----------
<h2>Pre-requisitos</h2>
Esta unidad es la tercera de una lista de tres:

- [0. Cryptography Basics](/apuntes/thm/0-pre-career/2-cyber-security-101/6-cryptography/1-cryptography-basics/0-cryptography-basics/)
- [0. Public Key Cryptography Basics](/apuntes/thm/0-pre-career/2-cyber-security-101/6-cryptography/2-public-key-cryptography-basics/0-public-key-cryptography-basics/)
- [0. Hashing Basics](/apuntes/thm/0-pre-career/2-cyber-security-101/6-cryptography/3-hashing-basics/0-hashing-basics/)

----------------
<h2>Objetivos de Aprendizaje</h2>
Al completar esta unidad habrás aprendido:

- Funciones hasheadoras y colisiones.
- El rol del hashing en la autentificación de sistemas.
- Reconocer valores hash guardados.
- Romper hashes.
- El uso de los hashes para la protección de la integridad.