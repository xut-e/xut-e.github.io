---
layout: apunte
title: "2. Getting the Flags"
---

<h2>Reconocimiento Inicial</h2>
Comenzamos escaneando los puertos abiertos.

!**Pasted image 20260907171326.png**

Ahora vamos a mirar los directorios.

!**Pasted image 20260907174747.png**

Parece que no hay nada por lo que vamos a proceder a investigar la página web en sí.

---------------------------------
<h2>Profundización</h2>
Entramos a la página.

!**Pasted image 20260907174846.png**

Parece que se está cargando un vídeo. Vamos a seguir mirando. Si le damos a `search` aparece un parámetro `?search=` pero no parece inyectable.

!**Pasted image 20260907175023.png**

Si probamos a darle a los enlaces, aparece otro parámetro que carga un `PHP`.

!**Pasted image 20260907175142.png**

Vamos a comprobar si este es inyectable. No responde a SQLi. Sin embargo si probamos LFI:

!**Pasted image 20260907175300.png**

----------------------------------
<h2>Explotación</h2>
Vamos a buscar en el directorio raíz. Para ello salimos de donde estamos con varios `../`.

!**Pasted image 20260907175344.png**

Esto ya funciona. Vamos a probar a ver si hay un archivo llamado flag.

!**Pasted image 20260907175439.png**

>[!SUCCESS] Flag encontrada!

