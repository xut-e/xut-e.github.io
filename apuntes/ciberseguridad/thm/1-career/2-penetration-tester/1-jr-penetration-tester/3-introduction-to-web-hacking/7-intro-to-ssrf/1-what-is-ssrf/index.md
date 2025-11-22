---
layout: apunte
title: "1. What is SSRF"
---

En esta lección aprenderemos lo que es SSRF, qué tipo de impacto puede tener, veremos ejemplos de ataques SSRF, cómo descubrir vulnerabilidades SSRF, cómo circunvalar reglas de input y un caso práctico para resolver con las nuevas habilidades aprendidas.

----------------------------
<h2>¿Qué es un SSRF?</h2>
SSRF quiere decir Server-Side Request Forgery (Falsificación de Petición del Lado del Servidor). Es una vulnerabilidad que permite a un actor malicioso causar que el servidor web haga un petición HTTP adicional o editada al recurso de elección del atacante.

--------------------------------
<h2>Tipos de SSRF</h2>
Hay dos tipos de SSRF:

- **Regular:** Es cuando la información se devuelve a la pantalla del atacante.
- **Blind:** Es cuando no se devuelve información a la pantalla del atacante, aunque esté la vulnerabilidad.

----------------------------------
<h2>¿Cuál es el Impacto?</h2>
Un ataque SSRF exitoso puede resultar en:

- Acceso a áreas no autorizadas.
- Acceso a información del cliente u organización.
- Habilidad para escalar redes internas.
- Revelar credenciales/tokens de autentificación.

