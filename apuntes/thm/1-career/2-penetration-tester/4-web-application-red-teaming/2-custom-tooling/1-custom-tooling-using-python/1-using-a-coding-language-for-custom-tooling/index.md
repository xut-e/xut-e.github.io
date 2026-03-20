---
layout: apunte
title: "1. Using a Coding Language for Custom Tooling"
---

<h2>¿Por qué Crear tus Propias Herramientas?</h2>
Cuando te enfrentas a una aplicación web durante un ejercicio de red teaming, confiar sólo en herramientas existentes puede no ser suficiente. Aunque hay muchas opciones de código abierto y comerciales disponibles, puede que no cumplan tus requisitos explícitamente. Además, estas herramientas ya han sido firmadas, por lo que la probabilidad de ser detectado es alta. Crear herramientas personalizadas te permite:

- Ajustar la funcionalidad a tus necesidades.
- Automatizar la explotación y crear flujos de trabajo automatizados para realizar tareas repetitivas.
- Bypassear mecanismos de detección.
- Modificar exploits y herramientas existentes para encajar con tus necesidades.

Programar es la mejor forma. Te permite crear algo totalmente nuevo o construir una herramienta de partes existentes.

-------------------------------------
<h2>Scriptear o No Scriptear</h2>
Al seleccionar un lenguaje para construir tus herramientas personalizadas, una de las consideraciones primarias es si usar un lenguaje de scripting o compilado. Aunque es bueno poder hacer ambas, merece la pena considerar cuál es mejor para tu situación actual dadas las ventajas y desventajas:

| Factor de Decisión    | Lenguajes de Scripting                                                                                       | Lenguajes Compilados                                                                                   |
| --------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| Rapidez de desarrollo | Desarrollo y testeo rápido (inmediato).                                                                      | Desarrollo más lento debido a requerimientos de compilación.                                           |
| Rendimiento           | Generalmente más lento ya que la interpretación sólo ocurre en tiempo de ejecución.                          | Ejecución más rápida ya que puede ser compilado y optimizado.                                          |
| Facilidad de Uso      | Más fácil de crear y modificar al momento.                                                                   | Más complejo de modificar y sintaxis más estricta.                                                     |
| Portabilidad          | Aunque puede ser ejecutado en diferentes plataformas requiere que esta tenga el intérprete disponible.       | Aunque suele crearse para plataformas específicas, suele poder correr con software nativo del sistema. |
| Detección y Evasión   | Puede ser ofuscado fácilmente pero puede disparar AV o EDR debido a las firmas en los patrones de scripting. | Más difícil de analizar y puede ser usado para sobrepasar los mecanismos de detección.                 |
| Interfaz de OS        | Bueno para automatización e interacción con otras herramientas.                                              | Ofrece un acceso de bajo nivel a los recursos del sistema.                                             |

---------------------------------------
<h2>Elegir el Lenguaje Correcto</h2>
Los diferentes lenguajes de programación tienen fortalezas y debilidades únicas al crear herramientas y exploits personalizados. Veamos una comparación:

| Lenguaje        | Tipo      | Funcionalidades Clave                                       | Ventajas                                                                                                           | Desventajas                                                          |
| --------------- | --------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| **Python**      | Scripting | Muchas librerías y tipado dinámico                          | Fácil de aprender y permite prototipado.                                                                           | Ejecución más lenta y puede ser fácilmente detectado por AVs y EDRs. |
| **JavaScript**  | Scripting | Basado en navegador y fácil de realizar threading.          | Útil para exploits basados en web y aplicaciones web.                                                              | No usable para sistemas de bajo nivel y altamente detectable.        |
| **Go (Golang)** | Compilado | Tipado estático y ofrece soporte de concurrencia eficiente. | Ejecución rápida y compilación cruzada fácil.                                                                      | Crea binarios de gran tamaño y tiene pocas librerías de seguridad.   |
| **.NET (C#)**   | Compilado | Enfocado en Windows y se integra bien con sistemas API.     | Bueno para explotación de Windows y técnicas de ofuscación fáciles.                                                | Compatibilidad entre plataformas limitada y requiere el runtime .NET |
| **C++**         | Compilado | Alta eficiencia y permite manipulación de memoria directa   | Ejecución muy rápida y asegura acceso de sistema a bajo nivel, lo que es genial para crear herramientas sigilosas. | Sintaxis compleja y más difícil de debugar.                          |

--------------------------------------
<h2>Python Popular</h2>
Entre estas opciones, Python se mantiene como una de las más ampliamente usadas para construir herramientas de seguridad y exploits. Algunas de las razones principales de su popularidad son:

- Permite prototipado y desarrollo rápido.
- Python tiene muchísimas librerías para cosas como redes, interacción web y automatización.
- La sintaxis simple lo hace fácil de desarrollar y modificar.
- Los scripts de Python pueden correr en cualquier sistema con el intérprete de Python instalado. Con algunas librerías como `py2exe` incluso puedes crear binarios compilados para Windows sin intérprete.
- Dada la popularidad de Python, hay una gran comunidad de soporte.

!**Pasted image 20260319231525.png|224**

Elegir el lenguaje de programación adecuado depende de tus requerimientos específicos. Entender tus necesidades es clave a la hora de escoger.