---
layout: apunte
title: "2. Getting the Flags"
---

<h2>Reconocimiento Inicial</h2>
Vamos a comenzar escaneando los puertos abiertos de la máquina.

!**Pasted image 20260401171354.png**

Ahora escaneamos dichos puertos abiertos más a fondo.

!**Pasted image 20260401171407.png**

De aquí sacamos varia información, parece que está usando el CMS Joomla y tiene varias rutas en el `robots.txt`.

Vamos a listar directorios web.

!**Pasted image 20260401171733.png**
!**Pasted image 20260401171819.png**

Son muchos más, por lo que voy a poner aquí el tree.

```text
voyage.thm
    ├── administrator [200 4KB]
    │   ├── cache [200 31B]
    │   ├── components [200 819B]
    │   ├── help [200 454B]
    │   ├── includes [200 501B]
    │   ├── logs [200 31B]
    │   ├── modules [200 704B]
    │   ├── templates [200 470B]
    │   └── index.php [200 4KB]
    ├── api
    │   ├── components [200 653B]
    │   └── includes [200 496B]
    ├── cache [200 31B]
    ├── cli [200 31B]
    ├── components [200 31B]
    ├── images [200 31B]
    │   └── banners [200 536B]
    ├── includes [200 31B]
    ├── layouts [200 31B]
    │   ├── joomla [200 618B]
    │   │   ├── content [200 750B]
    │   │   ├── editors [200 491B]
    │   │   ├── error [200 31B]
    │   │   ├── html [200 505B]
    │   │   ├── system [200 466B]
    │   │   └── tinymce [200 494B]
    │   ├── libraries [200 452B]
    │   │   └── html [200 457B]
    │   └── plugins [200 476B]
    │       ├── editors [200 460B]
    │       │   └── tinymce [200 463B]
    │       ├── system [200 479B]
    │       └── user [200 467B]
    ├── media [200 31B]
    │   ├── layouts [200 459B]
    │   │   └── js [200 454B]
    │   │       └── joomla [200 469B]
    │   │           └── html [200 460B]
    │   ├── system [200 530B]
    │   │   ├── html [200 460B]
    │   │   ├── images [200 565B]
    │   │   │   └── favicon.ico [200 2KB]
    │   │   └── js [200 1KB]
    │   ├── templates [200 468B]
    │   │   ├── administrator [200 461B]
    │   │   └── site [200 458B]
    │   └── vendor [200 813B]
    │       ├── accessibility
    │       │   ├── js [200 512B]
    │       │   └── LICENSE [200 1KB]
    │       └── tinymce [200 605B]
    │           ├── icons
    │           │   └── default
    │           │       └── index.js [200 150B]
    │           ├── plugins [200 905B]
    │           │   ├── code
    │           │   │   └── index.js [200 149B]
    │           │   ├── help [200 533B]
    │           │   │   └── index.js [200 148B]
    │           │   ├── image
    │           │   │   └── index.js [200 153B]
    │           │   ├── link
    │           │   │   └── index.js [200 149B]
    │           │   ├── lists [200 534B]
    │           │   │   └── index.js [200 152B]
    │           │   ├── media [200 531B]
    │           │   │   └── index.js [200 150B]
    │           │   ├── print
    │           │   │   └── index.js [200 150B]
    │           │   ├── save
    │           │   │   └── index.js [200 150B]
    │           │   ├── template [200 534B]
    │           │   │   └── index.js [200 151B]
    │           │   └── textpattern [200 537B]
    │           │       └── index.js [200 154B]
    │           ├── skins
    │           │   ├── content [200 502B]
    │           │   └── ui [200 474B]
    │           ├── templates [200 490B]
    │           ├── themes [200 473B]
    │           │   └── mobile
    │           │       └── index.js [200 148B]
    │           └── license.txt [200 9KB]
    ├── modules [200 31B]
    ├── plugins [200 31B]
    │   ├── authentication
    │   │   ├── joomla [200 488B]
    │   │   │   └── joomla.xml [200 443B]
    │   │   └── ldap [200 486B]
    │   ├── content [200 561B]
    │   │   └── joomla [200 484B]
    │   │       └── joomla.xml [200 663B]
    │   ├── editors [200 478B]
    │   │   └── tinymce [200 513B]
    │   │       └── src [200 477B]
    │   ├── privacy
    │   │   ├── content [200 485B]
    │   │   └── user [200 483B]
    │   ├── system [200 727B]
    │   │   ├── cache [200 505B]
    │   │   │   ├── services [200 474B]
    │   │   │   └── src [200 459B]
    │   │   ├── debug [200 504B]
    │   │   │   ├── src [200 579B]
    │   │   │   └── debug.xml [200 1KB]
    │   │   ├── log [200 480B]
    │   │   ├── logout [200 484B]
    │   │   └── stats [200 512B]
    │   │       ├── layouts [200 507B]
    │   │       └── src [200 457B]
    │   └── user [200 500B]
    │       ├── joomla [200 481B]
    │       │   └── joomla.xml [200 636B]
    │       ├── profile
    │       │   └── src [200 457B]
    │       └── terms
    │           └── src [200 456B]
    ├── templates [200 31B]
    │   └── index.html [200 31B]
    ├── tmp [200 31B]
    ├── htaccess.txt [200 3KB]
    ├── index.php [200 2KB]
    ├── LICENSE.txt [200 7KB]
    ├── README.txt [200 2KB]
    ├── robots.txt [200 360B]
    └── web.config.txt [200 877B]
```

Vamos a ver cómo es la web.

!**Pasted image 20260401182652.png**

Parece que tiene una parte oculta detrás del login. Vamos primero a mirar los archivos y directorios que ya hemos encontrado.

En los directorios que hemos visto lo único de "valor" parece ser un directorio llamado `/administrator/`, aunque puede que más adelante `/cli/` y `/api/` tengan valor.

!**Pasted image 20260401184240.png**



-----------------------------
<h2>Profundización</h2>
Vamos a buscar la versión de Joomla. Usamos `cmseek`.

!**Pasted image 20260401185015.png**

Vamos a mirar si existen vulnerabilidades conocidas.

!**Pasted image 20260401185215.png**

Parece que sí, vamos a investigar ahora por las versiones de SSH que vimos antes, porque es raro que haya dos, desde luego. No parece que haya vulnerabilidades SSH conocidas. Vamos a ver qué podemos lograr con lo de Joomla.

!**Pasted image 20260401190949.png**

He encontrado este exploit en [GitHub](https://github.com/K3ysTr0K3R/CVE-2023-23752-EXPLOIT).

----------------------------------------
<h2>Explotación</h2>
Utilizamos el exploit.

!**Pasted image 20260401191136.png**

Y acabamos de obtener credenciales e email válidos. Vamos a ver qué podemos hacer por el panel de administración. No nos ha dejado inicial sesión en la propia página, vamos a intentarlo por SSH.

!**Pasted image 20260401192356.png**



------------------------------------
<h2>Escalada de Privilegios</h2>
