---
layout: apunte
title: "2. Getting the Flags"
---

<h2>Reconocimiento Inicial</h2>
Comenzamos realizando un escaneo de puertos abiertos.

!**Pasted image 20261002131920.png**

Ahora vamos a analizar dichos puertos más en profundidad.

!**Pasted image 20261002131937.png**

-----------------------
<h2>Profundización</h2>
Con la cuenta provista vamos a intentar iniciar sesión primero por SSH.

!**Pasted image 20261002130430.png**

Parece ser que no se puede. El puerto 3389 es el de RDP, así que vamos a entrar por RDP con:

```bash
xfreerdp3 /v:layover.htb /u:'contractor' /p:'Contractor2026!' /dynamic-resolution +clipboard
```

!**Pasted image 20261002133236.png**

Podemos ver que estamos en el grupo `sudo`.

!**Pasted image 20261002133921.png**

Investigando vemos que hay una página web cargada.

!**Pasted image 20261002133333.png**

Podemos ir a la página de login.

!**Pasted image 20261002143557.png**

Y dos interfaces de red Wi-Fi con una única sola posible conexión que parece ser una red abierta.

!**Pasted image 20261002133554.png**

<h3>Obtención de Credenciales - Wireshark en red abierta HTTP</h3>
Nos conectamos a la `wlan2` por ejemplo. Ahora vamos a analizar los paquetes de red. Para poder ver todos los que hay necesitamos primero poner la otra interfaz en modo `monitor` y después poner ambas en el mismo canal.

1. Buscamos el canal de la interfaz de red que estamos usando.
   !**Pasted image 20261002134003.png**
2. Matamos cualquier proceso que pueda interferir y ponemos la `wlan3` en modo `monitor`.
   !**Pasted image 20261002134107.png**
3. Cambiamos el canal.
   !**Pasted image 20261002134215.png**

Ahora que ya tenemos el entorno de interfaces configurado, vamos a abrir `wireshark`. Seleccionamos `wlan3mon` y filtramos por `http.request.method == POST`.

!**Pasted image 20261002134430.png**

Obtenemos así credenciales para un usuario. Una vez hecho esto vamos a revertir los cambios que hicimos.

!**Pasted image 20261002134529.png**
!**Pasted image 20261002135329.png**

Ahora vamos a iniciar sesión con estas credenciales.

!**Pasted image 20261002135435.png**

No parece haber nada, vamos a buscar la interfaz de administrador.

!**Pasted image 20261002135514.png**

Iniciamos sesión con las credenciales obtenidas.

!**Pasted image 20261002135556.png**

-------------------------------
<h2>Explotación</h2>

<h3>CVE-2026-31857</h3>
Tenemos software y versión. Vamos a ver si es vulnerable.

!**Pasted image 20261002140045.png**

Parece que sí, vamos a ver si hay algún PoC. Encontramos el [PoC de 0Asylum](https://github.com/0Asylum/CVE-2026-31857).

!**Pasted image 20261002140108.png**

Lo descargamos lo servimos y lo llevamos hasta la máquina víctima. y lo ejecutamos.

!**Pasted image 20261002140404.png**

<h3>Pivotaje hacia aporter : Clave + Proceso Criptográfico Conocidos</h3>
Vamos a investigar el sistema ahora.

!**Pasted image 20261002140454.png**

Podemos ver un archivo `.env`. Vamos a ver lo que hay dentro.

!**Pasted image 20261002140543.png**

Una clave y un usuario con contraseña. Vamos a ver lo que hay en la base de datos. Intentamos conectarnos en modo interactivo pero la shell del PoC no lo permite, por lo que vamos a usar comandos para leerlo todo en tiempo real.

!**Pasted image 20261002140809.png**

La tabla `htbairways_settings` es la que más interesante parece a simple vista. Vamos a leer lo que hay dentro de ella.

!**Pasted image 20261002140952.png**

No es ni siquiera un hash, es un blob, pero tenemos la `KEY` para decodearla. Hay que encontrar cómo se ha cifrado.

!**Pasted image 20261002141122.png**

Parece que los controladores están en `/console`.

!**Pasted image 20261002141323.png**

Parece que está recuperando la clave y usándola para cifrar la contraseña junto a `base64`. Vamos a pedirle a la IA que nos de un comando para desencriptar la contraseña.

```bash
php -r "require 'vendor/autoload.php'; require 'vendor/yiisoft/yii2/Yii.php'; echo (new yii\base\Security())->decryptByKey(base64_decode('BLOB_AQUÍ'), 'KEY_AQUÍ') . PHP_EOL;"
```

Nos da esto, vamos a usarlo. 

>[!CAUTION] Hay que tener en cuenta que debemos estar en el directorio donde se encuentra `vendor`.

!**Pasted image 20261002141921.png**

Con la contraseña y el usuario vamos a ver primero si está abierto el puerto 22.

!**Pasted image 20261002142117.png**

Sí que lo está, así que vamos a conectarnos por SSH.

!**Pasted image 20261002142209.png**

Aquí está la user flag. 

--------------------------------
<h2>Escalada de Privilegios</h2>

<h3>CVE-2026-34990</h3>
Ahora toca escalar privilegios. Después de un rato intentando varias cosas (técnicas convencionales, linpeas.sh...) y que nada funcionara se me ocurrió listar servicios ejecutándose como `root`.

!**Pasted image 20261002142411.png**

Investigando cada uno vemos que el puerto de CUPS por defecto es el 631, y al hacer `curl` hacia él nos encontramos lo siguiente:

!**Pasted image 20261002142900.png**

Si buscamos vulnerabilidades para esta versión, vemos lo siguiente:

!**Pasted image 20261002142942.png**

Buscando PoCs encontramos el de [preddy](https://github.com/predyy/CVE-2026-34990).

!**Pasted image 20261002143012.png**

Lo descargamos y lo servimos desde nuestra máquina a `layover.htb` y de ella a la que tenemos el SSH.

!**Pasted image 20261002143343.png**

Ahora lo ejecutamos.

!**Pasted image 20261002143442.png**

Y así obtenemos la root flag.

-----------------------------------
<h2>Conclusión</h2>
Máquina relativamente sencilla pero en la que hemos utilizado técnicas reales de hacking en la vida cotidiana:

- Captura de credenciales en red abierta sin cifrar (HTTP).
- Búsqueda de CVE's y PoC's tanto para el CMS como para el servicio CUPS.
- Enumeración de servicios vulnerables.
- Búsqueda en DB's y en Controllers para desencriptar un blob.

En general buena máquina, divertida.

>[!SUCCESS] Máquina 1 de la temporada 12 completada.

