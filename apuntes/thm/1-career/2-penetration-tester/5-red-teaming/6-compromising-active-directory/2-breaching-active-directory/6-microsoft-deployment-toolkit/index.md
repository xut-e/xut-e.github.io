---
layout: apunte
title: "6. Microsoft Deployment Toolkit"
---

Las organizaciones grandes, necesitan herramientas para desplegar y gestionar la infraestructura del estado. En organizaciones masivas, no puedes tener a tu personal de IT usando DVDs o incluso USBs instalando software en cada máquina. Por suerte, Microsoft ofrece las herramientas requeridas para manejar el estado. Sin embargo, podemos explotar malas configuraciones en estas herramientas al igual que en el AD.

--------------------------------
<h2>MDT y SCCM</h2>
El Microsoft Deployment Toolkit (MDT) es un servicio de Microsoft que asiste con la automatización del despliegue de Sistemas Operativos Windows. Las grandes organizaciones usan servicios como MDT para ayudar a desplegar nuevas imágenes en su estado más eficientemente ya que la imagen base puede ser mantenida y actualizada en una localización central.

Normalmente, MDT está integrado con el System Center Configuration Manager de (SCCM) Microsoft, el cual maneja las actualizaciones de las aplicaciones, servicios y sistemas operativos de Microsoft. En esencia, permite al equipo de IT preconfigurar y gestionar imágenes de arranque. Por esto, si necesitan configurar una nueva máquina, sólo necesitan enchufar un cable de red y el resto sucede automáticamente. Pueden hacer varios cambios a las imágenes de arranque, como instalar software por defecto. También pueden asegurarse de mantener actualizaciones.

El SCCM puede ser visto por la mayoría como una expansión de MDT. ¿Qué le ocurre al software después de ser instalado? Bien, SCCM hace este tipo de gestión de parches.Permite al equipo IT revisar las actualizaciones disponibles para todo el software instalado a lo largo del estado. El equipo también puede comprobar estos parques en un entorno de sandbox para asegurar que son estables antes de desplegarlos a todos los equipos unidos al dominio. Hace la vida del equipo de IT significativamente más fácil.

Sin embargo, cualquier cosa que ofrezca gestión central de infraestructura como MDT y SCCM, también puede ser objetivo de atacantes en intentos de tomar control de amplias porciones de funciones críticas en los equipos. Aunque MDT puede ser configurado de varias maneras, para esta tarea nos centraremos exclusivamente en una configuración llamada Preboot Execution Environment (PXE).

--------------------------------------
<h2>PXE Boot</h2>
Las organizaciones grandes, usan PXE boot para permitir a nuevos dispositivos que están conectados a la red, cargar e instalar el sistema operativo directamente sobre la conexión de red. MDT puede ser usado para crear, gestionar y hostear las imágenes PXE boot. El PXE boot normalmente está integrado en DHCP, lo que significa que si DHCP te asigna una IP, el host tiene permitido pedir la imagen PXE boot y comenzar el proceso de instalación por red. EL flujo de comunicación es el siguiente:

!**Pasted image 20260713183955.png**

Una vez que el proceso es realizado, el cliente usará una conexión TFTP para descargar la imagen PXE boot. Podemos explotar la imagen con dos propósitos diferentes:

- Inyectar un vector de escalada, como cuenta administradora para ganar acceso administrativo al sistema operativo una vez PXE se complete.
- Realizar ataques de password scrapping para recuperar credenciales AD durante la instalación.

---------------------------------------------
<h2>Recuperación de Imagen de Arranque PXE</h2>
Como DHCP es un poco tiquismiquis, bypassearemos los pasos iniciales del ataque. Nos saltaremos la parte donde intentamos pedir una IP y los detalles de preconfiguración de PXE boot de DHCP. Realizaremos el resto del ataque manualmente.

La primera pieza de información respecto a la preconfiguración PXE Boot que deberíamos recibir vía DHCP es la IP del servidor MDT. EN nuestro caso, podemos recuperar dicha información del diagrama de red de TryHackMe.

La segunda pieza de información que deberíamos recibir es los nombres de los archivos BCD. Estos archivos almacenan información relevante a PXE Boots para los diferentes tipos de arquitectura. Para recuperar esta información, necesitarás conectarte a : http://pxeboot.za.tryhackme.com. Listará varios archivos BCD:

!**Pasted image 20260713184753.png**

Normalmente usarías un TFTP para pedir cada uno de estos archivos y enumerar la configuración para todos ellos. Sin embargo, por ahorrar tiempo, nos centraremos en el archivo BCD de la arquitectura **x64**. Copia y guarda el nombre completo de este archivo. Para el resto del ejercicio, usaremos el placeholder `x64{7B...B3}.bcd`, ya que los archivos son regenerados por MDT cada día. Cada vez que veas este placeholder, recuerda reemplazarlo con tu archivo BCD específico.

Con esta información inicial ahora cubierta, podemos enumerar y recuperar la imagen PXE Boot. Usaremos nuestra conexión SSH en `THMJMP1` para los siguientes pasos:

```bash
ssh thm@THMJMP1.za.tryhackme.com
```

Contraseña: `Password1@`.

Para asegurar que todos los usuarios de la red pueden usar SSH, comienza creando una carpeta con tu nombre de usuario y copiando el repositorio powerpxe en la carpeta:

```bash
C:\Users\THM>cd Documents
C:\Users\THM\Documents> mkdir <username>
C:\Users\THM\Documents> copy C:\powerpxe <username>\
C:\Users\THM\Documents\> cd <username>
```

El primer paso que tenemos que realizar es usar TFTP y descargar nuestro archivo BCD para leer la configuración del servidor MDT. TFTP es un poco más complicado que FTP ya que no podemos listar archivos. En su lugar, tenemos que mandar una petición de archivo y el servidor se conectará de vuelta a nosotros vía UDP para transferir el archivo. Por lo que necesitamos ser precisos cuando especifiquemos archivos y rutas. Los archivos BCD están siempre localizados en el directorio `/tmp/` del servidor MDT. Podemos iniciar la transferencia TFTP usando los siguientes comandos en nuestra sesión SSH:

```bash
C:\Users\THM\Documents\Am0> tftp -i <THMMDT IP> GET "\Tmp\x64{39...28}.bcd" conf.bcd
Transfer successful: 12288 bytes in 1 second(s), 12288 bytes/s
```

Tendrás que mirar la IP de `THMMDT` con `nslookup thmmdt.za.tryhackme.com`. Con el archivo BCD ahora recuperado, usaremos [powerpxe](https://github.com/wavestone-cdt/powerpxe) para leer su contenido. Powerpxe es un script de PowerShell que automáticamente realiza este tipo de ataques pero con resultados variantes, por lo que es mejor realizar un tipo manual. Usaremos la función `Get-WimFile` de powerpxe para recuperar las localizaciones de las imágenes PXE Boot desde el archivo BCD:

```bash
C:\Users\THM\Documents\Am0> powershell -executionpolicy bypass
Windows PowerShell
Copyright (C) Microsoft Corporation. All rights reserved.   

PS C:\Users\THM\Documents\am0> Import-Module .\PowerPXE.ps1
PS C:\Users\THM\Documents\am0> $BCDFile = "conf.bcd"
PS C:\Users\THM\Documents\am0> Get-WimFile -bcdFile $BCDFile
>> Parse the BCD file: conf.bcd
>>>> Identify wim file : <PXE Boot Image Location>
<PXE Boot Image Location>
```

Los archivos WIM son imágenes booteables en el Windows Imaging Format (WIM). Ahora que tenemos la localización de la imagen PXE Boot, podemos usar de nuevo TFTP para descargar esta imagen:

```bash
PS C:\Users\THM\Documents\am0> tftp -i <THMMDT IP> GET "<PXE Boot Image Location>" pxeboot.wim
Transfer successful: 341899611 bytes in 218 second(s), 1568346 bytes/s
```

Esta descarga puede tomar un rato ya que estás descargando una imagen de Windows completamente booteable y configurada.

-----------------------------------------
<h2>Recuperar Credenciales de la Imagen de Arranque PXE</h2>
Ahora que hemos recuperado la PXE Boot Image, podemos exfiltrar credenciales. Deberías tener en cuenta que hay varios ataques que podemos preparar. Podríamos inyectar un administrador local, para tener acceso administrativo tan pronto como la imagen arranque, podríamos instalar la imagen para tener una máquina unida al dominio... Si estás interesado en leer sobre estos ataques puede mirar este [artículo](https://www.riskinsight-wavestone.com/en/2020/01/taking-over-windows-workstations-pxe-laps/). Este ejercicio se centra en un simple ataque de extracción de credenciales.

De nuevo, usaremos powerpxe para recuperar las credenciales, pero podrías hacer esto también manualmente extrayendo la imagen y mirando el archivo `bootstrap.ini`, donde se suelen guardar las credenciales.

```bash
PS C:\Users\THM\Documents\am0> Get-FindCredentials -WimFile pxeboot.wim
>> Open pxeboot.wim
>>>> Finding Bootstrap.ini
>>>> >>>> DeployRoot = \\THMMDT\MTDBuildLab$
>>>> >>>> UserID = <account>
>>>> >>>> UserDomain = ZA
>>>> >>>> UserPassword = <password>
```

