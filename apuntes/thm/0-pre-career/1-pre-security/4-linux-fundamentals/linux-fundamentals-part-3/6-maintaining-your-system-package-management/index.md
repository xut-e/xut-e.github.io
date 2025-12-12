---
layout: apunte
title: "6. Maintaining your System - Package Management"
---

<h2>Introduciendo Paquetes y Repositorios de Software</h2>
Cuando los desarrolladores de software quieren subir su trabajo a la comunidad pueden subirlo a un repositorio "apt". Si es aprobado, sus programas y herramientas serán compartidos.

!**031.png**

Los archivos listados en `/etc/apt/` sirven como gateway/registro. Puedes añadir repositorios de la comunidad a tu sistema operativo haciendo `add-apt-repositorio`.

------------------
<h2>Controlando tus repositorios (añadiendo y eliminando)</h2>
Normalmente usamos apt para instalar software en nuestro sistema. Apt es un comando de un gestor de paquetes y contiene una gran cantidad de herramientas.

Es seguro descargar este software por las claves GPG (GNU Privacy Guard). Estas son usadas por los desarrolladores y si a la hora de descargar estos paquetes las claves no coinciden no se descargará.

1. Empezaremos descargando la clave GPG de los desarrolladores de Sublime Text 3: `wget -q0 - https://download.sublimetext.com/sublimehq-pub.gpg | sudo apt-key add -`.
2. Ahora que hemos añadido la llave a nuestra lista de claves confiables, podemos añadir el repositorio de Sublime Text 3 a nuestra lista de fuente apt.
	1. Crearemos un archivo llamado **sublime-text.list** en **/etc/apt/sources.list.d** e introduciremos la información así.
	   
```bash
vim sublime-text.list

dentro del archivo escribimos:

deb https://download.sublimetext.com/ apt/stable/
```

3. Después de añadir esta línea necesitamos actualizar apt: `apt update`.
4. Ahora ya podemos instalar el software: `apt install sublime-text`.
5. Para borrar: `add-apt-repository --remove ppa:PPA_Name/ppa` o borrar manualmente el archivo que hemos creado antes.
6. Una vez borrado podemos usar `apt remove <nombre_software>`, por ejemplo, `apt remove sublime-text`.