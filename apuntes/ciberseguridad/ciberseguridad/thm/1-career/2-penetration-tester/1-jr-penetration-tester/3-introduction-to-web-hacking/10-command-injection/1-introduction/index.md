---
layout: apunte
title: "1. Introduction"
---

En esta unidad vamos a ver la vulnerabilidad web de Inyección de Comandos. Una vez entendamos lo que es, veremos el impacto y riesgo de esta en una aplicación.

Luego pondrás tus conocimientos en práctica.

- Cómo descubrir vulnerabilidades de inyección de comandos.
- Cómo comprobar y explotar esta vulnerabilidad usando payloads diseñados para diferentes sistemas operativos.
- Cómo prevenir esta vulnerabilidad en una aplicación.
- Finalmente, aplicarás la teoría en una práctica de aprendizaje.

Para comenzar, entendamos qué es  una inyección de comandos. Es el abuso del comportamiento de una aplicación web para ejecutar comandos en su sistema operativo, usando los mismos privilegios que tiene la aplicación.

La inyección de comandos también suele conocerse como RCE (Remote Command Execution; Ejecución Remota de Comandos) por su habilidad de ejecutar código en la aplicación de forma remota.

Por ejemplo, ser capaz de ejecutar el comando `whoami` para listar la cuenta de usuario desde la que está corriendo el servicio web.