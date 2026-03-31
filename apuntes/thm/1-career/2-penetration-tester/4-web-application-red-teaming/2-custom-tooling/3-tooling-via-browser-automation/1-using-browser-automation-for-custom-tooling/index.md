---
layout: apunte
title: "1. Using Browser Automation for Custom Tooling"
---

En la unidad anterior vimos cómo los proxies de interceptación y los plugins personalizados podían ayudarnos a procesar y manipular las comunicaciones que hacen uso de criptografía personalizada. Sin embargo, este acercamiento requiere que invirtamos esta criptografía y repliquemos la lógica nosotros mismos. La automatización del navegador cambia esto.

Cuando automatizamos el navegador, ya no hay que atravesar las capas de la encriptación manualmente. En su lugar, dejamos que el navegador haga el trabajo duro. El JavaScript que corre en la aplicación realiza toda la lógica del lado del cliente, incluyendo encriptación personalizada y manipulaciones del DOM.

Usando herramientas de automatización de navegador, interactúas con la aplicación exactamente como lo haría un usuario. Esto significa que el navegador hace todo el procesado por ti. Tu automatización puede simplemente extraer los payloads o respuestas finales una vez que sean renderizados o transformados.

Esto hace que la automatización de navegador sea increíblemente útil para:

- Sobrepasar CAPTCHA y restricciones del lado del cliente.
- Disparar flujos de trabajo de múltiples pasos.
- Ver valores renderizados y dinámicos de los valores generados.

------------------------------------
<h2>Elegir las Cadenas Adecuadas Para Ti</h2>
Hay varias herramientas de automatización de navegador para ti, cada una con sus propias fortalezas, entornos soportados y casos de uso. Mientras que muchas de estas herramientas son usadas para UI testing, los red teamers pueden darles otro propósito para interactuar con aplicaciones web en formas que simulen un usuario real. Debajo una comparación de algunas populares.

| Herramienta de Automatización de Navegador | Soporte de Lenguaje                   | Ventajas                                                             | Limitaciones                                                           |
| ------------------------------------------ | ------------------------------------- | -------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| **Playwright**                             | Python, Java, C#, JavaScript          | Rápido y soporta casi todos los navegadores                          | Tiene una curva de aprendizaje empinada                                |
| **Selenium**                               | Python, Java, C#, JavaScript          | Amplia comunidad y soporta la mayoría de los buscadores              | Más lento que frameworks más nuevos y puede requerir un setup complejo |
| **Puppeteer**                              | JavaScript                            | Interfaz basada en JavaScript                                        | Sólo para Chrome                                                       |
| **Pyppeteer**                              | Python                                | Wrapper de Python para Puppetter que permite mejor control de script | Ha sido deprecado recientemente                                        |
| **Power Automate**                         | Low-Code WorkFlow Definition Language | Automatización a nivel de GUI para simular mejor el comportamiento   | Menos preciso y no tiene soporte entre plataformas                     |

------------------------------------------
<h2>¿Qué Herramienta Usaremos en Esta Unidad?</h2>
En esta unidad usaremos Selenium debido a su facilidad de uso, soporte de Python y amplia compatibilidad de navegadores. También usaremos Playwright para mostrarte una herramienta más moderna. Aprenderás a utilizar estas herramientas para interactuar con el navegador como un humano, encadenar acciones, extraer y manipular información e incluso construir exploits dirigidos a navegadores.