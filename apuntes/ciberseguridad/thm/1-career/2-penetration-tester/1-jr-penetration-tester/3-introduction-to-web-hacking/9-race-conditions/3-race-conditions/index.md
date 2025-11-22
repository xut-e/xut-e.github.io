---
layout: apunte
title: "3. Race Conditions"
---

<h2>Analogía del Mundo Real</h2>
Imagina la siguiente situación. Llamas a un restaurante para reservar una mesa para una comida de negocios crucial. Conoces el restaurante y su disposición y eliges una mesa en concreto, la 17. A la vez que ocurre tu llamada, otro cliente está realizando una llamada similar por la misma mesa.

¿Quién merece realmente la mesa? Eso es una race condition.

¿Por qué pasó esto? Ocurrió porque más de una persona quería hacer una reserva a la vez de la misma cosa. Además, como toma al menos un minuto al dueño poner la etiqueta de reservado en la mesa, hay un periodo de tiempo durante el cual otra persona puede reservarla.

----------------------------
<h2>Ejemplo A</h2>
Consideremos el siguiente escenario:

- Una cuenta de banco tiene 100€.
- Dos hilos intentan sacar dinero a la vez.
- El hilo 1 mira el balance, ve 100€, y saca 45€.
- **Antes** de que el hilo 1 actualice el balance, el hilo 2 intenta hacer lo mismo, ve 100€ (incorrectamente), y saca 35€.

No podemos estar 100% seguros de qué hilo actualizará el valor primero. Pongamos que el hilo 1 lo actualiza primero, ahora el balance es 55€. Si ahora el hilo 2 actualiza el balance nuevamente, lo pondrá en 65€. En pocas palabras, el usuario hizo dos retiradas pero sólo se le dedujo el dinero de una del balance total, porque el hilo dos así lo dijo.

--------------------------------
<h2>Ejemplo B</h2>
Consideremos otro escenario:

- Una cuenta de banco tiene 75€.
- Dos hilos intentan sacar dinero al mismo tiempo.
- El hilo 1 comprueba el balance, ve 75€, y saca 20€.
- **Antes** de que el hilo 1 actualice el dinero, el hilo dos mira lo que hay, ve 75€ (incorrectamente), y saca 50€.

Ahora en la cuenta quedarán 25€, cuando deberían quedar 5€ o no haberse realizado la segunda operación.

Estos dos ejemplos muestran la vulnerabilidad TOCTOU (Time-of-Check to Time-of-Use).

--------------------------------
<h2>Código de Ejemplo</h2>
Considera el siguiente código de Python con dos hilos simulando la completitud de una tarea en incrementos del 10%.

```python
import threading

x = 0  # Shared variable

def increase_by_10():
    global x
    for i in range(1, 11):
        x += 1
        print(f"Thread {threading.current_thread().name}: {i}0% complete, x = {x}")

# Create two threads
thread1 = threading.Thread(target=increase_by_10, name="Thread-1")
thread2 = threading.Thread(target=increase_by_10, name="Thread-2")

# Start the threads
thread1.start()
thread2.start()

# Wait for both threads to finish
thread1.join()
thread2.join()

print("Both threads have finished completely.")
```

Estos dos hilos comienzan juntos. No hacen nada más que imprimir un valor en la pantalla. Consecuentemente, uno esperaría que terminasen a la vez, o al menos que el resultado fuera consistente. Sin embargo, en el programa de arriba, no hay garantía de qué hilo terminará primero y cómo de pronto lo hará.

Aquí una primera ejecución:

```shell
python t3_race_to_100.py
...
Thread Thread-1: 40% complete, x = 10
Thread Thread-2: 70% complete, x = 11
Thread Thread-1: 50% complete, x = 12
Thread Thread-2: 80% complete, x = 13
Thread Thread-1: 60% complete, x = 14
Thread Thread-1: 70% complete, x = 16
Thread Thread-2: 90% complete, x = 15
Thread Thread-2: 100% complete, x = 17
Thread Thread-1: 80% complete, x = 18
Thread Thread-1: 90% complete, x = 19
Thread Thread-1: 100% complete, x = 20
Both threads have finished completely.
```

Y aquí una segunda:

```shell
python t3_race_to_100.py 
...
Thread Thread-1: 70% complete, x = 10
Thread Thread-2: 40% complete, x = 11
Thread Thread-1: 80% complete, x = 12
Thread Thread-2: 50% complete, x = 13
Thread Thread-1: 90% complete, x = 14
Thread Thread-2: 60% complete, x = 15
Thread Thread-1: 100% complete, x = 16
Thread Thread-2: 70% complete, x = 17
Thread Thread-2: 80% complete, x = 18
Thread Thread-2: 90% complete, x = 19
Thread Thread-2: 100% complete, x = 20
Both threads have finished completely.
```

Ejecutar este programa distintas veces resultará en resultados diferentes.

-------------------------------
<h2>Causas</h2>
Como vimos en el último programa, dos variables estaban cambiando la misma variable. Cada vez que a un hilo se le daba tiempo de CPU, este corría para incrementar `x` en 1. Estos dos hilos estaban haciendo una carrera para incrementar la misma variable.

Una de las causas de las race conditions recae en el uso compartido de recursos. Hay muchas causas pero mencionaremos algunas:

- **Ejecución Paralela:** Los servidores web pueden ejecutar varias peticiones en paralelos. Si estas acceden y modifican recursos compartidos sin sincronización correcta, pueden conllevar a race conditions.
- **Operaciones en Bases de Datos:** Las operaciones concurrentes en bases de datos, como read-modify-write pueden producir race conditions.
- **Librerías y Servicios de Terceros:** Hoy en día la mayoría de aplicaciones web integran el uso de librerías de terceros o APIs. Si estas no están diseñadas para manejar acceso concurrente adecuadamente, pueden derivar en race conditions.

