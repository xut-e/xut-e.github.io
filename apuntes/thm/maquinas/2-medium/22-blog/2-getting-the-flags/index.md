---
layout: apunte
title: "2. Getting the Flags"
---

<h2>Reconocimiento Inicial</h2>
Comenzamos escaneando los puertos abiertos.

!**Pasted image 20260723230436.png**

Ahora realizamos un escaneo más profundo de dichos puertos.

!**Pasted image 20260723230403.png**
!**Pasted image 20260723230521.png**

Vamos a fuzzear directorios.

No hay nada interesante, a parte del `robots.txt`, que ya habíamos visto.

Aprovechando que sabemos que es WordPress, vamos a realizar un escaneo con WPScan.

```bash
wpscan --url http://blog.thm  --api-token [REDACTED] -e u
```

Este escaneo nos saca una lista de 72 vulnerabilidades debido al `WordPress 5.0` en uso. Además, también nos ha listado un par de nombres de usuario:

- `kwheel`
- `bjoel`

----------------------------------
<h2>Profundización</h2>
Vamos a mirar la página web.

!**Pasted image 20260723231717.png**

No hay nada, a parte de este mensaje de su madre. Pero bueno, vamos a intentar aplicar fuerza bruta con los nombres encontrados con el comando:

```bash
wpscan --url http://blog.thm -U <USERNAME> -P /usr/share/wordlists/rockyou.txt
```

!**Pasted image 20260723232617.png**

Con estas credenciales vamos a entrar a ver qué vemos.

!**Pasted image 20260723232735.png**

Aquí dentro no encontramos nada, por lo que decidimos probar suerte en [Exploit-DB](https://www.exploit-db.com/).

!**Pasted image 20260723233356.png**

----------------------------------------
<h2>Explotación</h2>
Parece que hay un exploit verificado y fácil. Vamos a probar.

!**Pasted image 20260723233650.png**

Vamos a usarlo.

!**Pasted image 20260723233924.png**

Una vez carga todo, recibimos la shell:

!**Pasted image 20260723234347.png**

Parece que nos está trolleando:

!**Pasted image 20260723234518.png**

Vamos a buscar `user.txt`.

!**Pasted image 20260723234704.png**

No hay nada más. Sin embargo, en el directorio `/home/bjoel/` hay otro archivo. Un PDF.

!**Pasted image 20260723234849.png**

Vamos a descargarlo para analizarlo.

!**Pasted image 20260723235131.png**
!**Pasted image 20260723235108.png**

Si lo abrimos, nos encontramos con una carta de despido:

!**Pasted image 20260723235156.png**

Parece que acabaron muy a malas.

--------------------------------
<h2>Escalada de Privilegios</h2>
Como no encontramos nada más, vamos a probar técnicas de escalado de privilegios.

!**Pasted image 20260723235531.png**

Este binario llama la atención por no ser un binario típico.

Si comprobamos su funcionamiento con `ltrace`:

!**Pasted image 20260723235932.png**

Podemos ver que está haciendo la comprobación a través de una variable de entorno. Vamos a modificarla.

!**Pasted image 20260724000055.png**

Efectivamente ha cambiado, vamos ahora a ejecutar el binario:

!**Pasted image 20260724000131.png**

Ahora buscamos las flags.

!**Pasted image 20260724000243.png**

Y la flag de root:

!**Pasted image 20260724000309.png**

----------------------------------------
<h2>Conclusión</h2>
Una máquina sencilla pero divertida. Nivel medio bajo. Sin mucha complicación técnica.

>[!SUCCESS] Hemos conseguido ambas flags!

