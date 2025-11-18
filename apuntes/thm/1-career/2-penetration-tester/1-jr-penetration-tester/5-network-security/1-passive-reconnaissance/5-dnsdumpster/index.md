---
layout: apunte
title: "5. DNSDumpster"
---

Las heramientas de consulta de DNS, como lookup y dig, no pueden encontrar subdominios por sí mismas. El dominio que estás inseccionando puede incluir un subdominio diferente que puede revelar mucha información. La pregunta entonces es, ¿cómo podemos encontrar esos subdominios?

Podemos considerar usar múltiples motores de búsqueda para compilar una lista de subdominios públicos. Un sólo motor de búsqueda no será suficiente. Además, deberíamos esperar tener que buscar entre decenas de resultados antes de encontrar algo interesante. Otro acercamiento para conseguir el mismo propósito sería mediante fuerza bruta con herramientas que ya vimos como gobuster o ffuf.

Para evitar una búsqueda que consuma tanto tiempo, uno puede usar un servicio online que ofrezca respuestas detalladas a queries DNS, como [DNSDumpster](https://dnsdumpster.com/). Esta herramienta nos devolverá la información DNS recolectada en tablas fáciles de leer.

Vamos a buscar `tryhackme.com` en DNSDumpster para ver cómo funciona.

Entre los resultados, tenemos una lista de servidores DNS para el dominio buscado. También resolvió los nombres de dominio a direcciones IP y trató de geolocalizarlos. También podemos ver los registros MX con sus respectivas IPs. Por último podemos ver los registros txt.

!**Pasted image 20251117141617.png**

DNSDumpster también representa la información recolectada gráficamente. DNSDumpster muestra la información de la tabla como un gráfico.

!**Pasted image 20251117141728.png**

Hay una funcionalidad en beta que permite exportar el gráfico. Luego puedes manipularlo y mover bloques.

!**Pasted image 20251117141814.png**
