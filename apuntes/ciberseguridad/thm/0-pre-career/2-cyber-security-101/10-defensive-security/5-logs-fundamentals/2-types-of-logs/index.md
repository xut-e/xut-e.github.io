---
layout: apunte
title: "2. Types of Logs"
---

En la tarea anterior hemos visto varios casos de uso de los logs. Esto es un reto, imagina que tienes que investigar un problema con un sistema a través de logs. Abres el archivo de logs del sistema y te abruma la cantidad de logs que hay.

Aquí esta la solución: Los logs se segregan en diferentes categorías dependiendo del tipo de información  que ofrecen. Así que ahora ya sólo tienes que mirar dentro del archivo log específico para el que el problema se relaciona. Veamos algunos tipos:

| Tipo de Log      | Uso                                                                                                                                      |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| System Logs      | Útiles en la resolución de problemas. Ofrecen información de varias actividades del sistema operativo.                                   |
| Security Logs    | Ayudan a detectar e investigar incidentes. Estos logs ofrecen información sobre actividades relacionadas con la seguridad en el sistema. |
| Application Logs | Los logs de aplicación contienen eventos específicos relacionados con la aplicación.                                                     |
| Audit Logs       | Ofrecen información detallada sobre los cambios del sistema y eventos de usuario.                                                        |
| Network Logs     | Ofrecen información sobre el tráfico entrante y saliente de la red.                                                                      |
| Access Logs      | Ofrecen información detellada sobre el acceso a difrentes recursos.                                                                      |

>[!NOTE] Puede haber muchos más tipos de logs dependiendo en el servicio y en la aplicación que sirve.

Ahora que ya entendemos qué son esstos logs y cómo varios tipos de logs pueden ser útiles en diferentes escenarios, veamos cómo podemos analizar estos logs para extraer la información requerida de ellos. Como hacer el análisis es extremadamente complicado para el ojo humano, contamos con herramientas manuales y automáticas para hacerlo posible.