---
layout: apunte
title: "9. III. Injection"
---

Las debilidades de inyección son muy comunes en las aplicaciones hoy en día. Estas ocurren porque la aplicación interpreta el input controlado por el usuario como comandos o parámetros. Este tipo de vulnerabilidad depende de la tecnología que se use, algunos ejemplos son:

- **Inyección SQL:** Ocurre cuando el input del usuario se pasa a queries SQL sin sanitización. Esto podría permitir al atacante acceder a información sensible.
- **Inyección de comandos:** Ocurre cuando el input del usuario se pasa a comandos de sistema. Como resultado, el atacante puede ejecutar comandos a su antojo, pudiendo conseguir acceso a la máquina.

La defensa principal para prevenir este tipo de ataques es asegurarse de que el input controlado por el usuario no sea interpretado como queries o comandos. Hay varias maneras de hacer esto:

- **Usando una lista blanca:** Cuando el input se manda al servidor, este se compara con una lista de aquellos inputs que se consideran seguros, y sólo deja pasar los que hacen match.
- **Filtrando el input:** Si el input contiene caracteres peligrosos, estos se eliminan antes de procesarse.

Los caracteres o inputs peligrosos  son cualquier input que pueda cambiar cómo la información se procesa. En vez de construir manualmente listas blancas o filtrar los inputs, existen varias librerías que pueden realizar estas acciones por nosotros.