---
layout: apunte
title: "4. Packet Navigation"
---

<h2>Números de Paquetes</h2>
Wireshark calcula el número de paquetes investigados y asigna un número único a cada paquete. Esto hace sencillo ir a un paquete concreto.

--------------------
<h2>Ir a un Paquete</h2>
No sólo sirven los números para conocer el total de estos, sino para hacer más sencillo encontrar e investigar paquetes específicos. Además contiene un sistema de seguimiento que te permite moverte entre los paquetes de una misma "conversación". Para ello puedes pulsar en `Go` o escribir `frame.number == <número>`.

------------------
<h2>Encontrar Paquetes</h2>
A parte del número de paquete, Wireshark puede encontrar paquetes por contenido. Para ello podemos usar `Edit -> Find Packet`. Esto facilita a los analistas encontrar un evento particular.

Hay dos puntos cruciales para encontrar paquetes:

- El primero es saber el tipo de input (Display filter, Hex, String y RegEx). Las búsquedas son case insensitive pero se puede cambiar haciendo click en el botón de radio.
- El segundo es elegir el campo de búsqueda. Puedes llevar a cabo búsquedas en la lista de paquetes, los detalles del paquete y los bytes de paquetes y es de crucial importancia. 
  
  ![](/apuntes/img/107.png)

-------------------
<h2>Marcar Paquetes</h2>
Es otra funcionalidad útil para los analistas. Podemos encontrar/apuntar a un paquete específico marcándolo. Se puede desmarcar editándolo. Los paquetes marcados aparecen en negro.

![](/apuntes/img/108.png)

-------------------
<h2>Comentarios de Paquetes</h2>
Podemos añadir comentarios a los paquetes que consideremos para ayudar a la investigación posterior o recordar algo. Al contrario que el marcado de paquetes, los comentarios pueden pueden permanecer en la captura hasta que alguien los elimina.

![](/apuntes/img/109.png)

------------------
<h2>Exportar Paquetes</h2>
A veces es necesario separar ciertos paquetes para su análisis del resto de la captura, que puede ser inmensamente grande. Esta funcionalidad permite la selección de ciertos paquetes sospechosos (decided scope). Para ello podemos usar el menú `File -> Export Specified Packets`.

![](/apuntes/img/110.png)

-----------------
<h2>Exportar objetos (archivos)</h2>
Wireshark puede extraer archivos transferidos a trabes de la red. Para un analista de seguridad es clave descubrir qué archivos son compartidos y guardarlos para una posterior investigación. Los tipos de archivos que pueden extraerse son DICOM, HTTP, IMF, SMB y TFTP. Para acceder: `File -> Export Objects`.

![](/apuntes/img/111.png)

-----------------
<h2>Formato de muestra de Tiempo</h2>
Wireshark lista los paquetes a la vez que son capturados, lo que no siempre es óptimo como visualización para la investigación. Por defecto, Wireshark muestra el tiempo en "Segundos desde el inicio de la Captura". El uso común es usar el formato UTC Time Display. Para hacerlo: `View -> Time Display Format`.

![](/apuntes/img/112.png)

![](/apuntes/img/113.png)

-----------------
<h2>Información para Expertos</h2>
Wireshark también detecta estados específicos de protocolos para ayudarte a detectar y analizar posibles anomalías y problemas. Hágase notar que esto son sólo sugerencias.

| **Severity** | **Colour**   | **Info**                                                                  |
| ------------ | ------------ | ------------------------------------------------------------------------- |
| **Chat**     | **Azul**     | Información de flujo normal.                                              |
| **Note**     | **Cian**     | Eventos notables como errores de código de aplicación.                    |
| **Warn**     | **Amarillo** | Advertencias como errores de código inusuales o problemas de declaración. |
| **Error**    | **Rojo**     | Problemas como paquetes mal formados.                                     |
Algunos de los grupos de información son:

| **Grupo**      | **Info**                          |
| -------------- | --------------------------------- |
| **Checksum**   | Errores de checksum.              |
| **Comment**    | Detección de paquete comentado.   |
| **Deprecated** | Uso de protocolo deprecado.       |
| **Malformed**  | Detección de paquete mal formado. |
Para verlo podemos hacer uso del botón en la esquina inferior izquierda o `Analyze -> Expert Information`.

![](/apuntes/img/114.png)