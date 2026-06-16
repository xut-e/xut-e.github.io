---
layout: apunte
title: "7. Using MS Office in Phishing"
---

Normalmente, durante las campañas de phishing, un documento de Microsoft Office (típicamente Word, Excel o PoowerPoint) será incluído como archivo adjunto. Los documentos de Office pueden contener macros. Las macros tienen un uso legítimo pero también pueden ser utilizadas para ejecutar comandos del ordenador que pueden hacer que malware sea instalado en el orenador de la víctima o conectarse a la red del atacante para permitirle tomar el control.

Toma, por ejemplo, el siguiente escenario:

Un miembro del equipo que trabaja para Acme IT Support recibe un email de recursos humanos con un excel llamado `Staff_salaries.xlsx` supuestamente pretendido a ir al email del jefe pero que de alguna manera se confunde y llega a él.

Lo que realmente ha pasado es que el atacante suplantó el email de recursos humanos y diseñó un email tentadoor para intentar que un miembro del staff lo abriese.

Una vez que la persona abre el documento y habilita las macros, el ordenador ha sido comprometido.

