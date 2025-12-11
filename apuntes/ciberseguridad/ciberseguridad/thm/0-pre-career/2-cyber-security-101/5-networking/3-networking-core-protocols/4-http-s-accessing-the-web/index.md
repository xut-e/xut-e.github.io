---
layout: apunte
title: "4. HTTP(S) - Accessing the Web"
---

Cuando enciendes el buscador, normalmente usas HTTP y HTTPS. Este protocolo se basa en TCP y define cómo tu buscador se relaciona con los servidores web.

Algunos de los comandos o métodos que tu buscador normalmente manda a los servidores web son:

- `GET`: Recoge información del servidor como un archivo HTML o una imagen.
- `POST`: Nos permite subir nueva información al server, como una form o un archivo.
- `PUT`: Usado para crear un nuevo recurso en el servidor o para actualizar o sobrescribir información existente.
- `DELETE`: Usado para borrar algún archivo o recurso de la red.

HTTP y HTTPS usan, por defecto, los puertos 80 y 443, respectivamente.

Al buscar en el buscador la IP `10.10.178.231`, el buscador nos muestra la página perfectamente, pero ¿qué está pasando por detrás?

!**080.png**

Usando Wireshark podemos examinar el intercambio entre el buscador y el servidor web. La siguiente imagen muestra el mensaje enviado por nuestro buscador al servidor en rojo y la respuesta del servidor web en azul.

!**081.png**

Como recordarás, para conectarnos al servidor web usabamos telnet. Para recoger información de este, usábamos `GET / HTTP/1.1`. y `Host: anything`. Podemos recuperar ciertos archivos usando `GET /file.html HTTP/1.1`.

!**082.png**

