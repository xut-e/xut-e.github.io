---
layout: apunte
title: "4. Fundamental Concepts of Security Models"
---

¿Cómo podemos crear un sistema que asegure una o más funciones de seguridad? La respuesta es con modelos de seguridad. En esta tarea, introduciremos 3 modelos de seguridad fundamental:

- Modelo Bell-LaPadula
- Modelo de Integridad Biba
- Modelo Clark-Wilson

-------------------------------
<h2>Modelo Bell-LaPadula</h2>
El modelo Bell-LaPadula busca conseguir **confidencialidad** especificando tres reglas:

- **Simple Security Property:** Esta propiedad se llama "no read up". Establece que un sujeto con un nivel de seguridad inferior no puede leer un objeto con nivel de seguridad superior.
- **Star Security Property:** Esta propiedad se llama "no write down". Establece que un sujeto con un nivel superior de seguridad no puede escribir en un objeto en un nivel inferior de seguridad.
- **Discretionary-Security Property:** Esta propiedad usa una matriz de acceso para permitir operaciones de lectura y escritura. Debajo hay un ejemplo de matriz.

| Sujetos  | Object A      | Object B   |
| -------- | ------------- | ---------- |
| Sujeto 1 | Escribir      | Sin acceso |
| Sujeto 2 | Leer/Escribir | Leer       |
Las dos primeras reglas se pueden resumir como "write up, read down". Este modelo tiene ciertas limitaciones, ya que no fue diseñado para compartir archivos, por ejemplo.

-------------------------------------
<h2>Modelo Biba</h2>
EL modelo Biba busca conseguir **integridad** especificando dos reglas:

- **Simple Integrity Property:** Esta propiedad se llama "no read down". Un sujeto de integridad superior no debe poder leer de un objeto con nivel de integridad inferior.
- **Star Integrity Property:** Esta propiedad se llama "no write up". Establece que un sujeto con un nivel inferior de integridad no debe poder escribir en un objeto de nivel de integridad superior.

Estas dos propiedades pueden ser resumidas como "read up, write down". Esta regla está en contraste con el modelo Bell-LaPadula, lo que no debería sorprendernos ya que uno se ocupa de la confidencialidad y otro de la integridad. Una de las limitaciones de este modelo es que no puede manejar amenazas internas.

----------------------------
<h2>Modelo Clark-Wilson</h2>
El modelo Clark-Wilson intenta conseguir integridad siguiendo los siguientes conceptos:

- **Constrained Data Item (CDI):** Se refiere al tipo de información cuya integridad queremos preservar.
- **Unconstrained Data Item (UDI):** Se refiere a todos los tipos de información más allá del CDI, como el input del usuario y del sistema.
- **Transformation Procedures (TPs):** Estos procedimientos son operaciones programadas, como leer y escribir, y deberían mantener la integridad de  los CDIs.
- **Integrity Verification Procedures (IVPs):** Estos procedimientos comprueban y aseguran la validez de los CDIs.

Hemos cubierto sólo tres modelos de seguridad, pero hay muchos más, aquí algunos ejemplos:

- Brewer and Nash
- Goguen-Meseguer
- Sutherland
- Graham-Denning
- Harrison-Ruzzo-Ullman

