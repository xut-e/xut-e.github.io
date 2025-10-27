---
layout: apunte
title: "2. Domain Hierarchy"
---


![](/apuntes/img/008.png)
<h2>Top Level Domain</h2>
Un TLD es la parte de más a la derecha de un dominio. En tryhackme sería *".com"*. Hay dos tipos de TLD:

1. gTLD: Generic TLD.
2. ccTLD: Country Code TLD.

Históricamente, un gTLD pretendía decirle al usuario el uso del sitio, por ejemplo, .org para organizaciones, .gov para páginas del gobierno, .edu para educación... y los ccTLD se usaban con propósitos geográficos.

<h2>Second Level Domain</h2>
Tomando tryhackme.com como ejemplo, el .com es el TLD y tryhackme es el SLD. Al registrar el SLD hay un límite de 63 caracteres y sólo se pueden usar caracteres a-z, 0-9 y guiones (no se puede empezar ni acabar con los guiones o tener dos guiones consecutivos).

<h2>Subdomain</h2>
Un subdominio descansa en la parte izquierda del SLD usando un punto para separarlo, por ejemplo en el nombre admin.tryhackme.com, la parte admin es el subdominio. Tiene las mismas restricciones de creación que un SLD. Puedes usar varios subdominios separados por puntos para crear nombres más largos como jupiter.servers.tryhackme.com. Pero la longitud debe ser menor o igual a 253 caracteres. No hay límite para el número de subdominios que puedes crear para tu dominio.