---
layout: apunte
title: "2. Getting the Flags"
---

<h2>Reconocimiento Inicial</h2>
Comenzamos escaneando los puertos abiertos.

!**Pasted image 20260706183235.png**

Ahora vamos a escanear dichos puertos más en profundidad.

!**Pasted image 20260706183306.png**

Vamos a ver qué directorios hay en la web.

!**Pasted image 20260706185552.png**

---------------------------------------
<h2>Profundización</h2>
Vamos a ver la página web.

!**Pasted image 20260706185616.png**

Es igual solo que ahora sí nos deja hacer mates, y la notificación ya no está del lado del cliente. Vamos a investigar en BurpSuite.

!**Pasted image 20260706185751.png**

Aparentemente nos falta un `unlocked` por ahí. Vamos a mirar en la propia web. Si cambiamos las preferencias, se manda una petición a otro endpoint `settings`:

!**Pasted image 20260706190118.png**

Aparenta ser contaminación de prototipo. 

-------------------------------
<h2>Explotación</h2>
Vamos a probar.

!**Pasted image 20260706190543.png**
!**Pasted image 20260706190553.png**

Con `__proto__` no funciona, vamos a probar con `constructor`:

!**Pasted image 20260706190820.png**
!**Pasted image 20260706190852.png**

>[!CAUTION] Si te pone "Illegal move" es porque te lo has dejado movido, y tienes que mandar un `/api/reset` antes del `/api/move`.

