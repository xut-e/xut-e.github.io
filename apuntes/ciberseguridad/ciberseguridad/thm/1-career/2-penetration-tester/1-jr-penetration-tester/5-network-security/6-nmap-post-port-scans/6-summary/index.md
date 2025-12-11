---
layout: apunte
title: "6. Summary"
---

En esta unidad hemos aprendido a detectar servicios, sus versiones y el sistema operativo del objetivo. También hemos aprendido cómo habilitar la traceroute y cómo usar uno o más scripts. Por último hemos visto los formatos en los que podemos guardar los resultados de nmap.

| Opción                      | Significado                                           |
| --------------------------- | ----------------------------------------------------- |
| `-sV`                       | Determina el servicio/versión en el puerto            |
| `-sV --version-light`       | Prueba los escaneos más probables                     |
| `-sV --version-all`         | Prueba todos los escaneos                             |
| `-O`                        | Detecta el Sistema Operativo                          |
| `--traceroute`              | Ejecuta la traceroute al objetivo                     |
| `--script=SCRIPTS`          | Selecciona los scripts a ejecutar                     |
| `-sC` or `--script=default` | Ejecuta scripts por defecto                           |
| `-A`                        | Equivalente a `-sV -O -sC --traceroute`               |
| `-oN`                       | Guarda la salida en formato normal                    |
| `-oG`                       | Guarda la salida en formato grepeable                 |
| `-oX`                       | Guarda la salida en formato XML                       |
| `-oA`                       | Guarda la salida en formato normal, XML and Grepeable |

