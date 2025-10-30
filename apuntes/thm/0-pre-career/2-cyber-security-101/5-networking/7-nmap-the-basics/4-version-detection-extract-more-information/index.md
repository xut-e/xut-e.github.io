---
layout: apunte
title: "4. Version Detection - Extract More Information"
---

<h2>Detección de Sistema Operativo</h2>
Puedes activar la detección de sistema operativo añadiendo la opción `-O`. Aunque el resultado suele ser fiable, es importante saber que no hay un detector de sistema operativo 100% eficaz.

------------------
<h2>Detección de Versiones de Servicios</h2>
Descubriste varios puertos abiertos y quieres saber qué servicios se están ejecutando en ellos. Esto es muy conveniente a la hora de recopilar información. La opción `-A` activa la detección de SO, versión y traceroute.

-------------
<h2>Forzando el Escaneo</h2>
Cuando ejecutamos nuestro escaneo usando `-sS`, hay una posibilidad de que el objetivo no responda durante la fase de host discovery (por ejemplo no respondiendo a las peticiones ICMP). Consecuentemente, Nmap lo marcará como host inactivo y no lanzará escaneo de puertos contra él. Sin embargo podemos pedirle a Nmap que trate a todos los dispositivos en la red como activos. Para usar esta opción escribimos `-Pn`.

<h2>Resumen</h2>

| Opción | Explicación                                          |
| ------ | ---------------------------------------------------- |
| `-O`   | Detección de sistema operativo.                      |
| `-sV`  | Detección de servicio y versión.                     |
| `-A`   | Detección de sistema operativo, versión y más.       |
| `-Pn`  | Escanea dispositivos que aparentan no estar activos. |