---
layout: apunte
title: "6. Clauses"
---

Una cláusula es una parte de un comando que especifica el criterio de la información manipulada. Estas pueden ayudarnos a definir el tipo de dato y cómo debería de rescatarse o buscarse.

Ya hemos usado algunas, como `FROM` o `WHERE`. Esta lección se concentrará en las cláusulas: `DISTINCT`, `GROUP BY`, `ORDER BY` y `HAVING`.

-----------------
<h2>Cláusula DISTINCT</h2>
La cláusula `DISTINCT` se usa para evitar duplicados registros al hacer una query, devolviendo sólo valores únicos. La sintaxis es:

```sql
mysq> SELECT DISTINCT name FROM books;
```

------------------
<h2>Cláusula GROUP BY</h2>
Se usa para juntar información de múltiples registros y agrupa los resultados de la query en columnas. La sintaxis es:

```sql
mysql> SELECT name, COUNT(*)
	FROM books
	GROUP BY name;

+----------------------------+----------+
| name                       | COUNT(*) |
+----------------------------+----------+
| Android Security Internals |        1 |
| Bug Bounty Bootcamp        |        1 |
| Car Hacker`s Handbook      |        1 |
| Designing Secure Software  |        1 |
| Ethical Hacking            |        2 |
+----------------------------+----------+

5 rows in set (0.00 sec)
```

--------------------
<h2>Cláusula ORDER BY</h2>
Se usa para filtrar los registros devueltos por una query en orden ascendente o descendente usando funciones como `ASC` o `DESC`. La sintaxis es:

```sql
mysql> SELECT *
	FROM books
	ORDER BY published_date ASC;
```

-----------------
<h2>Cláusula HAVING</h2>
La cláusula `HAVING` es usada junto con otras cláusulas para filtrar grupos o resultados de registros basado en una condición, por ejemplo:

```sql
mysql> SELECT name, COUNT(*)
	FROM books
	GROUP BY name
	HAVING name LIKE '%Hack%';
	
+-----------------------+----------+
| name                  | COUNT(*) |
+-----------------------+----------+
| Car Hacker`s Handbook |        1 |
| Ethical Hacking       |        2 |
+-----------------------+----------+

2 rows in set (0.00 sec)
```
