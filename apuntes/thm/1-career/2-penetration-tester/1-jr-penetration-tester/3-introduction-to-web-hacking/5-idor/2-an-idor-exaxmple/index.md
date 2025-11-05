---
layout: apunte
title: "2. An IDOR Exaxmple"
---

Imagina que te acabas de registrar para un servicio online y ahora quieres cambiar tu información de perfil. El link en el que haces click es `http://online-service.thm/profile?user_id=1305` y puedes ver tu información.

La curiosudad se apodera de ti e intentas cambiar el valor del ID a 100 en su lugara y para tu sorpresa puedes ver la información de otro usuario. Acabas de descubrir una vulnerabilidad IDOR. Idealmente, debería haber una comprobación en la web que confirme que la información desplegada pertenece a tu usuario.