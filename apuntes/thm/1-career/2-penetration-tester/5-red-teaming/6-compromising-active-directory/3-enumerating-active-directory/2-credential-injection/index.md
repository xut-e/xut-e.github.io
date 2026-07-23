---
layout: apunte
title: "2. Credential Injection"
---

Antes de saltar a los objetos AD y enumeración, vamos a hablar de los métodos de inyección de credenciales. Desde la red de Breaching AD, puedes haber visto que las credenciales suelen encontrarse sin comprometer la máquina unida al dominio.

--------------------------------------
<h2>Windows vs Linux</h2>
>[!QUOTE] Si conoces al enemigo y a tí mismo, no debes temer el resultado de cien batallas. Si te conoces a tí mismo pero no al enemigo, por cada batalla ganada también sufrirás una derrota.
>Sun Tzu - El Arte de la Guerra.

Puedes llegar muy lejos enumerando AD desde una máquina Kali. Aún así, si quieres realizar una enumeración más profunda, e incluso explotación, necesitas entender y replicar a tu enemigo. Por eso necesitas una máquina Windows. Esto te permitirá varios métodos integrados en la fase de enumeración y explotación. En esta red, exploraremos una de estas herramientas, llamada `runas.exe`.

----------------------------------------
<h2>Runas Explicado</h2>
¿Has encontrado alguna vez credenciales pero ningún sitio para iniciar sesión con ellas? Runas puede ser la respuesta que buscas.

En las evaluaciones de seguridad, normalmente tendrás acceso a una red y credenciales AD que hayas descubierto