---
layout: apunte
title: "3. Rules in Firewalls"
---

Un firewall te da control sobre el tráfico de tu red. Aunque filtra el tráfico basado en reglas pre-configuradas, algunas reglas personalizadas pueden definirse para varias redes.

Los componentes básicos de una regla de firewall son:

- **Dirección de fuente:** Dirección IP de la que proviene el tráfico.
- **Dirección de destinación:** Dirección IP a la que se dirije el tráfico.
- **Puerto:** Puerto de comunicación del tráfico.
- **Protocolo:** Protocolo usado durante la comunicación.
- **Acción:** Lo que hará el firewall cuando detecte que se cumple esta regla.
- **Dirección:** Define si el tráfico es entrante o saliente.

-----------------------------
<h2>Tipos de Acciones</h2>
Hay tres tipos de acciones que un firewall puede realizar:

<h6>Allow (Permitir)</h6>
Indica que el tráfico que cumple con esa regla debe ser permitido. Una regla que permita el tráfico saliente por el puerto 80 usando HTTP sería:

| Action | Source         | Destination | Protocol | Port | Direction |
| ------ | -------------- | ----------- | -------- | ---- | --------- |
| Allow  | 192.168.1.0/24 | Any         | TCP      | 80   | Outbound  |

<h6>Deny (Prohibir)</h6>
Indica que el tráfico que cumpla con la regla no debe ser dejado pasar. Una regla que deniegue el tráfico entrante por el puerto 22 vía SSH sería:

| Action | Source | Destination    | Protocol | Port | Direction |
| ------ | ------ | -------------- | -------- | ---- | --------- |
| Deny   | Any    | 192.168.1.0/24 | TCP      | 22   | Inbound   |

<h6>Forward</h6>
Redirige el tráfico a un segmento de red diferente usando reglas forwarding. Una regla que redirigiera el tráfico que entra por el puerto 80 hacia el servidor `192.168.1.8` sería:

| Action  | Source | Destination | Protocol | Port | Direction |
| ------- | ------ | ----------- | -------- | ---- | --------- |
| Forward | Any    | 192.168.1.8 | TCP      | 80   | Inbound   |

--------------------------------
<h2>Direccionalidad de las Reglas</h2>
Los firewalls tienen diferentes tipos de reglas, categorizadas en función de la direccionalidad de su tráfico.

- **Inbound:** Cuando se aplican al tráfico entrante.
- **Outbound:** Cuando se aplican al tráfico saliente.
- **Forward:** Cuando se aplican a redirecciones dentro de la misma red.