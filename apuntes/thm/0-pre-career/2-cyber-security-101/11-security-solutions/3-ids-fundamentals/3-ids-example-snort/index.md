---
layout: apunte
title: "3. IDS Example - Snort"
---

Snort es uno de los IDSs de código abierto más usados, desarrollado en 1998. Usa un sistema híbrido de IDS. Trae pre-instalados varios archivos de configuración de reglas. Estos son una variedad de patrones de ataque conocidos. Además, puedes configurar tus propias reglas. También puedes deshabilitar cualquier regla predefinida.

-----------------------------
<h2>Modos de Snort</h2>
![](/apuntes/img/Pasted image 20251024214032.png)

| Modo                                    | Descripción                                                                                                                                                                                                                           |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Packet sniffer mode                     | Este modo lee y muestra los paquetes de red sin realizar ningún análisis en ellos. El modo de esnifeo de paquetes puede ser útil cuando los analistas necesitan leer los paquetes de tráfico sin realizar ninguna acción sobre ellos. |
| Packet logging mode                     | A veces es necesario guardar el tráfico de red para su posterior análisis. Este modo te permite guardar el tráfico como un archivo PCAP. Los investigadores forenses investigan los logs.                                             |
| Network Intrusion Detection System mode | Es su modo principal que monitoriza el tráfico de red en tiempo real y aplica sus archivos de reglas para identificar cualquier coincidencia.                                                                                         |
