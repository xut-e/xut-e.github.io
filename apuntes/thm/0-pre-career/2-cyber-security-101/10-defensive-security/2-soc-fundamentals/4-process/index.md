---
layout: apunte
title: "4. Process"
---

Ya hemos visto los roles y responsabilidades de diferentes individuos trabajando en un equipo SOC. Cada rol tiene sus propios procesos. Veamos algunos procesos importantes involucrados en un SOC.

-------------------------
<h2>Alert Triage</h2>
Es la base del equipo SOC. La primera respuesta a cualquier alerta es realizar una clasificación de criticidad (triage). Se enfoca en analizar la alerta específica. Determina la severidad de la alerta y nos ayuda a priorizar. Se basa en responder a las 5 Ws: 

!**Pasted image 20251019220532.png**
Un ejemplo:

>[!CAUTION] Alerta: Malware detectado en el Host George PC.

| 5 Ws   | Answers                                                                                                                                                                                                                       |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| What?  | A malicious file was detected on one of the hosts inside the organization’s network.                                                                                                                                          |
| When?  | The file was detected at 13:20 on June 5, 2024.                                                                                                                                                                               |
| Where? | The file was detected in the directory of the host: "GEORGE PC".                                                                                                                                                              |
| Who?   | The file was detected for the user George.                                                                                                                                                                                    |
| Why?   | After the investigation, it was found that the file was downloaded from a pirated software-selling website. The investigation with the user revealed that they downloaded the file as they wanted to use a software for free. |

--------------------------
<h2>Reporting</h2>
Las alertas detectadas dañinas necesitan escalarse a análisis de más alto nivel para una respuesta y solución. Estas alertan se escalan como tickets y se asignan a la gente relevante. El reporte debería incluir las 5 Ws junto con un análisis más profundo y capturas de pantalla como prueba de la actividad.

----------------------------
<h2>Incident Response and Forensics</h2>
A veces, las detecciones reportadas apuntan a actividades maliciosas que son críticas. En estos casos, un equipo de alto nivel que inicia una respuesta. El incidente a veces requiere una investigación forense que intenta averiguar la causa raíz del incidente analizando un sistema o red.

