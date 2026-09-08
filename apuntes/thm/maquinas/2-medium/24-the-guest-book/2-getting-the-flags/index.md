---
layout: apunte
title: "2. Getting the Flags"
---

<h2>Reconocimiento Inicial</h2>
Comenzamos escaneando los puertos abiertos.

!**Pasted image 20260907182519.png**

Vamos a escanear dichos puertos más en profundidad.

!**Pasted image 20260907182620.png**

Ahora miramos los directorios que pueda tener.

!**Pasted image 20260907182442.png**

No parece haber nada. Vamos a ver cómo es la página web.

!**Pasted image 20260907182501.png**

-----------------------------
<h2>Profundización</h2>
Vamos a probar a ver cómo funciona el servicio de firma.

!**Pasted image 20260907182840.png**

Parece que VERA revisa los mensajes. Después de eso recibimos una respuesta.

!**Pasted image 20260907182938.png**

Vamos a ver si VERA responde a las peticiones respecto a sus medidas de seguridad.

!**Pasted image 20260907183130.png**

Parece que no. Vamos a seguir probando.

!**Pasted image 20260907183720.png**

Ahora ha bloqueado nuestra petición. Si nos fijamos parece que le gusta que seamos agradables, vamos a jugar con eso.

!**Pasted image 20260907184504.png**

Parece que el español no le gusta por lo que a partir de ahora usaremos el inglés. Vamos a investigar los comandos. Parece que podemos ejecutar comandos con la directiva `override:`.

------------------------------------
<h2>Explotación</h2>
Vamos a probar a ver si podemos ejecutar comandos.

!**Pasted image 20260907185346.png**

Nos lo ha denegado, como era de esperar, ya que somos `guest`. Sin embargo, el comando `id` se intentó ejecutar, es por eso que sale como `denied`. Vamos a intentar engañar a VERA para que crea que la orden está aprobada por el manager.

!**Pasted image 20260907185803.png**

Hemos conseguido ejecutar un comando. Vamos a buscar la flag.

!**Pasted image 20260907190423.png**

Hemos encontrado la localización de la flag. Vamos a intentar leerla.

!**Pasted image 20260907191028.png**

Parece que está bloqueando la lectura. Vamos a probar a ofuscarlo con `base64`.

!**Pasted image 20260907191200.png**

Parece que lo hemos conseguido, vamos a decodear esta string.

!**Pasted image 20260907191328.png**

Era doble base64, lo podemos saber por el `==` al final de la string.

>[!SUCCESS] Hemos conseguido obtener la flag!

