---
layout: apunte
title: "5. Privilege Escalation"
---

Por último vamos a escalar los privilegios.

1. Número CVE para la escalada.

Parece que podemos ejecutar algún comando con `sudo`.

!**Pasted image 20260312181502.png**

Si buscamos en Google por `sudo ALL !root` nos sale esto:

!**Pasted image 20260312181728.png**

Si leemos el número de CVE:

!**Pasted image 20260312181830.png**

2. ¿Cuál es la flag de root?

Vamos a buscarlo en GTFOBins.

!**Pasted image 20260312181541.png**

No funciona.

!**Pasted image 20260312182037.png**

Vamos a copiar el exploit:

!**Pasted image 20260312182019.png**

Y así somos root. Vamos a leer la flag.

!**Pasted image 20260312182114.png**

3. Extra ¿Cómo se llama el Agente R?

Está al final del archivo `root.txt`.

