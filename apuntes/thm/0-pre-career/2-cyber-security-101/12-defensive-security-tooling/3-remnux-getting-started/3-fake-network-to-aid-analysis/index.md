---
layout: apunte
title: "3. Fake Network to Aid Analysis"
---

Durante un análisis dinámico es esencial observar el comportamiento del software potencialmente peligroso, especialmente sus actividades de red. Hay varias maneras de hacer esto. Podemos crear una infraestructura entera, un entorno virtual con diferentes máquinas y más. De forma alternativa, hay una herramienta dentro de REMnux VM llamada **INetSim: Internet Services Simulation Suite**.

Usaremos las funcionalidades de INetSim para simular una red real en esta tarea.

--------------------------------
<h2>Máquinas Virtuales</h2>
Para esta tarea usaremos 2 máquinas. La primera es nuestra máquina REMnux y la segunda es la AttackBox. Para ejecutar la Attackbox, clickamos en el botón azul **Start AttackBox**. Puedes cambiar de una a otra pinchando en los botones de abajo:

!**Pasted image 20251029183511.png**

---------------------------------
<h2>INetSim</h2>
Antes de empezar debemos configurar la herramienta INetSim dentro de nuestra REMnux. Primero comprueba la IP asignada a tu máquina. Esto se puede ver usando el comando `ipconfig`. Después necesitaremos cambiar la configuración de INetSim corriendo el comando `sudo vu /etc/inetsim/inetsim.conf` y buscando el valor `#dns_default_ip 0.0.0.0`.

Elimina el comentario (`#`) y cambia el valor de `0.0.0.0` a la IP de la máquina que has identificado antes. Guarda y sal. Usa el siguiente comando para comprobar los cambios:

`cat /etc/inetsim/inetsim.conf | grep dns_default_ip`

```powershell
ubuntu@10.10.134.94:~$ cat /etc/inetsim/inetsim.conf | grep dns_default_ip
# dns_default_ip
# Syntax: dns_default_ip 
dns_default_ip	 10.10.134.94
```

Por último ejecuta la herramienta con:

```powershell
ubuntu@10.10.134.94:~$ sudo inetsim
INetSim 1.3.2 (2020-05-19) by Matthias Eckert & Thomas Hungenberg
Using log directory:      /var/log/inetsim/
Using data directory:     /var/lib/inetsim/
Using report directory:   /var/log/inetsim/report/
Using configuration file: /etc/inetsim/inetsim.conf
Parsing configuration file.
Warning: Unknown option '/var/log/inetsim/report/report.104162.txt#start_service' in configuration file '/etc/inetsim/inetsim.conf' line 43
Configuration file parsed successfully.
=== INetSim main process started (PID 4859) ===
Session ID:     4859
Listening on:   10.10.134.94
Real Date/Time: 2024-09-22 17:38:22
Fake Date/Time: 2024-09-22 17:38:22 (Delta: 0 seconds)
 Forking services...
  * dns_53_tcp_udp - started (PID 4863)
  * http_80_tcp - failed!
  * https_443_tcp - started (PID 4865)
  * ftps_990_tcp - started (PID 4871)
  * pop3_110_tcp - started (PID 4868)
  * smtp_25_tcp - started (PID 4866)
  * ftp_21_tcp - started (PID 4870)
  * pop3s_995_tcp - started (PID 4869)
  * smtps_465_tcp - started (PID 4867)
 done.
Simulation running.
```

Después de ejecutarlo, asegúrate de que ves la frase "**Simulation Runnin**" abajo e ignora el **the http_80_tcp - failed**. ¡Nuestra red falsa ya está corriendo!

----------------------------------
<h2>AttackBox</h2>
Desde la máquina de la Attackbox, abrimos el navegador y buscamos la IP de nuestra máquina REMnux usando el comando `https://<ip_REMnux>`. Le damos a Avanzado y aceptamos el riesgo y continuamos.

!**Pasted image 20251029185149.png**

Una vez hecho deberíamos ser redirigidos a la página base de INetSim.

!**Pasted image 20251029185217.png**

Un comportamiento usual del malware es descargar otro binario o script. Trataremos de imitar este comportamiento. Podemos hacerlo via CLI o por el navegador aunque usaremos CLI para hacerlo más realista. Usaremos el comando `sudo wget https://<IP_REMnux>/second_payload.zip --no-check-certificate`

```shell
root@10.10.134.94:~# sudo wget https://10.10.134.94/second_payload.zip --no-check-certificate
--2024-09-22 22:18:49--  https://10.10.134.94/second_payload.zip
Connecting to 10.10.134.94:443... connected.
WARNING: cannot verify 10.10.134.94's certificate, issued by \u2018CN=inetsim.org,OU=Internet Simulation services,O=INetSim\u2019:
  Self-signed certificate encountered.
    WARNING: certificate common name \u2018inetsim.org\u2019 doesn't match requested host name \u2018MACHINE_IP\u2019.
HTTP request sent, awaiting response... 200 OK
Length: 258 [text/html]
Saving to: \u2018second_payload.zip\u2019

second_payload.zip  100%[===================>]     258  --.-KB/s    in 0s      

2024-09-22 22:18:49 (14.5 MB/s) - \u2018second_payload.zip\u2019 saved [258/258]
```

También podemos tratar de descargarnos otro script, por ejemplo: `sudo wget https://<IP_REMnux>/second_payload.ps1 --no-check-certificate`.

Para verficar los archivos descargados comprobaremos el fichero de descargas, en nuestro caso root:

!**Pasted image 20251029185608.png**

Todos estos son archivos falsos. Intenta abrir `second_payload.ps1`. Al ser ejecutado, te dirigirá a la página de INetSim.

Lo que hicimos aquí fue imitar comportamiento de malware, donde tratamos de descargar un archivo secundario que puede contener malware desde un servidor .

-------------------------------
<h2>Reporte de Conexión</h2>
Por último vamos de vuelta a REMnux VM y paramos INetSim. Por defecto, crearemos un reporte de las conexiones capturadas. Esto es normalmente guardado en el directorio `/var/log/inetsim/report/`. Deberíamos de ver algo así:

```text
Report written to '/var/log/inetsim/report/report.2594.txt' (14 lines)
=== INetSim main process stopped (PID 2594) ===
```

Podemos leer el archivo usando `sudo cat /var/log/inetsim/report/report.2594.txt`:

```shell
ubuntu@10.10.134.94:~$ sudo cat /var/log/inetsim/report/report.2594.txt
=== Report for session '2594' ===

Real start date            : 2024-09-22 21:04:42
Simulated start date       : 2024-09-22 21:04:42
Time difference on startup : none

2024-09-22 21:04:53  First simulated date in log file
2024-09-22 21:04:53  HTTPS connection, method: GET, URL: https://10.10.134.94/, file name: /var/lib/inetsim/http/fakefiles/sample.html
2024-09-22 21:16:07  HTTPS connection, method: GET, URL: https://10.10.134.94/test.exe, file name: /var/lib/inetsim/http/fakefiles/sample_gui.exe
2024-09-22 21:18:37  HTTPS connection, method: GET, URL: https://10.10.134.94/second_payload.ps1, file name: /var/lib/inetsim/http/fakefiles/sample.html
2024-09-22 21:18:49  HTTPS connection, method: GET, URL: https://10.10.134.94/second_payload.zip, file name: /var/lib/inetsim/http/fakefiles/sample.html
2024-09-22 21:18:49  Last simulated date in log file
===
```

Esto son los logs de cuando la herramienta estaba corriendo. Podemos ver conexiones hechas a una URL, el protocolo y el método usados. También podemos ver el archivo falso que fue descargado.