---
layout: apunte
title: "7. Challenge Web App"
---

Siguiendo todo lo que has aprendido, es hora de intentar descubrir y explotar una race condition sin guía.

Estas son las credenciales que necesitarás:

**Name: Rasser Cond**

- Username: `4621`
- Password: `blueApple`

**Name: Zavodni Stav**

- Username: `6282`
- Password: `whiteHorse`

**Name: Warunki Wyscigu**

- Username: `9317`
- Password: `greenOrange`

¡A por ello!

-----------------------------
<h2>Challenge</h2>
1. Vamos a la página dada.
   !**Pasted image 20251112190549.png**
2. Iniciamos sesión con los tres usuarios para ver qué tiene cada uno:
	1. 4621:
	   !**Pasted image 20251112190710.png**
	2. 6282:
	   !**Pasted image 20251112190754.png**
	3. 9317:
	   !**Pasted image 20251112190828.png**
	   
	   Vemos que todos tienen lo mismo y además se tienen añadidos en transferencias favoritas. Como tenemos que conseguir un balance superior a 1000$ en una cuenta vamos a pasarnos de la primera a la segunda, por ejemplo.
	   
3. Entramos de nuevo en la primera cuenta, pero ahora desde el navegador de Burp Suite y hacemos click en la persona a la que le vamos a enviar el dinero.
   !**Pasted image 20251112191342.png**
4. Cargamos el dinero que queremos mandar y ponemos Burp Suite en intercepción.
   !**Pasted image 20251112202737.png**
5. Vemos que ha sido exitosa.
   !**Pasted image 20251112202756.png**
6. Vamos a probar ahora a mandar una cantidad superior. Para ello modificamos los números y duplicamos las pestañas. Las mandaremos en paralelo.
   !**Pasted image 20251112203113.png**
7. Parece ser que "gunicorn" no está configurado para soportar 20 duplicados. Probaremos con 10.
   !**Pasted image 20251112203715.png**
8. Aún así ha llegado cierta cantidad:
   !**Pasted image 20251112204018.png**
9. Como parece que hay límite, vamos a enviar ahora dinero desde la 2ª a la 3ª cuenta.
   !**Pasted image 20251112204600.png**
10. En el repetidor llevamos a cabo el mismo proceso.
    !**Pasted image 20251112204812.png**
11. Parece que no ha podido manejarlo, como antes, sin embargo:
    !**Pasted image 20251112204841.png**

