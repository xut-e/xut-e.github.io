---
layout: apunte
title: "3. RSA"
---

RSA es un algoritmo de cifrado de llave pública que permite mandar información de manera segura a través de canales que no lo son.

----------------
<h2>Las Matemáticas que Hacen Seguro a RSA</h2>
RSA está basado en el problema de factorizar un número muy grande. Multiplicar dos números primos grandes es una tarea sencilla. Sin embargo, dado el resultado es muy difícil y costoso encontrar sus factores primos. Consideremos el siguiente ejemplo numérico:

- Número primo 1: 982451653031
- Número primo 2: 169743212279
- Su producto: 982451653031 * 169743212279 = 166764499494295486767649

La multiplicación se hace en un momento, pero intenta buscar los factores primos que lo conforman sin saberlos...

En la realidad se usan números más grandes, ya que un ordenador puede factorizarlo sencillamente, pero no puede hacerlo con un número de más de 600 dígitos.

-------------
<h2>Ejemplo Numérico</h2>
Veamos el algoritmo RSA en acción:

1. Bob elige 2 números primos: *p = 157* y *q = 199*. Calcula *n = p * q = 31243*.
2. Con la ecuación Phi de Euler: *ϕ(n) = n − p − q + 1* sacamos que el número es 30888. Bob entonces selecciona un número `e` impar, de tal manera que sea coprimo con `ϕ(n)`. Dos números son coprimos si no comparten ningún divisor mayor que 1; 8 y 15 son coprimos pero 14 y 21 no. En este caso *e = 163*. Además selecciona *d* tal que *(e * d) % ϕ(n) = 1*. La **clave pública** es: *(n,e)* y la **clave privada** es: *(n,d)*.
3. Digamos que el valor que se quiere encriptar es *x = 13*. Alice calcularía y mandaría *y = (x^e) % n*; *y = (13¹⁶³) % 31243 = 16341*.
4. Bob recibiría este valor y calcularía *x = (y^d) % n*; *x = (16341³⁷⁹) % 31243 = 13*.

Volvemos a recalcar que en ester ejemplo escogimos números primos de tres cifras, pero en la vida real tienen más de 300 dígitos.

--------------
<h2>RSA en CTFs</h2>
La matemática detrás de RSA suele aparecer en los CTF (Capture The Flag). Hay herramientas para romper RSA en CTFs como [RsaCtfTool](https://github.com/RsaCtfTool/RsaCtfTool) o [rsatool](https://github.com/ius/rsatool).

Necesitas saber las variables para los CTFs:

- p y q son los números primos grandes.
- n es el producto de p y q.
- La clave publica es n y e.
- La clave privada es n y d.
- m se usa para representar el mensaje original (plaintext).
- c representa el mensaje cifrado (ciphertext).