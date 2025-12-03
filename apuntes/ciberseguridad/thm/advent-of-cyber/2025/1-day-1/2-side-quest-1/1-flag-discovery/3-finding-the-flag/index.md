---
layout: apunte
title: "3. Finding the Flag"
---

Una vez encontrados los fragmentos y desciframos la nota de Mc Skidy, obtenemos la siguiente pista:

```txt
Congrats — you found all fragments and reached this file.

Below is the list that should be live on the site. If you replace the contents of /home/socmas/2025/wishlist.txt with this exact list (one item per line, no numbering), the site will recognise it and the takeover glitching will stop. Do it — it will save the site.

Hardware security keys (YubiKey or similar)
Commercial password manager subscriptions (team seats)
Endpoint detection & response (EDR) licenses
Secure remote access appliances (jump boxes)
Cloud workload scanning credits (container/image scanning)
Threat intelligence feed subscription

Secure code review / SAST tool access
Dedicated secure test lab VM pool
Incident response runbook templates and playbooks
Electronic safe drive with encrypted backups

A final note — I don't know exactly where they have me, but there are *lots* of eggs and I can smell chocolate in the air. Something big is coming.  

— McSkidy

---

When the wishlist is corrected, the site will show a block of ciphertext. This ciphertext can be decrypted with the following unlock key:

UNLOCK_KEY: 91J6X7R4FQ9TQPM9JX2Q9X2Z

To decode the ciphertext, use OpenSSL. For instance, if you copied the ciphertext into a file /tmp/website_output.txt you could decode using the following command:

cat > /tmp/website_output.txt
openssl enc -d -aes-256-cbc -pbkdf2 -iter 200000 -salt -base64 -in /tmp/website_output.txt -out /tmp/decoded_message.txt -pass pass:'91J6X7R4FQ9TQPM9JX2Q9X2Z'
cat /tmp/decoded_message.txt

Sorry to be so convoluted, I couldn't risk making this easy while King Malhare watches. 

— McSkidy
```

Traducción:

```txt
¡Felicidades! Has encontrado todos los fragmentos y has llegado a este archivo.

A continuación se muestra la lista que debería estar activa en el sitio. Si reemplazas el contenido de /home/socmas/2025/wishlist.txt con esta misma lista (un elemento por línea, sin numeración), el sitio lo reconocerá y el fallo de glitch se detendrá. Hazlo — salvarás el sitio.

Hardware security keys (YubiKey or similar)
Commercial password manager subscriptions (team seats)
Endpoint detection & response (EDR) licenses
Secure remote access appliances (jump boxes)
Cloud workload scanning credits (container/image scanning)
Threat intelligence feed subscription

Secure code review / SAST tool access
Dedicated secure test lab VM pool
Incident response runbook templates and playbooks
Electronic safe drive with encrypted backups

Una nota final: No sé exactamente dónde me tienen, pero hay *muchísimos* huevos y huelo chocolate en el aire. ¡Algo grande se avecina! 

— McSkidy

---

Cuando se corrija la lista de deseos, el sitio mostrará un bloque de texto cifrado. Este texto cifrado se puede descifrar con la siguiente clave de desbloqueo:

CLAVE_DE_DESBLOQUEO:'91J6X7R4FQ9TQPM9JX2Q9X2Z'

Para decodificar el texto cifrado, use OpenSSL. Por ejemplo, si copió el texto cifrado en el archivo /tmp/website_output.txt, podría decodificarlo con los siguientes comandos:

cat > /tmp/website_output.txt

openssl enc -d -aes-256-cbc -pbkdf2 -iter 200000 -salt -base64 -in /tmp/website_output.txt -out /tmp/decoded_message.txt -pass pass:'91J6X7R4FQ9TQPM9JX2Q9X2Z'

cat /tmp/decoded_message.txt

Disculpa la complejidad, pero no podía arriesgarme a simplificarlo mientras el rey Malhare observaba.

— McSkidy
```

Con esta pista vamos a averiguar la flag.

------------------------------------------
1. Escaneamos el sitio.
   !**Pasted image 20251203011751.png**
2. Como el puerto 80 no arroja una web válida vamos al puerto 8080.
   !**Pasted image 20251203011922.png**
   Aquí está la página de la que nos hablaba la pista (y bastante glitcheada).
3. Vamos a seguir las instrucciones que nos dan.
	1. Podemos editar dicho archivo porque eddi forma parte de los editores de socmas.
	   !**Pasted image 20251203012105.png**
	2. Copiamos el contenido que nos dan linea a linea y lo pegamos en `home/socmas/2025/wishlist.txt`.
	   !**Pasted image 20251203012317.png**
	3. Recargamos la página con `Ctrl+Shift+R`.
	   !**Pasted image 20251203012411.png**
	4. Guardamos el hash en un archivo.
	   !**Pasted image 20251203012559.png**
	5. Usamos el comando de `openssl` que nos dan.
	   !**Pasted image 20251203012727.png**
	6. Leemos el archivo.
	   !**Pasted image 20251203012833.png**
4. Hacemos lo que nos dice la nota para encontrar la llave de la sidequest.
	1. Primero vamos al directorio y metemos el comando de desencriptar con gpg.
	   !**Pasted image 20251203013021.png**
	2. Introducimos la flag.
	   !**Pasted image 20251203013135.png**
	3. Desempaquetamos el archivo.
	   !**Pasted image 20251203013228.png**
	4. Miramos a ver qué hay en dir.
	   !**Pasted image 20251203013325.png**
	5. Nos lo pasamos a nuestra máquina.
		1. Lo servimos con Python.
		   !**Pasted image 20251203013417.png**
		2. Lo descargamos con `wget`.
		   !**Pasted image 20251203013530.png**
		3. Podemos ver que la petición ha sido correcta.
		   !**Pasted image 20251203013549.png**
	6. Lo abrimos.
	   !**Pasted image 20251203013632.png**


>[!SUCCESS] Acabamos de obtener la clave para la máquina Side Quest 1.

