---
layout: apunte
title: "12. Next Steps"
---

Vale, ya tenemos una shell. ¿Y ahora qué?

Hemos cubierto varias maneras de generar, mandar y recibir shells. Lo que tienen todas en común es que suelen ser inestables y no interactivas. así que ¿qué podemos hacer respecto a esto?

En Linux, idealmente estaríamos buscando oportunidades para ganar accceso a la cuenta del usuario. Las claves SSH guardadas en `/home/<user>/.ssh` son normalmente una forma ideal de hacerlo. En CTFs no es infrecuente encontrar credenciales sueltas por ahí. Algunos exploits te permitirán añadir tu propia cuenta. En particular, algo como [Dirty C0w](https://dirtycow.ninja/) o un archivo `/etc/shadow` o `/etc/passwd` escribible, te darían rápido acceso a la máquina asumiendo que SSH esté abierto.

En Windows, las opciones suelen ser más limitadas. A veces es posible encontrar contraseñas de servicios corriendo en el registro. Los servidores VNC, por ejemplo, frecuentemente dejan contraseñas guardadas en el registro en texto plano. Algunas versiones del servidor FileZilla FTP también dejan credenciales en un archivo XML en `C:\Program Files\FileZilla Server\FileZilla Server.xml` o `C:\xampp\FileZilla Server\FileZilla Server.xml`. Estos pueden ser hashes MD5 o texto plano, dependiendo de la versión.

Idealmente, en Windows obtendrías una shell como el usuario SYSTEM o una cuenta de administrador con privilegios elevados. Es posible, en dicho caso, añadir tu propia cuenta (en el grupo de administradores) en la máquina y luego iniciar sesión mediante RDP, telnet, winexe, psexec, WinRM o cualquier otro método.

La sintaxis para esto es:

`net user <nombre_usuario> <contraseña> /add`

`net localgroup administrators <nombre_usuario> /add`

>[!IMPORTANT] Las reverse y bind shells son una técnica esencial para entablar un RCE. Sin embargo, nos interesa migrar a una forma "legítima" de conectarnos al sistema, con el objetivo de obtener todas las funcionalidades/ventajas que ofrece frente a una reverse/bind shell.

