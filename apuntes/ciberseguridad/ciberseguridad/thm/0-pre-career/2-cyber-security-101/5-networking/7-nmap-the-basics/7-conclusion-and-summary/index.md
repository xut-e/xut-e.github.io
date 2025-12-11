---
layout: apunte
title: "7. Conclusion and Summary"
---

Hemos aprendido los básicos de Nmap. Recuerda que es mejor ejecutarlo con `sudo` para poder aprovechar todas sus funcionalidades. A continuación una tabla de ayuda:

| Opción                                                              | Explicación                                        |
| ------------------------------------------------------------------- | -------------------------------------------------- |
| `-sL`                                                               | Lista los objetivos sin escanearlos.               |
| **_Host Discovery_**                                                |                                                    |
| `-sn`                                                               | Escaneo de ping, sólo para descubrir dispositivos. |
| **_Port Scanning_**                                                 |                                                    |
| `-sT`                                                               | Escaneo de conexión (handshake).                   |
| `-sS`                                                               | Escaneo sigiloso (primer paso sólo).               |
| `-sU`                                                               | Escaneo UDP.                                       |
| `-F`                                                                | Modo rápido (100 puertos).                         |
| `-p[range]`                                                         | Especifica un rango de puertos.                    |
| `-Pn`                                                               | Trata todos los dispositivos como activos.         |
| **_Service Detection_**                                             |                                                    |
| `-O`                                                                | Detección de Sistema Operativo.                    |
| `-sV`                                                               | Detección de versión de servicio.                  |
| `-A`                                                                | Detección de SO, versión y más.                    |
| **_Timing_**                                                        |                                                    |
| `-T<0-5>`                                                           | Plantilla de timing (0-5)                          |
| `--min-parallelism <numprobes>` and `--max-parallelism <numprobes>` | Número de hilos.                                   |
| `--min-rate <number>` and `--max-rate <number>`                     | Número de paquetes por segundo.                    |
| `--host-timeout`                                                    | Tiempo máximo de respuesta.                        |
| **_Real-time output_**                                              |                                                    |
| `-v`                                                                | Nivel de verbose (1-4).                            |
| `-d`                                                                | Nivel de debug (1-9).                              |
| **_Report_**                                                        |                                                    |
| `-oN <filename>`                                                    | Salida normal.                                     |
| `-oX <filename>`                                                    | Salida XML.                                        |
| `-oG <filename>`                                                    | Salida grepeable.                                  |
| `-oA <basename>`                                                    | Salida en todos los formatos.                      |
