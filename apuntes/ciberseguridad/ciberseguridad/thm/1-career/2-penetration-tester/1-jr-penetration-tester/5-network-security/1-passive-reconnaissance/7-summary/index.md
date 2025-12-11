---
layout: apunte
title: "7. Summary"
---

En esta lección hemos aprendido sobre el reconocimiento pasivo. En particular hemos visto las herramientas de linea de comandos `whois`, `nslookup` y `dig` y las herramientas online `DNSDumpster` y `Shodan.io`.

| Propósito                                      | Ejemplo CLI                               |
| ---------------------------------------------- | ----------------------------------------- |
| Consultar registros WHOIS                      | `whois tryhackme.com`                     |
| Consultar registros DNS A                      | `nslookup -type=A tryhackme.com`          |
| Consultar registros  DNS MX en un servidor DNS | `nslookup -type=MX tryhackme.com 1.1.1.1` |
| Consultar registros DNS TXT                    | `nslookup -type=TXT tryhackme.com`        |
| Consultar registros DNS A                      | `dig tryhackme.com A`                     |
| Consultar registros DNS MX  en un servidor DNS | `dig @1.1.1.1 tryhackme.com MX`           |
| Consultar registros TXT                        | `dig tryhackme.com TXT`                   |

