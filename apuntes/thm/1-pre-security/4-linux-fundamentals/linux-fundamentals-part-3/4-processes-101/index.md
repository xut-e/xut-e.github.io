---
layout: apunte
title: "4. Processes 101"
---

Los procesos son programas que están corriendo en nuestra máquina. Son controlados por el kernel y cada proceso tiene un ID asociado llamado PID (Process ID). Estos son incrementales (el proceso nº 60 tendrá un PID 60).

<h2>Viendo Procesos</h2>
Podemos usar el comando `ps` para ver una lista de los procesos corriendo con información adicional como el código de estado, la sesión que lo corre y el nombre del programa que lo corre.

![](/apuntes/img/025.png)

>[!NOTE] Date cuenta de que en la foto de arriba un proceso tiene el PID 204 y el siguiente 205.

Para ver aquellos procesos que corren otros usuarios o aquellos que no corren desde una sesión, sino desde el sistema, por ejemplo, podemos usar `ps aux`.

![](/apuntes/img/026.png)

Otro comando muy útil es `top`. Este te da información en tiempo real (actualizada cada 10 segundos o cuando nos movemos con las flechas direccionales).

![](/apuntes/img/027.png)

-----------------
<h2>Controlando Procesos</h2>
Podemos mandar señales que terminen procesos. Hay una gran variedad para ello y varían en la "limpieza" con la que lo hacen. Para matar un proceso utilizamos `kill <PID>`. Algunas de las señales que podemos mandar al matar los procesos son:

- SIGTERM: Matamos el proceso pero le permitimos hacer limpieza antes de ello.
- SIGKILL: Matamos el proceso abruptamente.
- SIGSTOP: Paramos o suspendemos el proceso.

----------------
<h2>¿Cómo empiezan los procesos?</h2>
Comenzaremos hablando de los "namespaces". El sistema operativo los usa para dividir los recursos disponible (como CPU, RAM o prioridad).

Estos son geniales para la seguridad pues es una manera de aislar procesos unos de otros. Sólo aquellos que estén en el mismo namespace serán capaces de verse unos a otros.

Previamente hemos hablado de cómo funcionan los PID. El proceso con PID 0 es el proceso que arranca el sistema. Este proceso es el *systemd*.

Cualquier programa o proceso que lancemos será lo que conocemos como un "child" (hijo) del proceso **systemd**. Esto quiere decir que está controlado por systemd y que compartirá los mismos recursos.

![](/apuntes/img/028.png)

--------------------
<h2>Haciendo que los procesos empiecen en el arranque</h2>
Algunas aplicaciones puedes ser arrancadas en el inicio del sistema. Por ejemplo, servidores web, bases de datos o servidores de transferencia.

En el siguiente ejemplo arrancaremos Apache2 de manera manual y luego le estaremos diciendo a Apache2 que arranque al inicio.

El comando `systemctl` nos permite interactuar con el proceso/daemon systemd. Este comando sigue el siguiente formato: `systemctl <opción> <servicio>`.

Para arrancar apache, usaríamos `systemctl start apache2`. Si quisiéramos pararlo sustituiríamos start por stop.

Podemos usar `systemctl` para:

- start
- stop
- enable (hace que empiece en el arranque)
- disable (hace que deje de empezar en el arranque)

--------------------
<h2>Introducción al Primer y Segundo Plano</h2>
Los procesos pueden correr en dos estados: en primer plano (foreground) o en segundo plano (background). Al hacer `echo "Hi THM"` esperamos ver el output inmediatamente pero al añadir `&` se nos da el PID en su lugar.

![](/apuntes/img/029.png)

Esto es útil para comandos como copiar grandes cantidades de archivos, porque mientras se ejecuta en segundo plano podemos seguir haciendo cosas. También podemos usar `Ctrl+Z` para llevar a un proceso al segundo plano.

----------------
<h2>Llevando un proceso al primer plano</h2>
Ahora que hemos visto cómo llevar un proceso al segundo plano, es importante saber cómo traerlo de vuelta. Para ello podemos utilizar `fg` (foreground).