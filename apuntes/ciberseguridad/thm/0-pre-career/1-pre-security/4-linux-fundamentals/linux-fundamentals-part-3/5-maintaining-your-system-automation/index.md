---
layout: apunte
title: "5. Maintaining your System - Automation"
---

Los usuarios pueden querer programar una cierta acción o tarea para que tome lugar una vez que el sistema se haya arrancado por ejemplo comandos que hacen backups (copias de seguridad).

Vamos a estar hablando de los procesos `cron`. Pero más específicamente, de cómo podemos interactuar con ellos vía el uso de `crontabs`. Crontabs es uno de los procesos que se ejecuta en el arranque.

Los `crontabs` requieren de exactamente 6 valores específicos:

| Valor | Descripción                     |
| ----- | ------------------------------- |
| MIN   | En qué minuto ejecutarlo        |
| HOUR  | En qué hora ejecutarlo          |
| DOM   | Qué día del mes ejecutarlo      |
| MON   | Qué mes del año ejecutarlo      |
| DOW   | Qué día de la semana ejecutarlo |
| CMD   | El comando a ejecutar           |
Se vería tal que:

```c
0 */12 * * * cp -R /home/cmnatic/Documents /var/backups/
```

Esto indica que se debe copiar el contenido en la ruta establecida cada 12 horas.

Como puede ser confuso existen recursos como [Crontab Generator](https://crontab-generator.org/) o [Cron Guru](https://crontab.guru/) que nos ayudan cuando no nos sale.

Para editar el crontab podemos usar `crontab -e`.