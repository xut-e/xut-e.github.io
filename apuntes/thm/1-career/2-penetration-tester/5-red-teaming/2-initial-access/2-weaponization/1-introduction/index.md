---
layout: apunte
title: "1. Introduction"
---

En esta unidad estaremos aprendiendo diferentes técnicas de armamentización.

!**Pasted image 20260527120252.png**

------------------------------------
<h2>¿Qué es la Armamentización?</h2>
La armamentización es la segunda etapa del modelo Cyber Kill Chain. En esta fase, el atacante genera y desarrolla su propio código malicioso usando payloads como documentos, PDFs, etc. La armamentización intenta usar un arma maliciosa para explotar la máquina y ganar acceso inicial.

La mayoría de organizaciones tienen Windows, lo que lo hace un objetivo común. La política de entorno de una organización suele bloquear descargar y ejecutar archivos `.exe` para evitar violaciones de seguridad. Por eso, los red teamers buscan campañas de phishing, ingeniería social, explotación de navegador o software, USBs o métodos web.

La siguiente gráfica muestra un ejemplo de armamentización, donde un PDF o documento de Microsoft Office personalizado es usado para distribuir un payload. El payload está configurado para conectar de vuelta al C2.

!**Pasted image 20260527120925.png**

Para más información sobre las herramientas red team, visita este [repositorio de GitHub](https://github.com/infosecn1nja/Red-Teaming-Toolkit#Payload%20Development).

La mayoría de organizaciones bloquean o monitorizan la ejecución de archivos `.exe` en su entorno. Por ello esta tarea se centra en técnicas de scripting populares, entre ellas:

- The Windows Script Host (WSH)
- An HTML Application (HTA)
- Visual Basic Applications (VBA)
- PowerShell (PSH)
