---
layout: apunte
title: "2. AS03 - Software Supply Chain Failures"
---

<h2>¿Qué es?</h2>
Los fallos en la cadena de suministro de software ocurren cuando las aplicaciones confían en componentes, librerías, servicios o modelos comprometidos, desactualizados o sin verificación adecuada. Estas debilidades no son inherentes al código, sino a las herramientas y software del que depende.

--------------------------------------
<h2>¿Por qué importa?</h2>
Las aplicaciones modernas están construidas a partir de paquetes, APIs y modelos de IA de terceros. Una dependencia comprometida puede comprometer el sistema completo, permitiendo a los atacantes ganar acceso sin tocar tu código. Además este tipo de ataque puede ser automatizado y distribuido.

-------------------------------------------
<h2>Ejemplo</h2>
En 2021, SolarWinds fue comprometida y esto mostró el peligro de este tipo de ataques. Los atacantes insertaron código malicioso en una actualización confiable, afectando a miles de organizaciones que inmediatamente la instalaron. No fue un bug en la lógica del código, sino una debilidad en el proceso de construcción de actualizaciones, verificación y distribución.

------------------------------------
<h2>Patrones Comunes</h2>
- Usar librerías o dependencias sin verificar o no mantenidas.
- Instalar automáticamente actualizaciones sin verificación.
- Sobredependencia de modelos IA de terceros sin auditoría.
- Procesos de montaje inseguros o procesos CI/CD que permiten manipulación.
- Falta de supervisión de vulnerabilidades en las dependencias implementadas.
- Rastreo deficiente de licencias o procedencia de los componentes.

----------------------------
<h2>Cómo Prevenirlo</h2>
- Verifica todos los componentes, librerías y modelos IA de terceros antes de usarlos.
- Monitoriza y parchea las dependencias de forma regular.
- Firma, verifica y audita las actualizaciones de software y paquetes.
- Cierra a conciencia los procesos CI/CD y construcción para prevenir la manipulación.
- Rastrea el origen y licencias de las dependencias.
- Implementa monitorización de tiempo de ejecución para comportamiento inusual de dependencias o componentes IA.
- Integra modelos de amenazas de cadena en el SDLC incluyendo testing, despliegue y workflows de actualizaciones.

--------------------------------------------
<h2>Reto</h2>
Navega al puerto `5003` de la IP dada. El código está desactualizado e importa un componente viejo: `lib/vulnerable_utils.py`. ¿Puedes debuggearlo?

1. Vamos a la página dada.
   !**Pasted image 20251219123146.png**
2. Interceptamos la petición al endpoint `/api/process`.
   !**Pasted image 20251219124029.png**
3. Cambiamos el método a POST, metemos un JSON con el campo `data` con un texto cualquiera y cambiamos el `Content-Type`.
   !**Pasted image 20251219124223.png**
4. No sabemos lo que mandar así que leeremos el archivo que nos dan en la tarea.
   !**Pasted image 20251219125858.png**
   Sobre la linea 23 podemos ver información relevante.
5. Vamos a proceder a mandar la palabra `debug`.
   !**Pasted image 20251219130011.png**
