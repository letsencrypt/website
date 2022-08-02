---
title: Actualizaciones del protocolo ACME
slug: acme-protocol-updates
top_graphic: 1
lastmod: 2019-10-07
show_lastmod: 1
---

El protocolo [IETF estandarizado](https://letsencrypt. org/2019/03/11/acme-protocol-ietf-standard. html) ACME, [RFC 8555](https://datatracker. ietf. org/doc/rfc8555/), es la piedra angular de cómo vamos a cifrar.

# API Endpoints

Actualmente tenemos los siguientes puntos finales de la API. Consulte [nuestra documentación de divergencias](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md) para comparar su implementación con la especificación ACME.

## ACME v2 (RFC 8555)

* [Producción] `https://acme-v02.api.letsencrypt.org/directory`
* [*Staging*] `https://acme-staging-v02.api.letsencrypt.org/directory`

## ACME v1 (Deprecado)

* [Producción] `https://acme-v01.api.letsencrypt.org/directory`
* [*Staging*] `https://acme-staging.api.letsencrypt.org/directory`

# Nuevas funcionalidades ACME compatibles con versiones anteriores

De vez en cuando Let's Encrypt puede implementar nuevas características compatibles con versiones anteriores para los puntos finales de API existentes. Normalmente se introducen nuevas características compatibles con versiones anteriores porque hemos decidido implementar una parte de la especificación ACME que no habíamos implementado antes.

Cuando se introducen nuevas características a los puntos finales de API existentes, las características siempre se especificarán claramente en una especificación pública de ACME y no romperán a los clientes correctamente implementados.

# Nuevas versiones de ACME con cambios de interrupción

No planeamos hacer cambios en nuestro soporte ACME, pero si creemos que es importante hacerlo, trabajaremos para permitir una transición fluida con suficiente tiempo y comunicarnos con la mayor antelación posible. Los administradores de sistemas deben mantener la capacidad de implementar actualizaciones oportunas en sus clientes ACME en respuesta a dichas vulnerabilidades.
