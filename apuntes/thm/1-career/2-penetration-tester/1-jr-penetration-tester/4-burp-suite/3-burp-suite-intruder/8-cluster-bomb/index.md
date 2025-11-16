---
layout: apunte
title: "8. Cluster Bomb"
---

El tipo de ataque Cluster bomb en el intruder de Burp Suite nos permite elegir múltiples sets de payloads, uno por posición (hasta un máximo de 20). Al contrario que Pitchfork, donde todos los sets de payloads se testean de forma simultánea, Cluster bomb itera a través de cada set de payloads individualmente asegurándose de que cada combinación posible se compruebe.

Para ilustrarlo usaremos los mismos diccionarios de antes:

1. El primer diccionario contiene nombres de usuario: `joel`, `harriet` y `alex`.
2. El segundo diccionario contiene contraseñas: `J03l`, `Emma1815` y `Sk1ll`.

En este caso, la tabla de peticiones se ve así:

| Número de Petición | Cuerpo de la Petición                |
| ------------------ | ------------------------------------ |
| 1                  | `username=joel&password=J03l`        |
| 2                  | `username=harriet&password=J03l`     |
| 3                  | `username=alex&password=J03l`        |
| 4                  | `username=joel&password=Emma1815`    |
| 5                  | `username=harriet&password=Emma1815` |
| 6                  | `username=alex&password=Emma1815`    |
| 7                  | `username=joel&password=Sk1ll`       |
| 8                  | `username=harriet&password=Sk1ll`    |
| 9                  | `username=alex&password=Sk1ll`       |
Podemos calcular el número de peticiones multiplicando las entradas de cada diccionario entre sí. La edición de comunidad tiene un límite de frecuencia de petición. Puede saturar la red en ataques muy grandes ya que prueba cada combinación.