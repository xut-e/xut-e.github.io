---
layout: apunte
title: "2. Getting the Flags"
---

<h2>Reconocimiento Inicial</h2>
Comenzamos escaneando los puertos abiertos.

!**Pasted image 20261001100848.png**

Ahora vamos a analizar dichos puertos más en profundidad.

!**Pasted image 20261001103317.png**
!**Pasted image 20261001103350.png**

Y con el puerto UDP.

!**Pasted image 20261001103435.png**

Vamos a  ver qué directorios puede haber.

!**Pasted image 20261001100611.png**

No parece haber nada interesante. Vamos a buscar posibles subdominios.

!**Pasted image 20261001104013.png**

Y con `gobuster` tampoco.

!**Pasted image 20261001100720.png**

No vemos nada tampoco. Vamos a ver cómo es la web.

!**Pasted image 20261001100744.png**

Aquí no hay nada. Pulsar en cualquier sitio te lleva directo a una página legítima de Microsoft IIS.

-----------------------------
<h2>Profundización</h2>
Vamos a añadir el dominio y el DC a `/etc/hosts` y a mirar qué hay en SMB.

!**Pasted image 20261001104607.png**

No hay ninguna compartición que no sea por defecto y además no tenemos permisos para leerlas. Vamos a realizar fuerza bruta contra SMB para buscar nombres de usuario.

!**Pasted image 20261001104811.png**

Ahora vamos a filtrar nombres de usuario y lo metemos en una lista.

!**Pasted image 20261001105047.png**

Vamos a buscar en más puertos. Nos encontramos con algo en el `389`, `LDAP`:

!**Pasted image 20261001105628.png**

Con el comando:

```bash
ldapsearch -x -H ldap://IP:PORT -b "dc=,dc="
#En dc ponemos la raíz del árbol que en este caso es thm.local, por lo que thm y local
```

Vamos a filtrar la salida por `description` ya que a veces hay notas aprovechables.

!**Pasted image 20261001105918.png**

Efectivamente hay una contraseña. Con la contraseña y la lista de usuarios vamos a realizar un ataque de password spray contra el dominio con `kerbrute`.

!**Pasted image 20261001110125.png**

Parece que no hay nada, vamos a mirar con SMB.

!**Pasted image 20261001120003.png**
!**Pasted image 20261001114314.png**

>[!CAUTION] Muy importante la flag `--continue-on-success`.

Parece que hemos encontrado dos cuentas válidas.

Vamos a ver qué hay.

!**Pasted image 20261001111459.png**

No tenemos acceso a nada interesante. Vamos a mirar qué usuarios no necesitan preautentificación para obtener su hash.

!**Pasted image 20261001112333.png**

Ahora vamos a intentar crackear todos los que hemos encontrado.

!**Pasted image 20261001112656.png**

Ninguno de los 5 sale. Hay que buscar otra ruta. Vamos a recopilar información del dominio con `bloodhound-python` aprovechando la cuenta con contraseña que tenemos.

!**Pasted image 20261001113501.png**

Ahora configuramos `BloodHound` e ingestamos la información. Ahora la exploramos.

!**Pasted image 20261001115121.png**

No parece nada interesante. Vamos a mirar a `SUSANNA`.

!**Pasted image 20261001115214.png**

Vamos a entrar con RDP a la de `SUSANNA_MCKNIGHT` a ver qué encontramos.

!**Pasted image 20261001115451.png**

Nos hemos encontrado la flag de usuario.

-----------------------------------------
<h2>Movimiento Lateral</h2>
Vamos a pasar ahora un método de análisis desde dentro de la máquina. Para ello buscamos donde está localizado `SharpHound.exe`.

!**Pasted image 20261001122555.png**

Ahora reabrimos la sesión abriendo una compartición en Windows que apunte a nuestra carpeta con el comando:

```bash
xfreerdp3 /v:ledger.thm /u:'SUSANNA_MCKNIGHT' /p:'[REDACTED]' /dynamic-resolution +clipboard /drive:sharphound,/usr/share/sharphound
```

Ahora copiamos el archivo.

!**Pasted image 20261001122959.png**

Vamos a ejecutarlo y a guardar el ZIP.

!**Pasted image 20261001123328.png**

No tenemos permiso, toca cerrar la sesión RDP y abrirla con otra carpeta.

!**Pasted image 20261001123705.png**

Ahora lo llevamos a la compartición.

!**Pasted image 20261001123753.png**

Los ingestamos en BloodHound.

!**Pasted image 20261001123911.png**

Ahora vamos a investigar sobre `SUSANNA`.

!**Pasted image 20261001124031.png**

Parece que la enumeración inicial desde fuera de la máquina se había dejado bastantes cositas.

!**Pasted image 20261001124128.png**

Parece que podemos escalar sin problema. Vamos a seguir los pasos. No conseguimos nada, hay que buscar otra ruta. Vamos a escanear más a fondo. 

!**Pasted image 20261001134145.png**

La herramienta que vamos a usar para enumerar y explotar configuraciones erróneas es `certipy-ad`.

!**Pasted image 20261001135336.png**
!**Pasted image 20261001135430.png**

Como la plantilla `ServerAuth` es vulnerable, vamos a identificarnos como `BRADLEY_ORTIZ`, que es el administrador que tiene una sesión en la máquina comprometida.

!**Pasted image 20261001135815.png**

Ahora nos identificamos con el certificado.

!**Pasted image 20261001135933.png**

Y por último usamos el hash para iniciar una shell.

!**Pasted image 20261001140118.png**

Ahora buscamos la flag.

!**Pasted image 20261001140253.png**

>[!SUCCESS] Hemos conseguido las dos flags!

