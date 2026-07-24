---
layout: apunte
title: "2. Credential Injection"
---

Antes de saltar a los objetos AD y enumeración, vamos a hablar de los métodos de inyección de credenciales. Desde la red de Breaching AD, puedes haber visto que las credenciales suelen encontrarse sin comprometer la máquina unida al dominio.

--------------------------------------
<h2>Windows vs Linux</h2>
>[!QUOTE] Si conoces al enemigo y a tí mismo, no debes temer el resultado de cien batallas. Si te conoces a tí mismo pero no al enemigo, por cada batalla ganada también sufrirás una derrota.
>Sun Tzu - El Arte de la Guerra.

Puedes llegar muy lejos enumerando AD desde una máquina Kali. Aún así, si quieres realizar una enumeración más profunda, e incluso explotación, necesitas entender y replicar a tu enemigo. Por eso necesitas una máquina Windows. Esto te permitirá varios métodos integrados en la fase de enumeración y explotación. En esta red, exploraremos una de estas herramientas, llamada `runas.exe`.

----------------------------------------
<h2>Runas Explicado</h2>
¿Has encontrado alguna vez credenciales pero ningún sitio para iniciar sesión con ellas? Runas puede ser la respuesta que buscas.

En las evaluaciones de seguridad, normalmente tendrás acceso a una red y credenciales AD que hayas descubierto pero no tendrás formas o privilegios para crear una nueva máquina de dominio. Por lo que necesitamos la habilidad de usar esas credenciales en una máquina Windows que controlemos.

Si tenemos credenciales AD en el formato de `username:password`, podemos usar Runas (binario legítimo de Windows) para inyectar las credenciales en memoria. El comando normal de Runas se ve así:

`runas.exe /netonly /user:<domain>\<username> cmd.exe`

Vamos a ver qué significan los parámetros:

- **/netonly:** Como no formamos parte del dominio, queremos cargar las credenciales para autentificación de red pero no contra el controlador del dominio. Para que los comandos ejecutados localmente en el ordenador se ejecuten en el contexto de la cuenta estándar de Windows, pero cualquier conexión de red ocurrirá usando la cuenta especificada.
- **/user:** Aquí damos los detalles de dominio y nombre de usuario. Siempre es seguro usar el FQDN (Fully Qualified Domain Name) en lugar de simplemente el nombre de NetBIOS del dominio.
- **cmd.exe:** Este es el programa que queremos ejecutar una vez las credenciales sean inyectadas. Esto puede cambiarse a cualquier cosa, pero la apuesta más segura es `cmd.exe` ya que la puedes usar para lanzar lo que quieras.

Una vez ejecutado este comando, te pedirán la contraseña. Ten en cuenta que como hemos añadido el parámetro `/netonly`, las credenciales no serán verificadas directamente por el controlador de dominio, por lo que aceptará cualquier contraseña. Aún así todavía debemos confirmar que las credenciales de red se han cargado correctamente.

-------------------------
<h2>Siempre es el DNS</h2>
Después de poner la contraseña, un nuevo prompt de comandos se abrirá. Ahora necesitamos verificar que nuestras credenciales funcionan. La forma más fehaciente de hacer esto es listar `SYSVOL`. Cualquier cuenta AD, sin importar sus privilegios, puede leer los contenidos del directorio `SYSVOL`.

`SYSVOL` es una carpeta que existe en todos los controladores de dominio. Es una carpeta compartida que guarda los GPOs e información junto a cualquier otro script relacionado con el dominio. Es un componente esencial para el AD ya que entrega estas GPOs a los ordenadores de todo el dominio. Los ordenadores que forman parte del dominio puede leer estas GPOs y aplicarlas, haciendo que el dominio tenga configuración central.

Antes de listar `SYSVOL`, debemos asegurarnos de configurar el DNS. A veces tenemos suerte, y el DNS interno está configurado a través de DHCP o VPN, pero conviene saber hacerlo manualmente. La apuesta más segura para el servidor DNS suele ser el controlador de dominio. Usando la IP del controlador de dominio, podemos ejecutar los siguientes comandos en una ventana PowerShell:

```powershell
$dnsip = "<DC IP>"
$index = Get-NetAdapter -Name 'Ethernet' | Select-Object -ExpandProperty 'ifIndex'
Set-DnsClientServerAddress -InterfaceIndex $index -ServerAddresses $dnsip
```

>[!IMPORTANT] Por supuesto, "Ethernet" será en verdad cualquiera que sea la interfaz conexctada.

Para verificar que el DNS funciona correctamente, podemos ejecutar el siguiente comando:

```batch
nslookup za.tryhackme.com
```

Esto debería resolver a la IP del DC donde está hosteado el FQDN. Ahora que el DNS funciona, podemos probar nuestras credenciales, usando el siguiente comando para forzar el listado del directorio `SYSVOL`:

```batch
C:\Tools>dir \\za.tryhackme.com\SYSVOL\
 Volume in drive \\za.tryhackme.com\SYSVOL is Windows
 Volume Serial Number is 1634-22A9

 Directory of \\za.tryhackme.com\SYSVOL

02/24/2022  09:57 PM    <DIR>          .
02/24/2022  09:57 PM    <DIR>          ..
02/24/2022  09:57 PM    <JUNCTION>     za.tryhackme.com [C:\Windows\SYSVOL\domain]
               0 File(s)              0 bytes
               3 Dir(s)  51,835,408,384 bytes free
```

>[!IMPORTANT] Ten en cuenta que no entraremos a ver los contenidos del directorio `SYSVOL` en profundidad, aunque conviene enumerarlo ya que puede contener más credenciales en su interior.

-----------------------------------------
<h2>IP vs Hostnames</h2>
¿Hay acaso diferencia entre `dir \\za.tryhackme.com\SYSVOL` y `dir \\<DC_IP>\SYSVOL`?

Bien, pues sí que la hay y se redice al método de autentificación usado. Cuando damos el hostname, la autentificación de red intentará primero realizar autentificación Kerberos. Como esta autentificación usa hostnames, si damos la IP en su lugar, podemos forzar el tipo de autentificación a ser NTLM.

---------------------
<h2>Usando Credenciales Inyectadas</h2>
Ahora que hemos inyectado nuestras credenciales en la memoria, aquí es donde comienza la diversión. Con la opción `/netonly`, todas las comunicaciones de red usarán estas credenciales inyectadas para la autentificación. Esto incluye las comunicaciones de red de todas las aplicaciones ejecutadas desde la ventana de prompt de comandos.

Aquí es donde se pone potente. ¿Has oído alguna vez un caso donde una base de datos MS SQL usase Windows Authentication y no estuvieras unido al dominio? Arranca MS SQL Studio desde el prompt de comandos, incluso aunque muestre tu nombre local, haz click en Log In, y usa las credenciales AD en el background para autentificarte. Podemos incluso usar esto para autentificarnos a las aplicaciones web que usen autentificación NTLM.

