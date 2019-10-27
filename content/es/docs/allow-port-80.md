---
title: Mejores Prácticas - Mantenga abierto el puerto 80
slug: allow-port-80
top_graphic: 1
date: 2019-01-24
lastmod: 2019-01-24
---

{{< lastmod >}}

Ocasionalmente recibimos informes de personas que tienen problemas usando
el HTTP-01 challenge type porque han eliminado (*firewalled off*) el puerto
80 a sus servidores. Nuestra recomendación es que todos los servidores
destinados al uso general de la web deben ofrecer HTTP en el puerto 80 y
HTTPS en el puerto 443. También deben enviar redireccionamientos para todas
las solicitudes del puerto 80, y posiblemente un *header* HSTS (en solicitudes
del puerto 443).

Permitir el puerto 80 no introduce una superficie de ataque más grande en
su servidor, porque las solicitudes en el puerto 80 generalmente son atendidas
por el mismo software que se ejecuta en el puerto 443.

Cerrar el puerto 80 no reduce el riesgo de que una persona visite
accidentalmente su sitio web a través de HTTP. En circunstancias
normales, esa persona recibiría una redirección a HTTPS, y su tráfico
posterior esterá protegido. Si esa persona estaba sujeta a un MITM activo,
el MITM respondería en el puerto 80, por lo que su sitio nunca tendría la
oportunidad de responder "conexión rechazada".

Por último, mantener abierto el puerto 80 para servir una redirección ayuda
a personas a la versión correcta de su sitio (la versión HTTPS). Hay
varias situaciones que escapan a su control y que pueden incluir
brevemente a alguien en la versión HTTP de su sitio, por ejemplo, la vinculación
automática en correos electrónicos o escribir manualmente un nombre de dominio.
Es mejor para ellos obtener una redirección que un error.

Desafortunadamente, es posible que no tenga control sobre si el puerto 80 está
bloqueado en su sitio. Algunos ISP (en su mayoría recidenciales) bloquean el
puerto 80 por varias razones. Si tu ISP hace esto pero aún desea obtener certificados
de Let's Encrypt, tiene dos opciones: Puede usar los *DNS-01 challenges* o pueder usar [uno de los clientes que
tiene habilitado los *TLS-ALPN-01 challenges*]
(https://community.letsencrypt.org/t/which-client-support-tls-alpn-challenge/75859/2)
 (en el puerto 443):
