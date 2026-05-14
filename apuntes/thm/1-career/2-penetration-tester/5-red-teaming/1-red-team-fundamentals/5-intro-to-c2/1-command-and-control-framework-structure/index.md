---
layout: apunte
title: "1. Command and Control Framework Structure"
---

<h2>¿Qué es un Framework de Command and Control?</h2>
Aunque puede parecer intimidante digerir los varios componentes de un framework C2, no tiene por qué serlo. Para entender mejor lo que es un framework C2, piensa en un listener Netcat (el servidor C2) que sea capaz de recibir y manejar varias reverse shells a la vez (agentes C2). Es un servidor para reverse shells. Al contrario que Netcat, casi todos los frameworks C2 requieren de un generador de payloads especial. Esto suele ser una funcionalidad construida en el framework. Por ejemplo, Metasploit es un framework C2 que tiene su propio generador: MSFVenom.

!**Pasted image 20260513152542.png**

Entonces, ¿qué hace a los frameworks C2 mejor que un Netcat listener normal? Parece que todo lo que necesitas hacer es integrar un gestor de sesiones en Netcat y ya está, ¿verdad? Aunque así es, la mayoría de frameworks C2 brillan en la fase de post explotación.

------------------------------
<h2>Estructura Command and Control</h2>
<h3>Servidor C2</h3>
Para poder entender los frameworks Command and Control, debemos empezar entendiendo los varios componentes de un servidor C2. Comencemos pues con el más esencial: el propio servidor C2. El servidor C2 sirve como un hub al que los agentes llaman de vuelta. Los agentes periódicamente intentan conectarse al C2 y esperan los comandos del operador.

!**Pasted image 20260513184454.png**

<h3>Agentes/Payloads</h2>
Un agente es un programa generado por el framework C2 que llama de vuelta al listener del servidor C2. La mayor parte del tiempo, este agente habilita funcionalidades especiales comparado a la reverse shell estándar. La mayoría de los frameworks C2 implementan pseudocomandos para hacer la vida del operador del C2 más fácil. Algunos ejemplos de esto pueden ser pseudocomandos para descargar o subir un archivo al sistema. Es importante saber que los agentes pueden ser altamente configurables, con ajustes del timing sobre cada cuánto estos agentes intentan comunicarse con el servidor y mucho más.

<h3>Listeners</h3>
En los niveles más básicos, un listener es una aplicación corriendo en el servidor C2 que espera la conexión de vuelta en un puerto o protocolo específico. Algunos ejemplos son DNS, HTTP y HTTPS.

<h3>Beacons</h3>
Un beacon es el proceso de un agente C2 llamando de vuelta al servidor C2.

--------------------------------------
<h2>Ofuscar las Llamadas de los Agentes</h2>
<h3>Temporizadores de Sleep</h2>
Una cosa clave que algunos analistas de seguridad, antivirus y NGFWs miran cuando intentan identificar tráfico C2 es el beaconing y la tasa con la que un dispositivo hace beacon a un servidor C2. Digamos que un firewall observa el tráfico que se ve así:

- TCP/443 - Duración de Sesión 3s, 55 paquetes mandados, 10:00:05.000
- TCP/443 - Duración de Sesión 2s, 33 paquetes mandados, 10:00:10.000
- TCP/443 - Duración de Sesión 3s, 55 paquetes mandados, 10:00:15.000
- TCP/443 - Duración de Sesión 1s, 33 paquetes mandados, 10:00:20.000
- TCP/443 - Duración de Sesión 3s, 55 paquetes mandados, 10:00:25.000

Un patrón comienza a formarse. El agente hace beacon cada 5 segundos; esto significa que tiene un temporizador de sleep de 5 segundos.

<h3>Jitter</h3>
El jitter coge el sleep timer y le añade algo de variación, por lo que el beaconing C2 ahora puede verse de la siguiente manera:

- TCP/443 - Duración de Sesión 3s, 55 paquetes mandados, 10:00:03.580
- TCP/443 - Duración de Sesión 2s, 33 paquetes mandados, 10:00:13.213
- TCP/443 - Duración de Sesión 3s, 55 paquetes mandados, 10:00:14.912
- TCP/443 - Duración de Sesión 1s, 33 paquetes mandados, 10:00:23.444
- TCP/443 - Duración de Sesión 3s, 55 paquetes mandados, 10:00:27.182

El beaconing está ahora configurado con un patrón semirregular que hace ligeramente más difícil la detección entre el tráfico normal. En frameworks más avanzados puede ser posible alterar varios parámetros más, como "File" jitter o añadir junk data al payload o archivos que están siendo transmitidos para hacer que parezcan más grandes de lo que realmente son.

Ejemplo de código en Python3 de cómo puede verse el Jitter:

```python
import random
sleep = 60
jitter = random.randint(-30,30)
sleep = sleep + jitter
```

Es importante percatarse de que este es un ejemplo fundamental, pero puede tener mucha más profundidad, configurando fronteras superiores e inferiores, tomando porcentajes y construyendo desde ahí.

------------------------------------------
<h2>Tipos de Payloads</h2>
Bastante parecido a una reverse shell, hay dos tipos primarios de payloads que puedes usar en tu framework C2:

- Staged
- Stageless

<h3>Payloads Stageless</h3>
Los payloads stageless son los más simples. Contienen el agente C2 entero y llamarán de vuelta al servidor C2 para comenzar el beaconing inmediatamente. Puedes referirte al diagrama de abajo para ganar algo de entendimiento en cómo operan estos payloads.

!**Pasted image 20260513190250.png**

Los pasos para establecer un beaconing de C2 con un payload stageless es de la siguiente manera:

1. La víctima se descarga y ejecuta el Dropper.
2. El beaconing al C2 comienza.

<h3>Payloads Staged</h3>
Los payloads staged requieren una llamada de vuelta al servidor C2 para descargar partes adicionales del agente C2. Esto es comúnmente conocido como Dropper, porque es droppeado (caído) en la víctima para descargar la segunda parte del payload staged. Este método es preferido sobre el payload stageless porque sólo una pequeña parte de código necesita ser escrita para recuperar las partes adicionales del agente C2 del servidor C2. También hace más fácil ofuscar el código para bypassear programas antivirus.

!**Pasted image 20260513191002.png**

Los pasos para establecer un beaconing C2 con un payload staged son:

1. La víctima descarga y ejecuta el Dropper.
2. El Dropper llama de vuelta al servidor C2 para descargar la segunda fase.
3. El servidor C2 manda la fase 2 de vuelta a la víctima.
4. La segunda fase se carga en memoria en la víctima.
5. Comienza la inicialización del beaconing C2.

-----------------------------------------
<h2>Formatos de Payloads</h2>
Como debes saber, los archivos Windows PE (ejecutables) no son la única manera de ejecutar código en un sistema. Algunos frameworks C2 soportan payloads en otros varios formatos, por ejemplo:

- Scripts PowerShell
- Archivos HTA
- Aplicaciones/Scripts Visual Basic
- Documentos Microsoft Office

Y muchos más.

---------------------------
<h2>Módulos</h2>
Los módulos son el componente clave de cualquier framework C2; añaden la habilidad de hacer a los agentes y servidor C2 más flexibles. Dependiendo del framework C2, los scripts pueden ser escritos en varios lenguajes. Cobalt Strike tiene "Aggressor Scripts", los cuales son escritos en "Aggressor Scripting Language". PowerShell Empire tiene soporte para múltiples lenguajes, Los módulos de Metasploit están escritos en Ruby, y muchos otros se escriben en otros lenguajes.

--------------------------------
<h2>Módulos Post Explotación</h2>
Los módulos post explotación son simplemente módulos que se encargan de cualquier cosa después del punto inicial de compromiso, esto puede ser tan simple como ejecutar `SharpHound.ps1` para encontrar maneras de movimiento lateral, o podría ser tan complejo como dumpear LSASS y parsear las credenciales en memoria.

------------------------------------------
<h2>Módulos de Pivotaje</h2>
Uno de los últimos gran componentes de un framework C2 son los módulos de pivotaje, haciendo más fácil acceder a segmentos restringidos de red en un framework C2. Si tienes acceso administrativo en un sistema puedes ser capaz de abrir un "Beacon SMB", lo que puede habilitar a la máquina a actuar como proxy vía el protocolo SMB. Esto puede permitir que máquinas en un segmento de red restringido se comuniquen con tu servidor C2.

!**Pasted image 20260513192757.png**

El diagrama de arriba muestra cómo los hosts en una red restringida llaman de vuelta al servidor C2:

1. La víctima llama a una named pipe SMB en otra víctima en un segmento de red no restringido.
2. La víctima en el segmento de red no restringido llama al servidor C2 con un beacon estándar.
3. El servidor C2 manda comandos de vuelta a la víctima en el segmento de red no restringido.
4. La víctima en el segmento de red no restringido lo redirige hacia hosts en segmentos de red restringidos.

-------------------------------------------
<h2>Haciéndole Frente al Mundo</h2>
Un obstáculo importante que los red teamers deben sobrepasar es colocar la infraestructura a plena vista. Hay muchos métodos diferentes de hacer esto; uno de los más populares se llama "Domain Fronting".

<h3>Domain Fronting</h3>
El domain fronting utiliza un host conocido (como por ejemplo Cloudflare). Cloudflare ejecuta un negocio que ofrece métricas mejoradas en detalles de conexión HTTP y cachea las peticiones de conexión HTTPS para ahorrar ancho de banda. Los red teamers pueden abusar esto para que parezca que la estación de trabajo se está comunicando con una dirección IP conocida y confiable. Los resultados de geolocalización mostrarán dónde está el servidor de Cloudflare más próximo y la dirección IP mostrará pertenencia a Cloudflare.

!**Pasted image 20260513193425.png**

El diagrama de arriba muestra cómo funciona el Domain Fronting:

1. El operador C2 tiene un dominio que hace proxy de las peticiones a través de Cloudflare.
2. La víctima hace beacon al Domain C2.
3. Cloudflare hace proxy de las peticiones, luego mira los headers del Host y redirige el tráfico al servidor correcto.
4. El servidor C2 responde entonces a Cloudflare con comandos C2.
5. La víctima recibe el comando de Cloudflare.

<h3>Perfiles C2</h3>
La siguiente técnica se conoce por varios nombres dependiendo del producto. "NGINX Reverse Proxy", "Apache Mod_Proxy/Mod_Rewrite", "Malleable HTTP C2 Profiles", y muchos otros. Sin embargo, son más o menos lo mismo. Todas las funcionalidades del Proxy más o menos permiten a un usuario controlas elementos específicos de la petición HTTP entrante. Digamos que una conexión entrante tiene un header `X-C2-Server`; podríamos extraer explícitamente este header usando tecnología específica que esté a nuestra disposición (Reverse Proxy, Mod_Proxy/Rewrite, Malleable C2 Profile, etc.) y asegurar que nuestro servidor C2 responda con respuestas basadas en C2. Mientras que si un usuario normal hiciera query al servidor HTTP, podrían ver una página genérica. Esto es todo dependiente de tu configuración.

!**Pasted image 20260513194026.png**

El diagrama de arriba muestra cómo los perfiles C2 funcionan:

1. La víctima hace beacon al servidor C2 con un header personalizado en la petición HTTP, mientras que un SOC tiene una petición HTTP normal.
2. La petición es hecha proxy mediante Cloudflare.
3. El servidor C2 recibe la petición y busca headers personalizados y luego evalúa cómo responder basado en el perfil C2.
4. El servidor C2 responde al cliente y responde al dispositivo comprometido.

Debido a que las peticiones HTTPS son encriptadas, extraer headers específicos (como X-C2-Server) puede ser imposible. Usando perfiles C2, podemos ser capaces de esconder nuestro servidor C2 de los ojos curiosos del analista. Para más información sobre los perfiles C2 puedes visitar este [artículo](https://blog.zsec.uk/cobalt-strike-profiles/).