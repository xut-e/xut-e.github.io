---
layout: apunte
title: "5. CRUD Operations"
---

**CRUD** significa **C**reate, **R**ead, **U**pdate y **D**elete, que son consideradas las operaciones básicas en cualquier sistema que maneja datos.

----------------------
<h2>Operación Crear (INSERT)</h2>
Nos permite introducir nuevos datos en una tabla. En MySQL, lo podemos hacer con `INSERT INTO`:

```sql
mysql> INSERT INTO books )id, name, published_date, description)
	VALUES (1, "Android Security Internals", "2014-10-14", "An In-Depth Guide to Android's Security Architecture");

QUERY OK, 1 row affected (0.01 sec)

```

------------------------
<h2>Operación Leer (SELECT)</h2>
La operación `SELECT` nos sirve para obtener datos de la tabla y verlos. Para ver todo el contenido de una tabla, por ejemplo, haríamos:

```sql
mysql> SELECT * FROM books;
+----+----------------------------+----------------+----------------------------+
| id | name                       | published_date | description                |
+----+----------------------------+----------------+----------------------------+
|  1 | Android Security Internals | 2014-10-14     | An In-Depth Guide to And...|
+----+----------------------------+----------------+----------------------------+

1 row in set (0.00 sec)
```

Si queremos ver una columna en específico, debemos especificarlas, por ejemplo:

```sql
mysql> SELECT name, description FROM books;
+----------------------------+--------------------------------------------------+
| name                       | description                                      |
+----------------------------+--------------------------------------------------+
| Android Security Internals | An In-Depth Guide Androids Security Architecture |
+----------------------------+--------------------------------------------------+

1 row in set (0.00 sec)   
```

----------------------------
<h2>Operación Actualizar (UPDATE)</h2>
La operación `UPDATE` sirve para modificar una entrada existente y se usa de la siguiente manera:

```sql
mysql> UPDATE books
	SET description = "An In-Depth Guide to Android's Security Architecture."
	WHERE id = 1;

Query OK, 1 row affected (0.00 sec)
Rows matched: 1 Changed: 1 Warnings: 0
```

Usamos `SET` para especificar el cambio. La cláusula `WHERE` especifica la columna que coincida con el criterio de búsqueda (busca la columnas DONDE la condición se cumpla).

---------------------
<h2>Operación Borrar (DELETE)</h2>
La operación de borrado elimina las entradas de una tabla. Para ello usamos `DELETE`.

```sql
mysql> DELETE FROM books WHERE id = 1;

Query OK, 1 row affected (0.00 sec)
```

