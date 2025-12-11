---
layout: apunte
title: "4. HTTP Status Codes"
---

<h2>Códigos de estado HTTP</h2>
En la lección anterior ([3. HTTP Methods](/apuntes/ciberseguridad/ciberseguridad/thm/0-pre-career/1-pre-security/3-how-the-web-works/2-http-in-detail/3-http-methods/)) hemos visto que la primera línea de la respuesta contiene un código que le indica al cliente el estado de la petición. Estos códigos pueden descomponerse en 5 secciones:

| Rango                              | Descripción                                                                                                                           |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **100-199 - Information Response** | Sirven para decirle al cliente que la primera parte de su petición ha sido procesada correctamente y que necesitan seguir enviándola. |
| **200-299 - Success**              | Usado para indicarle al cliente que su petición fue exitosa.                                                                          |
| **300-399 - Redirection**          | Estos son usados para redirigir al cliente a otro recurso.                                                                            |
| **400-499 - Client Errors**        | Informa al cliente de que hubo un error durante su petición.                                                                          |
| **500-599 - Server Errors**        | Reservado a los errores del lado del servidor.                                                                                        |

----------------------
<h2>Códigos de estado HTTP comunes</h2>
Hay muchos códigos de estado HTTP, y eso sin incluir que las páginas pueden crear los suyos propios. Algunos de los más comunes son:

| Respuesta                        | Descripción                                                                                                   |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **200 - OK**                     | Completado exitosamente.                                                                                      |
| **201 - Created**                | Un nuevo recurso ha sido creado (usuario o blogpost).                                                         |
| **301 - Moved Permanently**      | Redirige al buscador del cliente a una nueva página o le dice que ha sido movida y que mire allí en su lugar. |
| **302 - Found**                  | Igual que el de arriba pero es temporal.                                                                      |
| **400 - Bad Request**            | Le dice al buscador que algo fue mal o faltaba algo en la petición                                            |
| **401 - Not Authorised**         | Te resalta que no estás autorizado a para ver este recurso.                                                   |
| **403 - Forbidden**              | No tienes permiso apra ver esto ya estés loggeado o no.                                                       |
| **405 - Method Not Allowed**     | El recurso no admite ese método (le mandas un GET a un recurso de creación de usuarios).                      |
| **404 - Page Not Found**         | La página tal cuel fue escrita no se ha encontrado.                                                           |
| **500 - Internal Service Error** | El servidor se ha encontrado con un problema en tu petición y no sabe cómo manejarla.                         |
| **503 - Service Unavailable**    | El servidor no puede procesar tu solicitud por estar saturado o cerrado por mantenimiento.                    |
