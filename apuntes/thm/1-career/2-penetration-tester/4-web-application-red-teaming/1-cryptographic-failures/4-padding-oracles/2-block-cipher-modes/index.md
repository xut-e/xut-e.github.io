---
layout: apunte
title: "2. Block Cipher Modes"
---

<h2>Modos de Operación</h2>
Los block ciphers como AES forman el esqueleto de cualquier encriptación segura. Estos algoritmos trabajan con la información en bloques de tamaño fijo llamados bloques. Sin embargo, la información en texto plano raramente se alinea perfectamente con un tamaño y encriptar cada bloque independientemente puede provocar vulnerabilidades. Estos modos describen cómo se procesan y encadenan los bloques unos con otros y cómo conseguir confidencialidad, integridad o ambos. Los block cipher más comunes son:

- **Electronic CodeBook (ECB):** Este es el modo más básico, en este modo, cada texto plano es encriptado independientemente. Sin embargo, esta independencia hace a ECB inseguro para la mayoría de aplicaciones, como ya vimos.
- **Cipher Block Chaining (CBC):** En este modo, antes de la encriptación, cada bloque de texto plano es XORed con el bloque previo. El primero bloque es XORed con un vector de inicialización (IV) para introducir aleatoriedad. Esto asegura que los bloques de texto plano idénticos de encripten diferente si su posición en la secuencia o su IV difieren.
- **Counter (CTR) Mode:** En lugar de encadenar bloques, en este modo se usa un valor de contrapartida combinado con el índice del bloque. Cada bloque es encriptado independientemente pero con un par diferente de nonce y contador para mejor seguridad y eficiencia.

--------------------------------------------------
<h2>Cipher Block Chaining (CBC)</h2>
El modo CBC es un modo de encriptación ampliamente utilizado que securiza el plaintext combinando cada bloque con el bloque ciphertext previo para asegurar aleatoriedad.

<h3>Cómo Funciona la Encriptación en Modo CBC</h3>
Discutiremos ahora cómo funciona la encriptación en modo CBC, paso a paso, usando la siguiente imagen y el plaintext de ejemplo "TryHackMe". El tamaño de bloque son 8 bytes, y dividiremos el proceso de encriptación en 4 pasos.

!**Pasted image 20260317113210.png**

>[!NOTE] Puedes usar esta [herramienta](https://xor.pw/#) si lo requieres para hacer XOR a los valores hex.

<h3>Paso 1: Vector de Inicialización (IV) y Separar el Texto Plano</h3>
El texto plano "TryHackMe" consiste de 9 caracteres. Dado el tamaño del bloque en 8 bytes, dividimos el texto plano en dos bloques:

- Bloque 1: "TryHackM" (8 bytes, sin padding)
- Bloque 2: "e" (1 byte), paddeado con 7 bytes `\x07` para hacerlo 8 bytes.

```javascript
Block 2: "e\x07\x07\x07\x07\x07\x07\x07"
```

La encriptación comienza con un IV random. Usaremos este por ejemplo:

```javascript
IV: 01 01 01 01 01 01 01 01
```

<h3>Paso 2: Haz XOR al Primer Bloque con el IV</h3>
El primer bloque de texto plano, "TryHackM", es convertido a su representación hexadecimal:

```javascript
Plaintext Block 1: 54 72 79 48 61 63 6B 4D
```

Este bloque es XORed con el IV:

```javascript
54 72 79 48 61 63 6B 4D XOR 01 01 01 01 01 01 01 01 = 55 73 78 49 60 62 6A 4C
```

La operación XOR combina el texto plano con el IV, produciendo un valor intermedio que asegura aleatoriedad.

<h3>Paso 3: Encripta el Resultado XOR</h3>
El resultado intermedio del paso 2 (`55 73 78 49 60 62 6A 4C`) es encriptado usando AES o DES y una clave secreta.

```javascript
Ciphertext Block 1 (C1): A3 3C 9F 12 58 44 76 10
```

Este bloque ciphertext (C1) es usado ahora como input para encriptar y se convierte en el IV para el siguiente bloque de texto plano.

<h3>Paso 4: XOR y Encriptación del Segundo Bloque</h3>
El segundo bloque de texto plano, `e\x07\x07\x07\x07\x07\x07\x07`, es convertido en su representación hexadecimal:

```javascript
Plaintext Block 2: 65 07 07 07 07 07 07 07
```

Este bloque es XORed con el primer bloque de ciphertext (C1):

```javascript
65 07 07 07 07 07 07 07 XOR A3 3C 9F 12 58 44 76 10 = C6 3B 98 15 5F 43 71 17
```

El resultado del XOR es encriptado usando AES y la misma clave, produciendo el segundo bloque de ciphertext:

```javascript
Ciphertext Block 2 (C2): B7 9F 2D 5A 11 66 4F 7A
```

El mensaje final encriptado es la combinación de ambos bloques ciphertext (C1 y C2) que es mandado al receptor.

El proceso de encadenado en el modo CBC asegura que cada bloque ciphertext depende no sólo de su texto plano sino también del ciphertext del bloque anterior. Esto previene la visibilidad de patrones en el ciphertext.

En Python, el módulo `Crypto.Cipher.AES` de la librería `pycryptodome` puede ser usada para la encriptación con AES usando un tamaño de bloque de 16 bytes. El método `AES.new()` inicializa el cifrado, y el modo `AES.MODE_CBC` habilita CBC para mejorar la seguridad. El texto plano debe ser paddeado para coincidir con el tamaño del bloque, lo que se consigue usando `Crypto.Util.Padding.pad` como ya hemos visto. Con la clave secreta y `IV`, la encriptación asegura confidencialidad para cada bloque de 16 bytes. Un ejemplo de código sería por ejemplo:

```javascript
from Crypto.Cipher import AES
plaintext = request.form["plaintext"]
key = request.form["key"]
plaintext_bytes = pad(plaintext.encode(), block_size)
cipher = AES.new(key.encode(), AES.MODE_CBC, DEFAULT_IV)
encrypted_bytes = cipher.encrypt(plaintext_bytes)
encrypted_message = binascii.hexlify(encrypted_bytes).decode()
```

Visita la URL e intenta introducir el texto `TryHackMe` con la clave secreta `abcdefghijklmnop` y usar el IV como todo `1s` (0x31 en Hex). La aplicación encriptará el texto de cifrado usando el código de arriba y mostrando el output así:

!**Pasted image 20260317121036.png**

