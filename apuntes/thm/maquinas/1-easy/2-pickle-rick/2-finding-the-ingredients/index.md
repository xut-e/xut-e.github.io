---
layout: apunte
title: "2. Finding the Ingredients"
---

1. Empezamos escaneando la máquina.
   !**Pasted image 20251218181133.png**
2. Vamos a ir a la página web (puerto 80).
   !**Pasted image 20251218181652.png**
   Básicamente Rick nos pide ayuda porque necesita sus ingredientes que están en el ordenador pero no recuerda su contraseña y sin ella no nos podemos loguear. Sabemos que él es Rick, por lo que el usuario puede ser algo tipo `admin`, `root` o `rick`, siendo la última la más probable.
3. Pero bueno, de momento vamos a seguir con el reconocimiento. Vamos a enumerar directorios con `gobuster`.
   !**Pasted image 20251218183448.png**
4. Mientras tanto vamos a inspeccionar la página con `Ctrl+U`.
   !**Pasted image 20251218182231.png**
   Vaya vaya, acabamos de encontrar el usuario: `R1ckRul3s`.
5. Vamos a meternos en `/assets`.
   !**Pasted image 20251218183038.png**
6. Parece que hay unos cuantos archivos, vamos a descargarlos para examinarlos.
   !**Pasted image 20251218183334.png**
   O bien hay un formulario de subida o bien hay mensajes ocultos aquí, seguro.
7. Después de usar `file` y `exiftool` parece ser que no hay nada.
   !**Pasted image 20251218183958.png**
8. Vamos a lanzar un ataque de fuerza bruta contra el puerto 22 de la máquina, es nuestra última bala.
   !**Pasted image 20251218184534.png**
   No funciona.
9. Intentar loguearse sin más tampoco.
   !**Pasted image 20251218184604.png**
10. Vamos a hacer un escaneo más a fondo.
    !**Pasted image 20251218184642.png**
    Parece que SSH es una versión antigua.
11. No he encontrado nada después de buscar vulnerabilidades de las versiones de SSH y Apache. Así que he optado por realizar más enumeración.
    !**Pasted image 20251218191615.png**
12. Vamos  a la página de `login.php`.
    !**Pasted image 20251218190310.png**
13. Vamos a interceptar la petición con Burp Suite para ver cómo es.
    !**Pasted image 20251218190431.png**
    Es una petición por POST.
14. Vamos a lanzar un ataque de fuerza bruta contra la página de login.
	1. Primero probamos cómo se ve la respuesta cuando la metemos mal.
	   !**Pasted image 20251218191255.png**
	2. Con esta información ya podemos iniciar el ataque de fuerza bruta.
	   !**Pasted image 20251218192000.png**
15. Mientras espero me da por seguir mirando y enumerando en la página. Pruebo `/robots.txt`.
    !**Pasted image 20251218191835.png**
    Parece que podría ser la contraseña. Esto es algo que Rick dice muuuuucho.
16. Efectivamente era la contraseña.
    !**Pasted image 20251218191925.png**
    Ya no tiene sentido seguir con el ataque de fuerza bruta así que lo paro.
17. Parece que podemos ejecutar comandos. Vamos a listar y a leer si hay algo interesante.
    !**Pasted image 20251218194113.png**
18. No se puede hacer `cat` directo.
    !**Pasted image 20251218194152.png**
19. Si nos ponemos a investigar, en todas las otras páginas se ve el `/denied.php`.
    !**Pasted image 20251218194818.png**
20. Si lo intentamos borrar no podemos porque es propiedad de `Ubuntu`. Pero si escribimos `sudo -l`:
    !**Pasted image 20251218194951.png**
21. Si hacemos `sudo rm denied.php`.
    !**Pasted image 20251218195105.png**
22. Tampoco funciona así.
    !**Pasted image 20251218195307.png**
23. Vamos a probar con una reverse shell.
    !**Pasted image 20251218195437.png**
    !**Pasted image 20251218195606.png**
24. Recibimos la shell.
    !**Pasted image 20251218195626.png**
25. Estabilizamos y mejoramos la shell.
    !**Pasted image 20251218195832.png**
26. Leemos el primer ingrediente.
    !**Pasted image 20251218195912.png**
    En `clue.txt` pone que miremos por el sistema de archivos para encontrar la segunda pista.
27. Buscando llegamos al perfil de `rick`.
    !**Pasted image 20251218200239.png**
28. Y allí leemos el segundo ingrediente.
    !**Pasted image 20251218200305.png**
29. Si buscamos por history.
    !**Pasted image 20251218200637.png**
30. Si lo leemos.
    !**Pasted image 20251218200712.png**

>[!SUCCESS] Hemos encontrado todos los ingredientes :))

