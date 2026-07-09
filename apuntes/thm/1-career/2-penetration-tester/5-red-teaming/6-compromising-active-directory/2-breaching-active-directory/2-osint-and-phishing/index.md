---
layout: apunte
title: "2. OSINT and Phishing"
---

Dos maneras populares de ganar acceso al primer par de credenciales son OSINT y phishing. Sólo cubriremos brevemente los métodos.

-------------------------------
<h2>OSINT</h2>
OSINT es usado para descubrir información que ha sido divulgada públicamente. En términos de credenciales AD, esto puede pasar por varios motivos, como:

- Usuarios que responden preguntas en foros públicos como Stack Overflow pero divulgan información sensible.
- Desarrolladores que suben scripts a servicios como GitHub con credenciales hardcodeadas.
- Credenciales siendo divulgadas en brechas pasadas.

Usando técnicas de OSINT, puede ser posible recuperar credenciales divulgadas públicamente. Si somos lo suficientemente suertudos, encontraremos credenciales, aunque todavía tendremos que encontrar una manera de comprobar que son válidas o no, ya que la información OSINT puede estar desactualizada.

----------------------------------------------
<h2>Phishing</h2>
El phishing es otro método excelente para romper un AD. Phishing suele hacer que los usuarios den sus credenciales en una página web maliciosa o les pide ejecutar una aplicación concreta que instalaría un RAT (Remote Access Trojan) en el segundo plano.