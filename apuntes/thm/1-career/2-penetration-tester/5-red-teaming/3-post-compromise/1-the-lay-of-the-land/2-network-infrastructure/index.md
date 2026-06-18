---
layout: apunte
title: "2. Network Infrastructure"
---

Una vez llegado a la red desconocida, nuestro primer objetivo es identificar dónde estamos y dónde podemos llegar. Durante el engagement de red team, necesitamos entender con qué sistema estamos lidiando, qué servicio ofrece la máquinay en qué tipo de red estamos. Por ello, la enumeración de la máquina comprometida después del acceso inicial es clave para responder a estas preguntas.

La segmentación de red es una capa de seguridad de red extra dividida en múltiples subredes. Es usada para mejorar la seguridad y gestión de la red. Por ejemplo, si es usada para prevenir acceso no autorizado a los activos más valiosos de la compañía como información de clientes, registros financieros, etc.

La VLAN (Virtual Local Area Network) es una técnica de red usada en la segmentación para controlar problemas de red, como broadcasting en la red local y mejorar la seguridad. Los hosts dentro de la VLAN sólo pueden comunicarse con otros hosts en la misma red VLAN.

---------------------------------------
<h2>Redes Internas</h2>
Las redes internas son subredes que están segmentadas y separadas basadas en la importancia del dispositivo interno o de la importancia de la accesibilidad a su información. El propósito principal de las redes internas es compartir información, comunicaciones más rápidas y fáciles, herramientas de colaboración, sistemas operativos y redes con organizaciones. En una red corporativa, los administradores de red tratan de usar segmentación de red por varios motivos, incluyendoo el control del tráfico de red, mejorar el rendimiento y mejorar la seguridad.

!**Pasted image 20260617194335.png**

Este diagrama es un ejemplo del concepto de segmentación de red, ya que está dividida en dos subredes. La primera es para las estaciones de trabajo de los empleados y dispositivos personales. La segunda es para dispositivos internos y privados que ofrecen servicios como DNS, web interna, servicios de email, etc.

---------------------------------------
<h2>Zona Desmilitarizada (DMZ)</h2>
Una red DMZ es la frontera de la red que protege y añade una capa de seguridad extra al área de red interna local de una compañía de tráfico no confiable. Un diseño común de DMZ es una subred que se pone entre el internet público y las redes internas.

Diseñar una red en la compañía depende de sus requerimientos y necesidades. Por ejemplo, supón una compañía que ofrece servicios públicos como sitios web, DNS, FTP, Proxy, VPN, etc. En ese caso, pueden diseñar una red DMZ para aislar y habilitar control de acceso de la red pública.

!**Pasted image 20260617194841.png**

Este diagrama representa el tráfico de red a la DMZ en rojo, el cual no es confiable (viene directo de internet). El tráfico verde entre la red interna es el tráfico controlado que puede ir por uno o más dispositivos de seguridad de red.

Enumerar el sistema y su red interna en la fase de descubrimientoo, permite al atacante aprender sobre el sistema y su red interna. Basado en la información ganada, lo usamos para realizar movimiento lateral o escalada de privilegios.

---------------------------------------------------
<h2>Enumeración de Red</h2>
Hay varias cosas a comprobar en relación a aspectos de red como puertos TCP y UDP y conexiones establecidas, tablas de enrutamiento, tablas ARP, etc.

Comencemos por comprobar los puertos TCP y UDP abiertos. Podemos hacer esto usando `netstat`:

```powershell
PS C:\Users\thm> netstat -na

Active Connections

  Proto  Local Address          Foreign Address        State
  TCP    0.0.0.0:80             0.0.0.0:0              LISTENING
  TCP    0.0.0.0:88             0.0.0.0:0              LISTENING
  TCP    0.0.0.0:135            0.0.0.0:0              LISTENING
  TCP    0.0.0.0:389            0.0.0.0:0              LISTENING
```

El output revela los puertos abiertos así como las conexiones estableciidas. Después vamos a listar la tabla ARP, la cual contiene la dirección IP y la dirección MAC de los ordenadores que se han comunicado con las máquinas en la red. Esto podría ser útil para ver las comunicaciones en la red para escanera otras máquinas en busca de puertos abiertos y vulnerabilidades.

```powershell
PS C:\Users\thm> arp -a

Interface: 10.10.141.51 --- 0xa
  Internet Address      Physical Address      Type
  10.10.0.1             02-c8-85-b5-5a-aa     dynamic
  10.10.255.255         ff-ff-ff-ff-ff-ff     static
```

--------------------------------------------
<h2>Servicios de Red Internos</h2>
Ofrece acceso a comunicaciones privadas e internas de dispositivos de red. Un ejemplo de servicios de red es el DNS interno, servidores web, aplicaciones personalizadas, etc. Es importante darse cuenta de que los servicios de red interna no son accesibles desde fuera de la red. Sin embargo, una vez tengamos acceso inicial a una de las redes que acceden a estos servicios, podremos llegar a ellos y comunicarnos.

