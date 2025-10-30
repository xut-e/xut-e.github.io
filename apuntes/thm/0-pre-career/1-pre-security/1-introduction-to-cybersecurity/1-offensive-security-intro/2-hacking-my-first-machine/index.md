---
layout: apunte
title: "2. Hacking my first machine"
---

En esta *room* se ha creado una máquina virtual llamada **Fakebank**.

1. ![](/apuntes/img/Pasted image 20250410141122.png)
2. ![](/apuntes/img/Pasted image 20250410142116.png)Con el comando siguiente:
	
```bash
gobuster -u http://fakebank.thm -w Desktop/wordlist.txt dir
```
	1. -u: Indicamos la URL.
	2. -w: Indicamos el diccionario
	3. dir: Le especificamos que busque directorios.

3. ![](/apuntes/img/Pasted image 20250410142253.png)