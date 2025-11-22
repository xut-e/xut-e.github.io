---
layout: apunte
title: "1. Brief"
---

Cross-Site Scripting, mejor conocido como XSS es una vulnerabilidad clasificada como un ataque de inyección, donde JavaScript malicioso es inyectado en una aplicación web con la intención de ser ejecutado por otros usuarios. En esta unidad aprenderemos sobre los diferentes tipos de XSS, cómo crear payloads XSS, cómo modificar los payloads y elevar los filtros y acabaremos con un laboratorio práctico.

Las vulnerabilidades XSS son extremadamente comunes (por desgracia). Aquí algunos de los reportes de XSS encontrados en grandes compañías:

- [Shopify](https://hackerone.com/reports/415484)
- [Stream Chat](https://hackerone.com/reports/409850)
- [HackerOne](https://hackerone.com/reports/449351)
- [InfoGram](https://hackerone.com/reports/283825)

----------------------------
<h2>Pre-requisitos</h2>
Merece la pena darse cuenta de que XSS está basado en JavaScript, así que ayudaría que supieras los conceptos básicos de este lenguaje. De cualquier forma, ninguno de los ejemplos es excesivamente complicado.

