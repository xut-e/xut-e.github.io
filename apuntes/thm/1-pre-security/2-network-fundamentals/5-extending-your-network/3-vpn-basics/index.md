---
layout: apunte
title: "3. VPN Basics"
---

Una VPN (Virtual Private Network) es una tecnología que permite dispositivos en diferentes redes comunicarse de forma segura creando un camino dedicado entre estos dispositivos (tunnel).

Por ejemplo, sólo los dispositivos dentro de la misma red pueden estar comunicados directamente (dentro de un negocio). De todas formas, una VPN permite que las dos oficinas se conecten:

![](/apuntes/img/004.png)Los dispositivos conectados en la red #3 (VPN) siguen siendo parte de las redes #1 y #2. Algunos de los beneficios de usar VPN:

| **Beneficio**                                                     | **Descripción**                                                                                                                                                                                            |
| ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Permite redes en localzaciones geográficas diferentes conectarse. | Por ejempo, un negocio con múltiples oficinas encontrará de ayuda la VPN pues eso significa que servidores o infraestructura pueden ser usados por otras oficinas.                                         |
| Ofrece privacidad.                                                | La tecnología VPN usa encriptación para proteger la información. Esta encriptación es útil en lugares con wifi pública.                                                                                    |
| Ofrece anonimato.                                                 | Los periodistas y activistas dependen muchas veces de la VPN para poder expresar sus ideas en países con libertad limitada.<br><br>De todas formas si el VPN guarda logs, es básicamente como no usar VPN. |
TryHackMe usa una VPN para conectarse a las máquinas vulnerables sin hacerlas directamente accesibles en internet. Esto significa que:

- Puedes interactuar de manera segura con las máquinas.
- Los proveedores de servicios como ISP's no se piensan que estás atacando una máquina en internet (lo que es ilegal).
- La VPN provee seguridad a TryHackMe ya que las máquinas vulnerables.

Algunas de las tecnologías VPN son:

| **Tecnología VPN** | **Descripción**                                                                                                                                                                                                                                      |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PPP                | Esta tecnología es usada por PPTP para permitir la autentificación y proveer encriptación de la información. Las VPN's usan claves privadas y públicas (como SSH). <br><br>Esta tecnología no es capaz de dejar una red por sí misma (no routeable). |
| PPTP               | Point-to-Point Tunneling Protocol (PPTP) es la tecnología que permite a la información de PPP viajar y dejar la red.<br><br>Es muy fácil de montar pero su encriptación es débil en comparación a otras tecnologías.                                 |
| IPSec              | Internet Protocol Security encripta la información usando el marco de trabajo IP existente.<br><br>Es más difícil de montar pero también tiene considerablemente buena encriptación.                                                                 |
