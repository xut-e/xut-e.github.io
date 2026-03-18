---
layout: apunte
title: "4. How the Attack Works"
---

Ahora que tenemos un entendimiento sólido de cómo funcionan la encriptación y  desencriptación en el modo CBC, vamos a girar nuestro enfoque al ataque de oracle padding.

La fundación del ataque de padding oracle se basa en la fórmula:

$P_i = D_k (C_i)$ XOR $C_i$-$_1$

Aquí, $P_i$ representa el texto plano del bloque i-ésimo, $D_k (C_i)$ es el ciphertext descifrado o el valor intermedio usando la clave $k$, y $C_i$-$_1$ es el ciphertext del bloque previo (o IV para el primer bloque). La fórmula es crucial para explotar vulnerabilidades de padding, subrayando la relación entre el texto plano, el ciphertext y la desencriptación. El ataque se centra en descubrir $D_k (C_i)$ byte a byte interactuando con el oracle, lo que revela si el padding es válido o no. Este método no expone directamente el texto plano, pero revela progresivamente el estado de desencriptación intermedia.

-------------------------------------
<h2>Entendimiento Teórico</h2>
Asumamos que hemos encriptado la string "`TryHackMe`" usando el modo CBC y el padding fue añadido para alinear el texto con el tamaño del bloque. Tenemos la siguiente información:

- **IV:** `31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31` (representación hex de ASCII "1").
- **Ciphertext:** `88 12 4e 09 e2 0e ab 43 f7 c3 23 2d 92 5a 1a ee`.

El ciphertext compete un bloque de 16 bytes ($C_1$), y el IV ($C_0$) es usado durante la desencriptación. El ataque comienza apuntando al último byte del IV y trabaja hacia atrás de forma sistemática, como se muestra:

!**Pasted image 20260317140223.png**

<h3>Paso 1: Apuntar al Último Byte</h3>
Comenzaremos modificando el último byte del IV ($C_0[16]$ o $test[16]$) para revelar el último byte del bloque intermedio desencriptado ($D_k(C_1)[16]$). El oracle es usado para comprobar si el padding es válido. Si lo es, sabemos que:

$D_k(C_1)[16]$ XOR $test[16] = 0x01$

!**Pasted image 20260317140730.png**

Es importante darse cuenta de que si el padding es válido, el último byte en el texto plano debe ser `0x01`. De esto, calculamos:

$D_k(C_1)[16] = test[16]$ XOR $0x01$

Por ejemplo, si la suposición es $test[16] = 0x37$, entonces:

$D_k(C_1)[16] = 0x37$ XOR $0x01 = 0x036$

Una vez que conocemos $D_k(C_1)[16]$, usaremos esta fórmula para encontrar el byte de texto plano $P_1[16] = D_k(C_1)[16]$ XOR $C_0[16]$.

Si sustituimos números reales:

$P_1[16] = 0x37$ XOR $0x31 = 0x06$

Esto revela el último byte del texto plano.

<h3>Paso 2: Moverse al Penúltimo Byte</h3>
Ahora, seguiremos con el siguiente byte de $C_1$. Modificaremos $C_0[15]$ mientras fijamos $C_0[16]$ para asegurar el padding válido de `0x02 0x02`. Para revelar $D_k(C_1)[15]$, el oracle comprueba si:

$D_k(C_1)[15]$ XOR $test[15] = 0x02$

Cuando el padding es válido, calculamos:

$D_k(C_1)[15] = test[15]$ XOR $0x02$

Por ejemplo, si $test[15] = 0x34$, entonces:

$D_k(C_1)[15] = 0x34$ XOR $0x02 = 0x36$

El byte del texto plano es recuperado usando:

$P_1[15] = D_k(C_1)[15]$ XOR $C_0[15]$

Sustituimos de nuevo:

$P_1[15] = 0x36$ XOR $0x31 = 0x07$

<h3>Paso 3: Revelar Todos los Bytes en el Bloque</h3>
Ahora, como atacante, continuaremos este proceso para todos los bytes del bloque, desde el último al primero. Para cada byte, modificaremos el byte de prueba para que coincida con el valor de padding requerido y luego calcularemos $D_k(C_1)[i]$ una vez encontrado el valor del padding. Una vez que consigamos eso, derivamos el byte $P_1[i]$ del texto plano usando la fórmula $P_1[i] = D_k(C_1)[i]$ XOR $C_0[i]$. Al final del proceso, recuperaremos por completo el bloque de texto plano.

<h3>Paso 4: Recuperación del Texto Plano Final</h3>
Después de recuperar todos los bytes del bloque, los combinaremos para reconstruir el texto plano. Para $C_1$ el texto plano recuperado es : `P1 = 54 72 79 48 61 63 6b 4d 65 06 06 06 06 06 06 06` y después de eliminar el padding, (`0x06`), el texto plano final es "**TryHackMe**".

------------------------------------------
<h2>Test Usando Python</h2>
¿Has notado que el ataque gira en torno a la fuerza bruta? Este ataque puede ser automatizado usando Python. Un script puede modificar iterativamente los bytes de IV o el ciphertext, mandando peticiones al servidor y analizando las respuestas. Si el servidor indica el padding inválido, el script ajusta el byte y prueba de nuevo.

```python
 for iv_index in reversed(range(BLOCK_SIZE)):
        for byte_value in range(MAX_BYTE_VALUE + 1):
            modified_iv[iv_index] = byte_value
            modified_ct = hexlify(modified_iv + orig_ct)  

            # Send the modified ciphertext to the padding oracle
            response = requests.post(URL, data=modified_ct) //post data to the URL and receives response if the padding is valid or invalid

            if response.status_code == 200:
                # Fetch decrypted_text from the response JSON
                data = response.json()
                decrypted_text = data.get('decrypted_data', '')
                print("Byte #:", iv_index)
                print("Decrypted Text (Hex Bytes):", decrypted_text.encode('utf-8').hex())
                print("XOR WITH")
                print("Modified IV (Bytes):", bytes(modified_iv).hex())
                # Append keystream and plaintext
                keystream_byte = compute_keystream_byte(byte_value, padding)
                keystream.append(keystream_byte)
                plaintext_byte = compute_plaintext_byte(original_iv[iv_index], keystream[ks_index])
                plaintext.append(plaintext_byte)
```

En este trozo de código, el bucle anidado facilita un proceso de desencriptación byte a byte en el ataque de oracle padding. El bucle exterior itera a través de los bytes de IV en orden inverso. Esto asegura que la desencriptación ocurre byte a byte. Por cada byte, el bucle interno prueba todos los valores posibles (0-255) modificando el byte correspondiente en `modified_iv`. El ciphertext modificado (`modified_ct`), el cual es una combinación de `modified_iv` y el ciphertext original es mandado al oracle padding mediante POST. Si el servidor responde con `200`, indica padding válido y se extrae el texto desencriptado. 

Ve a la URL dada y comienza el ataque de fuerza bruta:

!**Pasted image 20260317143232.png**

Veras lo siguiente:

!**Pasted image 20260317143256.png**
