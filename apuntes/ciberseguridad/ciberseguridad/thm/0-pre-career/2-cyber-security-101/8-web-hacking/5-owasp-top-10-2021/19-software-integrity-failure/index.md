---
layout: apunte
title: "19. Software Integrity Failure"
---

Supón que tienes una página web que usa librerías de terceros guardadas en servidores externos fuera de tu control. Mientras que esto puede sonar un poco extraño, es una práctica bastante común. Toma, por ejemplo jQuery, una librería muy usada de javascript. Si quieres incluirla en tu página desde sus servidores sin descargarla:

```html
<script src="https://code.jquery.com/jquery-3.6.1.min.js"></script>
```

Cuando un usuario navegue hasta tu página el navegador descargará jQuery de la fuente externa especificada.

!**Pasted image 20251013143945.png**

El problema es que si un atacante consigue hackear el repositorio oficial de jQuery, podrían cambiar los contenidos de `https://code.jquery.com/jquery-3.6.1.min.js` para inyectar código malicioso. Como resultado, cualquiera visitando tu página web ejecutaría dicho código en su navegador sin saberlo.

Los navegadores modernos incluyen una funcionalidad que te permite proporcionar un hash de tal manera que los recursos externos sólo se descargan si coinciden los hashes. La manera correcta de integrar librerías de terceros de forma segura sería:

```html
<script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>
```

Puedes usar [SRI Hash](https://www.srihash.org/) para no tener que descargar y hashear tú mismo los archivos que te interesen.