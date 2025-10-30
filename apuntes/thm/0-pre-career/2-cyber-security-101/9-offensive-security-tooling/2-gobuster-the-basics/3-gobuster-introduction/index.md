---
layout: apunte
title: "3. Gobuster - Introduction"
---

Gobuster es un software de código abierto escrito en Golang. Enumera directorios, subdominios DNS, hosts virtuales, buckets Amazon S3, y Almacenamiento de Google Cloud por fuerza bruta, usando diccionarios específicos y manejando las respuestas entrantes. Muchos profesionales la usan para pruebas de penetración, bug bounty, etc. Mirando las fases del hackeo ético la podemos colocar en la fase de escaneo y reconocimiento.

Estudiaremos algunos conceptos antes de meternos de lleno con Gobuster.

<h4>Enumeración</h4>
La enumeración es el acto de escuchar los recursos disponibles, ya sean accesibles o no. Por ejemplo, Gobuster enumera directorios web.

<h4>Fuerza Bruta</h4>
La fuerza bruta es el acto de intentar cada combinación posible hasta dar con una coincidencia. Gobuster usa listas de palabras (diccionarios) para este propósito.

---------------------------
<h2>Gobuster: Vista por Encima</h2>
Gobuster viene incluido por defecto en distros como Kali Linux. Veamos primero la página de ayuda:

```shell
root@tryhackme:~# gobuster --help 
Usage:   
	gobuster [command]  
Available Commands:   
	completion  Generate the autocompletion script for the specified shell   
	dir         Uses directory/file enumeration mode   
	dns         Uses DNS subdomain enumeration mode   
	fuzz        Uses fuzzing mode. Replaces the keyword FUZZ in the URL, Headers and the request body   
	gcs         Uses gcs bucket enumeration mode   
	help        Help about any command   
	s3          Uses aws bucket enumeration mode   
	tftp        Uses TFTP enumeration mode   
	version     shows the current version   
	vhost       Uses VHOST enumeration mode (you most probably want to use the IP address as the URL parameter)  
	
Flags:       
	--debug                 Enable debug output       
	--delay duration        Time each thread waits between requests (e.g. 1500ms)   
	-h, --help                  help for gobuster       
	--no-color              Disable color output       
	--no-error              Don't display errors   -z, --no-progress           Don't display progress   
	-o, --output string         Output file to write results to (defaults to stdout)   
	-p, --pattern string        File containing replacement patterns   
	-q, --quiet                 Don`t print the banner and other `noise   
	-t, --threads int           Number of concurrent threads (default 10)   
	-v, --verbose               Verbose output (errors)   
	-w, --wordlist string       Path to the wordlist. Set to - to use STDIN.     
		--wordlist-offset int   Resume from a given position in the wordlist (defaults to 0)  
Use "gobuster [command] --help" for more information about a command.
```

Esta página contiene múltiples secciones:

- **Usage:** Muestra la sintaxis de cómo usar el comando.
- **Available Commands:** Hay múltiples comandos disponibles para ayudarnos a enumerar directorios, archivos, subdominios, buckets de almacenamiento en nube y amazon AWS S3. A lo largo de esta unidad veremos `dir`, `dns` y `vhost`.
- **Flags:** Son opciones específicas que podemos configurar para personalizar nuestros comandos. Veamos las flags que más usaremos a lo largo de la unidad:

| Flag corta | Flag larga   | Descripción                                                                                                                                                                       |
| ---------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-t`       | `--threads`  | Configura el número de hilos usados por el escáner.Cada uno de estos manda peticiones con un pequeño retardo. El número por defecto es 10.                                        |
| `-w`       | `--wordlist` | Configura un diccionario para iterar.                                                                                                                                             |
|            | `--delay`    | Define la cantidad de tiempo que esperar entre cada petición. Algunos servidores incluyen mecanismos para detectar la enumeración por la cantidad de peticiones en cierto tiempo. |
|            | `--debug`    | Nos ayuda a diagnosticar errores cuando nuestro comando lanza errores inesperados.                                                                                                |
| `-o`       | `--output`   | Guarda los resultados de la enumeración en el archivo especificado.                                                                                                               |

-------------------------------
<h2>Ejemplo</h2>
Miremos un ejemplo de cómo podríamos usar estos comandos y flags juntos para enumerar directorios web.

`gobuster dir -u "http://www.example.thm/" -w /usr/share/wordlists/dirb/small.txt -t 64`

- `gobuster dir`: Le dice a Gobuster que queremos enumerar directorios.
- `-u "http://www.example.thm/"`: Le dice a Gobuster que la URL objetivo es http://www.example.thm/
- `-w /usr/share/wordlists/dirb/small.txt`: Le dice a Gobuster que use el diccionario `small.txt` situado en el directrio `/usr/share/wordlists/dirb` de nuestra máquina. Usará cada entrada del diccionario para mandar una petición web a esa URL.
- `-t 64`: Configura el número de hilos a utilizar en 64.