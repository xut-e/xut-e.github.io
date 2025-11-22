---
layout: apunte
title: "6. Use Case - Vhost Enumeration"
---

El último modo que estudiaremos será el modo `vhost`. Este nos permite bruteforcear hosts virtuales. Los hosts virtuales son diferentes páginas web en una misma máquina. A veces, pueden parecer subdominios, pero no es lo mismo. Los hosts virtuales se basan en la IP y corren en el mismo servidor, mientras que los subdominios se configuran en la DNS. La diferencia princcipal es la forma en la que Gobuster investiga estos tipos:

- `vhost`: Navega a la URL creada combinando el hostname configurado (`-u`) y una entrada del diccionario.
- `dns`: Hará un lookup DNS al FQDN creado combinando el dominio configurado (`-d`) con una entrada del diccionario.

----------------------------
<h2>Help</h2>
Si quieres una vista por encima completa sobre lo que te puede ofrecer el comando `vhost` con Gobuster, puedes ver la página  de help. Como verla entera puede ser intimidante, vamos a centrarnos en las siguientes funcionalidades:

| Flag corta | Flag larga          | **Descripción**                                                                            |
| ---------- | ------------------- | ------------------------------------------------------------------------------------------ |
| `-u`       | `--url`             | Especifica la URL base (dominio objetivo) para bruteforcear nombres de hosts virtuales.    |
|            | `--append-domain`   | Añade el dominio base a cada entrada del diccionario.                                      |
| `-m`       | `--method`          | Especifica el método HTTP a usar para las peticiones                                       |
|            | `--domain`          | Añade un dominio a cada entrada del diccionario (útil si no se ofrece de manera explícita) |
|            | `--exclude-length`  | Excluye resultados basados en la longitud de la respuesta                                  |
| `-r`       | `--follow-redirect` | Sigue redirecciones HTTP                                                                   |

-----------------------------
<h2>¿Cómo usar el modo vhost?</h2>
Para usar Gobuster con el modo `vhost`, podemos usar la siguiente sintaxis:

`gobuster vhost -u "http://example.thm" -w /papth/to/wordlist`

Date cuenta de que las flags `-u` y `-w` son necesarias para la correcta ejecución de la herramienta. Veamos un ejemplo de ejecución:

   ```shell
   root@tryhackme:~# gobuster vhost -u "http://10.10.151.214" --domain example.thm -w /usr/share/wordlists/SecLists/Discovery/DNS/subdomains-top1million-5000.txt --append-domain --exclude-length 250-320  
=============================================================== 
Gobuster v3.6 by OJ Reeves (@TheColonial) &amp; Christian Mehlmauer (@firefart) =============================================================== 
[+] Url:              http://10.10.94.214 
[+] Method:           GET 
[+] Threads:          10 
[+] Wordlist:         /usr/share/wordlists/SecLists/Discovery/DNS/subdomains-top1million-5000.txt 
[+] User Agent:       gobuster/3.6 
[+] Timeout:          10s 
[+] Append Domain:    true 
[+] Exclude Length:   250,254,263,274,283,293,294,299,253,261,269,277,285,290,300,257,258,270,278,282,291,252,260,264,268,271,279,280,289,251,256,262,265,272,297,287,292,295,255,266,276,284,286,296,267,273,275,281,288,259,298 
=============================================================== 
Starting gobuster in VHOST enumeration mode 
=============================================================== 
Found: blog.example.thm Status: 200 [Size: 1493] 
Found: shop.example.thm Status: 200 [Size: 2983] 
Found: www.example.thm Status: 200 [Size: 84352] 
Found: chelyabinsk-rnoc-rr02.backbone.example.thm Status: 404 [Size: 304] 
Found: academy.example.thm Status: 200 [Size: 434] 
Progress: 4989 / 4990 (99.98%) 
=============================================================== 
Finished 
===============================================================
```

Notarás que este comando es mucho más complejo que la sintaxis básica. Contiene muchas flags configuadas. Al no tener configurada una infraestructura DNS, tenemos que añadir más flags, como `--domain` o `--append-domain`. Necesitamos observar las peticiones que Gobuster manda para entender mejor cómo funcionan estas flags. Abajo podemos ver una petición GET básica:

```javascript
GET / HTTP/1.1
Host: www.example.thm
User-Agent: gobuster/3.6
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/ *;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Connection: keep-alive
```

Gobuster mandará múltiples peticiones cambiando el valor `Host:` cada vez. El valor en esta es `www.example.thm`, podemos desglosarlo en tres partes:

- `www`: Este es el subdominio, es la parte que Gobuster llenará con cada entrada del diccionario.
- `.example`: El dominio de segundo nivel, puedes configurarlo con la flag `--domain` (debes configurarlo con el dominio de primer nivel).
- `.thm`: El dominio de primer nivel. Puedes configurarlo con la flag `--domain` (debes configurarlo con el dominio de segundo nivel).

Ahora que conocemos cómo manda peticiones Gobuster, examinemos el comando más detenidamente:

- `gobuster vhost`: Le dice a Gobuster que enumere hosts virtuales.
- `-u "http://10.10.151.214"`: Configura la URL.
- `-w /usr/share/wordlists/SecLists/Discovery/DNS/subdomains-top1million-5000.txt`: Configura el diccionario a utilizar.
- `--domain example.thm`: Configura el dominio de primer y segundo nivel.
- `--append-domain`: Añade cada dominio configurado a cada entrada del diccionario. Si no se configura, el hostname será www, blog, etc y puede causar falsos positivos.
- `--exlude-length`: Filtra las respuestas que recibimos de las peticiones mandadas en base a su longitud. Sirve para evitar los falsos positivos. Como en general sólo nos interesa el código 200 OK, podemos filtrar por rango y decirle `--exclude-length 250-320`.


