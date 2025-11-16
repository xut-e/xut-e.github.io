---
layout: apunte
title: "6. Battering Ram"
---

El tipo de ataque de Battering ram en el Intruder de Burp Suite difiere del tipo Sniper en que coloca el mismo payload en cada posición a la vez, en vez de hacerlo por turnos. Si usamos el mismo ejemplo:

```python
POST /support/login/ HTTP/1.1
Host: MACHINE_IP
User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:80.0) Gecko/20100101 Firefox/80.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Content-Type: application/x-www-form-urlencoded
Content-Length: 37
Origin: http://MACHINE_IP
Connection: close
Referer: http://MACHINE_IP/support/login/
Upgrade-Insecure-Requests: 1

username=§pentester§&password=§Expl01ted§
```

Veremos que ahora las peticiones que genera con el mismo diccionario de tres palabras (`burp`, `suite` e `intruder`) son:

| Número de Petición | Cuerpo de la Petición                 |
| ------------------ | ------------------------------------- |
| 1                  | `username=burp&password=burp`         |
| 2                  | `username=suite&password=suite`       |
| 3                  | `username=intruder&password=intruder` |
Cada payload se introduce directamente a la vez en cada posición.