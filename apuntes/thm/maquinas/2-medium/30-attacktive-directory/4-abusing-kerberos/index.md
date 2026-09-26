---
layout: apunte
title: "4. Abusing Kerberos"
---

<h2>Introducción</h2>
Una vez finalizada la enumeración de cuentas de usuario, podemos intentar explotar una funcionalidad de Kerberos mediante un método de ataque denominado ASREPRoasting. El ASREPRoasting se produce cuando una cuenta de usuario tiene configurado el privilegio "No requiere preautentificación" (*Does not require Pre-Authentication*). Esto significa que la cuenta no necesita proporcionar una identificación válida antes de solicitar un ticket Kerberos para dicha cuenta.

-----------------------------
<h2>Obtención de tickets Kerberos</h2

[Impacket](https://github.com/SecureAuthCorp/impacket) incluye una herramienta llamada "GetNPUsers.py" (ubicada en `impacket/examples/GetNPUsers.py`) que nos permite consultar al Centro de Distribución de Claves (KDC) para identificar cuentas vulnerables a ASREPRoasting. Lo único necesario para realizar esta consulta es una lista válida de nombres de usuario, obtenidos previamente mediante la enumeración con Kerbrute.

Recuerda: Es posible que Impacket requiera el uso de una versión de Python igual o superior a la 3.7. En la AttackBox, puedes hacerlo ejecutando el comando de la siguiente manera: `python3.9 /opt/impacket/examples/GetNPUsers.py`.

-----------------------------------
1. Tenemos dos cuentas de usuario de las que potencialmente podríamos obtener un ticket. ¿Desde qué cuenta de usuario puedes pedir un ticket sin contraseña?

!**Pasted image 20260925151311.png**

Parece que desde `svc-admin`.

2. Echando un vistazo a los ejemplos de Hashcat de la página de Wiki, ¿qué tipo de hash obtuvimos del KDC?

!**Pasted image 20260925151419.png**

Parece que Kerberos 5 AS-REP etype 23

3. ¿Que modo es el hash?

El modo es 18200.

4. Ahora crackea el hash con la lista de contraseñas dada, ¿cuál es la contraseña del usuario?

!**Pasted image 20260925151755.png**

