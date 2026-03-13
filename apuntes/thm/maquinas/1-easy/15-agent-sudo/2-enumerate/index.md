---
layout: apunte
title: "2. Enumerate"
---

Esta máquina está subdividida en partes por lo que en cada una responderemos las preguntas propias.

1. ¿Cuántos puertos hay abiertos?

Empezamos con el escaneo.

!**Pasted image 20260312165502.png**

Esto significa que hay `3` puertos abiertos.

2. ¿Cómo te rediriges a la página secreta?

Escaneamos la página en busca de directorios

!**Pasted image 20260312165806.png**

Al no encontrar nada aquí vamos a mirar en la web.

!**Pasted image 20260312165743.png**

Ahí está, nos redirigimos con el `user-agent`.

3. ¿Cuál es el nombre del agente?

Vamos a abrir BurpSuite. Una vez allí interceptamos una petición y la mandamos al repetidor.

!**Pasted image 20260312170322.png**

Vamos a cambiar el `User-Agent` a `R`, que es el único codename que tenemos.

!**Pasted image 20260312170413.png**

Dice que hay 25 agentes, suena a que cada uno tiene una letra del abecedario. Vamos a mandar esta petición al intruder.

Ponemos el `User-Agent` como sustitutivo del ataque y cargamos una lista de la `A-Z`.

!**Pasted image 20260312170625.png**

Le damos a comenzar ataque.

!**Pasted image 20260312170721.png**

Los ordenamos por Longitud de la respuesta y parece que hay un claro ganador, `C`. Porque `R` era el "jefe". Además es la única respuesta con código de estado `302` (redirected).

Vamos a leer lo que pone al página, para poder hacerlo usaremos `curl`.

!**Pasted image 20260312171246.png**

Pues parece que el agente se llama `Chris`.
