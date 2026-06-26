---
layout: apunte
title: "2. Purpose"
---

Cuando ganas una shell en un sistema objetivo, sueles tener conocimiento básico del sistema. Si es un servidor, también sabes qué servicio has explotado. Sin embargo, no necesariamente sabes otros detalles, como nombres de usuario o comparticiones de red. Consecuentemente, la shell se verá como una habitación a oscuras, donde tienes conocimiento vago o incompleto de lo que te rodea. En este sentido, la enumeración te ayuda a construir una imagen más completa y precisa.

El propósito detrás de la enumeración de la post explotación es recopilar cuanta más información posible sobre el sistema y su red. El sistema explotado puede ser un portátil o PC de la compañía o un servidor. Intentamos recolectar la información que nos permitiría pivotar hacia otros sistemas en la red o saquear el sistema actual. Alguna de la información que nos interesa recopilar se encuentra:

- Usuarios y grupos.
- Nombres de host.
- Tablas de enrutamiento.
- Comparticiones de red.
- Servicios de red.
- Aplicaciones y banners.
- Configuraciones de firewall.
- Configuraciones de servicios y auditorías.
- Detalles SNMP y DNS.
- Cazar credenciales.

No hay forma de listarlo todo. Por ejemplo, puede que encontremos claves SSH que nos den acceso a otros sistemas. En la autentificación SSH basada en claves, generamos un par de claves SSH. Consecuentemente, el servidor sólo confía en un sistema que pueda probar ser reconocido o relacionado por la clave privada.

Además, puede que nos encontremos con información sensible guardada en los documentos o escritorio de un usuario. Piensa que alguien puede guardar un archivo `passwords.txt` o `passwords.xlsx` en lugar de usar un gestor. El código fuente también puede filtrar contraseñas.