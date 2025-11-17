---
layout: apunte
title: "1. Decoder - Overview"
---

El módulo Decoder de Burp Suite le da al usuario capacidad de manipulación de datos. Como implica su nombre, no sólo decodea datos interceptados durante un ataque sino que también ofrece la función de encodear nuestra propia información, preparándola para la transmisión al objetivo. También nos permite crear hashsums de datos, como ofrecer una funcionalidad de Decodeo Inteligente que intenta decodear la información recursivamente hasta que vuelve a ser texto plano (como la función Magic de Cyberchef).

Para acceder al Decoder, navega a la pestaña Decoder en el menú de arriba y mira las opciones disponibles:

!**Pasted image 20251116182217.png**

Esta interfaz muestra bastantes opciones.

1. Esta caja sirve como espacio de trabajo para introducir o pegar información que requiere encoding o decoding. La información puede ser movida entre módulos con "**Send to Decoder**" si haces click derecho en ella.
2. Arriba de la lista de la derecha, hay una opción para tratar el input como texto o valor hexadecimal.
3. Al movernos hacia abajo en la lista, los menús desplegables se presentan para encodear, decodear, o hashear el input.
4. La funcionalidad de **Smart Decode**, localizada al final, intenta auto-decodear el input.
   !**Pasted image 20251116182626.png**
Al introducir información en el campo input, la interfaz se replica para presentar el output de nuestra operación. Podemos elegir entonces aplicar más transformaciones usando las mismas opciones.

!**Pasted image 20251116182727.png**
