---
layout: apunte
title: "7. VPN"
---

Considera una compañía con oficinas en diferentes localizaciones. Estas deben poder conectarse a la rama principal con dispositivos diferentes. La solución más económica es crear una VPN (Virtual Private Network).

Cuando se diseñó Internet, TCP se centraba en repartir paquetes. Si un paquete no era recibido (ACK), TCP tenía incorporados mecanismos para detectarlo y reenviarlo. Pero no tenía mecanismos para asegurarse de que toda la información saliente era protegida y permanecía inalterable. La VPN fue la solución.

Todas las compañías requieren de intercambio privado de información. Los requisitos indispensables son conexión a Internet, un servidor VPN y un cliente.

El diagrama de red de abajo muestra cómo una compañía con dos ramas remotas se conectan a la rama principal. Un cliente VPN se conectará al servidor VPN en la rama principal. En este caso, el cliente VPN encriptará el tráfico y lo pasará a esta por el túnel VPN (azul). El tráfico VPN se limita a las lineas azules, las verdes llevan el tráfico desencriptado.

!**093 1.png**

En el diagrama de abajo vemos cómo dos clientes se conectan a la rama principal usando la VPN:

!**094 1.png**

Una vez que el túnel VPN está establecido, todo el tráfico de Internet será routeado a la conexión VPN. De esta manera, cuando intentamos acceder a un servicio de Internet, no veremos nuestra IP sino la del servidor VPN. Esto se puede utilizar para bypassear ciertas restricciones geográficas, pues si un usuario en España se conecta a una VPN japonesa, para los servidores receptores de sus peticiones web aparecerá como que está en Japón.

De todas formas, la VPN no siempre routea el tráfico, pues puede estar configurada para no hacerlo. Algunos países consideran usar una VPN ilegal y castigable. Comprueba las regulaciones locales antes de hacer nada.