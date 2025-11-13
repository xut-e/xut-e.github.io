---
layout: apunte
title: "2. Discovering Command Injection"
---

Esta vulnerabilidad existe porque las aplicaciones normalmente usan funciones en lenguajes de programación como PHP, Python y Node JS para pasar información y hacer llamadas al sistema en el sistema operativo de la máquina que los hostea. Por ejemplo, tomando input de un campo y buscándolo dentro de un archivo. Toma el código de abajo como ejemplo.

En este fragmento de código, la aplicación toma la información que introduce el usuario en un campo llamado `$title` para buscarlo en un directorio por "song title". Desmenucémoslo:

!**Pasted image 20251112213901.png**

1. La aplicación guarda archivos MP3 en un directorio contenido en el sistema operativo.
2. El usuario introduce el título de la canción que desea buscar. La aplicación guarda el input en una variable `$title`.
3. La información contenida en `$title` se pasa al comando `grep` para buscar un archivo que se llame como el nombre de la canción introducido.
4. El output de la búsqueda determinará si la aplicación informa al usuario de que la aplicación existe o de que no.

Este tipo de información estaría normalmente guardada en una base de datos. Sin embargo, esto es sólo un ejemplo de cómo una aplicación toma el input de un usuario para interactuar con el sistema operativo de la app.

Un atacante podría abusar esta aplicación inyectando sus propios comandos para que la aplicación los ejecute. En vez de usar `grep` para buscar el título de una canción, podrían decirle a la app que mostrase cierta información sensible. No importa en qué lenguaje se haga. Mientras la aplicación procese y ejecute el input, puede resultar en una inyección de comandos.

!**Pasted image 20251113151627.png**

No tienes que entender el programa, lo hemos subrayado para explicarte el flujo y que lo comprendas:

1. El paquete "flask" se usa para configurar un servidor web.
2. Una función usa el paquete "subprocess" para ejecutar comandos en el dispositivo.
3. Usamos una ruta en el servidor web que ejecutará lo que se le de. Por ejemplo, para ejecutar `whoami` tendríamos que visitar `http://flaskapp.thm/whoami`.

