---
layout: apunte
title: "6. Sequencer - Overview"
---

El Sequencer nos permite evaluar la entropía, o aleatoriedad, de los tokens. Los tokens son strings usadas para identificar algo y deberían generadas de una manera criptográficamente segura. Estos tokens podrían ser cookies de sesión o tokens CSRF (Cross-Site Request Forgery), usados para proteger formularios de subida. Si no se generan de manera segura, podríamos imaginarnos valores futuros.

Veamos la interfaz del Sequencer.

!**Pasted image 20251116220129.png**

Tenemos dos formas principales de realizar análisis de tokens con el Sequencer:

- **Live Capture:** Este es el método más común y el que viene por defecto. Captura una petición pasante que generará un token para el análisis del Sequencer. El Sequencer realizará miles de peticiones para obtener valores y después las analizará.
- **Manual Load:** Esto nos permite cargar una lista de tokens pregenerados. De esta manera evitamos mandar miles de peticiones lo que puede ser ruidoso y consumir muchos recursos, pero necesitamos tener una larga lista.
