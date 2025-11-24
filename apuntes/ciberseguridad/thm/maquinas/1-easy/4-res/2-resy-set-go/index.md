---
layout: apunte
title: "2. Resy Set Go"
---

1. ¿Cuántos puertos abiertos tiene la máquina?
   !**Pasted image 20251123203402.png**
2. ¿Cuál es el sistema gestor de bases de datos instalado en el sistema?
   Basándonos en el escaneo anterior, vamos a informarnos.
   !**Pasted image 20251123232520.png**
3. ¿En qué puerto corre el DBMS?
   En el 6379.
4. ¿Cuál es la versión del DBMS instalado en el servidor?
   !**Pasted image 20251123232944.png**
5. Compromete la máquina y localiza `user.txt`.
	1. Comprobamos la dirección IP en el puerto 80.
	   !**Pasted image 20251123234610.png**
	2. Después de investigar vi que había una herramienta para conectarse a bases de datos redis.
	   !**Pasted image 20251123235106.png**
	3. Vamos a usar la primera opción para indicarle al host que nos conectaremos.
	   !**Pasted image 20251123235259.png**
	   Salen más cosas pero si nos fijamos, ahí hay un nombre de usuario (vianka): `/home/vianka/redis-stable/src/redis-server`.
	4. Investigando más sobre redis y sus comandos podemos hacer varias cosas.
	   !**Pasted image 20251123235923.png**
	5. Ahora vamos a ver si ha funcionado.
	   !**Pasted image 20251124000002.png**
	   Vemos que podemos inyectar comandos así que vamos a mandarnos una reverse shell.
	6. Nos ponemos en escucha.
	   !**Pasted image 20251124003530.png**
	7. Le metemos el payload a nuestro archivo.
	   !**Pasted image 20251124003554.png**
	8. Cargamos el archivo y le metemos el payload en la variable `cmd`.
	   !**Pasted image 20251124003705.png**
	9. Esperamos conexión.
	   !**Pasted image 20251124003727.png**
	10. Escalamos la shell.
	    !**Pasted image 20251124003755.png**
	    Este método de cambiar/escalar la shell es muy útil para obtener una interactiva.
	11. Navegamos para encontrar la flag.
	    !**Pasted image 20251124003918.png**
6. ¿Cuál es la contraseña del usuario local?
	1. Al intentar obtener la contraseña nos encontramos con un problema.
	   !**Pasted image 20251124004049.png**
	2. Por lo tanto seguimos en la pregunta siete y después volveremos aquí.
	3. 
7. Escala privilegios y obtén `root.txt`.
	1. Buscamos archivos SUID.
	   !**Pasted image 20251124004421.png**