---
layout: apunte
title: "2. Getting the Flags"
---

<h2>Escaneo inicial</h2>
Comenzamos enumerando puertos abiertos.

!**Pasted image 20260313133250.png**

Ahora escaneamos los puertos más en profundidad.

!**Pasted image 20260313133538.png**

Vamos a ver ahora qué directorios hay en la web.

!**Pasted image 20260313134256.png**

Vamos a ver lo que hay en el directorio principal de la web primero.

!**Pasted image 20260313134515.png**

Documento inicial de Apache2.

Vamos a ver en los directorios que encontramos. Primero en `/etc/`.

!**Pasted image 20260313134604.png**

El archivo `passwd` contiene un hash.

!**Pasted image 20260313141808.png**

Y ahora en `/admin/`.

!**Pasted image 20260313134720.png**

Parece una web de música sobre el autor. Navegando un poco por la página nos encontramos esto:

!**Pasted image 20260313134910.png**

Vemos que sólo podemos descargar un archivo `.tar` (el que habíamos encontrado con `dirsearch`) y observar la página `admins.html`.

El archivo `admin.html` dice así:

```text
############################################
############################################
[Yesterday at 4.32pm from Josh]
Are we all going to watch the football game at the weekend??
############################################
############################################
[Yesterday at 4.33pm from Adam]
Yeah Yeah mate absolutely hope they win!
############################################
############################################
[Yesterday at 4.35pm from Josh]
See you there then mate!
############################################
############################################
[Today at 5.45am from Alex]
Ok sorry guys i think i messed something up, uhh i was playing around with the squid proxy i mentioned earlier.
I decided to give up like i always do ahahaha sorry about that.
I heard these proxy things are supposed to make your website secure but i barely know how to use it so im probably making it more insecure in the process.
Might pass it over to the IT guys but in the meantime all the config files are laying about.
And since i dont know how it works im not sure how to delete them hope they don't contain any confidential information lol.
other than that im pretty sure my backup "music_archive" is safe just to confirm.
############################################
############################################
```

---------------------------------
<h2>Profundización</h2>
Bueno lo primero que menciona es el proxy "squid", vamos que la está liando que flipas. Vamos a ver qué contiene el archivo tar que nos hemos descargado.

!**Pasted image 20260313135407.png**

El tar descomprimido nos da un directorio `/home`, vamos a ver qué hay en él.

!**Pasted image 20260313135538.png**

Pues por desgracia para nuestro colegón parece que sí había cosas en las configuraciones, vamos a seguir investigando.

!**Pasted image 20260313135732.png**

Parece que hemos encontrado el repositorio.

Es un tipo de backup comprimido. 

-----------------------------
<h2>Explotación</h2>
Vamos a proceder a instalar la herramienta que necesita.

!**Pasted image 20260313140419.png**

Ahora intentamos listar los backups:

!**Pasted image 20260313141020.png**

Nos pide contraseña así que vamos a crackear el hash que encontramos antes.

!**Pasted image 20260313142000.png**

Vamos ahora a volver a listar los backups:

!**Pasted image 20260313142038.png**

Es el backup que ya conocíamos, vamos a extraerlo.

!**Pasted image 20260313142245.png**

Ahora vamos a mirar.

!**Pasted image 20260313142303.png**

Hay una carpeta nueva, vamos a ver qué hay en ella.

!**Pasted image 20260313142355.png**

Vamos a leer el secret.

!**Pasted image 20260313142501.png**

En `secret.txt` no había nada pero en `note.txt` había una contraseña. Vamos a iniciar sesión por SSH.

!**Pasted image 20260313142611.png**

Miramos a ver qué hay y leemos la flag de usuario.

!**Pasted image 20260313142651.png**

----------------------------------
<h2>Escalada de Privilegios</h2>
Vamos a intentar escalar privilegios, con la técnica más sencilla: `sudo -l`.

!**Pasted image 20260313142737.png**

Parece que podemos ejecutar `/etc/mp3backups/backup.sh` como root sin contraseña.

!**Pasted image 20260313143038.png**

Parece que podemos pasar un argumento con  `-c` y si es ejecutado como root obtendremos una consola.

!**Pasted image 20260313143353.png**

Intenté spawnear una shell de bash pero no funcionó como esperaba, así que voy simplemente a trabajar desde el script. Por que he intentado mandarme una reverse shell por `nc` y ha fallado.

Listamos lo que hay en `/root`.

!**Pasted image 20260313143743.png**

Al final del todo sale el archivo. Pues vamos a leerlo.

!**Pasted image 20260313143823.png**

