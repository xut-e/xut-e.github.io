---
layout: apunte
title: "2. Breaking Hashes"
---

El hasheo es un proceso criptográfico que transforma un input en una string de tamaño fijado, normalmente llamado hash. La transformación es unidireccional, por lo que no es factible revertir el hash para recuperar el input original. El hasheo se usa para:

1. **Almacenamiento de Contraseña:** En lugar de guardar contraseñas en teto plano, los sistemas guardan sus hashes. Durante el login, la contraseña introducida se hashea y se compara al hash guardado.
2. **Integridad de la Información:** Los hashes verifican que la información no ha sido alterada durante la transmisión.
3. **Autentificación de Mensaje (HMAC):** Los hashes combinados con una clave secreta verifica que el mensaje no ha sido alterado.

-----------------------------------------------
<h2>Vulnerabilidades Comunes en el Hasheo</h2>
**Algoritmos de Hasheo Débiles**
Los algoritmos como MD5 y SHA-1 están considerados inseguros debido a su susceptibilidad a colisiones (dos inputs produciendo el mismo hash). Los atacantes pueden explotar esto para craftear información maliciosa con el mismo hash.

**Falta de Salting**
Cuando el mismo input consistentemente produce el mismo hash, los atacantes pueden usar bases de datos precomputadas (rainbow tables) para revertir el hash a su valor original. Saltear, añadir un valor único aleatorio para cada input antes de añadir, previene esto.

**HMACs Inseguros**
Los Códigos de Autentificación de Mensajes basados en Hashes, recaen en una función de hashes combinado con un secreto para asegurar la autenticidad del mensaje. Las debilidades surgen cuando:

- La función de hasheo es insegura.
- La clave es corta, predecible o reutilizada.

------------------------------------------------
<h2>SHA-256 no es Ideal para Hasheo de Contraseñas</h2>
SHA-256 es una función criptográfica de hasheo ampliamente utilizada, particularmente para verificar la integridad de los datos en firmas digitales y verificación de archivos. Está diseñado para ser rápido y eficiente, lo que es perfecto para esas aplicaciones. Pero cuando hablamos de hasheo de contraseñas la velocidad es el enemigo.

Los atacantes confían en la fuerza bruta y ataques de diccionario para adivinar contraseñas. Cuanto más rápido vaya una función, más rápido puede probar combinaciones un atacante.

En las GPUs modernas, los atacantes pueden computar billones de hashes SHA-256 por segundo, haciendo los ataques de fuerza bruta altamente efectivos. Es por esto por lo que los Password Hashinf Schemes (PHS) como Argon2, bcrypt y PBKDF2 existen. Estas funciones están especialmente diseñadas para ser computacionalmente caras, mitigando los ataques de fuerza bruta.

Una de las ventajas clave de los PHS es la adaptabilidad. SHA-256 toma una cantidad fijada de tiempo para computar un hash, pero bcrypt y Argon2 permiten a los desarrolladores ajustar sus parámetros de coste. Esto significa que a medida que el poder computacional se incrementa, se pueden modificar las funciones para que sigan siendo lentos (los ataques).

Para dar perspectiva, aquí hay una comparación de cuántos hashes por segundo diferentes algoritmos pueden procesar con aceleración de GPU:

|**Hash Function**|**Hashes per Second (Approximate, GPU-accelerated)**|
|---|---|
|**MD5**|~100 billion H/s|
|**SHA-256**|~1 billion H/s|
|**bcrypt (cost=12)**|~1000 H/s|
|**Argon2id**|~100 H/s|

----------------------------------------------
<h2>Elegir la Función de Hasheo Adecuada</h2>
Para clarificar cuándo usar las diferentes funciones de hasheo, aquí hay una comparación:

| **Purpose**                                   | **Recommended Hashing Method** | **Why?**                                                                |
| --------------------------------------------- | ------------------------------ | ----------------------------------------------------------------------- |
| Storing Passwords                             | Argon2, bcrypt, PBKDF2         | Diseñada para ser lenta y adaptativa                                    |
| Data Integrity (Checksums, File Verification) | SHA-256, SHA-3, BLAKE2         | Rápida y eficiente pero inadecuada para la velocidad                    |
| Message Authentication (HMAC)                 | HMAC-SHA256, HMAC-SHA3         | Usada para verificar la integridad del mensaje para guardar contraseñas |

Usan SHA-256 para hasheo de contraseñas no expone inmediatamente las contraseñas pero hace que los ataques de fuerza bruta sean más efectivos de lo que lo serían con un PHS adecuado.

Para propósitos generales de criptografía, SHA-256 es excelente. Es usada en firmas digitales, HMACs y verificación de integridad de archivos porque la velocidad es una ventaja en dichos casos. Pero para almacenamiento de contraseñas no deberían ser usados. En su lugar debemos usar Argon2, bcrypt o PBKDF2.

Muchos desarrolladores asumen que sólo hashear es suficiente para securizar contraseñas, pero la realidad es que la herramienta correcta necesita ser usada para el trabajo correcto. 

----------------------------------
<h2>Challenge</h2>
HMAC es un método criptográfico usado para verificar la integridad y autenticidad de un mensaje. Combina una función criptográfica de hasheo con una clave secreta. Si un atacante puede determinar la clave secreta, puede crear HMACs válidos.

En este reto, te damos un mensaje junto con su digest SHA-1. Sin embargo, el secreto usado es débil. Tu objetivo es recuperarlo.

Debajo está el mensaje y el digest SHA-1 de dicho mensaje:

```text
Message: CanYouGuessMySecret
SHA1-Digest: 1484c3a5d65a55d70984b4d10b1884bda8876c1d
```

-------------------------------------
<h2>Solución</h2>
Hashcat es una poderosa herramienta para crackear hashes y claves HMAC. Como sabemos que el formato es HMAC-SHA1, usaremos el modo `150`. 

Guardamos el hash:

```text
echo -n "1484c3a5d65a55d70984b4d10b1884bda8876c1d:CanYouGuessMySecret" > digest.txt
```

Ejecutamos hashcat con la wordlist RockYou:

```text
hashcat -a 0 -m 150 digest.txt /usr/share/wordlists/rockyou.txt
```

