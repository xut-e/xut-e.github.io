---
layout: apunte
title: "2. Getting the Flags"
---

<h2>Reconocimiento Inicial</h2>
Comenzamos con un escaneo de puertos abiertos.

!**Pasted image 20260517170034.png**

Ahora vamos a escanear dichos puertos más en profundidad.

!**Pasted image 20260517170052.png**

Vamos a ver qué hay en cada web.

- `5000`:
  !**Pasted image 20260517171453.png**
- `5001`:
  !**Pasted image 20260517171505.png**
- `5002`:
  !**Pasted image 20260517171523.png**
- `5003`:
  !**Pasted image 20260517171533.png**

Aparentemente no hay mucha cosa, vamos a ver cómo se ven las páginas.

- `5000`:
  !**Pasted image 20260517171654.png**
  No nos deja avanzar al nivel dos hasta haber solucionado el uno.
  !**Pasted image 20260517171724.png**
- `5001`:
  !**Pasted image 20260517171739.png**
- `5002`:
  !**Pasted image 20260517171806.png**
- `5003`:
  !**Pasted image 20260517171837.png**

Parece que estamos viendo todos los servicios activos. Vamos a investigar.

---------------------------------
<h2>Contraseña 1</h2>
Vamos a comenzar por el puerto 5000. Cuando vamos a esta página, podemos ver que nos dan una pista.

!**Pasted image 20260517172132.png**

Vamos a ir al puerto 5001 a probar credenciales por defecto entonces.

!**Pasted image 20260517172240.png**

Si nos fijamos en los placeholders podemos ver que el primero es `admin` y la contraseña tiene la longitud perfecta para algo tipo `admin123` o `password`. Así que vamos a probar. Después de probar con combinaciones simples como `1234`, y `123456` conseguimos la contraseña (no es ninguna de esas).

!**Pasted image 20260517172843.png**

Si introducimos la contraseña en el primer nivel del puerto 5000, se nos desbloquea el nivel dos.

---------------------------------
<h2>Contraseña 2</h2>
!**Pasted image 20260517173000.png**

Y nos dan otra pista. Así que vamos al puerto 5002 a ver qué hay. Si le damos a "Employee Login" llegamos a este portal.

!**Pasted image 20260517173041.png**

Dice que ha utilizado como contraseñas palabras clave de la compañía. Si nos fijamos en la página principal del puerto, podemos ver algunas palabras clave.

!**Pasted image 20260517173321.png**

Probando con ellas vemos que, en efecto, una es la contraseña.

!**Pasted image 20260517173402.png**

Introducimos dicha contraseña en el nivel dos y eso nos desbloquea el nivel tres, donde nos dan otra pista.

---------------------------------
<h2>Contraseña 3</h2>
!**Pasted image 20260517173451.png**

Si vamos al puerto 5003, podemos ver esta pista:

!**Pasted image 20260517173529.png**

Así que vamos de vuelta al puerto anterior a ver si podemos encontrar algo.

!**Pasted image 20260517173610.png**

Parece que una mezcla de esta información es la que puede valernos. Después de probar un par me cansé así que optaremos por usar una herramienta llamada `cupp`.

!**Pasted image 20260517174043.png**

Vamos a usarlo en modo interactivo.

!**Pasted image 20260517174246.png**

Ahora vamos a usar hydra para realizar el ataque.

!**Pasted image 20260517174616.png**

Hemos obtenido la tercera contraseña. Vamos a ponerla en el nivel tres y así obtener acceso al nivel cuatro.

---------------------------------
<h2>Contraseña 4</h2>
!**Pasted image 20260517174841.png**

Nos dice básicamente que los archivos que se suben en vez de guardarse con el nombre tal cual se transforma este nombre a SHA256 y se guarda de esa manera. Debemos obtener el nombre de archivo original que se subió. Seleccionamos la foto de perfil en el inspector de F12 y miramos el hash.

!**Pasted image 20260517175140.png**

Ahora toca descifrarlo.

!**Pasted image 20260517175242.png**

Lo hemos encontrado. Vamos a introducirlo en el nivel cuatro para obtener acceso al nivel cinco.

---------------------------------
<h2>Contraseña 5</h2>
!**Pasted image 20260517175354.png**

No encontramos con esto. Marco ha revelado el patrón de su contraseña en la red social:

!**Pasted image 20260517175440.png**

Ahora debemos construir un diccionario para acceder a SSH.

Vamos a empezar usando la primera palabra: Security. Generamos la wordlist con `crunch`.

!**Pasted image 20260517175902.png**

Ahora vamos a realizar fuerza bruta contra SSH.

!**Pasted image 20260517180049.png**

Y tan fácil como eso obtenemos la quinta contraseña. Vamos a introducirla

>[!SUCCESS] Hemos conseguido obtener las cinco contraseñas.

