---
layout: apunte
title: "3. Windows Event Logs Analysis"
---

Como otros sistemas operativos, Windows OS también registra muchas de las actividades que toman lugar. Estos se almacenan en archivos de log segregados, cada uno con una categoría. Algunos de los tipos de logs cruciales son:

- **Aplicaciones:** Hay muchas aplicaciones correndo en el sistema operativo. Cualquier información relacionada con estas aplicaciones se registra en este archivo.
- **Sistema:** El sistema operativo tiene diferentes operaciones corriendo. Cualquier información relacionada con estas operacioness se registra en este archivo.
- **Seguridad:** Es el archivo de log más importante de Windows. Registra cualquier actividad relacionada con la seguridad.

A parte de estos, muchos otros archivos de log en Windows están diseñados para registrar actividades relacionadas a acciones y aplicaciones específicas .

Al contrario que otros archivos de log estudiados en las teras anteriores, Windows tiene una utilidad llamada Event Viewer, que nos da una interfaz gráfica para ver y buscar logs.

Para abrirlo, hacemos click en el botón de Windows y escribimos 'Event Viewer' y abrirá el Visor de Eventos. La parte en amarillo muestra los diferentes logs disponibles.

!**Pasted image 20251022164251.png**

Si haces click en `Windows Logs`, verás los diferentes tipos de logs que hemos visto al comienzo de la actividad. La primera porción resaltada muestra los diferentes tipos de logs. Cuando hacemos click en uno de ellos, veremos los diferentes logs, como se ve en la segunda parte resaltada. Finalmente, en la tercera porción tenemos diferentes opciones de análisis de logs.

!**Pasted image 20251022165814.png**

Veamos el contenido de alguno de ellos:

!**Pasted image 20251022165832.png**

Así es como un log de evento se ve en Windows. Tiene diferentes campos, pero veremos los siguientes:

- **Description:** Este campo tiene información detallada de la actividad.
- **Log Name:** Indica el nombre del archivo log.
- **Logged:** Indica la hora de la actividad.
- **Event ID:** Los IDs de eventos son identificadores únicos de una actividad específica.

Numerosos IDs de evento están disponibles en los logs de eventos de Windows. Podemos usar estos IDs para buscar cualquier actividad en específico. Por ejemplo, el evento ID 4624 identifica una actividad de inicio de sesión exitoso, por lo que sólo necesitamos buscar 4624 al investigar un inicio de sesión exitoso.

Aquí hay una tabla de IDs de eventos importantes:

| Event ID | Description                                           |
| -------- | ----------------------------------------------------- |
| 4624     | Un usuario ha iniciado sesión de forma exitosa.       |
| 4625     | Un usuario ha fallado el intento de inicio de sesión. |
| 4634     | Una cuenta de usuario se cerró exitosamente.          |
| 4720     | Una cuenta de usuario fue creada.                     |
| 4724     | Se intentó resetear la contraseña de un usuario.      |
| 4722     | Se habilitó una cuenta de usuario.                    |
| 4725     | Se deshabilitó una cuenta de usuario.                 |
| 4726     | Se borró una cuenta de usuario.                       |
Hay muchos más IDs de eventos. No es necesario recordarlos todos pero es bueno conocer algunos clave.

El visor de eventos nos permite buscar entre los logs relacionados a un ID de evento específico con la funcionalidad `Filter Current Log`. Podemos hacer click en esta funcionalidad para aplicar cualquier filtro:

!**Pasted image 20251022175353.png**

Cuando hacemos click en `Filter Current Log`, se nos pedirá ingressar el ID de evento que queremos filtrar. Aquí debajo un ejemplo del filtrado por ID `4624`:

!**Pasted image 20251022175549.png**
!**Pasted image 20251022175603.png**

------------------------------
<h2>Ejercicio</h2>
El viernes, una rganización crítica reportó haber sido víctima de un ciberataque. En la investigación se encontró que información crítica fue exfiltrada de un servidor de archivos de la red de la organización. El equipo de seguridad determinó exitosamente el nombre y la IP del usuario del sistema comprometido en la red, que tuvo acceso a dicho servidor.

Tu trabajo es investigar y encontrar las actividades del atacante en este sistema comprometido antes de que ganase acceso al servidor.

1. Entramos en la máquina por `xfreerdp3`:
   !**Pasted image 20251022181211.png**
   !**Pasted image 20251022181536.png**
2. Entramos en el Event Viewer:
   !**Pasted image 20251022181658.png**
3. Buscamos por código 4720 para ver las cuentas creadas:
   !**Pasted image 20251022181848.png**
4. Pinchamos en la última creada y miramos el nombre de usuario de la nueva cuenta:
   !**Pasted image 20251022182049.png**
5. Miramos quién creó la cuenta:
   !**Pasted image 20251022182131.png**
6. Miramos cuándo se activó la cuenta:
   !**Pasted image 20251022182321.png**
7. Filtramos por código `4724` parra ver intentos de cambios de contraseña:
   !**Pasted image 20251022182632.png**
8. Vemos que efectivamente sí que se cambió:
   !**Pasted image 20251022182714.png**

