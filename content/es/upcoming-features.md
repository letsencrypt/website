---
title: Próximas Funcionalidades
slug: upcoming-features
lastmod: 2023-06-20
show_lastmod: 1
---

## Raíz e Intermedios ECDSA

Estamos emitiendo certificados de nuestro intermedio ECDSA producción a cuentas en una [lista de cuentas permitidas](https://community.letsencrypt.org/t/ecdsa-availability-in-production-environment/150679). No hay fecha planeada para retirar la lista.

# Funcionalidades Completadas

## ACME Renewal Information (ARI)

* Habilitado: 23 de marzo del 2023

Ahora ejecutamos [ARI](https://letsencrypt.org/2023/03/23/improving-resliiency-and-reliability-with-ari.html), un sistema que nos permite notificar suscriptores a través de API cuando necesitan renovar.

## Validación de Multi-Perspectiva

* Habilitado: 19 de febrero del 2020

Ahora hacemos validaciónes desde [multiples perspectivas de red](https://letsencrypt.org/2020/02/19/multi-perspective-validation.html).

## Certificate Transparency Log

* Habilitado: 15 de mayo del 2019

Ahora operamos un [Certificate Transparency log](/docs/ct-logs).

## Soporte para reto TLS ALPN

* Habilitado: 12 de julio del 2018

Hemos especificado e implementado un [reemplazo](https://tools.ietf.org/html/rfc8737) para el método de validación TLS-SNI, el cual fue [discontinuado por razones de seguridad](https://community.letsencrypt.org/t/important-what-you-need-to-know-about-tls-sni-validation-issues/50811). Introducir un reemplazo fue importante para subscriptores que solo quieren usar el puerto 443 para validación.

## Certificados Wildcard

* Habilitado: 13 de marzo del 2018

## v2 ACME API 

* Habilitado: 13 de marzo del 2018

## Soporta completo para IPv6

* Habilitado: 26 de julio del 2016
