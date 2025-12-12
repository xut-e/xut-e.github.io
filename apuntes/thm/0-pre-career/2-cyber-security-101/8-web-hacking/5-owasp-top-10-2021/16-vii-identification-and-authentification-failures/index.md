---
layout: apunte
title: "16. VII. Identification and Authentification Failures"
---

La autentificación y manejo de sesiones constituye los componentes core de las aplicaciones web modernas. La autentificación permite a los usuarios ganar acceso a la apps verificando su identidad. La forma más común es usando un usuario y contraseña. El usuario las provee y el servidor verifica. Si es correcto, le da entonces al usuario una cookie de sesión. Tener una cookie de sesión hace que el servidor sepa quién está emitiendo las peticiones, por lo que es imprescindible.

Si un atacante consigue encontrar fallos en el mecanismo de autentificación, puede ganar acceso a cuentas fuera de su dominio. Algunos de estos fallos incluyen:

- **Ataques de fuerza bruta:** Si una aplicación web usa nombres de usuario y contraseñas, un atacante puede tratar de lanzar un ataque de fuerza bruta que le permita adivinar tanto uno como otro.
- **Uso de credenciales débiles:** Las aplicaciones web deberían de tener políticas fuertes de configuración de contraseñas. Si se permite que la contraseña sea, por ejemplo, "password1" es mucho más fácil para un atacante adivinarla.
- **Cookies de sesión débiles:** Las cookies de sesión son la manera que el servidor tiene de saber quién es alguien. Si esa cookie contiene valores predecibles los atacantes pueden configurar sus propias cookies y acceder a cuentas de usuarios.

Puede haber varias formas de mitigación para mecanismos de autentificación rotos dependiendo del contexto:

- Para evitar los ataques de adivinar contraseñas, asegúrate de que la aplicación requiere una contraseña fuerte.
- Para evitar los ataques de fuerza bruta, asegúrate de que la aplicación fuerce un bloqueo después de cierto número de intentos fallidos.
- Implementa factor de doble autentificación. Si un usuario tiene múltiples métodos de autentificación, como por ejemplo usuario y contraseña y un código en su móvil, es más difícil para el atacante ganar acceso.