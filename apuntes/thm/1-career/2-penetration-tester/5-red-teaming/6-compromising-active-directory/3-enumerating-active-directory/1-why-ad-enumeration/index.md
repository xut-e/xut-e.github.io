---
layout: apunte
title: "1. Why AD Enumeration"
---

Ahora que tenemos nuestro primer par de credenciales AD válidas, podemos explorar diferentes métodos que podemos usar para enumerar un AD.

-------------------------------
<h2>Enumeración AD</h2>
Una vez que tenemos el primer conjunto de credenciales AD y los medios para autentificarnos con ellas en la red, un nuevo mundo de posibilidades se abre. Podemos comenzar enumerando varios detalles sobre el setup y estructura del AD con acceso autentificado, incluso acceso muy privilegiado.

Durante un engagement de red team, esto normalmente nos llevará a ser capaces de realizar algún tipo de escalada de privilegios o movimiento lateral para ganar acceso adicional hasta que tengamos suficientes privilegios para llegar a nuestros objetivos. En la mayoría de casos, la enumeración y la explotación están muy relacionadas. Una vez se explota el camino de ataque mostrado en la fase de enumeración, se realiza de nuevo una enumeración desde la posición privilegiada.

!**Pasted image 20260722193956.png**

--------------------------------
<h2>Objetivos de Aprendizaje</h2>
En esta red, cubriremos varios métodos que pueden ser usados para enumerar AD. Esto no implica una lista completa de métodos disponibles. Sin embargo cubriremos las técnicas:

- Los snap-ins de AD de la consola de administración de Microsoft.
- Los comandos de red del prompt de comandos.
- Los cmdlets AD-RSAT de PowerShell.
- Bloodhound.

