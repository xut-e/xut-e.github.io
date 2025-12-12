---
layout: apunte
title: "8. Using Reverse-DNS Lookup"
---

El comportamiento por defecto de Nmap es usar reverse-DNS. Esto es porque los hostnames pueden revelar mucho. Sin embargo, si no quieres mandar estas queries DNS puedes usar `-n`.

Por defecto, Nmap mirará los hosts activos, sin embargo, puedes usar la opción `-R` para hacer una query al servidor DNS incluso para los hosts offline. Si quieres usar un servidor DNS específico, puedes añadir la opción `--dns-servers <DNS_SERVER>`.