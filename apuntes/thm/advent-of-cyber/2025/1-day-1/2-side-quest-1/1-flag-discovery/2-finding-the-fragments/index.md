---
layout: apunte
title: "2. Finding the Fragments"
---

1. Iniciamos sesión en la cuenta de eddi.
   !**Pasted image 20251203005439.png**
2. La primera pista nos habla de algo que va con nuestra sesión y no con nuestros archivos, por lo que se nos viene a la cabeza la configuración de Bash. Eso siempre está con nuestra shell cuando llegamos.
   !**Pasted image 20251203005623.png**
3. La segunda pista nos habla de un "árbol" que podría interpretarse como el comando `tree`. Sin embargo el hecho de que haga referencia a cosas pasadas nos indica que debe ser algún tipo de log.
	1. Vamos a listar todos los directorios.
	   !**Pasted image 20251203005747.png**
	2. Enseguida hay uno que nos llama la atención: `.secret`.
	   !**Pasted image 20251203005825.png**
	   Parece que hay un archivo gpg cifredo al que no tenemos acceso todavía.
	3. Pero vemos un directorio `.secret_git`. Github tiene un historial de commits, tiraremos por ahí.
	   !**Pasted image 20251203010005.png**
	   Parece un commit interesante, ¿no? Ojalá hubiera una forma de recuperarlo...
	4. Espera, tenemos el hash de commit justo al lado.
	   !**Pasted image 20251203010133.png**
4. La tercera pista nos dice algo sobre píxeles y colas (tails). Podría ser algo relacionado con el comando `tail`.
	1. Si investigamos un poco podemos ver lo siguiente.
	   !**Pasted image 20251203010325.png**
	2. Vamos a leer los documentos.
	   !**Pasted image 20251203010420.png**
	   Parece que no hay nada interesante, pero ya que habla de fotos vamos a ver qué hay en ese directorio.
	3. Vamos al directorio y usamos `ls -la`.
	   !**Pasted image 20251203010516.png**
	   Parece que hemos encontrado un archivo oculto.
	4. Vamos a leerlo.
	   !**Pasted image 20251203010550.png**
5. Con esto ya tenemos los tres fragmentos
	1. `3ast3r`
	2. `-1s-`
	3. `c0M1nG`
6. Vamos a descifrar el documento del que nos hablaba en la pista del principio.
	1. Introducimos el comando para desencriptar de GPG.
	   !**Pasted image 20251203010815.png**
	2. Introducimos la contraseña.
	   !**Pasted image 20251203010843.png**
	3. Leemos el documento.
	   !**Pasted image 20251203010916.png**