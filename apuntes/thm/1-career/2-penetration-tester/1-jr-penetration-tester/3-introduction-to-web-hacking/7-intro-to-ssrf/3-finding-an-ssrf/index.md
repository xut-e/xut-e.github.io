---
layout: apunte
title: "3. Finding an SSRF"
---

Vulnerabilidades potenciales SSRF se pueden encontrar en las aplicaciones web de varias formas diferentes. Aquí un ejemplo de sitios comunes en los que buscar:

<h6>Cuando se usa una URL entera en un parámetro de la barra de búsqueda</h6>
!**Pasted image 20251106162343.png**

<h6>Un parámetro escondido en un formulario</h6>
!**Pasted image 20251106162411.png**

<h6>Una URL parcial como el nombre de host</h6>
!**Pasted image 20251106162437.png**

<h6>Sólo la ruta de la URL</h6>
!**Pasted image 20251106162504.png**

------------------------------------
Algunos de estos ejemplos son más fáciles de explicar que otros, y aquí es donde entra la prueba y error para encontrar un payload válido.

Si trabajas con un SSRF blind, donde no se muestra output, necesitarás usar una herramienta de registro HTTP externa para monitorizar las peticiones como [esta](https://requestbin.com), tu propio servidor HTTP o Burp Suite.