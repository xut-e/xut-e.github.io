---
layout: apunte
title: "4. Inspector"
---

El Inspector es una funcionalidad complementaria para la vista de peticiones y respuestas. También se usa para obtener un desglose organizado visualmente de las peticiones y respuestas, así como para experimentar para ver cómo los cambios hechos usando el Inspector de alto nivel afectan a las respectivas versiones raw.

El inspector puede utilizarse en los módulos proxy y repetidor. En ambos está situado a la derecha de la ventana, presentando una lista de componentes de petición y respuesta.

!**Pasted image 20251114181114.png**

Entre estos componentes, las secciones pertenecientes a la petición pueden ser modificadas activando la adición, edición y eliminación de ítems. Por ejemplo en la sección de **Request Attributes**, podemos alterar elementos relacionados con la localización, método y protocolo de la petición. Esto incluye modificar el recurso a recuperar, cambiar el método de `GET` a otro o cambiar entre protocolos de HTTP/1 a HTTP/2, por ejemplo.

!**Pasted image 20251114181519.png**

Otras secciones disponibles para ver o editar incluyen:

1. **Request Query Parameters:** Estos se refieren a la información mandada a través de la URL en forma de parámetros, como `https://admin.tryhackme.com/?redirect=false`. El parámetro query es **redirect**.
2. **Request Body Parameters:** Similar a los parámetros query, pero específico de las peticiones POST. Cualquier información mandada como parte de una petición POST será mostrada en esta sección, permitiéndonos modificar los parámetros antes de mandarlos.
3. **Request Cookies:** Esta sección contiene una lista modificable de cookies mandadas con cada petición.
4. **Request Headers:** Nos permite ver, acceder y modificar (incluyendo añadir o eliminar) cualquier header mandado con las peticiones. Editar estos headers puede ser valioso cuando examinamos cómo responde in servidor web a headers inesperados.
5. **Response Headers:** Esta sección muestra los headers devueltos por el servidor en respuesta a nuestra petición. No puede ser modificado, ya que no tenemos control sobre los headers mandados por el servidor.

Mientras que la representación textual de estos componentes puede encontrarse en las vistas de petición y respuesta, el formato tabular del Inspector nos ofrece una manera conveniente de visualizar e interactuar con ellos.