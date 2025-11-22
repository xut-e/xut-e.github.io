---
layout: apunte
title: "2. What is a Database"
---

Si no estás habituado a trabajar con bases de datos o explotarlas, aquí tienes alguna tecnología con la que familiarizarte.

---------------------------
<h2>¿Qué es una Base de Datos?</h2>
Una base de datos es un modo electrónico de guardar recopilaciones de información de manera organizada. Una base de datos es gestionada por un DBMS, que es un acrónimo de Database Management System. Estas se dividen en dos tipos: Relacionales y No Relacionales. El enfoque de esta unidad será en las relacionales. Algunas comunes son MySQL, Microsoft SQL Server, Access, PostgreSQL y SQLite.

En un DBMS puedes tener varias bases de datos, cada una con si conjunto de información relacionada. Por ejemplo, podrías tener una base de datos llamada "**tienda**". Dentro de ella querrás guardar información sobre los **productos** disponibles para comprar, **usuarios** que se hayan registrado e información sobre los **pedidos**. Almacenarías esta información en la base de datos usando una estructura llamada "tabla". Cada una se identifica con un nombre único.

!**Pasted image 20251113202512.png**

-----------------------------------
<h2>¿Qué son las Tablas?</h2>
Una tabla está hecha de columnas y filas. Una manera útil de imaginarse una tabla es como una red en la que las columnas van de arriba a abajo y las filas de izquierda a derecha.

!**Pasted image 20251113202650.png**

<h5>Columnas</h5>
Cada columna tiene un nombre único por tabla. Al crear una columna, puedes también configurar el tipo de información que contendrá. Algunos tipos comunes son **INT** (números enteros), **VARCHAR** (cadenas de texto/números) o **DATE** (fechas). Esta acción de especificar el tipo de dato previene que no se guarde información en un sitio que no corresponde. Una columna que contiene un INT también puede tener un atributo que la haga **AUTO_INCREMENT**ar. Esto da lugar a una **PK** (Primary Key o Clave Primaria), que es el campo único por entrada que identifica a cada elemento de la tabla tanto dentro de ella como fuera.

<h5>Filas</h5>
Las filas, o registros, contienen la información. Cuando añades información a la tabla, se crea una nueva fila y cuando la quitas se elimina.

------------------------------------
<h2>Bases de Datos Relacionales vs No Relacionales</h2>
Una base de datos relacional guarda información en tablas, normalmente estas comparten información entre ellas. Usan columnas para especificar y definir la información que se guarda. Las tablas contendrán una columna que sea un ID único (PK) que será usada para referenciar esta tabla y sus componentes desde otra o desde queries SQL.

Las bases de datos no relacionales, a veces llamadas NoSQL, por otro lado, son cualquier tipo de base de datos que no use tablas, columnas y filas para guardar la información. Dan más flexibilidad con respecto a las relacionales porque se puede guardar cualquier tipo de información. Algunas bases de datos populares en esta categoría son MongoDB, Cassandra y ElasticSearch.

