---
layout: apunte
title: "4. TTP Mapping"
---

El mapeo TTP es empleado por la célula red para mapear los TTPs recolectados de los adversarios a una cyber kill chain estándar. Mapear TTPs a una kill chain ayuda al red team a planificar un engagement para simular un adversario.

Para comenzar el proceso del mapeo de TTPs, un adversario debe seleccionarse como objetivo. Un adversario puede ser elegido basado en:

1. Industria objetivo.
2. Vectores de ataque empleados.
3. País de origen.
4. Otros factores.

Como ejemplo para esta tarea, hemos decidido usar [APT 39](https://attack.mitre.org/groups/G0087/), un grupo de ciberespionaje dirigido por el ministerio Iraní, conocido por apuntar a un amplio rango de industrias.

Usaremos la cyber kill chain Lockheed Martin como nuestro estándar para mapear los TTPs.

!**Pasted image 20260511164112.png**

El primer framework del que recogeremos TTPs es el [MITRE ATT&CK](https://attack.mitre.org/). Si no estás familiarizado con este, nos ofrece IDs y descripciones de TTPs categorizados.

ATT&CK ofrece un resumen básico de los TTPs recolectados de un grupo. Podemos usar el [Navegador ATT&CK](https://mitre-attack.github.io/attack-navigator/) para ayudarnos a visualizar cada TTP y categorizar su lugar en la kill chain. El navegador visualiza la cadena ATT&CK con los TTPs del adversario subrayados bajo la subsección correspondiente.

Para usar el navegador ve a la página de resumen de grupos, junto a "*Techniques Used*", navega hasta "*ATT&CK Navigation Layers*", del menú desplegable y navega a "*view*". Una capa de navegador debería haberse abierto con los TTPs seleccionados del grupo.

Al movernos por la capa de navegación, podemos asignar varios TTPs que queremos emplear durante el engagement. Debajo está una kill chain compilada con el mapeado de TTPs para APT39.

!**Pasted image 20260511164804.png**

1. Reconocimiento:
	- TTPs no identificados, usan metodología interna.
2. Armamentización:
	- Intérprete de comandos y scripting
		- Python
		- PowerShell
		- VBA
	- Usuario ejecuta adjuntos maliciosos
3. Reparto:
	- Explotar aplicaciones que están de cara al público
	- Spearphishing
4. Explotación:
	- Modificación de registros
	- Tareas programadas
	- Keylogging
	- Dumpeo de credenciales
5. Instalación:
	- Transferencia de herramientas/scripts maliciosos hacia la red vulnerable
	- Uso de proxy
6. Command & Control:
	- Protocolos web (HTTP/HTTPS)
	- DNS
7. Acciones en Objetivos:
	- Exfiltración a través de C2

MITRE ATT&CK hará la mayor parte del trabajo necesario, pero también podemos suplementar la información de threat intelligence con otras plataformas y frameworks. Otro ejemplo de framework TTP es [OST Map](https://github.com/intezer/ost-map).

OST Map ofrece un mapa visual para enlazar múltiples actores de amenaza y sus TTPs.

Otras plataformas de threat intelligence de código abierto pueden ayudar a los red teamers en la emulación de adversarios y mapeo TTP, como:

- Mandiant Advantage
- Ontic
- CrowdStrike Falcon
