---
layout: apunte
title: "4. Web Server Access Logs Analysis"
---

Interactuamos con múltiples sitios web a diario. A veces, sólo queremos ver el sitio web y aveces registrarnos o iniciar sesión en sus servicios. Esto son dos tipos de peticiones al sitio web. Estas peticiones se guardan en archivos de log en el servidor que corre esa página.

Este archivo de logs contiene todas las peticiones hechas a la página web junto con información en el marco de tiempo, la IP que hace la petición, el tipo de petición y la URL. Aquí abajo podemos ver los campos tomados de un log de ejemplo de un servidor web Apache que puede ser encontrado en el directorio: `/var/log/apache2/access.log`.

- **IP Address:** “172.16.0.1” - The IP address of the user who made the request.
    
- **Timestamp:** “[06/Jun/2024:13:58:44]” - The time when the request was made to the website.
    
- **Request:** The request details.
    
    - **HTTP Method:** “GET” - Tells the website what action to be performed on the request.
    - **URL:** “/” - The requested resource.
- **Status Code:** “200” - The response from the server. Different numbers indicate different response results.
    
- **User-Agent:** “Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36” - Information about the user’s Operating System, browser, etc. when making the request.

Podemos realizar un análisis manual usando algunas utilidades de línea de comandos. Los siguientes, son comandos útiles durante un análisis manual:

- `cat`: Sirve para mostrar el línea de comandos los contenidos de un archivo.
- `grep`: Sirve para filtrar por cadenas de texto o patrones.
- `less`: Cuando trabajamos con varias páginas nos permite ver página a página. Para avanzar usamos `barra espaciadora` y para volver atrás `b`. Si queremos buscar escribimos `/` y `n` para ir a la siguiente concurrencia y `N` a la anterior.

----------------------------
<h2>Ejercicio</h2>
Analizar un documento de logs de acceso web a un servidor:

1. Descargamos el archivo:
   ![](/apuntes/img/Pasted image 20251022185121.png)
2. Leemos el contenido del archivo:
   ![](/apuntes/img/Pasted image 20251022185341.png)
3. Como es muy grande empezamos a filtrar:
   ![](/apuntes/img/Pasted image 20251022185514.png)
4. Filtramos otra vez:
   ![](/apuntes/img/Pasted image 20251022185645.png)

