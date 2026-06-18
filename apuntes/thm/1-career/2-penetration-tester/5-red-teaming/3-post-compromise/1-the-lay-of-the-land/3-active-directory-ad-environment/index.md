---
layout: apunte
title: "3. Active Directory (AD) Environment"
---

El directorio activo es un servicio de Windows basado en directorios que almacena y ofrece objetos de información a la red interna. El AD contiene información esencial sobre la red y el entorno, incluyendo usuarios, ordenadores, impresoras, etc. Por ejemplo, AD puede tener los detalles de los usuarios, como el título del trabajo, número de teléfono, dirección, contraseñas, grupos, permisos, etc.

!**Pasted image 20260617212318.png**

El diagrama muestra un posible ejemplo de cómo el directorio activo puede ser diseñado. El controlador AD es puesto en una subred de servidores (mostrado arriba como servidor de red), y luego, los clientes AD están en redes de trabajo separadas donde pueden unirse al dominio y usar los servicios del AD vía firewall.

La siguiente es una lista de los componentes del Directorio Activo que necesitas conocer:

- Domain Controllers
- Organizational Units
- AD Objects
- AD Domains
- Forest
- AD Service Accounts (usuarios locales preinstalados, usuarios de dominio, cuentas controladas de servicio)
- Domain Administrators

Un **controlador de dominio** es un servidor Windows que ofrece servicios de directorio activo y controla el dominio entreo. Es una forma de centralizar la gestión de usuarios que ofrece encriptación de la información del usuario así como acceso de control a la red, incluyendo usuarios, grupos, políticas y ordenadores. También asegura acceso a recursos y comparticiones. Hay todo tipo de razones por las que los atacantes querrían apuntar al controlador de dominio en un dominio, porque contiene mucha información valiosa.

!**Pasted image 20260617212901.png**

Las **unidades organizaztivas** son contenedores en el domiino AD con estructura jerárquica.

Los **objetos de directorio activo** pueden ser de un sólo usuario o de grupos, o un componente de hardware (como ordenador o impresora). Cada dominio contiene una base de datos que alberga información de objetos que crea un entorno AD, incluyendo:

- **Usuarios:** Un principio de seguridad que tiene permitido autentificar máquinas en el dominio.
- **Ordenadores:** Un tipo especial de cuenta de usuario.
- **GPOs:** Colección de políticas que se aplican a los objetos del AD.

Los **dominios AD** son una colección de componentes de Microsoft en una red AD.

El **bosque AD** es una colección de dominios que confían unos en otros.

!**Pasted image 20260617213954.png**

Una vez conseguido el acceso inicial, encontrar el entorno de directorio activo en una red corporativa es significativo ya que este ofrece un motón de información.

