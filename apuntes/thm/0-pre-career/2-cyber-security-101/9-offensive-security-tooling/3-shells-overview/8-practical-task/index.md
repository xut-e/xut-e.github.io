---
layout: apunte
title: "8. Practical Task"
---

Tenemos la siguiente información antes de empezar:

- 10.10.111.78:8080 hosts the landing page
- 10.10.111.78:8081 hosts the web application that is vulnerable to command injection.
- 10.10.111.78:8082 hosts the web application that is vulnerable to an unrestricted file upload.

----------------------
1. Entramos a la página principal dada:
   ![](/apuntes/img/Pasted image 20251017174947.png)
2. Reverse/Bind Shell nos lleva al puerto `8081`:
   ![](/apuntes/img/Pasted image 20251017175056.png)
	1. Abrimos un listener:
	   ![](/apuntes/img/Pasted image 20251017175323.png)
	2. Metemos el oneliner de reverse shell en la página:
	   ![](/apuntes/img/Pasted image 20251017175351.png)
	3. Obtenemos la conexión:
	   ![](/apuntes/img/Pasted image 20251017175431.png)
	4. Encontramos la flag:
	   ![](/apuntes/img/Pasted image 20251017175637.png)
3. Web Shell nos lleva al puerto `8082`:
   ![](/apuntes/img/Pasted image 20251017175722.png)
	1. Creamos el archivo `shell.php`:
	   ![](/apuntes/img/Pasted image 20251017175838.png)
	2. Lo subimos al servidor:
	   ![](/apuntes/img/Pasted image 20251017175912.png)
	3. Miramos en el directorio /uploads:
	   ![](/apuntes/img/Pasted image 20251017180444.png)
	4. Buscamos el archivo flag en el directorio correspondiente:
	   ![](/apuntes/img/Pasted image 20251017180526.png)
	5. Leemos la flag:
	   ![](/apuntes/img/Pasted image 20251017180612.png)