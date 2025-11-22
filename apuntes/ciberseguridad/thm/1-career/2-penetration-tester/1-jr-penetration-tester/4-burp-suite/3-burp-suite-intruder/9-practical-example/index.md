---
layout: apunte
title: "9. Practical Example"
---

Para poner a prueba nuestro nuevo conocimiento teórico, vamos a intentar ganar acceso al portal de soporte que nos dan. Sigue una estructura de login típica y después de inspeccionar el código fuente, encontramos que no se han tomado medidas protectoras.

```html
---
<form method="POST">
    <div class="form-floating mb-3">
        <input class="form-control" type="text" name=username placeholder="Username" required>
        <label for="username">Username</label>
    </div>
    <div class="form-floating mb-3">
        <input class="form-control" type="password" name=password  placeholder="Password" required>
        <label for="password">Password</label>
    </div>
    <div class="d-grid"><button class="btn btn-primary btn-lg" type="submit">Login!</button></div>
</form>
---
```

Como no tiene medidas de protección tenemos varias formas de explotar este formulario, como un ataque cluster bomb para bruteforcear las credenciales. Sin embargo, tenemos un acercamiento más sencillo a nuestra disposición.

Aproximadamente hace 3 meses, Bastion Hosting sufrió un ataque que exfiltró nombres de usuario, correos y algunas contraseñas en texto plano. Aunque la compañía alertó a los usuarios para que cambiasen sus contraseñas puede que algunos empleados no hicieran caso.

Como poseemos una lista de nombres de usuarios cada uno acompañados de una contraseña, podemos probar un ataque de credential-stuffing, mucho más rápido que uno de brute-forcing.

-----------------------------
<h2>Challenge</h2>
1. Primero descargamos la lista con nombres de usuario y contraseñas del link dado.
   !**Pasted image 20251115210129.png**
2. Entramos en la página dada.
   !**Pasted image 20251115210202.png**
3. Abrimos Burp Suite.
   !**Pasted image 20251115210219.png**
4. Mandamos una petición de login que interceptamos y mandamos al Intruder.
   !**Pasted image 20251115210247.png**
5. Una vez en el intruder seleccionamos Pitchfork.
   !**Pasted image 20251115210312.png**
6. Le damos a `Auto §` y se rellenarán username y password:
   !**Pasted image 20251115210455.png**
7. Descomprimimos las listas:
   !**Pasted image 20251115210548.png**
8. En el primer payload set seleccionamos la lista de usuarios y en la segunda la de contraseñlas con el botón `Load`.
   !**Pasted image 20251115210725.png**
   !**Pasted image 20251115210742.png**
9. Le damos a comenzar ataque y esperamos. Como no devuelve códigos de estado válidos porque todos son diferentes, debemos fijarnos en la longitud de la respuesta, la que es diferente será del usuario que ha olvidado cambiar la contraseña y por lo tanto es un login exitoso.
   !**Pasted image 20251115210954.png**