---
layout: apunte
title: "4. Remediating Command Injection"
---

Se puede prevenir la inyección de comandos de varias maneras. Desde uso mínimo de librerías potencialmente peligrosas hasta filtrar el input del usuario. Los ejemplos de abajo están basados en PHP, sin embargo, se puede extrapolar a muchos otros lenguajes.

-----------------------------
<h2>Funciones Vulnerables</h2>
En PHP hay muchas funciones que interactúan con el sistema operativo para ejecutar comandos vía shell. Estos incluyen:

- Exec
- Passthru
- System

Toma la siguiente traza como ejemplo. La aplicación sólo aceptará y procesará números que se metan en el formulario. Esto significa que cualquier comando como `whoami` no será procesado.

!**Pasted image 20251113170732.png**

1. La aplicación sólo aceptará un patrón de caracteres específico.
2. La aplicación sólo procederá a ejecutar esta información que es numérica.

Estas funciones toman un input y lo ejecutan en el sistema. Cualquier aplicación que use estas funciones sin las comprobaciones correspondientes será vulnerable a la inyección de comandos.

---------------------------
<h2>Sanitización del Input</h2>
Sanitizar el input de un usuario que la aplicación usa es una manera genial de prevenir la inyección de comandos. Este es el proceso de especificar el formato o tipos de dato que el usuario puede subir. Por ejemplo un campo de input que sólo acepte datos numéricos o elimine cualquier carácter especial como `>`, `&` y `/`.

En la traza de debajo, la función de PHP `filter_input` se usa para comprobar si algún dato subido es un número o no.Si no lo es lo clasifica de inválido.

!**Pasted image 20251113171224.png**

------------------------------
<h2>Bypassear Filtros</h2>
La aplicaciones usarán numerosas técnicas para filtrar y sanitizar el input del usuario. Estos filtros restringirán tus opciones de payload. Sin embargo, podemos abusar la lógica detrás de la aplicación para sobrepasar estos filtros. Por ejemplo, puede que una aplicación elimine el símbolo `"`. Pero podemos tratar de usar el valor hexadecimal para conseguir el mismo resultado.

Al ejecutarse, aunque la información dada está en un formato diferente al esperado, puede seguir siendo interpretado y tendrá el mismo resultado.

!**Pasted image 20251113171554.png**

