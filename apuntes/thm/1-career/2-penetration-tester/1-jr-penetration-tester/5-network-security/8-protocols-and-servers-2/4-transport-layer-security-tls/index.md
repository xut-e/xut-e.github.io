---
layout: apunte
title: "4. Transport Layer Security (TLS)"
---

En esta tarea, aprenderemos acerca de la solución estándar para proteger la confidencialidad e integridad de los paquetes intercambiados.

SSL (Secure Sockets Layer) empezó cuando la WWW estaba empezando a ver nuevas aplicaciones, como la compra online y la emisión de detalles de pago. Netscape introdujo SSL en 1994, con SSL 3.0 siendo lanzado en 1996. Pero con el tiempo, se introdujo más  seguridad y TLS se presentó en 1999.

Los protocolos que hemos visto hasta el momento, mandan la información en texto plano. Debajo se muestra una representación del modelo ISO/OSI junto a los protocolos que hemos visto.

!**Pasted image 20251121144921.png**

Debido a la fuerte relación entre SSL y TLS, uno puede ser más usado que el otro. Sin embargo, TLS es más seguro que SSL y prácticamente lo ha reemplazado. Esperamos que los servidores modernos usen todos TLS, por mucho que sigamos diciendo SSL/TLS.

Un protocolo existente puede ser mejorado a uno seguro gracias a la capa de cifrado que ofrece SSL/TLS.

| Protocolo | Puerto por defecto | Protocolo Seguro | Puerto por defecto con TLS |
| --------- | ------------------ | ---------------- | -------------------------- |
| HTTP      | 80                 | HTTPS            | 443                        |
| FTP       | 21                 | FTPS             | 990                        |
| SMTP      | 25                 | SMTPS            | 465                        |
| POP3      | 110                | POP3S            | 995                        |
| IMAP      | 143                | IMAPS            | 993                        |

Considerando el caso de HTTP, el protocolo inicial realizaría dos pasos:

1. Establecer una conexión TCP con el servidor web remoto.
2. Mandar peticiones HTTP al servidor web como `GET` o `POST`.

Con HTTPS, sin embargo, los pasos que sigue son:

1. Establecer una conexión TCP.
2. Establecer una conexión SSL/TLS.
3. Mandar peticiones HTTP al servidor web.

Para establecer una conexión SSL/TLS, el cliente necesita realizar el correspondiente handshake con el servidor. Según la [RFC 6101](https://datatracker.ietf.org/doc/html/rfc6101), el establecimiento de la conexión SSL se verá como en la siguiente imagen.

!**Pasted image 20251121145544.png**

Después de establecer la conexión TCP con el servidor, el cliente establece una conexión SSL/TLS. Los términos pueden resultar complicados, dependiendo de tus conocimientos en criptografía, por eso vamos a explicar los pasos:

1. El cliente anda ClientHello al servidor para indicar sus capacidades, como algoritmos soportados.
2. El servidor responde con ServerHello, indicando los parámetros de conexión seleccionados. El servidor ofrece su certificado si se requiere autentificación de servidor. Manda información adicional en el ServerKeyExchange necesaria para generar una clave única. Por último manda ServerHelloDone para indicar que de momento no tiene nada más que añadir.
3. El cliente responde con ClientKeyExchange que contiene la información adicional requerida para generar una clave única. Además empieza a usar cifrado e informa al servidor mediante ChangeCipherSpec.
4. El servidor cambia a usar el cifrado e informa al cliente con ChangeCipherSpec.

En resumidas cuentas, se basa en un intercambio Diffie-Hellman. Si no sabes lo que es puedes verlo en [4. Diffie-Hellman Key Exchange](/apuntes/thm/0-pre-career/2-cyber-security-101/6-cryptography/2-public-key-cryptography-basics/4-diffie-hellman-key-exchange/).

Cuando navegamos en internet, necesitamos la confirmación de una CA (Autoridad de Certificados) para dar fe de que en efecto nuestra página es la legítima. Esto es esencial para que SSL/TLS funcione.

!**Pasted image 20251121150931.png**

En la figura de arriba, podemos observar:

1. ¿A quién se le expide el certificado? El nombre de la compañía que usará el certificado.
2. ¿Quién expidió el certificado? El nombre de la CA que lo expidió.
3. El periodo de validez. Hasta cuándo es válido el uso de dicho certificado.

