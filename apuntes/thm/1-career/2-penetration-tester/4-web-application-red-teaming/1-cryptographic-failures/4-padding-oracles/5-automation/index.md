---
layout: apunte
title: "5. Automation"
---

Muchas herramientas automatizan la explotación de las vulnerabilidades oracle padding, y una de las herramientas más comúnmente usadas es PadBuster. Esta herramienta programada en Perl simplifica el proceso automatizando la desencriptación del ciphertext usando un oracle padding.

**Cómo Funciona PadBuster:**

- **Texto Encriptrado:** 
- **Oracle URL:** 
- **PadBuster Automation:** 

Ve a la URL dad y verás la siguiente pantalla mostrando el texto encriptado: `313233343536373839303132333435362cb8770371460c5a2dc6b6a7e65289b8`. Tiene 32 bytes de longitud. Como el bloque es de 16 bytes, los primeros 16 son IV y el resto el ciphertext.

!**Pasted image 20260317144009.png**

Como pentester has identificado otro endpoint: `http://padding.thm:5002/decrypt?ciphertext=value`, el cual desencripta el ciphertext y devuelve un error de padding inválido si se encuentra padding inválido.

!**Pasted image 20260317144103.png**

El escenario de arriba es ideal para lanzar un ataque de oracle padding, ya que hemos encriptado el texto y obtenido una respuesta del servidor.

Para explotar esta vulnerabilidad usaremos el comando:

```python
padbuster http://padding.thm:5002/decrypt?ciphertext=313233343536373839303132333435362cb8770371460c5a2dc6b6a7e65289b8 313233343536373839303132333435362cb8770371460c5a2dc6b6a7e65289b8 16 -encoding 1
```

Y así nos sale:

!**Pasted image 20260317145138.png**