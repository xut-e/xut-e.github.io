---
layout: apunte
title: "3. A07 - Authentification Failures"
---

Los fallos de autentificación ocurren cuando una aplicación no puede verificar la identidad de un usuario de manera consistente. Problemas comunes incluyen:

- Enumeración de nombres de usuario.
- Contraseñas débiles o adivinables.
- Debilidades en el flujo de registro/login.
- Manejo inseguro de cookies o sesiones.

Si cualquiera de estos están presentes, un atacante puede iniciar sesión como otra persona.

Podemos tratar de meternos en la cuenta `admin`. Sabemos que su nombre de usuario es `admin` por lo que podemos intentar engañar a la aplicación para registrar un usuario con el nombre `aDmiN`.