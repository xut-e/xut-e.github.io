---
layout: apunte
title: "2. Multi-Threading"
---

En esta tarea veremos los siguientes términos:

- Programa
- Proceso
- Hilo
- Multi-hilos

---------------------------
<h2>Programa</h2>
Un programa es un conjunto de instrucciones para conseguir una tarea específica. Necesitas ejecutar un programa para conseguir lo que deseas. Si no lo ejecutas, este no hace nada y se mantiene como un conjunto de instrucciones estáticas.

Piénsalo como una receta:

```markdown
1. Combine brewed coffee, cardamom, cinnamon, and cloves (if using) in a saucepan.
2. Heat the mixture over low heat for 5 minutes, stirring occasionally. Do not boil.
3. Strain the coffee into your mug.
4. Add milk if desired, and sweeten to taste with honey or sugar.
```

A no ser que alguien lleva a cabo la receta, no habrá café.

Veamos el paralelismo con un servidor en Python que diga "Hello World". El código de abajo dicta que la app escuchará en el puerto 8080 y responderá con un saludo mínimo en HTML. Sin embargo, debemos ejecutar este programa antes de esperar ninguna página en la conexión.

```python
# Import the Flask class from the flask module
from flask import Flask

# Create an instance of the Flask class representing the application
app = Flask(__name__)

# Define a route for the root URL ('/')
@app.route('/')
def hello_world():
    # This function will be executed when the root URL is accessed
    # It returns a string containing HTML code for a simple web page
    return '<html><head><title>Greeting</title></head><body><h1>Hello, World!</h1></body></html>'

# This checks if the script is being run directly (as the main program)
# and not being imported as a module
if __name__ == '__main__':
    # Run the Flask application
    # The host='0.0.0.0' allows the server to be accessible from any IP address
    # The port=8080 specifies the port number on which the server will listen
    app.run(host='0.0.0.0', port=8080)
```

-----------------------------------------
<h2>Procesos</h2>
Una tarde decides probar a hacer una nueva receta de café. Empiezas a realizar los pasos uno a uno. Estás en el proceso de hacer un café. Mientras realizas este proceso puedes ser interrumpido por una llamada urgente. O puede que hagas otra tarea mientras esperas a que el agua hierva. Las interrupciones y las esperas son generalmente inevitables.

Un proceso es un programa en ejecución. También llamado trabajo (job). Al contrario que un programa, el cual es estático, un proceso es una entidad dinámica. Recoge varios aspectos clave, en particular:

- **Programa:** El código ejecutable relacionado con el proceso.
- **Memoria:** El almacenamiento temporal de información.
- **Estado:** Un proceso suele saltar entre diferentes estados. Después del estado "Nuevo" salta al estado "Listo", para luego ir al estado "Corriendo". Puede estar en estados "Esperando" o "Pendiente" o "Completado", etc.
  !**Pasted image 20251110205010.png**

 Si ejecutas el código de antes, se creará un proceso que escuchará conexiones entrantes en el puerto 8080. Es decir se creará un proceso en estado "Esperando". Cuando reciba una petición `GET / HTTP`, cambiará a estado "Listo" en espera a que la CPU le de el turno de correr. Una vez en estado "Corriendo", mandará la página HTML al cliente que la solicitó y volverá al estado "Esperando".
 
```shell
$ flask run --without-threads --host=0.0.0.0  
	* Debug mode: off 
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.  
	* Running on all addresses (0.0.0.0)  
	* Running on http://127.0.0.1:5000  
	* Running on http://192.168.0.104:5000 
Press CTRL+C to quit 
127.0.0.1 - - [16/Apr/2024 23:34:46] "GET / HTTP/1.1" 200 - 
127.0.0.1 - - [16/Apr/2024 23:34:48] "GET / HTTP/1.1" 200 - 
127.0.0.1 - - [16/Apr/2024 23:35:11] "GET / HTTP/1.1" 200 -
```

----------------------------------------
<h2>Hilos</h2>
Terminemos con otra analogía de café. Considera el caso de una máquina comercial de espresso en una cafetería. Digamos que tiene dos portafiltros. AL inicio de la jornada enciendes la máquina y cuando un cliente te pide un espresso, usas un portafiltros para prepararlo. Si otro cliente te pide otro a la vez, no hay problema, para eso tienes dos.

Un hilo es una unidad de ejecución ligera. Comparte varias partes de memoria e instrucciones con el proceso. En varios casos, necesitamos replicar el mismo proceso repetidamente. Para ello podemos adoptar dos acercamientos:

- **Serial:** Un proceso está corriendo y corre el otro proceso de manera secuencial. Los nuevos procesos son puestos en cola.
- **Paralelo:** Un proceso está corriendo y crea un nuevo hilo para servir al nuevo proceso. Los procesos nuevos sólo se ponen en cola cuando se ah alcanzado el máximo de hilos simultáneos corriendo.

La aplicación anterior puede correr usando cuatro hilos usando Gunicorn, también llamado "Green Unicorn", que es un servidor **Python WSGI HTTP**. WSGI significa Web Server Gateway Interface, el cual comunica los servidores webs y aplicaciones web Python.

```shell
gunicorn --workers=4 --threads=2 -b 0.0.0.0:8080 app:app
[2024-04-16 23:35:59 +0300] [507149] [INFO] Starting gunicorn 21.2.0
[2024-04-16 23:35:59 +0300] [507149] [INFO] Listening at: http://0.0.0.0:8080 (507149)
[2024-04-16 23:35:59 +0300] [507149] [INFO] Using worker: gthread
[2024-04-16 23:35:59 +0300] [507150] [INFO] Booting worker with pid: 507150
[2024-04-16 23:35:59 +0300] [507151] [INFO] Booting worker with pid: 507151
[2024-04-16 23:35:59 +0300] [507152] [INFO] Booting worker with pid: 507152
[2024-04-16 23:35:59 +0300] [507153] [INFO] Booting worker with pid: 507153
```

>[!IMPORTANT] Es imposible correr más de una copia de este proceso a la vez ya que se relaciona con el puerto 8080. Cada puerto sólo puede tener ligado un proceso.

