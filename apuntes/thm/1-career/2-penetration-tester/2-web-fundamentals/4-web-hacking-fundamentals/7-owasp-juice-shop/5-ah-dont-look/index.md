---
layout: apunte
title: "5. AH Dont Look"
---

!**Pasted image 20251211174508.png**

Una aplicación web debería guardar y transmitir información sensible de forma segura. Pero en algunos casos, el desarrollador puede no proteger correctamente su información sensible, haciéndola vulnerable.

La mayoría de veces, la protección de la información no se aplica consistentemente a lo largo de la aplicación web haciendo ciertas páginas accesibles al público. Otras veces, la información se filtra sin conocimiento del desarrollador.

--------------------------------------------
1. Accede al documento confidencial.
	1. Navegamos hasta la página "About Us".
	   !**Pasted image 20251212142516.png**
	2. Vamos al enlace verde.
	   !**Pasted image 20251212142540.png**
	3. Intentamos navegar al directorio padre.
	   !**Pasted image 20251212142605.png**
	   Hemos puesto `http://<IP>/ftp/legal.md/..` y funciona por lo que parece que es vulnerable a Path Traversal.
	4. Descargamos **acquisitions.md**.
	   !**Pasted image 20251212142634.png**
	5. Obtenemos la flag.
	   !**Pasted image 20251212142656.png**
2. Inicia sesión en la cuenta de MC SafeSearch.
	1. Si vemos el vídeo, en los primeros 44 segundos se menciona que su contraseña es "Mr. Noodles" y que ha cambiado vocales por ceros.
	   !**Pasted image 20251212143500.png**
	2. Intentamos iniciar sesión con `mc.safesearch@juice-sh.op` y `Mr. N00dles`.
	   !**Pasted image 20251212143537.png**
	3. Y efectivamente obtenemos la flag.
	   !**Pasted image 20251212143551.png**
3. Descarga el archivo de Backup.
	1. Vamos a la página de antes.
	   !**Pasted image 20251212143620.png**
	2. Le damos a `package.json.bak`.
	   !**Pasted image 20251212143632.png**
	   Nos hemos encontrado con un error 403, Forbidden.
	3. Vamos a usar el `Null Byte` para sobrepasarlo.
		1. Vamos a Cyber Chef para URL-encodearlo.
		   !**Pasted image 20251212143728.png**
		2. Lo escribimos en la URL junto con la terminación `.md` porque solo se permiten esa y `.pdf`.
		   !**Pasted image 20251212143805.png**
	4. Encontramos la flag.
	   !**Pasted image 20251212143935.png**

