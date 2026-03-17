---
layout: apunte
title: "3. ECB Insecurities"
---

El principal problema con ECB es que no realiza suficiente difusión. Debido a que cada bloque es encriptado individualmente y no es difundido con otros bloques, esto tiende a crear problemas de repetición de patrones. En la superficie puede que no parezca un gran problema, pero una vez que comenzamos a usar ECB para encriptar cantidades más grandes de información, el problema se vuelve aparente.

-------------------------------------
<h2>Patrones de Texto Plano</h2>
Un problema principal con ECB es que tiende a dejar patrones de texto plano en conjuntos grandes de datos. Como ECB encripta en bloques individualmente, donde estos patrones son los mismos, el ciphertext puede parecerse bastante al mensaje original. El lugar donde esto se vuelve más aparente es cuando usamos ECB para encriptar imágenes. Este ataque también se llama [ECB Penguin](https://github.com/robertdavidgraham/ecb-penguin) porque fue mostrado con el pingüino de Linux.

!**test-1742496990154.bmp**

Usaremos esta imagen para encriptarla con ECB. Para hacer más fácil la visualización de la información como imagen vamos a preservar el header del archivo.

```shell
head -c 54 test.bmp > test.header
tail -c +54 test.bmp > test.body
openssl enc -aes-128-ecb -nosalt -pass pass:"superpassword" -in test.body -out test.body.ecb
cat test.header test.body.ecb > test.ecb.bmp
```

Una vez hecho, si abrimos la imagen veremos lo siguiente:

!**Pasted image 20260316160605.png**

Fíjate que incluso después de haber encriptado la información, es posible ver el mensaje. Este es sólo uno de los ataques que se puede realizar contra ECB.

