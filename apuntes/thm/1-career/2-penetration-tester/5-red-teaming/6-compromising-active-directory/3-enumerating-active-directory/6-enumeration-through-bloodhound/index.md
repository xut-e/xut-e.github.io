---
layout: apunte
title: "6. Enumeration through Bloodhound"
---

Por último, echaremos un vistazzo a realizar enumeración AD con [BloodHound](https://github.com/BloodHoundAD/BloodHound). Bloodhound es la herramienta de enumeración AD más poderosa hasta la fecha.

----------------------------------
<h2>Historia de Bloodhound</h2>
Durante bastante tiempo, los red teamers tuvieron la sartén por el mango. Tanto era así que Microsoft intedró su propia versión de Bloodhound en su solución contra amenazas avanzada.

Bloodhound permitió a los atacantes visualizar el entorno AD en un formato gráfico con nodos interconectados. Cada conexión es un camino posible que podría ser explotado para conseguir un objetivo. En contraste, los defensores usaban listas.

Este pensamiento basado en gráficos, abrió un mundo para los atacantes. Permitió ataques de dos fases. En la primera fase, los atacantes realizarían ataques de phishing para conseguir acceso inicial para enumerar el AD. Este payload inicial solía generar mucho ruido y ser detectado y contenido por el blue team antes de que los atacantes pudieran realizar acciones aparte de exfiltrar la información enumerada. Sin embargo, los atacantes podían usar esta información offline para crear una ruta de ataque en formato gráfico, mostrando precisamente los pasos y saltos requeridos. Usando esta información durante la segunda campaña de phishing, los atacantes podrían normalmente cumplir con su objetivo en minutos una vez conseguida la brecha. Suele incluso ser más rápido de lo que tomaría el blue team en recibir la primera alerta

-----------------------------------------
<h2>Sharphound</h2>
Normalmente oirás a usuarios referirse a Sharphound y Bloodhound como lo mismo. Sin embargo, no lo son. Sharphound es la herramienta de enumeración de Bloodhound. Es usada para enumerar la información AD que puede ser mostrada visualmente después en Bloodhound. Bloodhound es la GUI usada para mostrar los gráficos de ataque AD. Es por esto que necesitamos aprender a cómo usar Sharphound para enumerar el AD antes de poder mirar resultados usando Bloodhound.

Hay tres tipos diferentes de colectoores Sharphound:

- **Sharphound.ps1:** Script de PowerShell para ejecutar Sharphound. Sin embargo, la última actualización de Sharphound ha dejado de liberar la versión de PowerShell del script. Esta versión es buena para usar con RATs ya que el script puede ser cargado directamente en memoria, evadiendo escaneos de AV en disco.
- **Sharphound.exe:** Un ejecutable de Windows para Sharphound.
- **AzureHound.ps1:** Script de PowerShell para ejecutar Sharphound para instancias Azure (Microsoft Cloud Computing Services). Bloodhound puede ingestar información enumerada desde Azure para encontrar rutas de ataque relacionadas a la configuración de la gestión de identidad y acceso de Azure.

>[!IMPORTANT] Las versiones de Bloodhound y Sharphound deben coincidir para los mejores resultados. Esta red fue creada usando `Bloodhound v4.1.0`.

Al usar estos scripts colectores en una evaluación hay una alta probabilidad de que estos archivos sean detectados como malware y disparen una alerta al blue team. Aquí es donde nuestra máquina Windows no unida al dominio puede ayudarnos. Podemos usar `runas` para inyectar credenciales AD y apuntar Sharphound al DC. Como controlamos esta máquina de Windows, podemos o deshabilitar el AV o crear excepciones para archivos o carpetas específicas, lo que ya ha sido realizado en la máquina `THMJMP1`. Puedes encontrar los binarios Sharphound en `C:\Tools\`. Usaremos `SharpHound.exe` para la enumeración.

```powershell
Sharphound.exe --CollectionMethods <Methods> --Domain za.tryhackme.com --ExcludeDCs
```

Los parámetros son:

- `CollectionMethods`: Determina qué tipo de información Sharphound debería recolectar. Las opciones más comunes son `All` o `Default`. Además, como Sharphound cachea información, una vez nuestro primer test termine, podemos usar sólo el método de colección Sesion para recuperar nuevas sesiones de usuario para acelerar el proceso.
- `Domain`: Aquí, especiicamos el dominio que queremos enumerar. En algunas instancias, puedes querer enumerar un padre u otro dominio que tenga confianza con tu dominio existente. Puedes decirle a Sharphound qué dominio debería ser enumerado alterando este parámetro.
- `ExcludeDCs`: Esto le dirá a Sharphound que no toque los controladores de domino, lo que reduce la probabilidad de que Sharphound dispare una alerta.

Puedes encontrar todos los parámetros de Sharphound [aquí](https://bloodhound.readthedocs.io/en/latest/data-collection/sharphound-all-flags.html).

Usando la sesión PowerShell de SSH de la tarea anterior, copia el binario Sharphound al directorio `Documents` del usuario AD.

```powershell
PS C:\> copy C:\Tools\Sharphound.exe ~\Documents\
PS C:\> cd ~\Documents\
PS C:\Users\gordon.stevens\Documents>
```

Ejecutaremos Sharphound usando los métodos de colección All y Session.

```powershell
PS C:\Users\gordon.stevens\Documents\>SharpHound.exe --CollectionMethods All --Domain za.tryhackme.com --ExcludeDCs
2022-03-16T19:11:41.2898508+00:00|INFORMATION|Resolved Collection Methods: Group, LocalAdmin, GPOLocalGroup, Session, LoggedOn, Trusts, ACL, Container, RDP, ObjectProps, DCOM, SPNTargets, PSRemote
2022-03-16T19:11:41.3056683+00:00|INFORMATION|Initializing SharpHound at 7:11 PM on 3/16/2022
2022-03-16T19:11:41.6648113+00:00|INFORMATION|Flags: Group, LocalAdmin, GPOLocalGroup, Session, LoggedOn, Trusts, ACL, Container, RDP, ObjectProps, DCOM, SPNTargets, PSRemote
2022-03-16T19:11:41.8211318+00:00|INFORMATION|Beginning LDAP search for za.tryhackme.com
[....]
2022-03-16T19:12:31.6981568+00:00|INFORMATION|Output channel closed, waiting for output task to complete
Closing writers
2022-03-16T19:12:32.2605943+00:00|INFORMATION|Status: 2163 objects finished (+2163 43.26)/s -- Using 85 MB RAM
2022-03-16T19:12:32.2605943+00:00|INFORMATION|Enumeration finished in 00:00:50.4369344
2022-03-16T19:12:32.5418517+00:00|INFORMATION|SharpHound Enumeration Completed at 7:12 PM on 3/16/2022! Happy Graphing!
```

Tomará alrededor de un minuto para que Sharphpund realice la enumeración. En organizaciones más grandes puede tomar más tiempo, incluso horas. Una vez completado, tendrás un archivo ZIP timestamped en el mismo directorio desde el que ejecutaste Sharphound.

```powershell
PS C:\Users\gordon.stevens\Documents> dir

    Directory: C:\Users\gordon.stevens\Documents

Mode                LastWriteTime         Length Name
----                -------------         ------ ----
-a----        3/16/2022   7:12 PM         121027 20220316191229_BloodHound.zip
-a----        3/16/2022   5:19 PM         906752 SharpHound.exe
-a----        3/16/2022   7:12 PM         360355 YzE4MDdkYjAtYjc2MC00OTYyLTk1YTEtYjI0NjhiZmRiOWY1.bin
```

Puedes usar Bloodhound ahora para ingestarlo.

------------------------------
<h2>Bloodhound</h2>
Como ya hemos mencionado, Bloodhound es la GUI que permite importar información capturada de Sharphound y visualizarlo en rutas de ataque. Bloodhound usa Neo4j  como base de datos de backend y sistema gráfico. Neo4j es un sistema gestor de bases de datos gráfico. Asegúrate de que Bloodhound y neo4j están instalados y configurados. Para cargar Neo4j:

```bash
thm@thm:~# neo4j console start
Active database: graph.db
Directories in use:
  home:         /var/lib/neo4j
  config:       /etc/neo4j
  logs:         /var/log/neo4j
  plugins:      /var/lib/neo4j/plugins
  import:       /var/lib/neo4j/import
  data:         /var/lib/neo4j/data
  certificates: /var/lib/neo4j/certificates
  run:          /var/run/neo4j
Starting Neo4j.
[....]
2022-03-13 19:59:18.014+0000 INFO  Bolt enabled on 127.0.0.1:7687.
```

En otra terminal ejecutamos `bloodhound -no-sandbox`. Esto mostrará la GUI de autentificación.

!**Pasted image 20260808141509.png**

Las credenciales por defecto de la base de datos neo4j serán `neo4j:neo4j`. Usa esto para autentificarte en Bloodhound. Para importar los resultados recupera el ZIP del host Windows. La forma más sencilla es usar el comando SCP:

```bash
scp <AD Username>@THMJMP1.za.tryhackme.com:C:/Users/<AD Username>/Documents/<Sharphound ZIP> .
```

Una vez dada la contraseña esto copiará los resultados a tu directorio actual. Arrastra el archivo ZIP en la GUI de Bloodhound para importarlo. Mostrará que está extrayendo archivos e iniciando la importación.

!**Pasted image 20260808141835.png**

Una vez importados toodos los archivos JSON, podemos comenzar a usar Bloodhound para enumerar rutas de ataque para este dominio en específico.

-----------------------------------------
<h2>Rutas de Ataque</h2>
Hay varias rutas de ataque que Bloodhoun dpuede mostrar. Presionar las tres barras al lado de `Search for a node` mostrará las opciones. La primera pestaña nos muestra información respecto a los imports actuales.

!**Pasted image 20260808142230.png**

Ten en cuenta que si importas una nueva ejecución de Sharphound, se incrementarán estos conteos acumulativamente. Primero miramos la info del nodo. Vamos a buscar la cuenta AD en Bloodhound. Debes hacer click en el nodo para refrescar la vista. También ten en cuanta que puedes cambiar la etiqueta del esquema pulsando el Ctrl izquierdo.

!**Pasted image 20260808143216.png**

Si quieres más informacióon de cada una de estas categorías, puedes presionar el número junto a la query de información. Por ejemplo, vamos a mirar la pertenencia de grupos asociada a nuestra cuenta. Presionamos el número junto a `First Degree Group Membership`:

!**Pasted image 20260808143338.png**

Después, miraremos las queries de análisis. Estas son queries que los creadores de Bloodhound han escrito para enumerar información útil:

!**Pasted image 20260808143534.png**

Bajo la sección de Domain Information, podemos ejecutar la query `Find all Domain Admins`. Ten en cuenta que puedes presionar el Ctrl izquierdo para cambiar los ajustes de muestra de la etiqueta.

!**Pasted image 20260808143637.png**

Los iconos se llaman `nodes`, y las lineas `edges`. Vamos a adentrarnos más en lo que nos muestra Bloodhound. Hay una cuenta de usuario AD con el nombre `T0_TINUS.GREEN`, que es un miembro del grupo `Tier 0 ADMINS`. Pero este grupo está anidado en el grupo `DOMAIN ADMINS`, lo que implica que todos los usuarios parte del grupo `Tier 0 ADMINS` son a efectos prácticos administradores del dominio (DAs).

Además, hay una cuenta AD adicional con el nombre de usuario de `ADMINISTRATOR` que es parte del grup o`DOMAIN ADMINS`. Por lo tanto, hay dos cuentas en nuestra superficie de ataque que probablemente podamos intentar comprometer si queremos ganar privilegios DA. Debido a que la cuenta `ADMINISTRATOR` es una cuenta preinstalada, nos centraríamos en la cuenta de usuario en su lugar.

Cada objeto AD que ha sido discutido en la tarea anterior puede ser un nodo en Bloodhound, y cada uno tendrá un icono diferente dependiendo del tipo que sea. Si queremos formular una ruta de ataque, necesitamos mirar las edges disponibles entre cada posición y privilegios que tenemos y dónde queremos ir. Bloodhound tiene disponibles varios edges que pueden ser accedidos por el filtro de icono:

!**Pasted image 20260808144434.png**

También están siendo constantemente actualizados a la vez que se descubren nuevos vectores de ataque. Veremos cómo explotarlo en un futuro. Sin embargo, vamos a ver la ruta de ataque más sencilla usando sólo los edges default y alguno especial. Ejecutaremos una búsqueda en Bloodhound para enumerar las rutas de ataque. Presionamos el icono de la ruta para permitir su búsqueda.

!**Pasted image 20260808144747.png**

Nuestro nodo incial debería ser nuestro nombre de usuario ADm y nuestro nodo final el grupo `Tier 1 ADMINS` ya que este grupo tiene privilegios administrativos sobre los servidores.

!**Pasted image 20260808144835.png**

Si no hay una ruta de ataque disponible usando los filtros seleccionados, Bloodhound mostrará `No Results Found`. Ten en cienta que esto también puede ocurrir debido a la desincronización de versiones entre Bloodhound y Sharphound. Sin embargo, en nuestro caso, Bloodhound muestra una ruta. Muestra que una de las cuentas de `T1 ADMINS`, rompió el modelo de separación usando sus credenciales para autentificarse en `THMJMP1`, el cual es una estación de trabajo. También muestra que cualquier usuario que es parte del grupo `DOMAIN USERS` incluyendo la cuenta AD tiene la habilidad de hacer RDP al host.

Podríamos hacer algo así:

1. Usar nuestras credenciales AD para hacer RDP a `THMJMP1`.
2. Buscar un vector de escalada en el host que nos daría acceso administrativo.
3. Usar ese acceso administrativo para recopilar las credenciales con herramientas como Mimikatz.
4. Como el Admin T1 tiene una sesión activa en `THMJMP1`, nuestra recogida de credenciales nos devolvería el hash NTLM de la cuenta asociada.

Esto es un ejemplo. Las rutas de ataque pueden ser complejas en circunstancias normales y requerir varias acciones para alcanzar la meta final. Si estás interesado en los exploits asociados a cada edge, puedes visitar la [documentación de Bloodhound](https://bloodhound.readthedocs.io/en/latest/data-analysis/edges.html).

--------------------------------
<h2>Sólo Información de Sesión</h2>
La estuctura AD no cambia a menudo en organizaciones grandes. Puede que haya un par de nuevos empleados, pero la estructura general de las OUs, Grupos, Usuarios y permisos permanecerá igual.

Sin embargo, la única cosa que cambia constantemente son las sesiones activas y eventos LogOn. Como Sharphound crea una snapshot en el tiemmpo de la estructura AD, la información de sesiones activas no siempre es precisa ya que algunos usuarios pueden haber cerrado sus sesiones o nuevos usuarios pueden haber entrado.

>[!CAUTION] La información anterior es esencial.

Un buen acercamiento es ejecutar Sharphound con el método de colección `All` al principio de la evaluación y luego ejecutar Sharphound al menos dos veces al día usando el método `Session`. Esto te dará información de sesiones actualizada y hará que esta sea más rápida ya que no tendrá que escanear la estructura completa de nuevo. El mejor momento para ejecutar este escaneo de sesiones es sobre las 10:00h y de nuevo sobre las 14:00h.

Puedes limpiar información de sesiones haciendo click sobre `Clear Session Information` antes de importar información de nuevas ejecuciones de Sharphound.

--------------------------------------
<h2>Beneficios</h2>
- Ofrece una GUI para la enumeración AD.
- Tiene la habilidad de mostrar rutas de ataque para la información enumerada.
- Ofrece un entendimiento más profundo de los objetos AD que normalmente requieren queries manuales para obtener.

--------------------------------
<h2>Desventajas</h2>
- Requiere la ejecución de Sharphound, lo que puede ser ruidoso y detectable por un AV o soluciones EDR.

