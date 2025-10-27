---
layout: apunte
title: "2. Other Components"
---

<h2>Load Balancers</h2>
Cuando el tráfico de una página web empieza a volverse demasiado alto o está corriendo una plicación que necesita alta disponibilidad, puede que un solo servidor web ya no sirva. Los balanceadores de carga (load balancers) tienen dos características principales:

1. Asegurar que las páginas con mucho tráfico pueden soportar la carga.
2. Ofrecer una alternativa si un servidor se cae.

Cuando haces una petición a una página con un load balancer, este recibirá tu petición y la redirigirá a uno de los servidores que tiene detrás. Tiene diferentes algoritmos para elegir a donde mandarlo:

- Round-Robin: Se lo manda a cada servidor por turnos.
- Weighted: Comprueba cuántas peticiones tiene cada servidor y lo manda al menos ocupado.

Los load balancers también realizan comprobaciones periódicas (health check) con cada servidor para asegurar que todo vaya bien. Si alguno no responde adecuadamente, dejará de enviar información hasta que vuelva a hacerlo.

------------------------
<h2>CDN (Content Delivery Networks)</h2>
Puede ser un recurso excelente para reducir el tráfico de un servidor saturado. Permite hostear archivos estáticos como JS, CSS, imágenes o vídeos en miles de servidores diferentes alrededor del mundo. Cuando un usuario hace una petición de alguno de ellos, se busca el camino más corto (físicamente) y se pide de ahí en vez de, potencialmente, la otra punta del mundo.

-------------------
<h2>Databases</h2>
Por lo general, las páginas web necesitan una forma de almacenar información para sus usuarios. Los servidores web pueden comunicarse con las bases de datos para almacenar y/o acceder. Estas pueden variar desde archivos en texto plano hasta grupos complejos de múltiples servidores ofreciendo rapidez y resiliencia. Algunas de las más comunes que encontrarás son: MySQL, MSSQL, MongoDB, Postgres, etc. Cada una tiene sus cualidades específicas.

-------------------
<h2>WAF (Web Application Firewall)</h2>
Un WAF está entre tu petición y el servidor web. Su propósito principal es proteger el servidor de ataque como el DoS (Denial of Service). Analiza las peticiones en busca de técnicas de ataque comunes o si la petición viene de un servidor real o de un bot. También utiliza rate limiting para controlar las peticiones excesivas desde una IP, permitiendo sólo unas cuantas desde una misma IP. Si una petición se interpreta como posible ataque se dropeará y nunca será enviada al servidor.