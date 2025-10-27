---
layout: apunte
title: "7. User Account Control"
---

La gran mayoría de usuarios domésticos están logueados en sus sistemas como administradores locales. Para el uso doméstico no hace falta, por lo general, tener tantos privilegios. Esto incrementa enormemente el riesgo para los usuarios.

Para proteger al usuario local con estos privilegios, Microsoft introdujoi el UAC (User Account Control). Este concepto fue introducido de la mano de Windows Vista (visto en [2. Windows Editions](/apuntes/thm/1-pre-security/5-windows-fundamentals/1-windows-fundamentals-part-1/2-windows-editions/)).

UAC funciona de la siguiente manera. Cuando un usuario con una cuenta de tipo administrador inicia sesión en el sistema, la versión actual no corre con permisos elevados. De tal manera que cuando sea necesario ejecutar altos privilegios, se le pedirá la contraseña al usuario para saber si está de acuerdo con esta acción.