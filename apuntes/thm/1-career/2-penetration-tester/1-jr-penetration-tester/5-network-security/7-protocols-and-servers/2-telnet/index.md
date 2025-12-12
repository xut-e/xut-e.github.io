---
layout: apunte
title: "2. Telnet"
---

El protocolo Telnet es un protocolo de nivel de aplicación usado para conectarse a una máquina virtual u otra máquina.

Un servidor de Telnet usa este protocolo para escuchar conexiones entrantes en el puerto 23. Consideremos el ejemplo de abajo. Un usuario se está conectando a `telnetd`, un servidor Telnet. Los pasos son los siguientes:

1. Primero se le pide que introduzca su nombre de usuario. Él escribe `frank`.
2. Luego, se le pregunta por la contraseña, `D2xc9CgD`. La contraseña no se muestra en la pantalla.
3. Una vez que el sistema verifica sus credenciales es recibido con un mensaje de bienvenida.
4. El servidor remoto le ofrece una command prompt, `frank@bento:4~$`. El `$` indica que no es root.

```shell
pentester@TryHackMe$ telnet 10.80.185.10
Trying 10.80.185.10...
Connected to 10.80.185.10.
Escape character is '^]'.
Ubuntu 20.04.3 LTS
bento login: frank
Password: 
Welcome to Ubuntu 20.04.3 LTS (GNU/Linux 5.4.0-84-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

  System information as of Fri 01 Oct 2021 12:24:56 PM UTC

  System load:  0.05              Processes:              243
  Usage of /:   45.7% of 6.53GB   Users logged in:        1
  Memory usage: 15%               IPv4 address for ens33: 10.80.185.10
  Swap usage:   0%

 * Super-optimized for small spaces - read how we shrank the memory
   footprint of MicroK8s to make it the smallest full K8s around.

   https://ubuntu.com/blog/microk8s-memory-optimisation

0 updates can be applied immediately.


*** System restart required ***
Last login: Fri Oct  1 12:17:25 UTC 2021 from meiyo on pts/3
You have mail.
frank@bento:~$
```

Aunque Telnet nos dio acceso al sistema remoto, no es un protocolo confiable para administración remota ya que toda la información se manda en texto plano. En la imagen de abajo hemos capturado el tráfico de inicio de sesión. El texto en rojo es lo que nosotros mandamos y el azul lo que Telnet nos mandó de vuelta. Fíjate que el nombre aparece con caracteres repetidos. Eso es porque cuando nosotros escribimos `f`, en la pantalla aparece `f`. Esto es porque nosotros no escribimos en la pantalla sino en el servidor, y es este el que lo manda de vuelta para que lo veamos reflejado en la pantalla. Sin embargo, la contraseña no.

!**Pasted image 20251121102626.png**

>[!TIP] La alternaticva segura a Telnet es SSH.

