---
layout: apunte
title: "3. JavaScript Overview"
---

En esta lección usaremos JS para crear un programa. JS es un lenguaje interpretado, es decir que se ejecuta en el navegador sin previa compilación. Aquí hay un ejemplo de un código en JS haciendo cosas muy básicas:

```javascript
// Hello, World! program
console.log("Hello, World!");

// Variable and Data Type
let age = 25; // Number type

// Control Flow Statement
if (age >= 18) {
    console.log("You are an adult.");
} else {
    console.log("You are a minor.");
}

// Function
function greet(name) {
    console.log("Hello, " + name + "!");
}

// Calling the function
greet("Bob");
```

JS es mayormente ejecutado del lado del cliente, lo que lo hace de fácil interacción e inspección con HTML desde el navegador. Usaremos la consola de google chrome.

- Una vez en Chrome, pulsamos `Ctrl + Shift + I` o `click derecho > inspeccionar > consola`.
- Vamos a hacer un código simple en JS que sume dos números y muestre el resultado:
  ```javascript
let x = 5;
let y = 10;
let result = x + y;
console.log("The result is: " + result);
```
