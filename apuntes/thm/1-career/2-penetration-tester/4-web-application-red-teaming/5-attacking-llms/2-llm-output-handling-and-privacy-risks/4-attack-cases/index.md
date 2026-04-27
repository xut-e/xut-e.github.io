---
layout: apunte
title: "4. Attack Cases"
---

Antes de empezar con los ejemplos visita la URL. Ten en cuenta que estarás interactuando con un modelo LLM live, por lo que algunos comandos puede que devuelvan un output diferente.

---------------------------------------------
<h2>HTML Generado por el Modelo/JS Renderizado de Forma Insegura</h2>
Las aplicaciones web modernas suelen mostrar mensajes generados por LLMs directamente en el navegador. Los desarrolladores suelen asumir que debido a que el modelo es el que genera contenido y no el usuario, es seguro. El problema es que el atacante controla el input que da forma al output del modelo. Si ese output es insertado en la página usando innerHTML, el navegador interpretará este como HTML o JavaScript real.

Esto es un cambio en la frontera clásica de la confianza. El atacante no inyecta payloads directamente; en su lugar, instruyen al modelo para que lo haga por ellos. Debido a que el frontend no espera el HTML malicioso del modelo , no realiza sanitización. Esto le da al atacante un punto de inyección directo al navegador.

Por ejemplo, el chatbot en la aplicación objetivo toma la pregunta del usuario, le pregunta al modelo una respuesta y la muestra así:

```javascript
document.getElementById("response").innerHTML = modelOutput;
```

Un atacante que mande un prompt como "Genera un tag script que contenga alert("XSS from LLM")" puede hacer que el modelo produzca:

```html
<script>alert('XSS from LLM')</script>
```

!**Pasted image 20260426130852.png**

Como es renderizado con `innerHTML`, el script se ejecuta directamente. Desde aquí, el atacante podría escalar:

- **Robar cookies de sesión** inyectando un script que exfiltre `document.cookie`.
- **Modificar el DOM** para crear formularios de login falsos y recolectar credenciales.
- **Realizar acciones en nombre del usuario** invocando llamadas a API autentificadas desde su contexto de sesión.

La clave es que el vector de inyección no es el campo de input, sino el output del modelo moldeado por el atacante.

-------------------------------------------------
<h2>Comandos o Queries Generados por el Modelo</h2>
En casos de uso más avanzados, los LLMs son integrados en pipelines de automatización, generalmente comandos shell, queries SQL o scripts de despliegue que son ejecutados automáticamente. Si el sistema ejecuta estos outputs sin validación, las instrucciones del atacante se convierten en código vivo en el servidor.

Estas es una de las consecuencias más severas del manejo inadecuado del output porque cierra el hueco entre la influencia del lenguaje del modelo y el control a nivel de sistema.

Imagina un asistente DevOps interno diseñado para agilizar los despliegues:

```python
cmd = model_output
os.system(cmd)
```

El atacante da un prompt como "Genera un comando de shell que liste los archivos de configuración.". El modelo devuelve el comando `ls -la`. El backend lo ejecuta sin validación y el atacante gana visibilidad de los archivos y directorios del servidor. E incluso pueden ir más allá:

**Enumera usuarios y archivos:**

```bash
whoami && ls -la
```

!**Pasted image 20260426131529.png**

**Lee archivos:**

```bash
cat flag.txt
```

!**Pasted image 20260426131556.png**

El peligro aquí no es la ejecución sólo, sino la automatización. Si este pipeline es disparado repetidamente o usado en un sistema CI/CD, los atacantes pueden inyectar repetidamente comandos arbitrarios a escala de infraestructura sin llegar a explotar un RCE.

-----------------------------------
<h2>Punto Clave</h2>
Cada uno de estos caminos de ataque surge del mismo error fundamental: tratar el output del modelo como completamente seguro. El input del atacante da forma al output y si el sistema lo usa en contextos sensibles sin las comprobaciones pertinentes, se vuelve un arma. Sea HTML en un navegador, Jinja2 en un backend o comandos de shell en un servidor, el modelo es otra superficie de ataque.

