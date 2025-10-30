---
layout: apunte
title: "4. Database and Table Statements"
---

<h2>Hora de Aprender</h2>
Ahora la parte divertida. Hora de aprender SQL y como interactuar con bases de datos. En esta lección vamos a empezar por aprender y usar los statements de tablas y bases de datos.

-----------------
<h2>Statements de Bases de Datos</h2>
<h4>CREATE DATABASE</h4>
Si necesitamos una base de datos nueva, el primer paso que deberíamos tomar el crearla. Esto sólo puede ser hecho en SQL usando el comando `CREATE DATABASE`. Se usa la siguiente sintaxis:

```SQL
mysql> CREATE DATABASE database_name;
```

<h4>SHOW DATABASES</h4>
Ahora que hemos creado una base de datos, podemos verla usando `SHOW DATABASES`. Esto nos devolverá una lista de todas las bases de datos que tenemos.

```SQL
mysql> SHOW DATABASES;
```

<h4>USE DATABASE</h4>
Si queremos interactuar con la base de datos, primero debemos decirle al DBMS que queremos usar esa base de datos. Si tuviéramos, por ejemplo, una base de datos llamada "library", usaríamos:

```sql
mysql> USE library;
```

<h4>DROP DATABASE</h4>
Una vez que una base de datos ya no es necesaria, podemos eliminarla con el comando `DROP` con la siguiente sintaxis.

```sql
mysql> DROP database library;
```

--------------
<h2>Statements de Tablas</h2>
Ahora que podemos crear, listar, usar y eliminar bases de datos toca aprender a poblar esas bases de datos con tablas e interactuar con ellas.

<h4>CREATE TABLE</h4>
Siguiendo la misma lógica que para las bases de datos, para las tablas también se usa `CREATE`. Sin embargo la sintaxis es sustancialmente diferente. Para crear una tabla, debemos conocer los datos que vamos a introducir en ella:

```sql
mysql> CREATE TABLE inventario_libros (
	id_libro INT AUTO_INCREMENT PRIMARY KEY,
	nombre_libro VARCHAR(255) NOT NULL,
	fecha_publicacion DATE
);
```

<h4>SHOW TABLES</h4>
Igual que podemos listar bases de datos, podemos hacerlo con las tablas.

```sql
mysql> SHOW TABLES;
```

---------------
<h2>DESCRIBE</h2>
Si queremos qué tipo de columnas hay en una tabla, podemos describirlas con el comando `DESCRIBE`. Esto mostrará la tabla con la composición de esta:

```sql
mysql> DESCRIBE inventario_libros;
```

Arrojará un output así:

```sql
+-------------------+--------------+------+-----+---------+----------------+
| Field             | Type         | Null | Key | Default | Extra          |
+-------------------+--------------+------+-----+---------+----------------+
| id_libro          | int          | NO   | PRI | NULL    | auto_increment |
| nombre_libro      | varchar(255) | NO   |     | NULL    |                |
| fecha_publicacion | date         | YES  |     | NULL    |                |
+-------------------+--------------+------+-----+---------+----------------+
3 rows in set (0.02 sec)
```

<h4>ALTER</h4>
Una vez creada la tabla, puede llegar el momento en el que nuestras necesidades cambien y entonces tendremos que alterar la tabla. Esto puede hacerse usando `ALTER`. Imaginemos que ahora queremos tener una columna que tenga el número de páginas de cada libro, para ello:

```sql
mysql> ALTER TABLE inventario_libros
ADD recuento_paginas INT;
```

Se puede usar también para renombrar o eliminar columnas.

<h4>DROP</h4>
Igual que hacer drop de una base de datos, `DROP` elimina una tabla:

```sql
mysql> DROP TABLE inventario_libros;
```
