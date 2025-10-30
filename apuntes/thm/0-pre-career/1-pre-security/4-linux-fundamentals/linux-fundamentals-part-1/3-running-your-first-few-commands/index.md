---
layout: apunte
title: "3. Running your First few Commands"
---

Como hemos visto la ventaja principal es la poca cantidad de memoria que necesitan estos sistemas para funcionar. De todas formas esto implica que muchas veces no tienen GUI o "escritorio". Una gran parte, entonces, de la interacción con estos sistemas se hace a través de una terminal con una línea de comandos.

```bash
tryhackme@linux1:~$ introduce_comandos__aquí
```

Así se ve una terminal.

Necesitamos hacer funciones básicas como navegar entre archivos, ver sus contenidos o crear archivos. Vamos a empezar con algunos comandos básicos:

| Command | Description                                                    |
| ------- | -------------------------------------------------------------- |
| echo    | Muestra por la salida estándar cualquier texto que le pasemos. |
| whoami  | Nos dice qué usuario somos actualmente.                        |
Si queremos imprimir una sola palabra no necesitamos comillas, sin embargo si queremos imprimir más, sí:

```bash
tryhackme@linux1:~$ echo Hello
Hello
tryhackme@linux1:~$ echo "Hello Friend!"
Hello Friend!
```

Whoami puede ser usado así:

```bash
tryhackme@linux1:~$ whoami
tryhackme
```

