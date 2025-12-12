---
layout: apunte
title: "7. Blind SQLI - Boolean Based"
---

Las SQLi basadas en booleanos se refiere a la respuesta que recibimos de nuestros intentos de inyección, que podrían volver como true/false, 1/0, o cualquier output binario. Parece que con una respuesta tan limitada no podemos hacer nada, sin embargo, podemos enumerar la base de datos entera.

----------------------
<h2>Práctica</h2>
Vamos a ver algunos ejemplos prácticos.

--------------------------------------
<h2>Nivel 3</h2>
!**Pasted image 20251114114104.png**

En este nivel nos encontramos con un enlace: `https://website.thm/checkuser?username=admin`. Al que responde una API con **{"taken":true}**. Esto es un comportamiento bastante habitual que lo que hace comprobar si un usuario ya está registrado. Si cambiamos el usuario a **admin123** veremos que se pone en false.

!**Pasted image 20251114114130.png**

La query que se procesa se ve así:

`SELECT * FROM users WHERE username='%username%' LIMIT 1;

Lo único que podemos controlar es el input de username. Manteniendo **admin123**, podemos  empezar a añadir sentencias para hacer que la base de datos confirme cosas verdaderas.

Primero debemos de establecer el número de columnas:

!**Pasted image 20251114120757.png**

Al acertar el número de columnas cambia de false a true. Al saber el número de columnas, podemos empezar a listar la base de datos. Solo que ahora debemos basarnos en las respuestas por lo que implementaremos `LIKE '%'`. Esto devolverá true o false y después vamos probando diferentes letras.

!**Pasted image 20251114121036.png**

!**Pasted image 20251114121053.png**

Ahora sabemos que la base de datos no empieza por "a", por lo que seguimos probando. Si vamos probando llegaremos a que `'s%'` devuelve `true`. Por lo que seguimos con `'sa%'`, `'sb%'`, etc. Si seguimos llegaremos a que la base de datos es `sqli_three`

Por lo que ahora debemos hacer lo de las tablas de antes pero implementando `LIKE '%'` otra vez:

`admin123' UNION SELECT 1,2,3 FROM information_schema.tables WHERE table_schema = 'sqli_three' and table_name like 'a%';--`

Si seguimos descubriremos que la tabla es `users`. Hacemos lo mismo para las columnas:

`admin123' UNION SELECT 1,2,3 FROM information_schema.COLUMNS WHERE TABLE_SCHEMA='sqli_three' and TABLE_NAME='users' and COLUMN_NAME like 'a%' and COLUMN_NAME !='id';`

Con la única diferencia que para encontrar todas las columnas debemos añadir al condición de '`COLUMN_NAME != 'columna_encontada'`.

Si seguimos descubriremos que hay una columna llamada username, de donde podemos confirmar si algún usuario 'admin' existe: `admin123' UNION SELECT 1,2,3 from users where username like 'a%`

Una vez confirmado nos podemos centrar en la extracción de la contraseña:

`admin123' UNION SELECT 1,2,3 from users where username='admin' and password like 'a%`

De esta manera descubriremos que la contraseña es `3845`.