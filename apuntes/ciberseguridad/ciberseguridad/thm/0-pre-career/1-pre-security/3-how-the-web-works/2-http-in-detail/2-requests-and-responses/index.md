---
layout: apunte
title: "2. Requests and Responses"
---

Cuando accedemos a una web, el buscador necesitará hacer peticiones al servidor web para descargar activos como HTML, imágenes o vídeos. Primero necesitas decirle al buscador dónde y cómo acceder a estos recursos. A ello ayudan las URL's.

---------------------------------
<h2>¿Qué es una URL?</h2>
Una URL es una instrucción de como acceder a un recurso en internet.

!**015.png**
- Scheme: Indica qué protocolo utilizar.
- User: Algunos servicios requieren autentificación.
- Host: Nombre de dominio o dirección IP del servidor al que deseas acceder.
- Port: Puerto al que te vas a conectar (80 para HTTP).
- Path: Nombre del archivo o ruta del recurso al que vas a acceder.
- Query String: Bits extra de información que mandas al path. Por ejemplo, blog?id=1.
- Fragment: Referencia a la localización de la página pedida.

-------------------------------
<h2>Haciendo una petición</h2>
Es posible hacer una petición al servidor con sólo una línea GET / HTTP/1.1:

!**016.png**
Pero para una experiencia más rica en la web, necesitamos mandar otra información también. Esta se manda en lo que se conoce como headers. Un ejemplo de petición:

```vb.net
GET / HTTP/1.1
Host: tryhackme.com
User-Agent: Mozilla/5.0 Firefox/87.0
Referer: https://tryhackme.com/

```

1. Línea 1: Esta petición manda el método GET, pidiendo la página home con "/" y diciedo que usa el protocolo HTTP en la versión 1.1
2. Línea 2: Le decimos al servidor web que queremos la web tryhackme.com
3. Línea 3: Le decimos al servidor web que usamos el buscador Firefox en su versión 87
4. Línea 4: Le decimos al servidor que la página web que nos dirigió a esta fue https://tryhackme.com
5. Línea 5: Las peticiones HTTP finalizan con una línea en blanco para indicarle al servidor que la petición ha terminado.

--------------------------
<h2>Recibiendo una respuesta</h2>
Ejemplo de respuesta:

```vb.net
HTTP/1.1 200 OK
Server: nginx/1.15.8
Date: Fri, 09 Apr 2021 13:34:03 GTM
Content-Type: text/html
Content-Length: 98

<html>
	<head>
		<title>TryHackMe</title>
	</head>
	<body>
		Welcome To TryHackMe.com
	</body>
</html>

```

1. Línea 1: HTTP 1.1 es la versión del protocolo HTTP que el servidor está usando seguida del código de estado HTTP, en este caso "200 OK" que nos indica que se ha completado de manera existosa.
2. Línea 2: Esto nos dice el software del servidor web y la versión.
3. Línea 3: La fecha actual, tiempo y zona horaria del servidor.
4. Línea 4: Los headers content-type le indica al cliente el tipo de información que será mandada (HTML, imágenes, vídeos, pdf, XML...).
5. Línea 5: El header content-length le indica al cliente cómo de larga la respuesta es. De esta manera podemos confirmar que no falta información.
6. Línea 6: La respuesta HTTP contiene una línea en blanco para indicar que la respuesta ha terminado.
7. Línea 7-14: La información que ha sido pedida, en este caso la página home.