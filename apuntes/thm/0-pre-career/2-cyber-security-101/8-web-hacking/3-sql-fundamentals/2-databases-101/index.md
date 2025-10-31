---
layout: apunte
title: "2. Databases 101"
---

<h2>Introduciendo las Bases de Datos</h2>
Las bases de datos son colecciones ordenadas de información estructurada fácilmente accesible. Las bases de datos se usan de manera intensiva. Todo el mundo/programas/empresas pueden y deberían usarlas para almacenar cualquier tipo de información.

-----------------------
<h2>Diferentes Tipos de Bases de Datos</h2>
Tiene sentido que algo tan popularmente utilizado durante tanto tiempo como las bases de datos tuvieran varias manearas de implementarse, y así es. Por ahora nos centraremos en las bases de datos relacionales (SQL) y no relacionales (NoSQL).

**Bases de Datos Relacionales:** Guardan información estructurada. Por ejemplo la lista de un usuario consistiría de: `nombre, apellido, email, username y contraseña`. Esta información es guardada en filas y columnas en una tabla. Entonces pueden hacerse relaciones entre tablas, por ejemplo: `user e historial_pedidos`.

**Bases de Datos No Relacionales:** En vez de guardar información como la de arriba, esta lo hace en un formato no tabular. Aquí se muestra un ejemplo:

```bash
 {
    _id: ObjectId("4556712cd2b2397ce1b47661"),
    name: { first: "Thomas", last: "Anderson" },
    date_of_birth: new Date('Sep 2, 1964'),
    occupation: [ "The One"],
    steps_taken : NumberLong(4738947387743977493)
}
```


En términos de qué tipo de base de datos deberías escoger, siempre se reduce al contexto de su creación. Si la exactitud se precisa, las relacionales son mejores mientras que las no relacionales son mejores si la información introducida puede variar mucho en formato o tamaño pero necesita ser recopilada en el mismo sitio.

--------------------
<h2>Tablas, Filas y Columnas</h2>
Ahora que hemos definido los dos tipos, nos centraremos en bases de datos relacionales. Empezaremos cubriendo las tablas, filas y columnas. 

Toda la información guardada en una BDR será almacenada en una **tabla**, por ejemplo si fuera una tienda de libros, podría tener una tabla llamada "Libros o "Books". Para crear esta tabla necesitarías definir qué tipo de información es relevante almacenar, por ejemplo: `id, name, published_date`. Estas serían nuestras **columnas**. Al definir las columnas también tenemos que definir qué tipo de datos van dentro. Los tipos pueden ser varios dependiendo de qué datos vayamos a guardar: `INT` para enteros, `DATE` para fechas, `FLOAT` para decimales, etc. Una vez creada podemos empezar a añadir entradas con datos como `name: "Android Security Internals", id: "1", published_date: "2014-10-14"`. Esto forma una **fila**.

---------------------
<h2>Claves Primarias y Foráneas</h2>
Puede que queramos relacionar una tabla que contiene los libros con otra tabla que contiene los autores. En este caso podríamos establecer una relación entre las tablas.

En nuestra tabla de libros, el `id` sería nuestra clave primaria, porque es única e irrepetible. Así mismo, en la tabla de autores el `id` podría ser nuestra PK (Primary Key). Y para relacionarlas añadiríamos una FK (Foreign Key o Clave Foránea) en la tabla de libros con el nombre de columna `id_autor`, donde introduciríamos el id del autor de la tabla autor.

!**Pasted image 20250930233218.png**
