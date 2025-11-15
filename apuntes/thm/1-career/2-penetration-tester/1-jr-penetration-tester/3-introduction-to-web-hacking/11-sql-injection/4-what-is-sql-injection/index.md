---
layout: apunte
title: "4. What is SQL Injection"
---

<h2>¿Qué es SQL Injection?</h2>
El punto donde una aplicación web que usa SQL se puede transformar en SQL Injection es cuando se incluye en una query SQL información proporcionada por el usuario.

----------------------------------
<h2>¿Cómo se ve?</h2>
Toma el siguiente escenario. Te cruzas con un blog online y cada entrada del bloque tiene un ID único. Las entradas del blog pueden ser públicas o privadas, dependiendo de si están listas para que el público las vea. La URL de cada entrada de blog pude verse algo como:

`https://website.thm/blog?id=1`

De la URL de arriba, podemos ver que hay un parámetro id. La aplicación web necesita recuperar el artículo de una base de datos y puede que use un statement SQL de parezca lo siguiente:

`SELECT * FROM blog WHERE id=1 AND private=0 LIMIT 1;`

De lo que has aprendido deberías saber que la query de arriba busca un artículo en la tabla `blog` con el `id=1` y la columna `private=0`, que significa que puede ser vista por el público (0:false;1:true).

Imaginemos ahora que hay un artículo con `id=2` que es privado pero nosotros introducimos lo siguiente:

`http://website.thm/blog?id=2;-- -`

Esto se transformaría en la query:

`SELECT * FROM blog WHERE id=2;-- - AND private=0 LIMIT 1;`

El punto y coma (`;`) hace que termine el statement actual y el `-- -` hace que lo que viene después sea un comentario, por lo que la query de arriba en realidad es:

`SELECT * FROM blog WHERE id=2;`

Esto devolverá el artículo con `id=2` sin importar si este es público o no.

Esto fue un ejemplo de una vulnerabilidad SQLi conocida como In-Band SQL Injection. Hay tres tipos: In-Band, Blind y Out-of-Band, que veremos en adelante.