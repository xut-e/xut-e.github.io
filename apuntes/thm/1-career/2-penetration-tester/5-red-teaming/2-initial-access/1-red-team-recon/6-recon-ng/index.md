---
layout: apunte
title: "6. Recon-ng"
---

[Recon-ng](https://github.com/lanmaster53/recon-ng) es un framework que ayuda a automatizar el trabajo de OSINT. Usa módulos de varios autores para ofrecer una multitud de funcionalidades. Algunos módulos requieren claves para funcionar; la clave permite al módulo hacer la consulta a la API relacionada online. En esta tarea demostraremos cómo usar Recon-ng en la terminal.

Desde un punto de vista de pentesting, Recon-ng puede ser usada para encontrar varios bits y piezas de información que pueden ayudar en la operación de la tarea de OSINT. Toda la información es recolectada automáticamente guardada en bases de datos relacionadas al espacio de trabajo. Por ejemplo, puede que descubras direcciones de hosts para escanear o recolectar puertos o emails de contacto para posteriores ataques de phishing.

Puedes empezar Recon-ng ejecutando el comando `recon-ng`. Comenzar Recon-ng te dará un prompt como `[recon-ng][default] >`. En esta fase, necesitas seleccionar el módulo instalado que quieres usar. Sin embargo, si esta es la primera vez que ejecutas `recon-ng`, puedes necesitar instalar los módulos que necesitas.

En esta tarea, seguiremos el siguiente flujo:

1. Crear un espacio de trabajo para nuestro proyecto.
2. Insertar la información inicial en la base de datos.
3. Buscar un módulo en el marketplace y aprender sobre él antes de instalarlo.
4. Listar los módulos instalados y cargar uno.
5. Ejecutar el módulo cargado.

-------------------------------------------
<h2>Crear un Espacio de Trabajo</h2>
Ejecuta `workspaces create NOMBRE_DEL_ESPACIO_DE_TRABAJO` para crear un nuevo espacio de trabajo para la investigación.

El comando `recon-ng -w NOMBRE_DEL_ESPACIO_DE_TRABAJO` arranca recon-ng con el espacio de trabajo específico.

----------------------------------------
<h2>Alimentar la Base de Datos</h2>
En el reconocimiento, empiezas con una pieza de información y la transformas en nuevas piezas de información. Por ejemplo, puede que empieces con un nombre de compañía y lo uses para descubrir el nombre del dominio, contactos o perfiles. Entonces usas la nueva información obtenida para transformarla en nueva información y aprender más sobre tu objetivo.

Consideremos el caso donde sabemos en nombre de dominio del objetivo, `thmredteam.com`, y queremos alimentárselo a la base de datos relacionada al espacio de trabajo activo. Si queremos comprobar los nombres en nuestra base de datos, podemos ejecutar `db schema`.

Queremos insertar el nombre de dominio `thmredteam.com` en la tabla de dominios. Podemos hacer esto usando el comando `db insert domains`.

```bash
pentester@TryHackMe$ recon-ng -w thmredteam
[...]
[recon-ng][thmredteam] > db insert domains
domain (TEXT): thmredteam.com
notes (TEXT): 
[*] 1 rows affected.
[recon-ng][thmredteam] > marketplace search
```

------------------------------------------
<h2>Marketplace Recon-ng</h2>
Tenemos un nombre de dominio, por lo que el siguiente paso lógico sería buscar un módulo que transforme dominios en otro tipo de información. Asumiendo que empezamos de una instalación nueva de Recon-ng, buscaremos los módulos que se ajusten a nuestras necesidades en el marketplace.

Antes de instalar módulos, hay algunos comandos útiles que debes conocer:

- `marketplace search PALABRA_CLAVE`: Busca módulos disponibles con la palabra clave.
- `marketplace info MODULO`: Ofrece información sobre el módulo en cuestión.
- `marketplace install MODULO`: Para instalar el módulo específico.
- `marketplace remove MODULO`: Para desinstalar el módulo específico.

Los módulos están agrupados bajo muchas categorías, como descubrimiento, importación, reconocimiento y reporte. Además, el de reconocimiento también está dividido en subcategorías dependiendo del tipo de transformación. Ejecuta el comando `marketplace search` para obtener una lista de todos los módulos disponibles.

En la terminal de abajo buscamos los módulos que contengan `domains-`.

```bash
pentester@TryHackMe$ recon-ng -w thmredteam
[...]
[recon-ng][thmredteam] > marketplace search domains-
[*] Searching module index for 'domains-'...

  +---------------------------------------------------------------------------------------------------+
  |                        Path                        | Version |     Status    |  Updated   | D | K |
  +---------------------------------------------------------------------------------------------------+
  | recon/domains-companies/censys_companies           | 2.0     | not installed | 2021-05-10 | * | * |
  | recon/domains-companies/pen                        | 1.1     | not installed | 2019-10-15 |   |   |
  | recon/domains-companies/whoxy_whois                | 1.1     | not installed | 2020-06-24 |   | * |
  | recon/domains-contacts/hunter_io                   | 1.3     | not installed | 2020-04-14 |   | * |
  | recon/domains-contacts/metacrawler                 | 1.1     | not installed | 2019-06-24 | * |   |
  | recon/domains-contacts/pen                         | 1.1     | not installed | 2019-10-15 |   |   |
  | recon/domains-contacts/pgp_search                  | 1.4     | not installed | 2019-10-16 |   |   |
  | recon/domains-contacts/whois_pocs                  | 1.0     | not installed | 2019-06-24 |   |   |
  | recon/domains-contacts/wikileaker                  | 1.0     | not installed | 2020-04-08 |   |   |
  | recon/domains-credentials/pwnedlist/account_creds  | 1.0     | not installed | 2019-06-24 | * | * |
  | recon/domains-credentials/pwnedlist/api_usage      | 1.0     | not installed | 2019-06-24 |   | * |
  | recon/domains-credentials/pwnedlist/domain_creds   | 1.0     | not installed | 2019-06-24 | * | * |
  | recon/domains-credentials/pwnedlist/domain_ispwned | 1.0     | not installed | 2019-06-24 |   | * |
  | recon/domains-credentials/pwnedlist/leak_lookup    | 1.0     | not installed | 2019-06-24 |   |   |
  | recon/domains-credentials/pwnedlist/leaks_dump     | 1.0     | not installed | 2019-06-24 |   | * |
  | recon/domains-domains/brute_suffix                 | 1.1     | not installed | 2020-05-17 |   |   |
  | recon/domains-hosts/binaryedge                     | 1.2     | not installed | 2020-06-18 |   | * |
  | recon/domains-hosts/bing_domain_api                | 1.0     | not installed | 2019-06-24 |   | * |
  | recon/domains-hosts/bing_domain_web                | 1.1     | not installed | 2019-07-04 |   |   |
  | recon/domains-hosts/brute_hosts                    | 1.0     | not installed | 2019-06-24 |   |   |
  | recon/domains-hosts/builtwith                      | 1.1     | not installed | 2021-08-24 |   | * |
  | recon/domains-hosts/censys_domain                  | 2.0     | not installed | 2021-05-10 | * | * |
  | recon/domains-hosts/certificate_transparency       | 1.2     | not installed | 2019-09-16 |   |   |
  | recon/domains-hosts/google_site_web                | 1.0     | not installed | 2019-06-24 |   |   |
  | recon/domains-hosts/hackertarget                   | 1.1     | not installed | 2020-05-17 |   |   |
  | recon/domains-hosts/mx_spf_ip                      | 1.0     | not installed | 2019-06-24 |   |   |
  | recon/domains-hosts/netcraft                       | 1.1     | not installed | 2020-02-05 |   |   |
  | recon/domains-hosts/shodan_hostname                | 1.1     | not installed | 2020-07-01 | * | * |
  | recon/domains-hosts/spyse_subdomains               | 1.1     | not installed | 2021-08-24 |   | * |
  | recon/domains-hosts/ssl_san                        | 1.0     | not installed | 2019-06-24 |   |   |
  | recon/domains-hosts/threatcrowd                    | 1.0     | not installed | 2019-06-24 |   |   |
  | recon/domains-hosts/threatminer                    | 1.0     | not installed | 2019-06-24 |   |   |
  | recon/domains-vulnerabilities/ghdb                 | 1.1     | not installed | 2019-06-26 |   |   |
  | recon/domains-vulnerabilities/xssed                | 1.1     | not installed | 2020-10-18 |   |   |
  +---------------------------------------------------------------------------------------------------+

  D = Has dependencies. See info for details.
  K = Requires keys. See info for details.

[recon-ng][thmredteam] >
```

Notamos muchas subcategorías bajo `recon`, como `domains-companies`, `domains-contacts`, y `domains-hosts`. Estos nombres nos dicen el nuevo tipo de información que obtendremos con la transformación. Por ejemplo, `domains-hosts` significa que el módulo encontrará hosts relacionados al dominio ofrecido.

Algunos módulos, como `whoxy_whois` requieren una clave, como podemos deducir del `*` bajo la columna `K`. Este requerimiento indica que este módulo no es usable a no ser que tengamos un clave para usar el servicio relacionado.

Otros módulos tienen dependencias, indicado por el `*` debajo de la columna `D`. Las dependencias muestran que librerías de Python de terceros pueden ser necesarias para usar el módulo.

Digamos que estás interesado en `recon/domains-hosts/google_site_web`. Para aprender más sobre cualquier módulo en particular usamos el comando que hemos aprendido antes `info`, por lo que escribimos `marketplace info google_site_web`, el cual nos da la siguiente descripción: "Recolecta hosts de Google.com usando el operador de búsqueda 'site'. Actualiza la tablas 'hosts' con los resultados."

Podemos instalar el módulo con `marketplace install google_site_web`.

----------------------------------------
<h2>Trabajar con Módulos Instalados</h2>
Podemos trabajar con módulos instalados usando:

- `modules search`: Para obtener una lista de módulos instalados.
- `modules load MODULO`: Para cargar un módulo específico en memoria.

Cargaremos el módulo que hemos instalado antes desde el marketplace, `modules load viewdns_reverse_whois`. Para ejecutarlo necesitamos configurar las siguientes opciones requeridas.

- `options list`: Para listar las opciones que podemos configurar para el módulo cargado.
- `options set <option> <value>`: Para configurar el valor de la opción.

En un paso anterior, hemos instalado el módulo `google_site_web`, así que vamos a cargarlo usando `load google_site_web` y ejecutarlo con `run`. Tenemos añadido el dominio`thmredteam.com` a la base de datos, por lo que cuando el módulo se ejecute, leerá ese valor de la base de datos para obtener nueva información y la añadirá a la base de datos.

```bash
pentester@TryHackMe$ recon-ng -w thmredteam
[...]
[recon-ng][thmredteam] > load google_site_web
[recon-ng][thmredteam][google_site_web] > run

--------------
THMREDTEAM.COM
--------------
[*] Searching Google for: site:thmredteam.com
[*] Country: None
[*] Host: cafe.thmredteam.com
[*] Ip_Address: None
[*] Latitude: None
[*] Longitude: None
[*] Notes: None
[*] Region: None
[*] --------------------------------------------------
[*] Country: None
[*] Host: clinic.thmredteam.com
[*] Ip_Address: None
[*] Latitude: None
[*] Longitude: None
[*] Notes: None
[*] Region: None
[*] --------------------------------------------------
[...]
[*] 2 total (2 new) hosts found.
[recon-ng][thmredteam][google_site_web] >
```

Este módulo ha hecho queries a Google y descubierto dos hosts, `cafe.thmredteam.com` y `clinic.thmredteam.com`.

------------------------------------
<h2>Claves</h2>
Algunos módulos pueden no ser usados sin una clave API. El parámetro `K` indica que necesitas proporcionar una clave para usar el módulo en cuestión.

- `key lists`: Lista las claves.
- `keys add KEY_NOMBRE KEY_VALOR`: Para añadir una clave.
- `keys remove KEY_NOMBRE`: Para eliminar una clave.

Una vez que hayas configurado los módulos instalado, puedes proceder a ejecutarlos.

- `modules load MODULO`: Carga el módulo instalado.
- `CTRL + C`: Descarga el módulo.
- `info`: Ofrece información del módulo cargado.
- `options list`: Lista las opciones disponibles para el módulo seleccionado.
- `options set NOMBRE VALOR`: Configura un valor para una opción con un nombre dado.
- `run`: Para ejecutar el módulo cargado.

