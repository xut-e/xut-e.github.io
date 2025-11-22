---
layout: apunte
title: "2. Essential Concepts"
---

<h2>Variables</h2>
Las variables son contenedores que te permiten guardar información en ellos. Cada variable tiene un nombre que permite manipularla y referenciarla. En JS hay tres métodos para declarar una variable: `var`, `let` y `const`. Mientras que `var` está orientada a las funciones, `let` y `const` son las dos orientadas a bloques.

----------------
<h2>Data Types</h2>
En JS, los data types definen el tipo de valor que una variable puede contener. Ejemplos son `string`, `number`, `boolean`, `null`, `undefined` u `object`.

-----------------
<h2>Funciones</h2>
Una función representa un bloque de código diseñado para realizar una tarea concreta. Dentro de una función, agrupas código que necesita realizar una tarea similar. Por ejemplo si quisieses hacer que se imprimiese el resultado de algo:

```js
<script>
        function PrintResult(rollNum) {
            alert("Username with roll number " + rollNum + " has passed the exam");
            // any other logic to display the result
        }

        for (let i = 0; i < 100; i++) {
            PrintResult(rollNumbers[i]);
        }
    </script>
```


---------------
<h2>Loops</h2>
Los bucles te permiten ejecutar un bloque de código múltiples veces mientras una condición sea cierta. Bucles comunes en JS son `for`, `while` y `do...while`. De esta manera conseguimos no tener, por ejemplo, que llamar 100 veces a la función sino hacer un bucle que la llame.

-----------------
<h2>Request-Response Cycle</h2>
Es cuando el navegador (cliente) manda una petición a un servidor y este responde con la información pedida.