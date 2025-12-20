---
layout: apunte
title: "3. A08 - Software or Data Integrity Failures"
---

De nuevo, los fallos de integridad de la información o del software llevan un largo tiempo en el OWASP Top 10.

-------------------------------------
<h2>¿Qué son los fallos de Integridad del Software o la Información?</h2>
Ocurren cuando una aplicación depende del código, actualizaciones o información que asume que es segura sin verificar su autenticidad, integridad u origen. Esto incluye confiar en actualizaciones de software sin verificar, cargar script o archivos de configuración de fuentes no confiables, fallar al validar la información que impacta la lógica de la aplicación o aceptar información como binarios, plantillas o archivos JSON sin confirmar si han sido o no alterados.

----------------------------------------
<h2>¿Cómo evitar estos fallos?</h2>
Prevenir estos fallos comienza por establecer fronteras de confianza. Las aplicaciones nunca deberían asumir que el código, actualizaciones o piezas clave de información son legítimas y confiadas automáticamente; las integridad debe ser verificada. Esto incluye métodos como checksums para actualizar paquetes y asegurar que sólo fuentes confiables puedan modificar artefactos críticos.

------------------------------------------
<h2>Práctica</h2>
Esta práctica mostrará la deserialización en Python. Navega hasta el puerto `8002` de la IP dada.

1. Vamos a la página dada.
   !**Pasted image 20251219181807.png**
2. Usamos python para generar un payload malicioso en pickle.
   !**Pasted image 20251219182012.png**
   !**Pasted image 20251219182100.png**
3. Lo pegamos y obtenemos la flag.
   !**Pasted image 20251219182128.png**