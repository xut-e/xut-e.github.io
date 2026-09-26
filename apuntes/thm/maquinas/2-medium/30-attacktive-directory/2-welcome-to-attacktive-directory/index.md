---
layout: apunte
title: "2. Welcome to Attacktive Directory"
---

<h2>Enumeración</h2>

La enumeración básica comienza con un escaneo mediante Nmap. Nmap es una herramienta relativamente compleja que se ha perfeccionado a lo largo de los años para detectar qué puertos están abiertos en un dispositivo, qué servicios se están ejecutando e incluso identificar el sistema operativo en uso. Cabe señalar que es posible que no todos los servicios se detecten correctamente ni se enumeren con el máximo detalle. A pesar de ser una herramienta muy completa, Nmap no puede enumerarlo todo; por ello, tras el escaneo inicial, utilizaremos otras herramientas para ayudarnos a enumerar los servicios que se ejecutan en el dispositivo.

--------------------------------
1. ¿Qué herramienta nos permitirá enumerar los puertos 139/445?

Comenzamos escaneando los puertos abiertos.

!**Pasted image 20260925130432.png**

Y ahora analizamos dichos puertos.

!**Pasted image 20260925130604.png**

Vamos a usar la herramienta `enum4linux`.

!**Pasted image 20260925130739.png**
!**Pasted image 20260925130807.png**
!**Pasted image 20260925130829.png**

2. ¿Cuál es el NetBIOS-Domain Name de la máquina?

Podemos ver que es `THM-AD`.

3. ¿Qué TLD inválido usa comúnmente la gente para el Active Directory Domain?

Podemos ver que es `.local`.

