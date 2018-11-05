---
title: Actualizaciones del protocolo ACME
slug: acme-protocol-updates
top_graphic: 1
date: 2016-07-27
lastmod: 2016-07-27
---

{{< lastmod >}}

El protocolo ACME es el pilar de como Let's Encrypt funciona. Actualmente es un borrador y a&uacute;n no es un RFC finalizado. A medida que la especificaci&oacute;n del protocolo evoluciona con el tiempo Let's Encrypt implementar&aacute; versiones actualizadas de ACME. Al hacerlo, seguridad ser&aacute; nuestra principal preocupaci&oacute;n, seguido de cerca por compatibilidad con versiones anteriores.

# Version ACME Actualmente Implementada

Actualmente tenemos los siguientes *API endpoints*. No implementan ning&uacute;n borrador fijo de la especificaci&oacute;n ACME a medida que evolucionaron junto al borrador del documento de protocolo. Por favor ve [nuestra documentaci&oacute;n de divergencia](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md) para comparar su implementaci&oacute;n al borrador ACME actual.

## ACME v1

* [Producci&oacute;n] `https://acme-v01.api.letsencrypt.org/directory`
* [*Staging*] `https://acme-staging.api.letsencrypt.org/directory`

## ACME v2

* [Producci&oacute;n] `https://acme-v02.api.letsencrypt.org/directory`
* [*Staging*] `https://acme-staging-v02.api.letsencrypt.org/directory`

https://letsencrypt.org/2017/06/14/acme-v2-api.html

# Nuevas funcionalidades ACME compatibles con versiones anteriores

De vez en cuando Let's Encrypt podr&iacute;a implementar nuevas funcionalidades compatibles con versiones anteriores usando *API endpoints* existentes. T&iacute;picamente nuevas funcionalidades compatibles con versiones anteriores son introducidas porque hemos decidido implementar parte de la especificaci&oacute;n ACME que no habiamos implementado anteriormente.

Cuando nuevas funcionalidades son introducidas a *API endpoints* existentes, las funcionalidades siempre van a ser claramente especificadas en un especificaci&oacute;n ACME p&uacute;blica y no romper&aacute; clientes correctamente implementados.

# Arreglos de Seguridad ACME

Si nos damos cuenta de un problema serio de seguridad con el protocolo ACME (en lugar de simplemente nuestra implementaci&oacute; de &eacute;l) podemos ser forzados hacer cambios que rompen la compatibilidad de nuestros *API endpoints*, o cesar la operaci&oacute;n de *endpoints* existentes e introducir nuevos.

ACME ha sido revisado por muchas partes y utilizado con &eacute;xito en producci&oacute;n, pero siempre hay una posibilidad de vulnerabilidades sin descubrir. Los administradores de sistemas deben mantener la capacidad de implementar actualizaciones oportunas en sus clientes ACME en respuesta a dichas vulnerabilidades.

# Nuevas versiones de ACME con cambios de ruptura

Cuando sentimos que es importante implementar nuevas versiones de ACME conteniendo cambios que ocasionen rupturas, lo haremos introduciendo nuevos *API endpoints* y manteniendolos en paralelo con los *endpoints* de versiones anteriores. Despu&eacute;s de hacer disponible la nueva versi&oacute;n, comunicaremos una l&iacute;nea de tiempo de desaprobaci&oacute;n para todos los usuarios con mucha antelaci&oacute;n.

Esto no va a suceder muy a menudo ya que rompiendo compatibilidad es tan oneroso incluso si hay suficiente tiempo de transici&oacute;n. Sin embargo, estaremos haciendo esto una vez el IETF termina [estandarizando ACME](https://datatracker.ietf.org/wg/acme/charter/). Actualmente implementamos una version pre-estandarizaci&oacute;n-IETF de ACME y sentimos que es importante estar usando un est&aacute;ndar formalizado si es posible.
