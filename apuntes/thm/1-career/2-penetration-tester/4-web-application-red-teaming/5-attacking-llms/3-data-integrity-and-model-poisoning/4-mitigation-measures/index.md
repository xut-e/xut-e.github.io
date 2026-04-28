---
layout: apunte
title: "4. Mitigation Measures"
---

Ahora exploraremos las técnicas de mitigación para la contaminación de modelo desde ambas perspectivas: la de red teamer/pentester y la de desarrollador. Mirar en ambos sitios ayuda a entender cómo ocurren los ataques y cómo reforzar las defensas antes del despliegue.

---------------------------------------
<h2>Perspectiva Red Teamer/Pentester</h2>
- **Proveniencia del Rastro:** Mapea y verifica el origen de toda la información de entrenamiento, pesos de modelo, adaptadores y librerías de terceros.
- **Auditorías de Dependencia:** Usa herramientas para escanear pipelines ML en busca de paquetes o artefactos desactualizados, no mantenidos o sospechosos como [OWASP Dependency-Check](https://owasp.org/www-project-dependency-check/).
- **Comprobación de Comportamiento:** Ejecuta tests comparativos en modelos externos o adaptadores contra guías limpias.
- **Fuzzing e Inyección:** Introduce información maliciosa en los pipelines de entrenamiento para ver cómo reacciona el sistema.

---------------------------------------
<h2>Perspectiva de Programador/Desarrollador</h2>
- **Comprobaciones de Integridad:** Antes de la integración o despliegue, comprueba hashes/firmas.
- **Fuentes Confiables Sólo:** Usa únicamente pesos, librerías y conjuntos de datos de repositorios confiables con builds replicables y licencias claras.
- **Control de Acceso y Aislamiento:** Restringe quién puede modificar la información de entrenamiento, pipelines o vectores y comprueba modelos externos en sandboxes.

