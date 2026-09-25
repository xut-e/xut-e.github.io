---
layout: apunte
title: "2. Base Camp"
---

<h2>Reconocimiento Inicial</h2>
Comenzamos escaneando los puertos abiertos.

!**Pasted image 20260923125450.png**

Ahora vamos a analizar dichos puertos más en profundidad.

!**Pasted image 20260923125525.png**

Vamos a investigar directorios.

!**Pasted image 20260923125551.png**

Parece que no hay nada común. Vamos a ver cómo se ve la web.

!**Pasted image 20260923125623.png**

----------------------------
<h2>Profundización</h2>
En la web no hemos encontrado nada, aparentemente, por lo que vamos a escanear en busca de subdominios.

!**Pasted image 20260923130236.png**

Escaneando hosts virtuales hemos encontrado los subdominios:

- `admin.k2.thm`
- `it.k2.thm`

Vamos a investigarlos un poco.

<h3>admin.k2.thm</h3>
!**Pasted image 20260923130424.png**

Vamos a investigar los directorios de este subdominio.

!**Pasted image 20260923130620.png**

Parece que de momento aquí no podemos hacer nada.

<h3>it.k2.thm</h3>
!**Pasted image 20260923130551.png**

Vamos a enumerar los posibles directorios de este también.

!**Pasted image 20260923130643.png**

Lo más interesante es que podemos obtener una cuenta registrándonos, aparentemente.

Vamos a ver cómo funciona el tema. Nos registramos.

!**Pasted image 20260923130845.png**

Parece que nos han creado la cuenta.

!**Pasted image 20260923130926.png**

Vamos a iniciar sesión.

!**Pasted image 20260923130950.png**

Vamos a abrir BurpSuite para ver cómo se hacen las peticiones.

!**Pasted image 20260923131240.png**

Parece que puede que se de un XSS.

----------------------------
<h2>Explotación</h2>
<h3>XSS</h3>
Vamos a intentarlo.

!**Pasted image 20260923131534.png**

Abrimos un servidor Python en nuestra máquina y le damos a subir.

!**Pasted image 20260923131620.png**

Parece que hay un WAF en activo, vamos a intentar averiguar qué lo hace saltar. Comenzamos con una petición sencilla, sin nada malicioso.

!**Pasted image 20260923132750.png**

!**Pasted image 20260923132814.png**

Recibimos la conexión correctamente. Escribimos unas cuantas palabras que nos hacen ver que es la string `document.cookie` la que hace que salte el WAF, por lo que vamos a reformular la petición.

!**Pasted image 20260923140525.png**

Y miramos el listener.

!**Pasted image 20260923140407.png**

Cambiamos la cookie en `admin.k2.thm` y navegamos a `/dashboard`:

!**Pasted image 20260923141514.png**

Vemos un nuevo panel. Si investigamos dicho panel, podemos ver que hace una consulta a una base de datos (seguramente).

!**Pasted image 20260923141634.png**

Tiene pinta de que sí es una DB.

<h3>SQL Injection</h3>
Vamos a probar SQLi. Si ponemos una comilla:

!**Pasted image 20260923141705.png**

Vamos a seguir probando. Si ponemos `' OR 1=1;-- -`:

!**Pasted image 20260923141743.png**

Parece que habrá que ser más sutiles. Parece que `'OR 1=1;-- -`, sin espacio, no da error, por lo que el WAF está buscando strings literales. Vamos a realizar un ataque con `UNION SELECT` para poder extraer información.

```sql
'UNION SELECT 1,2,3-- -
```

Nos da el resultado que buscamos:

!**Pasted image 20260923142210.png**

Vamos a extraer la información.

```sql
'UNION SELECT table_name,2,3 FROM information_schema.tables WHERE table_schema=database() -- -
```

!**Pasted image 20260923142320.png**

Vamos a extraer información de `admin_auth`.

```sql
'UNION SELECT column_name,2,3 FROM information_schema.columns WHERE table_name='admin_auth'-- -
```

!**Pasted image 20260923142850.png**

Vamos a extraer las credenciales del admin.

```sql
'UNION SELECT email, admin_password, admin_username FROM admin_auth -- -
```

!**Pasted image 20260923142955.png**

Probamos las combinaciones pertinentes.

!**Pasted image 20260923144859.png**

Vamos a entrar por SSH.

!**Pasted image 20260923144936.png**

Buscamos la primera flag.

!**Pasted image 20260923145004.png**

Listando los usuarios en `/etc/passwd` podemos ver que aparecen sus nombres completos, que es una de las preguntas.

!**Pasted image 20260923145303.png**

Y con eso podemos responder a la tercera pregunta también.

-------------------------------
<h2>Escalada de Privilegios</h2>
Vamos a escalar privilegios.

!**Pasted image 20260923145934.png**

Podemos ver que `james` es parte del grupo `adm`. Si vamos a `/var/log`, podemos buscar contraseñas. 

!**Pasted image 20260923150209.png**

Y después de analizar un poco encontramos lo siguiente:

!**Pasted image 20260923150235.png**

Parece ser la contraseña de `root`.

!**Pasted image 20260923150441.png**

Vamos a buscar la segunda flag.

!**Pasted image 20260923150510.png**

Todavía nos falta encontrar la contraseña de `rose`, por lo que vamos a mirar el historial de dicho usuario.

!**Pasted image 20260923150747.png**

Con esto encontramos la respuesta a la última pregunta.

>[!SUCCESS] Hemos respondido a todas las preguntas.

