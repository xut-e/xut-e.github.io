---
layout: apunte
title: "3. Phishing Infrastructure"
---

Una cierta cantidad de infraestructura será necesaria de montar para conseguir realizar una campaña de phishing con éxito.

**Nombre de Dominio:**

Necesitarás registrar un dominio de apariencia auténtica que imite el original.

**Cuenta/Servidor de Email:**

Necesitarás configurar un servidor de email o registrador con un proveedor de email SMTP.

**Registros DNS:**

Configurar registros DNS como SPF, DKIM y DMARC mejorará la entragabilidad de los emails y asegurará que éstos llegan a la bandeja de entrada en lugar de quedarse en la carpeta de spam.

**Servidor Web:**

Necesitarás configurar servidores web o comprar un hosting de un tercero para albergar tus sitios web de phishing. Añadir SSL/TLS a las webs les dará una capa extra de autenticidad.

**Analíticas:**

Cuando una campaña de phishing es parte de un engagement de red team, obtener analíticas es muy importante. Necesitarás algo para llevar registro de emails que has mandado, se han abierto o clickado.

**Automatización y Software Útil**
Algunas de las infraestructuras arriba mencionadas pueden ser automatizadas usando las siguientes herramientas:

- **GoPhish - (Open-Source Phishing Framework) - [getgophish.com](https://getgophish.com/):** GoPhish es un framework basado en web para hacer las campañas de phishing más sencillas. Permite almacenar las configuraciones SMTP para mandar emails, tiene una herramienta web para crear plantillas de email usando el editor WYSIWYG. También puedes programar cuándo los emails se mandan y tener un dashboard de analíticas que muestra cuántos emails se han mandado, abierto o clickado.
- **SET - (Social Engineering Toolkit) - [trustedsec.com](https://www.trustedsec.com/tools/the-social-engineer-toolkit-set/):** El Social Engineering Toolkit contiene una variedad de herramientas, pero algunas de las más importantes son para la habilidad de crear ataques spear-phishing y desplegar versiones falsas de sitios web comunes para engañar a las víctimas.

!**Pasted image 20260615182132.png**

