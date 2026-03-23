---
layout: apunte
title: "2. Getting the Flags"
---

<h2>Reconocimiento Inicial</h2>
Empezaremos escaneando los puertos abiertos de la máquina.

!**Pasted image 20260322204026.png|522**

Esto para puertos UDP.

!**Pasted image 20260322204223.png**

Acto seguido vamos a hacer un análisis más en profundidad de dichos puertos.

!**Pasted image 20260322204137.png**

Y ahora para el puerto UDP.

!**Pasted image 20260322204454.png**

Parece que este puerto sirve un DNS personalizado.

Vamos ahora a escanear directorios de la web.

!**Pasted image 20260322204514.png**

Vamos a ver qué hay en la web.

!**Pasted image 20260322204624.png**

Aquí vemos la página de configuración de Apache. Vamos a ver si hay algo en el directorio que hemos encontrado.

!**Pasted image 20260322204659.png**

Un vídeo llamado `RickRolled.mp4` me da "miedo" abrirlo, no quiero ser rickrolleado xD.

--------------------------
<h2>Profundización</h2>
Vamos a ver qué contienen los archivos que nos hemos encontrado.

!**Pasted image 20260322204859.png**

NOOOOOO! Fui rickrolleado :'( HAHAHAH

Vamos a ver ahora el otro documento.

!**Pasted image 20260322204948.png**

Vaya vaya parece que hemos encontrado oro.

Vamos a mirar qué es.

!**Pasted image 20260322205037.png**

Si no lo desactivamos nos lleva a otro vídeo de RickRoll, por lo que vamos a hacerle caso.

!**Pasted image 20260322205458.png**

Vamos a escuchar el vídeo.

En el vídeo lo único que se dice es que estamos perdiendo el tiempo porque ahí no es. Así que vamos a seguir buscando.

Mirando en BurpSuite el mapeo del sitio encontramos un directorio escondido.

!**Pasted image 20260322212254.png**

Vamos a ver qué hay en él.

!**Pasted image 20260322212339.png**

Una foto, vamos a ver qué tiene.

!**Pasted image 20260322212532.png**

Parece que había un zip escondido. Vamos a ver los contenidos.

Hay dos archivos uno llamado `36` y otro `36.zlib`. Si aplicamos `strings` al zlib nos encontramos con lo siguiente:

!**Pasted image 20260322212939.png**

---------------------------
<h2>Explotación</h2>
Vamos ahora a copiar estas contraseñas y a aplicar fuerza bruta contra FTP con el usuario encontrado.

!**Pasted image 20260322213138.png**

Nos conectamos por FTP y miramos qué hay y lo descargamos.

!**Pasted image 20260322213348.png**

Miramos las credenciales.

!**Pasted image 20260322213440.png**

Están codificadas en `brainfuck`. Vamos a decodificarlas.

!**Pasted image 20260322213532.png**

Con estas credenciales entramos por SSH.

!**Pasted image 20260322213621.png**

Debemos de encontrar dicho escondite secreto.

!**Pasted image 20260322213942.png**

Hemos encontrado la flag de user pero no podemos leerla. Parece que tendremos que hacer un movimiento lateral hacia el usuario `gwendoline`.

!**Pasted image 20260322214451.png**

Hemos encontrado las credenciales de `gwendoline`. Vamos a cambiar de usuario, aunque no sin antes ver el `id` de `eli`.

!**Pasted image 20260322214535.png**

Nos cambiamos de usuario.

!**Pasted image 20260322214650.png**

Y así de fácil encontramos la flag.

!**Pasted image 20260322214639.png**

----------------------------
<h2>Escalada de Privilegios</h2>
Ahora toca escalar privilegios a root. Primero vamos a ver qué nos devuelve `id` con este nuevo usuario.

!**Pasted image 20260322214725.png**

Ahora empezamos con nuestra checklist de escalada de privilegios.

!**Pasted image 20260322214811.png**

Parece que podemos ejecutar como todos los usuarios menos como root. Después de buscar un rato encontré este [artículo](https://www.mend.io/blog/new-vulnerability-in-sudo-cve-2019-14287/) en el que se habla de cómo no se parsean bien todos los usuarios y con este simple comando podemos bypassear la seguridad:

```bash
sudo -u#-1 COMMAND
```

!**Pasted image 20260322222557.png**

Una vez allí, usamos lo encontrado en GTFOBins:

!**Pasted image 20260322222112.png**

De esta manera:

!**Pasted image 20260322222408.png**

Ahora le damos a enter y...

!**Pasted image 20260322222423.png**

Buscamos la flag y la leemos.

!**Pasted image 20260322222453.png**