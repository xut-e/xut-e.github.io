---
layout: apunte
title: "3. CBC Mode - Decryption"
---

La desencriptación en modo CBC es el reverso de la encriptación. En lugar de encadenar bloques plaintext a producir ciphertext, la desencriptación encadena bloques a la reconstrucción del texto plano original. Cada bloque de ciphertext es desencriptado usando la clave secreta y el resultado es XORed con el bloque ciphertext previo (o el vector de inicialización para el primer bloque). Este proceso asegura que el texto plano original es recuperado completamente.

!**Pasted image 20260317122332.png**

----------------------------------------
<h2>Proceso de Desencriptar el Ciphertext</h2>
<h3>Paso 1: Introducir Ciphertext y Vector de Inicialización</h3>
Para la desencriptación, el ciphertext de la encriptación es dividido en bloques:

- **Ciphertext Bloque 1:** `A3 3C 9F 12 58 44 76 10`
- **Ciphertext Bloque 2:** `B7 9F 2D 5A 11 66 4F 7A`

El vector de inicialización también:

```javascript
IV: 01 01 01 01 01 01 01 01
```

<h3>Paso 2: Desencripta el Primer Bloque</h3>
- **Desencriptar C1 Usando la Clave Secreta:** El primer bloque ciphertext es desencriptado usando la clave secreta. Esto produce un valor intermedio:

```javascript
Intermediate Value: D(C1) = 55 73 78 49 60 62 6A 4C
```

- **XOR con el IV:** El valor intermedio es XORed con el IV para producir el primer bloque de texto plano.

```javascript
Plaintext Block 1 = D(C1) XOR IV 55 73 78 49 60 62 6A 4C XOR 01 01 01 01 01 01 01 01 = 54 72 79 48 61 63 6B 4D
```

- **Convertir a Caracteres:** Los caracteres con convertidos de nuevo a su representación original, que en este caso podría ser: "TryHackM". Esto completa la desencriptación del primer bloque.

<h3>Paso 3: Desencriptar el Segundo Bloque</h3>
Ahora vamos con el C2.

- **Desencriptar C2 Usando la Clave Secreta:** 
- **XOR con C1:** 
- **Convertir a Caracteres Originales y Eliminar el Padding:** 

Ahora, combinando ambos obtendríamos el texto plano original, `TryHackMe` en este caso.

Una fórmula importante para recordar para la desencriptación es:

$P_i = D_k (C_i)$ XOR $C_i$-$_1$

Aquí, $P_i$ es el bloque de texto plano siendo desencriptado, $D_k(C_i)$ es el valor intermedio obtenido desencriptando el bloque ciphertext $C_i$ usando la clave `k`, y $C_i-_i$ es el bloque ciphertext previo (o el IV para el primer bloque). Discutiremos esto en detalle más adelante.

En Python, la función `decrypt()` del módulo `Crypto.Cipher.AES` puede usarse para desencriptar usando el algoritmo AES. Cuando se combina con el modo CBC y una clave de 16 bytes, permite la desencriptación segura de la información encriptada con la misma configuración. El proceso de desencriptación requiere el ciphertext, el IV y el secreto para reconstruir el mensaje original. Aquí un ejemplo de código que realiza la desencriptación:

```javascript
plaintext = request.form["plaintext"]
ciphertext_bytes = binascii.unhexlify(ciphertext)
cipher = AES.new(key.encode(), AES.MODE_CBC, DEFAULT_IV)
decrypted_bytes = cipher.decrypt(ciphertext_bytes)
decrypted_message = unpad(decrypted_bytes, DEFAULT_BLOCK_SIZE).decode()
```

Visita la URL dada para desencriptar `de3c4dd5d33e38acc0f2923c1c0a98f9` usando el mismo IV y secreto.

!**Pasted image 20260317124048.png**

Ahora prueba a cambiar el valor a `de3c4dd5d33e38acc0f2923c1c0a98a7`. En este caso recibirás el mensaje **Incorrect padding error**.

!**Pasted image 20260317124130.png**

