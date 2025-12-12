---
layout: apunte
title: "6. Cryptographic Failures (Supporting Material 1)"
---

La forma más común de guardar una cantidad grande de información en un formato fácilmente accesible desde varios sitios es una base de datos. Los sitios web usualmente siguen SQL.

En un entorno de producción, es común ver bases de datos configuradas en servidores dedicados. Sin embargo, las bases de datos también se pueden guardar como archivos. A estas se les llama bases de datos "flat-files". Es mucho más sencillo que configurar una base de datos (aunque a gran escala también es mucho mas complicado de acceder a los datos).

Como ya hemos dicho estos flat-files están guardados en directorios. Esto no sería un problema pero ¿qué pasa si la base de datos está guardada bajo el directorio root? Podríamos hacer queries a nuestra propia máquina, filtrando archivos potencialmente sensibles.

Vamos con el ejemplo, usaremos `sql3`. Supongamos que hemos sido capaces de descargarnos la base de datos:

```bash
user@linux$ ls -l 
-rw-r--r-- 1 user user 8192 Feb  2 20:33 example.db
                                                                                                                                                              
user@linux$ file example.db 
example.db: SQLite 3.x database, last written using SQLite version 3039002, file counter 1, database pages 2, cookie 0x1, schema 4, UTF-8, version-valid-for 1
```

Podemos ver que hay un archivo SQLite. Para acceder a él usamos `sqlite3 <database_name>`.

```bash
user@linux$ sqlite3 example.db                     
SQLite version 3.39.2 2022-07-21 15:24:47
Enter ".help" for usage hints.
sqlite> 
```

Ahora podemos usar las tablas usando el comando `.tables`:

```sqlite
sqlite> .tables
customers
```

Ahora podemos dumpear todo el contenido de las tablas. Aunque todavía no sabemos lo que significa cada columna hasta que miremos la información de la tabla, usemos pues, primero, `PRAGMA table_info(customers);` para ver la información de la tabla. Después usamos `SELECT * FROM customers;` para obtener la información guardada en la tabla.

```sqlite
qlite> PRAGMA table_info(customers);
0|cudtID|INT|1||1
1|custName|TEXT|1||0
2|creditCard|TEXT|0||0
3|password|TEXT|1||0

sqlite> SELECT * FROM customers;
0|Joy Paulson|4916 9012 2231 7905|5f4dcc3b5aa765d61d8327deb882cf99
1|John Walters|4671 5376 3366 8125|fef08f333cc53594c8097eba1f35726a
2|Lena Abdul|4353 4722 6349 6685|b55ab2470f160c331a99b8d8a1946b19
3|Andrew Miller|4059 8824 0198 5596|bc7b657bd56e4386e3397ca86e378f70
4|Keith Wayman|4972 1604 3381 8885|12e7a36c0710571b3d827992f4cfe679
5|Annett Scholz|5400 1617 6508 1166|e2795fc96af3f4d6288906a90a52a47f
```

Podemos ver que hay cuatro columnas, `custID`, `custName`, `creditCard` y `password`. Podemos ver que además concuerda con los resultados.