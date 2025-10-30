---
layout: apunte
title: "1. Introduction"
---

Todo el mundo prefiere una interfaz gráfica (GUI) hasta que masteriza una interfaz de linea de comandos (CLI). Esto se puede deber a que es más intuitiva para la mayoría de usuarios.

las CLIs normalmente tiene una curva de aprendizaje, pero cuanto más las uses, más rápido te darás cuenta de que son más eficientes y rápidas. Por ejemplo, ¿cuántos clicks tienes que hacer para encontrar tu IP en una GUI? Con una CLI es un comando.

Hay muchas otras ventajas de usar una CLI:

- Uso reducido de recursos: Requieren menos recursos por lo que pueden funcionar en equipos de hardware limitado o antiguo.
- Automatización: Aunque puedes automatizar tareas en una GUI, crear un script de bash con los comandos que deseas repetir es mucho más sencillo.
- Gestión remota: Una CLI hace muy sencillo el uso de SSH para manejar remotamente un sistema.

--------------------------
<h2>Objetivos de aprendizaje</h2>
El objetivo de esta unidad es enseñar a usar `cmd.exe`, el MS Windows Command Prompt.

- Mostrar información básica.
- Comprobar y arreglar errores de la configuración de red.
- Controlar archivos y ficheros.
- Comprobar los procesos corriendo.

--------------------
<h2>Pre-requisitos</h2>
Para empezar esta lección es necesario haber completado [3. Windows and AD Fundamentals](/apuntes/thm/0-pre-career/2-cyber-security-101/3-windows-and-ad-fundamentals/3-windows-and-ad-fundamentals/).

-------------------
<h2>Establecer una conexión SSH</h2>
Nos conectaremos a la máquina mediante SSH. Para poder hacerlo necesitaremos usar la VPN de la plataforma: `sudo openvpn <ruta_vpn>`. Después, desde la terminal, ejecutaremos el comando: `ssh <usuario>@<direccion_ip>.

Credenciales:

- Usuario: `user`
- Contraseña: `Tryhackme123!`
