---
layout: apunte
title: "3. Enumeration through Microsoft Management Console"
---

<h2>Consola de Gestión de Microsoft</h2>
En esta tarea, exploraremos nuestro primer método de enumeración, el cual es el único método que hace uso de una GUI. Usaremos la Microsoft Management Console (MMC) con los Snap-Ins AD de [Remote Server Administration Tools](https://docs.microsoft.com/en-us/powershell/module/activedirectory/?view=windowsserver2022-ps) (RSAT). Si usas la máquina dada (THMJMP1), ya lo tiene instalado. Si usas tu propia máquina, puedes instalarlo de la siguiente manera:

1. Presiona `Start`.
2. Busca `"Apps & Features"` y presiona enter.
3. Presiona `Manage Optional Features`.
4. Presiona `Add a feature`.
5. Busca `"RSAT"`.
6. Selecciona `"RSAT: Active Directory Domain Services and Lightweight Directory Tools"` y presiona `Install`.

Puedes arrancar la MMC usando el botón de inicio de Windows, buscando run y escribiendo MMC. Si queremos ejecutar MMC de forma normal, no funcionaría ya que nuestro ordenador no está unido al dominio y nuestra cuenta local no puede autentificarse al dominio.

!**Pasted image 20260805140444.png**

Aquí es don de la ventana de Runas de la tarea anterior entra en juego. En esa ventana podemos empezar la MMC, la cual se asegurará de que todas las conexiones MMC de red usarán nuestras credenciales AD inyectadas.

En MMC, podemos ahora adjuntar el Snap-In AD RSAT:

1. Presionamos `File` -> `Add/Remove Snap-in`.
2. Seleccionamos y añadimos tres Snap-ins de Active Directory.
3. Hacemos click a través de cualquier error y aviso.
4. Click derecho en `Active Directory Domains and Trusts` y seleccionamos `Change Forest`.
5. Introduce `za.tryhackme.com` como `Root Domain` y haz click en `OK`.
6. Click derecho en `Active Directory Sitess and Services` y selecciona `Change Forest`.
7. Introduce `za.tryhackme.com` como `Root Domain` y haz click en `OK`.
8. Click derecho en `Active Directory Users and Computers` y selecciona `Change Domain`.
9. Introduce `zaz.tryhackme.com` como el `Domain` y haz click en `OK`.
10. Click derecho en `Active Directory Users and Computers` en el panel de la izquierda.
11. Click en `View` -> `Advanced Features`.

Si todo hasta aquí ha funcionado correctamente, tu MMC debería estar apuntada a y autentificada en el dominio objetivo.

!**Pasted image 20260805141841.png**

Ahora podemos comenzar a enumerar información sobre la estructura AD.

-------------------------------------------
<h2>Usuarios y Ordenadores</h2>
Vamos a echar un vistazo a la estructura de Active Directory. Para esta tarea, nos centraremos en los usuarios y ordenadores del AD. Expande el snap-in y expande el dominio za para ver la estructura inicial de OUs:

!**Pasted image 20260805142051.png**

Vamos a echar un vistazo al directorio `People`. Aquí vemos que los usuarios están divididos de acuerdo a las OUs del departamento. Hacer click en estas OUs nos muestra a los usuarios que pertenecen al departamento.

!**Pasted image 20260805142341.png**

Hacer click en cualquiera de estos usuarios nos permite ver sus propiedades y atributos. También podemos ver de qué grupos forman parte:

!**Pasted image 20260805142552.png**

También podemos usar la MMC para encontrar hosts en el entorno. Si hacemos click en sus servidores o estaciones de trabajo, una lista de máquinas unidas al dominio se despliegan.

!**Pasted image 20260805142638.png**

Si tenemos permisos relevante, podemos tambíen usar la mMC para hacer cambios directos al AD, como cambiar la contraseña de un usuario o añadir una cuenta a un grupo específico.

---------------------------------------
<h2>Beneficios</h2>
- La GUI proporciona un método excelente para ganar una vista holística del entorno AD.
- La búsqueda rápida de diferentes objetos AD.
- Ofrece un método directo de ver actualizaciones epecíficas de los objetos AD.
- Si tenemos suficientes privilegios, podemos actualizar los objetos AD existentes o añadir nuevos.

-----------------------------------------
<h2>Desventajas</h2>
- La GUI requiere acceso RDP a la máquina donde se ejecuta.
- Aunque buscar un obeto es rápido, recopilar propiedades o atributos AD no puede ser realizado.

