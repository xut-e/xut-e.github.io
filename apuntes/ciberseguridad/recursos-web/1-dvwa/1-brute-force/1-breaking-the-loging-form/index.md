---
layout: apunte
title: "1. Breaking the Loging Form"
---

Para romper este portal de login, vamos a usar dos herramientas distintas:

- FFUF
- WFUZZ

!**Pasted image 20251203172440.png**

---------------------------------
<h2>FFUF</h2>
1. Si abrimos las herramientas de desarrollador, podemos ver que en la petición se mandan los parámetros `username` y `password` por GET.
   !**Pasted image 20251203174307.png**
2. Podemos ver que hay una cookie de sesión además.
   !**Pasted image 20251203174358.png**
3. Usamos `ffuf` para el ataque.
   !**Pasted image 20251203175228.png**
   Como la longitud es siempre la misma, vamos a restringirla.
4. Arreglamos el comando y le añadimos `time` para poder compararla después.
   !**Pasted image 20251203180015.png**
5. Iniciamos sesión con las credenciales.
   !**Pasted image 20251203175900.png**
