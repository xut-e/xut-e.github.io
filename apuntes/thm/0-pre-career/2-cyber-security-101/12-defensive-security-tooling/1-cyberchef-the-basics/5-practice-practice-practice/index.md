---
layout: apunte
title: "5. Practice, Practice, Practice"
---

Como queremos prepararte bien, exploraremos en esta tarea las categorías de operaciones más usadas.

-------------------------------
<h2>Extractores</h2>
Las operaciones específicas mencionadas en la tabla recaen bajo la categoría de Extractores.

| Específico              | Descripción                                                                                             |
| ----------------------- | ------------------------------------------------------------------------------------------------------- |
| Extract IP addresses    | Extrae direcciones IPv4 e IPv6.                                                                         |
| Extract URLs            | Extrae URLs del input, se requiere el protocolo (HTTP, FTP, etc.). Si no habrá muchos falsos positivos. |
| Extract email addresses | Extrae todas las direcciones de mail del input.                                                         |

-----------------------------
<h2>Fecha y Hora</h2>
Las operaciones específicas mencionadas en la tabla recaen bajo la categoría de Fecha y Hora.

| Específico          | Descripción                                                                         |
| ------------------- | ----------------------------------------------------------------------------------- |
| From UNIX Timestamp | Convierte timestamp UNIX a string fecha y hora.                                     |
| To UNIX Timestamp   | Parsea una string fecha y hora en UTC y devuelve el correspondiente timestamp UNIX. |
Un timestamp UNIX es un valor de 32 bits que representa el número de segundos desde el 1 de Enero de 1970

-----------------------
<h2>Formato de la Información</h2>
Las operaciones específicas mencionadas en la tabla recaen bajo la categoría de Formato de la Información.

| Operations  | Description                                     | Examples                                                                                        |
| ----------- | ----------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| From Base64 | Decodea Base64 a texto raw                      | `V2VsY29tZSB0byB0cnloYWNrbWUh` se vuelve `Welcome to tryhackme!`                                |
| URL Decode  | Convierte caracteres URL encodeados a texto raw | `https%3A%2F%2Fgchq%2Egithub%2Eio%2FCyberChef%2F` se vuelve `https://gchq.github.io/CyberChef/` |
| From Base85 | Decodea información de una string ASCII         | `BOu!rD]j7BEbo7` se vuelve `hello world`                                                        |
| From Base58 | Decodea como base64                             | `AXLU7qR` se vuelve`Thm58`                                                                      |
| To Base62   | Encodea usando un set restringido de símbolos   | `Thm62` se vuelve`6NiRkOY`                                                                      |
Operaciones como `Base(64, 85, 58,62)` son conocidas como "Base Encodings". Estos toman información en binario (0s y 1s) y lo transforman en una representación basada en texto usando un set de caracteres ASCII específicos.

--------------------------------------
<h2>Ejemplo</h2>
Veamos la operación más usada, `Base64`:

Nuestro ejemplo será encodear las letras "**THM**". Para eso usamos la tabla ASCII. Si quieres ver la tabla ASCII completa haz click en este [link](https://en.wikipedia.org/wiki/ASCII).

| Decimal | Binary   | Symbol |
| ------- | -------- | ------ |
| 65      | 01000001 | A      |
| 66      | 01000010 | B      |
| 67      | 01000011 | C      |
| 68      | 01000100 | D      |
| 69      | 01000101 | E      |
| 70      | 01000110 | F      |
| 71      | 01000111 | G      |
| 72      | 01001000 | H      |
| 73      | 01001001 | I      |
| 74      | 01001010 | J      |
| 75      | 01001011 | K      |
| 76      | 01001100 | L      |
| 77      | 01001101 | M      |
| 78      | 01001110 | N      |
| 79      | 01001111 | O      |
| 80      | 01010000 | P      |
| 81      | 01010001 | Q      |
| 82      | 01010010 | R      |
| 83      | 01010011 | S      |
| 84      | 01010100 | T      |
| 85      | 01010101 | U      |
| 86      | 01010110 | V      |
| 87      | 01010111 | W      |
| 88      | 01011000 | X      |
| 89      | 01011001 | Y      |
| 90      | 01011010 | Z      |
<h4>Paso 1: Convertir a Binario y Fusionar</h4>
Basándonos en la tabla de arriba, **T = 01010100**, **H=01001000**, **M = 01001101**. Ahora los concatenamos y nos aseguramos de que son 24 caracteres: `010101000100100001001101`.

-------------------------------
<h4>Paso 2: Dividir y Convertir a Decimal</h4>
Separamos `010101000100100001001101` en grupos de 6 caracteres cada uno. Nos quedan: `010101`, `000100`, `100001` y `001101`. Ahora hay que convertirlos en decimal:

| Binario | Decimal  |
| ------- | -------- |
| 010101  | 21       |
| 000100  | 4        |
| 100001  | 33       |
| 001101  | 13       |

-------------------------------
<h4>Paso 3: Convertir a Base64</h4>
Ahora que tenemos los números del paso anterior, buscamos su equivalente en la tabla siguiente:

| Index | Character |
| ----- | --------- |
| 0     | **A**     |
| 1     | **B**     |
| 2     | **C**     |
| 3     | **D**     |
| 4     | **E**     |
| 5     | **F**     |
| 6     | **G**     |
| 7     | **H**     |
| 8     | **I**     |
| 9     | **J**     |
| 10    | **K**     |
| 11    | **L**     |
| 12    | **M**     |
| 13    | **N**     |
| 14    | **O**     |
| 15    | **P**     |
| 16    | **Q**     |
| 17    | **R**     |
| 18    | **S**     |
| 19    | **T**     |
| 20    | **U**     |
| 21    | **V**     |
| 22    | **W**     |
| 23    | **X**     |
| 24    | **Y**     |
| 25    | **Z**     |
| 26    | **a**     |
| 27    | **b**     |
| 28    | **c**     |
| 29    | **d**     |
| 30    | **e**     |
| 31    | **f**     |
| 32    | **g**     |
| 33    | **h**     |
| 34    | **i**     |
| 35    | **j**     |
| 36    | **k**     |
| 37    | **l**     |
| 38    | **m**     |
| 39    | **n**     |
| 40    | **o**     |
| 41    | **p**     |
| 42    | **q**     |
| 43    | **r**     |
| 44    | **s**     |
| 45    | **t**     |
| 46    | **u**     |
| 47    | **v**     |
| 48    | **w**     |
| 49    | **x**     |
| 50    | **y**     |
| 51    | **z**     |
| 52    | **0**     |
| 53    | **1**     |
| 54    | **2**     |
| 55    | **3**     |
| 56    | **4**     |
| 57    | **5**     |
| 58    | **6**     |
| 59    | **7**     |
| 60    | **8**     |
| 61    | **9**     |
| 62    | **+**     |
| 63    | **/**     |
Transformamos:

|Index|Characters|
|---|---|
|21|V|
|4|E|
|33|h|
|13|N|
Combinando estos caracteres obtenemos que `THM` en Base64 es `VEhN`.

Veamos ahora el `URL Decode`. Esto funciona convirtiendo los caracteres encodeados con porcentaje de vuelta a sus valores originales. Para una referencia de estos valores puedes consultar este [link](https://en.wikipedia.org/wiki/Percent-encoding). El set de caracteres por defecto en `HTML5` es `UTF-8`. Aquí una tabla con caracteres que sueles ver en las URLs:

| Characters | From UTF-8 |
| ---------- | ---------- |
| :          | %3A        |
| /          | %2F        |
| .          | %2E        |
| =          | %3D        |
| #          | %23        |

-------------------------------------
<h2>Ejercicio Práctico</h2>
Descarga el archivo de ejercicio. Una vez descargado puedes copiar y pegar el contenido en el `Input` o usar `Open file as input`.

1. Abrimos el archivo en CyberChef:
   !**Pasted image 20251026145256.png**
2. Arrastramos el `Extract email addresses` en el apartado de `Extractors` y como tenemos `Auto Bake` seleccionado lo vemos instantáneamente:
   !**Pasted image 20251026145409.png**
3. Hacemos lo mismo para la IP:
   !**Pasted image 20251026145503.png**
4. Y para el dominio:
   !**Pasted image 20251026145542.png**
5. Para convertir un número en otro usamos los conversores de decimal a binario de `Data Format`:
   !**Pasted image 20251026145754.png**
6. Del apartado de `Networking` cogemos `URL Encode` y seleccionamos que encodee todos los caracteres especiales:
   !**Pasted image 20251026150052.png**