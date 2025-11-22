---
layout: apunte
title: "11. IV. Insecure Design"
---

El diseño inseguro se refiere a las vulnerabilidades que son inherentes a la arquitectura de la aplicación. No son vulnerabilidades por mala implementación o configuración, sino que la idea de la aplicación o parte de ella tiene una debilidad desde el inicio. Algunas, otras veces, están relacionadas con errores de los propios programadores (si por ejemplo uno añade atajos como desactivar a la validación OTP para ahorrar tiempo en el testeo de la app completa) y lo manda a producción sin corregirlo.

---------------
<h2>Reseteos de Contraseña Inseguros</h2>
Un buen ejemplo de este tipo de vulnerabilidades ocurrió en Instagram no hace mucho (2019). Instagram permitía a los usuarios resetear su contraseña si se olvidaban de ella mandándoles un código de 6 dígitos a su móvil vía SMS. La fuerza bruta para romper el código no era válida porque instagram tenía bloqueo de intentos.

Una persona encontró que ese límite sólo limitaba si los intentos venían de la misma máquina. De esta forma el atacante podía orquestar varias IPs y probar 250 intentos por cada una. Para un código de 6 dígitos tienes un total de 1.000.000 de combinaciones (000000-999999), por lo que con tan solo 1.000.000/250 = 4.000 IPs, podías romperla el 100% de las veces.

Fíjate cómo la vulnerabilidad está basada en la idea de que ningún usuario podría usar miles de IPs para hacer peticiones concurrentes. La mejor manera de combatir este tipo de vulnerabilidades es realizar un modelaje de amenazas al inicio.

-------------------
<h2>Challenge</h2>
1. Entramos a la página web proporcionada.
   !**Pasted image 20251010184923.png**
2. Probamos con "joseph", que es la cuenta en la que debemos meternos:
   !**Pasted image 20251010185218.png**
3. No hay tantos colores, así que probaremos con eso:
   !**Pasted image 20251010185346.png**
4. Acertamos con "green":
   !**Pasted image 20251010185419.png**
5. Iniciamos sesión:
   !**Pasted image 20251010185448.png**
6. Dentro encontramos la flag:
   !**Pasted image 20251010185536.png**
   !**Pasted image 20251010185548.png**

