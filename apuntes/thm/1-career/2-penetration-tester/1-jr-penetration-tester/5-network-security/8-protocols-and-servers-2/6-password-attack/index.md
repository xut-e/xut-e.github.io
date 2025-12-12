---
layout: apunte
title: "6. Password Attack"
---

Hemos visto la captura de paquetes de red y los ataques MITM y cómo mitigarlos con TLS y SSH. El tercer tipo de ataque que cubriremos en esta tarea es el password attack.

Muchos protocolos requieren que te autentifiques. Al usar protocolos como POP3, no deberíamos ser dados la capacidad de acceder a la bandeja de entrada de un usuario sin haber ofrecido credenciales correctas.

La autentificación se puede cumplir de tres maneras:

1. Algo que tú sepas, como una contraseña, PIN, etc.
2. Algo que tú tengas, como una tarjeta SIM, RFID o un USB.
3. Algo que tú seas, como tu iris o huella dactilar.

Esta tarea se centrará en ataques de contraseñas (algo que tú sabes). Basado en los 150 millones de nombres de usuario y contraseñas filtradas de la brecha de Adobe en 2013, las 10 contraseñas más usadas son:

- 123456
- 123456789
- password
- adobe123
- 12345678
- qwerty
- 1234567
- 111111
- photoshop
- 123123

Sólo 2 contraseñas son relacionadas con Adobe, el resto son genéricas. Pensarías que esto ha cambiado respecto a la última década, sin embargo, 123456, 1234567, 12345678 y 123456789 son contraseñas muy comunes a día de hoy.

Los ataques contra las contraseñas se llevan a cabo de las siguientes maneras:

1. **Adivinarlas:** Adivinar una contraseña requiere cierto conocimiento del objetivo, como la fecha de su cumpleaños o nombre de mascota.
2. **Ataque de Diccionario:** Intenta probar todas las contraseñas de una lista, cuanto más larga sea más probabilidades de que la contraseña sea una de ellas.
3. **Ataque de Fuerza Bruta:** Se pueden probar todas las combinaciones con cierto número de caracteres.

Nos centraremos en los ataques de diccionario. A lo largo del tiempo, los hackers han recopilado contraseñas filtradas en documentos que llamamos diccionarios.

Si queremos una manera de probar todas las combinaciones es cuando entra en juego Hydra, herramienta que vimos en [0. Hydra](/apuntes/thm/0-pre-career/2-cyber-security-101/9-offensive-security-tooling/1-hydra/0-hydra/).

Haremos un pequeño repaso con ejemplos:

La sintaxis general es: `hydra -l username -P diccionario servidor servicio` (mayúscula equivale a un archivo y minúscula a la opción dada).

Aunque podemos usar esta otra sintaxis: `hydra -l username -w diccionario servicio://servidor`.

En estos ejemplos, el servidor es la IP de la máquina que hostea el servicio y el servicio es por ejemplo (ssh, ftp, etc.). 

Algunas otras opciones son:

- `-s puerto`: Para definir un puerto diferente del puerto por defecto.
- `-V` o `-vV`: Para verbose o muy verbose.
- `-t n`: Para definir el número de conexiones paralelas (hilos/threads).
- `-d`: Para depurar (debugging).

Si quieres más información visita la página enlazada arriba. 

Algunas medidas de mitigación son:

- Políticas de contraseña fuertes.
- Bloqueo de la cuenta (después de cierto número de intentos fallidos).
- Retrasar la respuesta (un par de segundos es manejable para alguien que sabe la contraseña pero devastador para una herramienta de automatización.)
- Resolver un CAPTCHA (verificando que sea humano el que introduce la contraseña).
- Requerir un Certificado público.
- Habilitar la autentificación de doble factor.

