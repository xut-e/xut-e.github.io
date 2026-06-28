---
layout: apunte
title: "2. Getting the Flags"
---

<h2>Reconocimiento Inicial</h2>
Primero empezamos escaneando los puertos abiertos.

!**Pasted image 20260627184959.png**

Ahora vamos a profundizar en dichos puertos.

!**Pasted image 20260627185016.png**

Parece que hay algunos directorios, los investigaremos más tardes. Vamos a mirar qué directorios tiene la web con una herramienta.

!**Pasted image 20260627185130.png**

No hemos encontrado nada más interesante que lo que ya teníamos, así que vamos a ver cómo se ve la web:

!**Pasted image 20260627185300.png**

----------------------------------
<h2>Profundización</h2>
Parece que no hay nada, vamos a mirar en `robots.txt`:

!**Pasted image 20260627185339.png**

Vamos a ver qué nos encontramos en estos directorios. A primera vista, sólo hay uno de los directorios que conduce a algún sitio: `/comingreallysoon/`:

!**Pasted image 20260627185607.png**

Vamos a ver qué vemos por ahí:

!**Pasted image 20260627185711.png**

Después de navegar por toda la página encontramos un campo donde se puede meter texto. Si ponemos algo cualquiera como `test`, nos dice que el cupón no existe:

!**Pasted image 20260627191620.png**

Ahora vamos a probar con una comilla:

!**Pasted image 20260627191658.png**

Bingo, parece que la query hace algo como:

```sql
SELECT ___ WHERE ___ LIKE "%QUERY"
```

Vamos a ver si por aqí podemos hacer algo. Vamos a usar `sqlmap`.

```bash
sqlmap -u "http://wekor.thm/it-next/it_cart.php" --forms --dbs
```

Este comando nos devuelve lo siguiente:

!**Pasted image 20260627192213.png**

Ahora vamos a entrar a WordPress. Como ya sabemos qué parámetro es vulnerable, vamos a utilizarlo:

```bash
sqlmap -u "http://wekor.thm/it-next/it_cart.php" --data="coupon_code=test&apply_coupon=Apply%20Coupon" -p coupon_code -D wordpress --tables --batch
```

Así obtenemos:

!**Pasted image 20260627192741.png**

Vamos a mirar las entradas de `wp_users`:

!**Pasted image 20260627193219.png**

De aquí obtenemos lo que necesitamos. Además, podemos ver que hay un virtual host en el `user_url` de `admin`, vamos a añadirlo y a realizar un escaneo.

!**Pasted image 20260627193826.png**

Ahora vamos a crackear los hashes. Para ello creamos el siguiente documento:

!**Pasted image 20260627193904.png**

Y por último se lo pasamos:

!**Pasted image 20260627194513.png**

Vamos ahora a iniciar sesión en WordPress con lo que hemos obtenido. Con `wp_jeffrey` funciona.

!**Pasted image 20260627195035.png**

Sin embargo, parece que no es la cuenta más privilegiada, por lo que probamos las otras. Siendo `wp_yura` la más privilegiada.

-----------------------------------------
<h2>Explotación</h2>
Una vez dentro de la cuenta, vamos a editar los temas:

!**Pasted image 20260627200010.png**

Una vez allí vamos a subir una reverse shell de PHP:

!**Pasted image 20260627200314.png**

Ahora la pegamos en la plantilla.

!**Pasted image 20260627200405.png**

Y nos ponemos en escucha:

!**Pasted image 20260627200418.png**

Ahora buscamos la página:

```http
http://site.wekor.thm/wordpress/wp-content/themes/twentytwentyone/404.php
```

Y así obtenemos la shell:

!**Pasted image 20260627200708.png**

Buscamos la flag.

!**Pasted image 20260627200755.png**

Parece que tendremos que hacer un movimiento lateral. Después de un rato buscando no encontré nada, así que decidí listar servicios internos:

!**Pasted image 20260627201350.png**

El servicio de ese puerto es `memcached`, el cual puede utilizarse para recuperar contraseñas.

!**Pasted image 20260627201514.png**

>[!TIP] Para salir escribe `quit`.

Con dicha contraseña, iniciamos sesión con Orka.

!**Pasted image 20260627201917.png**

Ahora leemos la flag.

!**Pasted image 20260627202022.png**

---------------------------
<h2>Escalada de Privilegios</h2>
Ahora vamos a ver qué podemos ejecutar:

!**Pasted image 20260627202253.png**

Si miramos el directorio del comando podemos ver que podemos modificarlo, aunque le pertenezca a root.

!**Pasted image 20260627202740.png**

Ahora recreamos el documento con una shell:

!**Pasted image 20260627202945.png**

Y al ejecutarlo:

!**Pasted image 20260627203019.png**

Ahora leemos la flag:

!**Pasted image 20260627203056.png**

--------------------------------------
<h2>Conclusión</h2>
Una máquina con su cierta complejidad, hemos practicado:

- Enumeración.
- Inyección SQL.
- Explotación de plantillas de WordPress.
- Listado de servicios.
- Servicio `memcached`.
- Escalada de privilegios por modificación de ruta.

Una máquina completa y con cierta complejidad, pero divertida.