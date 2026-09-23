---
layout: apunte
title: "2. Getting the Flags"
---

<h2>Comprendiendo el Código</h2>
Lo primero es entender lo que hace el código. Este recibe una string, que es el mensaje a cifrar y realiza una serie de cambios para producir el mensaje final.

Nosotros tenemos el mensaje final (cifrado) de la flag, lo que sabemos por el siguiente trozo de código:

```python
with open("message.txt", "w") as f:
	f.write(enc(FLAG))
```

Vamos a ver entonces cómo funciona la función de encriptación.

```python
def enc(plaintext):
    return "".join(
        chr((ord(c) - (base := ord('A') if c.isupper() else ord('a')) + i) % 26 + base) 
        if c.isalpha() else c
        for i, c in enumerate(plaintext)
    )
```

Devuelve una string. Dicha string la construye de la siguiente manera:

- Evalúa cada carácter y devuelve el carácter y su índice.

```python
[...]for i, c in enumerate(plaintext)[...]
```

Este índice le dice a la función de cambio cuánto tiene que moverlo.

- Los números y signos no los toca:

```python
[...] if c.isalpha() else c [...]
```

- Se preocupa de que la base sea correcta (en número int equivalente en la tabla ASCII):

```python
[...](base := ord('A') if c.isupper() else ord('a') + i)[...]
```

Si la letra es mayúscula coge como base el int equivalente a `A` (65) y si es minúscula, el de `a` (97). El `+ i` es donde sucede el cambio. Es un cambio césar, pero variable.

- Se ocupa de que no salga de `A-Z` o de `a-z`, con el módulo y luego suma la base para que si el módulo es, por ejemplo 3, quede la tercera letra empezando desde la base:

```python
[...]%26 + base[...]
```

---------------------
<h2>Creación de un Exploit Criptográfico</h2>
Sabiendo ya cómo funciona el código, vamos a escribir un código que revierta el cambio conocido a la cadena dada.

```python
def dec(ciphertext):
	return "".join(
	chr((ord(c) - (base := ord('A') if c.isupper() else ord('a')) - i) % 26 + base) if c.isalpha() else c
	for i,c in enumerate(ciphertext)
	)

print(dec('a_up4qr_kaiaf0_bujktaz_qm_su4ux_cpbq_ETZ_rhrudm'))
```

Con esto obtenemos la flag.