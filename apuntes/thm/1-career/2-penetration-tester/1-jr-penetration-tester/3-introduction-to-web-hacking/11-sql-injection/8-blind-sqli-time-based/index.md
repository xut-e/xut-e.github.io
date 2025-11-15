---
layout: apunte
title: "8. Blind SQLI - Time Based"
---

Una SQLi basada en tiempo es muy similar a la de arriba ya que se mandan las mismas peticiones solo que no hay indicador visual que indique si estamos o no en lo correcto, por lo que tenemos que basarnos en el tiempo que tarda en llegar la respuesta. Este retraso en la respuesta la introducimos con el comando SLEEP(), que sólo se ejecutará con un statement exitoso de UNION SELECT.

Para investigar el número de columnas de una tabla usaríamos por ejemplo: 

`admin123' UNION SELECT SLEEP(5);-- -`

Si no hay pausa en la respuesta sabemos que no es esa, por lo que añadimos otra columna:

`admin123' UNION SELECT SLEEP(5),2;-- -`

Si se produce una espera confirmamos que estamos en lo cierto. Ahora podemos repetir el proceso de la SQLi basada en booleanos añadiendo el método SLEEP().

---------------------------
<h2>Práctica</h2>
Vamos a ver un ejemplo práctico.

-----------------------
<h2>Nivel 4</h2>
Llegamos a lo siguiente.
!**Pasted image 20251114124556.png**

Si vamos probando todos los caracteres llegamos a:

!**Pasted image 20251114124938.png**

Obtenemos uno de los nombres de columna y hacemos lo mismo para 'password':

!**Pasted image 20251114125126.png**

Obtenemos el nombre de un usuario 'admin':

!**Pasted image 20251114125306.png**

Vamos a por la contraseña:

!**Pasted image 20251114125613.png**