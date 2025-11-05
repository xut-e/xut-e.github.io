---
layout: apunte
title: "2. Path Traversal"
---

También conocido como `Directory Traversal`, es una vulnerabilidad web que permite a un atacante leer recursos del sistema operativo, como archivos locales en el servidor que corre la aplicación. El atacante explota esta vulnerabilidad manipulando la URL de la aplicación web para acceder a archivos o directorios almacenados fuera del directorio de la aplicación.

Las vulnerabilidades de path traversal ocurren cuando el input de un usuario se pasa a una función como `file_get_contents` en PHP. Es importante darse cuenta de que la función no es el contribuidor principal de la vulnerabilidad. Normalmente lo es la pobre validación o filtro del input del usuario. Puedes encontrar más información sobre la función de PHP de la que hemos hablado y de más [aquí](https://www.php.net/manual/en/function.file-get-contents.php).

El siguiente gráfico muestra cómo una aplicación web guarda archivos en `/var/www/app`. El camino pretendido es extraer el pdf, sin embargo:

!**Pasted image 20251105001355.png**

Podemos comprobar nuestro parámetro URL añadiendo payloads para ver cómo se comporta la aplicación. Los ataques de path traversal, también conocidos como ataques `dot-dot-slash`, se aprovechan de mover el directorio hacia arriba usando dobles puntos (`../`). Si el atacante encuentra un punto de entrada, entonces puede mandar algo como: `http://webapp.thm/get.php?file=../../../../../../../../../etc/passwd`. Si no hay validación de entrada, cada doble punto barra mueve el directorio un nivel hacia arriba, llegando a `/` y pudiendo leer `/etc/passwd`.

!**Pasted image 20251105002134.png**

Como resultado, el servidor manda de vuelta el contenido del archivo:

!**Pasted image 20251105002156.png**

Si el servidor corre en Windows, puede hacer algo similar:

- `http://webapp.thm/get.php?file=../../../../boot.ini`
- `http://webapp.thm/get.php?file=../../../../windows/win.ini`

Abajo unos archivos que te podrían interesar en el testeo:

| **Ruta**                      | **Descripción**                                                                                              |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `/etc/issue`                  | Contiene un mensaje o identificación de sistema para ser printeada antes del prompt de login.                |
| `/etc/profile`                | Controla variables de entorno a nivel de sistema como Export, File creation, Terminal type, Mail messages... |
| `/proc/version`               | Especifica la versión del kernel de Linux.                                                                   |
| `etc/passwd`                  | Tiene todos los usuarios registrados que tienen acceso al sistema.                                           |
| `/etc/shadow`                 | Contiene información sobre las contraseñas de los usuarios del sistema.                                      |
| `/root/.bash_history`         | Contiene el historial de comandos del usuario `root`.                                                        |
| `/var/log/dmessage`           | Contiene los mensajes globales de sistema, incluyendo los que se registran durante el arranque.              |
| `/var/mail/root`              | Todos los emails para el usuario `root`.                                                                     |
| `/root/.ssh/id_rsa`           | Claves SSH privadas para root o cualquier usuario válido del servidor.                                       |
| `/var/log/apache2/access.log` | Las peticiones hechas al servidor apache.                                                                    |
| `C:\boot.ini`                 | Opciones de arranque para ordenadores con BIOS.                                                              |