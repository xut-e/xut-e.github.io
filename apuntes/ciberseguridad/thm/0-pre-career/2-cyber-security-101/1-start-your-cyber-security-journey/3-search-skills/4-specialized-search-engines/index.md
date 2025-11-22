---
layout: apunte
title: "4. Specialized Search Engines"
---

Estamos familiarizados con los buscadores de Internet pero no tanto con los buscadores especializados. Estos sirven para obtener cierto tipo de resultados.

-------------
<h2>Shodan</h2>
Es un buscador para dispositivos conectados a Internet. Te permite buscar por tipos específicos y versiones de servidores, sistemas de control industrial y dispositivos IoT. Para ver aquellos servidores que sigan usando una versión de un servicio concreto podemos buscar, por ejemplo, `apache 2.4.1`.

En este [enlace](https://www.shodan.io/search/examples) hay ejemplos de queries para el buscador, y [aquí](https://www.shodan.io/) el buscador.

-----------------
<h2>Censys</h2>
A primera vista [censys](https://search.censys.io/) parece igual que shodan. Sin embargo, mientras shodan se centra en dispositivos y sistemas conectados a Internet, censys lo hace en hosts, páginas web, certificados y otros activos conectados a Internet.

---------------
<h2>VirusTotal</h2>
[VirusTotal](https://www.virustotal.com/gui/home/upload) es un buscador online que ofrece un servicio de escaneo de virus en archivos usando múltiples motores de búsqueda. Permite subir archivos o insertar URL's para comprobar su integridad.

--------------------
<h2>Have I Been Pwned</h2>
[Have I been Pwned](https://haveibeenpwned.com/) hace sólo una cosa: comprobar si un email introducido ha aparecido en brechas de seguridad. Aunque normalmente estas contraseñas no están en texto claro, la mayoría no son tan difíciles y se pueden rescatar.