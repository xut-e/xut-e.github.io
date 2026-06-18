---
layout: apunte
title: "4. Users and Groups Management"
---

En esta tarea, aprenderemos más sobre usuarios y grupos, especialmente del AD. Al recolectar información de una máquina comprometida es esencial que podamos usarla en la siguiente fase. El descubrimiento de cuentas es el primer paso después de haber ganado acceso inicial a la máquina comprometida para entender qué tenemos y qué otras cuentas hay en el sistema.

Un directorio activo contiene varias cuentas con los permisos acceso y roles diferentes necesarios para diferentes propósitos. Las cuentas de servicio de AD comunes incluyen cuentas de usuarios locales, cuentas de usuarios de dominio, cuentas de servicios controlados y cuentas virtuales.

- Las cuentas de usuarios preinstaladas se usan para gestionar el sistema localmente, lo que no es parte del directorio AD.
- Las cuentas de usuario de dominio con acceso activo a dicho dominio pueden usar servicios AD.
- Las cuentas de servicio gestionadas son cuentas de usuario de dominio limitadas con mayores privilegios para manejar los servicios AD.
- Los administradoores de dominio usan cuentas que gestionan información en el entorno del directorio activo, incluyendo configuraciones AD, usuarios, grupos, permisos, roles, servicios, etc. Uno de los objetivos del red team durante el engagement es cazar la información que lleva al administrador de dominio a tener control completo sobre el entorno del directorio activo.

Las siguientes son cuentas de los administradores del AD:

| Tipo de Cuenta        | Privilegios                                                    |
| --------------------- | -------------------------------------------------------------- |
| BUILTIN\Administrator | Acceso admin local al controlador de dominio.                  |
| Domain Admins         | Acceso administrativo a todos los recursos del dominio.        |
| Enterprise Admins     | Disponible sólo en la raíz del bosque.                         |
| Schema Admins         | Capaz de modificar dominio/bosque; útil para los red teamers.  |
| Server Operators      | Puede gestionar servidores de dominio.                         |
| Account Operators     | Puede gestionar usuarios que no están en grupos privilegiados. |

Ahora que hemos visto las diferentes cuentas en el entorno AD, vamos a enumerar la máquian Windows que tenemos. Como usuario actual, tenemos ciertos permisos para ver o gestionar ciertas cosas en la máquina y el AD.

---------------------------------------
<h2>Enumeración de Directorio Activo</h2>
Ahora, enumerar el entorno AD requiere herramientas y técnicas diferentes. Una vez que confirmamos que la máquina es parte de un entorno AD, podemos empezar a buscar cualquier información variable que pueda ser utilizada más adelante. En esta fase, usamos PowerShell para enumerar usuarios y grupos.

El siguiente comando es para obtener todas las cuentas de directorio activo.

>[!NOTE] Ten en cuenta que tenemos que usar el argumento `-Filter`.

```powershell
PS C:\Users\thm> Get-ADUser  -Filter *
DistinguishedName : CN=Administrator,CN=Users,DC=thmredteam,DC=com
Enabled           : True
GivenName         :
Name              : Administrator
ObjectClass       : user
ObjectGUID        : 4094d220-fb71-4de1-b5b2-ba18f6583c65
SamAccountName    : Administrator
SID               : S-1-5-21-1966530601-3185510712-10604624-500
Surname           :
UserPrincipalName :
PS C:\Users\thm>
```

También podemos usar la estructura de árbol jerárquica para encontrar a un usuario en el entorno AD. El DN (Distinguished Name), es una colección de pares clave-valor separados por comas usado para identificar registros únicos en el directorio. El DN consta de Domain Component (DC), OrganizationalUnitName (OU), Common Name (CN) y otros. El siguiente: `"CN=User1,CN=Users,DC=thmredteam,DC=com"` es un ejemplo de DN.

!**Pasted image 20260617221552.png**

Usando la opción `SearchBase`, especificamos un Common-Name `CN` en el directorio activo. Por ejemplo, podemos especificar listar cualquie usuario que parta de `Users`.

```powershell
PS C:\Users\thm> Get-ADUser -Filter * -SearchBase "CN=Users,DC=THMREDTEAM,DC=COM"


DistinguishedName : CN=Administrator,CN=Users,DC=thmredteam,DC=com
Enabled           : True
GivenName         :
Name              : Administrator
ObjectClass       : user
ObjectGUID        : 4094d220-fb71-4de1-b5b2-ba18f6583c65
SamAccountName    : Administrator
SID               : S-1-5-21-1966530601-3185510712-10604624-500
Surname           :
UserPrincipalName :
```

>[!NOTE] Ten en cuenta que el resultado puede contener más de un usuario dependiendo de la configuración del CN.

