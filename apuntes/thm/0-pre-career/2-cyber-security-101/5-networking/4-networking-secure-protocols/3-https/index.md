---
layout: apunte
title: "3. HTTPS"
---

<h2>HTTP</h2>
Como hemos estudiado en la lección [0. Networking Core Protocols](/apuntes/thm/0-pre-career/2-cyber-security-101/5-networking/3-networking-core-protocols/0-networking-core-protocols/), HTTP necesita TCP y usa el puerto 80 por defecto. También vimos que todo el tráfico HTTP se manda en texto claro y cualquiera puede interceptarlo. 

Repasemos los pasos más comunes antes de que un buscador le pida a una página la información por HTTP:

1. Establecer un three-way handshake TCP con el servidor de destino.
2. Comunicarse usando el protocolo HTTP por ejemplo, `GET / HTTP/1.1`.

Estos pasos se muestran en la imagen de abajo. Los tres paquetes del handshake TCP (marcados con un 1) preceden al primer paquete HTTP con `GET`. La comunicación está marcada con un 2. Los últimos 3 mensajes son la terminación de la comunicación y están marcados con un 3.

![](/apuntes/img/87.png)

--------------------------
<h2>HTTP sobre TLS</h2>
HTTPS es Hypertext Transfer Protocol Secure. Es básicamente HTTP sobre TLS. Por ello, pedir a una página el HTTPS requerirá los siguientes pasos (después de resolver el nombre de dominio):

1. Establecer un three-way handshake TCP con el servidor.
2. Establecer una conexión TLS.
3. Comunicarse usando el protocolo HTTP.

La foto de debajo muestra una conexión TCP establecida en los tres primeros paquetes, marcados con un 1. Después, varios paquetes son intercambiados para negociar el protocolo TLS, marcado con un 2. Los apartados 1 y 2 son donde las negociaciones y establecimiento TLS ocurren. Finalmente, la información de la aplicación HTTP se intercambia, marcado con un 3. Mirando Wireshark vemos que pone "Application Data" porque no hay manera de saber su es de hecho HTTP o algún otro protocolo mandado por el puerto 443.

![](/apuntes/img/088.png)

Si intentamos ver lo que contienen los contenidos de los paquetes vemos algo del siguiente estilo sin tener la clave de encriptación:

![](/apuntes/img/089.png)

------------------------
<h2>Consiguiendo la Llave de Encriptación</h2>
Es improbable que consigamos la clave, pero si lo hacemos, se la podemos dar a Wireshark para poder ver los paquetes de forma normal. Aquí un ejemplo de cómo se ven las comunicaciones encriptadas de arriba una vez tenemos la llave:

![](/apuntes/img/090.png)

![](/apuntes/img/091.png)
