---
layout: apunte
title: "3. I. Broken Access Control"
---

Los sitios web tienen páginas protegidas de los visitantes normales, por ejemplo, sólo el administrador de un sitio web debería poder acceder a la página para controlar a otros usuarios. Si un visitante puede acceder a estas, entonces los controles de acceso están rotos.

Este hecho puede llevar a lo siguiente:

- Ser capaz de ver información sensible de otros usuarios.
- Acceder a funcionalidades no autorizadas.

Por decirlo de manera simple, esta vulnerabilidad permite a los usuarios bypassear la **autorización**.

Por ejemplo, una [vulnerabilidad](https://bugs.xdavidhu.me/google/2021/01/11/stealing-your-private-videos-one-frame-at-a-time/) encontrada en 2019, permitía a un atacante obtener cada frame de un vídeo marcado como privado.