---
layout: apunte
title: "6. Advanced C2 Setups"
---

<h2>Siempre se Puede Mejorar</h2>
Como puedes haber adivinado, Metasploit no es tan buen servidor C2 para operaciones de adversario avanzadas. No es flexible, no puedes configurar que los agentes hagan beacon cada X segundos con Y jitter... Un NGFW podría fácilmente darse cuenta de este tráfico C2, viendo su flujo constante de tráfico. Además, cualquiera podría conectarse a un listener HTTP/HTTPS y averiguar lo que está pasando.

----------------------------------------
<h2>Redirectores Command and Control</h2>
<h3>¿Qué es un Redirector?</h3>
Antes de adentrarnos en configurar un redirector, debemos preguntarnos qué es. Un redirector hace exactamente lo que parece. Es un servidor que redirige las peticiones HTTP/HTTPS basado en información del body. En los sistemas de producción, puede que veas un redirector en forma de balanceador de carga. Este servidor suele correr en Apache2 o NGINX.

De vuelta en Metasploit, podemos realizar unas configuraciones básicas para permitir configuraciones más avanzadas. En esta tarea configuraremos un redirector. Normalmente esta configuración se realiza en múltiples hosts; el propósito de esto es esconder el verdadero servidor de Command and Control. El diagrama de abajo ilustra cómo las comunicaciones entre la víctima y el servidor C2 ocurren.

!**Pasted image 20260517011754.png**

Normalmente, cuando tienes una llamada de vuelta a C2, puedes configurar el host de llamada a un Dominio, digamos *admin.tryhackme.com*. Es muy común que tu servidor C2 sea reportado, cuando un usuario realiza una queja. Normalmente el servidor es tirado bastante rápido. Puede tardar entre 3 y 24 horas.

Configurar un redirector asegura que cualquier información que puedas haber recolectado durante el engagement esté segura. Pero ¿cómo hace esto que el servidor C2 no sea tirado? Seguro que si alguien hiciera fingerprint de Cobalt Strike en tu servidor C2, alguien rellenaría una queja y te tumbarían el servidor. Es cierto, por eso se coloca un Firewall que sólo permita la comunicación a y desde tu redirector para mitigar cualquier riesgo potencial.

!**Pasted image 20260517012403.png**

-----------------------------------------------
<h2>¿Cómo se Configura un Redirector?</h2>
