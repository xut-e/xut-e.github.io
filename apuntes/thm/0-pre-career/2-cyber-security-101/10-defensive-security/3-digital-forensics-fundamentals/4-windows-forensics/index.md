---
layout: apunte
title: "4. Windows Forensics"
---

El tipo más común de evidencia recolectada de las escenas de crímen son PCs de escritorio y portátiles, ya que la mayoría de crímen incumbe un sistema personal. Estos dispositivos tienen diferentes sistemas operativos corriendo en ellos. En esta tarea veremos la adquisición de evidencia y el análisis de sistemas operativos Windows, que es un sistema operativo muy común que ha sido investigada en varios casos.

Como parte de la fase de recolección, se toman imágenes del sistema operativo Windows. Estas imágenes forenses son copias bit a bit del sistema operativo entero. Se toman dos categorías de imágenes forenses en los sistemas operativos Windows.

- **Imagen de Disco:** La imagen de disco contiene toda la información presente en el almacenamiento del dispositivo del sistema (HDD, SDD, etc.). Esta información no es volátil, lo que significa que sobreviviría incluso si se apagara el dispositivo.
- **Imagen de Memoria:** Contiene la información dentro de la RAM del sistema operativo. Esta memoria es volátil, lo que significa que la información se perdería si se apagase el dispositivo. Por ejemplo procesos, archivos abiertos, redes conectadas, etc. Esta imágen tiene prioridad sobre la otra.

Veamos algunas herramientas populares usadas para estos dos tipos de de imagen:

- **FKT Imager:** Es una herramienta ampliamente usada para tomar imágenes de disco de Windows. Ofrece una interfaz gráfica de usuario amigable. Puede analizar los contenidos de una imagen de disco. Puede ser usado para adquisición o análisis.
- **Autopsy:** [Autopsy](https://www.autopsy.com/) es una plataforma de forense digital de código abierto. Un investigador puede importar cualquier imagen de disco adquirida a esta herramienta y esta realizará un examen extensivo de esta. Ofrece funcionalidades valiosas durante el análisis de la imagen, incluyendo la búsqueda del teclado, archivos borrados, metadatos de archivos, detección de extensiones incorrectas y mucho más.
- **DumpIt:** [DumpIt](https://www.toolwar.com/2014/01/dumpit-memory-dump-tools.html) ofrece la utilidad de tomar imágenes de memoria de un sistema operativo Windows. Esta herramienta crea una imagen de memoria usando una interfaz de línea de comandos y unos pocos comandos. La imagen de la memoria puede tomarse en diferentes formatos.
- **Volatility:** [Volatility](https://volatilityfoundation.org/) es una herramienta de código abierto poderosa para analizar imágenes de memoria. Ofrece plugins extremadamente útiles. Cada artefacto puede ser analizado usando un plugin específico. Esta herramienta soporta varios sistemas operativos, como Windows, Linux, macOS y Android.

