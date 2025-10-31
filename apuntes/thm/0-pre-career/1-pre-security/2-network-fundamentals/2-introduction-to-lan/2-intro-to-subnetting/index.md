---
layout: apunte
title: "2. Intro to Subnetting"
---

La subred es el término que se le da a la división de una red grande en redes más pequeñas. 
Tomaremos un negocio como ejemplo, tenemos diferentes departamentos como:
- Contabilidad.
- Finanzas.
- Recursos humanos.

!**002.png**
Los administradores utilizan las subredes para categorizar y asignar partes específicas de la red a sus respectivas funciones. 
El subnetting se consigue partiendo el número de hosts que caben en la red representado por un número llamado la máscara de subred (32 bits). Debemos acordarnos aquí de lo que vimos en [3. Identifying Devices on a Network](/apuntes/thm/0-pre-career/1-pre-security/2-network-fundamentals/1-what-is-networking/3-identifying-devices-on-a-network/). 

Las subredes usan las direcciones IP de tres formas diferentes:

- Identificar la dirección de red.
- Identificar la dirección del host.
- Identificar la gateway.

| **Tipo**            | **Propósito**                                                                                               | **Explicación**                                                                                                                                          |
| ------------------- | ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Drección de red     | Esta dirección identifica el comienzo de la red actual y se usa para identificar la existencia de la misma. | Por ejemplo, un dispositivo con la IP 192.168.1.100 estará identificado en la red: 192.168.1.0                                                           |
| Dirección de Host   | Esta dirección identifica hosts dentro de la red.                                                           | Un host de la red del ejemplo anterior podría ser: 192.168.1.100                                                                                         |
| Gateway por defecto | Es la dirección reservada al dispositivo que manda la información hasta otra red (switch)                   | Cualquier información que viaje entre redes debe pasar por esta dirección primero. Normalmente la .1 y la .254 (0-255) están reservadas para el gateway. |

En tu red de casa es poco probable que haya más de 254 dispositivos conectados a la vez. De todas formas, si los hubiese, necesitarías otra subred.
Además el subnetting provee:

- Eficiencia.
- Seguridad.
- Control total.

Tomando como ejemplo un café, este tendrá dos subredes:

1. Una para los empleados, cajas registradoras y otros dispositivos del local.
2. Otra para el uso general del público.