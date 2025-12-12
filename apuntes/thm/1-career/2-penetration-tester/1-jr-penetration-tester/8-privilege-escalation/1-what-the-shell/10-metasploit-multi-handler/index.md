---
layout: apunte
title: "10. Metasploit multi-handler"
---

Multi/handler es una herramienta genial para capturar reverse shells. Es esencial si quieres usar las shells de Meterpreter y es la opción más confiable al usar payloads staged.

Por suerte es relativamente fácil de usar:

1. Abre Metasploit con `msfconsole`.
2. Escribe `use exploit/multi/handler` y presiona enter.

Se mostrará una sesión de multi/handler empezada. Veamos las opciones disponibles usando `options`:

!**Pasted image 20251125122426.png**

Hay tres opciones que necesitamos configurar: payload, LHOST y LPORT. Para hacer esto usamos respectivamente:

- `set PAYLOAD <payload>`
- `set LHOST <ip_escucha>`
- `set LPORT <puerto_escucha>`

Ahora estamos listos para arrancar el listener. Para hacerlo usaremos `exploit -j`.

!**Pasted image 20251125122649.png**

Esto le dice a Metasploit que lo lance como un trabajo (**j**ob) en segundo plano.

>[!CAUTION] Para poder escuchar en un puerto menor que el 1024 (como pasaba con netcat), Metasploit debe correr con permisos de administrador.

Cuando ejecutamos el payload generado en la tarea anterior, Metasploit recibe la conexión, mandando un recordatorio del payload y dándonos una recerse shell.

!**Pasted image 20251125122921.png**

Como el multi/handler estaba en segundo plano, necesitamos traerlo al primer plano usando `sessions 1`. Si hubiera más sesiones activas, tendríamos qu emirar cuál es con `sessions` y seleccionar el número correcto en lugar de `1`.