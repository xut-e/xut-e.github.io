---
layout: apunte
title: "10. III.I. Command Injection"
---

<h2>Inyección de Comandos</h2>
La inyección de comandos ocurre cuando código del lado del servidor, como PHP, en una aplicación web, hace una llamada a una función que interactúa con la consola directamente. Una de estas vulnerabilidades permite al atacante ejecutar comandos en el sistema host.

Una vez que esto pasa, ya puede empezar con la fase de enumeración y pivotar entre sistemas.

------------------
<h2>Ejemplo de Código</h2>
Consideremos el siguiente escenario: MooCorp ha empezado a desarrollar una aplicación basada en web para arte ASCII de vacas con texto personalizable. Buscando maneras de implementar su app, han encontrado el comando `cowsay` de Linux, que hace justo eso. Así que en vez de programar una aplicación web entera, usan código simple para decirle a `cowsay` lo que tiene que hacer. Veamos el código que han desarrollado:

```php
<?php
    if (isset($_GET["mooing"])) {
        $mooing = $_GET["mooing"];
        $cow = 'default';

        if(isset($_GET["cow"]))
            $cow = $_GET["cow"];
        
        passthru("perl /usr/bin/cowsay -f $cow $mooing");
    }
?>
```

En términos simples, este código hace lo siguiente:

1. Comprueba si el parámetro "mooing" está definido. Si lo está, la variable `$mooing` recibe el valor pasado por el parámetro.
2. Comprueba si el parámetro "cow" está definido. Si lo está, la variable `$cow` toma lo que le haya sido pasado.
3. El programa ejecuta la función `passthru("perl /usr/bin/cowsay -f $cow $mooing);`. La función `passthru`, ejecuta un comando en la consola del sistema operativo. Podemos ver que el comando está concatenando las variables. Ya que podemos manipular esas variables, podemos inyectar comandos usando trucos.
   
   ![](/apuntes/img/Pasted image 20251009223354.png)

----------------------
<h2>Explotar Inyección de Comandos</h2>
Ahora que sabemos cómo funciona la aplicación por dentro, nos aprovecharemos de una capacidad de bash llamada "inline commands".

Para ejecutar comandos inline, sólo necesitamos en el siguiente formato `$(nuestro_comando)`. Si bash detecta un comando inline, lo ejecutará primero y usará el resultado con el comando principal, por ejemplo:

![](/apuntes/img/Pasted image 20251009223744.png)

Así que, volviendo a la app de cowsay, esto es lo que pasaría si inyectásemos comandos:

![](/apuntes/img/Pasted image 20251009223818.png)

Ya que la aplicación acepta cualquier input por nuestra parte, podemos inyectar comandos inline, que serán ejecutados y usados como parámetro para cowsay. Algunos comandos que puedes probar:

- whoami
- id
- ifconfig / ip addr / ip a
- uname -a
- ps -ef

------------------------
<h2>Challenge</h2>

1. ![](/apuntes/img/Pasted image 20251009224220.png)
2. ![](/apuntes/img/Pasted image 20251009224355.png)
3. ![](/apuntes/img/Pasted image 20251009224843.png)
4. ![](/apuntes/img/Pasted image 20251009225230.png)
5. ![](/apuntes/img/Pasted image 20251009225549.png)
