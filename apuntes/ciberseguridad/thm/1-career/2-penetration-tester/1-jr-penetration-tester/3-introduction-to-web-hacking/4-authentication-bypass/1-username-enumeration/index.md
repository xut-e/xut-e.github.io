---
layout: apunte
title: "1. Username Enumeration"
---

Un ejercicio de ayuda para completar al tratar de encontrar vulnerabilidades de autentificación es completar una lista de nombres de usuario válidos, que usaremos en otras tareas.

Los mensajes de error web son una buenos recursos para poder construir la lista de nombres de usuario válidos. Tenemos un formulario para crear usuarios en la página de Acme.

Si tratas de introducir el nombre de usuario **admin**, verás un error diciendo que el nombre de usuario ya existe. Gracias a este error, podemos completar una lista de usuarios ya registrados. La herramienta ffuf usa una lista de nombres de usuario comunes para comprobar coincidencias.

```shell
user@tryhackme$ ffuf -w /usr/share/wordlists/SecLists/Usernames/Names/names.txt -X POST -d "username=FUZZ&email=x&password=x&cpassword=x" -H "Content-Type: application/x-www-form-urlencoded" -u http://10.10.7.252/customers/signup -mr "username already exists"
```

- `-w`: Selecciona el diccionario.
- `-X`: Especifica el método de petición.
- `-d`: Especifica la información que vamos a mandar. Hemos puesto **FUZZ** porque en ffuf la palabra FUZZ sirve para sustituirse por las entredas del diccionario.
- `-H`: Sirve para añadir headers adicionales a la petición.
- `-u`: Especifica la URL a la que estamos haciendo la petición.
- `-mr`: Especifica el texto en la web que estamos buscando para validar nuestros usuarios.

La herramienta ffuf puede ser descargada, junto con el diccionario desde [aquí](https://github.com/ffuf/ffuf).

Crea una lista con los usuarios que que encuentres con ffuf. La usaremos más adelante.

!**Pasted image 20251103170145.png**

- admin
- robert
- simon
- steve