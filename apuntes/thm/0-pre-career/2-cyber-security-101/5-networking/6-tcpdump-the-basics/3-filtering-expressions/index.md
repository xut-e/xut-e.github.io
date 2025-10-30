---
layout: apunte
title: "3. Filtering Expressions"
---

Aunque puedes ejecutar `tcpdump` sin ninguna expresión de filtrado, esto no será útil. Justo como en un encuentro social, no tratarás de escuchar a todo el mundo a la vez, sino que centrarás tu escucha en una persona o conversación.

-------------------
<h2>Filtrar por Host</h2>
Digamos que sólo estamos interesados en un IP. Podemos limitar los paquetes capturados usando  `host <IP>` o `host <hostname>`.

Si quieres limitar a los paquetes salientes de una dirección en concreto debes usar `src host <IP>` o `src host <hostname>`. De igual manera, puedes limitar a aquellos paquetes que llegan a una dirección concreta usando `dst host <IP>` o `dst host <hostname>.

-------------
<h2>Filtrar por Puerto</h2>
Si quieres capturar todo el tráfico DNS, puedes filtrar la captura al puerto 53, por ejemplo. Para hacerlo usamos `port <puerto>`. Al igual que con el host, podemos aplicar filtrado de dirección (fuente o destino) con `src port <puerto>` y `dst port <puerto>`.

----------------
<h2>Filtrar por Protocolo</h2>
El tipo final de filtrado que cubriremos es filtrar por protocolo. Podemos filtrar a un tipo específico de protocolo como por ejemplo `ip`, `ip6`, `udp`, `tcp` o `icmp`. Si filtramos por `icmp` y vemos un `time exceeded` es probable que se deba a que alguien está usando el comando `traceroute`, mientras que si vemos un `echo` es probable que alguien esté usando el comando `ping`.

Podemos usarlo simplemente escribiendo el protocolo.

-------------
<h2>Operadores Lógicos</h2>
Tres operadores lógicos que pueden ser de ayuda:

- `and`: Captura paquetes donde las dos condiciones se cumplan. Por ejemplo, `tcpdump host 1.1.1.1 and tcp` capturará tráfico TCP con host `1.1.1.1`.
- `or`: Captura paquetes donde una de las dos condiciones se cumpla. Por ejemplo, `tcpdump udp or icmp` capturará tráfico UDP o ICMP.
- `not`: Captura paquetes cuando la condición no es cierta. Por ejemplo, `tcpdump not tcp` capturará todos los paquetes menos los TCP.

---------------
<h2>Resumen y Ejemplos</h2>
Una tabla con las cosas que hemos aprendido:

| Comando                                      | Explicación                                            |
| -------------------------------------------- | ------------------------------------------------------ |
| `tcpdump host IP` or `tcpdump host HOSTNAME` | Filtra paquetes por dirección IP o nombre de host.     |
| `tcpdump src host IP` or                     | Filtra paquetes provenientes de una cierta dirección.  |
| `tcpdump dst host IP`                        | Filtra paquetes destinados a una dirección.            |
| `tcpdump port PORT_NUMBER`                   | Filtra paquetes por número de puerto.                  |
| `tcpdump src port PORT_NUMBER`               | Filtra paquetes provenientes de un puerto determinado. |
| `tcpdump dst port PORT_NUMBER`               | Filtra paquetes destinados a un cierto puerto.         |
| `tcpdump PROTOCOL`                           | Filtra paquetes por protocolo.                         |
Algunos ejemplos:

- `tcpdump -i any tcp port 22`: Escucha en todas las interfaces y captura paquetes `tcp` desde o a el puerto 22 (SSH).
- `tcpdump -i wlo1 udp port 123`: Escucha en la interfaz `wlo1` y captura paquetes `udp` provenientes o dirigidos al puerto 123 (Network Time Protocol, NTP).
- `tcpdump -i eth0 host example.com and tcp port 443 -w hhts.pcap`: Escuchará en `eth0` hasta que sea interrumpido los paquetes relacionados con `example.com` y aquellos que tengan como salida o destino el puerto 443 y los meterá en un archivo llamado `https.pcap`.