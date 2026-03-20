---
layout: apunte
title: "5. Mitigation Features"
---

<h2>Pentesters</h2>
- **Identifica Aleatoriedad Débil en el Código:** Durante las revisiones de código busca generadores de números aleatorios débiles como `mt_rand()` o `rand()`.
- **Revierte Tokens Predecibles:** Intenta explotar tokens predecibles haciendo ingeniería inversa de la semilla usada en el PRNG.
- **Comprueba el Agotamiento de los Tokens:** Si no se usan los tokens, realiza fuerza bruta contra tokens ya generados.

------------------------------------
<h2>Desarrolladores</h2>
- **Usa PRNGs Criptográficamente Seguros:** Siempre usa  CSPRNGs, como `random_bytes()` u `openssl_random_pseudo_bytes()` en PHP o `java.security.SecureRandom` en Java.
- **Evita Valores de Semilla Predecibles:** Nunca uses valores predecibles como `timestamp`, `dirección IP`, o `ID de proceso` para alimentar semillas.
- **Regenera la Aleatoriedad para cada Operación Crítica:** Evita reutilizar valores aleatorios o semillas a lo largo de múltiples peticiones.
- **Usa Algoritmos Fuertes para la Generación de Claves:** Al generar claves criptográficas, siempre usa funciones de generación de claves seguras, por ejemplo `openssl_pkey_new()` en PHP.
