---
layout: apunte
title: "4. Snort Usage"
---

Durante la instalación de Snort, debes dar tu interfaz de red y rango. Puedes usarlo para capturar tráfico sólamente, pero si quieres usar Snort para capturar y detectar intrusiones en toda tu red, debes activar el modo promiscuo en la interfaz de red de tu host.

Snort tiene pre-instaladas algunos archivos de reglas, un archivo de configuración y otros archivos. Estos son guardados en `/etc/snort`. El archivo clave para Snort es el archivo de configuración `snort.conf`. Las reglas se guardan en el fichero `rules`. Si usamos `ls` para listar todos los archivos y ficheros en el directorio de Snort:

```shell
ubuntu@tryhackme:~$ ls /etc/snort
classification.config  reference.config  snort.debian.conf
community-sid-msg.map  rules             threshold.conf
gen-msg.map            snort.conf        unicode.map
```

-----------------------------
<h2>Formato de las Reglas</h2>
Veamos ahora cómo se crean las reglas en Snort. Hay una manera muy específica de escribir reglas. Esta es una regla de ejemplo que detecta paquetes ICMP viniente de cualquier dirección y puerto y alcanzando la red local en cualquier puerto. Una vez se detecta ese tráfico se lanza una alerta de "Ping Detected".

![](/apuntes/img/Pasted image 20251025114149.png)

- **Action:** Especifica qué acción tomar cuando la regla se dispara.
- **Protocol:** Se refiere al protocolo que coincide con la regla.
- **Source IP:** Determina la IP de la que proviene el tráfico.
- **Source Port:** Determina el puerto desde el que sale el tráfico.
- **Destination IP:** Especifica la dirección IP de destino. En este ejemplo hemos usado `$HOME_NET` que es una variable que hemos definido en el archivo de configuración de Snort.
- **Destination Port:** Determina el puerto de destino.
- **Rule metadata:** Cada regla tiene ciertos metadatos que se definen al final de la regla entre paréntesis. Sus componentes son:
	- **Message (msg):** Describe el mensaje mostrado cuando la regla se dispara.
	- **Signature ID (sid):** Cada regla tiene un identificador único. Lo configuramos nosotros, por lo que debemos llevar un recuento.
	- **Rule revision (rev):** Configura el número de revisión de la regla. Cada vez que la regla sea modificada, el número de revisión incrementa, lo que ayuda a llevar un control de cuándo se cambia.

------------------------------
<h2>Creación de Reglas</h2>
Copiaremos la regla anterior (`alert icmp any any -> 127.0.0.1 any (msg:"Loopback Ping Detected"; sid:10003; rev:1;)`) en el archivo `/etc/snort/rules/local.rules`.

----------------------------
<h2>Comprobación de Reglas</h2>
Primero, arrancaremos la herramienta Snort para detectar cualquier intrusión. Para esto tenemos que ejecutar el siguiente comando:

`ubuntu@tryhackme:~$ sudo snort -q -l /var/log/snort -i lo -A console -c /etc/snort/snort.conf`

>[!CAUTION] Reemplaza `lo` por el nombre que tenga tu interfaz de `loopback`.

Como esta regla está diseñada para evitar los pings en nuestra interfaz loopback, trataremos de hacernos ping en `127.0.0.1`.

```shell
ubuntu@tryhackme:~$ ping 127.0.0.1
```

Lo de abajo muestra la alerta de "Loopback Ping Detected" cuando pingueamos nuestra interfaz loopback. Esto significa que nuestra regla está funcionando como debe.

```shell
ubuntu@tryhackme:~$ sudo snort -q -l /var/log/snort -i lo -A console -c /etc/snort/snort.conf
07/24-10:46:52.401504  [**] [1:1000001:1] Loopback Ping Detected [**] [Priority: 0] {ICMP} 127.0.0.1 -> 127.0.0.1
07/24-10:46:53.406552  [**] [1:1000001:1] Loopback Ping Detected [**] [Priority: 0] {ICMP} 127.0.0.1 -> 127.0.0.1
07/24-10:46:54.410544  [**] [1:1000001:1] Loopback Ping Detected [**] [Priority: 0] {ICMP} 127.0.0.1 -> 127.0.0.1
```

---------------------------------
<h2>Corriendo Snort en Archivos PCAP</h2>
A veces necesitaremos investigar un archivo de registro de tráfico de red. Para realizar este tipo de escaneo con Snort, podemos usar:

```shell
ubuntu@tryhackme:~$ sudo snort -q -l /var/log/snort -r Task.pcap -A console -c /etc/snort/snort.conf
```
