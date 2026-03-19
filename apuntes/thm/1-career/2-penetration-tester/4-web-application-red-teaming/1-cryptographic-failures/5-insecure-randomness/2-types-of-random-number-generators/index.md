---
layout: apunte
title: "2. Types of Random Number Generators"
---

En esta sección exploraremos los diferentes tipos de RNGs, enfatizando sus características y casos de uso.

------------------------------------------
<h2>True Random Number Generatos (TRNG)</h2>
Los TRNGs generan números random confiando en los fenómenos físicos impredecibles como rudo termal o desintegración radioactiva. Como estos generadores surgen de eventos naturales, producen valores completamente aleatorios. Los TRNGs son comúnmente usados en operaciones criptográficas sensibles, como generar claves para algoritmos como RSA o ECC. Estas claves son luego usadas en tareas como la encriptación, firmas digitales y creación de certificados, donde la impredictibilidad es crucial para la seguridad. Sin embargo, los TRNGs requieren hardware especializado, que puede ser más lento que otros RNGs, haciéndolos poco viables para aquellas tareas que requieran de velocidad.

!**Pasted image 20260318162521.png**

Como vemos en la figura superior, el flujo de trabajo básico incluye capturar un valor de semilla de un fenómeno físico impredecible. El valor es ofrecido al hardware, que realiza una transformación no determinista para generar una secuencia puramente aleatoria. EL output de los TRNGs no puede ser ni predicho ni reproducido.

---------------------------------
<h2>Pseudorandom Number Generator (PRNG)</h2>
Los PRNGs, al contrario que los TRNGs, generan números aleatorios de forma algorítmica basados en una semilla inicial. Puede parecer aleatorio, pero son deterministas, lo que significa que la misma semilla siempre produce el mismo resultado. Los PRNGs son más rápidos que los TRNGs y se usan en aplicaciones que necesitan grandes cantidades de números random como las simulaciones o el gaming. Sin embargo, debido a su predictibilidad, se convierte en un riesgo si el atacante puede inferir la semilla o su método de generación.

Examinaremos dos tipos primarios de PRNGs, los estadísticos y los criptográficos.

<h3>PRNG Estadístico</h3>
Los PRNGs estadísticos estás diseñados para producir números que pasan test de aleatoriedad estadística, significando que los números parecen aleatorios y tienen una falta de patrón. Estos generadores son ampliamente usados en aplicaciones que no están relacionadas con la seguridad.

<h3>PRNG Criptográficamente Seguro</h3>
Un CSPRNG es una forma de PRNG diseñada con propósitos de criptografía, donde la aleatoriedad debe ser impredecible y resistente a un ataque. Al contrario que los PRNGs estadísticos, los CSPRNGs producen outputs inviables computacionalente para revertir.