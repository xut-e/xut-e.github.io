---
layout: apunte
title: "3. Local File Inclusion - LFI"
---

<h2>Local File Inclusion (LFI)</h2>
Los ataques LFI contra aplicaciones web, normalmente se deben a la falta de concienciación sobre ciberseguridad del desarrollador. Con PHP, usar funciones como `include`, `require`, `include_once` y `require_once` a menudo contribuye a aplicaciones web vulnerables. En esta unidad profundizaremos en PHP.

>[!CAUTION] Debes saber que las vulnerabilidades LFI también se producen al usar otros lenguajes como ASP, JSP o Node.js.

En esta sección hablaremos de varios casos de `LFI` y cómo explotarlos.

----------------------------------
<h2>#1</h2>
Supón que la aplicación web ofrece dos lenguajes y el usuario puede seleccionar entre `EN` y `AR`.

```php
<?PHP 
	include($_GET["lang"]);
?>
```

El código PHP de arriba utiliza el método GET vía parámetro de la URL `lang` para incluir el archivo de la página. La llamada se puede hacer mandando la petición HTTP como procede: `http://webapp.thm/index.php?lang=EN.php` para cargar la página en inglés o con `AR.php` para cargarla en árabe. Los archivos `EN.php` y `AR.php` existen en el mismo directorio.

Teóricamente, podemos acceder y mostrar cualquier archivo en el servidor desde el código de arriba si no tiene validación de input. Digamos que queremos leer `/etc/passwd`, que contiene información sensible sobre los usuarios del sistema operativo. Podemos buscar `http://webapp.thm/get.php?lang=/etc/passwd`.

En este caso funciona porque no hay un directorio específico en la función `include` y no hay validación del input.

1. Nos encontramos con un laboratorio en la página proporcionada.
   !**Pasted image 20251105201356.png**
2. Probamos a introducir "test" en la caja de búsqueda.
   !**Pasted image 20251105201440.png**
3. Nos dice el directorio actual y encima nos dice que no hay ningún archivo "test" así que vamos a probar con otro archivo. Modificamos el enlace:
   !**Pasted image 20251105201611.png**

--------------------------------------------
<h2>#2</h2>
Después, en el código siguiente, el desarrollador decide especificar el directorio dentro de la función.

```php
<?PHP 
	include("languages/". $_GET['lang']); 
?>
```

El el código de arriba, el desarrollador decide usar la función `include` para llamar a las páginas del directorio `languages/` vía parámetro `lang` en la URL.

Si no hay validación de input, el atacante puede manipular la URL reemplazando el `/etc/passwd` que habíamos puesto antes por `../../../../../../../../../etc/passwd`. Quedándonos una URL como: `http://webapp.thm/get.php?lang=../../../../../../../../../etc/passwd`.

1. Vamos a la página dada y nos encontramos con un laboratorio.
   !**Pasted image 20251105201712.png**
2. Probamos directamente `/etc/passwd` y vemos que no nos lo muestra.
   !**Pasted image 20251105201922.png**
3. Probamos a ir a `/` mediante `../`.
   !**Pasted image 20251105202027.png**

