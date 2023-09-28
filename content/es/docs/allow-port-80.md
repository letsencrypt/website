---
title: Mejores Prácticas - Mantenga abierto el puerto 80
slug: allow-port-80
top_graphic: 1
date: 2019-01-24
lastmod: 2019-01-24
show_lastmod: 1
---


Ocasionalmente recibimos informes de personas que tienen problemas para usar el Tipo de desafío HTTP-01 porque tenian bloqueado el puerto 80 a su servidor web. Nuestra recomendación es que todos los servidores destinados al uso web general deben ofrecer HTTP en el puerto 80 y HTTPS en el puerto 443. También deben enviar redireccionamientos para todas las solicitudes del puerto 80 y posiblemente un encabezado HSTS (en las solicitudes del puerto 443).

Permitir el puerto 80 no genera una mayor superficie de ataque en su servidor, porque las solicitudes en el puerto 80 generalmente son atendidas por el mismo software que se ejecuta en el puerto 443.

Cerrar el puerto 80 no reduce el riesgo para una persona que accidentalmente visita tu sitio web a través de HTTP. En circunstancias normales, esa persona recibiría una redirección a HTTPS, y su tráfico posterior será protegido. Si esa persona estaba sujeta a un MITM activo, el MITM respondería en el puerto 80, por lo que su sitio nunca tendría la oportunidad de responder “connection refused.”

Por último, mantener abierto el puerto 80 para servir una redirección ayuda a los visitantes de su sitio web llegar a la versión correcta de su sitio (la versión HTTPS). Hay varias situaciones que escapan a su control y que pueden incluir brevemente a alguien en la versión HTTP de su sitio, por ejemplo, la vinculación automática en correos electrónicos o escribir manualmente un nombre de dominio. Es mejor para ellos obtener una redirección que un error.

Desafortunadamente, es posible que no tenga control sobre si el puerto 80 está bloqueado para su sitio web. Algunos ISPs (en su mayoría residenciales) bloquean el puerto 80 por diferentes razones. Si su ISP hace esto pero aún desea obtener certificados de Let's Encrypt, tiene dos opciones: puede usar los desafíos de DNS-01 o puede usar [uno de los clientes que soportan los desafíos TLS-ALPN-01](https://community.letsencrypt.org/t/which-client-support-tls-alpn-challenge/75859/2) (en el puerto 443).
