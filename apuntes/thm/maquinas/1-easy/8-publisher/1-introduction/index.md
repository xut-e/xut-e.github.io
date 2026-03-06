---
layout: apunte
title: "1. Introduction"
---

!**Pasted image 20260305163108.png**

La máquina CTF "Publisher" es un entorno simulado que contiene algunos servicios. Mediante una serie de técnicas de enumeración, incluyendo directory fuzzing e identificación de versiones, se descubre una vulnerabilidad, permitiendo RCE. Intenta escalar privilegios usando binarios personalizados que están escondidos mediante acceso restringido al sistema de ficheros, necesitando una exploración más profunda en el perfil de seguridad del sistema para finalmente explotar un loophole que permite la ejecución de una shell bash y conseguir escalada de privilegios.