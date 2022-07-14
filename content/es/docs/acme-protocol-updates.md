---
title: Actualizaciones del protocolo ACME
slug: acme-protocol-updates
top_graphic: 1
date: 2016-07-27
lastmod: 2018-04-27
show_lastmod: 1
---


El protocolo ACME es el pilar de como Let's Encrypt funciona. Actualmente es un borrador y aún no es un RFC finalizado. A medida que la especificación del protocolo evoluciona con el tiempo Let's Encrypt implementará versiones actualizadas de ACME. Al hacerlo, seguridad será nuestra principal preocupación, seguido de cerca por compatibilidad con versiones anteriores.

# Version ACME Actualmente Implementada

Actualmente tenemos los siguientes *API endpoints*. No implementan ningún borrador fijo de la especificación ACME a medida que evolucionaron junto al borrador del documento de protocolo. Por favor ve [nuestra documentación de divergencia](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md) para comparar su implementación al borrador ACME actual.

## ACME v1

* [Producción] `https://acme-v01.api.letsencrypt.org/directory`
* [*Staging*] `https://acme-staging.api.letsencrypt.org/directory`

## ACME v2

* [Producción] `https://acme-v02.api.letsencrypt.org/directory`
* [*Staging*] `https://acme-staging-v02.api.letsencrypt.org/directory`

https://letsencrypt.org/2017/06/14/acme-v2-api.html

# Nuevas funcionalidades ACME compatibles con versiones anteriores

De vez en cuando Let's Encrypt podría implementar nuevas funcionalidades compatibles con versiones anteriores usando *API endpoints* existentes. Típicamente nuevas funcionalidades compatibles con versiones anteriores son introducidas porque hemos decidido implementar parte de la especificación ACME que no habiamos implementado anteriormente.

Cuando nuevas funcionalidades son introducidas a *API endpoints* existentes, las funcionalidades siempre van a ser claramente especificadas en un especificación ACME pública y no romperá clientes correctamente implementados.

# Arreglos de Seguridad ACME

Si nos damos cuenta de un problema serio de seguridad con el protocolo ACME (en lugar de simplemente nuestra implementació de él) podemos ser forzados hacer cambios que rompen la compatibilidad de nuestros *API endpoints*, o cesar la operación de *endpoints* existentes e introducir nuevos.

ACME ha sido revisado por muchas partes y utilizado con éxito en producción, pero siempre hay una posibilidad de vulnerabilidades sin descubrir. Los administradores de sistemas deben mantener la capacidad de implementar actualizaciones oportunas en sus clientes ACME en respuesta a dichas vulnerabilidades.

# Nuevas versiones de ACME con cambios de ruptura

Cuando sentimos que es importante implementar nuevas versiones de ACME conteniendo cambios que ocasionen rupturas, lo haremos introduciendo nuevos *API endpoints* y manteniendolos en paralelo con los *endpoints* de versiones anteriores. Después de hacer disponible la nueva versión, comunicaremos una línea de tiempo de desaprobación para todos los usuarios con mucha antelación.

Esto no va a suceder muy a menudo ya que rompiendo compatibilidad es tan oneroso incluso si hay suficiente tiempo de transición. Sin embargo, estaremos haciendo esto una vez el IETF termina [estandarizando ACME](https://datatracker.ietf.org/wg/acme/charter/). Actualmente implementamos una version pre-estandarización-IETF de ACME y sentimos que es importante estar usando un estándar formalizado si es posible.
