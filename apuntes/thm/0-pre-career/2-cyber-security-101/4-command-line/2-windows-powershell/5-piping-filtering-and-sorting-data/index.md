---
layout: apunte
title: "5. Piping, Filtering, and Sorting Data"
---

El pipeado es una técnica usada en la línea de comandos que permite usar el output de un comando como input de otro. Esto crea una secuencia de comandos que fluye de uno a otro. Se representa con el símbolo `|`.

En PowerShell es más poderoso si cabe, porque pasa objetos, no texto plano. Estos objetos portan no sólo la información, sino también las propiedades y métodos.

Por ejemplo, si quisiéramos listar los directorios que hay en una ruta y ordenarlos por tamaño podríamos hacer: `Get-ChildItem -Path <ruta> | Sort-Object Length`.

Hemos visto `Sort-Object` que nos permite organizar en base a una propiedad del objecto. Para filtrar objetos basado en condiciones específicas podemos usar `Where-Object`. Por ejemplo para listar solo los `.txt` de un directorio: `Get-ChildItem | Where-Object -Property "Extension" -eq ".txt"`.

Es bueno conocer ciertos operadores:

- `-ne`: Not equal, diferente.
- `-gt`: Greater than, mayor que.
- `-ge`: Greater or equal, mayor o igual.
- `-lt`: Less than, menor que.
- `-le`: Less or equal, menor o igual.

También podemos seleccionar propiedades que coincidan con un patrón, por ejemplo: `Get-ChildItem | Where-Object -Property "Name" -like "ship*"`.

Para no mostrar todos podemos usar `Select-Object`: `Get-ChildItem | Select-Object Name,Length`.

>Ejercicio: Trata de crear una línea que nos permita ver el archivo más grande de `C:\Users\captain\Documents\captain-cabin`.

>Respuesta: `Get-ChildItem -Path "C:\Users\captain\Documents\captain-cabin"| Sort-Object Length`.

>Una respuesta más precisa (la del ejercicio): `Get-ChildItem | Sort-Object Length -Descending | Select-Object -First 1`.

El cmdlet `Select-String` busca patrones de texto, similar a `grep` de UNIX o a `findstr` en Windows Command Prompt. Soporta el uso de [regex](https://learn.microsoft.com/en-us/dotnet/standard/base-types/regular-expressions).

```powershell
PS C:\Users\captain\Documents\captain-cabin> Select-String -Path ".\captain-hat.txt" -Pattern "hat" 

captain-hat.txt:8:Don't touch my hat!
```
