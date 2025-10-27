---
layout: apunte
title: "7. Operators"
---

Cuando trabajamos con SQL y lidiamos con comparaciones y lógica, los operadores son nuestra forma de filtrar y manipular la información de forma efectiva.

----------------------
<h2>Operadores Lógicos</h2>
Estos operadores comprueban la veracidad de una condición y devuelven un valor booleano `TRUE` o `FALSE`.

<h4>Operador LIKE</h4>
Es comúnmente usado junto a cláusulas `WHERE` para filtrar por patrones o columnas específicas.

```sql
mysql> SELECT *
	FROM books
	WHERE description LIKE "%guide%";
```

<h4>Operador AND</h4>
Usa varias condiciones sobre una misma query y devuelve `TRUE` si todas son verdaderas y false si alguna no.

```sql
mysql> SELECT *
    FROM books
    WHERE category = "Offensive Security" AND name = "Bug Bounty Bootcamp"; 
```

<h4>Operador OR</h4>
Combina múltiples condiciones y devuelve `TRUE` si al menos una es verdadera.

```sql
mysql> SELECT *
    FROM books
    WHERE name LIKE "%Android%" OR name LIKE "%iOS%"; 
```

<h4>Operador NOT</h4>
Este operador invierte el valor de un valor booleano, es decir devuelve `TRUE` si es falso:

```sql
mysql> SELECT *
    FROM books
    WHERE NOT description LIKE "%guide%";
```

<h4>Operador BETWEEN</h4>
Nos permite seleccionar valores en un rango, por ejemplo:

```sql
mysql> SELECT *
    FROM books
    WHERE id BETWEEN 2 AND 4;
```

-----------------------
<h2>Operadores de Comparación</h2>
Los operadores comparativos se usan para comparar valores y comprobar si cumplen con el criterio especificado.

<h4>Operador Igual Que</h4>
El operador `=` compara dos valores y devuelve `TRUE` si son iguales.

```sql
mysql> SELECT *
    FROM books
    WHERE name = "Designing Secure Software";
```

<h4>Operador No Igual Que</h4>
El operador `!=` compara expresiones y comprueba si no son iguales y si no lo son devuelve `TRUE`.

```sql
mysql> SELECT *
    FROM books
    WHERE category != "Offensive Security";
```

<h4>Operador Menor Que</h4>
El operador `<` comprueba si el valor de la izquierda es menor que el de la derecha, y si es así devuelve `TRUE`.

```sql
mysql> SELECT *
    FROM books
    WHERE published_date < "2020-01-01";
```

<h4>Operador Mayor Que</h4>
Hace lo contrario que el menor que, `>` comprueba si el valor de la izquierda es mayor que el de la derecha y si es así devuelve `TRUE`.

```sql
mysql> SELECT *
    FROM books
    WHERE published_date > "2020-01-01";
```

<h4>Operador Menor o Igual / Mayor o Igual Que</h4>
Los operadores `<=` y `>=` comprueban lo que los operadores `<` y `>` pero además le suman el igual, es decir, que si son mayor o menor e igual el valor a la izquierda y a la derecha devuelven `TRUE`.

```sql
mysql> SELECT *
    FROM books
    WHERE published_date <= "2021-11-15";
```