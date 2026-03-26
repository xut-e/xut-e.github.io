---
layout: apunte
title: "2. Getting the Flags"
---

Nos hacen varias preguntas en esta máquina:

1. ¿Cómo se llama el directorio que has encontrado?

Empezaremos haciendo un escaneo de puertos.

!**Pasted image 20260324145759.png**

Ahora escaneamos dichos puertos más a fondo.

!**Pasted image 20260324145828.png**
!**Pasted image 20260324145852.png**

Ahora procedemos al listado de directorios web.

!**Pasted image 20260324150218.png**

Dirsearch no encuentra nada, vamos a mirar manualmente la web.

!**Pasted image 20260324150426.png**

Parece una página estática, pero llama la atención que únicamente la palabra "arrow" (flecha) está en negrita. Primero miraré si `robots.txt` existe, pero acto seguido voy comprobar que `/arrow/` no sea un directorio.

No existe ninguno de los dos.

Voy a probar con otro enumerador, vamos con `gobuster`.

!**Pasted image 20260324150953.png**

Bingo! Parece que hemos encontrado el directorio. Al meter `/island` no funcionó, así que volví a realizar un escaneo sobre este nuevo directorio y lo encontré.

!**Pasted image 20260324151300.png**

2. ¿Cómo se llama el archivo que has encontrado?

En el directorio `island/` nos encontramos con lo siguiente:

!**Pasted image 20260324151452.png**

Si miramos el código fuente vemos la palabra secreta:

!**Pasted image 20260324151527.png**

En el directorio `/2100/` vemos lo siguiente:

!**Pasted image 20260324151654.png**

Si miramos el código fuente dice que podemos adquirir aquí nuestro `.ticket`, pero ¿cómo?

Si enumeramos con la extensión `.ticket` lo tenemos:

!**Pasted image 20260324152400.png**

3. ¿Cuál es la contraseña FTP?

Si leemos el archivo encontramos lo que probablemente sea la contraseña de FTP, aunque parece encodeada.

!**Pasted image 20260324152520.png**

Después de un rato decodeando encontramos que está encodeada en base58.

!**Pasted image 20260324152944.png**

4. ¿Cuál es el nombre del archivo con la contraseña SSH?

Vamos a meternos al servidor FTP con el posible username que encontramos antes `vigilante` y la contraseña obtenida.

!**Pasted image 20260324153216.png**
!**Pasted image 20260324154842.png**

Del texto `.other_user` sacamos algunos posibles usernames:

!**Pasted image 20260324155112.png**

Parecen ser 3 fotos, vamos a ver qué contienen realmente.

!**Pasted image 20260324153258.png**

Parece que `Leave_me_alone.png` contiene información. Las herramientas revelan que hay un error de formato. Vamos a cambiar los magic bytes por los de png.

De esto:

!**Pasted image 20260324153738.png**

A esto:

!**Pasted image 20260324153833.png**

Así encontramos lo que parece una contraseña:

!**Pasted image 20260324153934.png**

Si ahora usamos `steghide` sobre las imágenes nos damos cuenta de que `aa.jpg` parece contener datos.

!**Pasted image 20260324154321.png**

Si ahora probamos con la contraseña obtenida a extraerlo:

!**Pasted image 20260324154407.png**

Vamos a unzippearlo y a ver qué contiene.

!**Pasted image 20260324154438.png**

Parece que hemos encontrado el nombre del archivo.

!**Pasted image 20260324154552.png**

5. ¿Cuál es la flag `user.txt`?

Con la contraseña nos metemos por SSH, vamos a realizar fuerza bruta con todos los posibles nombres de usuario que tenemos hasta la fecha.

!**Pasted image 20260324155423.png**

Ahora hacemos la fuerza bruta con la contraseña.

!**Pasted image 20260324155620.png**

Ahora entramos por SSH.

!**Pasted image 20260324155659.png**

Si buscamos la flag y la leemos:

!**Pasted image 20260324155727.png**

6. ¿Cuál es la flag `root.txt`?

Ahora tenemos que encontrar la forma de escalar privilegios. Vamos a ver el id de nuestro usuario:

!**Pasted image 20260324155840.png**

Somos parte de muchos grupos, podrías ser interesante si no encontramos otro vector de escalada. Vamos a comenzar con nuestra checklist de privesc.

!**Pasted image 20260324155940.png**

Parece que podemos ejecutar `pkexec` como root.

!**Pasted image 20260324160020.png**

Buscando en GTFOBins vemos que es un claro vector de escalada. Vamos a proceder.

!**Pasted image 20260324160100.png**

Ahora listamos la flag y la leemos.

!**Pasted image 20260324160205.png**