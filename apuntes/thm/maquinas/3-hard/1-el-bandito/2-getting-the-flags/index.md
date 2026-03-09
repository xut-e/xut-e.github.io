---
layout: apunte
title: "2. Getting the Flags"
---

<h2>Reconocimiento Inicial</h2>
Lo primero que vamos a hacer es mirar qué puertos están abiertos, como siempre.

!**Pasted image 20260309145408.png**

Después vamos a investigar sobre los puertos abiertos en profundidad.

!**Pasted image 20260309150050.png**
!**Pasted image 20260309150111.png**
!**Pasted image 20260309150125.png**

Después de esto vamos con la enumeración de directorios.

Empezaremos con el puerto 80:

>[!CAUTION] Debemos poner `https` al listar para el puerto 80, porque si no nos redirigirá y no será posible conectarse.

!**Pasted image 20260309150350.png**

Ahora vamos a ver que hay en el proxy (`8080`):

!**Pasted image 20260309150546.png**
!**Pasted image 20260309150609.png**
!**Pasted image 20260309150635.png**

Estas son las cosas interesantes que hemos encontrado.

------------------------------------------------
<h2>Profundización</h2>
Vamos a ver que hay en la web. Vamos a arrancar BurpSuite para ir mapeando el sitio web.

<h3>Puerto 80</h3>

!**Pasted image 20260309150912.png**

Nos encontramos con esto, pero si miramos el código fuente de la página:

!**Pasted image 20260309150939.png**

Vamos a ver qué hay en esa ruta.

!**Pasted image 20260309151027.png**

Es un documento JavaScript con varios endpoints y un par de nombres de usuario. Lo que conseguimos sacar en limpio del archivo es:

**Endpoints:**

- `/getMessages`
- `send_message`

**Usuarios:** 

- JACK
- OLIVER

Vamos ahora a mirar en los directorios que encontramos en este puerto.

!**Pasted image 20260309151346.png**

El endpoint `/ping` parece un endpoint muerto.

!**Pasted image 20260309151434.png**

En el endpoint `/access` hay un formulario de login, interesante.

Hemos acabado con lo descubierto en el puerto 80, vamos ahora con el 8080.

<h3>Puerto 8080</h3>
En la página inicial hay una página web.

!**Pasted image 20260309151612.png**

Navegando por la página vemos que sólo hay dos endpoints:

- En `Services` tenemos `/services.html`.
  !**Pasted image 20260309151835.png**
  Interesante, posible SSRF.
- En `Burn Token` está `/burn.html`.
  !**Pasted image 20260309151905.png**

Si probamos la funcionalidad de `/burn.html` vemos que no hace nada, por lo que vamos a mirar el código fuente.

!**Pasted image 20260309151927.png**

Vemos que no hace nada efectivamente, pero hay algo muy interesante y que debería de llamarnos la atención teniendo en cuenta que venimos de una unidad basada en Request Smuggling con contenido de WebSockets.

Vamos ahora a buscar en los directorios que encontramos antes. Empezando por `/configprops` ya que `/assets` está vacío.

!**Pasted image 20260309152416.png**

Parece que sólo hay información sobre el framework. Si buscamos en internet "spring framework endpoints" llegamos a la página de la [Documentación Oficial](https://docs.spring.io/spring-boot/docs/2.1.9.RELEASE/reference/html/production-ready-endpoints.html).

!**Pasted image 20260309152554.png**

Puede que nos sea útil más adelante.

Vamos a continuar con `/health`.

!**Pasted image 20260309152851.png**

Ahora vamos con `/info`.

!**Pasted image 20260309152915.png**

Vamos con `/mappings.json`.

!**Pasted image 20260309153031.png**

Acabamos de sacar el mapa de endpoints disponibles (aunque ahora no todos están disponibles para nosotros sabemos que existen). Los que hemos encontrado son:

- `/admin-creds`
- `/admin-flag`
- `/token`
- `/isOnline`
- `/error`
- `/heapdump`
- `/autoconfig`
- `/trace`
- `/health`
- `/dump`
- `/configprops`
- `/env`
- `/metrics`

Está claro que saltan a la vista `/admin-creds` y `/admin-flag`, pero vamos a seguir con nuestra rutina de escaneo.

Ahora nos toca `/heapdump`.

!**Pasted image 20260309153506.png**

Parece que nos ofrece descargarlo en lugar de mostrarlo en web. Si lo descargamos e intentamos leerlo vemos que es un binario con muchísimos caracteres. Vamos a probar con `strings`. Si lo revisamos hay algunas líneas más largas que otras. Parece que hay peticiones, vamos a ver si alguna se ha hecho con credenciales.

!**Pasted image 20260309153850.png**

Acabamos de encontrar unas credenciales, vamos a seguir. Ahora con `/swagger-ui.html`.

!**Pasted image 20260309153953.png**

Parece que aquí no hay nada.

--------------------------------------------
<h2>Primera Flag</h2>
Para obtener la primera flag parece que vamos a tener que usar la técnica de los WebSockets para conseguir un Request Smuggling junto con un SSRF para sobrepasar un proxy seguro, como hicimos en los puntos 2 y 3 de la lección de WebSockets (`THM -> 1. Career -> 3. Web Application Pentesting -> 5. HTTP Request Smuggling -> 3. Request Smuggling - WebSockets`).

Ahora sí que abrimos BurpSuite, con todo lo que hemos hecho debería estar mapeado.

!**Pasted image 20260309154430.png**

Vamos a escoger la de `/isOnline` porque necesitamos saber que funciona el SSRF antes de proceder.

Para ello la mandamos al repetidor y cambiamos la URL por la del servidor que montaremos.

!**Pasted image 20260309154552.png**

Ahora vamos a levantar el servidor. Para ello vamos a usar un simple `nc` por ahora, sólo queremos asegurarnos de que funciona.

!**Pasted image 20260309154641.png**

Mandamos la petición.

!**Pasted image 20260309154704.png**

Funciona, hay SSRF.

Ahora vamos a probar a ver si una simple funciona, pero esta vez vamos a utilizar python, para no tener que estar levantando el servidor todo el rato.

!**Pasted image 20260309154916.png**

Ahora sí, vamos al lío. Vamos a mandar una petición de WebSocket Upgrade a la URL nuestra (SSRF).

!**Pasted image 20260309155402.png**

>[!CAUTION] Recuerda desactivar la opción de `Update Content-Lenth` y de dejar siempre dos líneas por debajo de la petición.

Parece que nos hemos topado con el mismo problema que el el punto 3 de la lección de WebSockets. Sabemos esto porque el "403 Forbidden" que vemos no viene del servidor, sino del proxy, Nginx.

Para solucionar esto tenemos que hacer que nuestro servidor al que apunta el SSRF devuelva el código `101 Switching Protocols` para que el proxy piense que de verdad hemos migrado el protocolo hacia WebSockets.

Para conseguir esto vamos a usar el siguiente código de Python:

```python
import sys
from http.server import HTTPServer, BaseHTTPRequestHandler

if len(sys.argv)-1 != 1:
    print("""
Usage: {} 
    """.format(sys.argv[0]))
    sys.exit()

class Redirect(BaseHTTPRequestHandler):
   def do_GET(self):
       self.protocol_version = "HTTP/1.1"
       self.send_response(101)
       self.end_headers()

HTTPServer(("", int(sys.argv[1])), Redirect).serve_forever()
```

Lo guardamos y ejecutamos:

!**Pasted image 20260309155821.png**

Volvemos a probar a mandar la petición.

!**Pasted image 20260309155905.png**

Ahora sí que ha funcionado, vamos a obtener las credenciales del administrador, recordemos el endpoint `/admin-creds`:

!**Pasted image 20260309160020.png**

Son las mismas credenciales que obtuvimos con el archivo descargado desde `/heapdump`.

Vamos ahora a ver la flag del admin.

!**Pasted image 20260309161004.png**

------------------------------------
<h2>Segunda Flag</h2>
Para la segunda flag vamos a empezar entrando al `/access` que nos encontramos en el puerto 80 utilizando las credenciales obtenidas durante la obtención de la primera flag.

Una vez dentro nos encontramos con esto:

!**Pasted image 20260309161426.png**

Además, podemos obtener acceso también al endpoint `/getMessages` gracias a la cookie de sesión verificada obtenida al iniciar sesión.

Vamos a probar a mandar un mensaje.

!**Pasted image 20260309161622.png**

Se actualiza tanto en la pestaña del chat como en la de `/getMessages`.

!**Pasted image 20260309161652.png**

Como está reflejada, se me asemeja a una técnica de request smuggling, vamos a probar.

Abrimos de nuevo BurpSuite y miramos el mapa.

!**Pasted image 20260309161756.png**

Esto es lo que nos interesa.

Lo mandamos al repetidor y lo vamos a modificar un poco. Primero lo vamos a dejar así:

!**Pasted image 20260309161908.png**

Y ahora vamos a hacer el smuggling de la segunda petición. La dejamos así:

!**Pasted image 20260309162253.png**

Vamos a mandarla hasta que se quede "colgado".

!**Pasted image 20260309162322.png**

Hemos conseguido hacer smuggling de una petición peto no ha sido suficiente longitud para leer la flag, si es que está aquí.

!**Pasted image 20260309162505.png**

Vamos a probar con más longitud: `800`.

!**Pasted image 20260309162537.png**

Parece que tampoco ha sido suficiente.

!**Pasted image 20260309162722.png**

Después de mucho rato intentándolo y que no saliera me frustré y pensé igual no lo está mandando todo el rato el login, así que me puse a escribir mensajes de Content-Length: 100 y salió este patrón.

!**Pasted image 20260309173259.png**

Después de muchísimos intentos conseguimos la flag. Resulta que el número más consistente para obtener respuesta fue `730`. Aunque hay una parte que está encodeada en unicode.

!**Pasted image 20260309183638.png**

El último paso sería convertirla por ejemplo con [CyberChef](https://gchq.github.io/CyberChef/).

!**Pasted image 20260309183820.png**

---------------------------------------
<h2>Conclusión</h2>
La primera parte fue muy divertida de encontrar y explotar. Sin embargo, la segunda flag fue mucho más difícil hasta que me di cuenta de que lo que tenía que hacer era encontrar el número bueno para que no se quedase colgado.

Sea como sea hemos conseguido obtener ambas, completando así nuestra primera máquina de dificultad difícil y dejando muy claro que nunca hay que rendirse (no exagero si digo que he estado más de 3h sólo para la segunda flag).

>[!SUCCESS] Hemos conseguido obtener ambas flags y afianzar nuestro conocimiento sobre HTTP Request Smuggling.

