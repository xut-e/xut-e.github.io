---
layout: apunte
title: "9. Organizer - Overview"
---

El módulo Organizer en Burp Suite está diseñado para ayudarnos a guardar y anotar copias de las peticiones HTTP que podamos querer revisar después. Puede ser especialmente útil para organizar tu flujo de trabajo de penetration test.

- Puedes guardar peticiones que quieras investigar más tarde, que hayas identificado como interesantes o que quieras añadir al reporte más tarde.
- Puedes mandar peticiones HTTP al Organizer desde otros módulos con `Ctrl + O` o haciendo click derecho en "Send to Organizer". Cada una que mandes será una copia de sólo lectura de la petición original.
- Se guardan en tablas, que contienen columnas como la de número de petición, la hora a la que fue ejecutada, herramienta de Burp Suite desde la que se mandó, etc.
  !**Pasted image 20251116234337.png**

Para ver la petición y la respuesta:

1. Haz click en cualquier ítem del Organizador.
2. La petición y la respuesta serán de sólo lectura (read-only). Puedes buscar dentro de la petición o la respuesta. Selecciona la petición y luego usar la barra de búsqueda debajo de la petición.

!**Pasted image 20251116234534.png**
