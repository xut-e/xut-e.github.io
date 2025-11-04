---
layout: apunte
title: "2. Exploring the Website"
---

Tu rol, como pentester, es revisar una página o aplicación web para descubrir sus cualidades que potencialmente podrían ser vulnerables e intentar explotarlas para evaluar si lo son o no. Estas partes suelen ser partes de interacción con el usuario.

Para encontrar esas partes interactivas basta con navegar la página y buscarlas como en formularios login o cajas de búsqueda.

Una revisión de esto para la página de Soporte IT de Acme, la página de la máquina, se vería así:

| **Funcionalidad**       | **URL**               | **Resumen**                                                                             |
| ----------------------- | --------------------- | --------------------------------------------------------------------------------------- |
| Home Page               | /                     | Contiene un resumen de lo que Acme IT Support hace con fotos de su compañía y equipo.   |
| Latest News             | /news                 | Contiene una lista de artículos recientemente publicados, cada uno con un ID diferente. |
| News Article            | /news/article?id=1    | Muestra el artículo individual. Algunos parecen estar bloqueados para usuarios premium. |
| Contact Page            | /contact              | Contiene un formulario para que los clientes contacten a la empresa.                    |
| Customers               | /customers            | Redirige a `/customers/login`.                                                          |
| Customer Login          | /customers/login      | Contiene un formulario para iniciar sesión.                                             |
| Customer Signup         | /customers/signup     | Contiene un formulario de registro.                                                     |
| Customer Reset Password | /customers/reset      | Formulario de reseteo de contraseña.                                                    |
| Customer Dashboard      | /customers            | Contiene una lista de los tickets subidos y un botón para crear tickets.                |
| Create Ticket           | /customers/ticket/new | Contiene un formulario para introducir el problema y subir archivos.                    |
| Customer Account        | /customers/account    | Permite a los usuarios cambiar su nombre, correo y contraseña.                          |
| Customer Logout         | /customers/logout     | Cierra la sesión del usuario.                                                           |

