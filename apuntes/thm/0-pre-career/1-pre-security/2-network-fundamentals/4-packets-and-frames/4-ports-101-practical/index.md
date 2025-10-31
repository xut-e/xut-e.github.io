---
layout: apunte
title: "4. Ports 101 (Practical)"
---

Los puertos son puntos esenciales en los cuales la información se intercambia. Poniento un símil marítimo, aquellos barcos que quieren atracar en un puerto, deben hacerlo en un espacio compatible con sus cualidades.

En informática los puertos se representan con números desde el 0 hasta el 65535. Al haber tantos, si no lleváramos una cuenta sería un caos. Es por ello que existen ciertos estándares básicos de comunicación (como HTTP) destinados en puertos fijos a lo largo de todos los ordenadores del mundo. Por eso todos los sesrvidores web mandan la informaciión al puerto 80.

Todos los puertos entre el 0 y el 1024 se conocen como puertos comunes. Algunos de los más conocidos son:

| **Protocolo**                                                      | **Número de puerto** | **Descripción**                                                                                          |
| ------------------------------------------------------------------ | -------------------- | -------------------------------------------------------------------------------------------------------- |
| **F**ile **T**ransfer **P**rotocol (**FTP**)                       | 21                   | Se usa para compartir archivos y/o descargarlos                                                          |
| **S**ecure **Sh**ell (**SSH**)                                     | 22                   | Se usa para conectarse de forma remota a un equipo.                                                      |
| **H**yper**T**ext Transfer Protocol (**HTTP**)                     | 80                   | Este protocolo hace funcionar la WWW. El buscador usa esto para descargar imágenes y videos de las webs. |
| **H**yper**T**ext **T**ransfer **P**rotocol **S**ecure (**HTTPS**) | 443                  | Hace lo mismo que la de arriba pero de forma segura con encriptación.                                    |
| **S**erver **M**essage **B**lock (**SMB**)                         | 445                  | Es similar a FTP pero a parte de archivos permite tambien compartir dispositivos, como impresoras.       |
| **R**emote **D**esktop **P**rotocol (**RDP**)                      | 3389                 | Sirve para conectarse remotamente a un equipo, pero con interfaz gráfica.                                |
[Lista de los 1024 puertos](http://www.vmaxx.net/techinfo/ports.htm)

Puedes cambiar los puertos para tus servivios (por ejemplo correr un servicio wed en el puerto 8000) pero los servidores asumirán que está en el 80 por defecto, por lo que tendrás que añadir dos puntos `:` para añadir el puerto `<dirección_ip>:<puerto>`.

----------------------------------
<h2>Práctica</h2>

1. !**000.png**
2. !**001.png**