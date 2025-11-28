---
layout: apunte
title: "1. Windows Privilege Escalation"
---

Dicho de manera simple, la escalada de privilegios consiste en usar el acceso dado a un host con el usuario A para ganar acceso al usuario B para, eventualmente, obtener permisos de administrador. Aunque queremos llegar a root, puede que tengamos que escalar a otras cuentas intermedias (sin privilegios) antes de encontrar un vector de escalada a root.

Ganar acceso a las diferentes cuentas puede ser tan simple como encontrar credenciales en archivos de texto u hojas de cálculo, pero ese no siempre será el caso.

Dependiendo de la situación podemos necesitar abusar alguna de las siguientes debilidades:

- Malas configuraciones en servicios de Windows o tareas programadas.
- Privilegios excesivos otorgados a nuestra cuenta.
- Software vulnerable.
- Perderse parches de seguridad de Windows.

Antes de ver las técnicas, echemos un vistazo a diferentes tipos de cuenta en un sistema Windows.

---------------------------------------------
<h2>Usuarios de Windows</h2>
Los sistemas Windows tienen principalmente 2 tipos de usuarios. Dependiendo del nivel de acceso, podemos categorizarlos en:

| Usuario            | Explicación                                                                                                                                                                                              |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Administrators** | Estos usuarios tienen los mayores privilegios. Pueden cambiar cualquier parámetro de configuración y acceder a cualquier archivo del sistema.                                                            |
| **Standard Users** | Estos usuarios pueden acceder al ordenador pero sólo realizar tareas limitadas. Típicamente estos usuarios no pueden hacer cambios permanentes o esenciales al sistema y están limitados a sus archivos. |

Cualquier usuario con privilegios administrativos, será parte del grupo **Administrators**.