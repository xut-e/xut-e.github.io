---
layout: apunte
title: "6. Virtual Hosts"
---

Algunos subdominios no siempre se hostean en DNSs públicos. En su lugar, el registro DNS podría guardarlo en un servidor DNS privado en la máquina del desarrollador.

Gracias a que los servidores web pueden hostear diferentes páginas web en un servidor, cuando una web se pide desde un cliente, el servidor sabe qué página mostrar gracias al header del host. Podemos utilizar ese header para hacerle cambios. 

Al igual que coon la fuerza bruta de DNS, podemos automatizar este proceso.

```bash
user@machine$ ffuf -w /usr/share/wordlists/SecLists/Discovery/DNS/namelist.txt -H "Host: FUZZ.acmeitsupport.thm" -u http://MACHINE_IP
```

Como el comando de arriba siempre devolverá un valor, podemos usar el argumento `-fs` para filtrar por tamaño.