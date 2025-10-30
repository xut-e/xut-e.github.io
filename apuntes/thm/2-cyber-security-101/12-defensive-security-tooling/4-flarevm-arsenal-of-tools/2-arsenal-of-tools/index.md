---
layout: apunte
title: "2. Arsenal of Tools"
---

En esta tarea te introduciremos a las herramientas en FlareVM. Tiene múltiples herramientas de forénsica, respuesta a incidentes e investigación de malware.

Te mostramos las herramientas agrupadas por categoría.

-------------------------------
<h2>Ingeniería Inversa y Depuración</h2>
La ingeniería inversa es como resolver un puzzle al revés. Tomas un producto terminado y lo separas en piezas para entenderlo. Depurar es identificar errores, entender por qué pasan y corregirlos para prevenirlos.

- **Ghidra:** Desarrollada por la NSA, suite de ingeniería inversa de código abierto.
- **x64dbg:** Depurador de código abierto para binario en formatos x32 y x64.
- **OllyDbg:** Depurador para ingeniería inversa a nivel de ensamblador.
- **Radare2:** Una plataforma sofisticada de código abierto para ingeniería inversa.
- **Binary Ninja:** Herramienta para desensamblar y descompilar archivos.
- **PEiD:** Herramienta de empaquetado, criptografía y compilado.

-----------------------------------
<h2>Desensambladores y Descompiladores</h2>
Los desensambladores y descompiladores son herramientas clave en el análisis de malware. Ayudan a los analistas a entender los comportamientos, la lógica y el control de flujo del software malicioso separándolo en partes más entendibles.

- **CFF Explorer:** Editor para analizar y editar archivos Portable Executable (PE).
- **Hopper Disassembler:** Depurador, desensamblador y descompilador.
- **RetDec:** Descompilador de código abierto para código máquina.

----------------------------------
<h2>Análisis Estático y Dinámico</h2>
Análisis estático y dinámico son dos métodos cruciales en ciberseguridad para examinar malware. El análisis estático incluye inspeccionar el código sin ejecutarlo, mientras que el análisis dinámico consiste en ejecutarlo y ver cómo se comporta.

- **Process Hacker:** Editor de memoria y visor de procesos sofisticado.
- **PEview:**  Visor de archivos PE para análisis.
- **Dependency Walker:** Herramienta para mostrar las dependencias DLL de un ejecutable.
- **DIE (Detect It Easy):** Un empaquetador, compilador y detector de criptominería.

---------------------------
<h2>Forénsica y Respuesta a Incidentes</h2>
La forénsica digital incluye la recolección, análisis y preservación de evidencia digital de varias fuentes como ordenadores, redes y dispositivos de almacenamiento. La respuesta a incidentes se centra en la detección, contención, erradicación y recuperación de ciberataques.

- **Volatility:** Framework de análisis de memoria RAM para forense.
- **Rekall:** Framework para memoria forense en respuesta a incidentes.
- **FTK Imager:** Adquisición de imágenes de disco y herramientas de análisis de uso forense.

---------------------------
<h2>Análisis de Red</h2>
El análisis de red incluye diferentes métodos y técnicas para estudiar y analizar redes para descubrir patrones, optimizar el rendimiento y entender la estructura y comportamiento de la red.

- **Wireshark:** Analizador de paquetes y protocolos de red para grabar y analizar tráfico.
- **Nmap:** Herramienta de mapeo y detección de vulnerabilidades.
- **Netcat:** Escribe y lee información a lo largo de las conexiones de red con esta herramienta.

------------------------------
<h2>Análisis de Archivos</h2>
El análisis de archivos es una técnica usada para examinar archivos en busca de amenazas potenciales para la seguridad y asegurar los permisos correctos.

- **FileInsight:** Programa para mirar a través y editar binarios.
- **Hex Fiend:** Editor hexadecimal rápido y ligero.
- **HxD:** Visor y editor de archivos binarios con editor hexadecimal.

------------------------
<h2>Scripting y Automatización</h2>
Involucra usar scripts como de PowerShell y Python para automatizar tareas y procesos repetitivos., haciéndolos más eficientes y menos susceptibles de error humano.

- **Python:** Lenguaje de scripting enfocado en la automatización con módulos y herramientas.
- **PowerShell Empire:** Framework para la post-explotación PowerShell.

--------------------------------
<h2>Suite Sysinternals</h2>
La Suite Sysinternals es una colección de utilidades de sistema avanzadas diseñada para ayudar a los profesionales de IT y desarrolladores a dirigir, resolver problemas y diagnosticar los sistemas Windows.
- **Autoruns:** Muestra lo que lo ejecutables están configurados para hacer durante el arranque del sistema.
- **Process Explorer:** Ofrece información sobre procesos corriendo.
- **Process Monitor:** Monitoriza y registra procesos y actividades de hilos en tiempo real.

Tranquilo que no vamos a ver todas las herramientas, sólo queremos que veas cómo es tener una caja con herramientas que pueden hacer tantas cosas.