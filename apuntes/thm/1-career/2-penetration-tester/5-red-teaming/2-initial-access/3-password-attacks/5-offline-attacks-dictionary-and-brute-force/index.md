---
layout: apunte
title: "5. Offline Attacks - Dictionary and Brute-Force"
---

<h2>Ataques de Diccionarios</h2>
Un ataque de diccionario es una técnica usada para adivinar las contraseñas usando palabras o frases conocidas. Los ataques de diccionarios recaen enteramente en wordlists pre-recogidas que fueron previamente recogidas. Es importante elegir o crear el mejor candidato para tu objetivo para tener éxito en tu ataque. Vamos a explorar la realización de un ataque de diccionario usando lo que hemos aprendido en las tareas anteriores sobre generar wordlists. Realizaremos un ataque de diccionario offline usando `hashcat`.

Digamos que obtenemos el hash `f806fc5a2a0d5ba2471600758452799c`, y queremos realizar un ataque de diccionario para crackearlo. Primero, necesitamos conocer el siguiente mínimo:

1. ¿Qué tipo de hash es?
2. ¿Qué wordlist usar? ¿O qué tipo de ataque podríamos usar?

Para identificar el tipo de hash, podríamos usar una herramienta como `hashid`, o `hash-identifier`. Para este ejemplo, `hash-identifier` cree que es posible que el hashing sea `MD5`. 

```bash
user@machine$ hashcat -a 0 -m 0 f806fc5a2a0d5ba2471600758452799c /usr/share/wordlists/rockyou.txt
hashcat (v6.1.1) starting...
f806fc5a2a0d5ba2471600758452799c:rockyou

Session..........: hashcat
Status...........: Cracked
Hash.Name........: MD5
Hash.Target......: f806fc5a2a0d5ba2471600758452799c
Time.Started.....: Mon Oct 11 08:20:50 2021 (0 secs)
Time.Estimated...: Mon Oct 11 08:20:50 2021 (0 secs)
Guess.Base.......: File (/usr/share/wordlists/rockyou.txt)
Guess.Queue......: 1/1 (100.00%)
Speed.#1.........:   114.1 kH/s (0.02ms) @ Accel:1024 Loops:1 Thr:1 Vec:8
Recovered........: 1/1 (100.00%) Digests
Progress.........: 40/40 (100.00%)
Rejected.........: 0/40 (0.00%)
Restore.Point....: 0/40 (0.00%)
Restore.Sub.#1...: Salt:0 Amplifier:0-1 Iteration:0-1
Candidates.#1....: 123456 -> 123123

Started: Mon Oct 11 08:20:49 2021
Stopped: Mon Oct 11 08:20:52 2021
```

- `-a 0`: Prepara el modo de ataque a diccionario.
- `-m 0`: Prepara el modo de hasheo a MD5. Usa `hashcat -h` para averiguar otros métodos.
- `f806fc5a2a0d5ba2471600758452799c`: Puede ser el hash o un archivo que contenga dicho hash.
- `/usr/share/wordlists/rockyou.txt`: La wordlist para el ataque.

Ejecutamos `hashcat` con la opción `--show`:

```bash
user@machine$ hashcat -a 0 -m 0 F806FC5A2A0D5BA2471600758452799C /usr/share/wordlists/rockyou.txt --show
f806fc5a2a0d5ba2471600758452799c:rockyou
```

Como resultado, obtenemos `rockyou`.

-------------------------------------------
<h2>Ataques de Fuerza Bruta</h2>
La fuerza bruta es un tipo de ataque común usado por un atacante para ganar acceso no autorizado a una cuenta personal. Este método es usado para adivinar la contraseña de la víctima mandando combinaciones. La principal diferencia con un ataque de diccionario es que el ataque de diccionario usa una wordlist que contiene todas las posibles contraseñas.

En contraste, un ataque de fuerza bruta busca probar todas las combinaciones de caracteres. Por ejemplo, asumamos que tenemos una cuenta del banco a la que necesitamos acceso autorizado. Sabemos que el PIN contiene 4 dígitos como contraseña. Podemos realizar un ataque de fuerza bruta que empiece por `0000` y termine en `9999` para adivinar el PIN válido basado en este conocimiento. En otros casos, una secuencia de números o letras puede ser añadido a la lista de palabras existentes, como `admin0`, `admin1` o `admin9999`.

Por ejemplo, `hashcat` tiene opciones que podrían ser usadas para generar nuestras propias combinaciones.

```bash
user@machine$ hashcat --help
 ? | Charset
 ===+=========
  l | abcdefghijklmnopqrstuvwxyz
  u | ABCDEFGHIJKLMNOPQRSTUVWXYZ
  d | 0123456789
  h | 0123456789abcdef
  H | 0123456789ABCDEF
  s |  !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~
  a | ?l?u?d?s
  b | 0x00 - 0xff
```

El siguiente ejemplo muestra cómo podemos usar `hashcat` con el modo de fuerza bruta con una combinación de nuestra elección:

```bash
user@machine$ hashcat -a 3 ?d?d?d?d --stdout
1234
0234
2234
3234
9234
4234
5234
8234
7234
6234
..
..
```

- `-a 3`: Configura el modo de fuerza bruta.
- `?d?d?d?d`: Le dice a hashcat que use dígitos. En nuestro caso 4, empezando por 0000 y acabando por 9999.
- `--stdout`: Imprime el resultado a la terminal.

Ahora vamos a aplicar el mismo concepto para crackear el siguiente hash MD5: `05A5CF06982BA7892ED2A6D38FE832D6`, un pin de 4 números.

```bash
user@machine$ hashcat -a 3 -m 0 05A5CF06982BA7892ED2A6D38FE832D6 ?d?d?d?d
05a5cf06982ba7892ed2a6d38fe832d6:2021

Session..........: hashcat
Status...........: Cracked
Hash.Name........: MD5
Hash.Target......: 05a5cf06982ba7892ed2a6d38fe832d6
Time.Started.....: Mon Oct 11 10:54:06 2021 (0 secs)
Time.Estimated...: Mon Oct 11 10:54:06 2021 (0 secs)
Guess.Mask.......: ?d?d?d?d [4]
Guess.Queue......: 1/1 (100.00%)
Speed.#1.........: 16253.6 kH/s (0.10ms) @ Accel:1024 Loops:10 Thr:1 Vec:8
Recovered........: 1/1 (100.00%) Digests
Progress.........: 10000/10000 (100.00%)
Rejected.........: 0/10000 (0.00%)
Restore.Point....: 0/1000 (0.00%)
Restore.Sub.#1...: Salt:0 Amplifier:0-10 Iteration:0-10
Candidates.#1....: 1234 -> 6764

Started: Mon Oct 11 10:54:05 2021
Stopped: Mon Oct 11 10:54:08 2021
```

