---
layout: apunte
title: "2. Environment and Setup"
---

Para esta unidad, usaremos la máquina virtual Ubuntu 20.04 actuando como servidor. Este servidor hostea múltiples subdominios y hosts virtuales. El servidor también tiene dos sistemas de manejo de contenido (CMS) instalados. Estos son WordPress y Joomla.

Puedes encontrar instrucciones de instalación de Gobuster en su [repositorio oficial](https://github.com/OJ/gobuster). Para poder asegurarnos de que podemos resolver los dominios usados a lo largo de la unidad, debemos cambiar el archivo `/etc/resolv-dnsmasq`:

- Abre una terminal e introduce el comando `sudo vi /etc/resolv-dnsmasq`.
- Inserta `nameserver <IP_de_la_maquina>` en la primera línea.
- Guarda el archivo presionando `Esc` y escribiendo `:wq`.
- Introduce el comando `/etc/init.d/dnsmasq restart`.

El archivo debería verse así:

```shell-session
root@tryhackme:~# cat /etc/resolv-dnsmasq 
nameserver MACHINE_IP
nameserver 169.254.169.253
```

