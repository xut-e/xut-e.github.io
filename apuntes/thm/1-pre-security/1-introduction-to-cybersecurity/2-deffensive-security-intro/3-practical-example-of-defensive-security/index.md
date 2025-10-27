---
layout: apunte
title: "3. Practical Example of Defensive Security"
---

Escenario:
>*Eres un analista SOC responsable de proteger un banco. El SOC del banco usa una herramienta SIEM (Security Information and Event Management) la cual recolecta información y eventos relacionados con la seguridad de varias fuentes y las presenta en una dashboard.*

 No todas las alertas son maliciosas, queda bajo responsabilidad del analista averiguar cuales son maliciosas. Por ejemplo, alertas por múltiples intentos de inicio de sesión, aunque sospechoso, no siempre es malicioso, pues esto pasa. 
 O puede que haya una IP desconocida  intentando conectarse (sospechoso).

1. !![](/apuntes/img/Pasted image 20250410193612.png)
	1. IP sospechosa: 143.110.250.149
2. ![](/apuntes/img/Pasted image 20250410193838.png)
3. ![](/apuntes/img/Pasted image 20250410193908.png)
	1. Herramientas para comprobar IPs maliciosas:
		1. AbuselPDB
		2. Cisco Talos Intelligence
4. ![](/apuntes/img/Pasted image 20250410194108.png)
5. ![](/apuntes/img/Pasted image 20250410194211.png)
6. THM{THREAT-BLOCKED}

