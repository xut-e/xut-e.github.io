---
layout: apunte
title: "4. Advanced Searching"
---

Ser capaz de usar un motor de búsqueda eficientemente es una habilidad crucial. La siguiente tabla muestra algunos modificadores populares que pueden funcionar con varios motores de búsqueda.

| Símbolo / Sintaxis               | Función                                                     |
| -------------------------------- | ----------------------------------------------------------- |
| `"frase a buscar"`               | Encuentra resultados con la frase exacta en ellos.          |
| `OSINT filetype:pdf`             | Encuentra todos los `PDF` relacionados a un cierto término. |
| `salary site:blog.tryhackme.com` | Limita los resultados de búsqueda a un sitio específico.    |
| `pentest -site:example.com`      | Excluye un sitio específico de los resultados.              |
| `walkthrough intitle:TryHackMe`  | Encuentra páginas con un término específico en el título.   |
| `challenge inurl:tryhackme`      | Encuentra páginas con un término específico en la URL.      |

>[!NOTE] Además de `pdf` hay otros tipos de filetypes a tener en cuenta, como: `doc`, `docx`, `ppt`, `pptx`, `xls` y `xlsx`.

Cada motor de búsqueda puede variar sutilmente el conjunto de reglas o sintaxis. Para aprender sobre sintaxis específica de diferentes motores de búsqueda tendrás que visitar sus páginas de ayuda. Algunos motores como Google, tienen una interfaz web para búsquedas avanzadas: [Google Advanced Search](https://www.google.com/advanced_search). Otras veces, es mejor aprender la sintaxis de memoria, como [Google Refine Web Searches](https://support.google.com/websearch/answer/2466433), [DuckDuckGo Search Syntax](https://help.duckduckgo.com/duckduckgo-help-pages/results/syntax/) y [Bing Advanced Search Options](https://help.bing.microsoft.com/apex/index/18/en-US/10002).

Los motores de búsqueda rastrean la WWW día y noche para indexar nuevas páginas y archivos. A veces, esto puede llevar a indexar información confidencial. Ejemplos son:

- Documentos de uso interno de la compañía.
- Hojas de cálculo confidenciales con nombres de usuario, direcciones de correo e incluso contraseñas.
- Archivos que contienen nombres de usuario.
- Directorios sensibles.
- Número de versión de servicios.
- Mensajes de error.

Combinar búsquedas de Google avanzadas con términos específicos, documentos que contienen información sensible o servidores web vulnerables pueden ser encontrados. Sitios web como [Google Hacking Data Base (GHDB)](https://www.exploit-db.com/google-hacking-database) recolectan dichos términos y los hacen públicos. Echemos un vistazo a algunas de las queries GHDB para ver si nuestro cliente tiene información confidencial expuesta vía motores de búsqueda. GHDB contiene queries bajo las siguientes categorías:

- **Footholds**
  Considera [GHDB-ID: 6364](https://www.exploit-db.com/ghdb/6364) que usa la query `intitle:"idex of" "nginx.log"` para descubrir logs de Nginx que puedan revelar malas configuraciones que pueden ser explotadas.
- **Archivos que Contienen Nombres de Usuarios**
  Por ejemplo [GHDB-ID: 7047](https://www.exploit-db.com/ghdb/7047) usa el término de búsqueda `intitle:"index of" "contacts.txt"` para descubrir archivos que pueden filtrar información jugosa.
- **Directorios Sensibles**
  Por ejemplo, considera [GHDB-ID: 6768](https://www.exploit-db.com/ghdb/6768), el cual usa el término de búsqueda `inurl:/certs/server.key` para encontrar claves RSA privadas expuestas.
- **Detección de Servidores Web**
  Considera [GHDB-ID: 6876](https://www.exploit-db.com/ghdb/6876), el cual detecta información de servidores GlassFish usando la query `intitle:"GlassFish Server - Server Running".
- **Archivos Vulnerables**
  Por ejemplo, podemos intentar localizar archivos PHP usando la query `intitle:"index of" "*.php"`, como se muestra en [GHDB-ID: 7786](https://www.exploit-db.com/ghdb/7786).
- **Servidores Vulnerables**
  Por ejemplo, para descubrir consolas web SolarWinds Orion, [GHDB-ID: 6728](https://www.exploit-db.com/ghdb/6728) usa la query `intext:"user name" intext:"orion core" -solarwinds.com`.
- **Mensajes de Error**
  Mucha información útil puede ser extraída de mensajes de error. Un ejemplo es [GHDB-ID: 5963](https://www.exploit-db.com/ghdb/5963), la cual usa la query `intitle:"index of" errors.log` para encontrar archivos de registro relacionados a errores.

Puede que necesites adaptar estas queries para que cumplan con tus necesidades ya que las queries devuelven resultados de todas las webs que coinciden con el criterio. Para evitar problemas legales es mejor no acceder a archivos fuera del scope de tu acuerdo legal.

Ahora exploraremos dos recursos adicionales que pueden ofrecer información valiosa sin interactuar con nuestro objetivo:

- Redes Sociales.
- Anuncios de Trabajo.

----------------------------------
<h2>Redes Sociales</h2>
Las webs de redes sociales se han vuelto muy populares no sólo para uso personal sino para uso corporativo. Algunas plataformas sociales pueden revelar toneladas de información sobre el objetivo. Esto es especialmente cierto ya que muchos usuarios suelen sobre-compartir detalles sobre ellos mismos y su trabajo. Por nombrar algunos, merece la pena comprobar:

- LinkedIn
- Twitter (ahora X)
- Facebook
- Instagram

Los sitios de redes sociales hacen fácil recolectar nombres de un empleado dado. Además, en ciertos casos, puedes aprender piezas de información que pueden revelar respuestas a preguntas de seguridad o conseguir ideas que incluir en un diccionario personalizado. Los posts de cosas técnicas pueden revelar detalles sobre los sistemas y distribuidores de una compañía. Por ejemplo, un ingeniero de red que ha conseguido una certificación de Juniper puede aludir a la infraestructura de red de Juniper usada por su entorno de trabajo.

----------------------------------
<h2>Anuncios de Trabajo</h2>
Los anuncios de trabajo pueden decirnos mucho sobre una compañía. Además de revelar nombres y direcciones de correo electrónico, los anuncios de trabajo de posiciones técnicas podrían darnos pistas sobre la infraestructura y sistemas de la compañía objetivo. Los anuncios populares pueden variar de un país a otro. Asegúrate de comprobar las listas en los países donde tu cliente cuelga sus anuncios. Además, siempre está bien mirar su web en busca de puestos abiertos y mirar si esto puede filtrar información interesante.

>[!TIP] La [Wayback Machine](https://archive.org/web/) puede ser interesante para recuperar versiones de una de estas páginas de puestos de trabajo del sitio de tu cliente.

