---
layout: apunte
title: "4. Modifying a Burp Extension"
---

Después de haber obtenido la contraseña de `ecorp_user` de la tarea anterior, inicia sesión.

!**Pasted image 20260325154816.png|529**

La aplicación usa una forma ligeramente diferente de encriptar la petición y la respuesta, como se muestra en el js `/static/form-verify-submit.js`.

-----------------------------------
<h2>Cómo Encripta los Datos la Aplicación Web</h2>
Antes de modificar la extensión de Burp, vamos a entender cómo el código JS encripta las peticiones de autentificación. Los componentes clave son:

1. **ROT13 Encoding**

Antes de encriptar, el username y secret se ofuscan usando `ROT13`.

```js
function rot13(message) {
    const originalAlpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const cipher = "nopqrstuvwxyzabcdefghijklmNOPQRSTUVWXYZABCDEFGHIJKLM";
    return message.replace(/[a-z]/gi, letter => cipher[originalAlpha.indexOf(letter)]);
}
```

- ROT13 cambia cada carácter 13 lugares en adelante, dando la vuelta si es necesario.
- Ejemplo:
	- `ecorp_user` --> `rpebc_hfre`
	- `0007` (no tiene efecto porque ROT13 sólo afecta a letras)

2. **AES Key Generation**

Se genera una clave AES aleatoria para cada petición:

```js
const rawAesKey = window.crypto.getRandomValues(new Uint8Array(16));
const aesKey = await getSecretKey(rawAesKey);
```

- `getSecretKey()` importa la clave aleatoria en modo AES-CBC.

3. **Encriptar las Credenciales**

```js
let rawdata = "username=" + rot13(formDataObj["username"]) + "&secret=" + rot13(formDataObj["secret"]);
let data = window.btoa(String.fromCharCode(...new Uint8Array(await encryptMessage(aesKey, enc.encode(rawdata).buffer))));
```

- Las credenciales ROT13-encoded son:
	- `"username=rpebc_hfre&secret=0007"`
- Esta string es encriptada con AES usando la clave random y el valor IV fijado: `"0000000000000000"`.
- Los bytes encriptados son base64-encodeados antes de ser mandados.

4. **Subir la Petición**

```js
body: "mac=" + encodeURIComponent(window.btoa(String.fromCharCode(...rawAesKey))) +
       "&data=" + encodeURIComponent(data)
```

- `mac=` contiene la clave AES base64-encodeada.
- `data=` contiene las credenciales encriptadas encodeadas en base64.

-----------------------------------------------
<h2>Cómo Desencripta la Información Nuestra Extensión de Burp</h2>
Ahora que sabemos cómo la encriptación del lado del cliente funciona, vamos a examinar la extensión de Burp `102Burp`, que intercepta, desencripta y analiza peticiones.

1. **Inicializar la Extensión de Burp**
2. **Interceptar las Peticiones de Autentificación**
3. **Desencriptar las Credenciales**
4. **Invertir el ROT13 Encoding**
5. **Registrar la Información Desencriptada**
6. **Manejar las Respuestas del Servidor**

------------------------------------
<h2>Outcome</h2>
