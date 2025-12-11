---
layout: apunte
title: "5. Practical Example of Digital Forensics"
---

Cuando creas un archivo de texto, `TXT`, se guarda cierta información en el sistema operativo, como la fecha de creación y la fecha de la última modificación. Sin embargo, muchos metadatos se quedan guardados en el documento si usas un editor más avanzado como MS Word. Hay varias formas de leer los metadatos de un archivo. Exportar el archivo a otro formato, como `PDF`, mantendría la mayoría de los metadatos, dependiendo del PDF writer usado.

Veamos lo que podemos aprender de un archivo PDF. Podemos tratar de leer los metadatos usando el programa `pdfinfo`. Este muestra varios metadatos relacionados con el archivo, como título, asunto, autor, creador y fecha de creación. Puedes instalar `pdfinfo` con: `sudo apt install poppler-utils`. Considera el siguiente ejemplo:

```shell
root@tryhackme:~# pdfinfo DOCUMENT.pdf  
	Creator:        Microsoft® Word for Office 365 
	Producer:       Microsoft® Word for Office 365 
	CreationDate:   Wed Oct 10 21:47:53 2018 EEST 
	ModDate:        Wed Oct 10 21:47:53 2018 EEST 
	Tagged:         yes 
	UserProperties: no 
	Suspects:       no 
	Form:           none 
	JavaScript:     no 
	Pages:          20 
	Encrypted:      no 
	Page size:      595.32 x 841.92 pts (A4) 
	Page rot:       0 
	File size:      560362 bytes 
	Optimized:      no 
	PDF version:    1.7
```

Los metadatos muestran claramente que fue creado usando MS Word para Office 365 el 10 de Octubre de 2018.

------------------------------------
<h2>Datos EXIF de una foto</h2>
EXIF significa Exchangeable Image File Format; es un estándar para guardar metadatos en imágenes. Cuando tomas una foto con tu teléfono móvil o tu cámara digital, mucha información se incrusta en la imagen. Algunos ejemplos de esos metadatos son:

- Modelo de la cámara/móvil.
- Fecha y hora de la captura de la imagen.
- Configuraciones de fotografía como la distancia focal, apertura, velocidad de obturación e ISO.

Gracias a que los móviles están equipados con un sensor GPS, encontrar coordenadas GPS incrustadas en la imagen es altamente probable. Las coordenadas GPS como latitud y longitud mostrarían dónde fue tomada la foto.

Hay bastantes herramientas online y offline para leer datos EXIF de una imagen. Una de CLI es `exiftool`. Se usa para leer y escribir metadatos en varios tipos de archivos como imágenes JPEG. Si necesitas instalar esta herramienta: `sudo apt install libimage-exiftool-perl`. Veamos un ejemplo:

```shell
root@tryhackme:~# exiftool IMAGE.jpg 
[...] 
GPS Position : 51 deg 31' 4.00" N, 0 deg 5' 48.30'' W 
[...]
```

Si quieres buscar estas coordenadas en maps debes sustituir `deg` por `º`. `51 deg 30' 51.90" N, 0 deg 5' 38.73" W` -> `51°30'51.9"N 0°05'38.7"W`.

-----------------------
<h2>Challenge</h2>
1. Investigamos con `pdfinfo` la carta de rescate para conocer al autor:
   !**Pasted image 20251020222909.png**
2. Con `exiftool` investigamos las coordenadas de la foto del secuestro:
   !**Pasted image 20251020223053.png**
   !**Pasted image 20251020223327.png**
3. Así también podemos ver el modelo de la cámara, que aparece arriba.