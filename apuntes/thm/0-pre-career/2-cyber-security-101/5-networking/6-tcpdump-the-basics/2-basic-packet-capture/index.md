---
layout: apunte
title: "2. Basic Packet Capture"
---

Puedes ejecutar `tcpdump` sin dar parámetros, sin embargo, esto sólo es útil para comprobar que está instalado.

--------------
<h2>Especificar la Interfaz de Red</h2>
Lo primero que debemos decidir es qué interfaz de red escuchar usando `-i <interface>`. Podemos elegir usar todas con `-i any`.

---------------------
<h2>Guardar los Paquetes Capturados</h2>
En muchos casos, querremos acceder a los paquetes con posterioridad. Esto puede hacerse usando `-w <file>`. La extensión más común es `.pcap`. No verás los paquete en la pantalla al usar esta opción. Algo a tener en cuenta para guardar los paquetes es que deberemos ser `root` o ejecutar el comando con `sudo`.

-------------
<h2>Leer Paquetes Capturados de un Archivo</h2>
Podemos leer los paquetes con tcpdump usando `-r <file>`. Es muy útil para aprender sobre el comportamiento de protocolos. Puedes capturar el tráfico de red durante un tiempo para un protocolo determinado.

--------------------
<h2>Limitar el número de Paquetes Capturados</h2>
Puedes especificar el número de paquetes capturados especificando la cuenta con `-c <count>`. Sin especificar, la captura continuará hasta ser interrumpida por ejemplo con `Ctrl + C`.

--------------------
<h2>No Resolver Direcciones IP y Números de Puertos</h2>
Tcpdump resolverá direcciones IP y mostrará nombres de dominio donde sea posible. Para evitar esto se puede usar el argumento `-n`. Si además no quieres que el puerto 80 sea interpretado como http, puedes usar `-nn` para evitar la resolución de ambos.

------------------
<h2>Producir (más) Verbose</h2>
Si quieres mostrar más detalles sobre los paquetes puedes usar `-v` para producir un poquito más de verbose. Los argumentos `-vv` y `-vvv` producirán más verbose incremental.

-------------
<h2>Resumen y Ejemplos</h2>

| Comando                | Explicación                                                             |
| ---------------------- | ----------------------------------------------------------------------- |
| `tcpdump -i INTERFACE` | Captura paquetes de una interfaz de red determinada (`any` para todas). |
| `tcpdump -w FILE`      | Escribe los paquetes capturados en un archivo.                          |
| `tcpdump -r FILE`      | Lee los paquetes capturados desde un archivo.                           |
| `tcpdump -c COUNT`     | Captura un número específico de paquetes.                               |
| `tcpdump -n`           | No resuelve direcciones IP.                                             |
| `tcpdump -nn`          | No resuelve direcciones IP ni puertos.                                  |
| `tcpdump -v`           | Muestra más detalles (`-vv` y `-vvv` muestran todavía más).             |

- `tcpdump -i eth0 -c 50 -v`: Captura y muestra 50 paquetes escuchando `eth0` y los muestra con un poco más de información.
- `tcpdump -i wlo1 -w data.pcap`: Captura paquetes hasta ser interrumpido con `Ctrl + C` escuchando en `wlo1` y los guarda en el archivo `data.pcap`.
- `tcpdump -i any -nn`: Captura paquetes hasta que sea parado de todas las interfaces de red disponibles y elimina la resolución de direcciones IP y puertos.