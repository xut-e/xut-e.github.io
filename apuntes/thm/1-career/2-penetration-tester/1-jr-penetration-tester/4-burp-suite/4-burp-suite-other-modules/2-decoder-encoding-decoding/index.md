---
layout: apunte
title: "2. Decoder - Encoding-Decoding"
---

Ahora examinaremos las opciones de encoding y decoding manual en detalle. Son idénticos elijas el menú de encoding o decoding.

!**Pasted image 20251116183157.png**

- **Plain:** Se refiere al formato crudo sin transformaciones.
- **URL:** El URL encoding se utiliza para asegurar la transmisión de la información en la URL. Se basa en sustituir caracteres ASCII por formato hexadecimal precedido de un `%`.
- **HTML:** El HTML Entities encoding reemplaza caracteres especiales con un ampersand (`&`) seguido de un número hexadecimal o una referencia al caractrer especial siendo escapado y terminando con `;`. Asegura el renderizado seguro de caracteres especiales y previene ataques como XSS.
- **Base64:** Un método de encoding bastante usado que convierte la información en un formato compatible con ASCII. [Aquí](https://stackabuse.com/encoding-and-decoding-base64-strings-in-python) puedes encontrar las matemáticas sobre cómo funciona esto.
- **ASCII Hex:** Esta opción transiciona la información entre ASCII y hexadecimal.
- **Hex, Octal y Binary:** Aplican sólamente a inputs numéricos, convirtiendo entre decimal, hexadecimal, octal y binario.
- **Gzip:** Comprime información, reduciendo el tamaño del archivo y la página antes de su transmisión.

Estos métodos pueden ser combinados:

!**Pasted image 20251116183332.png**

---------------------------------
<h2>Formato Hex</h2>
Mientras que introducir información en formato ASCII es beneficioso, hay momentos en los que el editar byte a byte es necesario. Aquí es donde "Hex View" entra en juego.

!**Pasted image 20251116184326.png**

Esta funcionalidad nos permite ver y alterar la información en formato hexadecimal.

--------------------------------
<h2>Smart Decode</h2>
Por último tenemos la opción de **Smartt Decode**. Esta funcionalidad intenta auto-decodear el texto encodeado. Por ejemplo, `&#x42;&#x75;&#x72;&#x70;&#x20;&#x53;&#x75;&#x69;&#x74;&#x65;` se reconoce automáticamente como HTML y se decodea así.

!**Pasted image 20251116184459.png**