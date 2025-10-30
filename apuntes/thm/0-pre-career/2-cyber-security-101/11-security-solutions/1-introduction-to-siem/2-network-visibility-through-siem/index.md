---
layout: apunte
title: "2. Network Visibility through SIEM"
---

Antes de explicar la importancia del SIEM, tratemos de entender por qué es crítico tener mejor visibilidad de todas las actividades en una red. La imagen debajo muestra un ejemplo de una red simple que compete varios endpoints basados en Windows/Linux, un servidor de datos y un sitio web. Cada componente se comunica con otro o accede a internet a través del router.

![](/apuntes/img/Pasted image 20251022221746.png)

Como ya sabemos, cada componente de red puede tener uno o más fuentes de logs generando diferentes logs. Podemos dividir las fuentes de logs de red en dos partes lógicas:

1. **Fuentes de Logs Host-Centric:**
   Estas son fuentes de red que capturan eventos que ocurrieron en o de forma relacionada con el host. Algunas fuentes de logs de este tipo son Windows Event logs, Sysmon, Osquery, etc. Algunos ejemplos incluyen:
	1. Un usuario accede a un archivo.
	2. Un usuario intenta autenticarse.
	3. La actividad de ejecución de un proceso.
	4. Un proceso añade, edita o elimina una clave de registro o valor.
	5. Ejecución de Powershell.
2. **Fuentes de Logs Network-Centric:**
   Son logs generados cuando los hosts se comunican entre ellos o acceden a internet para visitar el sitio web. Algunos protocolos basados en red son SSH, VPN, HTTP/S, FTP, etc. Algunos ejemplos incluyen:
	1. Conexión SSH.
	2. Un archivo es accedido vía FTP.
	3. Tráfico Web.
	4. Un usuario accede a un recurso de la compañía mediante VPN.
	5. Compartición de archivos mediante red.

---------------------------------------
<h2>Importancia de un SIEM</h2>
Ahora que hemos cubierto varios tipos de logs es hora de entender la importancia del SIEM. Como todos estos dispositivos generan cientos de eventos por segundo, examinarlos todos en cada dispositivo puede ser una tarea casi imposible. Esa es una de las ventajas de tener un SIEM incorporado. No sólo toma los logs de varias fuentes en tiempo real sino que también ofrece la capacidad de correlacionar eventos, buscar logs, investigar incidentes y responder a ellos. Algunas funcionalidades clave que ofrece un SIEM son:

- Ingestión de los en tiempo real.
- Alertar ante actividades inusuales.
- Monitorización y visibilidad 24/7.
- Protección contra las últimas amenazas mediante detección temprana.
- Estadísticas de la información y visualización.
- Habilidad para investigar incidentes pasados.