---
layout: apunte
title: "8. Functions"
---

Al trabajar con datos, las funciones pueden ayudarnos a manipularlos. Veamos algunas de las más usadas.

------------------
<h2>Funciones String</h2>
Son funciones que realizan operaciones en una string, devolviendo un valor asociado con ella.

<h4>Función CONCAT()</h4>
Esta función se usa para juntar dos o más strings.

```sql
mysql> SELECT CONCAT(name, " is a type of ", category, " book.") AS book_info FROM books;
+------------------------------------------------------------------+
| book_info                                                         |
+------------------------------------------------------------------+
| Android Security Internals is a type of Defensive Security book. |
| Bug Bounty Bootcamp is a type of Offensive Security book.        |
| Car Hacker`s Handbook is a type of Offensive Security book.      |
| Designing Secure Software is a type of Defensive Security book.  |
| Ethical Hacking is a type of Offensive Security book.            |
+------------------------------------------------------------------+

5 rows in set (0.00 sec)
```

<h4>Función GROUP_CONCAT()</h4>
Esta nos ayuda a concatenar información de múltiples filas en un campo.

```sql
mysql> SELECT category, GROUP_CONCAT(name SEPARATOR ", ") AS books
    FROM books
    GROUP BY category;
+--------------------+----------------------------------------------------------+
| category           | books                                                    |
+--------------------+----------------------------------------------------------+
| Defensive Security | Android Security Intern, Designing Secure Software       |
| Offensive Security | Bug Bounty Bootcamp, Car HackerHandbook, Ethical Hacking |
+--------------------+----------------------------------------------------------+

2 rows in set (0.01 sec)
```

<h4>Función SUBSTRING()</h4>
Esta devuelve una substring de una string que coincida con los criterios de filtrado.

```sql
mysql> SELECT SUBSTRING(published_date, 1, 4) AS published_year FROM books;
+----------------+
| published_year |
+----------------+
| 2014           |
| 2021           |
| 2016           |
| 2021           |
| 2021           |
+----------------+

5 rows in set (0.00 sec)
```

Extrae del carácter 1 al 4 y lo guarda en la columna "published_year".

<h4>Función LENGTH()</h4>
Devuelve el número de caracteres de una string.

```sql
mysql> SELECT LENGTH(name) AS name_length FROM books;
```

---------------------
<h2>Funciones de Agregación</h2>
Estas funciones agregan los valores de múltiples filas con un criterio específico.

<h4>Función COUNT()</h4>
Esta devuelve el número de registros de una expresión.

```sql
mysql> SELECT COUNT(*) AS total_books FROM books;
+-------------+
| total_books |
+-------------+
|           5 |
+-------------+

1 row in set (0.01 sec)
```

<h4>Función SUM()</h4>
Suma todos los valores (no NULL) de una determinada columna.

```sql
mysql> SELECT SUM(price) AS total_price FROM books;
+-------------+
| total_price |
+-------------+
|      249.95 |
+-------------+

1 row in set (0.00 sec)
```

<h4>Función MAX()</h4>
Devuelve el valor máximo de una columna dada.

```sql
mysql> SELECT MAX(published_date) AS latest_book FROM books;
+-------------+
| latest_book |
+-------------+
| 2021-12-21  |
+-------------+

1 row in set (0.00 sec)
```

<h4>Función MIN()</h4>
Devuelve el menor valor de una columna dada.

```sql
mysql> SELECT MIN(published_date) AS earliest_book FROM books;
+---------------+
| earliest_book |
+---------------+
| 2014-10-14    |
+---------------+

1 row in set (0.00 sec)
```
