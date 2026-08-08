---
layout: apunte
title: "4. Enumeration through Command Prompt"
---

<h2>Command Prompt</h2>
Hay veces donde sólo necesitas realizar un lookup AD rápido y sucio y la Command Prompt te tiene vigilada la espalda. El CMD es útil cuando quizás no tienes acceso RDP al sistema, los defensores están monitorizando el uso de PowerShell y necesitas realizar tu enumeración AD a través de un Remote Access Trojan (RAT). Puede ser útil incluso para incrustar un par de comandos de enumeración AD en tu payload de phishing para ganar información vital que puede ayudarte.

EL CMD tiene un comando propio que podemos usar para enumerar información sobre el AD llamado `net`. El comando `net` es útil para enumerar información sobre el sistema local y el AD. Veremos un par de cosas interesantes que podemos enumerar desde esta posición, pero no es una lista exhaustiva.

---------------------------------------------------
<h2>Usuarios</h2>
Podemos usar el comando `net` para listar a todos los usuarios en el dominio AD usando la subopción `user`:

```batch
C:\>net user /domain
The request will be processed at a domain controller for domain za.tryhackme.com

User accounts for \\THMDC

-------------------------------------------------------------------------------
aaron.conway             aaron.hancock            aaron.harris
aaron.johnson            aaron.lewis              aaron.moore
aaron.patel              aaron.smith              abbie.joyce
abbie.robertson          abbie.taylor             abbie.walker
abdul.akhtar             abdul.bates              abdul.holt
abdul.jones              abdul.wall               abdul.west
abdul.wilson             abigail.cox              abigail.cox1
abigail.smith            abigail.ward             abigail.wheeler
[....]
The command completed successfully.
```

Esto devolverá una lista de todos los usuarios AD y puede ser útil para determinar el tamaño del dominio. También podemos usar esta subopción para enumerar información más detallada sobre una cuenta de usuario.

```batch
C:\>net user zoe.marshall /domain
The request will be processed at a domain controller for domain za.tryhackme.com

User name                    zoe.marshall
Full Name                    Zoe Marshall
Comment
User's comment
Country/region code          000 (System Default)
Account active               Yes
Account expires              Never

Password last set            2/24/2022 10:06:06 PM
Password expires             Never
Password changeable          2/24/2022 10:06:06 PM
Password required            Yes
User may change password     Yes

Workstations allowed         All
Logon script
User profile
Home directory
Last logon                   Never

Logon hours allowed          All

Local Group Memberships
Global Group memberships     *Domain Users         *Internet Access
The command completed successfully.
```

>[!IMPORTANT] Este comando funcionará bien si el usuario forma parte de pocos grupos AD. Sin embargo, a partir de 10 grupos, el comando empezará a no ser capaz de listarlos todos.

----------------------------
<h2>Grupos</h2>
Podemos usar el comando `net` para enumerar grupoos del doominio usando la subopción `group`:

```batch
C:\>net group /domain
The request will be processed at a domain controller for domain za.tryhackme.com

Group Accounts for \\THMDC

-------------------------------------------------------------------------------
*Cloneable Domain Controllers
*DnsUpdateProxy
*Domain Admins
*Domain Computers
*Domain Controllers
*Domain Guests
*Domain Users
[...]
*Schema Admins
*Server Admins
*Tier 0 Admins
*Tier 1 Admins
*Tier 2 Admins
The command completed successfully.
```

Esta información  puede ayudarnos a encontrar grupos específicos. También podríamos enumerar más detalles como la pertenencia a un grupo especificando este en el mismo comando:

```batch
C:\>net group "Tier 1 Admins" /domain
The request will be processed at a domain controller for domain za.tryhackme.com

Group name     Tier 1 Admins
Comment

Members

-------------------------------------------------------------------------------
t1_arthur.tyler          t1_gary.moss             t1_henry.miller
t1_jill.wallis           t1_joel.stephenson       t1_marian.yates
t1_rosie.bryant
The command completed successfully.
```

---------------------------------------
<h2>Políticas de Contraseña</h2>
Podemos usar el comando `net` para enumerar la política de contraseña del dominio usando la subopción `accounts`.

```batch
C:\>net accounts /domain
The request will be processed at a domain controller for domain za.tryhackme.com

Force user logoff how long after time expires?:       Never
Minimum password age (days):                          0
Maximum password age (days):                          Unlimited
Minimum password length:                              0
Length of password history maintained:                None
Lockout threshold:                                    Never
Lockout duration (minutes):                           30
Lockout observation window (minutes):                 30
Computer role:                                        PRIMARY
The command completed successfully.
```

Estp nos dará información útil como:

- Longitud del historial de contraseñas. Lo que implica cuántas contraseñas únicas debe dar el usuario antes de poder reutilizar una.
- El límite de intentos de contraseña incorrectos hasta que la cuenta sea bloqueada.
- La longitud mínima de la contraseña.
- La vida máxima de la contraseña.

Esta información puede beneficiarnos si queremos programar ataques de password spraying contra otros usuarios que hayamos enumerado. Puede ayudarnos a entender mejor qué contraseñas utilizar y cuántas veces realizar el ataque.

Puedes encontrar un rango completo de opciones asociadas al comando `net` [aquí](https://learn.microsoft.com/en-us/troubleshoot/windows-server/networking/net-commands-on-operating-systems).

---------------------------------
<h2>Beneficios</h2>
- No se requiere el uso de herramientas, y estos comndos simples suelen ser no monitorizados por el blue team.
- No necesitamos GUI para hacer esta enumeración.
- VBScript y otros lenguajes macro que suelen usarse para payloads de phishing, soportan estos comandos nativamente por lo que pueden ser usados para enumerar la información inicial respecto al dominio AD.

--------------------------------------
<h2>Desventajas</h2>
- El comando `net` debe ser ejecutado desde una máquina unida al dominio.
- El comando `net` puede no mostrar toda la información.
