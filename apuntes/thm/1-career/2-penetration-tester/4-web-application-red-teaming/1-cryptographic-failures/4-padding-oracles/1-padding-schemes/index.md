---
layout: apunte
title: "1. Padding Schemes"
---

La mayoría de algoritmos de encriptación, como AES, requieren que el input tenga un tamaño fijo para cada ronda de encriptación. Estos se llaman cipher blocks. Si el mensaje excede este tamaño, se divide en bloques más pequeños del tamaño requerido. Sin embargo, el último bloque puede no tener suficiente información para rellenar el tamaño requerido, por lo que el padding lo hace encajar. Además, debido a que la encriptación involucra múltiples bloques, se necesita un método para relacionarlos, aquí es donde entran los métodos como CBC.

El padding es un proceso usado en la criptografía para asegurar que la información en texto plano encaja con el tamaño de bloque fijado requerido. Si el tamaño del texto plano no es un múltiplo del tamaño del bloque, se añaden bytes para rellenar el espacio restante. Estos bytes añadidos son conocidos como padding y son eliminados durante la desencriptación para recuperar el texto original.

Existen muchos esquemas de padding, cada uno diseñado para asegurar que el tamaño del texto se alinea con el tamaño del bloque. En esta unidad nos centraremos en el **PKCS#7** ya que es el más comúnmente usado.

----------------------------------------
<h2>Esquema de Padding PKCS#7</h2>
El esquema de padding PKCS#7 se asegura de que el texto plano se alinea con el tamaño requerido por los cipher blocks. Este añade bytes si el texto plano no es un múltiplo del tamaño requerido. Si el tamaño encaja justo, añade un bloque nuevo conteniendo la longitud del mensaje.

<h3>Número de Bytes Añadidos</h3>
La tabla de abajo ilustra cómo PKCS#7 funciona para un bloque de 8 bytes. Muestra la relación entre la longitud del texto plano (mod 8), el número de bytes de padding añadidos y el valor de cada byte de padding.

| **Text Length (mod 8)** | **Number of Padding Bytes Added  <br>** | **Value of Each Padding Byte** |
| ----------------------- | --------------------------------------- | ------------------------------ |
| 0                       | 8                                       | 0x08                           |
| 1                       | 7                                       | 0x07                           |
| 2                       | 6                                       | 0x06                           |
| 3                       | 5                                       | 0x05                           |
| 4                       | 4                                       | 0x04                           |
| 5                       | 3                                       | 0x03                           |
| 6                       | 2                                       | 0x02                           |
| 7                       | 1                                       | 0x01                           |

Cuando los mensajes son encriptados de forma separada, cada mensaje debe cumplir con los requerimientos de tamaño independientemente añadiendo padding al final. Para los mensajes "**Try**", "**Hack**" y "**Me**", con un block size de 8, el PKCS#7 se aplica a cada uno:

!**Pasted image 20260317110412.png**

- El mensaje 1 "Try" tiene 3 bytes, dejando 5 bytes para rellenar el bloque. Los bytes de padding `0x05` son añadidos , donde cada bytes tiene el valor 5.
- El mensaje 2 "Hack" tiene 4 bytes, dejando 4 bytes para rellenar el bloque. Los bytes de padding `0x04` son añadidos, cada byte con el valor 4.
- El mensaje 3 "Me" tiene 2 bytes, dejando 6 bytes para rellenar el bloque. Los bytes de padding `0x06` son añadidos, con cada byte con valor 6.

En Python, la función `pad` del módulo `Crypto.Util.Padding` simplifica el proceso de añadir padding a mensajes de texto plano. Toma dos argumentos: la información en texto plano y el tamaño del bloque. La función se asegura de que la información se ajusta al tamaño del bloque de acuerdo con el esquema PKCS#7.