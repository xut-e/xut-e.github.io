---
layout: apunte
title: "6. Authentification Methods"
---

Al usar dominios de Windows, todas las credenciales se guardan en los DCs. Cuando un usuario se autentifica en un servicio usando credenciales, el servicio le pregunta al DC si la verificación es correcta. Se utilizan dos protocolos para la autentificación en WD:

- Kerberos: Usado por cualquier versión reciente de Windows. Es el protocolo por defecto en cualquier dominio reciente.
- NetNTLM: Protocolo de autentificación de legado, mantenido sólo por propósitos de compatibilidad.

-------------------
<h2>Autentificaión Kerberos</h2>
Sigue el siguiente proceso:

1. El usuario manda el nombre de usuario y un instante de tiempo encriptado usando una llave derivada de su contraseña al KDC (Key Distribiution Center), un servicio instalado en el DC.
   
   El KDC crea y manda de vuelta  el TGT (Ticket Granting Ticket) que permitirá al usuario pedir otros tickets para acceder a servicios específicos. Puede que esta idea parezca rara, pero permite al usuario pedir otros tickets sin necesidad de estar constantemente enviando credenciales. Junto con el TGT, una llave de sesión (Session Key) es dada al usuario.
   
   >[!NOTE] Fíjate que el TGT es encriptado usando el hash krbtgt de la contraseña.
   
   ![](/apuntes/img/064.png)
2. Cuando un usuario quiere conectarse a un servicio de la red usará su TGT para pedirle al KDC por un TGS (Ticket Granting Service). Estos son tickets que permiten la conexión sólo al servicio específico para el que fue creado.
   
   Para pedir un TGS, el usuario mandará su nombre de usuario y un instante de tiempo encriptado usando la llave de sesión junto con el TGT y el SPN (Service Principal Name).
   
   Como resultado, el KDC mandará junto al TGT una Service Session Key. El TGS está encriptado usando una llave derivada del Hash del Propietario del dominio.
   
   ![](/apuntes/img/065.png)
3. El TGS puede ser mandado al servicio deseado para autentificarse y establecer una conexión. El servicio usará los hashes de las contraseñas de sus cuentas configuradas para desencriptar el TGS y validar la llave de sesión de servicio.
   
   ![](/apuntes/img/066.png)

------------------
<h2>Autentificación NetNTLM</h2>
El proceso es el siguiente:

![](/apuntes/img/067.png)

1. El cliente manda una petición de verificación al servidor al que quieren acceder.
2. El servidor genera un número aleatorio y lo manda como reto al cliente.
3. El cliente combina el hash de su contraseña NTLM con el reto mandado para generar una respuesta y la manda al servidor de vuelta.
4. El servidor manda el reto y la respuesta al DC para verificación.
5. El DC usa el reto para recalcular la respuesta y la compara con la mandada. Si coinciden, se autentifica al usuario, y si no se rechaza.
6. El servidor manda el resultado de la comparativa al cliente.