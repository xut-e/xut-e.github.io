---
layout: apunte
title: "1. Introduction"
---

Esta unidad es una introducción a los tipos y técnicas usadas en los ataques a contraseñas. Veremos las formas de obtener u generar listas de contraseñas personalizadas. Los siguientes son los temas que tocaremos:

- Perfil de contraseñas
- Técnicas de ataques de contraseñas
- Ataques de contraseñas online

-----------------------------------
<h2>¿Qué es una contraseña?</h2>
Las contraseñas son usadas como método de autentificación por usuarios para acceder a sistemas o aplicaciones. Usar contraseñas asegura al dueño que él es el único con acceso. Sin embargo, si la contraseña es compartida o cae en las manos equivocadas, cambios no autorizados podrían ocurrir. El acceso no autorizado podría conllevar a cambios en el estatus o salud del sistema o dañar los archivos de dicho sistema. Las contraseñas son normalmente compuestas por una combinación de caracteres como letras, números y símbolos.

Una colección de contraseñas es el término con el que se refiere diccionario o wordlist. Las contraseñas con baja complejidad que son más fáciles de adivinar suelen ser encontradas en varias listas. Por ejemplo, contraseñas fáciles de adivinar podrían ser `password`, `123456`, `111111` y muchas más. Aquí hay una [lista de las contraseñas más vistas](https://github.com/danielmiessler/SecLists/blob/master/Passwords/Common-Credentials/10k-most-common.txt). Por esto no toma a un atacante mucho tiempo comprobarlas. Las contraseñas fuertes no deberían ser encontradas en diccionarios ya que las contraseñas deberían ser de 8 caracteres al menos. También deberían contener letras en mayúscula y minúscula, números y símbolos (`*&^%$3#@`).

A veces, las empresas usan sus propias políticas para reforzar las guías para los usuarios al crear una contraseña. Esto ayuda a asegurarse de que los usuarios no están usando contraseñas comunes o débiles en la organización y limita los vectores de ataque (como fuerza bruta). Sin embargo, si el atacante averigua la política de la contraseña, podría generar una lista que satisfaga dicha política.

---------------------------------
<h2>¿Cómo de Seguras son las Contraseñas?</h2>
Las contraseñas son un método de protección para acceder a cuentas online o sistemas de ordenadores. Los métodos de autentificación de contraseñas son usados para acceder a sistemas privados y personales, y el objetivo principal al usar una contraseña es mantenerla segura y no compartirla con otros.

Para responder a la pregunta que nos hemos hecho, esto depende de varios factores. Las contraseñas suelen ser almacenadas en el sistema de archivos o base de datos, y mantenerlos seguros es esencial. Se han visto casos donde las compañías almacenan las contraseñas en texto plano como la Sony breach de 2014. Por esto, una vez que el atacante accede al sistema de ficheros, puede obtener fácilmente las contraseñas. Por otro lado, otros almacenan las contraseñas usando varias técnicas como funciones de hasheado o algoritmos de encriptación para hacerlos más seguros. Incluso si el atacante tuviera acceso al sistema, será más difícil de crackear.
