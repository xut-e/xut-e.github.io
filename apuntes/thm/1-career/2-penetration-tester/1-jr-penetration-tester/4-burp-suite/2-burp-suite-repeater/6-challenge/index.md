---
layout: apunte
title: "6. Challenge"
---

En el reto anterior hemos demostrado nuestro manejo del repetidor añadiendo un header a la petición. Ahora es momento del reto de verdad.

------------------------------
1. Navegamos a la página dada.
   !**Pasted image 20251114205004.png**
2. Observamos que los links nos redirigen a endpoints numéricos.
   !**Pasted image 20251114205035.png**
3. Vemos que 5 es el último endpoint válido, más altos dan error 404 not found.
   !**Pasted image 20251114205114.png**
4. El objetivo es conseguir un error 500 internal server error.
	1. Probamos con un número muy grande.
	   !**Pasted image 20251114205313.png**
	   
	   Parece que no acaba en error 500.
	2. Probaremos con un número más pequeño.
	   !**Pasted image 20251114205405.png**
	   
	   Parece ser que tampoco resulta en error 500.
	3. Probaremos con una letra.
	   !**Pasted image 20251114205519.png**
	4. Tampoco pasa nada así que probaremos con un carácter especial.
	   !**Pasted image 20251114205619.png**
	5. Tampoco funciona, puede que esté validando números enteros, probemos a meter un número negativo.
	   !**Pasted image 20251114205722.png**
	   ¡BINGO!
5. Obtenemos la flag.
   !**Pasted image 20251114205823.png**

