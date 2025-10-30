---
layout: apunte
title: "4. Incident Response Process"
---

En la tarea anterior hemos visto varios tipos de incidentes. A veces, manejar una variedad de incidentes en un entorno puede ser complicado. Debido a la naturaleza distintiva de los incidentes en las organizaciones, debería haber un proceso estructurado para respuesta a incidentes. Los frameworks de respuesta a incidentes nos ayudan a esto. Veremos los dos frameworks más usados: SANS y NIST.

El framework de respuesta a incidentes SANS tiene 6 fases (PICERL):

| Fase                 | Explicación                                                                                                                        | Ejemplo                                                                                       |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Preparación          | Incluye construir los recursos necesarios para manejar el incidente.                                                               | Realizar entrenamiento para empleados sobre emails de phishing.                               |
| Identificación       | Busqueda de cualquier comportamiento inusual que indique un incidente.                                                             | Ver cantidades ingentes de información ser descargadas de un ordenador.                       |
| Contención           | Suele ser hecho aislando la máquina víctima, desactivando sus cuentas, etc.                                                        | Se aísla un dispositivo de la red para no permitir al atacante pivotar.                       |
| Erradicación         | Incluye eliminar la amenaza del entorno atacado. Asegura la limpieza del entorno.                                                  | Se realiza un escaneo de malware exhaustivo en el equipo víctima.                             |
| Recuperación         | Incluye recuperar los sistemas afectados desde un backup o reconstruirlos.                                                         | El host comprometido fue reconfigurado y la información restaurada de una copia de seguridad. |
| Lecciones Aprendidas | Una parte muy importante es reflexionar sobre por qué ha ocurrido lo ocurrido. Nos permite mejorar nuestros sistemas de seguridad. | Realizar una reunión post incidente para analizar las causas base.                            |
El framework de respuesta a incidentes NIST es similar al SANS. El número de fases que tiene este se reduce a 4:

![](/apuntes/img/Pasted image 20251021223143.png)

Una comparación:

![](/apuntes/img/Pasted image 20251021223201.png)

Cada proceso tiene una forma de documentación formal. El documento formal se llama Plan de Respuesta a Incidentes.

Las partes clave de este documento (aunque no se limita a ellas) son:

- Roles y Responsabilidades.
- Metodología de Respuesta a Incidentes.
- Comunicación con accionistas y cuerpos de seguridad.
- Camino de escalada a seguir.

