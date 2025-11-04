---
layout: apunte
title: "4. Developer Tools - Inspector"
---

<h2>Herramientas de Desarrollador</h2>
Todos los navegadores modernos cuentan con herramientas de desarrollador. Es un kit de ayuda usado por desarrolladores web para depurar aplicaciones web. Como pentester, podemos usar estas herramientas para ganar conocimiento sobre el funcionamiento de la aplicación. Nos centraremos en tres componentes: Inspector, Debugger y Network.

-------------------------------
<h2>Abrir las Herramientas de Desarrollador</h2>
Puedes hacerlo pulsando `F12` o click derecho/menú e inspeccionar elemento/herramientas de desarrollador.

--------------------------------
<h2>Inspector</h2>
El código fuente no siempre representa lo que se ve en la página web porque CSS, JS y la interacción del usuario pueden cambiar el contenido y el estilo de la página.

Además podemos modificar el código para interactuar con las páginas. En la página de `/news` de Acme podemos ver que hay tres artículos. Los dos primeros son legibles pero el tercero está bloqueado:

!**Pasted image 20251103123823.png**

Si inspeccionamos el elemento de la notificación premium, podemos seleccionar opciones del menú y cambiar código por ejemplo cambiando el CSS de `block` a `none`.

!**Pasted image 20251103124138.png**

