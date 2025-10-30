---
layout: apunte
title: "5. Linux iptables Firewall"
---

En la tarea anterior hemos visto el firewall integrado de Windows. ¿Qué pasa si eres usuario de Linux? Sigues necesitando control sobre el tráfico de tu red. Linux también ofrece un firewall integrado. Tenemos varias opciones, veamos rápidamente las más usadas.

----------------------------
<h2>Netfilter</h2>
Es un framework dentro de Linux con funcionalidades de firewall, incluyendo filtrado de paquetes, NAT, y registro de conexiones. Sirve como base para varios firewalls disponibles en Linux. Algunos firewalls que utilizan este framework son:

- **iptables:** La utilidad más comúnmente usada en las distribuciones Linux.
- **nftables:** Es un sucesor de `iptables` que resalta el filtrado de paquetes y capabilidades NAT.
- **firewalld:** Esta utilidad también opera en el mismo framework pero funciona diferente a los otros y viene con zonas de red pre-configuradas diferentes.

------------------------
<h2>UFW</h2>
Uncomplicated FireWall elimina las complicaciones de la fabricación de reglas dándoles una interfaz sencilla.

Para comprobar el estado del firewall:

```shell
user@ubuntu:~$ sudo ufw status
Status: inactive
```

Para activarlo:

   ```shell
   user@ubuntu:~$ sudo ufw enable 
   Firewall is active and enabled on system startup`
```

Aquí podemos ver una regla creada. Así cambiamos la política de permisividad por defecto:

```shell
user@ubuntu:~$ sudo ufw default allow outgoing
Default outgoing policy changed to 'allow'
(be sure to update your rules accordingly)
```

Para denegar el tráfico entrante de un puerto:

```shell
user@ubuntu:~$ sudo ufw deny 22/tcp
Rule added
Rule added (v6)
```

Para listar las reglas activas:

   ```shell
   user@ubuntu:~$ sudo ufw status numbered      
   To                         Action      From      
   --                         ------      ---- 
   [ 1] 22/tcp                DENY IN     Anywhere                   
   [ 2] 22/tcp (v6)           DENY IN     Anywhere (v6)
   ```

Para borrar reglas:

```shell
user@ubuntu:~$ sudo ufw delete 2
Deleting:
 deny 22/tcp
Proceed with operation (y|n)? y
Rule deleted (v6)
```

