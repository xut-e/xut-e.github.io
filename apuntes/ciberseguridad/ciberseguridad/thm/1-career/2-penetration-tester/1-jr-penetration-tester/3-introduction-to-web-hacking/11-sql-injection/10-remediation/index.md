---
layout: apunte
title: "10. Remediation"
---

Los desarrolladores tienen maneras de proteger sus aplicaciones web de ser vulnerables a SQLi siguiendo los siguientes consejos.

----------------------
<h2>Prepared Statements</h2>
En una query preparada, lo primero que escribe un desarrollador es la query, luego el input del usuario se añade. Escribir statements preparados asegura que el código no cambie la estructura o información de la base de datos.

----------------------------
<h2>Input Validation</h2>
Emplear una lista de strings permitidas o un sistema de reemplazo de strings es un buen sistema para validar el input.

--------------------------------
<h2>Escaping User Input</h2>
Escapar el input del usuario es un método mediante el cual evitamos que el usuario pueda introducir ciertos caracteres como `'`, `"`, etc. Como ya hemos visto, estos pueden llevar a un ataque y exfiltración masiva de datos.