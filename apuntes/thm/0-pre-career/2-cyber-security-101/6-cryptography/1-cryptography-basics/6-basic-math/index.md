---
layout: apunte
title: "6. Basic Math"
---

Los fundamentos de la criptografía moderna recaen sobre las matemáticas. Para demostrar algunos algoritmos básicos cubriremos dos operaciones matemáticas usadas en varios algoritmos:

- Operación XOR.
- Operación Módulo.

----------------
<h2>Operación XOR</h2>
XOR es la operación `or` eXclusivamente. Tiene la siguiente tabla de resultados:

| A   | B   | A ⊕ B |
| --- | --- | ----- |
| 0   | 0   | 0     |
| 0   | 1   | 1     |
| 1   | 0   | 1     |
| 1   | 1   | 0     |
Se representa mediante el símbolo ⊕ o ^. Compara los dos bits y devuelve 1 sólo si son diferentes y 0 en el resto de casos.

Al hacer XOR con los números 1010 y 1100 el resultado será: 0110.

Para poner un ejemplo real:

- C: Texto cifrado.
- P: Texto plano.
- K: Llave.

Sabemos que *C = P ⊕ K*. Si sabemos P y K, podemos recuperar C. Comenzamos con  *C ⊕ K = (P ⊕ K) ⊕ K*. También sabemos que *(P ⊕ K) ⊕ K = P ⊕ (K ⊕ K)* porque XOR es asociativa, y que *K ⊕ K = 0*. Consecuentemente, *(P ⊕ K) ⊕ K = P ⊕ (K ⊕ K) = P ⊕ 0 = P*.


--------------
<h2>Operación Módulo</h2>
Otra operación usada mucho en criptografía es la de módulo, comúnmente escrita como `%` o `mod`. Esta operación rescata el resto de una división.

- `25%5 = 0`: Porque 25/5 = 5 con resto 0.
- `23%6 = 5`: Porque 3 * 6 =18 y 23 -18 = 5.
- `23%7 = 2`: Porque 7 * 3 = 21 y 23 - 21 = 2.

Algo importante que notar sobre el módulo es que no es reversible. hay infinitos valores para x en `x%5 = 4`. La operación siempre devuelve un número entero (int) positivo entre `0` y `n - 1` en `a%n`.