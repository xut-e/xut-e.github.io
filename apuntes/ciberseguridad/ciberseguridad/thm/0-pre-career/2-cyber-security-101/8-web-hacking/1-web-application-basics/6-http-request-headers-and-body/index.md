---
layout: apunte
title: "6. HTTP Request - Headers and Body"
---

<h2>Headers de la Petición</h2>
Los headers de las peticiones permiten que información extra sea transmitida al servidor sobre una petición. Algunos headers comunes:

| **Request Header** | **Ejemplo**                                                                      | **Descripción**                                                                       |
| ------------------ | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Host               | `Host: tryhackme.com`                                                            | Especifica el nombre del servidor que pide.                                           |
| User-Agent         | `User-Agent: Mozilla/5.0`                                                        | Comparte información sobre el navegador que manda la petición.                        |
| Referer            | `Referer: https://www.google.com/`                                               | Indica la URL desde la que viene la petición.                                         |
| Cookie             | `Cookie: user_type=student; room=introtowebapplication; room_status=in_progress` | La información que el servidor previamente pidió al navegador se almacena en cookies. |
| Content-Type       | `Content-Type: application/json`                                                 | Describe qué tipo o formato de información está en la petición.                       |

-----------------------------------------
<h2>Cuerpo de la Petición</h2>
En las peticiones HTTP como POST y PUT, donde la información es mandada al servidor, en vez de al revés, la información está colocada dentro del cuerpo de la petición. El formato de esta información puede tomar varias formas, pero algunas comunes son `URL Encoded`, `Form Data`, `JSON` o `XML`.

- **URL Encoded (applicattion/x-www-form-urlencoded)**
  Un formato donde la información es estructurada en pares de llave y valor donde (`key = value`). Múltiples parejas separadas por un símbolo `&`, como `key1=value1&key2=value2`. Los caracteres especiales son percent-encoded (por ejemplo `' ' = '%20'`).
  
  ```http
POST /profile HTTP/1.1
Host: tryhackme.com
User-Agent: Mozilla/5.0
Content-Type: application/x-www-form-urlencoded
Content-Length: 33

name=Aleksandra&age=27&country=US
```

- **Form Data (multipart/form-data)**
  Permite mandar múltiples bloques de información donde cada uno está separado por una string frontera. Esta es definida en el header. Esta forma puede ser usada para mandar binarios, como cuando se sube una foto al servidor.
  
  ```http
POST /upload HTTP/1.1
Host: tryhackme.com
User-Agent: Mozilla/5.0
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW

----WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="username"

aleksandra
----WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="profile_pic"; filename="aleksandra.jpg"
Content-Type: image/jpeg

[Binary Data Here representing the image]
----WebKitFormBoundary7MA4YWxkTrZu0gW--
```

- **JSON (application/json)**
  En este formato, la información puede ser mandada usando la estructura JSON (JavaScript Object Notation). La información está formateada en pares de nombre: valor. Múltiples parejas son separadas por comas, todas contenidas entre `{}`.
  
  ```http
POST /api/user HTTP/1.1
Host: tryhackme.com
User-Agent: Mozilla/5.0
Content-Type: application/json
Content-Length: 62

{
    "name": "Aleksandra",
    "age": 27,
    "country": "US"
}
```

- **XML (application/xml)**
  En el formato XML, la información se estructura dentro de etiquetas llamadas "tags", que tienen una apertura y un cierre. Estas etiquetas pueden ser acomodadas a otras.
  
  ```http
POST /api/user HTTP/1.1
Host: tryhackme.com
User-Agent: Mozilla/5.0
Content-Type: application/xml
Content-Length: 124
```
```xml
<user>
    <name>Aleksandra</name>
    <age>27</age>
    <country>US</country>
</user>
```

