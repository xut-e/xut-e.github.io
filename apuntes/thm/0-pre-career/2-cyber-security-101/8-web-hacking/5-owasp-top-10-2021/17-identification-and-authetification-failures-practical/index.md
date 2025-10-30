---
layout: apunte
title: "17. Identification and Authetification Failures Practical"
---

Para este ejemplo, miraremos un fallo lógico en el mecanismo de autentificación.

Muchas veces, lo que ocurre es que los desarrolladores olvidan sanitizar el input dado por el usuario (username y password), lo que los hace vulnerables a ataques de tipo SQLI. De todas formas no centraremos en una vulnerabilidad que ocurre por un eror del programador: re-registro de un usuario existente.

Veamos un ejemplo. Queremmos acceder a la cuenta `admin`, por lo que registramos un usuario " admin", ahora, al entrar, podremos ver el contenido de su cuenta.

------------------
<h2>Challenge</h2>
1. Entramos a la página dada.
   ![](/apuntes/img/140.png)
2. Intentamos registrar el usuario dado
   ![](/apuntes/img/141.png)
3. Nos da error así que vamos a intentar otro nombre de usuario.
   ![](/apuntes/img/142.png)
4. Probamos con  " darren" en vez de "darren".
   ![](/apuntes/img/143.png)
5. Ahora si que ha funcionado.
   ![](/apuntes/img/144.png)
6. Iniciamos sesión:
   ![](/apuntes/img/145.png)
7. Obtenemos una flag:
   ![](/apuntes/img/146.png)
8. Ahora pobamos a hacerlo con **arthur**:
   ![](/apuntes/img/147.png)
9. Iniciamos sesion con arthur:
   ![](/apuntes/img/148.png)
10. Obtenemos la segunda flag:
    ![](/apuntes/img/149.png)
